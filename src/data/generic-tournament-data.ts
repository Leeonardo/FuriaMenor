import { OfficialTableRow } from "@/components/tournaments/tournament-official-table";
import { TournamentMatchItem } from "@/data/tournaments-data";
import { Scorer, Goalkeeper } from "@/data/daeris";

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
 * Goleadores genéricos
 */
export function createGenericScorers(teamPrefix = "Equipo"): Scorer[] {
  return [
    { player: "Jugador 1", team: `${teamPrefix} 1`, category: "Sub-12", modality: "primera", goals: 8 },
    { player: "Jugador 2", team: `${teamPrefix} 2`, category: "Sub-12", modality: "primera", goals: 6 },
    { player: "Jugador 3", team: `${teamPrefix} 3`, category: "Sub-12", modality: "primera", goals: 5 },
    { player: "Jugador 4", team: `${teamPrefix} 4`, category: "Sub-12", modality: "primera", goals: 4 },
    { player: "Jugador 5", team: `${teamPrefix} 5`, category: "Sub-12", modality: "primera", goals: 3 },
  ];
}

/**
 * Vallas menos vencidas genéricas
 */
export function createGenericKeepers(teamPrefix = "Equipo"): Goalkeeper[] {
  return [
    { player: "Portero 1", team: `${teamPrefix} 1`, category: "Sub-12", modality: "primera", goalsConceded: 3, matchesPlayed: 6, cleanSheets: 4 },
    { player: "Portero 2", team: `${teamPrefix} 2`, category: "Sub-12", modality: "primera", goalsConceded: 5, matchesPlayed: 6, cleanSheets: 3 },
    { player: "Portero 3", team: `${teamPrefix} 3`, category: "Sub-12", modality: "primera", goalsConceded: 4, matchesPlayed: 5, cleanSheets: 3 },
    { player: "Portero 4", team: `${teamPrefix} 4`, category: "Sub-12", modality: "primera", goalsConceded: 3, matchesPlayed: 4, cleanSheets: 2 },
  ];
}

/**
 * Partidos genéricos
 */
export function createGenericMatches(
  tournamentName: string,
  category = "Categoría Principal",
  venue = "Cancha Principal, Caracas",
  prefix = "Equipo"
): TournamentMatchItem[] {
  return [
    {
      id: `${tournamentName.toLowerCase().replace(/\s+/g, "-")}-1`,
      category,
      division: "Fase de Grupos",
      homeTeam: `${prefix} 1`,
      awayTeam: `${prefix} 2`,
      homeScore: null,
      awayScore: null,
      matchDate: "2026-11-08",
      matchTime: "09:00",
      venue,
      status: "scheduled",
      jornada: "JORNADA 1 · PRÓXIMA FECHA",
    },
    {
      id: `${tournamentName.toLowerCase().replace(/\s+/g, "-")}-2`,
      category,
      division: "Fase de Grupos",
      homeTeam: `${prefix} 3`,
      awayTeam: `${prefix} 4`,
      homeScore: null,
      awayScore: null,
      matchDate: "2026-11-08",
      matchTime: "10:15",
      venue,
      status: "scheduled",
      jornada: "JORNADA 1 · PRÓXIMA FECHA",
    },
    {
      id: `${tournamentName.toLowerCase().replace(/\s+/g, "-")}-3`,
      category,
      division: "Fase de Grupos",
      homeTeam: `${prefix} 5`,
      awayTeam: `${prefix} 6`,
      homeScore: 3,
      awayScore: 1,
      matchDate: "2026-11-01",
      matchTime: "11:30",
      venue,
      status: "finished",
      jornada: "JORNADA ANTERIOR · RESULTADO",
    },
    {
      id: `${tournamentName.toLowerCase().replace(/\s+/g, "-")}-4`,
      category,
      division: "Fase de Grupos",
      homeTeam: `${prefix} 7`,
      awayTeam: `${prefix} 8`,
      homeScore: 2,
      awayScore: 2,
      matchDate: "2026-11-01",
      matchTime: "12:45",
      venue,
      status: "finished",
      jornada: "JORNADA ANTERIOR · RESULTADO",
    },
  ];
}
