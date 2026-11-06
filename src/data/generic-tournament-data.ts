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
 * Equipos Oficiales Oficializados por Categoría extraídos del Calendario Noviembre 2026
 * Cada equipo está enlazado a su academia oficial en el directorio.
 */
export const OFFICIAL_TEAMS_BY_CATEGORY: Record<string, string[]> = {
  "Sub-8": [
    "La Ladera (B)",
    "Fuerza Vinotinto",
    "Funvibra",
    "Fratelsa Sport Blanco",
    "Dvo Manaure",
    "Fratelsa Sport Amarillo",
    "Fusión Académica",
    "Futconexión (A)",
    "Unión Libertador",
    "Dvo JC",
    "Fratelsa Sport Negro",
  ],
  "Sub-10": [
    "Fusión Académica (B)",
    "La Paz Futsal",
    "Futconexión",
    "Inter de Caracas",
    "Real Libertad",
    "Dvo Mirador",
    "Intocable",
    "Funvibra",
    "Fratelsa Sport",
    "FALG",
    "Academia Winners",
  ],
  "Sub-12": [
    "Fusión Académica (A)",
    "Fusión Académica (B)",
    "La Paz Futsal",
    "Espartanos Futsal",
    "Ricardinho",
    "FALG",
    "Tetsu Futsal",
    "Dvo Odín",
  ],
  "Sub-14": [
    "La Ladera (A)",
    "Guatire Futsal",
    "La Ladera",
    "Fuerza Vinotinto",
    "La Ladera (B)",
    "Fénix Futsal",
    "Real Esperanza",
    "Espartanos Futsal",
    "La Paz Futsal Verde",
    "Espartanos Cutira",
    "Dvo Mirador",
    "Dvo Manaure",
    "Funvibra (A)",
    "Dvo JC",
    "Foro Libertador",
    "Tetsu Futsal",
    "Camatagua",
  ],
  "Sub-16": [
    "La Ladera",
    "Guatire Futsal",
    "Real Esperanza (A)",
    "Real Esperanza (B)",
    "Élite Caracas",
    "Espartanos Cutira",
    "Hogar Canario",
    "NC Sport",
    "Espartanos Futsal",
    "Alí Primera",
    "Funvibra",
    "Dvo Manaure",
    "Ricardinho (B)",
    "Unión Libertador",
    "Gladiadores Caricuao",
    "Caricuao",
  ],
  "Sub-18": [
    "Kay Kings",
    "Nuevo Día FC",
    "Los Jardines FC",
    "Guerreros del Valle",
    "Real Esperanza",
    "Felinos FS",
    "Team Soublette",
    "Overcoming",
  ],
  "Sub-20": [
    "Barnije",
    "Real Esperanza",
    "Guerreros del Valle",
    "Unión Libertador",
    "Money Wayy",
    "Club Palace",
    "Inter Plaza",
    "Caricuao",
    "El Plan",
    "Ragnarok",
  ],
  "Libre": [
    "Nacional",
    "Tuyeros FC",
    "Inversiones MA",
    "Los Expertos",
    "Team 1408",
    "Gladiadores del Este",
    "Tiki Taka",
    "Sporting TDC",
    "Rali Stones",
    "Independiente FC",
  ],
  "Master 40": [
    "Montaña Alta",
    "Nacional",
    "RH",
    "S'World FC",
    "Los Compadres",
    "Real X",
  ],
  "Master 50": [
    "Montaña Alta",
    "Nacional",
    "RH",
    "S'World FC",
    "Los Compadres",
    "Real X",
  ],
  "Institucional": [
    "Operaciones FC",
    "CNPB",
  ],
};

/**
 * Tabla de posiciones modelo con datos oficiales de los equipos del calendario
 */
export function createGenericStandings(prefix = "Equipo", categoryName = "Sub-12"): OfficialTableRow[] {
  const teams = OFFICIAL_TEAMS_BY_CATEGORY[categoryName] || OFFICIAL_TEAMS_BY_CATEGORY["Sub-12"];
  if (teams && teams.length > 0) {
    return teams.map((teamName, idx) => {
      const pos = idx + 1;
      const isClassified = pos <= 8;
      const isEliminated = pos >= teams.length - 1 && teams.length > 9;

      const jj = Math.max(2, 7 - Math.floor(idx * 0.3));
      const jg = Math.max(0, Math.min(jj, jj - Math.floor(idx * 0.6)));
      const je = idx % 3 === 1 && jj - jg > 0 ? 1 : 0;
      const jp = Math.max(0, jj - jg - je);
      const ga = Math.max(3, jg * 3 + je * 1 + Math.max(1, 12 - idx));
      const ge = Math.max(1, jp * 2 + Math.floor(idx * 1.4));
      const dif = ga - ge;
      const pts = jg * 3 + je * 1;

      return {
        pos,
        team: teamName,
        jj,
        jg,
        je,
        jp,
        ga,
        ge,
        dif,
        pts,
        status: isEliminated ? "eliminado" : isClassified ? "clasificado" : "normal",
      };
    });
  }

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

export const OFFICIAL_TEAMS_1RA_DIV: Record<string, string[]> = {
  "Sub-8": [
    "La Ladera (B)",
    "Fuerza Vinotinto",
    "Funvibra",
    "Fratelsa Sport Blanco",
    "Dvo Manaure",
    "Fratelsa Sport Amarillo",
    "Fusión Académica",
    "Futconexión (A)",
    "Unión Libertador",
    "Dvo JC",
    "Fratelsa Sport Negro",
  ],
  "Sub-10": [
    "Dvo Mirador",
    "Futconexión",
    "Unión Libertador",
    "Fusión Académica",
    "Inter de Caracas",
    "Camatagua",
    "Nova Futsal",
  ],
  "Sub-12": [
    "Fusión Académica A",
    "Espartanos Futsal",
    "La Paz Futsal",
    "La Ladera",
    "Tetsu Futsal",
    "Futconexión",
    "Deportivo Odín",
    "Fusión Académica B",
    "Camatagua",
    "Nova Futsal",
    "Caricuao",
  ],
  "Sub-14": [
    "Unión Libertador",
    "Real Esperanza",
    "La Paz Futsal Blanco",
    "Guatire Futsal",
    "La Ladera (B)",
    "Espartanos Futsal",
    "La Paz Futsal Verde",
    "Caricuao FC",
    "Tetsu Futsal",
    "Fusión Académica",
    "Camatagua",
    "Fénix Sport",
    "La Ladera (A)",
    "Sportu Futsal",
  ],
  "Sub-16": [
    "Élite Caracas",
    "Fusión Académica",
    "Caricuao",
    "Guatire Futsal",
    "Espartanos Futsal",
    "Real Esperanza B",
    "La Ladera",
    "Real Esperanza A",
    "NC Sport",
    "CJRU",
    "RH Sport",
  ],
  "Sub-18": [
    "Guerrero del Valle",
    "Team Soublette",
    "Felinos FS",
    "Real Esperanza",
    "Overcoming FS",
    "CJRU",
    "Club Palace",
    "Hoyo de la Puerta FSC",
  ],
  "Sub-20": [
    "Barnije",
    "Real Esperanza",
    "Guerreros del Valle",
    "Unión Libertador",
    "Money Wayy",
    "Club Palace",
    "Inter Plaza",
    "Caricuao",
    "El Plan",
    "Ragnarok",
  ],
};

export const OFFICIAL_TEAMS_2DA_DIV: Record<string, string[]> = {
  "Sub-8": [
    "La Ladera (B)",
    "Fuerza Vinotinto",
    "Funvibra",
    "Fratelsa Sport Blanco",
    "Dvo Manaure",
    "Fratelsa Sport Amarillo",
    "Fusión Académica",
    "Futconexión (A)",
    "Unión Libertador",
    "Dvo JC",
    "Fratelsa Sport Negro",
  ],
  "Sub-10": [
    "Fusión Académica (B)",
    "La Paz Futsal",
    "Real Libertad",
    "Dvo Mirador",
    "Intocable",
    "Fusión Académica",
    "Funvibra",
    "Fratelsa Sport",
    "FALG",
    "Academia Winners",
  ],
  "Sub-12": [
    "Ricardinho",
    "FALG",
    "Dvo Odín",
    "Espartanos Futsal",
    "La Paz Futsal",
    "Fusión Académica (B)",
  ],
  "Sub-14": [
    "La Ladera",
    "Fuerza Vinotinto",
    "Espartanos Cutira",
    "Dvo Mirador",
    "Dvo Manaure",
    "Funvibra (A)",
    "Dvo JC",
    "Foro Libertador",
  ],
  "Sub-16": [
    "Espartanos Cutira",
    "Hogar Canario",
    "Espartanos Futsal",
    "Alí Primera",
    "Funvibra",
    "Dvo Manaure",
    "Ricardinho (B)",
    "Unión Libertador",
    "Gladiadores Caricuao",
  ],
  "Sub-18": [
    "Kay Kings",
    "Nuevo Día FC",
    "Los Jardines FC",
    "Guerreros del Valle",
    "Real Esperanza",
    "Felinos FS",
    "Team Soublette",
    "Overcoming",
  ],
  "Sub-20": [
    "Barnije",
    "Real Esperanza",
    "Guerreros del Valle",
    "Unión Libertador",
    "Money Wayy",
    "Club Palace",
    "Inter Plaza",
    "Caricuao",
    "El Plan",
    "Ragnarok",
  ],
};

/**
 * Genera la tabla para una categoría menor específica (Sub-8 a Sub-20).
 * Integra los nombres reales de los equipos del calendario oficial 2026.
 */
export function createCategoryStandings(
  category: MinorCategory | string,
  prefix = "Equipo",
  divisionSlug?: string
): OfficialTableRow[] {
  const catKey = String(category);
  const is2da = divisionSlug?.includes("2da");
  const is1ra = divisionSlug?.includes("1ra");

  const pool = is2da
    ? OFFICIAL_TEAMS_2DA_DIV[catKey] || OFFICIAL_TEAMS_BY_CATEGORY[catKey]
    : is1ra
    ? OFFICIAL_TEAMS_1RA_DIV[catKey] || OFFICIAL_TEAMS_BY_CATEGORY[catKey]
    : OFFICIAL_TEAMS_BY_CATEGORY[catKey] || OFFICIAL_TEAMS_BY_CATEGORY[category as any];

  const realTeams = pool && pool.length > 0 ? pool : OFFICIAL_TEAMS_BY_CATEGORY[catKey];

  if (realTeams && realTeams.length > 0) {
    return realTeams.map((teamName, idx) => {
      const pos = idx + 1;
      const isClassified = pos <= 8;
      const isEliminated = pos >= realTeams.length - 1 && realTeams.length > 9;

      const jj = Math.max(2, 7 - Math.floor(idx * 0.3));
      const jg = Math.max(0, Math.min(jj, jj - Math.floor(idx * 0.6)));
      const je = idx % 3 === 1 && jj - jg > 0 ? 1 : 0;
      const jp = Math.max(0, jj - jg - je);
      const ga = Math.max(3, jg * 3 + je * 1 + Math.max(1, 12 - idx));
      const ge = Math.max(1, jp * 2 + Math.floor(idx * 1.4));
      const dif = ga - ge;
      const pts = jg * 3 + je * 1;

      return {
        pos,
        team: teamName,
        jj,
        jg,
        je,
        jp,
        ga,
        ge,
        dif,
        pts,
        status: isEliminated ? "eliminado" : isClassified ? "clasificado" : "normal",
      };
    });
  }

  return createGenericStandings(prefix, catKey);
}

/**
 * Goleadores vinculados a los equipos reales del calendario
 */
export function createGenericScorers(
  teamPrefix = "Equipo",
  category: MinorCategory | string = "Sub-12"
): Scorer[] {
  const catKey = String(category);
  const realTeams = OFFICIAL_TEAMS_BY_CATEGORY[catKey] || OFFICIAL_TEAMS_BY_CATEGORY["Sub-12"] || [];

  const playersByCat: Record<string, { player: string; goals: number }[]> = {
    "Sub-8": [
      { player: "E. Gómez", goals: 7 },
      { player: "M. Rivas", goals: 5 },
      { player: "S. Blanco", goals: 4 },
      { player: "C. Ramos", goals: 4 },
      { player: "K. Mendoza", goals: 3 },
    ],
    "Sub-10": [
      { player: "A. Pérez", goals: 8 },
      { player: "D. Morales", goals: 6 },
      { player: "J. Rodríguez", goals: 5 },
      { player: "C. León", goals: 4 },
      { player: "Y. Castillo", goals: 3 },
    ],
    "Sub-12": [
      { player: "J. Martínez", goals: 8 },
      { player: "A. Torres", goals: 6 },
      { player: "M. Rojas", goals: 5 },
      { player: "L. Vargas", goals: 4 },
      { player: "D. Silva", goals: 3 },
    ],
    "Sub-14": [
      { player: "K. Salazar", goals: 9 },
      { player: "R. Blanco", goals: 7 },
      { player: "J. Velásquez", goals: 6 },
      { player: "M. Díaz", goals: 5 },
      { player: "A. Colmenares", goals: 4 },
    ],
    "Sub-16": [
      { player: "D. Fernández", goals: 8 },
      { player: "L. Ramírez", goals: 7 },
      { player: "S. Castillo", goals: 6 },
      { player: "G. Pineda", goals: 5 },
      { player: "E. Suárez", goals: 4 },
    ],
    "Sub-18": [
      { player: "B. Rivas", goals: 6 },
      { player: "M. Delgado", goals: 5 },
      { player: "J. Morales", goals: 4 },
      { player: "K. Pinto", goals: 4 },
      { player: "S. Romero", goals: 3 },
    ],
    "Libre": [
      { player: "R. Sánchez", goals: 8 },
      { player: "M. Gil", goals: 7 },
      { player: "A. Rangel", goals: 5 },
      { player: "Y. Bermúdez", goals: 4 },
      { player: "F. Cordero", goals: 4 },
    ],
  };

  const pool = playersByCat[catKey] || playersByCat["Sub-12"];
  return pool.map((p, idx) => ({
    player: p.player,
    team: realTeams[idx % realTeams.length] || `${teamPrefix} ${idx + 1}`,
    category: catKey as any,
    modality: "primera",
    goals: p.goals,
  }));
}

/**
 * Vallas menos vencidas vinculadas a los equipos reales del calendario
 */
export function createGenericKeepers(
  teamPrefix = "Equipo",
  category: MinorCategory | string = "Sub-12"
): Goalkeeper[] {
  const catKey = String(category);
  const realTeams = OFFICIAL_TEAMS_BY_CATEGORY[catKey] || OFFICIAL_TEAMS_BY_CATEGORY["Sub-12"] || [];

  const keepersByCat: Record<string, { player: string; gc: number; pj: number; cs: number }[]> = {
    "Sub-8": [
      { player: "L. Arrieta", gc: 2, pj: 6, cs: 4 },
      { player: "J. Castillo", gc: 3, pj: 6, cs: 3 },
      { player: "P. Rivas", gc: 4, pj: 5, cs: 2 },
      { player: "D. Blanco", gc: 5, pj: 5, cs: 2 },
    ],
    "Sub-10": [
      { player: "M. Delgado", gc: 2, pj: 6, cs: 4 },
      { player: "S. Romero", gc: 3, pj: 6, cs: 3 },
      { player: "G. Márquez", gc: 4, pj: 5, cs: 2 },
      { player: "A. Silva", gc: 4, pj: 5, cs: 2 },
    ],
    "Sub-12": [
      { player: "C. Herrera", gc: 3, pj: 6, cs: 4 },
      { player: "D. Mendoza", gc: 5, pj: 6, cs: 3 },
      { player: "R. Silva", gc: 4, pj: 5, cs: 3 },
      { player: "E. Contreras", gc: 3, pj: 4, cs: 2 },
    ],
    "Sub-14": [
      { player: "A. Morales", gc: 2, pj: 6, cs: 4 },
      { player: "R. Quintero", gc: 3, pj: 6, cs: 3 },
      { player: "Y. Padrón", gc: 4, pj: 5, cs: 3 },
      { player: "C. Villegas", gc: 5, pj: 5, cs: 2 },
    ],
    "Sub-16": [
      { player: "F. González", gc: 3, pj: 6, cs: 4 },
      { player: "V. Rangel", gc: 4, pj: 6, cs: 3 },
      { player: "J. Tovar", gc: 4, pj: 5, cs: 2 },
      { player: "M. Pacheco", gc: 5, pj: 5, cs: 2 },
    ],
    "Sub-18": [
      { player: "K. Ochoa", gc: 2, pj: 5, cs: 3 },
      { player: "E. Barrios", gc: 3, pj: 5, cs: 3 },
      { player: "D. Sifontes", gc: 4, pj: 4, cs: 2 },
      { player: "L. Benítez", gc: 5, pj: 4, cs: 1 },
    ],
    "Libre": [
      { player: "H. Briceño", gc: 3, pj: 6, cs: 4 },
      { player: "O. Colmenares", gc: 4, pj: 6, cs: 3 },
      { player: "W. Salazar", gc: 5, pj: 5, cs: 2 },
      { player: "J. Cardona", gc: 6, pj: 5, cs: 2 },
    ],
  };

  const pool = keepersByCat[catKey] || keepersByCat["Sub-12"];
  return pool.map((k, idx) => ({
    player: k.player,
    team: realTeams[idx % realTeams.length] || `${teamPrefix} ${idx + 1}`,
    category: catKey as any,
    modality: "primera",
    goalsConceded: k.gc,
    matchesPlayed: k.pj,
    cleanSheets: k.cs,
  }));
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

  const is2da = tournamentSlug.includes("2da");
  const is1ra = tournamentSlug.includes("1ra");
  const pool = is2da
    ? OFFICIAL_TEAMS_2DA_DIV[category] || OFFICIAL_TEAMS_BY_CATEGORY[category]
    : is1ra
    ? OFFICIAL_TEAMS_1RA_DIV[category] || OFFICIAL_TEAMS_BY_CATEGORY[category]
    : OFFICIAL_TEAMS_BY_CATEGORY[category] || [];

  const teamNamesList = pool && pool.length > 0
    ? pool
    : Array.from({ length: 8 }, (_, i) => `Equipo ${i + 1}`);

  const teams: TeamProfile[] = [];

  for (let t = 0; t < teamNamesList.length; t++) {
    const teamName = teamNamesList[t];
    const teamIdx1 = t + 1;
    const teamNumStr = String(teamIdx1).padStart(2, "0");
    const teamCode = `EQ${teamNumStr}`;
    const teamId = generateTeamId(tournamentCode, divisionCode, catCode, teamNumStr);
    const teamSlug = teamName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const roster: TeamPlayerItem[] = [];

    for (let p = 0; p < 10; p++) {
      const dorsal = dorsales[p];
      const pos = positions[p];
      const ciRaw = 33000000 + teamIdx1 * 1000 + dorsal * 10;
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
        name: `Atleta ${dorsal} (${teamName})`,
        position: pos,
        category,
        teamId,
        teamName,
        matchesPlayed: 6,
        goals: isKeeper ? 0 : isTopScorer ? (teamIdx1 === 1 ? 8 : 4) : p % 3,
        yellowCards: p % 4 === 0 ? 1 : 0,
        redCards: 0,
        cleanSheets: isKeeper ? (teamIdx1 <= 3 ? 3 : 1) : undefined,
        goalsConceded: isKeeper ? (teamIdx1 === 1 ? 3 : 6) : undefined,
      });
    }

    teams.push({
      id: teamId,
      slug: teamSlug,
      name: teamName,
      shortName: teamName.length > 14 ? teamName.slice(0, 12) + ".." : teamName,
      tournamentId: tournamentCode.toLowerCase(),
      subTournamentSlug: tournamentSlug,
      subTournamentName: tournamentName,
      category,
      coach: `Profesor ${teamName.split(" ")[0]}`,
      assistantCoach: `Asistente ${teamName.split(" ")[0]}`,
      delegate: `Delegado ${teamName.split(" ")[0]}`,
      venue: "Cancha Principal, Gimnasio Libertador",
      roster,
    });
  }

  return teams;
}
