import { OfficialTableRow } from "@/components/tournaments/tournament-official-table";
import { Scorer, Goalkeeper } from "@/data/daeris";
import {
  createGenericStandings,
  createGenericScorers,
  createGenericKeepers,
  createGenericMatches,
} from "@/data/generic-tournament-data";

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
  status: string;
  venue: string;
  venueShort: string;
  categories: string[];
  totalTeams: number;
  groupName?: string;
  qualificationRule?: string;
  qualificationCutoff?: number;
  highlightedMatch: TournamentMatchItem;
  matches: TournamentMatchItem[];
  standings: OfficialTableRow[];
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
    totalTeams: 11,
    groupName: "GRUPO A",
    qualificationRule: "CLASIFICAN LOS 8 PRIMEROS DE CADA GRUPO",
    qualificationCutoff: 8,
    highlightedMatch: {
      id: "td-generic-1",
      category: "Sub-12 Élite",
      division: "1ra División",
      homeTeam: "Equipo 1",
      awayTeam: "Equipo 2",
      homeScore: null,
      awayScore: null,
      matchDate: "2026-11-08",
      matchTime: "10:00",
      venue: "Cancha Gimnasio Libertador del 23 de Enero",
      status: "scheduled",
      jornada: "JORNADA SÁBADO · FECHA OFICIAL",
    },
    matches: createGenericMatches("Torneo Daeris", "Sub-12 Élite", "Gimnasio Libertador, 23 de Enero", "Equipo"),
    standings: createGenericStandings("Equipo"),
    topScorers: createGenericScorers("Equipo"),
    leastConceded: createGenericKeepers("Equipo"),
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
    totalTeams: 11,
    groupName: "GRUPO PRUEBA A",
    qualificationRule: "CLASIFICAN LOS 8 PRIMEROS DE CADA GRUPO",
    qualificationCutoff: 8,
    highlightedMatch: {
      id: "tp-generic-1",
      category: "Sub-12",
      division: "Fase Piloto",
      homeTeam: "Equipo 1",
      awayTeam: "Equipo 2",
      homeScore: null,
      awayScore: null,
      matchDate: "2026-11-08",
      matchTime: "09:00",
      venue: "Cancha Parque Central, Caracas",
      status: "scheduled",
      jornada: "JORNADA 1 · PRUEBA",
    },
    matches: createGenericMatches("Torneo de Prueba", "Sub-12", "Cancha Parque Central, Caracas", "Equipo"),
    standings: createGenericStandings("Equipo"),
    topScorers: createGenericScorers("Equipo"),
    leastConceded: createGenericKeepers("Equipo"),
    accentColor: {
      badge: "prueba",
      border: "border-sky-500/40 hover:border-sky-400",
      bgGlow: "from-sky-950/40 via-neutral-900 to-neutral-950",
      pill: "bg-sky-500/10 text-sky-400 border-sky-500/30",
      text: "text-sky-400",
    },
  },
};
