import { ALL_NOV_2026_FIXTURES } from "@/data/fixtures-noviembre-2026";

export const CATEGORIES = [
  "Sub-6",
  "Sub-8",
  "Sub-10",
  "Sub-12",
  "Sub-14",
  "Sub-16",
  "Sub-18",
  "Sub-20",
  "Libre",
  "Master 40",
  "Master 50",
  "Institucional",
] as const;
export const MODALITIES = ["primera", "segunda"] as const;

export type Category = (typeof CATEGORIES)[number];
export type Modality = (typeof MODALITIES)[number];

export type MatchStatus = "scheduled" | "live" | "finished";

export const modalityLabels: Record<Modality, string> = {
  primera: "1ra División",
  segunda: "2da División",
};

export interface MatchReferees {
  principal: string;
  asistente: string;
  mesa?: string;
}

export interface Match {
  id: string;
  category: Category;
  modality: Modality;
  division?: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  matchDate: string;
  matchTime: string;
  venue: string;
  status: MatchStatus;
  matchday: number;
  jornada?: string;
  referees?: MatchReferees;
}

export const officialNovMatchesAsDaeris: Match[] = ALL_NOV_2026_FIXTURES.map((f) => ({
  id: f.id,
  category: f.category as Category,
  modality: f.division?.includes("2da") ? "segunda" : "primera",
  division: f.division || (f.discipline === "Fútbol 7" ? "Fútbol 7" : "1ra División"),
  homeTeam: f.homeTeam,
  awayTeam: f.awayTeam,
  homeScore: f.homeScore,
  awayScore: f.awayScore,
  matchDate: f.matchDate,
  matchTime: f.matchTime,
  venue: f.venue,
  status: f.status,
  matchday: f.matchday,
  jornada: f.jornada,
  referees: f.referees,
}));

// Único calendario oficial: contiene estrictamente los partidos programados
export const torneoDaerisMatches: Match[] = [
  ...officialNovMatchesAsDaeris,
];
