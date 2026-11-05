/**
 * Sistema de Identificación Única Interna para Torneos, Equipos y Jugadores
 * Formato determinista y relacional para cálculo automatizado de:
 * - Tabla de Posiciones Colectiva
 * - Tabla Individual de Goleadores
 * - Tabla Individual de Valla Menos Vencida
 */

export interface TournamentCodes {
  tournament: string; // ej: DAE (Daeris), PRU (Prueba)
  division: string;   // ej: INF1 (Infantil 1ra), INF2 (Infantil 2da), INST, FUT7, M50, LPC
  category: string;   // ej: S08, S10, S12, S14, S16, S18, S20, LIB, MAS, INS
}

/**
 * Normaliza la categoría al código alfanumérico compacto
 * ej: "Sub-12" -> "S12", "Sub-8" -> "S08", "Institucional" -> "INS"
 */
export function normalizeCategoryCode(category: string): string {
  const clean = category.trim().toUpperCase();
  if (clean.includes("SUB-8") || clean === "SUB 8") return "S08";
  if (clean.includes("SUB-10") || clean === "SUB 10") return "S10";
  if (clean.includes("SUB-12") || clean === "SUB 12") return "S12";
  if (clean.includes("SUB-14") || clean === "SUB 14") return "S14";
  if (clean.includes("SUB-16") || clean === "SUB 16") return "S16";
  if (clean.includes("SUB-18") || clean === "SUB 18") return "S18";
  if (clean.includes("SUB-20") || clean === "SUB 20") return "S20";
  if (clean.includes("FUT7") || clean.includes("FÚTBOL 7")) return "F7";
  if (clean.includes("MASTER")) return "M50";
  if (clean.includes("LIBRE")) return "LIB";
  if (clean.includes("INSTITUCIONAL")) return "INS";
  return clean.replace(/[^A-Z0-9]/g, "").slice(0, 4);
}

/**
 * Normaliza el slug del sub-torneo al código compacto
 */
export function normalizeDivisionCode(subSlugOrId: string): string {
  const clean = subSlugOrId.trim().toLowerCase();
  if (clean.includes("infantil-1") || clean.includes("infantil-1ra")) return "INF1";
  if (clean.includes("infantil-2") || clean.includes("infantil-2da")) return "INF2";
  if (clean.includes("futbol-7") || clean.includes("futbol7")) return "FUT7";
  if (clean.includes("master")) return "M50";
  if (clean.includes("carabobo") || clean.includes("libre")) return "LPC";
  if (clean.includes("institucional")) return "INST";
  return "GEN";
}

/**
 * Genera el ID único de Equipo para un torneo y categoría específica
 * Formato: TM-{TOURNAMENT}-{DIVISION}-{CATEGORY}-{EQUIPO_NUM}
 * Ejemplo: TM-DAE-INF1-S12-01
 */
export function generateTeamId(
  tournamentCode: string,
  divisionCode: string,
  categoryCode: string,
  teamNumber: number | string
): string {
  const padNum = String(teamNumber).padStart(2, "0");
  return `TM-${tournamentCode.toUpperCase()}-${divisionCode.toUpperCase()}-${categoryCode.toUpperCase()}-${padNum}`;
}

/**
 * Genera el ID único del Jugador registrado en un torneo y categoría
 * Formato: {TOURNAMENT}-{DIVISION}-{CATEGORY}-{EQUIPO_NUM}-{CI}
 * Ejemplo: DAE-INF1-S12-EQ01-V34112233
 *
 * Este ID garantiza:
 * 1. Unicidad por torneo y categoría
 * 2. Trazabilidad directa a la Cédula de Identidad venezolana
 * 3. Actualización atómica en la base de datos de goles, tarjetas y vallas
 */
export function generatePlayerTournamentId(
  tournamentCode: string,
  divisionCode: string,
  categoryCode: string,
  teamCode: string,
  playerCI: string
): string {
  const cleanCI = playerCI.toUpperCase().replace(/[^V|E|J|0-9]/g, "");
  const cleanTeam = teamCode.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return `${tournamentCode.toUpperCase()}-${divisionCode.toUpperCase()}-${categoryCode.toUpperCase()}-${cleanTeam}-${cleanCI}`;
}

/**
 * Descompone un ID de jugador para alimentar los triggers de actualización
 */
export function parsePlayerTournamentId(playerTournamentId: string): {
  tournamentCode: string;
  divisionCode: string;
  categoryCode: string;
  teamCode: string;
  playerCI: string;
} | null {
  const parts = playerTournamentId.split("-");
  if (parts.length < 5) return null;
  return {
    tournamentCode: parts[0],
    divisionCode: parts[1],
    categoryCode: parts[2],
    teamCode: parts[3],
    playerCI: parts.slice(4).join("-"),
  };
}

export type PlayerPosition = "Portero" | "Cierre" | "Ala" | "Pívot";

export interface TeamPlayerItem {
  id: string; // Unique Player Tournament ID (ej: DAE-INF1-S12-EQ01-V34112201)
  ci: string; // Cédula de Identidad formateada (ej: V-34.112.201)
  dorsal: number;
  name: string;
  position: PlayerPosition;
  category: string;
  teamId: string;
  teamName: string;
  matchesPlayed: number;
  goals: number;
  yellowCards: number;
  redCards: number;
  // Específico para porteros
  cleanSheets?: number;
  goalsConceded?: number;
}

export interface TeamProfile {
  id: string; // Unique Team ID (ej: TM-DAE-INF1-S12-01)
  slug: string; // ej: "equipo-1"
  name: string; // ej: "Equipo 1"
  shortName: string;
  tournamentId: string; // ej: "daeris"
  subTournamentSlug: string; // ej: "infantil-1ra-division"
  subTournamentName: string; // ej: "Torneo Infantil 1era División"
  category: string; // ej: "Sub-12"
  coach: string;
  assistantCoach: string;
  delegate: string;
  venue: string;
  roster: TeamPlayerItem[];
}

import { getAcademyBySlug, getClubOrAcademyById, type Academy } from "./academies-data";

/**
 * Obtiene el ID canónico inmutable de un club o academia
 * ej. "BDV" -> "club-bdv", "La Paz Futsal" -> "acad-10"
 */
export function getCanonicalClubId(teamNameOrSlug: string): string {
  const club = getAcademyBySlug(teamNameOrSlug);
  return club ? club.id : `club-${teamNameOrSlug.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
}

/**
 * Resuelve la información canónica de un club o academia por cualquier identificador.
 * Al cambiar cualquier dato en academiesData / official-clubs-data,
 * se propaga automáticamente a todos los componentes que usen esta función.
 */
export function resolveCanonicalClub(teamNameOrSlug: string): Academy | undefined {
  return getAcademyBySlug(teamNameOrSlug) || getClubOrAcademyById(teamNameOrSlug);
}
