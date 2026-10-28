export const CATEGORIES = ["Sub-6", "Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18"] as const;
export const MODALITIES = ["formacion", "moderado", "competencia"] as const;

export type Category = (typeof CATEGORIES)[number];
export type Modality = (typeof MODALITIES)[number];

export const modalityLabels: Record<Modality, string> = {
  formacion: "Formación",
  moderado: "Moderado",
  competencia: "Competencia",
};

export const teamsBySegment: Record<Modality, string[]> = {
  formacion: ["Academia Furia Kids", "Leones FC A", "Titanes del Oeste", "Relámpagos de Caracas"],
  moderado: ["Real Caracas", "Atlético Vista Alegre", "Deportivo El Paraíso", "Furia Promesas"],
  competencia: ["Furia Menor Oficial", "Academia Elite FC", "Fénix Futsal/Campo", "Dinamo Capital"],
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
    modality: "formacion",
    homeTeam: "Academia Furia Kids",
    awayTeam: "Leones FC A",
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
    modality: "formacion",
    homeTeam: "Titanes del Oeste",
    awayTeam: "Relámpagos de Caracas",
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
    modality: "moderado",
    homeTeam: "Real Caracas",
    awayTeam: "Atlético Vista Alegre",
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
    modality: "competencia",
    homeTeam: "Furia Menor Oficial",
    awayTeam: "Academia Elite FC",
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
  { player: "J. Martínez", team: "Furia Menor Oficial", category: "Sub-12", modality: "competencia", goals: 8 },
  { player: "A. Torres", team: "Academia Elite FC", category: "Sub-12", modality: "competencia", goals: 6 },
  { player: "M. Rojas", team: "Real Caracas", category: "Sub-12", modality: "moderado", goals: 5 },
  { player: "L. Vargas", team: "Titanes del Oeste", category: "Sub-12", modality: "formacion", goals: 4 },
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
  { player: "C. Herrera", team: "Furia Menor Oficial", category: "Sub-12", modality: "competencia", goalsConceded: 3, matchesPlayed: 6, cleanSheets: 4 },
  { player: "D. Mendoza", team: "Academia Elite FC", category: "Sub-12", modality: "competencia", goalsConceded: 5, matchesPlayed: 6, cleanSheets: 3 },
  { player: "R. Silva", team: "Real Caracas", category: "Sub-12", modality: "moderado", goalsConceded: 4, matchesPlayed: 5, cleanSheets: 3 },
  { player: "E. Contreras", team: "Titanes del Oeste", category: "Sub-12", modality: "formacion", goalsConceded: 3, matchesPlayed: 4, cleanSheets: 2 },
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
