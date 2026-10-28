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

export const standingsSub12Elite: StandingRow[] = [
  { pos: 1, team: "FUSION ACADEMICA A", jj: 8, jg: 6, je: 0, jp: 2, ga: 37, ge: 13, dif: 24, pts: 18, category: "Sub-12", division: "Elite", group: "Grupo A", status: "clasificado" },
  { pos: 2, team: "FUTCONEXION", jj: 6, jg: 4, je: 1, jp: 1, ga: 19, ge: 5, dif: 14, pts: 13, category: "Sub-12", division: "Elite", group: "Grupo A", status: "clasificado" },
  { pos: 3, team: "ESPARTANOS FUTSAL", jj: 4, jg: 4, je: 0, jp: 0, ga: 27, ge: 5, dif: 22, pts: 12, category: "Sub-12", division: "Elite", group: "Grupo A", status: "clasificado" },
  { pos: 4, team: "LA LADERA", jj: 6, jg: 4, je: 0, jp: 2, ga: 20, ge: 11, dif: 9, pts: 12, category: "Sub-12", division: "Elite", group: "Grupo A", status: "clasificado" },
  { pos: 5, team: "TETSU FUTSAL", jj: 8, jg: 4, je: 0, jp: 4, ga: 18, ge: 15, dif: 3, pts: 12, category: "Sub-12", division: "Elite", group: "Grupo A", status: "clasificado" },
  { pos: 6, team: "DEPORTIVO ODIN", jj: 6, jg: 3, je: 1, jp: 2, ga: 17, ge: 8, dif: 9, pts: 10, category: "Sub-12", division: "Elite", group: "Grupo A", status: "clasificado" },
  { pos: 7, team: "FUSION ACADEMICA B", jj: 7, jg: 2, je: 2, jp: 3, ga: 15, ge: 22, dif: -7, pts: 8, category: "Sub-12", division: "Elite", group: "Grupo A", status: "clasificado" },
  { pos: 8, team: "LA PAZ FUTSAL", jj: 4, jg: 2, je: 0, jp: 2, ga: 11, ge: 5, dif: 6, pts: 6, category: "Sub-12", division: "Elite", group: "Grupo A", status: "clasificado" },
  { pos: 9, team: "CAMATAGUA", jj: 5, jg: 2, je: 0, jp: 3, ga: 16, ge: 15, dif: 1, pts: 6, category: "Sub-12", division: "Elite", group: "Grupo A", status: "normal" },
  { pos: 10, team: "NOVA FUTSAL", jj: 4, jg: 1, je: 0, jp: 3, ga: 11, ge: 22, dif: -11, pts: 3, category: "Sub-12", division: "Elite", group: "Grupo A", status: "normal" },
  { pos: 11, team: "CARICUAO", jj: 10, jg: 0, je: 0, jp: 10, ga: 0, ge: 70, dif: -70, pts: 0, category: "Sub-12", division: "Elite", group: "Grupo A", status: "eliminado" },
];
