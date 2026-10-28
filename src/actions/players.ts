'use server';

import { createClient } from '@supabase/supabase-js';
import { CreatePlayerInput, PlayerWithGuardians } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export async function getPlayersByCategory(
  academyId: string,
  categoryId: string
): Promise<{ success: boolean; data?: PlayerWithGuardians[]; error?: string }> {
  try {
    const { data: players, error: playersError } = await supabaseAdmin
      .from('players')
      .select('*')
      .eq('academy_id', academyId)
      .eq('category_id', categoryId)
      .order('jersey_number', { ascending: true });

    if (playersError) {
      return { success: false, error: playersError.message };
    }

    if (!players || players.length === 0) {
      return { success: true, data: [] };
    }

    const playerIds = players.map((player) => player.id);

    const { data: playerGuardians, error: playerGuardiansError } = await supabaseAdmin
      .from('player_guardians')
      .select(
        `
        id,
        player_id,
        guardian_id,
        relationship,
        is_primary_contact,
        guardians (
          id,
          academy_id,
          first_name,
          last_name,
          identification_number,
          phone_number
        )
      `
      )
      .in('player_id', playerIds);

    if (playerGuardiansError) {
      return { success: false, error: playerGuardiansError.message };
    }

    const playersWithGuardians: PlayerWithGuardians[] = players.map((player) => {
      const guardians = (playerGuardians || [])
        .filter((pg) => pg.player_id === player.id)
        .map((pg) => {
          const guardian = pg.guardians as unknown as {
            id: string;
            academy_id: string;
            first_name: string;
            last_name: string;
            identification_number: string | null;
            phone_number: string | null;
          };
          return {
            ...guardian,
            relationship: pg.relationship,
            is_primary_contact: pg.is_primary_contact,
            player_guardian_id: pg.id,
          };
        });

      return {
        ...player,
        guardians,
      };
    });

    return { success: true, data: playersWithGuardians };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return { success: false, error: errorMessage };
  }
}

export async function createPlayerWithGuardians(
  data: CreatePlayerInput
): Promise<{ success: boolean; data?: { playerId: string }; error?: string }> {
  try {
    const { guardians, ...playerData } = data;

    const { data: player, error: playerError } = await supabaseAdmin
      .from('players')
      .insert({
        ...playerData,
        status: playerData.status || 'activo',
      })
      .select()
      .single();

    if (playerError) {
      return { success: false, error: playerError.message };
    }

    if (!player) {
      return { success: false, error: 'No se pudo crear el jugador' };
    }

    const guardianIds: string[] = [];

    for (const guardian of guardians) {
      const { data: existingGuardian, error: findError } = await supabaseAdmin
        .from('guardians')
        .select('id')
        .eq('academy_id', data.academy_id)
        .eq('identification_number', guardian.identification_number)
        .maybeSingle();

      if (findError) {
        return { success: false, error: findError.message };
      }

      if (existingGuardian) {
        guardianIds.push(existingGuardian.id);
      } else {
        const { data: newGuardian, error: guardianError } = await supabaseAdmin
          .from('guardians')
          .insert({
            academy_id: data.academy_id,
            first_name: guardian.first_name,
            last_name: guardian.last_name,
            identification_number: guardian.identification_number,
            phone_number: guardian.phone_number,
          })
          .select()
          .single();

        if (guardianError) {
          return { success: false, error: guardianError.message };
        }

        if (newGuardian) {
          guardianIds.push(newGuardian.id);
        }
      }
    }

    const playerGuardianLinks = guardians.map((guardian, index) => ({
      player_id: player.id,
      guardian_id: guardianIds[index],
      relationship: guardian.relationship,
      is_primary_contact: guardian.is_primary_contact || false,
    }));

    const { error: linkError } = await supabaseAdmin
      .from('player_guardians')
      .insert(playerGuardianLinks);

    if (linkError) {
      return { success: false, error: linkError.message };
    }

    return { success: true, data: { playerId: player.id } };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return { success: false, error: errorMessage };
  }
}

export async function getCategories(
  academyId: string
): Promise<{ success: boolean; data?: Array<{ id: string; name: string; min_birth_year: number; max_birth_year: number }>; error?: string }> {
  try {
    const { data, error } = await supabaseAdmin
      .from('categories')
      .select('id, name, min_birth_year, max_birth_year')
      .eq('academy_id', academyId)
      .order('min_birth_year', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return { success: false, error: errorMessage };
  }
}
