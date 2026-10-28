'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import type {
  CreateMatchInput,
  CreateTournamentCategoryInput,
  CreateTournamentInput,
  RegisterTeamInput,
  StandingsRow,
} from '@/types/database';

export async function createTournament(input: CreateTournamentInput) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tournaments')
    .insert({
      ...input,
      status: input.status ?? 'draft',
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath('/dashboard/tournaments');
  return data;
}

export async function getTournaments() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tournaments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getTournament(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tournaments')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createTournamentCategory(input: CreateTournamentCategoryInput) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tournament_categories')
    .insert({
      ...input,
      registration_open: input.registration_open ?? true,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath(`/dashboard/tournaments/${input.tournament_id}`);
  return data;
}

export async function getTournamentCategories(tournamentId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tournament_categories')
    .select('*')
    .eq('tournament_id', tournamentId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function registerTeam(input: RegisterTeamInput) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tournament_teams')
    .insert({
      ...input,
      status: 'inscrito',
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath(`/dashboard/tournaments/${input.tournament_id}`);
  revalidatePath(`/dashboard/tournaments/${input.tournament_id}/categories/${input.tournament_category_id}`);
  return data;
}

export async function getTournamentTeams(tournamentId: string, categoryId?: string) {
  const supabase = await createClient();
  let query = supabase
    .from('tournament_teams')
    .select('*, academy:academies(*)')
    .eq('tournament_id', tournamentId)
    .order('registered_at', { ascending: true });

  if (categoryId) {
    query = query.eq('tournament_category_id', categoryId);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
}

export async function approveTeam(teamId: string, tournamentId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('tournament_teams')
    .update({ status: 'aprobado' })
    .eq('id', teamId);

  if (error) throw new Error(error.message);
  revalidatePath(`/dashboard/tournaments/${tournamentId}`);
}

export async function createMatch(input: CreateMatchInput) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('matches')
    .insert({
      ...input,
      status: 'programado',
      home_score: 0,
      away_score: 0,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath(`/dashboard/tournaments/${input.tournament_id}`);
  return data;
}

export async function getMatches(tournamentId: string, categoryId?: string) {
  const supabase = await createClient();
  let query = supabase
    .from('matches')
    .select('*, home_team:tournament_teams!matches_home_team_id_fkey(*), away_team:tournament_teams!matches_away_team_id_fkey(*)')
    .eq('tournament_id', tournamentId)
    .order('match_date', { ascending: true });

  if (categoryId) {
    query = query.eq('tournament_category_id', categoryId);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
}

export async function updateMatchResult(
  matchId: string,
  tournamentId: string,
  homeScore: number,
  awayScore: number,
  events?: Array<{ player_id: string; event_type: 'gol' | 'autogol' | 'amarilla' | 'roja'; minute?: number }>
) {
  const supabase = await createClient();

  const { error: matchError } = await supabase
    .from('matches')
    .update({
      home_score: homeScore,
      away_score: awayScore,
      status: 'finalizado',
      updated_at: new Date().toISOString(),
    })
    .eq('id', matchId);

  if (matchError) throw new Error(matchError.message);

  if (events && events.length > 0) {
    const eventRows = events.map((event) => ({
      match_id: matchId,
      player_id: event.player_id,
      event_type: event.event_type,
      minute: event.minute ?? null,
    }));
    const { error: eventsError } = await supabase.from('match_events').insert(eventRows);
    if (eventsError) throw new Error(eventsError.message);
  }

  revalidatePath(`/dashboard/tournaments/${tournamentId}`);
  revalidatePath(`/tournaments/${tournamentId}`);
}

export async function getStandings(tournamentId: string, categoryId: string) {
  const supabase = await createClient();

  // Get all finished matches in category
  const { data: matches, error: matchesError } = await supabase
    .from('matches')
    .select('home_team_id, away_team_id, home_score, away_score')
    .eq('tournament_id', tournamentId)
    .eq('tournament_category_id', categoryId)
    .eq('status', 'finalizado');

  if (matchesError) throw new Error(matchesError.message);

  // Get teams
  const { data: teams, error: teamsError } = await supabase
    .from('tournament_teams')
    .select('id, team_name')
    .eq('tournament_id', tournamentId)
    .eq('tournament_category_id', categoryId)
    .eq('status', 'aprobado');

  if (teamsError) throw new Error(teamsError.message);

  const table = new Map<string, StandingsRow>();
  for (const team of teams ?? []) {
    table.set(team.id, {
      tournament_team_id: team.id,
      team_name: team.team_name,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goals_for: 0,
      goals_against: 0,
      goal_difference: 0,
      points: 0,
    });
  }

  for (const match of matches ?? []) {
    if (match.home_score === null || match.away_score === null) continue;

    const home = table.get(match.home_team_id);
    const away = table.get(match.away_team_id);
    if (!home || !away) continue;

    home.played += 1;
    away.played += 1;
    home.goals_for += match.home_score;
    home.goals_against += match.away_score;
    away.goals_for += match.away_score;
    away.goals_against += match.home_score;

    if (match.home_score > match.away_score) {
      home.won += 1;
      home.points += 3;
      away.lost += 1;
    } else if (match.away_score > match.home_score) {
      away.won += 1;
      away.points += 3;
      home.lost += 1;
    } else {
      home.drawn += 1;
      away.drawn += 1;
      home.points += 1;
      away.points += 1;
    }

    home.goal_difference = home.goals_for - home.goals_against;
    away.goal_difference = away.goals_for - away.goals_against;
  }

  const standings = Array.from(table.values());
  standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goal_difference !== a.goal_difference) return b.goal_difference - a.goal_difference;
    if (b.goals_for !== a.goals_for) return b.goals_for - a.goals_for;
    return 0;
  });

  return standings;
}

export async function getTopScorers(tournamentId: string, categoryId: string, limit = 20) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('match_events')
    .select(
      'player_id, event_type, match:matches!inner(tournament_id, tournament_category_id), player:players(first_name, last_name, academy_id)'
    )
    .eq('match.tournament_id', tournamentId)
    .eq('match.tournament_category_id', categoryId)
    .eq('event_type', 'gol')
    .limit(1000);

  if (error) throw new Error(error.message);

  const { data: teams } = await supabase
    .from('tournament_teams')
    .select('academy_id, team_name')
    .eq('tournament_id', tournamentId)
    .eq('tournament_category_id', categoryId);

  const teamByAcademy = new Map<string, string | null>();
  for (const team of teams ?? []) {
    teamByAcademy.set(team.academy_id, team.team_name);
  }

  const counts = new Map<string, { player_id: string; first_name: string; last_name: string; team_name: string | null; goals: number }>();
  for (const row of data ?? []) {
    const pid = row.player_id;
    if (!counts.has(pid)) {
      const player = Array.isArray((row as any).player) ? (row as any).player[0] : (row as any).player;
      const teamName = player?.academy_id ? teamByAcademy.get(player.academy_id) ?? null : null;
      counts.set(pid, {
        player_id: pid,
        first_name: player?.first_name ?? '',
        last_name: player?.last_name ?? '',
        team_name: teamName,
        goals: 0,
      });
    }
    counts.get(pid)!.goals += 1;
  }

  const scorers = Array.from(counts.values());
  scorers.sort((a, b) => b.goals - a.goals);
  return scorers.slice(0, limit);
}
