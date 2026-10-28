export const CATEGORIES = ["Sub-6", "Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"] as const;
export const MODALITIES = ["primera", "segunda"] as const;

export type Category = (typeof CATEGORIES)[number];
export type Modality = (typeof MODALITIES)[number];

export type MatchStatus = "scheduled" | "live" | "finished";

export const modalityLabels: Record<Modality, string> = {
  primera: "1ra División",
  segunda: "2da División",
};

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
}

export const torneoDaerisMatches: Match[] = [
  {
    id: "td-001",
    category: "Sub-10",
    modality: "segunda",
    division: "2da División",
    homeTeam: "DVO Paraçoto",
    awayTeam: "Black Bulls",
    homeScore: null,
    awayScore: null,
    matchDate: "2026-10-24",
    matchTime: "10:00",
    venue: "Cancha Gimnasio Libertador del 23 de Enero",
    status: "scheduled",
    matchday: 1,
    jornada: "JORNADA SÁBADO 24-10-2026",
  },
  {
    id: "td-002",
    category: "Sub-14",
    modality: "segunda",
    division: "2da División",
    homeTeam: "DVO Paraçoto",
    awayTeam: "Black Bulls",
    homeScore: null,
    awayScore: null,
    matchDate: "2026-10-24",
    matchTime: "10:50",
    venue: "Cancha Gimnasio Libertador del 23 de Enero",
    status: "scheduled",
    matchday: 1,
    jornada: "JORNADA SÁBADO 24-10-2026",
  },
  {
    id: "td-003",
    category: "Sub-16",
    modality: "segunda",
    division: "2da División",
    homeTeam: "DVO Paraçoto",
    awayTeam: "Espartanos Cutira",
    homeScore: null,
    awayScore: null,
    matchDate: "2026-10-24",
    matchTime: "11:40",
    venue: "Cancha Gimnasio Libertador del 23 de Enero",
    status: "scheduled",
    matchday: 1,
    jornada: "JORNADA SÁBADO 24-10-2026",
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
  },
  {
    id: "td-005",
    category: "Sub-12",
    modality: "segunda",
    division: "2da División",
    homeTeam: "DVO Paraçoto",
    awayTeam: "Union Libertador",
    homeScore: null,
    awayScore: null,
    matchDate: "2026-10-24",
    matchTime: "13:20",
    venue: "Cancha Gimnasio Libertador del 23 de Enero",
    status: "scheduled",
    matchday: 1,
    jornada: "JORNADA SÁBADO 24-10-2026",
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
  },
  {
    id: "td-007",
    category: "Sub-8",
    modality: "primera",
    division: "1ra División",
    homeTeam: "DVO Paraçoto",
    awayTeam: "Fratelsa Sport Blanco",
    homeScore: null,
    awayScore: null,
    matchDate: "2026-10-24",
    matchTime: "15:00",
    venue: "Cancha Gimnasio Libertador del 23 de Enero",
    status: "scheduled",
    matchday: 1,
    jornada: "JORNADA SÁBADO 24-10-2026",
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
  },
];
