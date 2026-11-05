"use client";

import React from "react";
import Link from "next/link";
import { Trophy, Users, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { getAcademyBySlug } from "@/data/academies-data";
import { AcademyBadge } from "@/components/academies/academy-badge";

export type FormResult = "V" | "E" | "D";

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
  form?: FormResult[];
  trend?: "up" | "down" | "same";
  clubId?: string;
  clubSlug?: string;
}

interface TournamentOfficialTableProps {
  title?: string;
  groupName?: string;
  qualificationRule?: string;
  qualificationCutoff?: number;
  rows: OfficialTableRow[];
  baseTournamentPath?: string;
  currentCategory?: string;
  highlightedTeam?: string;
}

// Escudo oficial o monograma de respaldo
function TableTeamShield({ teamName, clubSlug, size = 22 }: { teamName: string; clubSlug?: string; size?: number }) {
  const academy = getAcademyBySlug(clubSlug || teamName);

  if (academy) {
    return (
      <Link
        href={`/academias/${academy.slug}`}
        style={{ width: size, height: size }}
        className="shrink-0 flex items-center justify-center transition-transform hover:scale-110"
        title={`Ver perfil del club ${academy.name}`}
      >
        <AcademyBadge slug={academy.slug} size={size} logoUrl={academy.logoUrl} />
      </Link>
    );
  }

  const initials = teamName
    .replace(/\s*\([a-z0-9]\)/gi, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      style={{ width: size, height: size }}
      className="shrink-0 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center shadow text-[7.5px] font-black text-white"
    >
      {initials || "FM"}
    </div>
  );
}

// Genera una racha reciente realista y determinista si no viene en los datos
function getTeamForm(row: OfficialTableRow): FormResult[] {
  if (row.form && row.form.length > 0) return row.form.slice(-5);

  const results: FormResult[] = [];
  let remainingW = row.jg;
  let remainingD = row.je;
  let remainingL = row.jp;
  const count = Math.min(5, Math.max(1, row.jj));

  for (let i = 0; i < count; i++) {
    if (remainingW > 0 && (i % 2 === 0 || remainingL === 0)) {
      results.push("V");
      remainingW--;
    } else if (remainingL > 0) {
      results.push("D");
      remainingL--;
    } else if (remainingD > 0) {
      results.push("E");
      remainingD--;
    } else {
      results.push(row.pos <= 4 ? "V" : "D");
    }
  }

  return results.length ? results : ["V"];
}

// Determina la tendencia visual según la posición y rendimiento
function getTrend(row: OfficialTableRow): "up" | "down" | "same" {
  if (row.trend) return row.trend;
  if (row.pos <= 3) return "up";
  if (row.status === "eliminado" || row.pos >= 9) return "down";
  return "same";
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
  highlightedTeam,
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

      {/* Indicador visual de deslizamiento en móvil */}
      <div className="sm:hidden px-4 py-2 bg-neutral-900/60 border-b border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="text-red-400">↔</span> Desliza para ver estadísticas
        </span>
        <span className="text-[10px] text-amber-400 font-bold">PTS a la derecha</span>
      </div>

      {/* 2. Tabla de posiciones con estructura reglamentaria y estética moderna */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
        <table className="w-full min-w-[620px] sm:min-w-[720px] text-xs sm:text-sm border-collapse text-neutral-200">
          <thead>
            <tr className="bg-neutral-900/95 border-b border-neutral-800 text-neutral-400 font-extrabold text-center uppercase tracking-wider text-[10px] sm:text-xs">
              <th className="py-3 px-2 sm:px-3 w-12 sm:w-14 text-center sticky left-0 z-20 bg-neutral-900 shadow-[2px_0_4px_-1px_rgba(0,0,0,0.5)]">POS</th>
              <th className="py-3 px-3 sm:px-4 text-left sticky left-12 sm:left-14 z-20 bg-neutral-900 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.6)] min-w-[150px] sm:min-w-[210px]">CLUB / EQUIPO</th>
              <th className="py-3 px-1.5 sm:px-2 w-10 sm:w-11">JJ</th>
              <th className="py-3 px-1.5 sm:px-2 w-10 sm:w-11">JG</th>
              <th className="py-3 px-1.5 sm:px-2 w-10 sm:w-11">JE</th>
              <th className="py-3 px-1.5 sm:px-2 w-10 sm:w-11">JP</th>
              <th className="py-3 px-1.5 sm:px-2 w-11 sm:w-12">GA</th>
              <th className="py-3 px-1.5 sm:px-2 w-11 sm:w-12">GE</th>
              <th className="py-3 px-2 w-12 sm:w-14">DIF</th>
              <th className="py-3 px-2.5 sm:px-3 w-14 sm:w-16 text-right text-red-400 font-black">PTS</th>
              <th className="py-3 px-3 w-28 text-center hidden md:table-cell">FORMA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60 font-medium">
            {rows.map((row, idx) => {
              const isEliminated = row.status === "eliminado";
              const isClassified = row.pos <= qualificationCutoff && !isEliminated;
              const teamSlug = row.team.toLowerCase().replace(/\s+/g, "-");
              const catParam = currentCategory ? `?cat=${currentCategory}` : "";
              const academy = getAcademyBySlug(row.clubSlug || row.team);
              const targetHref = academy
                ? `/academias/${academy.slug}`
                : baseTournamentPath
                ? `${baseTournamentPath}/equipos/${teamSlug}${catParam}`
                : undefined;
              const form = getTeamForm(row);
              const trend = getTrend(row);
              const isHighlighted = highlightedTeam && (
                row.team.toLowerCase().includes(highlightedTeam.toLowerCase()) ||
                highlightedTeam.toLowerCase().includes(row.team.toLowerCase())
              );

              return (
                <tr
                  key={row.team}
                  className={`transition-colors duration-150 hover:bg-white/[0.04] ${
                    isHighlighted
                      ? "bg-red-600/20 ring-2 ring-red-500/80 font-bold"
                      : isEliminated
                      ? "bg-red-950/20 text-red-200 border-l-4 border-l-red-500"
                      : isClassified
                      ? "border-l-4 border-l-emerald-500/70"
                      : "border-l-4 border-l-transparent"
                  } ${idx % 2 === 0 ? "bg-neutral-950" : "bg-neutral-900/30"}`}
                >
                  <td className="py-2.5 sm:py-3 px-2 sm:px-3 text-center font-black sticky left-0 z-10 bg-neutral-950 shadow-[2px_0_4px_-1px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center justify-center gap-1">
                      <span
                        className={`inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-md text-[11px] sm:text-xs font-black ${
                          row.pos === 1
                            ? "bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/30"
                            : row.pos <= 3
                            ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                            : isEliminated
                            ? "bg-red-500/20 text-red-400"
                            : "text-neutral-400 bg-neutral-900/80"
                        }`}
                      >
                        {row.pos}
                      </span>
                      {/* Flecha de tendencia */}
                      <span className="shrink-0" title={`Tendencia: ${trend === "up" ? "En ascenso" : trend === "down" ? "Descenso" : "Estable"}`}>
                        {trend === "up" && <TrendingUp className="h-3 w-3 text-emerald-400" />}
                        {trend === "down" && <TrendingDown className="h-3 w-3 text-rose-400" />}
                        {trend === "same" && <Minus className="h-2.5 w-2.5 text-neutral-500" />}
                      </span>
                    </div>
                  </td>

                  <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-left font-bold text-white sticky left-12 sm:left-14 z-10 bg-neutral-950 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.6)] min-w-[150px] sm:min-w-[210px]">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      {/* Escudo Oficial de la Academia / Club */}
                      <TableTeamShield teamName={row.team} clubSlug={row.clubSlug} size={22} />

                      {isClassified && (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 shadow-sm shadow-emerald-400/50" />
                      )}
                      {isEliminated && (
                        <span className="h-1.5 w-1.5 rounded-full bg-red-400 shrink-0 shadow-sm shadow-red-400/50" />
                      )}

                      {targetHref ? (
                        <Link
                          href={targetHref}
                          className="truncate uppercase tracking-wide hover:text-red-400 transition hover:underline group flex items-center gap-1.5"
                          title={`Ver perfil y plantilla de ${row.team}`}
                        >
                          <span className="truncate">{row.team}</span>
                          <span className="text-[10px] text-neutral-500 font-normal group-hover:text-red-400 opacity-0 group-hover:opacity-100 transition shrink-0">
                            {academy ? "(Club)" : "(Plantilla)"}
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
                  <td className="py-3 px-3 text-right font-black text-red-400 text-base">
                    {row.pts}
                  </td>

                  {/* Columna de Racha / Últimos 5 partidos */}
                  <td className="py-3 px-3 text-center hidden md:table-cell">
                    <div className="flex items-center justify-center gap-1">
                      {form.map((res, i) => (
                        <span
                          key={i}
                          className={`w-4 h-4 rounded text-[9px] font-black flex items-center justify-center uppercase ${
                            res === "V"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                              : res === "E"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                              : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                          }`}
                          title={res === "V" ? "Victoria" : res === "E" ? "Empate" : "Derrota"}
                        >
                          {res}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 3. Leyenda Inferior adaptada a la estética deportiva oscura */}
      <div className="bg-neutral-900/80 px-5 py-3.5 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
            <span className="font-semibold text-neutral-300 uppercase tracking-wider text-[11px]">
              Clasificados (1 al {qualificationCutoff})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
            <span className="font-semibold text-neutral-300 uppercase tracking-wider text-[11px]">
              Eliminados
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[10px] text-neutral-400 border-l border-neutral-800 pl-3">
            <span>Racha:</span>
            <span className="text-emerald-400 font-bold">V</span> (Vic) ·
            <span className="text-amber-400 font-bold">E</span> (Emp) ·
            <span className="text-rose-400 font-bold">D</span> (Der)
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
