import { OfficialTableRow } from "@/components/tournaments/tournament-official-table";

/**
 * -----------------------------------------------------------------------------
 * TABLAS OFICIALES DE CLASIFICACIÓN (ACTUALIZADAS NOVIEMBRE 2026)
 * Transcripción exacta de las planillas oficiales entregadas por la liga.
 * -----------------------------------------------------------------------------
 */

// =============================================================================
// 1. TABLA DE POSICIÓN CATEGORÍA INSTITUCIONAL · GRUPO U (Imagen 1)
// Clasifican los 2 primeros a Semifinal y juego extra entre 3er lugar vs 6to lugar.
// =============================================================================
export const STANDINGS_INSTITUCIONAL_OFICIAL: OfficialTableRow[] = [
  { pos: 1, team: "BDV", jj: 5, jg: 3, je: 1, jp: 1, ga: 23, ge: 23, dif: 0, pts: 10, status: "clasificado" },
  { pos: 2, team: "ONT", jj: 5, jg: 3, je: 1, jp: 1, ga: 25, ge: 18, dif: 7, pts: 10, status: "clasificado" },
  { pos: 3, team: "PDVSA", jj: 5, jg: 2, je: 1, jp: 2, ga: 21, ge: 18, dif: 3, pts: 7, status: "normal" },
  { pos: 4, team: "CANTV", jj: 5, jg: 2, je: 0, jp: 3, ga: 21, ge: 24, dif: -3, pts: 6, status: "normal" },
  { pos: 5, team: "BCV", jj: 5, jg: 1, je: 3, jp: 1, ga: 22, ge: 23, dif: -1, pts: 6, status: "normal" },
  { pos: 6, team: "CICPC VEHICULOS", jj: 5, jg: 1, je: 0, jp: 4, ga: 20, ge: 26, dif: -6, pts: 3, status: "normal" },
];

export const INSTITUCIONAL_RULE = "CLASIFICAN LOS 2 PRIMEROS A SEMI FINAL Y JUEGO EXTRA ENTRE 3ER LUGAR VS 6TO LUGAR";

// =============================================================================
// 2. TABLA DE POSICIONES CATEGORÍA LIBRE 1RA DIVISIÓN · GRUPO U (Imagen 2)
// Clasifican los 2 primeros a Semifinal y juego extra entre 3er lugar vs 6to lugar.
// =============================================================================
export const STANDINGS_LIBRE_1RA_OFICIAL: OfficialTableRow[] = [
  { pos: 1, team: "HRD", jj: 6, jg: 6, je: 0, jp: 0, ga: 29, ge: 12, dif: 17, pts: 18, status: "clasificado" },
  { pos: 2, team: "ZONA NORTE", jj: 5, jg: 4, je: 0, jp: 1, ga: 24, ge: 9, dif: 15, pts: 12, status: "clasificado" },
  { pos: 3, team: "SORPRESA FS", jj: 4, jg: 2, je: 1, jp: 1, ga: 20, ge: 13, dif: 7, pts: 7, status: "normal" },
  { pos: 4, team: "LD PRIMIUM", jj: 5, jg: 2, je: 1, jp: 2, ga: 27, ge: 21, dif: 6, pts: 7, status: "normal" },
  { pos: 5, team: "LOS SIMBOLOS", jj: 6, jg: 2, je: 1, jp: 3, ga: 27, ge: 22, dif: 5, pts: 7, status: "normal" },
  { pos: 6, team: "MAMERA FS", jj: 6, jg: 1, je: 1, jp: 4, ga: 20, ge: 28, dif: -8, pts: 4, status: "normal" },
  { pos: 7, team: "SUPERSTAR", jj: 6, jg: 0, je: 0, jp: 6, ga: 0, ge: 42, dif: -42, pts: 0, status: "eliminado" },
];

export const LIBRE_1RA_RULE = "CLASIFICAN LOS 2 PRIMEROS A SEMI FINAL Y JUEGO EXTRA ENTRE 3ER LUGAR VS 6TO LUGAR";

// =============================================================================
// 3. TABLA DE POSICIÓN CATEGORÍA MASTER 50 · GRUPO U (Imagen 3)
// Clasifican los 2 primeros a Semifinal y juego extra entre 3er lugar vs 6to lugar.
// =============================================================================
export const STANDINGS_MASTER_50_OFICIAL: OfficialTableRow[] = [
  { pos: 1, team: "LA PAZ THIMAT", jj: 6, jg: 6, je: 0, jp: 0, ga: 25, ge: 6, dif: 19, pts: 18, status: "clasificado" },
  { pos: 2, team: "BATOR", jj: 6, jg: 4, je: 0, jp: 2, ga: 17, ge: 8, dif: 9, pts: 12, status: "clasificado" },
  { pos: 3, team: "IPSA C", jj: 5, jg: 3, je: 0, jp: 2, ga: 15, ge: 14, dif: 1, pts: 9, status: "normal" },
  { pos: 4, team: "MARQUINA DOMINO", jj: 5, jg: 3, je: 0, jp: 2, ga: 16, ge: 7, dif: 9, pts: 9, status: "normal" },
  { pos: 5, team: "LOS AMIGOS", jj: 4, jg: 2, je: 0, jp: 2, ga: 10, ge: 6, dif: 4, pts: 6, status: "normal" },
  { pos: 6, team: "BREEMEN", jj: 5, jg: 0, je: 0, jp: 5, ga: 6, ge: 19, dif: -13, pts: 0, status: "normal" },
  { pos: 7, team: "LA CUADRA FUTSAL", jj: 5, jg: 0, je: 0, jp: 5, ga: 4, ge: 33, dif: -29, pts: 0, status: "eliminado" },
];

export const MASTER_50_RULE = "CLASIFICAN LOS 2 PRIMEROS A SEMI FINAL Y JUEGO EXTRA ENTRE 3ER LUGAR VS 6TO LUGAR";

// =============================================================================
// 4. TABLA DE POSICIONES CATEGORÍA LIBRE 2DA DIVISIÓN · 4 GRUPOS (Imagen 4)
// Clasifican los 4 primeros de cada grupo.
// =============================================================================
export const STANDINGS_LIBRE_2DA_GRUPO_A: OfficialTableRow[] = [
  { pos: 1, team: "K9 GUERREROS", jj: 6, jg: 5, je: 1, jp: 0, ga: 27, ge: 9, dif: 18, pts: 16, status: "clasificado" },
  { pos: 2, team: "SHOLO FUTSAL", jj: 6, jg: 5, je: 0, jp: 1, ga: 28, ge: 23, dif: 5, pts: 15, status: "clasificado" },
  { pos: 3, team: "TIENDA FORTE", jj: 6, jg: 3, je: 0, jp: 3, ga: 27, ge: 18, dif: 9, pts: 9, status: "clasificado" },
  { pos: 4, team: "JAEN FUTSAL", jj: 5, jg: 2, je: 1, jp: 3, ga: 20, ge: 19, dif: 1, pts: 7, status: "clasificado" },
  { pos: 5, team: "DEPORTIVO PARACOTO", jj: 5, jg: 2, je: 0, jp: 3, ga: 18, ge: 13, dif: 5, pts: 6, status: "eliminado" },
  { pos: 6, team: "NC SPORT", jj: 6, jg: 2, je: 0, jp: 4, ga: 25, ge: 30, dif: -5, pts: 6, status: "eliminado" },
  { pos: 7, team: "REAL UNION", jj: 6, jg: 0, je: 0, jp: 6, ga: 4, ge: 33, dif: -29, pts: 0, status: "eliminado" },
];

export const STANDINGS_LIBRE_2DA_GRUPO_B: OfficialTableRow[] = [
  { pos: 1, team: "HALCONES DEL PARAISO FS", jj: 6, jg: 5, je: 1, jp: 0, ga: 30, ge: 12, dif: 18, pts: 16, status: "clasificado" },
  { pos: 2, team: "DVO TITO", jj: 6, jg: 4, je: 0, jp: 2, ga: 28, ge: 16, dif: 12, pts: 12, status: "clasificado" },
  { pos: 3, team: "LOS SIMBOLOS", jj: 6, jg: 3, je: 2, jp: 1, ga: 30, ge: 17, dif: 13, pts: 11, status: "clasificado" },
  { pos: 4, team: "EBENEZER FSC", jj: 6, jg: 3, je: 2, jp: 1, ga: 29, ge: 16, dif: 13, pts: 11, status: "clasificado" },
  { pos: 5, team: "RIVALES FS", jj: 6, jg: 2, je: 1, jp: 3, ga: 20, ge: 14, dif: 6, pts: 7, status: "eliminado" },
  { pos: 6, team: "RH SPORT CLUB", jj: 6, jg: 1, je: 0, jp: 5, ga: 9, ge: 35, dif: -26, pts: 3, status: "eliminado" },
  { pos: 7, team: "DVO LAS BRISAS", jj: 6, jg: 0, je: 0, jp: 6, ga: 0, ge: 42, dif: -42, pts: 0, status: "eliminado" },
];

export const STANDINGS_LIBRE_2DA_GRUPO_C: OfficialTableRow[] = [
  { pos: 1, team: "CARTUJO", jj: 6, jg: 5, je: 0, jp: 1, ga: 32, ge: 9, dif: 23, pts: 15, status: "clasificado" },
  { pos: 2, team: "OVAD FUTSAL", jj: 6, jg: 4, je: 1, jp: 1, ga: 30, ge: 11, dif: 19, pts: 13, status: "clasificado" },
  { pos: 3, team: "LA VEGA FS", jj: 6, jg: 4, je: 0, jp: 2, ga: 26, ge: 17, dif: 9, pts: 12, status: "clasificado" },
  { pos: 4, team: "GETAN", jj: 6, jg: 3, je: 2, jp: 1, ga: 22, ge: 15, dif: 7, pts: 11, status: "clasificado" },
  { pos: 5, team: "OVERCOMING FS", jj: 6, jg: 2, je: 1, jp: 3, ga: 20, ge: 16, dif: 4, pts: 7, status: "eliminado" },
  { pos: 6, team: "JS FUTSAL", jj: 6, jg: 0, je: 0, jp: 6, ga: 0, ge: 42, dif: -42, pts: 0, status: "eliminado" },
  { pos: 7, team: "ARCANO FC", jj: 6, jg: 0, je: 0, jp: 6, ga: 6, ge: 39, dif: -33, pts: 0, status: "eliminado" },
];

export const STANDINGS_LIBRE_2DA_GRUPO_D: OfficialTableRow[] = [
  { pos: 1, team: "BOTAFOGO", jj: 6, jg: 5, je: 0, jp: 1, ga: 32, ge: 12, dif: 20, pts: 15, status: "clasificado" },
  { pos: 2, team: "CORDILLERA ANDINA FC", jj: 6, jg: 5, je: 0, jp: 1, ga: 29, ge: 10, dif: 19, pts: 15, status: "clasificado" },
  { pos: 3, team: "ATLETICO NACIONAL", jj: 6, jg: 5, je: 0, jp: 1, ga: 29, ge: 20, dif: 9, pts: 15, status: "clasificado" },
  { pos: 4, team: "LAS TORRES", jj: 6, jg: 3, je: 0, jp: 3, ga: 26, ge: 29, dif: -3, pts: 9, status: "clasificado" },
  { pos: 5, team: "PIZZERIA 12", jj: 6, jg: 2, je: 0, jp: 4, ga: 22, ge: 23, dif: -1, pts: 6, status: "eliminado" },
  { pos: 6, team: "JOGO BONITO FS", jj: 6, jg: 0, je: 1, jp: 5, ga: 13, ge: 26, dif: -13, pts: 1, status: "eliminado" },
  { pos: 7, team: "LOS GUAROS", jj: 6, jg: 0, je: 1, jp: 5, ga: 12, ge: 45, dif: -33, pts: 1, status: "eliminado" },
];

export const LIBRE_2DA_RULE = "CLASIFICAN LOS 4 PRIMEROS DE CADA GRUPO";

export const STANDINGS_LIBRE_2DA_GROUPS: Record<string, OfficialTableRow[]> = {
  "GRUPO A": STANDINGS_LIBRE_2DA_GRUPO_A,
  "GRUPO B": STANDINGS_LIBRE_2DA_GRUPO_B,
  "GRUPO C": STANDINGS_LIBRE_2DA_GRUPO_C,
  "GRUPO D": STANDINGS_LIBRE_2DA_GRUPO_D,
};
