"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Filter, MapPin } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, MODALITIES, modalityLabels, type Category, type Modality } from "@/data/daeris";
import { torneoDaerisMatches, type MatchStatus } from "@/data/daeris/calendario";

export default function CalendarioPage() {
  const [category, setCategory] = useState<Category | "all">("all");
  const [modality, setModality] = useState<Modality | "all">("all");

  const matches = torneoDaerisMatches.filter((m) => {
    const matchCategory = category === "all" || m.category === category;
    const matchModality = modality === "all" || m.modality === modality;
    return matchCategory && matchModality;
  });

  const statusLabel = (status: MatchStatus) => {
    if (status === "live") return "EN VIVO";
    if (status === "finished") return "FINALIZADO";
    return "PROGRAMADO";
  };

  const statusClass = (status: MatchStatus) => {
    if (status === "live") return "bg-red-500/10 text-red-400 border-red-500/40 animate-pulse";
    if (status === "finished") return "bg-neutral-700/40 text-neutral-300 border-neutral-600/40";
    return "bg-blue-500/10 text-blue-400 border-blue-500/40";
  };

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
          <select value={category} onChange={(e) => setCategory(e.target.value as Category | "all")} className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm">
            <option value="all">Todas las categorías</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select value={modality} onChange={(e) => setModality(e.target.value as Modality | "all")} className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm">
            <option value="all">Todas las modalidades</option>
            {MODALITIES.map((m) => (
              <option key={m} value={m}>{modalityLabels[m]}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {matches.length === 0 && (
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 text-center text-neutral-400 sm:p-8">
              <p className="text-sm sm:text-base">
                No hay partidos registrados/finalizados para esta modalidad en la jornada seleccionada.
              </p>
            </div>
          )}
          {matches.map((match) => (
            <div key={match.id} className="rounded-2xl border border-neutral-800 bg-gradient-to-r from-neutral-900/80 to-neutral-950 p-4 sm:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 sm:gap-3 sm:text-sm">
                  <span>Jornada {match.matchday}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{match.matchDate}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{match.matchTime}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="max-w-[200px] truncate sm:max-w-none">{match.venue}</span>
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span>
                    {match.category} {match.division ? `• ${match.division}` : `• ${modalityLabels[match.modality]}`}
                  </span>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs ${statusClass(match.status)}`}>
                  {statusLabel(match.status)}
                </span>
              </div>
              <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-4">
                <div className="text-right">
                  <p className="text-base font-semibold sm:text-lg">{match.homeTeam}</p>
                </div>
                <div className="text-center">
                  {match.status === "finished" ? (
                    <p className="text-xl font-bold sm:text-2xl">
                      {match.homeScore} - {match.awayScore}
                    </p>
                  ) : match.status === "live" ? (
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-xl font-bold text-red-400 sm:text-2xl">
                        {match.homeScore ?? 0} - {match.awayScore ?? 0}
                      </p>
                      <span className="text-[10px] uppercase tracking-widest text-red-400">En Vivo</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-lg text-neutral-500 sm:text-xl">vs</p>
                      <span className="text-[10px] uppercase tracking-widest text-neutral-500">Programado</span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-base font-semibold sm:text-lg">{match.awayTeam}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
