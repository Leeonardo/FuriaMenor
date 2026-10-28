export type PlayerStatus = 'activo' | 'inactivo' | 'lesionado' | 'suspendido';
export type PaymentStatus = 'pendiente' | 'pagado' | 'vencido' | 'anulado';
export type FutsalPosition = 'Píot' | 'Ala' | 'Cierre' | 'Guardameta';
export type GuardianRelationship = 'Papa' | 'Mama' | 'Tutor' | 'Otro';

export interface Academy {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  academy_id: string;
  name: string;
  min_birth_year: number;
  max_birth_year: number;
  monthly_fee: number;
  created_at?: string;
  updated_at?: string;
}

export interface Player {
  id: string;
  academy_id: string;
  category_id: string;
  first_name: string;
  last_name: string;
  identification_number: string | null;
  birth_date: string;
  jersey_number: number | null;
  preferred_foot: 'derecho' | 'izquierdo' | 'ambidiestro' | null;
  position: FutsalPosition | null;
  photo_url: string | null;
  status: PlayerStatus;
  created_at?: string;
  updated_at?: string;
}

export interface Guardian {
  id: string;
  academy_id: string;
  first_name: string;
  last_name: string;
  identification_number: string | null;
  phone_number: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface PlayerGuardian {
  id: string;
  player_id: string;
  guardian_id: string;
  relationship: GuardianRelationship;
  is_primary_contact: boolean;
  created_at?: string;
}

export interface Payment {
  id: string;
  academy_id: string;
  player_id: string;
  title: string;
  amount: number;
  due_date: string;
  status: PaymentStatus;
  payment_method: string | null;
  transaction_reference: string | null;
  receipt_url: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface PlayerWithGuardians extends Player {
  guardians?: Array<
    Guardian & {
      relationship: GuardianRelationship;
      is_primary_contact: boolean;
      player_guardian_id: string;
    }
  >;
  category?: Category;
}

export interface GuardianInput {
  first_name: string;
  last_name: string;
  identification_number: string;
  phone_number: string;
  relationship: GuardianRelationship;
  is_primary_contact?: boolean;
}

export interface CreatePlayerInput {
  academy_id: string;
  category_id: string;
  first_name: string;
  last_name: string;
  identification_number?: string;
  birth_date: string;
  jersey_number?: number;
  preferred_foot?: 'derecho' | 'izquierdo' | 'ambidiestro';
  position?: FutsalPosition;
  photo_url?: string;
  status?: PlayerStatus;
  guardians: GuardianInput[];
}

// Furia Menor - Tournament Module
export type TournamentStatus = 'draft' | 'inscripciones' | 'en_curso' | 'finalizado' | 'cancelado';
export type TournamentCategoryAge = 'Sub-6' | 'Sub-8' | 'Sub-10' | 'Sub-12' | 'Sub-14' | 'Sub-16' | 'Sub-18';
export type PhaseType = 'grupos' | 'eliminacion_directa' | 'liguilla' | 'playoffs';
export type MatchStatus = 'programado' | 'en_juego' | 'finalizado' | 'aplazado' | 'cancelado';
export type CardType = 'amarilla' | 'roja';
export type SanctionType = 'amonestacion' | 'suspension' | 'expulsion';

export interface Tournament {
  id: string;
  name: string;
  slug: string;
  organizer_id: string | null;
  season: string | null;
  start_date: string | null;
  end_date: string | null;
  status: TournamentStatus;
  location: string | null;
  description: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface TournamentCategory {
  id: string;
  tournament_id: string;
  age_group: TournamentCategoryAge;
  name: string;
  max_teams: number | null;
  registration_open: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TournamentTeam {
  id: string;
  tournament_id: string;
  tournament_category_id: string;
  academy_id: string;
  team_name: string | null;
  status: 'inscrito' | 'aprobado' | 'rechazado' | 'retirado';
  registered_at?: string;
  notes: string | null;
}

export interface TournamentPhase {
  id: string;
  tournament_id: string;
  tournament_category_id: string;
  name: string;
  phase_type: PhaseType;
  order_index: number;
  start_date: string | null;
  end_date: string | null;
  created_at?: string;
}

export interface TournamentGroup {
  id: string;
  phase_id: string;
  name: string;
  order_index: number;
  created_at?: string;
}

export interface TournamentGroupTeam {
  id: string;
  group_id: string;
  tournament_team_id: string;
  position: number | null;
  created_at?: string;
}

export interface Match {
  id: string;
  tournament_id: string;
  tournament_category_id: string;
  phase_id: string | null;
  group_id: string | null;
  home_team_id: string;
  away_team_id: string;
  match_date: string | null;
  match_time: string | null;
  venue: string | null;
  referee_name: string | null;
  delegate_name: string | null;
  status: MatchStatus;
  home_score: number | null;
  away_score: number | null;
  notes: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface MatchEvent {
  id: string;
  match_id: string;
  player_id: string;
  event_type: CardType | 'gol' | 'autogol';
  minute: number | null;
  notes: string | null;
  created_at?: string;
}

export interface MatchSanction {
  id: string;
  match_id: string;
  player_id: string;
  sanction_type: SanctionType;
  reason: string | null;
  matches_suspended: number | null;
  start_date: string | null;
  end_date: string | null;
  created_at?: string;
}

export interface StandingsRow {
  tournament_team_id: string;
  team_name: string | null;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
}

export interface TopScorer {
  player_id: string;
  first_name: string;
  last_name: string;
  team_name: string | null;
  goals: number;
}

export interface CreateTournamentInput {
  name: string;
  slug: string;
  season?: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  description?: string;
  status?: TournamentStatus;
}

export interface CreateTournamentCategoryInput {
  tournament_id: string;
  age_group: TournamentCategoryAge;
  name: string;
  max_teams?: number;
  registration_open?: boolean;
}

export interface CreateMatchInput {
  tournament_id: string;
  tournament_category_id: string;
  phase_id?: string;
  group_id?: string;
  home_team_id: string;
  away_team_id: string;
  match_date?: string;
  match_time?: string;
  venue?: string;
  referee_name?: string;
  delegate_name?: string;
}

export interface RegisterTeamInput {
  tournament_id: string;
  tournament_category_id: string;
  academy_id: string;
  team_name?: string;
  notes?: string;
}
