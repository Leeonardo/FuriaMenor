"use client";

import Image from "next/image";
import Link from "next/link";
import { Filter, Trophy } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, MODALITIES, calculateStandings, getTeamsFor, modalityLabels, sampleMatches, type Category, type Modality } from "@/data/daeris";
import { standingsSub12Elite } from "@/data/daeris/posiciones";

export default function PosicionesPage() {
  const [category, setCategory] = useState<Category>("Sub-12");
  const [modality, setModality] = useState<Modality>("competencia");

  const teams = getTeamsFor(category, modality);
  const matches = sampleMatches.filter((m) => m.category === category && m.modality === modality);
  const standings = calculateStandings(matches, teams);
  const showElite = category === "Sub-12" && modality === "competencia";
  const eliteStandings = showElite ? standingsSub12Elite : [];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Furia Menor" width={40} height={40} className="object-contain" />
            <div>
              <p className="text-sm font-semibold">Furia Menor</p>
              <p className="text-xs text-neutral-400">Torneo Daeris</p>
            </div>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/calendario" className="text-neutral-300 hover:text-white">Calendario</Link>
            <Link href="/posiciones" className="text-red-400">Posiciones</Link>
            <Link href="/estadisticas" className="text-neutral-300 hover:text-white">Goleadores & Arquería</Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-red-400">
            <Trophy className="h-5 w-5" />
            <span className="text-sm">Torneo Daeris</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Tabla de Posiciones</h1>
          <p className="mt-2 text-neutral-400">Puntos, PJ, PG, PE, PP, GF, GC, DG</p>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
          <div className="flex items-center gap-2 text-neutral-400">
            <Filter className="h-4 w-4" />
            <span className="text-sm">Filtros</span>
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value as Category)} className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm">
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select value={modality} onChange={(e) => setModality(e.target.value as Modality)} className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm">
            {MODALITIES.map((m) => (
              <option key={m} value={m}>{modalityLabels[m]}</option>
            ))}
          </select>
        </div>

        {showElite && eliteStandings.length > 0 && (
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Sub-12 • Competencia • Elite - Grupo A</h2>
              <div className="flex items-center gap-4 text-xs text-neutral-400">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  Clasificados (Puestos 1 al 8)
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-400"></span>
                  Eliminados (Puesto 11)
                </span>
              </div>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/60">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400">
                    <th className="p-4 text-left">POS</th>
                    <th className="p-4 text-left">EQUIPOS</th>
                    <th className="p-4 text-center">JJ</th>
                    <th className="p-4 text-center">JG</th>
                    <th className="p-4 text-center">JE</th>
                    <th className="p-4 text-center">JP</th>
                    <th className="p-4 text-center">GA</th>
                    <th className="p-4 text-center">GE</th>
                    <th className="p-4 text-center">DIF</th>
                    <th className="p-4 text-center">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {eliteStandings.map((row) => (
                    <tr
                      key={row.team}
                      className={`border-b border-neutral-800/60 hover:bg-neutral-800/30 ${
                        row.status === "clasificado"
                          ? "bg-emerald-500/5"
                          : row.status === "eliminado"
                            ? "bg-red-500/5"
                            : ""
                      }`}
                    >
                      <td className="p-4">{row.pos}</td>
                      <td className="p-4 font-medium">{row.team}</td>
                      <td className="p-4 text-center">{row.jj}</td>
                      <td className="p-4 text-center">{row.jg}</td>
                      <td className="p-4 text-center">{row.je}</td>
                      <td className="p-4 text-center">{row.jp}</td>
                      <td className="p-4 text-center">{row.ga}</td>
                      <td className="p-4 text-center">{row.ge}</td>
                      <td className="p-4 text-center">{row.dif}</td>
                      <td className="p-4 text-center font-bold text-red-400">{row.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-neutral-500">* Nota: Clasifican los 8 primeros de cada grupo.</p>
          </div>
        )}

        {!showElite && (
          <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/60">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400">
                  <th className="p-4 text-left">#</th>
                  <th className="p-4 text-left">Equipo</th>
                  <th className="p-4 text-center">PJ</th>
                  <th className="p-4 text-center">PG</th>
                  <th className="p-4 text-center">PE</th>
                  <th className="p-4 text-center">PP</th>
                  <th className="p-4 text-center">GF</th>
                  <th className="p-4 text-center">GC</th>
                  <th className="p-4 text-center">DG</th>
                  <th className="p-4 text-center">PTS</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((row, idx) => (
                  <tr key={row.team} className="border-b border-neutral-800/60 hover:bg-neutral-800/30">
                    <td className="p-4">{idx + 1}</td>
                    <td className="p-4 font-medium">{row.team}</td>
                    <td className="p-4 text-center">{row.played}</td>
                    <td className="p-4 text-center">{row.won}</td>
                    <td className="p-4 text-center">{row.drawn}</td>
                    <td className="p-4 text-center">{row.lost}</td>
                    <td className="p-4 text-center">{row.gf}</td>
                    <td className="p-4 text-center">{row.gc}</td>
                    <td className="p-4 text-center">{row.gd}</td>
                    <td className="p-4 text-center font-bold text-red-400">{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
