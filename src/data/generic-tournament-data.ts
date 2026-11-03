import { OfficialTableRow } from "@/components/tournaments/tournament-official-table";
import { TournamentMatchItem, MatchReferees } from "@/data/tournaments-data";
import { Scorer, Goalkeeper } from "@/data/daeris";
import {
  generatePlayerTournamentId,
  generateTeamId,
  normalizeCategoryCode,
  normalizeDivisionCode,
  TeamPlayerItem,
  TeamProfile,
  PlayerPosition,
} from "@/data/tournament-id-system";

export const MINOR_CATEGORIES = [
  "Sub-8",
  "Sub-10",
  "Sub-12",
  "Sub-14",
  "Sub-16",
  "Sub-18",
  "Sub-20",
] as const;

export type MinorCategory = (typeof MINOR_CATEGORIES)[number];

export function isMinorCategory(value: string): value is MinorCategory {
  return MINOR_CATEGORIES.includes(value as MinorCategory);
}

/**
 * Tabla de posiciones modelo con datos genéricos (Equipo 1, Equipo 2...)
 * Replica con exactitud la planilla de competición del usuario.
 */
export function createGenericStandings(prefix = "Equipo"): OfficialTableRow[] {
  return [
    { pos: 1, team: `${prefix} 1`, jj: 8, jg: 6, je: 0, jp: 2, ga: 37, ge: 13, dif: 24, pts: 18, status: "clasificado" },
    { pos: 2, team: `${prefix} 2`, jj: 6, jg: 4, je: 1, jp: 1, ga: 19, ge: 5, dif: 14, pts: 13, status: "clasificado" },
    { pos: 3, team: `${prefix} 3`, jj: 4, jg: 4, je: 0, jp: 0, ga: 27, ge: 5, dif: 22, pts: 12, status: "clasificado" },
    { pos: 4, team: `${prefix} 4`, jj: 6, jg: 4, je: 0, jp: 2, ga: 20, ge: 11, dif: 9, pts: 12, status: "clasificado" },
    { pos: 5, team: `${prefix} 5`, jj: 8, jg: 4, je: 0, jp: 4, ga: 18, ge: 15, dif: 3, pts: 12, status: "clasificado" },
    { pos: 6, team: `${prefix} 6`, jj: 6, jg: 3, je: 1, jp: 2, ga: 17, ge: 8, dif: 9, pts: 10, status: "clasificado" },
    { pos: 7, team: `${prefix} 7`, jj: 7, jg: 2, je: 2, jp: 3, ga: 15, ge: 22, dif: -7, pts: 8, status: "clasificado" },
    { pos: 8, team: `${prefix} 8`, jj: 4, jg: 2, je: 0, jp: 2, ga: 11, ge: 5, dif: 6, pts: 6, status: "clasificado" },
    { pos: 9, team: `${prefix} 9`, jj: 5, jg: 2, je: 0, jp: 3, ga: 16, ge: 15, dif: 1, pts: 6, status: "normal" },
    { pos: 10, team: `${prefix} 10`, jj: 4, jg: 1, je: 0, jp: 3, ga: 11, ge: 22, dif: -11, pts: 3, status: "normal" },
    { pos: 11, team: `${prefix} 11`, jj: 10, jg: 0, je: 0, jp: 10, ga: 0, ge: 70, dif: -70, pts: 0, status: "eliminado" },
  ];
}

/**
 * Genera la tabla para una categoría menor específica (Sub-8 a Sub-20).
 * Para Sub-12 genera la réplica exacta de la imagen oficial del usuario.
 * Para las demás genera variaciones estadísticas realistas.
 */
export function createCategoryStandings(
  category: MinorCategory,
  prefix = "Equipo"
): OfficialTableRow[] {
  if (category === "Sub-12") {
    return createGenericStandings(`${prefix}`);
  }

  const catOffset: Record<MinorCategory, number> = {
    "Sub-8": 1,
    "Sub-10": 2,
    "Sub-12": 0,
    "Sub-14": 3,
    "Sub-16": 4,
    "Sub-18": 5,
    "Sub-20": 6,
  };

  const seed = catOffset[category];

  return [
    { pos: 1, team: `${prefix} ${((1 + seed) % 11) + 1}`, jj: 7, jg: 6, je: 0, jp: 1, ga: 28 + seed, ge: 9, dif: 19 + seed, pts: 18, status: "clasificado" },
    { pos: 2, team: `${prefix} ${((2 + seed) % 11) + 1}`, jj: 7, jg: 5, je: 1, jp: 1, ga: 22 + seed, ge: 8, dif: 14 + seed, pts: 16, status: "clasificado" },
    { pos: 3, team: `${prefix} ${((3 + seed) % 11) + 1}`, jj: 6, jg: 4, je: 1, jp: 1, ga: 19 + seed, ge: 10, dif: 9 + seed, pts: 13, status: "clasificado" },
    { pos: 4, team: `${prefix} ${((4 + seed) % 11) + 1}`, jj: 7, jg: 4, je: 0, jp: 3, ga: 17 + seed, ge: 12, dif: 5 + seed, pts: 12, status: "clasificado" },
    { pos: 5, team: `${prefix} ${((5 + seed) % 11) + 1}`, jj: 6, jg: 3, je: 1, jp: 2, ga: 14 + seed, ge: 11, dif: 3 + seed, pts: 10, status: "clasificado" },
    { pos: 6, team: `${prefix} ${((6 + seed) % 11) + 1}`, jj: 6, jg: 3, je: 0, jp: 3, ga: 13 + seed, ge: 12, dif: 1 + seed, pts: 9, status: "clasificado" },
    { pos: 7, team: `${prefix} ${((7 + seed) % 11) + 1}`, jj: 7, jg: 2, je: 2, jp: 3, ga: 12 + seed, ge: 15, dif: -3, pts: 8, status: "clasificado" },
    { pos: 8, team: `${prefix} ${((8 + seed) % 11) + 1}`, jj: 6, jg: 2, je: 1, jp: 3, ga: 10 + seed, ge: 13, dif: -3, pts: 7, status: "clasificado" },
    { pos: 9, team: `${prefix} ${((9 + seed) % 11) + 1}`, jj: 6, jg: 1, je: 1, jp: 4, ga: 8 + seed, ge: 18, dif: -10, pts: 4, status: "normal" },
    { pos: 10, team: `${prefix} ${((10 + seed) % 11) + 1}`, jj: 6, jg: 1, je: 0, jp: 5, ga: 7 + seed, ge: 21, dif: -14, pts: 3, status: "normal" },
    { pos: 11, team: `${prefix} ${((11 + seed) % 11) + 1}`, jj: 7, jg: 0, je: 1, jp: 6, ga: 4, ge: 38 + seed, dif: -(34 + seed), pts: 1, status: "eliminado" },
  ];
}

/**
 * Goleadores genéricos
 */
export function createGenericScorers(teamPrefix = "Equipo", category: MinorCategory = "Sub-12"): Scorer[] {
  return [
    { player: "Jugador 1", team: `${teamPrefix} 1`, category: category as any, modality: "primera", goals: 9 },
    { player: "Jugador 2", team: `${teamPrefix} 2`, category: category as any, modality: "primera", goals: 7 },
    { player: "Jugador 3", team: `${teamPrefix} 3`, category: category as any, modality: "primera", goals: 5 },
    { player: "Jugador 4", team: `${teamPrefix} 4`, category: category as any, modality: "primera", goals: 4 },
    { player: "Jugador 5", team: `${teamPrefix} 5`, category: category as any, modality: "primera", goals: 3 },
  ];
}

/**
 * Vallas menos vencidas genéricas
 */
export function createGenericKeepers(teamPrefix = "Equipo", category: MinorCategory = "Sub-12"): Goalkeeper[] {
  return [
    { player: "Portero 1", team: `${teamPrefix} 1`, category: category as any, modality: "primera", goalsConceded: 3, matchesPlayed: 6, cleanSheets: 4 },
    { player: "Portero 2", team: `${teamPrefix} 2`, category: category as any, modality: "primera", goalsConceded: 5, matchesPlayed: 6, cleanSheets: 3 },
    { player: "Portero 3", team: `${teamPrefix} 3`, category: category as any, modality: "primera", goalsConceded: 4, matchesPlayed: 5, cleanSheets: 3 },
    { player: "Portero 4", team: `${teamPrefix} 4`, category: category as any, modality: "primera", goalsConceded: 6, matchesPlayed: 5, cleanSheets: 2 },
  ];
}

/**
 * Cuerpos arbitrales designados por encuentro
 */
export const genericReferees: MatchReferees[] = [
  {
    principal: "Árbitro 1 (Principal)",
    asistente: "Árbitro 2 (Segundo Árbitro)",
    mesa: "Anotador 1 (Cronometrador / Mesa)",
  },
  {
    principal: "Árbitro 3 (Principal)",
    asistente: "Árbitro 4 (Segundo Árbitro)",
    mesa: "Anotador 2 (Cronometrador / Mesa)",
  },
  {
    principal: "Árbitro 5 (Principal)",
    asistente: "Árbitro 6 (Segundo Árbitro)",
    mesa: "Anotador 3 (Cronometrador / Mesa)",
  },
  {
    principal: "Árbitro 7 (Principal)",
    asistente: "Árbitro 8 (Segundo Árbitro)",
    mesa: "Anotador 4 (Cronometrador / Mesa)",
  },
];

/**
 * Partidos genéricos con cuerpo arbitral oficial
 */
export function createGenericMatches(
  tournamentName: string,
  category = "Categoría Principal",
  venue = "Cancha Principal, Caracas",
  prefix = "Equipo"
): TournamentMatchItem[] {
  return [
    {
      id: `${tournamentName.toLowerCase().replace(/\s+/g, "-")}-${category.toLowerCase()}-1`,
      category,
      division: "Fase Regular",
      homeTeam: `${prefix} 1`,
      awayTeam: `${prefix} 2`,
      homeScore: null,
      awayScore: null,
      matchDate: "2026-11-08",
      matchTime: "09:00",
      venue,
      status: "scheduled",
      jornada: `JORNADA 1 · PRÓXIMA FECHA (${category})`,
      referees: genericReferees[0],
    },
    {
      id: `${tournamentName.toLowerCase().replace(/\s+/g, "-")}-${category.toLowerCase()}-2`,
      category,
      division: "Fase Regular",
      homeTeam: `${prefix} 3`,
      awayTeam: `${prefix} 4`,
      homeScore: null,
      awayScore: null,
      matchDate: "2026-11-08",
      matchTime: "10:15",
      venue,
      status: "scheduled",
      jornada: `JORNADA 1 · PRÓXIMA FECHA (${category})`,
      referees: genericReferees[1],
    },
    {
      id: `${tournamentName.toLowerCase().replace(/\s+/g, "-")}-${category.toLowerCase()}-3`,
      category,
      division: "Fase Regular",
      homeTeam: `${prefix} 5`,
      awayTeam: `${prefix} 6`,
      homeScore: 3,
      awayScore: 1,
      matchDate: "2026-11-01",
      matchTime: "11:30",
      venue,
      status: "finished",
      jornada: `JORNADA ANTERIOR · RESULTADO (${category})`,
      referees: genericReferees[2],
    },
    {
      id: `${tournamentName.toLowerCase().replace(/\s+/g, "-")}-${category.toLowerCase()}-4`,
      category,
      division: "Fase Regular",
      homeTeam: `${prefix} 7`,
      awayTeam: `${prefix} 8`,
      homeScore: 2,
      awayScore: 2,
      matchDate: "2026-11-01",
      matchTime: "12:45",
      venue,
      status: "finished",
      jornada: `JORNADA ANTERIOR · RESULTADO (${category})`,
      referees: genericReferees[3],
    },
  ];
}

/**
 * Genera la plantilla oficial y perfil de los 11 equipos de un torneo/categoría
 * con IDs únicos de Torneo-Jugador para actualización automática en base de datos.
 */
export function createGenericTeamProfiles(
  tournamentSlug: string,
  tournamentName: string,
  category = "Sub-12",
  tournamentCode = "DAE"
): TeamProfile[] {
  const divisionCode = normalizeDivisionCode(tournamentSlug);
  const catCode = normalizeCategoryCode(category);

  const positions: PlayerPosition[] = [
    "Portero",
    "Cierre",
    "Cierre",
    "Ala",
    "Ala",
    "Ala",
    "Ala",
    "Pívot",
    "Pívot",
    "Portero",
  ];

  const dorsales = [1, 2, 3, 4, 7, 8, 11, 9, 10, 12];

  const teams: TeamProfile[] = [];

  for (let t = 1; t <= 11; t++) {
    const teamNumStr = String(t).padStart(2, "0");
    const teamCode = `EQ${teamNumStr}`;
    const teamId = generateTeamId(tournamentCode, divisionCode, catCode, teamNumStr);
    const teamSlug = `equipo-${t}`;
    const teamName = `Equipo ${t}`;

    const roster: TeamPlayerItem[] = [];

    for (let p = 0; p < 10; p++) {
      const dorsal = dorsales[p];
      const pos = positions[p];
      // CI única determinista basada en el número de equipo y dorsal
      const ciRaw = 33000000 + t * 1000 + dorsal * 10;
      const ciFormatted = `V-${String(ciRaw).replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2.$3")}`;
      const playerUniqueId = generatePlayerTournamentId(
        tournamentCode,
        divisionCode,
        catCode,
        teamCode,
        `V${ciRaw}`
      );

      const isKeeper = pos === "Portero";
      const isTopScorer = dorsal === 10 || dorsal === 9;

      roster.push({
        id: playerUniqueId,
        ci: ciFormatted,
        dorsal,
        name: `Jugador ${t}-${dorsal}`,
        position: pos,
        category,
        teamId,
        teamName,
        matchesPlayed: 6,
        goals: isKeeper ? 0 : isTopScorer ? (t === 1 ? 8 : 4) : p % 3,
        yellowCards: p % 4 === 0 ? 1 : 0,
        redCards: 0,
        cleanSheets: isKeeper ? (t <= 3 ? 3 : 1) : undefined,
        goalsConceded: isKeeper ? (t === 1 ? 3 : 6) : undefined,
      });
    }

    teams.push({
      id: teamId,
      slug: teamSlug,
      name: teamName,
      shortName: `EQ ${t}`,
      tournamentId: tournamentCode.toLowerCase(),
      subTournamentSlug: tournamentSlug,
      subTournamentName: tournamentName,
      category,
      coach: `Director Técnico ${t}`,
      assistantCoach: `Asistente Técnico ${t}`,
      delegate: `Delegado ${t}`,
      venue: "Cancha Principal, Gimnasio Libertador",
      roster,
    });
  }

  return teams;
}
