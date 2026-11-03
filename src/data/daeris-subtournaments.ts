import { TournamentMatchItem } from "@/data/tournaments-data";
import { OfficialTableRow } from "@/components/tournaments/tournament-official-table";
import { Scorer, Goalkeeper } from "@/data/daeris";
import {
  createGenericStandings,
  createGenericScorers,
  createGenericKeepers,
  createGenericMatches,
} from "@/data/generic-tournament-data";

export type DaerisSubId =
  | "institucional"
  | "futbol7"
  | "master50"
  | "libre-parquecarabobo"
  | "infantil-1ra"
  | "infantil-2da";

export interface DaerisSubTournament {
  id: DaerisSubId;
  name: string;
  shortName: string;
  categoryLabel: string;
  badgeKey: DaerisSubId;
  venue: string;
  teamsCount: number;
  status: "En Curso" | "Fase Regular" | "Semifinales" | "Próxima Jornada";
  description: string;
  groupName: string;
  qualificationRule: string;
  qualificationCutoff: number;
  accent: {
    border: string;
    pill: string;
    text: string;
  };
  matches: TournamentMatchItem[];
  standings: OfficialTableRow[];
  topScorers: Scorer[];
  leastConceded: Goalkeeper[];
}

export const daerisSubTournaments: Record<DaerisSubId, DaerisSubTournament> = {
  // 1. Torneo Institucional
  institucional: {
    id: "institucional",
    name: "Torneo Institucional",
    shortName: "Institucional",
    categoryLabel: "Empresas & Organismos",
    badgeKey: "institucional",
    venue: "Cancha Gimnasio Libertador del 23 de Enero, Caracas",
    teamsCount: 11,
    status: "Fase Regular",
    groupName: "GRUPO INSTITUCIONAL A",
    qualificationRule: "CLASIFICAN LOS 8 PRIMEROS A CUARTOS DE FINAL",
    qualificationCutoff: 8,
    description: "Torneo institucional de futsal para entidades públicas y privadas.",
    accent: {
      border: "border-amber-500/50 hover:border-amber-400",
      pill: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      text: "text-amber-400",
    },
    matches: createGenericMatches("Torneo Institucional", "Institucional", "Gimnasio Libertador, 23 de Enero", "Equipo"),
    standings: createGenericStandings("Equipo"),
    topScorers: createGenericScorers("Equipo"),
    leastConceded: createGenericKeepers("Equipo"),
  },

  // 2. Fútbol 7 Institucional
  futbol7: {
    id: "futbol7",
    name: "Fútbol 7 Institucional",
    shortName: "Fútbol 7 Inst",
    categoryLabel: "Modalidad Fútbol 7",
    badgeKey: "futbol7",
    venue: "Complejo Deportivo San Agustín, Caracas",
    teamsCount: 11,
    status: "En Curso",
    groupName: "GRUPO F7 ÚNICO",
    qualificationRule: "CLASIFICAN LOS 8 PRIMEROS DE CADA GRUPO",
    qualificationCutoff: 8,
    description: "Competición de fútbol 7 en césped sintético institucional.",
    accent: {
      border: "border-emerald-500/50 hover:border-emerald-400",
      pill: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      text: "text-emerald-400",
    },
    matches: createGenericMatches("Fútbol 7 Institucional", "Fútbol 7", "Complejo San Agustín, Caracas", "Equipo"),
    standings: createGenericStandings("Equipo"),
    topScorers: createGenericScorers("Equipo"),
    leastConceded: createGenericKeepers("Equipo"),
  },

  // 3. Master 50
  master50: {
    id: "master50",
    name: "Master 50",
    shortName: "Master +50",
    categoryLabel: "Veteranos (+50 Años)",
    badgeKey: "master50",
    venue: "Cancha Gimnasio Libertador, 23 de Enero",
    teamsCount: 11,
    status: "Semifinales",
    groupName: "GRUPO MASTER VETERANOS",
    qualificationRule: "CLASIFICAN LOS 8 PRIMEROS DE CADA GRUPO",
    qualificationCutoff: 8,
    description: "Torneo de veteranos mayores de 50 años en Caracas.",
    accent: {
      border: "border-yellow-500/50 hover:border-yellow-400",
      pill: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      text: "text-yellow-400",
    },
    matches: createGenericMatches("Master 50", "Master 50", "Gimnasio Libertador, 23 de Enero", "Equipo"),
    standings: createGenericStandings("Equipo"),
    topScorers: createGenericScorers("Equipo"),
    leastConceded: createGenericKeepers("Equipo"),
  },

  // 4. Torneo Libre Parque Carabobo
  "libre-parquecarabobo": {
    id: "libre-parquecarabobo",
    name: "Torneo Libre Parque Carabobo",
    shortName: "Libre P. Carabobo",
    categoryLabel: "Categoría Libre",
    badgeKey: "libre-parquecarabobo",
    venue: "Cancha Municipal Parque Carabobo, La Candelaria",
    teamsCount: 11,
    status: "En Curso",
    groupName: "GRUPO LIBRE NOCTURNO",
    qualificationRule: "CLASIFICAN LOS 8 PRIMEROS DE CADA GRUPO",
    qualificationCutoff: 8,
    description: "Circuito de futsal libre de alta intensidad en Parque Carabobo.",
    accent: {
      border: "border-orange-500/50 hover:border-orange-400",
      pill: "bg-orange-500/10 text-orange-400 border-orange-500/30",
      text: "text-orange-400",
    },
    matches: createGenericMatches("Torneo Libre Parque Carabobo", "Libre", "Cancha Parque Carabobo, Caracas", "Equipo"),
    standings: createGenericStandings("Equipo"),
    topScorers: createGenericScorers("Equipo"),
    leastConceded: createGenericKeepers("Equipo"),
  },

  // 5. Torneo Infantil 1era División
  "infantil-1ra": {
    id: "infantil-1ra",
    name: "Torneo Infantil 1era División",
    shortName: "Infantil 1ra Div",
    categoryLabel: "Sub-6 a Sub-18 · Élite",
    badgeKey: "infantil-1ra",
    venue: "Gimnasio Libertador del 23 de Enero, Caracas",
    teamsCount: 11,
    status: "En Curso",
    groupName: "GRUPO A",
    qualificationRule: "CLASIFICAN LOS 8 PRIMEROS DE CADA GRUPO",
    qualificationCutoff: 8,
    description: "Competencia formativa élite de futsal menor caraqueño con los mejores clubes de 1ra división.",
    accent: {
      border: "border-red-500/50 hover:border-red-500",
      pill: "bg-red-500/10 text-red-400 border-red-500/30",
      text: "text-red-400",
    },
    matches: createGenericMatches("Torneo Infantil 1ra Div", "Sub-12 Élite", "Gimnasio Libertador, 23 de Enero", "Equipo"),
    standings: createGenericStandings("Equipo"),
    topScorers: createGenericScorers("Equipo"),
    leastConceded: createGenericKeepers("Equipo"),
  },

  // 6. Torneo Infantil 2da División
  "infantil-2da": {
    id: "infantil-2da",
    name: "Torneo Infantil 2da División",
    shortName: "Infantil 2da Div",
    categoryLabel: "Sub-6 a Sub-18 · Ascenso",
    badgeKey: "infantil-2da",
    venue: "Gimnasio Libertador del 23 de Enero, Caracas",
    teamsCount: 11,
    status: "En Curso",
    groupName: "GRUPO B",
    qualificationRule: "CLASIFICAN LOS 8 PRIMEROS DE CADA GRUPO",
    qualificationCutoff: 8,
    description: "Rama formativa de desarrollo y ascenso con escuelas emergentes del fútbol base.",
    accent: {
      border: "border-blue-500/50 hover:border-blue-400",
      pill: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      text: "text-blue-400",
    },
    matches: createGenericMatches("Torneo Infantil 2da Div", "Sub-12 Ascenso", "Gimnasio Libertador, 23 de Enero", "Equipo"),
    standings: createGenericStandings("Equipo"),
    topScorers: createGenericScorers("Equipo"),
    leastConceded: createGenericKeepers("Equipo"),
  },
};

export const daerisSubList = Object.values(daerisSubTournaments);
