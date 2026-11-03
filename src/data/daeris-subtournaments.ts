import { TournamentMatchItem } from "@/data/tournaments-data";
import { OfficialTableRow } from "@/components/tournaments/tournament-official-table";
import { Scorer, Goalkeeper } from "@/data/daeris";
import { TeamProfile } from "@/data/tournament-id-system";
import {
  MINOR_CATEGORIES,
  MinorCategory,
  createGenericStandings,
  createCategoryStandings,
  createGenericScorers,
  createGenericKeepers,
  createGenericMatches,
  createGenericTeamProfiles,
} from "@/data/generic-tournament-data";

export type DaerisSubId =
  | "institucional"
  | "futbol7"
  | "master50"
  | "libre-parquecarabobo"
  | "infantil-1ra"
  | "infantil-2da";

export interface CategoryPayload {
  standings: OfficialTableRow[];
  topScorers: Scorer[];
  leastConceded: Goalkeeper[];
  matches: TournamentMatchItem[];
  teams: TeamProfile[];
}

export interface DaerisSubTournament {
  id: DaerisSubId;
  slug: string;
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
  hasCategories?: boolean;
  categories?: readonly MinorCategory[];
  categoryData?: Record<MinorCategory, CategoryPayload>;
  accent: {
    border: string;
    pill: string;
    text: string;
  };
  matches: TournamentMatchItem[];
  standings: OfficialTableRow[];
  topScorers: Scorer[];
  leastConceded: Goalkeeper[];
  teams: TeamProfile[];
}

/**
 * Genera el paquete completo de datos para una categoría infantil
 */
function buildCategoryPayload(
  tournamentSlug: string,
  tournamentName: string,
  category: MinorCategory,
  venue: string,
  prefix: string,
  tournamentCode = "DAE"
): CategoryPayload {
  return {
    standings: createCategoryStandings(category, prefix),
    topScorers: createGenericScorers(prefix, category),
    leastConceded: createGenericKeepers(prefix, category),
    matches: createGenericMatches(tournamentName, category, venue, prefix),
    teams: createGenericTeamProfiles(tournamentSlug, tournamentName, category, tournamentCode),
  };
}

/**
 * Genera el diccionario para todas las categorías (Sub-8 a Sub-20)
 */
function buildAllMinorCategories(
  tournamentSlug: string,
  tournamentName: string,
  venue: string,
  prefix: string,
  tournamentCode = "DAE"
): Record<MinorCategory, CategoryPayload> {
  const result = {} as Record<MinorCategory, CategoryPayload>;
  for (const cat of MINOR_CATEGORIES) {
    result[cat] = buildCategoryPayload(tournamentSlug, tournamentName, cat, venue, prefix, tournamentCode);
  }
  return result;
}

const infantil1raCatData = buildAllMinorCategories(
  "infantil-1ra-division",
  "Torneo Infantil 1ra Div",
  "Gimnasio Libertador, 23 de Enero",
  "Equipo",
  "DAE"
);

const infantil2daCatData = buildAllMinorCategories(
  "infantil-2da-division",
  "Torneo Infantil 2da Div",
  "Gimnasio Libertador, 23 de Enero",
  "Equipo",
  "DAE"
);

export const daerisSubTournaments: Record<DaerisSubId, DaerisSubTournament> = {
  // 1. Torneo Institucional
  institucional: {
    id: "institucional",
    slug: "institucional",
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
    hasCategories: false,
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
    teams: createGenericTeamProfiles("institucional", "Torneo Institucional", "Institucional", "DAE"),
  },

  // 2. Fútbol 7 Institucional
  futbol7: {
    id: "futbol7",
    slug: "futbol-7-institucional",
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
    hasCategories: false,
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
    teams: createGenericTeamProfiles("futbol-7-institucional", "Fútbol 7 Institucional", "Fútbol 7", "DAE"),
  },

  // 3. Master 50
  master50: {
    id: "master50",
    slug: "master-50",
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
    hasCategories: false,
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
    teams: createGenericTeamProfiles("master-50", "Master 50", "Master 50", "DAE"),
  },

  // 4. Torneo Libre Parque Carabobo
  "libre-parquecarabobo": {
    id: "libre-parquecarabobo",
    slug: "libre-parque-carabobo",
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
    hasCategories: false,
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
    teams: createGenericTeamProfiles("libre-parque-carabobo", "Torneo Libre Parque Carabobo", "Libre", "DAE"),
  },

  // 5. Torneo Infantil 1era División
  "infantil-1ra": {
    id: "infantil-1ra",
    slug: "infantil-1ra-division",
    name: "Torneo Infantil 1era División",
    shortName: "Infantil 1ra Div",
    categoryLabel: "Sub-8 a Sub-20 · Élite",
    badgeKey: "infantil-1ra",
    venue: "Gimnasio Libertador del 23 de Enero, Caracas",
    teamsCount: 11,
    status: "En Curso",
    groupName: "GRUPO A",
    qualificationRule: "CLASIFICAN LOS 8 PRIMEROS DE CADA GRUPO",
    qualificationCutoff: 8,
    hasCategories: true,
    categories: MINOR_CATEGORIES,
    categoryData: infantil1raCatData,
    description: "Competencia formativa élite de fútbol menor caraqueño segmentada desde la Sub-8 hasta la Sub-20.",
    accent: {
      border: "border-red-500/50 hover:border-red-500",
      pill: "bg-red-500/10 text-red-400 border-red-500/30",
      text: "text-red-400",
    },
    // Datos default (Sub-12)
    matches: infantil1raCatData["Sub-12"].matches,
    standings: infantil1raCatData["Sub-12"].standings,
    topScorers: infantil1raCatData["Sub-12"].topScorers,
    leastConceded: infantil1raCatData["Sub-12"].leastConceded,
    teams: infantil1raCatData["Sub-12"].teams,
  },

  // 6. Torneo Infantil 2da División
  "infantil-2da": {
    id: "infantil-2da",
    slug: "infantil-2da-division",
    name: "Torneo Infantil 2da División",
    shortName: "Infantil 2da Div",
    categoryLabel: "Sub-8 a Sub-20 · Ascenso",
    badgeKey: "infantil-2da",
    venue: "Gimnasio Libertador del 23 de Enero, Caracas",
    teamsCount: 11,
    status: "En Curso",
    groupName: "GRUPO B",
    qualificationRule: "CLASIFICAN LOS 8 PRIMEROS DE CADA GRUPO",
    qualificationCutoff: 8,
    hasCategories: true,
    categories: MINOR_CATEGORIES,
    categoryData: infantil2daCatData,
    description: "Rama formativa de desarrollo y ascenso segmentada desde la Sub-8 hasta la Sub-20.",
    accent: {
      border: "border-blue-500/50 hover:border-blue-400",
      pill: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      text: "text-blue-400",
    },
    // Datos default (Sub-12)
    matches: infantil2daCatData["Sub-12"].matches,
    standings: infantil2daCatData["Sub-12"].standings,
    topScorers: infantil2daCatData["Sub-12"].topScorers,
    leastConceded: infantil2daCatData["Sub-12"].leastConceded,
    teams: infantil2daCatData["Sub-12"].teams,
  },
};

export const daerisSubList = Object.values(daerisSubTournaments);

/**
 * Busca un torneo de Daeris por slug o id
 */
export function getDaerisSubTournament(slugOrId: string): DaerisSubTournament | undefined {
  const normalized = slugOrId.toLowerCase().trim();

  return daerisSubList.find(
    (t) =>
      t.slug === normalized ||
      t.id === normalized ||
      t.id.replace("-", "") === normalized.replace("-", "") ||
      t.slug.replace(/-/g, "") === normalized.replace(/-/g, "")
  );
}

/**
 * Obtiene los datos activos (respetando la categoría seleccionada Sub-8 a Sub-20 si aplica)
 */
export function getSubTournamentData(
  tournament: DaerisSubTournament,
  categoryParam?: string | null
): {
  standings: OfficialTableRow[];
  topScorers: Scorer[];
  leastConceded: Goalkeeper[];
  matches: TournamentMatchItem[];
  teams: TeamProfile[];
  activeCategory: MinorCategory | null;
} {
  if (tournament.hasCategories && tournament.categoryData) {
    let chosenCat: MinorCategory = "Sub-12";
    if (categoryParam) {
      const match = MINOR_CATEGORIES.find(
        (c) => c.toLowerCase() === categoryParam.toLowerCase().trim()
      );
      if (match) {
        chosenCat = match;
      }
    }

    const payload = tournament.categoryData[chosenCat];
    return {
      standings: payload.standings,
      topScorers: payload.topScorers,
      leastConceded: payload.leastConceded,
      matches: payload.matches,
      teams: payload.teams,
      activeCategory: chosenCat,
    };
  }

  return {
    standings: tournament.standings,
    topScorers: tournament.topScorers,
    leastConceded: tournament.leastConceded,
    matches: tournament.matches,
    teams: tournament.teams,
    activeCategory: null,
  };
}

/**
 * Busca un equipo por su slug dentro del torneo
 */
export function getTeamInTournament(
  tournament: DaerisSubTournament,
  teamSlug: string,
  categoryParam?: string | null
): TeamProfile | undefined {
  const { teams } = getSubTournamentData(tournament, categoryParam);
  return teams.find(
    (t) =>
      t.slug.toLowerCase() === teamSlug.toLowerCase() ||
      t.name.toLowerCase().replace(/\s+/g, "-") === teamSlug.toLowerCase() ||
      t.id.toLowerCase() === teamSlug.toLowerCase()
  );
}
