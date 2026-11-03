"use client";

import { useState } from "react";
import Link from "next/link";
import { Goal, Shield, Filter, ArrowLeft } from "lucide-react";
import { daerisSubList, DaerisSubId } from "@/data/daeris-subtournaments";
import { createGenericScorers, createGenericKeepers } from "@/data/generic-tournament-data";

export default function EstadisticasPage() {
  const [selectedTournament, setSelectedTournament] = useState<"daeris" | "prueba">("daeris");
  const [selectedDaerisSub, setSelectedDaerisSub] = useState<DaerisSubId>("infantil-1ra");

  const currentSub = daerisSubList.find((s) => s.id === selectedDaerisSub) || daerisSubList[0];
  const scorers = selectedTournament === "daeris" ? currentSub.topScorers : createGenericScorers("Equipo");
  const keepers = selectedTournament === "daeris" ? currentSub.leastConceded : createGenericKeepers("Equipo");

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al Inicio
          </Link>
          <div className="flex items-center gap-2 text-red-400">
            <Goal className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold">
              Estadísticas Individuales Oficiales
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl text-white">
            Goleador del Torneo & Valla Menos Vencida
          </h1>
          <p className="mt-1 text-sm text-neutral-400">
            Máximos artilleros y porterías menos vencidas por cada división y torneo
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
          <div className="flex items-center gap-2 text-neutral-400">
            <Filter className="h-4 w-4 text-red-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Torneo:
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTournament("daeris")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                selectedTournament === "daeris"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "bg-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              Torneo Daeris (6 Divisiones)
            </button>
            <button
              onClick={() => setSelectedTournament("prueba")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                selectedTournament === "prueba"
                  ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                  : "bg-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              Torneo de Prueba
            </button>
          </div>

          {selectedTournament === "daeris" && (
            <div className="w-full pt-3 border-t border-neutral-800 flex flex-wrap items-center gap-2">
              <span className="text-xs text-neutral-500 font-medium mr-1">División:</span>
              {daerisSubList.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedDaerisSub(sub.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    selectedDaerisSub === sub.id
                      ? "bg-neutral-100 text-neutral-950 font-bold shadow-sm"
                      : "bg-neutral-800/80 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  {sub.shortName}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tablas de Goleadores y Vallas */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* 1. Goleador del Torneo */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                  <Goal className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Goleador del Torneo</h2>
                  <p className="text-xs text-neutral-400">
                    {selectedTournament === "daeris" ? currentSub.name : "Torneo de Prueba"}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-bold text-red-400">
                Líderes
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 text-xs">
                    <th className="py-2 text-left w-12">POS</th>
                    <th className="py-2 text-left">JUGADOR</th>
                    <th className="py-2 text-left">EQUIPO</th>
                    <th className="py-2 text-right">GOLES</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {scorers.map((scorer, idx) => (
                    <tr key={scorer.player} className="hover:bg-neutral-800/30 transition">
                      <td className="py-3 font-bold text-neutral-400">
                        <span
                          className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-black ${
                            idx === 0
                              ? "bg-amber-400 text-black"
                              : idx === 1
                              ? "bg-neutral-300 text-black"
                              : idx === 2
                              ? "bg-amber-700 text-white"
                              : "bg-neutral-800 text-neutral-400"
                          }`}
                        >
                          {idx + 1}
                        </span>
                      </td>
                      <td className="py-3 font-semibold text-white">{scorer.player}</td>
                      <td className="py-3 text-neutral-400">{scorer.team}</td>
                      <td className="py-3 text-right font-black text-red-400 text-base">
                        {scorer.goals}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Valla Menos Vencida */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Valla Menos Vencida</h2>
                  <p className="text-xs text-neutral-400">
                    {selectedTournament === "daeris" ? currentSub.name : "Torneo de Prueba"}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                Porteros
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 text-xs">
                    <th className="py-2 text-left w-12">POS</th>
                    <th className="py-2 text-left">PORTERO</th>
                    <th className="py-2 text-left">EQUIPO</th>
                    <th className="py-2 text-center">PJ</th>
                    <th className="py-2 text-center">GC</th>
                    <th className="py-2 text-right">INVICTAS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {keepers.map((keeper, idx) => (
                    <tr key={keeper.player} className="hover:bg-neutral-800/30 transition">
                      <td className="py-3 font-bold text-neutral-400">
                        <span
                          className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-black ${
                            idx === 0
                              ? "bg-emerald-400 text-black"
                              : "bg-neutral-800 text-neutral-400"
                          }`}
                        >
                          {idx + 1}
                        </span>
                      </td>
                      <td className="py-3 font-semibold text-white">{keeper.player}</td>
                      <td className="py-3 text-neutral-400">{keeper.team}</td>
                      <td className="py-3 text-center text-neutral-300">{keeper.matchesPlayed}</td>
                      <td className="py-3 text-center text-red-400 font-bold">{keeper.goalsConceded}</td>
                      <td className="py-3 text-right font-black text-emerald-400 text-base">
                        {keeper.cleanSheets}
                      </td>
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
