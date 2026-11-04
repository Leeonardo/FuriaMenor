"use client";

import { useState } from "react";
import Link from "next/link";
import { Goal, Shield, Filter, ArrowLeft, ShieldCheck, Sparkles, Award } from "lucide-react";
import { daerisSubList, DaerisSubId } from "@/data/daeris-subtournaments";
import {
  createGenericScorers,
  createGenericKeepers,
  MINOR_CATEGORIES,
  MinorCategory,
} from "@/data/generic-tournament-data";
import { StatsSocialExportModal, StatItem } from "@/components/tournaments/stats-social-export-modal";

export default function EstadisticasPage() {
  const [selectedTournament, setSelectedTournament] = useState<"daeris" | "prueba">("daeris");
  const [selectedDaerisSub, setSelectedDaerisSub] = useState<DaerisSubId>("infantil-1ra");
  const [selectedCategory, setSelectedCategory] = useState<MinorCategory>("Sub-12");

  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [exportStatType, setExportStatType] = useState<"goles" | "porteros">("goles");

  const currentSub = daerisSubList.find((s) => s.id === selectedDaerisSub) || daerisSubList[0];

  let scorers = currentSub.topScorers;
  let keepers = currentSub.leastConceded;

  if (selectedTournament === "prueba") {
    scorers = createGenericScorers("Equipo");
    keepers = createGenericKeepers("Equipo");
  } else if (currentSub.hasCategories && currentSub.categoryData) {
    scorers = currentSub.categoryData[selectedCategory]?.topScorers || currentSub.topScorers;
    keepers = currentSub.categoryData[selectedCategory]?.leastConceded || currentSub.leastConceded;
  }

  const openExportModal = (type: "goles" | "porteros") => {
    setExportStatType(type);
    setIsExportModalOpen(true);
  };

  const statItems: StatItem[] =
    exportStatType === "goles"
      ? scorers.map((s, idx) => ({
          pos: idx + 1,
          player: s.player,
          team: s.team,
          category: selectedCategory,
          value: s.goals,
          statLabel: "Goles",
          statType: "goles" as const,
        }))
      : keepers.map((k, idx) => ({
          pos: idx + 1,
          player: k.player,
          team: k.team,
          category: selectedCategory,
          value: k.cleanSheets,
          matches: k.matchesPlayed,
          statLabel: "Vallas Invictas",
          statType: "porteros" as const,
        }));

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mb-8 flex flex-col items-center sm:items-start text-center sm:text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition mb-3 self-center sm:self-auto"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al Inicio
          </Link>
          <div className="flex items-center gap-2 text-red-400 justify-center sm:justify-start">
            <Goal className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold">
              Estadísticas Individuales Oficiales
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl text-white">
            Goleador del Torneo & Valla Menos Vencida
          </h1>
          <p className="mt-1 text-sm text-neutral-400 max-w-2xl">
            Máximos artilleros y porterías menos vencidas por cada división y categoría formativa
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-neutral-400">
              <Filter className="h-4 w-4 text-red-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                Torneo:
              </span>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
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
          </div>

          {selectedTournament === "daeris" && (
            <div className="w-full pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-xs text-neutral-500 font-medium mr-1 w-full sm:w-auto text-center sm:text-left">División:</span>
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

          {/* Selector de Categorías si la división seleccionada tiene categorías (Sub-8 a Sub-20) */}
          {selectedTournament === "daeris" && currentSub.hasCategories && (
            <div className="w-full pt-3 border-t border-neutral-800">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-red-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    Categoría Menor Segmentada:
                  </span>
                </div>
                <span className="text-[11px] font-bold text-red-400 sm:ml-auto">
                  {selectedCategory}
                </span>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {MINOR_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                      selectedCategory === cat
                        ? "bg-red-600 text-white shadow-md shadow-red-600/30 ring-1 ring-red-400"
                        : "bg-neutral-800/90 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Barra de Exportación a Redes Sociales */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-3.5 sm:px-5">
          <div className="flex items-center gap-2.5 text-xs text-neutral-300">
            <Award className="h-4 w-4 text-amber-400" />
            <span>
              Exporta los rankings oficiales con <strong>escudos y colores libres</strong> listos para Stories y Feed:
            </span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => openExportModal("goles")}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-bold text-xs shadow-md shadow-red-900/30 transition transform active:scale-95"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-200" />
              <span>Exportar Goleadores</span>
            </button>
            <button
              onClick={() => openExportModal("porteros")}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-900/30 transition transform active:scale-95"
            >
              <Sparkles className="h-3.5 w-3.5 text-emerald-200" />
              <span>Exportar Porteros</span>
            </button>
          </div>
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
                    {selectedTournament === "daeris" ? currentSub.name : "Torneo de Prueba"}{" "}
                    {currentSub.hasCategories && `(${selectedCategory})`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openExportModal("goles")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition"
                  title="Exportar cartelera de goleadores"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>Exportar</span>
                </button>
                <span className="rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-bold text-red-400">
                  Artilleros
                </span>
              </div>
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
                    {selectedTournament === "daeris" ? currentSub.name : "Torneo de Prueba"}{" "}
                    {currentSub.hasCategories && `(${selectedCategory})`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openExportModal("porteros")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition"
                  title="Exportar cartelera de porteros"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>Exportar</span>
                </button>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                  Porteros
                </span>
              </div>
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

        {/* Modal de Exportación para Redes Sociales con 3 Diseños, Escudos y Selector Libre de Color */}
        <StatsSocialExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          items={statItems}
          tournamentName={selectedTournament === "daeris" ? "Torneo Daeris" : "Torneo de Prueba"}
          categoryName={
            selectedTournament === "daeris" && currentSub.hasCategories
              ? selectedCategory
              : currentSub.name
          }
          defaultStatType={exportStatType}
        />
      </main>
    </div>
  );
}
