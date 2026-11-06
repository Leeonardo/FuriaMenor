import { OfficialTableRow } from "@/components/tournaments/tournament-official-table";

/**
 * -----------------------------------------------------------------------------
 * TABLAS OFICIALES DE CLASIFICACIÓN (ACTUALIZADAS NOVIEMBRE 2026)
 * Transcripción exacta de las planillas oficiales entregadas por la liga.
 * Cada fila contiene el clubId y clubSlug único para vincularlo al perfil del club.
 * -----------------------------------------------------------------------------
 */

// =============================================================================
// 1. TABLA DE POSICIÓN CATEGORÍA INSTITUCIONAL · GRUPO U (Imagen 1)
// Clasifican los 2 primeros a Semifinal y juego extra entre 3er lugar vs 6to lugar.
// =============================================================================
export const STANDINGS_INSTITUCIONAL_OFICIAL: OfficialTableRow[] = [
  { pos: 1, team: "BDV", jj: 5, jg: 3, je: 1, jp: 1, ga: 23, ge: 23, dif: 0, pts: 10, status: "clasificado", clubId: "club-bdv", clubSlug: "bdv" },
  { pos: 2, team: "ONT", jj: 5, jg: 3, je: 1, jp: 1, ga: 25, ge: 18, dif: 7, pts: 10, status: "clasificado", clubId: "club-ont", clubSlug: "ont" },
  { pos: 3, team: "PDVSA", jj: 5, jg: 2, je: 1, jp: 2, ga: 21, ge: 18, dif: 3, pts: 7, status: "normal", clubId: "club-pdvsa", clubSlug: "pdvsa" },
  { pos: 4, team: "CANTV", jj: 5, jg: 2, je: 0, jp: 3, ga: 21, ge: 24, dif: -3, pts: 6, status: "normal", clubId: "club-cantv", clubSlug: "cantv" },
  { pos: 5, team: "BCV", jj: 5, jg: 1, je: 3, jp: 1, ga: 22, ge: 23, dif: -1, pts: 6, status: "normal", clubId: "club-bcv", clubSlug: "bcv" },
  { pos: 6, team: "CICPC VEHICULOS", jj: 5, jg: 1, je: 0, jp: 4, ga: 20, ge: 26, dif: -6, pts: 3, status: "normal", clubId: "club-cicpc-vehiculos", clubSlug: "cicpc-vehiculos" },
];

export const INSTITUCIONAL_RULE = "CLASIFICAN LOS 2 PRIMEROS A SEMI FINAL Y JUEGO EXTRA ENTRE 3ER LUGAR VS 6TO LUGAR";

// =============================================================================
// 2. TABLA DE POSICIONES CATEGORÍA LIBRE 1RA DIVISIÓN · GRUPO U (Imagen 2)
// Clasifican los 2 primeros a Semifinal y juego extra entre 3er lugar vs 6to lugar.
// =============================================================================
export const STANDINGS_LIBRE_1RA_OFICIAL: OfficialTableRow[] = [
  { pos: 1, team: "HRD", jj: 6, jg: 6, je: 0, jp: 0, ga: 29, ge: 12, dif: 17, pts: 18, status: "clasificado", clubId: "club-hrd", clubSlug: "hrd" },
  { pos: 2, team: "ZONA NORTE", jj: 5, jg: 4, je: 0, jp: 1, ga: 24, ge: 9, dif: 15, pts: 12, status: "clasificado", clubId: "club-zona-norte", clubSlug: "zona-norte" },
  { pos: 3, team: "SORPRESA FS", jj: 4, jg: 2, je: 1, jp: 1, ga: 20, ge: 13, dif: 7, pts: 7, status: "normal", clubId: "club-sorpresa-fs", clubSlug: "sorpresa-fs" },
  { pos: 4, team: "LD PRIMIUM", jj: 5, jg: 2, je: 1, jp: 2, ga: 27, ge: 21, dif: 6, pts: 7, status: "normal", clubId: "club-ld-primium", clubSlug: "ld-primium" },
  { pos: 5, team: "LOS SIMBOLOS", jj: 6, jg: 2, je: 1, jp: 3, ga: 27, ge: 22, dif: 5, pts: 7, status: "normal", clubId: "club-los-simbolos", clubSlug: "los-simbolos" },
  { pos: 6, team: "MAMERA FS", jj: 6, jg: 1, je: 1, jp: 4, ga: 20, ge: 28, dif: -8, pts: 4, status: "normal", clubId: "club-mamera-fs", clubSlug: "mamera-fs" },
  { pos: 7, team: "SUPERSTAR", jj: 6, jg: 0, je: 0, jp: 6, ga: 0, ge: 42, dif: -42, pts: 0, status: "eliminado", clubId: "club-superstar", clubSlug: "superstar" },
];

export const LIBRE_1RA_RULE = "CLASIFICAN LOS 2 PRIMEROS A SEMI FINAL Y JUEGO EXTRA ENTRE 3ER LUGAR VS 6TO LUGAR";

// =============================================================================
// 3. TABLA DE POSICIÓN CATEGORÍA MASTER 50 · GRUPO U (Imagen 3)
// Clasifican los 2 primeros a Semifinal y juego extra entre 3er lugar vs 6to lugar.
// =============================================================================
export const STANDINGS_MASTER_50_OFICIAL: OfficialTableRow[] = [
  { pos: 1, team: "LA PAZ THIMAT", jj: 6, jg: 6, je: 0, jp: 0, ga: 25, ge: 6, dif: 19, pts: 18, status: "clasificado", clubId: "club-la-paz-thimat", clubSlug: "la-paz-thimat" },
  { pos: 2, team: "BATOR", jj: 6, jg: 4, je: 0, jp: 2, ga: 17, ge: 8, dif: 9, pts: 12, status: "clasificado", clubId: "club-bator", clubSlug: "bator" },
  { pos: 3, team: "IPSA C", jj: 5, jg: 3, je: 0, jp: 2, ga: 15, ge: 14, dif: 1, pts: 9, status: "normal", clubId: "club-ipsa-c", clubSlug: "ipsa-c" },
  { pos: 4, team: "MARQUINA DOMINO", jj: 5, jg: 3, je: 0, jp: 2, ga: 16, ge: 7, dif: 9, pts: 9, status: "normal", clubId: "club-marquina-domino", clubSlug: "marquina-domino" },
  { pos: 5, team: "LOS AMIGOS", jj: 4, jg: 2, je: 0, jp: 2, ga: 10, ge: 6, dif: 4, pts: 6, status: "normal", clubId: "club-los-amigos", clubSlug: "los-amigos" },
  { pos: 6, team: "BREEMEN", jj: 5, jg: 0, je: 0, jp: 5, ga: 6, ge: 19, dif: -13, pts: 0, status: "normal", clubId: "club-breemen", clubSlug: "breemen" },
  { pos: 7, team: "LA CUADRA FUTSAL", jj: 5, jg: 0, je: 0, jp: 5, ga: 4, ge: 33, dif: -29, pts: 0, status: "eliminado", clubId: "club-la-cuadra-futsal", clubSlug: "la-cuadra-futsal" },
];

export const MASTER_50_RULE = "CLASIFICAN LOS 2 PRIMEROS A SEMI FINAL Y JUEGO EXTRA ENTRE 3ER LUGAR VS 6TO LUGAR";

// =============================================================================
// 4. TABLA DE POSICIONES CATEGORÍA LIBRE 2DA DIVISIÓN · 4 GRUPOS (Imagen 4)
// Clasifican los 4 primeros de cada grupo.
// =============================================================================
export const STANDINGS_LIBRE_2DA_GRUPO_A: OfficialTableRow[] = [
  { pos: 1, team: "K9 GUERREROS", jj: 6, jg: 5, je: 1, jp: 0, ga: 27, ge: 9, dif: 18, pts: 16, status: "clasificado", clubId: "club-k9-guerreros", clubSlug: "k9-guerreros" },
  { pos: 2, team: "SHOLO FUTSAL", jj: 6, jg: 5, je: 0, jp: 1, ga: 28, ge: 23, dif: 5, pts: 15, status: "clasificado", clubId: "club-sholo-futsal", clubSlug: "sholo-futsal" },
  { pos: 3, team: "TIENDA FORTE", jj: 6, jg: 3, je: 0, jp: 3, ga: 27, ge: 18, dif: 9, pts: 9, status: "clasificado", clubId: "club-tienda-forte", clubSlug: "tienda-forte" },
  { pos: 4, team: "JAEN FUTSAL", jj: 5, jg: 2, je: 1, jp: 3, ga: 20, ge: 19, dif: 1, pts: 7, status: "clasificado", clubId: "club-jaen-futsal", clubSlug: "jaen-futsal" },
  { pos: 5, team: "DEPORTIVO PARACOTO", jj: 5, jg: 2, je: 0, jp: 3, ga: 18, ge: 13, dif: 5, pts: 6, status: "eliminado", clubId: "club-deportivo-paracoto", clubSlug: "deportivo-paracoto" },
  { pos: 6, team: "NC SPORT", jj: 6, jg: 2, je: 0, jp: 4, ga: 25, ge: 30, dif: -5, pts: 6, status: "eliminado", clubId: "acad-17", clubSlug: "nc-sport" },
  { pos: 7, team: "REAL UNION", jj: 6, jg: 0, je: 0, jp: 6, ga: 4, ge: 33, dif: -29, pts: 0, status: "eliminado", clubId: "club-real-union", clubSlug: "real-union" },
];

export const STANDINGS_LIBRE_2DA_GRUPO_B: OfficialTableRow[] = [
  { pos: 1, team: "HALCONES DEL PARAISO FS", jj: 6, jg: 5, je: 1, jp: 0, ga: 30, ge: 12, dif: 18, pts: 16, status: "clasificado", clubId: "club-halcones-del-paraiso-fs", clubSlug: "halcones-del-paraiso-fs" },
  { pos: 2, team: "DVO TITO", jj: 6, jg: 4, je: 0, jp: 2, ga: 28, ge: 16, dif: 12, pts: 12, status: "clasificado", clubId: "club-dvo-tito", clubSlug: "dvo-tito" },
  { pos: 3, team: "LOS SIMBOLOS", jj: 6, jg: 3, je: 2, jp: 1, ga: 30, ge: 17, dif: 13, pts: 11, status: "clasificado", clubId: "club-los-simbolos", clubSlug: "los-simbolos" },
  { pos: 4, team: "EBENEZER FSC", jj: 6, jg: 3, je: 2, jp: 1, ga: 29, ge: 16, dif: 13, pts: 11, status: "clasificado", clubId: "club-ebenezer-fsc", clubSlug: "ebenezer-fsc" },
  { pos: 5, team: "RIVALES FS", jj: 6, jg: 2, je: 1, jp: 3, ga: 20, ge: 14, dif: 6, pts: 7, status: "eliminado", clubId: "club-rivales-fs", clubSlug: "rivales-fs" },
  { pos: 6, team: "RH SPORT CLUB", jj: 6, jg: 1, je: 0, jp: 5, ga: 9, ge: 35, dif: -26, pts: 3, status: "eliminado", clubId: "club-rh-sport-club", clubSlug: "rh-sport-club" },
  { pos: 7, team: "DVO LAS BRISAS", jj: 6, jg: 0, je: 0, jp: 6, ga: 0, ge: 42, dif: -42, pts: 0, status: "eliminado", clubId: "club-dvo-las-brisas", clubSlug: "dvo-las-brisas" },
];

export const STANDINGS_LIBRE_2DA_GRUPO_C: OfficialTableRow[] = [
  { pos: 1, team: "CARTUJO", jj: 6, jg: 5, je: 0, jp: 1, ga: 32, ge: 9, dif: 23, pts: 15, status: "clasificado", clubId: "club-cartujo", clubSlug: "cartujo" },
  { pos: 2, team: "OVAD FUTSAL", jj: 6, jg: 4, je: 1, jp: 1, ga: 30, ge: 11, dif: 19, pts: 13, status: "clasificado", clubId: "club-ovad-futsal", clubSlug: "ovad-futsal" },
  { pos: 3, team: "LA VEGA FS", jj: 6, jg: 4, je: 0, jp: 2, ga: 26, ge: 17, dif: 9, pts: 12, status: "clasificado", clubId: "club-la-vega-fs", clubSlug: "la-vega-fs" },
  { pos: 4, team: "GETAN", jj: 6, jg: 3, je: 2, jp: 1, ga: 22, ge: 15, dif: 7, pts: 11, status: "clasificado", clubId: "club-getan", clubSlug: "getan" },
  { pos: 5, team: "OVERCOMING FS", jj: 6, jg: 2, je: 1, jp: 3, ga: 20, ge: 16, dif: 4, pts: 7, status: "eliminado", clubId: "acad-36", clubSlug: "overcoming" },
  { pos: 6, team: "JS FUTSAL", jj: 6, jg: 0, je: 0, jp: 6, ga: 0, ge: 42, dif: -42, pts: 0, status: "eliminado", clubId: "club-js-futsal", clubSlug: "js-futsal" },
  { pos: 7, team: "ARCANO FC", jj: 6, jg: 0, je: 0, jp: 6, ga: 6, ge: 39, dif: -33, pts: 0, status: "eliminado", clubId: "club-arcano-fc", clubSlug: "arcano-fc" },
];

export const STANDINGS_LIBRE_2DA_GRUPO_D: OfficialTableRow[] = [
  { pos: 1, team: "BOTAFOGO", jj: 6, jg: 5, je: 0, jp: 1, ga: 32, ge: 12, dif: 20, pts: 15, status: "clasificado", clubId: "club-botafogo", clubSlug: "botafogo" },
  { pos: 2, team: "CORDILLERA ANDINA FC", jj: 6, jg: 5, je: 0, jp: 1, ga: 29, ge: 10, dif: 19, pts: 15, status: "clasificado", clubId: "club-cordillera-andina-fc", clubSlug: "cordillera-andina-fc" },
  { pos: 3, team: "ATLETICO NACIONAL", jj: 6, jg: 5, je: 0, jp: 1, ga: 29, ge: 20, dif: 9, pts: 15, status: "clasificado", clubId: "club-atletico-nacional", clubSlug: "atletico-nacional" },
  { pos: 4, team: "LAS TORRES", jj: 6, jg: 3, je: 0, jp: 3, ga: 26, ge: 29, dif: -3, pts: 9, status: "clasificado", clubId: "club-las-torres", clubSlug: "las-torres" },
  { pos: 5, team: "PIZZERIA 12", jj: 6, jg: 2, je: 0, jp: 4, ga: 22, ge: 23, dif: -1, pts: 6, status: "eliminado", clubId: "club-pizzeria-12", clubSlug: "pizzeria-12" },
  { pos: 6, team: "JOGO BONITO FS", jj: 6, jg: 0, je: 1, jp: 5, ga: 13, ge: 26, dif: -13, pts: 1, status: "eliminado", clubId: "club-jogo-bonito-fs", clubSlug: "jogo-bonito-fs" },
  { pos: 7, team: "LOS GUAROS", jj: 6, jg: 0, je: 1, jp: 5, ga: 12, ge: 45, dif: -33, pts: 1, status: "eliminado", clubId: "club-los-guaros", clubSlug: "los-guaros" },
];

export const LIBRE_2DA_RULE = "CLASIFICAN LOS 4 PRIMEROS DE CADA GRUPO";

export const STANDINGS_LIBRE_2DA_GROUPS: Record<string, OfficialTableRow[]> = {
  "GRUPO A": STANDINGS_LIBRE_2DA_GRUPO_A,
  "GRUPO B": STANDINGS_LIBRE_2DA_GRUPO_B,
  "GRUPO C": STANDINGS_LIBRE_2DA_GRUPO_C,
  "GRUPO D": STANDINGS_LIBRE_2DA_GRUPO_D,
};

// =============================================================================
// 5. TABLA DE POSICIONES CATEGORÍA SUB 18 1RA DIVISIÓN · GRUPO A (Imagen 5)
// Clasifican los 2 primeros a Semifinal y juego extra entre 3er lugar vs 6to y 4to vs 5to.
// =============================================================================
export const STANDINGS_SUB18_1RA_OFICIAL: OfficialTableRow[] = [
  { pos: 1, team: "GUERRERO DEL VALLE", jj: 7, jg: 5, je: 0, jp: 2, ga: 25, ge: 14, dif: 11, pts: 15, status: "clasificado", clubId: "acad-11", clubSlug: "guerreros-del-valle" },
  { pos: 2, team: "TEAM SOUBLETTE", jj: 6, jg: 5, je: 0, jp: 1, ga: 33, ge: 8, dif: 25, pts: 15, status: "clasificado", clubId: "acad-20", clubSlug: "team-soublette" },
  { pos: 3, team: "FELINOS FS", jj: 6, jg: 4, je: 1, jp: 1, ga: 32, ge: 10, dif: 22, pts: 13, status: "normal", clubId: "acad-37", clubSlug: "felinos-fs" },
  { pos: 4, team: "REAL ESPERANZA", jj: 6, jg: 4, je: 1, jp: 1, ga: 16, ge: 9, dif: 7, pts: 13, status: "normal", clubId: "acad-18", clubSlug: "real-esperanza" },
  { pos: 5, team: "OVERCOMING FS", jj: 6, jg: 3, je: 1, jp: 2, ga: 23, ge: 10, dif: 13, pts: 10, status: "normal", clubId: "acad-36", clubSlug: "overcoming" },
  { pos: 6, team: "CJRU", jj: 7, jg: 2, je: 1, jp: 4, ga: 24, ge: 23, dif: 1, pts: 7, status: "normal", clubId: "club-cjru", clubSlug: "cjru" },
  { pos: 7, team: "CLUB PALACE", jj: 7, jg: 1, je: 0, jp: 6, ga: 10, ge: 30, dif: -20, pts: 3, status: "eliminado", clubId: "club-palace", clubSlug: "club-palace" },
  { pos: 8, team: "HOYO DE LA PUERTA FSC", jj: 7, jg: 0, je: 0, jp: 7, ga: 0, ge: 7, dif: -7, pts: 0, status: "eliminado", clubId: "club-hoyo-de-la-puerta", clubSlug: "hoyo-de-la-puerta" },
];

export const SUB18_1RA_RULE = "CLASIFICAN LOS 2 PRIMEROS A SEMI FINAL Y JUEGO EXTRA ENTRE 3ER LUGAR VS 6TO Y 4TO LUGAR VS 5TO LUGAR";

// =============================================================================
// 6. TABLA DE POSICIONES CATEGORÍA SUB 16 1RA DIVISIÓN · GRUPO A (Imagen 6)
// Clasifican los 8 primeros.
// =============================================================================
export const STANDINGS_SUB16_1RA_OFICIAL: OfficialTableRow[] = [
  { pos: 1, team: "ELITE CARACAS", jj: 6, jg: 5, je: 1, jp: 0, ga: 34, ge: 2, dif: 32, pts: 16, status: "clasificado", clubId: "acad-30", clubSlug: "elite-caracas" },
  { pos: 2, team: "FUSION ACADEMICA", jj: 7, jg: 5, je: 1, jp: 1, ga: 33, ge: 12, dif: 21, pts: 16, status: "clasificado", clubId: "acad-08", clubSlug: "fusion-academica" },
  { pos: 3, team: "CARICUAO", jj: 6, jg: 5, je: 1, jp: 0, ga: 29, ge: 14, dif: 15, pts: 16, status: "clasificado", clubId: "acad-06", clubSlug: "gladiadores-caricuao" },
  { pos: 4, team: "GUATIRE FUTSAL", jj: 5, jg: 5, je: 0, jp: 0, ga: 36, ge: 2, dif: 34, pts: 15, status: "clasificado", clubId: "acad-10", clubSlug: "guatire-futsal" },
  { pos: 5, team: "ESPARTANOS FUTSAL", jj: 9, jg: 4, je: 2, jp: 3, ga: 36, ge: 22, dif: 14, pts: 14, status: "clasificado", clubId: "acad-07", clubSlug: "espartanos-futsal" },
  { pos: 6, team: "REAL ESPERANZA B", jj: 8, jg: 4, je: 1, jp: 3, ga: 21, ge: 24, dif: -3, pts: 13, status: "clasificado", clubId: "acad-18", clubSlug: "real-esperanza" },
  { pos: 7, team: "LA LADERA", jj: 7, jg: 2, je: 4, jp: 1, ga: 25, ge: 12, dif: 13, pts: 10, status: "clasificado", clubId: "acad-14", clubSlug: "la-ladera" },
  { pos: 8, team: "REAL ESPERANZA A", jj: 8, jg: 2, je: 2, jp: 4, ga: 23, ge: 33, dif: -10, pts: 8, status: "clasificado", clubId: "acad-18", clubSlug: "real-esperanza" },
  { pos: 9, team: "NC SPORT", jj: 6, jg: 2, je: 0, jp: 4, ga: 14, ge: 28, dif: -14, pts: 6, status: "normal", clubId: "acad-17", clubSlug: "nc-sport" },
  { pos: 10, team: "CJRU", jj: 10, jg: 1, je: 0, jp: 9, ga: 15, ge: 52, dif: -37, pts: 3, status: "eliminado", clubId: "club-cjru", clubSlug: "cjru" },
  { pos: 11, team: "RH SPORT", jj: 10, jg: 0, je: 0, jp: 10, ga: 2, ge: 70, dif: -68, pts: 0, status: "eliminado", clubId: "club-rh-sport-club", clubSlug: "rh-sport-club" },
];

export const SUB16_1RA_RULE = "CLASIFICAN LOS 8 PRIMEROS";

// =============================================================================
// 7. TABLA DE POSICIONES CATEGORÍA SUB 12 1RA DIVISIÓN · GRUPO A (Imagen 7)
// Clasifican los 8 primeros de cada grupo.
// =============================================================================
export const STANDINGS_SUB12_1RA_OFICIAL: OfficialTableRow[] = [
  { pos: 1, team: "FUSION ACADEMICA A", jj: 9, jg: 7, je: 0, jp: 2, ga: 44, ge: 13, dif: 31, pts: 21, status: "clasificado", clubId: "acad-08", clubSlug: "fusion-academica" },
  { pos: 2, team: "ESPARTANOS FUTSAL", jj: 5, jg: 5, je: 0, jp: 0, ga: 34, ge: 5, dif: 29, pts: 15, status: "clasificado", clubId: "acad-07", clubSlug: "espartanos-futsal" },
  { pos: 3, team: "LA PAZ FUTSAL", jj: 7, jg: 5, je: 0, jp: 2, ga: 26, ge: 6, dif: 20, pts: 15, status: "clasificado", clubId: "acad-15", clubSlug: "la-paz-futsal" },
  { pos: 4, team: "LA LADERA", jj: 7, jg: 5, je: 0, jp: 2, ga: 27, ge: 11, dif: 16, pts: 15, status: "clasificado", clubId: "acad-14", clubSlug: "la-ladera" },
  { pos: 5, team: "TETSU FUTSAL", jj: 9, jg: 5, je: 0, jp: 4, ga: 25, ge: 15, dif: 10, pts: 15, status: "clasificado", clubId: "acad-21", clubSlug: "tetsu-futsal" },
  { pos: 6, team: "FUTCONEXION", jj: 7, jg: 4, je: 1, jp: 2, ga: 19, ge: 9, dif: 10, pts: 13, status: "clasificado", clubId: "acad-32", clubSlug: "futconexion" },
  { pos: 7, team: "DEPORTIVO ODIN", jj: 9, jg: 4, je: 1, jp: 4, ga: 25, ge: 19, dif: 6, pts: 13, status: "clasificado", clubId: "acad-28", clubSlug: "deportivo-odin" },
  { pos: 8, team: "FUSION ACADEMICA B", jj: 8, jg: 3, je: 2, jp: 3, ga: 22, ge: 22, dif: 0, pts: 11, status: "clasificado", clubId: "acad-08", clubSlug: "fusion-academica" },
  { pos: 9, team: "CAMATAGUA", jj: 6, jg: 2, je: 0, jp: 4, ga: 16, ge: 22, dif: -6, pts: 6, status: "normal", clubId: "acad-05", clubSlug: "camatagua-fc" },
  { pos: 10, team: "NOVA FUTSAL", jj: 10, jg: 1, je: 0, jp: 9, ga: 11, ge: 60, dif: -49, pts: 3, status: "eliminado", clubId: "club-nova-futsal", clubSlug: "nova-futsal" },
  { pos: 11, team: "CARICUAO", jj: 10, jg: 0, je: 0, jp: 10, ga: 0, ge: 70, dif: -70, pts: 0, status: "eliminado", clubId: "acad-06", clubSlug: "gladiadores-caricuao" },
];

export const SUB12_1RA_RULE = "CLASIFICAN LOS 8 PRIMEROS DE CADA GRUPO";

// =============================================================================
// 8. TABLA DE POSICIONES CATEGORÍA SUB 14 1RA DIVISIÓN · GRUPO A (Imagen 8)
// Clasifican los 8 primeros de cada grupo.
// =============================================================================
export const STANDINGS_SUB14_1RA_OFICIAL: OfficialTableRow[] = [
  { pos: 1, team: "UNION LIBERTADOR", jj: 10, jg: 8, je: 1, jp: 1, ga: 49, ge: 19, dif: 30, pts: 25, status: "clasificado", clubId: "acad-23", clubSlug: "union-libertador" },
  { pos: 2, team: "REAL ESPERANZA", jj: 9, jg: 8, je: 0, jp: 1, ga: 32, ge: 16, dif: 16, pts: 24, status: "clasificado", clubId: "acad-18", clubSlug: "real-esperanza" },
  { pos: 3, team: "LA PAZ FUTSAL BLANCO", jj: 9, jg: 6, je: 0, jp: 3, ga: 37, ge: 14, dif: 23, pts: 18, status: "clasificado", clubId: "acad-15", clubSlug: "la-paz-futsal" },
  { pos: 4, team: "GUATIRE FUTSAL", jj: 8, jg: 5, je: 0, jp: 3, ga: 35, ge: 14, dif: 21, pts: 15, status: "clasificado", clubId: "acad-10", clubSlug: "guatire-futsal" },
  { pos: 5, team: "LA LADERA (B)", jj: 6, jg: 5, je: 0, jp: 1, ga: 22, ge: 9, dif: 13, pts: 15, status: "clasificado", clubId: "acad-14", clubSlug: "la-ladera" },
  { pos: 6, team: "ESPARTANOS FUTSAL", jj: 8, jg: 3, je: 2, jp: 3, ga: 27, ge: 14, dif: 13, pts: 11, status: "clasificado", clubId: "acad-07", clubSlug: "espartanos-futsal" },
  { pos: 7, team: "LA PAZ FUTSAL VERDE", jj: 9, jg: 3, je: 2, jp: 4, ga: 27, ge: 20, dif: 7, pts: 11, status: "clasificado", clubId: "acad-15", clubSlug: "la-paz-futsal" },
  { pos: 8, team: "CARICUAO FC", jj: 8, jg: 3, je: 1, jp: 4, ga: 24, ge: 18, dif: 6, pts: 10, status: "clasificado", clubId: "acad-06", clubSlug: "gladiadores-caricuao" },
  { pos: 9, team: "TETSU FUTSAL", jj: 10, jg: 3, je: 1, jp: 6, ga: 29, ge: 42, dif: -13, pts: 10, status: "normal", clubId: "acad-21", clubSlug: "tetsu-futsal" },
  { pos: 10, team: "FUSION ACADEMICA", jj: 7, jg: 3, je: 0, jp: 4, ga: 18, ge: 25, dif: -7, pts: 9, status: "normal", clubId: "acad-08", clubSlug: "fusion-academica" },
  { pos: 11, team: "CAMATAGUA", jj: 8, jg: 3, je: 0, jp: 5, ga: 17, ge: 27, dif: -10, pts: 9, status: "normal", clubId: "acad-05", clubSlug: "camatagua-fc" },
  { pos: 12, team: "FENIX SPORT", jj: 6, jg: 2, je: 1, jp: 3, ga: 18, ge: 19, dif: -1, pts: 7, status: "normal", clubId: "acad-31", clubSlug: "fenix-fs" },
  { pos: 13, team: "LA LADERA (A)", jj: 6, jg: 1, je: 2, jp: 3, ga: 15, ge: 17, dif: -2, pts: 5, status: "normal", clubId: "acad-14", clubSlug: "la-ladera" },
  { pos: 14, team: "SPORTU FUTSAL", jj: 13, jg: 0, je: 0, jp: 13, ga: 0, ge: 91, dif: -91, pts: 0, status: "eliminado", clubId: "club-sportu-futsal", clubSlug: "sportu-futsal" },
];

export const SUB14_1RA_RULE = "CLASIFICAN LOS 8 PRIMEROS DE CADA GRUPO";

// =============================================================================
// 9. TABLA DE POSICIONES CATEGORÍA SUB 10 1RA DIVISIÓN · GRUPO A (Imagen 9)
// Clasifican los 2 primeros a Semifinal y juego extra entre 3er lugar vs 6to y 4to vs 5to.
// =============================================================================
export const STANDINGS_SUB10_1RA_OFICIAL: OfficialTableRow[] = [
  { pos: 1, team: "DVO MIRADOR", jj: 6, jg: 4, je: 1, jp: 1, ga: 27, ge: 5, dif: 22, pts: 13, status: "clasificado", clubId: "acad-22", clubSlug: "dvo-mirador" },
  { pos: 2, team: "FUTCONEXION", jj: 5, jg: 3, je: 2, jp: 0, ga: 22, ge: 5, dif: 17, pts: 11, status: "clasificado", clubId: "acad-32", clubSlug: "futconexion" },
  { pos: 3, team: "UNION LIBERTADOR", jj: 6, jg: 3, je: 1, jp: 2, ga: 21, ge: 12, dif: 9, pts: 10, status: "normal", clubId: "acad-23", clubSlug: "union-libertador" },
  { pos: 4, team: "FUSION ACADEMICA", jj: 6, jg: 3, je: 1, jp: 2, ga: 20, ge: 11, dif: 9, pts: 10, status: "normal", clubId: "acad-08", clubSlug: "fusion-academica" },
  { pos: 5, team: "INTER DE CARACAS", jj: 5, jg: 3, je: 1, jp: 1, ga: 23, ge: 15, dif: 8, pts: 10, status: "normal", clubId: "acad-02", clubSlug: "inter-caracas" },
  { pos: 6, team: "CAMATAGUA", jj: 6, jg: 1, je: 0, jp: 5, ga: 9, ge: 35, dif: -26, pts: 3, status: "normal", clubId: "acad-05", clubSlug: "camatagua-fc" },
  { pos: 7, team: "NOVA FUTSAL", jj: 6, jg: 0, je: 0, jp: 6, ga: 5, ge: 44, dif: -39, pts: 0, status: "eliminado", clubId: "club-nova-futsal", clubSlug: "nova-futsal" },
];

export const SUB10_1RA_RULE = "CLASIFICAN LOS 2 PRIMEROS A SEMI FINAL Y JUEGO EXTRA ENTRE 3ER LUGAR VS 6TO Y 4TO LUGAR VS 5TO LUGAR";

export const OFFICIAL_MINOR_1RA_STANDINGS: Record<string, { standings: OfficialTableRow[]; rule: string; cutoff: number }> = {
  "Sub-10": { standings: STANDINGS_SUB10_1RA_OFICIAL, rule: SUB10_1RA_RULE, cutoff: 2 },
  "Sub-12": { standings: STANDINGS_SUB12_1RA_OFICIAL, rule: SUB12_1RA_RULE, cutoff: 8 },
  "Sub-14": { standings: STANDINGS_SUB14_1RA_OFICIAL, rule: SUB14_1RA_RULE, cutoff: 8 },
  "Sub-16": { standings: STANDINGS_SUB16_1RA_OFICIAL, rule: SUB16_1RA_RULE, cutoff: 8 },
  "Sub-18": { standings: STANDINGS_SUB18_1RA_OFICIAL, rule: SUB18_1RA_RULE, cutoff: 2 },
};
