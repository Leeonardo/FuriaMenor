export type MatchStatus = "scheduled" | "live" | "finished";

export type CardType = "yellow_card" | "red_card";

export interface TorneoMatch {
  id: string;
  torneo: "Torneo Daeris";
  category: "Sub-6" | "Sub-8" | "Sub-10" | "Sub-12" | "Sub-14" | "Sub-16" | "Sub-18";
  division: "1era División" | "2da División";
  group?: "Grupo A" | "Grupo B" | "Grupo C";
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  homeScore: number | null;
  awayScore: number | null;
  matchDate: string;
  matchTime: string;
  venue: string;
  status: MatchStatus;
  matchday: number;
  jornada?: string;
}

export interface MatchEvent {
  id: string;
  matchId: string;
  teamId: string;
  playerId: string;
  cardType: CardType;
  minute?: number;
}

export interface StandingRow {
  pos: number;
  team: string;
  teamLogo?: string;
  jj: number;
  jg: number;
  je: number;
  jp: number;
  ga: number;
  ge: number;
  dif: number;
  pts: number;
  ta: number;
  tr: number;
  status?: "clasificado" | "eliminado" | "normal";
  group?: string;
}
