export const CATEGORIES = ["Sub-6", "Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"] as const;
export const MODALITIES = ["primera", "segunda"] as const;

export type Category = (typeof CATEGORIES)[number];
export type Modality = (typeof MODALITIES)[number];

export const modalityLabels: Record<Modality, string> = {
  primera: "1ra División",
  segunda: "2da División",
};

export const teamsBySegment: Record<Modality, string[]> = {
  primera: ["FUSION ACADEMICA A", "FUTCONEXION", "ESPARTANOS FUTSAL", "LA LADERA"],
  segunda: ["TETSU FUTSAL", "DEPORTIVO ODIN", "FUSION ACADEMICA B", "LA PAZ FUTSAL"],
};

export interface Team {
  id: string;
  name: string;
  segment: Modality;
}

export const getTeamsFor = (category: Category, modality: Modality): Team[] => {
  return teamsBySegment[modality].map((name, idx) => ({
    id: `${category}-${modality}-${idx + 1}`,
    name,
    segment: modality,
  }));
};

export interface Match {
  id: string;
  category: Category;
  modality: Modality;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  matchDate: string;
  matchTime: string;
  venue: string;
  status: "scheduled" | "live" | "finished";
  matchday: number;
}

export const sampleMatches: Match[] = [
  {
    id: "m1",
    category: "Sub-12",
    modality: "primera",
    homeTeam: "FUSION ACADEMICA A",
    awayTeam: "FUTCONEXION",
    homeScore: null,
    awayScore: null,
    matchDate: "2026-10-30",
    matchTime: "08:00",
    venue: "Cancha Principal",
    status: "scheduled",
    matchday: 1,
  },
  {
    id: "m2",
    category: "Sub-12",
    modality: "primera",
    homeTeam: "ESPARTANOS FUTSAL",
    awayTeam: "LA LADERA",
    homeScore: 2,
    awayScore: 1,
    matchDate: "2026-10-30",
    matchTime: "09:15",
    venue: "Cancha 2",
    status: "finished",
    matchday: 1,
  },
  {
    id: "m3",
    category: "Sub-12",
    modality: "segunda",
    homeTeam: "TETSU FUTSAL",
    awayTeam: "DEPORTIVO ODIN",
    homeScore: 1,
    awayScore: 1,
    matchDate: "2026-10-30",
    matchTime: "10:30",
    venue: "Cancha Principal",
    status: "finished",
    matchday: 1,
  },
  {
    id: "m4",
    category: "Sub-12",
    modality: "primera",
    homeTeam: "FUSION ACADEMICA A",
    awayTeam: "ESPARTANOS FUTSAL",
    homeScore: null,
    awayScore: null,
    matchDate: "2026-10-30",
    matchTime: "11:45",
    venue: "Cancha 3",
    status: "live",
    matchday: 1,
  },
];

export interface Scorer {
  player: string;
  team: string;
  category: Category;
  modality: Modality;
  goals: number;
}

export const topScorers: Scorer[] = [
  { player: "J. Martínez", team: "FUSION ACADEMICA A", category: "Sub-12", modality: "primera", goals: 8 },
  { player: "A. Torres", team: "FUTCONEXION", category: "Sub-12", modality: "primera", goals: 6 },
  { player: "M. Rojas", team: "TETSU FUTSAL", category: "Sub-12", modality: "segunda", goals: 5 },
  { player: "L. Vargas", team: "LA PAZ FUTSAL", category: "Sub-12", modality: "segunda", goals: 4 },
];

export interface Goalkeeper {
  player: string;
  team: string;
  category: Category;
  modality: Modality;
  goalsConceded: number;
  matchesPlayed: number;
  cleanSheets: number;
}

export const leastConceded: Goalkeeper[] = [
  { player: "C. Herrera", team: "FUSION ACADEMICA A", category: "Sub-12", modality: "primera", goalsConceded: 3, matchesPlayed: 6, cleanSheets: 4 },
  { player: "D. Mendoza", team: "FUTCONEXION", category: "Sub-12", modality: "primera", goalsConceded: 5, matchesPlayed: 6, cleanSheets: 3 },
  { player: "R. Silva", team: "TETSU FUTSAL", category: "Sub-12", modality: "segunda", goalsConceded: 4, matchesPlayed: 5, cleanSheets: 3 },
  { player: "E. Contreras", team: "LA PAZ FUTSAL", category: "Sub-12", modality: "segunda", goalsConceded: 3, matchesPlayed: 4, cleanSheets: 2 },
];

export const calculateStandings = (matches: Match[], teams: Team[]) => {
  const table = new Map<string, any>();
  for (const team of teams) {
    table.set(team.name, {
      team: team.name,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      gf: 0,
      gc: 0,
      gd: 0,
      points: 0,
    });
  }
  for (const match of matches) {
    if (match.status !== "finished" || match.homeScore === null || match.awayScore === null) continue;
    const home = table.get(match.homeTeam);
    const away = table.get(match.awayTeam);
    if (!home || !away) continue;
    home.played += 1;
    away.played += 1;
    home.gf += match.homeScore;
    home.gc += match.awayScore;
    away.gf += match.awayScore;
    away.gc += match.homeScore;
    if (match.homeScore > match.awayScore) {
      home.won += 1;
      home.points += 3;
      away.lost += 1;
    } else if (match.awayScore > match.homeScore) {
      away.won += 1;
      away.points += 3;
      home.lost += 1;
    } else {
      home.drawn += 1;
      away.drawn += 1;
      home.points += 1;
      away.points += 1;
    }
    home.gd = home.gf - home.gc;
    away.gd = away.gf - away.gc;
  }
  return Array.from(table.values()).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gd !== a.gd) return b.gd - a.gd;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return 0;
  });
};
