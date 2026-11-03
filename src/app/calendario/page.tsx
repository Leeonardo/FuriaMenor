"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Filter, MapPin, UserCheck, ArrowLeft, FileText, Eye, ShieldCheck } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { CATEGORIES, MODALITIES, modalityLabels, type Category, type Modality } from "@/data/daeris";
import { torneoDaerisMatches, type MatchStatus, type Match } from "@/data/daeris/calendario";
import { getStoredMatches, DBMatch } from "@/lib/db-store";
import { ScoresheetModal } from "@/components/transparency/scoresheet-modal";

interface ExtendedMatch extends Omit<Match, "category"> {
  category: string;
  scoresheetUrl?: string | null;
  sheetPhotoUrl?: string | null;
  refereeNotes?: string;
  refereeName?: string;
}

export default function CalendarioPage() {
  const [category, setCategory] = useState<string>("all");
  const [modality, setModality] = useState<Modality | "all">("all");
  const [storedDbMatches, setStoredDbMatches] = useState<DBMatch[]>([]);
  const [selectedScoresheetMatch, setSelectedScoresheetMatch] = useState<any>(null);

  useEffect(() => {
    setStoredDbMatches(getStoredMatches());
  }, []);

  // Combinar partidos estáticos con los partidos dinámicos del sistema de arbitraje y base de datos
  const combinedMatches: ExtendedMatch[] = useMemo(() => {
    const dynamicConverted: ExtendedMatch[] = storedDbMatches.map((m) => {
      const isFinished = m.status === "finalizado";
      const isLive = m.status === "en_vivo";
      const status: MatchStatus = isFinished ? "finished" : isLive ? "live" : "scheduled";

      return {
        id: m.id,
        category: (m.categoryName as Category) || "Sub-12",
        modality: "primera",
        division: m.tournamentName,
        homeTeam: m.homeClubName,
        awayTeam: m.awayClubName,
        homeScore: m.homeScore,
        awayScore: m.awayScore,
        matchDate: m.matchDate,
        matchTime: m.matchTime,
        venue: m.venue,
        status,
        matchday: 4,
        jornada: m.jornada,
        referees: {
          principal: m.refereeName || "Prof. José Colina",
          asistente: "Árbitro Asistente",
          mesa: "Mesa Técnica",
        },
        refereeName: m.refereeName,
        scoresheetUrl: m.scoresheetUrl || m.sheetPhotoUrl || "/images/planilla-ejemplo.jpg",
        sheetPhotoUrl: m.sheetPhotoUrl || m.scoresheetUrl || "/images/planilla-ejemplo.jpg",
        refereeNotes: m.refereeNotes,
      };
    });

    // Colocar primero los partidos finalizados y en vivo
    return [...dynamicConverted, ...torneoDaerisMatches];
  }, [storedDbMatches]);

  const matches = combinedMatches.filter((m) => {
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
        <div className="mb-8 flex flex-col items-center sm:items-start text-center sm:text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition mb-3 self-center sm:self-auto"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al Inicio
          </Link>
          <div className="flex items-center gap-2 text-red-400 justify-center sm:justify-start">
            <Calendar className="h-5 w-5" />
            <span className="text-sm font-bold uppercase tracking-wider">Fixture & Programación Oficial</span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl text-white">Calendario y Resultados</h1>
          <p className="mt-1 text-sm text-neutral-400 max-w-2xl">
            Filtra por categoría y consulta los horarios, sedes y el cuerpo arbitral asignado a cada partido
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-8 flex flex-wrap items-center justify-center sm:justify-start gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
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
                    <div className="flex flex-col items-center gap-1.5">
                      <p className="text-xl font-black text-red-400 sm:text-2xl">
                        {match.homeScore} - {match.awayScore}
                      </p>
                      <button
                        type="button"
                        onClick={() => setSelectedScoresheetMatch(match)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/80 hover:bg-emerald-900 px-3.5 py-1 text-[11px] font-bold text-emerald-300 shadow-md shadow-emerald-950/50 transition active:scale-95"
                        title="Ver fotografía de la planilla física firmada por el árbitro"
                      >
                        <FileText className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Ver Planilla Original</span>
                      </button>
                    </div>
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

      {/* MODAL DE TRANSPARENCIA: VISUALIZACIÓN DE PLANILLA ORIGINAL FIRMADA */}
      <ScoresheetModal
        isOpen={!!selectedScoresheetMatch}
        onClose={() => setSelectedScoresheetMatch(null)}
        match={selectedScoresheetMatch}
      />
    </div>
  );
}
