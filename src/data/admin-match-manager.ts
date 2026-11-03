import { TournamentMatchItem, MatchReferees } from "@/data/tournaments-data";
import { daerisSubList, DaerisSubId } from "@/data/daeris-subtournaments";
import { MINOR_CATEGORIES, MinorCategory } from "@/data/generic-tournament-data";

export interface MatchGoalEvent {
  id: string;
  playerId: string;
  playerName: string;
  team: "home" | "away";
  minute?: string;
}

export interface MatchCardEvent {
  id: string;
  playerId: string;
  playerName: string;
  team: "home" | "away";
  cardType: "amarilla" | "roja";
  minute?: string;
  reason?: string;
}

export interface FullMatchData extends TournamentMatchItem {
  tournamentSlug: string;
  tournamentName: string;
  subCategory?: string;
  goalsList?: MatchGoalEvent[];
  cardsList?: MatchCardEvent[];
}

/**
 * Obtiene la lista completa de partidos de todos los torneos y categorías
 */
export function getAllTournamentMatches(): FullMatchData[] {
  const allMatches: FullMatchData[] = [];

  for (const sub of daerisSubList) {
    if (sub.hasCategories && sub.categoryData) {
      for (const cat of MINOR_CATEGORIES) {
        const payload = sub.categoryData[cat];
        if (payload?.matches) {
          for (const m of payload.matches) {
            allMatches.push({
              ...m,
              tournamentSlug: sub.slug,
              tournamentName: sub.name,
              subCategory: cat,
              goalsList: m.homeScore && m.awayScore ? [
                { id: `g1-${m.id}`, playerId: `${sub.slug}-p1`, playerName: `${m.homeTeam} Jugador 10`, team: "home", minute: "12'" },
                { id: `g2-${m.id}`, playerId: `${sub.slug}-p2`, playerName: `${m.awayTeam} Jugador 9`, team: "away", minute: "24'" },
              ] : [],
              cardsList: [],
            });
          }
        }
      }
    } else if (sub.matches) {
      for (const m of sub.matches) {
        allMatches.push({
          ...m,
          tournamentSlug: sub.slug,
          tournamentName: sub.name,
          subCategory: sub.shortName,
          goalsList: m.homeScore && m.awayScore ? [
            { id: `g1-${m.id}`, playerId: `${sub.slug}-p1`, playerName: `${m.homeTeam} Goleador`, team: "home", minute: "15'" },
          ] : [],
          cardsList: [],
        });
      }
    }
  }

  return allMatches;
}

const LOCAL_STORAGE_KEY = "furia_menor_admin_matches_overrides";

/**
 * Carga las modificaciones de partidos guardadas por el administrador en localStorage
 */
export function getSavedMatchOverrides(): Record<string, FullMatchData> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error("Error al leer modificaciones del admin:", err);
    return {};
  }
}

/**
 * Guarda o actualiza un partido editado por el administrador
 */
export function saveMatchOverride(match: FullMatchData): void {
  if (typeof window === "undefined") return;
  try {
    const current = getSavedMatchOverrides();
    current[match.id] = match;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
  } catch (err) {
    console.error("Error al guardar modificación de partido:", err);
  }
}
