export interface StandingRow {
  pos: number;
  team: string;
  jj: number;
  jg: number;
  je: number;
  jp: number;
  ga: number;
  ge: number;
  dif: number;
  pts: number;
  category: string;
  division: string;
  group: string;
  status?: "clasificado" | "eliminado" | "normal";
}

export const standingsSub12SegundaGrupoA: StandingRow[] = [
  { pos: 1, team: "INTOCABLE FC", jj: 7, jg: 5, je: 1, jp: 1, ga: 28, ge: 13, dif: 15, pts: 16, category: "Sub-12", division: "2da División", group: "Grupo A", status: "clasificado" },
  { pos: 2, team: "RICARDINHO", jj: 7, jg: 5, je: 1, jp: 1, ga: 22, ge: 9, dif: 13, pts: 16, category: "Sub-12", division: "2da División", group: "Grupo A", status: "clasificado" },
  { pos: 3, team: "HOGAR CANARIO", jj: 8, jg: 3, je: 4, jp: 1, ga: 21, ge: 11, dif: 10, pts: 13, category: "Sub-12", division: "2da División", group: "Grupo A", status: "clasificado" },
  { pos: 4, team: "ELITE CARACAS", jj: 7, jg: 3, je: 2, jp: 2, ga: 14, ge: 13, dif: 1, pts: 11, category: "Sub-12", division: "2da División", group: "Grupo A", status: "clasificado" },
  { pos: 5, team: "FALG", jj: 4, jg: 3, je: 1, jp: 0, ga: 14, ge: 6, dif: 8, pts: 10, category: "Sub-12", division: "2da División", group: "Grupo A", status: "clasificado" },
  { pos: 6, team: "DVO MANAURE", jj: 8, jg: 3, je: 1, jp: 4, ga: 21, ge: 18, dif: 3, pts: 10, category: "Sub-12", division: "2da División", group: "Grupo A", status: "clasificado" },
  { pos: 7, team: "FUERZA VINOTINTO (A)", jj: 8, jg: 2, je: 2, jp: 4, ga: 17, ge: 23, dif: -6, pts: 8, category: "Sub-12", division: "2da División", group: "Grupo A", status: "clasificado" },
  { pos: 8, team: "LA PAZ FUTSAL", jj: 7, jg: 1, je: 0, jp: 6, ga: 6, ge: 20, dif: -14, pts: 3, category: "Sub-12", division: "2da División", group: "Grupo A", status: "clasificado" },
  { pos: 9, team: "CARICUAO", jj: 8, jg: 1, je: 0, jp: 7, ga: 8, ge: 45, dif: -37, pts: 3, category: "Sub-12", division: "2da División", group: "Grupo A", status: "eliminado" },
];

export const standingsSub12SegundaGrupoB: StandingRow[] = [
  { pos: 1, team: "DVO MIRADOR", jj: 5, jg: 5, je: 0, jp: 0, ga: 22, ge: 3, dif: 19, pts: 15, category: "Sub-12", division: "2da División", group: "Grupo B", status: "clasificado" },
  { pos: 2, team: "GUATIRE FUTSAL", jj: 5, jg: 5, je: 0, jp: 0, ga: 22, ge: 8, dif: 14, pts: 15, category: "Sub-12", division: "2da División", group: "Grupo B", status: "clasificado" },
  { pos: 3, team: "FORO LIBERTADOR", jj: 6, jg: 3, je: 1, jp: 2, ga: 20, ge: 9, dif: 11, pts: 10, category: "Sub-12", division: "2da División", group: "Grupo B", status: "clasificado" },
  { pos: 4, team: "LA LADERA", jj: 5, jg: 3, je: 0, jp: 2, ga: 13, ge: 10, dif: 3, pts: 9, category: "Sub-12", division: "2da División", group: "Grupo B", status: "clasificado" },
  { pos: 5, team: "UNION LIBERTADOR", jj: 3, jg: 2, je: 1, jp: 0, ga: 11, ge: 2, dif: 9, pts: 7, category: "Sub-12", division: "2da División", group: "Grupo B", status: "clasificado" },
  { pos: 6, team: "FUNVIBRA", jj: 4, jg: 1, je: 1, jp: 2, ga: 14, ge: 11, dif: 3, pts: 4, category: "Sub-12", division: "2da División", group: "Grupo B", status: "clasificado" },
  { pos: 7, team: "DVO PARACOTO FC", jj: 5, jg: 1, je: 1, jp: 3, ga: 10, ge: 13, dif: -3, pts: 4, category: "Sub-12", division: "2da División", group: "Grupo B", status: "clasificado" },
  { pos: 8, team: "FUSION ACADEMICA", jj: 5, jg: 1, je: 0, jp: 4, ga: 6, ge: 14, dif: -8, pts: 3, category: "Sub-12", division: "2da División", group: "Grupo B", status: "clasificado" },
  { pos: 9, team: "FUERZA VINOTINTO B", jj: 8, jg: 0, je: 0, jp: 8, ga: 1, ge: 49, dif: -48, pts: 0, category: "Sub-12", division: "2da División", group: "Grupo B", status: "eliminado" },
];
