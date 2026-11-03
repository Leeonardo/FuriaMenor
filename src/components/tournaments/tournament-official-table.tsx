import React from "react";
import Link from "next/link";
import { Trophy, Users } from "lucide-react";

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
  baseTournamentPath?: string;
  currentCategory?: string;
}

/**
 * Tabla de Posiciones Oficial adaptada al estilo y diseño de Furia Menor
 * Mantiene la estructura exacta reglamentaria:
 * - POS | EQUIPOS | JJ | JG | JE | JP | GA | GE | DIF | PTS
 * - Clasificados y Eliminados
 * - Leyenda con regla clasificatoria
 * - Cada equipo es clicable para acceder a su plantilla oficial
 */
export function TournamentOfficialTable({
  title = "TABLA DE POSICIONES CATEGORIA SUB 12 ELITE",
  groupName = "GRUPO A",
  qualificationRule = "CLASIFICAN LOS 8 PRIMEROS DE CADA GRUPO",
  qualificationCutoff = 8,
  rows,
  baseTournamentPath,
  currentCategory,
}: TournamentOfficialTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl backdrop-blur-md">
      {/* 1. Encabezado estilizado con identidad de Furia Menor */}
      <div className="bg-gradient-to-r from-red-950/60 via-neutral-900 to-neutral-950 px-5 py-3.5 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-600/20 text-red-400 border border-red-500/30">
            <Trophy className="h-4 w-4" />
          </div>
          <h3 className="text-sm sm:text-base font-extrabold tracking-wide text-white uppercase">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {baseTournamentPath && (
            <span className="text-[11px] text-neutral-400 hidden sm:inline flex items-center gap-1">
              <Users className="h-3 w-3 text-red-400" />
              Haz clic en cualquier equipo para ver su plantilla
            </span>
          )}
          <span className="rounded-full bg-red-500/10 border border-red-500/30 px-3 py-0.5 text-xs font-bold text-red-400 uppercase tracking-widest">
            {groupName}
          </span>
        </div>
      </div>

      {/* 2. Tabla de posiciones con estructura reglamentaria y estética moderna */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-xs sm:text-sm border-collapse text-neutral-200">
          <thead>
            <tr className="bg-neutral-900/90 border-b border-neutral-800 text-neutral-400 font-extrabold text-center uppercase tracking-wider text-[11px] sm:text-xs">
              <th className="py-3 px-3 w-12 text-center">POS</th>
              <th className="py-3 px-4 text-left">EQUIPOS</th>
              <th className="py-3 px-2 w-11">JJ</th>
              <th className="py-3 px-2 w-11">JG</th>
              <th className="py-3 px-2 w-11">JE</th>
              <th className="py-3 px-2 w-11">JP</th>
              <th className="py-3 px-2 w-12">GA</th>
              <th className="py-3 px-2 w-12">GE</th>
              <th className="py-3 px-2 w-14">DIF</th>
              <th className="py-3 px-4 w-16 text-right text-red-400 font-black">PTS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60 font-medium">
            {rows.map((row, idx) => {
              const isEliminated = row.status === "eliminado";
              const isClassified = row.pos <= qualificationCutoff && !isEliminated;
              const teamSlug = row.team.toLowerCase().replace(/\s+/g, "-");
              const catParam = currentCategory ? `?cat=${currentCategory}` : "";
              const teamHref = baseTournamentPath
                ? `${baseTournamentPath}/equipos/${teamSlug}${catParam}`
                : undefined;

              return (
                <tr
                  key={row.team}
                  className={`transition-colors duration-150 ${
                    isEliminated
                      ? "bg-red-950/30 text-red-200 hover:bg-red-950/50 border-l-4 border-l-red-500"
                      : isClassified
                      ? "hover:bg-neutral-900/60 border-l-4 border-l-emerald-500/70"
                      : "hover:bg-neutral-900/40 border-l-4 border-l-transparent"
                  } ${idx % 2 === 0 ? "bg-neutral-950" : "bg-neutral-900/30"}`}
                >
                  <td className="py-3 px-3 text-center font-black">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-xs ${
                        row.pos <= 3
                          ? "bg-amber-400/20 text-amber-300 font-black border border-amber-400/30"
                          : isEliminated
                          ? "bg-red-500/20 text-red-400 font-black"
                          : "text-neutral-400"
                      }`}
                    >
                      {row.pos}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-left font-bold text-white">
                    <div className="flex items-center gap-2.5">
                      {isClassified && (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 shadow-sm shadow-emerald-400/50" />
                      )}
                      {isEliminated && (
                        <span className="h-1.5 w-1.5 rounded-full bg-red-400 shrink-0 shadow-sm shadow-red-400/50" />
                      )}

                      {teamHref ? (
                        <Link
                          href={teamHref}
                          className="truncate uppercase tracking-wide hover:text-red-400 transition hover:underline group flex items-center gap-1.5"
                          title={`Ver plantilla de ${row.team}`}
                        >
                          <span>{row.team}</span>
                          <span className="text-[10px] text-neutral-500 font-normal group-hover:text-red-400 opacity-0 group-hover:opacity-100 transition">
                            (Ver plantilla)
                          </span>
                        </Link>
                      ) : (
                        <span className="truncate uppercase tracking-wide">{row.team}</span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-2 text-center text-neutral-300 font-semibold">{row.jj}</td>
                  <td className="py-3 px-2 text-center text-neutral-300">{row.jg}</td>
                  <td className="py-3 px-2 text-center text-neutral-400">{row.je}</td>
                  <td className="py-3 px-2 text-center text-neutral-400">{row.jp}</td>
                  <td className="py-3 px-2 text-center text-neutral-300">{row.ga}</td>
                  <td className="py-3 px-2 text-center text-neutral-400">{row.ge}</td>
                  <td className="py-3 px-2 text-center font-bold">
                    <span
                      className={
                        row.dif > 0
                          ? "text-emerald-400"
                          : row.dif < 0
                          ? "text-red-400"
                          : "text-neutral-400"
                      }
                    >
                      {row.dif > 0 ? `+${row.dif}` : row.dif}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-black text-red-400 text-base">
                    {row.pts}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 3. Leyenda Inferior adaptada a la estética deportiva oscura */}
      <div className="bg-neutral-900/80 px-5 py-3.5 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
            <span className="font-semibold text-neutral-300 uppercase tracking-wider text-[11px]">
              Clasificados (Puestos 1 al {qualificationCutoff})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
            <span className="font-semibold text-neutral-300 uppercase tracking-wider text-[11px]">
              Eliminados
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-center">
          <p className="font-bold text-amber-300 uppercase tracking-wide text-xs">
            {qualificationRule}
          </p>
        </div>
      </div>
    </div>
  );
}
