"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Filter } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, MODALITIES, modalityLabels, sampleMatches, type Category, type Modality } from "@/data/daeris";

export default function CalendarioPage() {
  const [category, setCategory] = useState<Category>("Sub-12");
  const [modality, setModality] = useState<Modality>("formacion");

  const matches = sampleMatches.filter((m) => m.category === category && m.modality === modality);

  const statusLabel = (status: string) => {
    if (status === "live") return "EN JUEGO";
    if (status === "finished") return "FINALIZADO";
    return "PROGRAMADO";
  };

  const statusClass = (status: string) => {
    if (status === "live") return "bg-red-500/10 text-red-400 border-red-500/40";
    if (status === "finished") return "bg-neutral-700/40 text-neutral-300 border-neutral-600/40";
    return "bg-blue-500/10 text-blue-400 border-blue-500/40";
  };

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
            <Link href="/calendario" className="text-red-400">Calendario</Link>
            <Link href="/posiciones" className="text-neutral-300 hover:text-white">Posiciones</Link>
            <Link href="/estadisticas" className="text-neutral-300 hover:text-white">Goleadores & Arquería</Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-red-400">
            <Calendar className="h-5 w-5" />
            <span className="text-sm">Torneo Daeris</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Calendario y Resultados</h1>
          <p className="mt-2 text-neutral-400">Filtra por categoría y modalidad</p>
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

        <div className="space-y-4">
          {matches.length === 0 && (
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-8 text-center text-neutral-400">
              No hay partidos registrados para este filtro.
            </div>
          )}
          {matches.map((match) => (
            <div key={match.id} className="rounded-2xl border border-neutral-800 bg-gradient-to-r from-neutral-900/80 to-neutral-950 p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-sm text-neutral-400">
                  <span>Jornada {match.matchday}</span>
                  <span>•</span>
                  <span>{match.matchDate}</span>
                  <span>•</span>
                  <span>{match.matchTime}</span>
                  <span>•</span>
                  <span>{match.venue}</span>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs ${statusClass(match.status)}`}>
                  {statusLabel(match.status)}
                </span>
              </div>
              <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
                <div className="text-right">
                  <p className="text-lg font-semibold">{match.homeTeam}</p>
                </div>
                <div className="text-center">
                  {match.status === "finished" ? (
                    <p className="text-2xl font-bold">
                      {match.homeScore} - {match.awayScore}
                    </p>
                  ) : match.status === "live" ? (
                    <p className="text-2xl font-bold text-red-400">
                      {match.homeScore ?? 0} - {match.awayScore ?? 0}
                    </p>
                  ) : (
                    <p className="text-xl text-neutral-500">vs</p>
                  )}
                </div>
                <div>
                  <p className="text-lg font-semibold">{match.awayTeam}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
