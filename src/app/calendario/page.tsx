"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Filter, MapPin, UserCheck, ArrowLeft } from "lucide-react";
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
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al Inicio
          </Link>
          <div className="flex items-center gap-2 text-red-400">
            <Calendar className="h-5 w-5" />
            <span className="text-sm font-bold uppercase tracking-wider">Fixture & Programación Oficial</span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl text-white">Calendario y Resultados</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Filtra por categoría y consulta los horarios, sedes y el cuerpo arbitral asignado a cada partido
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
          <div className="flex items-center gap-2 text-neutral-400">
            <Filter className="h-4 w-4 text-red-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">Filtros:</span>
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category | "all")}
            className="rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2 text-xs font-semibold text-neutral-200"
          >
            <option value="all">Todas las categorías</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={modality}
            onChange={(e) => setModality(e.target.value as Modality | "all")}
            className="rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2 text-xs font-semibold text-neutral-200"
          >
            <option value="all">Todas las divisiones</option>
            {MODALITIES.map((m) => (
              <option key={m} value={m}>{modalityLabels[m]}</option>
            ))}
          </select>
        </div>

        {/* Partidos */}
        <div className="space-y-4">
          {matches.length === 0 && (
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 text-center sm:p-10">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800/60">
                <Calendar className="h-8 w-8 text-neutral-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">Sin partidos</h3>
              <p className="text-sm text-neutral-400 sm:text-base">
                Aún no hay partidos programados para esta categoría/división en la jornada seleccionada.
              </p>
            </div>
          )}

          {matches.map((match) => (
            <div
              key={match.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4 sm:p-6 hover:border-neutral-700 transition shadow-lg"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 sm:gap-3 sm:text-sm">
                  <span className="font-bold text-red-400">Jornada {match.matchday}</span>
                  <span className="hidden sm:inline">·</span>
                  <span>{match.matchDate}</span>
                  <span className="hidden sm:inline">·</span>
                  <span>{match.matchTime}</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-red-400" />
                    <span className="max-w-[200px] truncate sm:max-w-none">{match.venue}</span>
                  </span>
                  <span className="hidden sm:inline">·</span>
                  <span className="rounded-md bg-neutral-800 px-2 py-0.5 text-xs text-neutral-300">
                    {match.category} · {match.division || modalityLabels[match.modality]}
                  </span>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusClass(match.status)}`}>
                  {statusLabel(match.status)}
                </span>
              </div>

              {/* Enfrentamiento */}
              <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-4 py-2 border-y border-neutral-800/60">
                <div className="text-right">
                  <p className="text-base font-bold sm:text-lg text-white">{match.homeTeam}</p>
                </div>
                <div className="text-center px-4">
                  {match.status === "finished" ? (
                    <p className="text-xl font-black text-red-400 sm:text-2xl">
                      {match.homeScore} - {match.awayScore}
                    </p>
                  ) : match.status === "live" ? (
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-xl font-black text-red-400 sm:text-2xl">
                        {match.homeScore ?? 0} - {match.awayScore ?? 0}
                      </p>
                      <span className="text-[10px] uppercase tracking-widest text-red-400">En Vivo</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-xs font-black text-neutral-500 bg-neutral-950 px-2.5 py-1 rounded-md border border-neutral-800">
                        VS
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-base font-bold sm:text-lg text-white">{match.awayTeam}</p>
                </div>
              </div>

              {/* CUERPO ARBITRAL OFICIAL */}
              {match.referees && (
                <div className="mt-3 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-400">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px] uppercase tracking-wider">
                    <UserCheck className="h-3.5 w-3.5" />
                    <span>Cuerpo Arbitral:</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span>
                      <strong className="text-neutral-500">1er Árbitro:</strong>{" "}
                      <span className="text-neutral-200 font-medium">{match.referees.principal}</span>
                    </span>
                    <span>
                      <strong className="text-neutral-500">2do Árbitro:</strong>{" "}
                      <span className="text-neutral-200 font-medium">{match.referees.asistente}</span>
                    </span>
                    {match.referees.mesa && (
                      <span className="hidden sm:inline">
                        <strong className="text-neutral-500">Mesa:</strong>{" "}
                        <span className="text-neutral-300">{match.referees.mesa}</span>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
