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

export const torneoDaerisMatches: Match[] = [
  ...officialNovMatchesAsDaeris,
  {
    id: "td-001",
    category: "Sub-10",
    modality: "segunda",
    division: "2da División",
    homeTeam: "DVO Paraíso",
    awayTeam: "Black Bulls",
    homeScore: null,
    awayScore: null,
    matchDate: "2026-10-24",
    matchTime: "10:00",
    venue: "Cancha Gimnasio Libertador del 23 de Enero",
    status: "scheduled",
    matchday: 1,
    jornada: "JORNADA SÁBADO 24-10-2026",
    referees: {
      principal: "Árbitro 1 (Principal)",
      asistente: "Árbitro 2 (Auxiliar)",
      mesa: "Anotador 1 (Mesa Técnica)",
    },
  },
  {
    id: "td-002",
    category: "Sub-14",
    modality: "segunda",
    division: "2da División",
    homeTeam: "DVO Paraíso",
    awayTeam: "Black Bulls",
    homeScore: null,
    awayScore: null,
    matchDate: "2026-10-24",
    matchTime: "10:50",
    venue: "Cancha Gimnasio Libertador del 23 de Enero",
    status: "scheduled",
    matchday: 1,
    jornada: "JORNADA SÁBADO 24-10-2026",
    referees: {
      principal: "Árbitro 3 (Principal)",
      asistente: "Árbitro 4 (Auxiliar)",
      mesa: "Anotador 2 (Mesa Técnica)",
    },
  },
  {
    id: "td-003",
    category: "Sub-16",
    modality: "segunda",
    division: "2da División",
    homeTeam: "DVO Paraíso",
    awayTeam: "Espartanos Cutira",
    homeScore: null,
    awayScore: null,
    matchDate: "2026-10-24",
    matchTime: "11:40",
    venue: "Cancha Gimnasio Libertador del 23 de Enero",
    status: "scheduled",
    matchday: 1,
    jornada: "JORNADA SÁBADO 24-10-2026",
    referees: {
      principal: "Árbitro 5 (Principal)",
      asistente: "Árbitro 6 (Auxiliar)",
      mesa: "Anotador 3 (Mesa Técnica)",
    },
  },
  {
    id: "td-004",
    category: "Sub-10",
    modality: "segunda",
    division: "2da División",
    homeTeam: "Tetsu Futsal",
    awayTeam: "Union Libertador",
    homeScore: null,
    awayScore: null,
    matchDate: "2026-10-24",
    matchTime: "12:30",
    venue: "Cancha Gimnasio Libertador del 23 de Enero",
    status: "scheduled",
    matchday: 1,
    jornada: "JORNADA SÁBADO 24-10-2026",
    referees: {
      principal: "Árbitro 7 (Principal)",
      asistente: "Árbitro 8 (Auxiliar)",
      mesa: "Anotador 4 (Mesa Técnica)",
    },
  },
  {
    id: "td-005",
    category: "Sub-12",
    modality: "segunda",
    division: "2da División",
    homeTeam: "DVO Paraíso",
    awayTeam: "Union Libertador",
    homeScore: null,
    awayScore: null,
    matchDate: "2026-10-24",
    matchTime: "13:20",
    venue: "Cancha Gimnasio Libertador del 23 de Enero",
    status: "scheduled",
    matchday: 1,
    jornada: "JORNADA SÁBADO 24-10-2026",
    referees: {
      principal: "Árbitro 1 (Principal)",
      asistente: "Árbitro 2 (Auxiliar)",
      mesa: "Anotador 1 (Mesa Técnica)",
    },
  },
  {
    id: "td-006",
    category: "Sub-14",
    modality: "primera",
    division: "1ra División",
    homeTeam: "Fenix FS",
    awayTeam: "Real Esperanza",
    homeScore: null,
    awayScore: null,
    matchDate: "2026-10-24",
    matchTime: "14:10",
    venue: "Cancha Gimnasio Libertador del 23 de Enero",
    status: "scheduled",
    matchday: 1,
    jornada: "JORNADA SÁBADO 24-10-2026",
    referees: {
      principal: "Árbitro 3 (Principal)",
      asistente: "Árbitro 4 (Auxiliar)",
      mesa: "Anotador 2 (Mesa Técnica)",
    },
  },
  {
    id: "td-007",
    category: "Sub-8",
    modality: "primera",
    division: "1ra División",
    homeTeam: "DVO Paraíso",
    awayTeam: "Fratelsa Sport Blanco",
    homeScore: null,
    awayScore: null,
    matchDate: "2026-10-24",
    matchTime: "15:00",
    venue: "Cancha Gimnasio Libertador del 23 de Enero",
    status: "scheduled",
    matchday: 1,
    jornada: "JORNADA SÁBADO 24-10-2026",
    referees: {
      principal: "Árbitro 5 (Principal)",
      asistente: "Árbitro 6 (Auxiliar)",
      mesa: "Anotador 3 (Mesa Técnica)",
    },
  },
  {
    id: "td-008",
    category: "Sub-8",
    modality: "primera",
    division: "1ra División",
    homeTeam: "Union Libertador",
    awayTeam: "Fratelsa Sport Amarillo",
    homeScore: null,
    awayScore: null,
    matchDate: "2026-10-24",
    matchTime: "15:50",
    venue: "Cancha Gimnasio Libertador del 23 de Enero",
    status: "scheduled",
    matchday: 1,
    jornada: "JORNADA SÁBADO 24-10-2026",
    referees: {
      principal: "Árbitro 7 (Principal)",
      asistente: "Árbitro 8 (Auxiliar)",
      mesa: "Anotador 4 (Mesa Técnica)",
    },
  },
  {
    id: "td-009",
    category: "Sub-8",
    modality: "primera",
    division: "1ra División",
    homeTeam: "Futsaconexion (A)",
    awayTeam: "Fratelsa Sport Negro",
    homeScore: null,
    awayScore: null,
    matchDate: "2026-10-24",
    matchTime: "16:40",
    venue: "Cancha Gimnasio Libertador del 23 de Enero",
    status: "scheduled",
    matchday: 1,
    jornada: "JORNADA SÁBADO 24-10-2026",
    referees: {
      principal: "Árbitro 1 (Principal)",
      asistente: "Árbitro 2 (Auxiliar)",
      mesa: "Anotador 1 (Mesa Técnica)",
    },
  },
  {
    id: "td-010",
    category: "Sub-10",
    modality: "segunda",
    division: "2da División",
    homeTeam: "Academia Winners",
    awayTeam: "Fratelsa Sport",
    homeScore: null,
    awayScore: null,
    matchDate: "2026-10-24",
    matchTime: "17:30",
    venue: "Cancha Gimnasio Libertador del 23 de Enero",
    status: "scheduled",
    matchday: 1,
    jornada: "JORNADA SÁBADO 24-10-2026",
    referees: {
      principal: "Árbitro 3 (Principal)",
      asistente: "Árbitro 4 (Auxiliar)",
      mesa: "Anotador 2 (Mesa Técnica)",
    },
  },
];
