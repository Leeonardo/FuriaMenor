import { torneoDaerisMatches, Category, Modality } from "@/data/daeris/calendario";
import { standingsSub12Elite, StandingRow } from "@/data/daeris/posiciones";
import { topScorers as daerisScorers, leastConceded as daerisKeepers, Scorer, Goalkeeper } from "@/data/daeris";

export type TournamentId = "daeris" | "prueba";

export interface TournamentMatchItem {
  id: string;
  category: string;
  division?: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  matchDate: string;
  matchTime: string;
  venue: string;
  status: "scheduled" | "live" | "finished";
  jornada?: string;
}

export interface TournamentData {
  id: TournamentId;
  name: string;
  shortName: string;
  edition: string;
  sport: string;
  status: "En Curso" | "Fase Regular" | "Inscripciones" | "En Disputa";
  venue: string;
  venueShort: string;
  categories: string[];
  totalTeams: number;
  highlightedMatch: TournamentMatchItem;
  matches: TournamentMatchItem[];
  standings: StandingRow[];
  topScorers: Scorer[];
  leastConceded: Goalkeeper[];
  accentColor: {
    badge: "daeris" | "prueba";
    border: string;
    bgGlow: string;
    pill: string;
    text: string;
  };
}

// Datos para el 2do Torneo: Torneo de Prueba
export const pruebaMatches: TournamentMatchItem[] = [
  {
    id: "tp-001",
    category: "Sub-12",
    division: "1ra División",
    homeTeam: "Guerreros del Balón",
    awayTeam: "Atlético San Martín",
    homeScore: null,
    awayScore: null,
    matchDate: "2026-11-08",
    matchTime: "09:00",
    venue: "Cancha Parque Central, Caracas",
    status: "scheduled",
    jornada: "JORNADA 1 · FASE DE GRUPOS",
  },
  {
    id: "tp-002",
    category: "Sub-14",
    division: "1ra División",
    homeTeam: "Rayos de Catia",
    awayTeam: "Titanes Futsal",
    homeScore: null,
    awayScore: null,
    matchDate: "2026-11-08",
    matchTime: "10:15",
    venue: "Cancha Parque Central, Caracas",
    status: "scheduled",
    jornada: "JORNADA 1 · FASE DE GRUPOS",
  },
  {
    id: "tp-003",
    category: "Sub-10",
    division: "2da División",
    homeTeam: "Halcones FC",
    awayTeam: "Academia El Paraíso",
    homeScore: null,
    awayScore: null,
    matchDate: "2026-11-08",
    matchTime: "11:30",
    venue: "Cancha Parque Central, Caracas",
    status: "scheduled",
    jornada: "JORNADA 1 · FASE DE GRUPOS",
  },
  {
    id: "tp-004",
    category: "Sub-12",
    division: "1ra División",
    homeTeam: "Titanes Futsal",
    awayTeam: "Halcones FC",
    homeScore: 3,
    awayScore: 2,
    matchDate: "2026-11-01",
    matchTime: "10:00",
    venue: "Cancha Parque Central, Caracas",
    status: "finished",
    jornada: "JORNADA PREVIA · AMISTOSO",
  },
  {
    id: "tp-005",
    category: "Sub-14",
    division: "1ra División",
    homeTeam: "Guerreros del Balón",
    awayTeam: "Rayos de Catia",
    homeScore: 1,
    awayScore: 1,
    matchDate: "2026-11-01",
    matchTime: "11:15",
    venue: "Cancha Parque Central, Caracas",
    status: "finished",
    jornada: "JORNADA PREVIA · AMISTOSO",
  },
];

export const pruebaStandings: StandingRow[] = [
  { pos: 1, team: "TITANES FUTSAL", jj: 1, jg: 1, je: 0, jp: 0, ga: 3, ge: 2, dif: 1, pts: 3, category: "Sub-12", division: "1ra", group: "Grupo Único", status: "clasificado" },
  { pos: 2, team: "GUERREROS DEL BALÓN", jj: 1, jg: 0, je: 1, jp: 0, ga: 1, ge: 1, dif: 0, pts: 1, category: "Sub-12", division: "1ra", group: "Grupo Único", status: "clasificado" },
  { pos: 3, team: "RAYOS DE CATIA", jj: 1, jg: 0, je: 1, jp: 0, ga: 1, ge: 1, dif: 0, pts: 1, category: "Sub-12", division: "1ra", group: "Grupo Único", status: "clasificado" },
  { pos: 4, team: "ATLÉTICO SAN MARTÍN", jj: 0, jg: 0, je: 0, jp: 0, ga: 0, ge: 0, dif: 0, pts: 0, category: "Sub-12", division: "1ra", group: "Grupo Único", status: "clasificado" },
  { pos: 5, team: "ACADEMIA EL PARAÍSO", jj: 0, jg: 0, je: 0, jp: 0, ga: 0, ge: 0, dif: 0, pts: 0, category: "Sub-12", division: "1ra", group: "Grupo Único", status: "normal" },
  { pos: 6, team: "HALCONES FC", jj: 1, jg: 0, je: 0, jp: 1, ga: 2, ge: 3, dif: -1, pts: 0, category: "Sub-12", division: "1ra", group: "Grupo Único", status: "normal" },
];

export const pruebaScorers: Scorer[] = [
  { player: "K. Hernández", team: "TITANES FUTSAL", category: "Sub-12", modality: "primera", goals: 2 },
  { player: "S. Blanco", team: "HALCONES FC", category: "Sub-12", modality: "primera", goals: 2 },
  { player: "D. Rangel", team: "GUERREROS DEL BALÓN", category: "Sub-14", modality: "primera", goals: 1 },
  { player: "Y. Medina", team: "RAYOS DE CATIA", category: "Sub-14", modality: "primera", goals: 1 },
];

export const pruebaKeepers: Goalkeeper[] = [
  { player: "A. Quintero", team: "GUERREROS DEL BALÓN", category: "Sub-14", modality: "primera", goalsConceded: 1, matchesPlayed: 1, cleanSheets: 0 },
  { player: "J. Colmenares", team: "RAYOS DE CATIA", category: "Sub-14", modality: "primera", goalsConceded: 1, matchesPlayed: 1, cleanSheets: 0 },
  { player: "M. Padrón", team: "TITANES FUTSAL", category: "Sub-12", modality: "primera", goalsConceded: 2, matchesPlayed: 1, cleanSheets: 0 },
];

export const tournamentsList: Record<TournamentId, TournamentData> = {
  daeris: {
    id: "daeris",
    name: "Torneo Daeris",
    shortName: "Daeris",
    edition: "Temporada 2026",
    sport: "Futsal Menor",
    status: "En Curso",
    venue: "Cancha Gimnasio Libertador del 23 de Enero, Caracas",
    venueShort: "Gimnasio Libertador, 23 de Enero",
    categories: ["Sub-6", "Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"],
    totalTeams: 24,
    highlightedMatch: {
      id: "td-006",
      category: "Sub-14",
      division: "1ra División",
      homeTeam: "Fénix FS",
      awayTeam: "Real Esperanza",
      homeScore: null,
      awayScore: null,
      matchDate: "2026-10-24",
      matchTime: "14:10",
      venue: "Cancha Gimnasio Libertador del 23 de Enero",
      status: "scheduled",
      jornada: "JORNADA SÁBADO 24-10-2026",
    },
    matches: torneoDaerisMatches,
    standings: standingsSub12Elite,
    topScorers: daerisScorers,
    leastConceded: daerisKeepers,
    accentColor: {
      badge: "daeris",
      border: "border-red-500/40 hover:border-red-500",
      bgGlow: "from-red-950/40 via-neutral-900 to-neutral-950",
      pill: "bg-red-500/10 text-red-400 border-red-500/30",
      text: "text-red-400",
    },
  },
  prueba: {
    id: "prueba",
    name: "Torneo de Prueba",
    shortName: "Prueba",
    edition: "Fase Piloto 2026",
    sport: "Futsal Menor",
    status: "En Disputa",
    venue: "Cancha Parque Central, Caracas",
    venueShort: "Parque Central, Caracas",
    categories: ["Sub-10", "Sub-12", "Sub-14", "Sub-16"],
    totalTeams: 12,
    highlightedMatch: pruebaMatches[0],
    matches: pruebaMatches,
    standings: pruebaStandings,
    topScorers: pruebaScorers,
    leastConceded: pruebaKeepers,
    accentColor: {
      badge: "prueba",
      border: "border-sky-500/40 hover:border-sky-400",
      bgGlow: "from-sky-950/40 via-neutral-900 to-neutral-950",
      pill: "bg-sky-500/10 text-sky-400 border-sky-500/30",
      text: "text-sky-400",
    },
  },
};
