import { TournamentMatchItem } from "@/data/tournaments-data";
import { StandingRow } from "@/data/daeris/posiciones";
import { Scorer, Goalkeeper } from "@/data/daeris";
import { torneoDaerisMatches } from "@/data/daeris/calendario";
import { standingsSub12Elite } from "@/data/daeris/posiciones";
import { topScorers, leastConceded } from "@/data/daeris";

export type DaerisSubId =
  | "infantil-1ra"
  | "infantil-2da"
  | "institucional"
  | "futbol7"
  | "master50"
  | "libre-parquecarabobo";

export interface DaerisSubTournament {
  id: DaerisSubId;
  name: string;
  shortName: string;
  categoryLabel: string;
  badgeKey: DaerisSubId;
  venue: string;
  teamsCount: number;
  status: "En Curso" | "Fase Regular" | "Semifinales" | "Próxima Jornada";
  description: string;
  accent: {
    border: string;
    pill: string;
    text: string;
  };
  matches: TournamentMatchItem[];
  standings: StandingRow[];
  topScorers: Scorer[];
  leastConceded: Goalkeeper[];
}

// 1. Torneo Infantil 1era División (usando los partidos y tablas de 1ra de daeris)
const infantil1raMatches: TournamentMatchItem[] = torneoDaerisMatches.filter(
  (m) => m.modality === "primera" || m.division?.includes("1ra")
);

// 2. Torneo Infantil 2da División (usando los partidos y tablas de 2da de daeris)
const infantil2daMatches: TournamentMatchItem[] = torneoDaerisMatches.filter(
  (m) => m.modality === "segunda" || m.division?.includes("2da")
);

export const daerisSubTournaments: Record<DaerisSubId, DaerisSubTournament> = {
  "infantil-1ra": {
    id: "infantil-1ra",
    name: "Torneo Infantil 1era División",
    shortName: "Infantil 1ra Div",
    categoryLabel: "Sub-6 a Sub-18 · Élite",
    badgeKey: "infantil-1ra",
    venue: "Gimnasio Libertador del 23 de Enero, Caracas",
    teamsCount: 16,
    status: "En Curso",
    description: "Competencia formativa élite de futsal menor caraqueño con los mejores clubes de 1ra división.",
    accent: {
      border: "border-red-500/50 hover:border-red-500",
      pill: "bg-red-500/10 text-red-400 border-red-500/30",
      text: "text-red-400",
    },
    matches: infantil1raMatches.length > 0 ? infantil1raMatches : torneoDaerisMatches.slice(0, 5),
    standings: standingsSub12Elite,
    topScorers: topScorers.filter((s) => s.modality === "primera"),
    leastConceded: leastConceded.filter((k) => k.modality === "primera"),
  },
  "infantil-2da": {
    id: "infantil-2da",
    name: "Torneo Infantil 2da División",
    shortName: "Infantil 2da Div",
    categoryLabel: "Sub-6 a Sub-18 · Ascenso",
    badgeKey: "infantil-2da",
    venue: "Gimnasio Libertador del 23 de Enero, Caracas",
    teamsCount: 14,
    status: "En Curso",
    description: "Rama formativa de desarrollo y ascenso con escuelas emergentes del fútbol base.",
    accent: {
      border: "border-blue-500/50 hover:border-blue-400",
      pill: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      text: "text-blue-400",
    },
    matches: infantil2daMatches.length > 0 ? infantil2daMatches : torneoDaerisMatches.slice(5, 10),
    standings: [
      { pos: 1, team: "TETSU FUTSAL", jj: 4, jg: 3, je: 1, jp: 0, ga: 14, ge: 5, dif: 9, pts: 10, category: "Sub-12", division: "2da", group: "Grupo B", status: "clasificado" },
      { pos: 2, team: "DEPORTIVO ODIN", jj: 4, jg: 2, je: 1, jp: 1, ga: 10, ge: 6, dif: 4, pts: 7, category: "Sub-12", division: "2da", group: "Grupo B", status: "clasificado" },
      { pos: 3, team: "DVO PARAÍSO 2DA", jj: 3, jg: 2, je: 0, jp: 1, ga: 8, ge: 5, dif: 3, pts: 6, category: "Sub-12", division: "2da", group: "Grupo B", status: "clasificado" },
      { pos: 4, team: "ESPARTANOS CUTIRA", jj: 3, jg: 1, je: 0, jp: 2, ga: 6, ge: 9, dif: -3, pts: 3, category: "Sub-12", division: "2da", group: "Grupo B", status: "clasificado" },
      { pos: 5, team: "BLACK BULLS", jj: 4, jg: 0, je: 0, jp: 4, ga: 3, ge: 16, dif: -13, pts: 0, category: "Sub-12", division: "2da", group: "Grupo B", status: "normal" },
    ],
    topScorers: topScorers.filter((s) => s.modality === "segunda"),
    leastConceded: leastConceded.filter((k) => k.modality === "segunda"),
  },
  institucional: {
    id: "institucional",
    name: "Torneo Institucional",
    shortName: "Institucional",
    categoryLabel: "Empresas & Organismos",
    badgeKey: "institucional",
    venue: "Cancha Gimnasio Libertador, Caracas",
    teamsCount: 12,
    status: "Fase Regular",
    description: "Torneo de futsal entre instituciones públicas, gremios y empresas privadas de la capital.",
    accent: {
      border: "border-amber-500/50 hover:border-amber-400",
      pill: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      text: "text-amber-400",
    },
    matches: [
      {
        id: "ti-001",
        category: "Institucional",
        division: "Fase Grupos",
        homeTeam: "Seniat Central",
        awayTeam: "Banco de Venezuela",
        homeScore: null,
        awayScore: null,
        matchDate: "2026-11-07",
        matchTime: "18:00",
        venue: "Gimnasio Libertador, 23 de Enero",
        status: "scheduled",
        jornada: "FECHA 3 · INSTITUCIONAL",
      },
      {
        id: "ti-002",
        category: "Institucional",
        division: "Fase Grupos",
        homeTeam: "Metro de Caracas",
        awayTeam: "Cantv Futsal",
        homeScore: 4,
        awayScore: 2,
        matchDate: "2026-10-31",
        matchTime: "19:00",
        venue: "Gimnasio Libertador, 23 de Enero",
        status: "finished",
        jornada: "FECHA 2 · INSTITUCIONAL",
      },
    ],
    standings: [
      { pos: 1, team: "METRO DE CARACAS", jj: 2, jg: 2, je: 0, jp: 0, ga: 9, ge: 3, dif: 6, pts: 6, category: "Inst", division: "A", group: "Grupo A", status: "clasificado" },
      { pos: 2, team: "SENIAT CENTRAL", jj: 2, jg: 1, je: 1, jp: 0, ga: 7, ge: 4, dif: 3, pts: 4, category: "Inst", division: "A", group: "Grupo A", status: "clasificado" },
      { pos: 3, team: "BANCO DE VENEZUELA", jj: 2, jg: 1, je: 0, jp: 1, ga: 5, ge: 5, dif: 0, pts: 3, category: "Inst", division: "A", group: "Grupo A", status: "clasificado" },
      { pos: 4, team: "CANTV FUTSAL", jj: 2, jg: 0, je: 0, jp: 2, ga: 3, ge: 9, dif: -6, pts: 0, category: "Inst", division: "A", group: "Grupo A", status: "normal" },
    ],
    topScorers: [
      { player: "H. Gómez", team: "METRO DE CARACAS", category: "Sub-12", modality: "primera", goals: 5 },
      { player: "F. Castillo", team: "SENIAT CENTRAL", category: "Sub-12", modality: "primera", goals: 4 },
    ],
    leastConceded: [
      { player: "W. Morales", team: "METRO DE CARACAS", category: "Sub-12", modality: "primera", goalsConceded: 3, matchesPlayed: 2, cleanSheets: 1 },
    ],
  },
  futbol7: {
    id: "futbol7",
    name: "Fútbol 7 Institucional",
    shortName: "Fútbol 7 Inst",
    categoryLabel: "Modalidad Fútbol 7",
    badgeKey: "futbol7",
    venue: "Complejo Deportivo San Agustín, Caracas",
    teamsCount: 10,
    status: "En Curso",
    description: "Competición en cancha sintética de fútbol 7 para entidades y corporaciones.",
    accent: {
      border: "border-emerald-500/50 hover:border-emerald-400",
      pill: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      text: "text-emerald-400",
    },
    matches: [
      {
        id: "f7-001",
        category: "Fútbol 7",
        division: "Institucional",
        homeTeam: "Alcaldía Libertador F7",
        awayTeam: "Pdvsa Gas F7",
        homeScore: null,
        awayScore: null,
        matchDate: "2026-11-08",
        matchTime: "11:00",
        venue: "Complejo San Agustín, Caracas",
        status: "scheduled",
        jornada: "JORNADA 2 · FÚTBOL 7",
      },
      {
        id: "f7-002",
        category: "Fútbol 7",
        division: "Institucional",
        homeTeam: "Seguros Caracas F7",
        awayTeam: "Corpoelec F7",
        homeScore: 5,
        awayScore: 3,
        matchDate: "2026-11-01",
        matchTime: "12:15",
        venue: "Complejo San Agustín, Caracas",
        status: "finished",
        jornada: "JORNADA 1 · FÚTBOL 7",
      },
    ],
    standings: [
      { pos: 1, team: "SEGUROS CARACAS F7", jj: 1, jg: 1, je: 0, jp: 0, ga: 5, ge: 3, dif: 2, pts: 3, category: "F7", division: "1", group: "G1", status: "clasificado" },
      { pos: 2, team: "ALCALDÍA LIBERTADOR", jj: 0, jg: 0, je: 0, jp: 0, ga: 0, ge: 0, dif: 0, pts: 0, category: "F7", division: "1", group: "G1", status: "clasificado" },
      { pos: 3, team: "PDVSA GAS F7", jj: 0, jg: 0, je: 0, jp: 0, ga: 0, ge: 0, dif: 0, pts: 0, category: "F7", division: "1", group: "G1", status: "normal" },
      { pos: 4, team: "CORPOELEC F7", jj: 1, jg: 0, je: 0, jp: 1, ga: 3, ge: 5, dif: -2, pts: 0, category: "F7", division: "1", group: "G1", status: "normal" },
    ],
    topScorers: [
      { player: "A. Méndez", team: "SEGUROS CARACAS F7", category: "Sub-12", modality: "primera", goals: 3 },
      { player: "R. Briceño", team: "CORPOELEC F7", category: "Sub-12", modality: "primera", goals: 2 },
    ],
    leastConceded: [
      { player: "L. Perdomo", team: "SEGUROS CARACAS F7", category: "Sub-12", modality: "primera", goalsConceded: 3, matchesPlayed: 1, cleanSheets: 0 },
    ],
  },
  master50: {
    id: "master50",
    name: "Master 50",
    shortName: "Master +50",
    categoryLabel: "Veteranos (+50 Años)",
    badgeKey: "master50",
    venue: "Cancha Gimnasio Libertador, 23 de Enero",
    teamsCount: 8,
    status: "Semifinales",
    description: "Torneo histórico de veteranos y glorias del futsal caraqueño mayores de 50 años.",
    accent: {
      border: "border-yellow-500/50 hover:border-yellow-400",
      pill: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      text: "text-yellow-400",
    },
    matches: [
      {
        id: "m50-001",
        category: "Master 50",
        division: "Semifinales",
        homeTeam: "Veteranos de Catia",
        awayTeam: "Glorias del 23",
        homeScore: null,
        awayScore: null,
        matchDate: "2026-11-07",
        matchTime: "16:00",
        venue: "Gimnasio Libertador, 23 de Enero",
        status: "scheduled",
        jornada: "SEMIFINAL IDA · MASTER 50",
      },
      {
        id: "m50-002",
        category: "Master 50",
        division: "Semifinales",
        homeTeam: "San Juan Futsal (+50)",
        awayTeam: "Deportivo El Silencio",
        homeScore: 2,
        awayScore: 2,
        matchDate: "2026-10-31",
        matchTime: "17:00",
        venue: "Gimnasio Libertador, 23 de Enero",
        status: "finished",
        jornada: "SEMIFINAL IDA · MASTER 50",
      },
    ],
    standings: [
      { pos: 1, team: "GLORIAS DEL 23", jj: 6, jg: 5, je: 1, jp: 0, ga: 18, ge: 6, dif: 12, pts: 16, category: "M50", division: "A", group: "G1", status: "clasificado" },
      { pos: 2, team: "VETERANOS DE CATIA", jj: 6, jg: 4, je: 1, jp: 1, ga: 15, ge: 8, dif: 7, pts: 13, category: "M50", division: "A", group: "G1", status: "clasificado" },
      { pos: 3, team: "SAN JUAN (+50)", jj: 6, jg: 3, je: 2, jp: 1, ga: 12, ge: 9, dif: 3, pts: 11, category: "M50", division: "A", group: "G1", status: "clasificado" },
      { pos: 4, team: "DVO EL SILENCIO", jj: 6, jg: 3, je: 1, jp: 2, ga: 11, ge: 10, dif: 1, pts: 10, category: "M50", division: "A", group: "G1", status: "clasificado" },
    ],
    topScorers: [
      { player: "C. \"El Mago\" Rivas", team: "GLORIAS DEL 23", category: "Sub-12", modality: "primera", goals: 7 },
      { player: "E. Salcedo", team: "VETERANOS DE CATIA", category: "Sub-12", modality: "primera", goals: 6 },
    ],
    leastConceded: [
      { player: "O. Betancourt", team: "GLORIAS DEL 23", category: "Sub-12", modality: "primera", goalsConceded: 6, matchesPlayed: 6, cleanSheets: 3 },
    ],
  },
  "libre-parquecarabobo": {
    id: "libre-parquecarabobo",
    name: "Torneo Libre Parque Carabobo",
    shortName: "Libre P. Carabobo",
    categoryLabel: "Categoría Libre",
    badgeKey: "libre-parquecarabobo",
    venue: "Cancha Municipal Parque Carabobo, La Candelaria",
    teamsCount: 16,
    status: "En Curso",
    description: "Circuito de futsal libre con alta intensidad competitiva en el corazón de Caracas.",
    accent: {
      border: "border-orange-500/50 hover:border-orange-400",
      pill: "bg-orange-500/10 text-orange-400 border-orange-500/30",
      text: "text-orange-400",
    },
    matches: [
      {
        id: "pc-001",
        category: "Libre",
        division: "Fase de Grupos",
        homeTeam: "La Candelaria Futsal",
        awayTeam: "San Bernardino FC",
        homeScore: null,
        awayScore: null,
        matchDate: "2026-11-06",
        matchTime: "20:00",
        venue: "Cancha Parque Carabobo, Caracas",
        status: "scheduled",
        jornada: "FECHA 4 · NOCTURNA",
      },
      {
        id: "pc-002",
        category: "Libre",
        division: "Fase de Grupos",
        homeTeam: "Los Próceres Futsal",
        awayTeam: "Furia Bellas Artes",
        homeScore: 6,
        awayScore: 4,
        matchDate: "2026-10-30",
        matchTime: "21:00",
        venue: "Cancha Parque Carabobo, Caracas",
        status: "finished",
        jornada: "FECHA 3 · NOCTURNA",
      },
    ],
    standings: [
      { pos: 1, team: "LA CANDELARIA FUTSAL", jj: 3, jg: 3, je: 0, jp: 0, ga: 14, ge: 5, dif: 9, pts: 9, category: "Libre", division: "A", group: "G1", status: "clasificado" },
      { pos: 2, team: "LOS PRÓCERES FUTSAL", jj: 3, jg: 2, je: 0, jp: 1, ga: 11, ge: 9, dif: 2, pts: 6, category: "Libre", division: "A", group: "G1", status: "clasificado" },
      { pos: 3, team: "SAN BERNARDINO FC", jj: 2, jg: 1, je: 0, jp: 1, ga: 7, ge: 6, dif: 1, pts: 3, category: "Libre", division: "A", group: "G1", status: "clasificado" },
      { pos: 4, team: "FURIA BELLAS ARTES", jj: 3, jg: 0, je: 0, jp: 3, ga: 6, ge: 15, dif: -9, pts: 0, category: "Libre", division: "A", group: "G1", status: "normal" },
    ],
    topScorers: [
      { player: "J. \"Bala\" Pérez", team: "LA CANDELARIA FUTSAL", category: "Sub-12", modality: "primera", goals: 6 },
      { player: "A. Cedeño", team: "LOS PRÓCERES FUTSAL", category: "Sub-12", modality: "primera", goals: 5 },
    ],
    leastConceded: [
      { player: "G. Vielma", team: "LA CANDELARIA FUTSAL", category: "Sub-12", modality: "primera", goalsConceded: 5, matchesPlayed: 3, cleanSheets: 1 },
    ],
  },
};

export const daerisSubList = Object.values(daerisSubTournaments);
