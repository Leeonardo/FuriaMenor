import React from "react";

export interface OfficialTableRow {
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
  status: "clasificado" | "eliminado" | "normal";
}

interface TournamentOfficialTableProps {
  title?: string;
  groupName?: string;
  qualificationRule?: string;
  qualificationCutoff?: number;
  rows: OfficialTableRow[];
}

/**
 * Tabla de Posiciones Oficial estilo planilla de competición
 * Diseño exacto al modelo reglamentario:
 * - Encabezado Cyan para título de la categoría
 * - Sub-encabezado Rojo para el Grupo
 * - Cabecera de columnas Amarilla (POS, EQUIPOS, JJ, JG, JE, JP, GA, GE, DIF, PTS)
 * - Filas con estado clasificados / eliminados
 * - Leyenda con clasificados (cyan), eliminados (rojo) y regla clasificatoria (amarillo)
 */
export function TournamentOfficialTable({
  title = "TABLA DE POSICIONES CATEGORIA SUB 12 ELITE",
  groupName = "GRUPO A",
  qualificationRule = "CLASIFICAN LOS 8 PRIMEROS DE CADA GRUPO",
  qualificationCutoff = 8,
  rows,
}: TournamentOfficialTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-neutral-700 bg-neutral-900/90 shadow-2xl">
      {/* 1. Encabezado Cyan de la Categoría */}
      <div className="bg-[#00E5FF] px-4 py-3 text-center border-b-2 border-black">
        <h3 className="text-sm sm:text-base font-black tracking-wider text-black uppercase">
          {title}
        </h3>
      </div>

      {/* 2. Sub-encabezado Rojo del Grupo */}
      <div className="bg-[#EF4444] px-4 py-1.5 text-center border-b-2 border-black">
        <p className="text-xs sm:text-sm font-extrabold tracking-widest text-black uppercase">
          {groupName}
        </p>
      </div>

      {/* 3. Tabla con columnas Amarillas */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-xs sm:text-sm border-collapse text-black">
          <thead>
            <tr className="bg-[#FFFF00] border-b-2 border-black font-black text-center">
              <th className="py-2 px-2 border-r border-black w-12">POS</th>
              <th className="py-2 px-3 border-r border-black text-left">EQUIPOS</th>
              <th className="py-2 px-2 border-r border-black w-10">JJ</th>
              <th className="py-2 px-2 border-r border-black w-10">JG</th>
              <th className="py-2 px-2 border-r border-black w-10">JE</th>
              <th className="py-2 px-2 border-r border-black w-10">JP</th>
              <th className="py-2 px-2 border-r border-black w-10">GA</th>
              <th className="py-2 px-2 border-r border-black w-10">GE</th>
              <th className="py-2 px-2 border-r border-black w-12">DIF</th>
              <th className="py-2 px-3 w-12">PTS</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const isEliminated = row.status === "eliminado";
              const isClassified = row.pos <= qualificationCutoff && !isEliminated;

              return (
                <tr
                  key={row.team}
                  className={`border-b border-black font-bold transition ${
                    isEliminated
                      ? "bg-[#EF4444] text-black font-extrabold"
                      : idx % 2 === 0
                      ? "bg-white text-black hover:bg-neutral-100"
                      : "bg-[#F8FAFC] text-black hover:bg-neutral-100"
                  }`}
                >
                  <td className="py-2 px-2 text-center border-r border-black font-black">
                    {row.pos}
                  </td>
                  <td className="py-2 px-3 border-r border-black text-left flex items-center gap-2">
                    {isClassified && (
                      <span className="h-2 w-2 rounded-full bg-[#00E5FF] border border-black inline-block shrink-0" />
                    )}
                    <span className="truncate uppercase">{row.team}</span>
                  </td>
                  <td className="py-2 px-2 text-center border-r border-black font-semibold">{row.jj}</td>
                  <td className="py-2 px-2 text-center border-r border-black font-semibold">{row.jg}</td>
                  <td className="py-2 px-2 text-center border-r border-black font-semibold">{row.je}</td>
                  <td className="py-2 px-2 text-center border-r border-black font-semibold">{row.jp}</td>
                  <td className="py-2 px-2 text-center border-r border-black font-semibold">{row.ga}</td>
                  <td className="py-2 px-2 text-center border-r border-black font-semibold">{row.ge}</td>
                  <td className="py-2 px-2 text-center border-r border-black font-black">
                    {row.dif > 0 ? `${row.dif}` : row.dif}
                  </td>
                  <td className="py-2 px-3 text-center font-black text-sm">{row.pts}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 4. Leyenda Inferior Exacta a la imagen */}
      <div className="bg-white p-3 sm:p-4 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Cuadro de Estados */}
        <div className="w-full sm:w-auto border border-black text-black font-bold divide-y divide-black">
          <div className="flex items-center">
            <span className="w-12 h-6 bg-[#00E5FF] border-r border-black shrink-0" />
            <span className="px-3 py-1 font-black uppercase text-[11px]">CLASIFICADOS</span>
          </div>
          <div className="flex items-center">
            <span className="w-12 h-6 bg-[#EF4444] border-r border-black shrink-0" />
            <span className="px-3 py-1 font-black uppercase text-[11px]">ELIMINADOS</span>
          </div>
        </div>

        {/* Regla de Clasificación en Amarillo */}
        <div className="w-full sm:w-auto bg-[#FFFF00] border-2 border-black px-4 py-2 text-center shadow-sm">
          <p className="font-black text-black uppercase tracking-wide text-xs sm:text-sm">
            {qualificationRule}
          </p>
        </div>
      </div>
    </div>
  );
}
