"use client";

import Image from "next/image";
import Link from "next/link";
import { Filter, Goal, Shield } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, MODALITIES, leastConceded, modalityLabels, topScorers, type Category, type Modality } from "@/data/daeris";

export default function EstadisticasPage() {
  const [category, setCategory] = useState<Category>("Sub-12");
  const [modality, setModality] = useState<Modality>("competencia");

  const scorers = topScorers.filter((s) => s.category === category && s.modality === modality).sort((a, b) => b.goals - a.goals);
  const keepers = leastConceded.filter((k) => k.category === category && k.modality === modality).sort((a, b) => {
    if (a.goalsConceded !== b.goalsConceded) return a.goalsConceded - b.goalsConceded;
    if (b.cleanSheets !== a.cleanSheets) return b.cleanSheets - a.cleanSheets;
    return 0;
  });

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
            <Link href="/posiciones" className="text-neutral-300 hover:text-white">Posiciones</Link>
            <Link href="/estadisticas" className="text-red-400">Goleadores & Arquería</Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-red-400">
            <Goal className="h-5 w-5" />
            <span className="text-sm">Torneo Daeris</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Estadísticas Avanzadas</h1>
          <p className="mt-2 text-neutral-400">Goleadores y Arquería Menos Vencida</p>
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

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60">
            <div className="flex items-center gap-2 border-b border-neutral-800 p-4">
              <Goal className="h-5 w-5 text-amber-400" />
              <h2 className="font-semibold">Tabla de Goleadores</h2>
            </div>
            <div className="divide-y divide-neutral-800/60">
              {scorers.length === 0 && <p className="p-4 text-neutral-400">Sin datos</p>}
              {scorers.map((scorer, idx) => (
                <div key={scorer.player} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-500">{idx + 1}</span>
                    <div>
                      <p className="font-medium">{scorer.player}</p>
                      <p className="text-sm text-neutral-400">{scorer.team}</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-red-400">{scorer.goals}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60">
            <div className="flex items-center gap-2 border-b border-neutral-800 p-4">
              <Shield className="h-5 w-5 text-yellow-400" />
              <h2 className="font-semibold">Arquería Menos Vencida</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400">
                    <th className="p-4 text-left">#</th>
                    <th className="p-4 text-left">Portero / Arco</th>
                    <th className="p-4 text-left">Equipo</th>
                    <th className="p-4 text-center">PJ</th>
                    <th className="p-4 text-center">GC</th>
                    <th className="p-4 text-center">Vallas Invictas</th>
                  </tr>
                </thead>
                <tbody>
                  {keepers.map((keeper, idx) => (
                    <tr key={keeper.player} className="border-b border-neutral-800/60">
                      <td className="p-4">{idx + 1}</td>
                      <td className="p-4 font-medium">{keeper.player}</td>
                      <td className="p-4 text-neutral-400">{keeper.team}</td>
                      <td className="p-4 text-center">{keeper.matchesPlayed}</td>
                      <td className="p-4 text-center text-red-400">{keeper.goalsConceded}</td>
                      <td className="p-4 text-center text-yellow-400">{keeper.cleanSheets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
