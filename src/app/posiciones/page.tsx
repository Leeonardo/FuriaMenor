"use client";

import Image from "next/image";
import Link from "next/link";
import { Filter, Trophy } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, MODALITIES, calculateStandings, getTeamsFor, modalityLabels, sampleMatches, type Category, type Modality } from "@/data/daeris";

export default function PosicionesPage() {
  const [category, setCategory] = useState<Category>("Sub-12");
  const [modality, setModality] = useState<Modality>("formacion");

  const teams = getTeamsFor(category, modality);
  const matches = sampleMatches.filter((m) => m.category === category && m.modality === modality);
  const standings = calculateStandings(matches, teams);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.jpeg" alt="Furia Menor" width={40} height={40} className="rounded-lg" />
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
      </main>
    </div>
  );
}
