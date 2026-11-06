"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Goal,
  Shield,
  Filter,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Award,
  AlertTriangle,
  DollarSign,
  Search,
  AlertCircle,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { daerisSubList, DaerisSubId } from "@/data/daeris-subtournaments";
import {
  createGenericScorers,
  createGenericKeepers,
  MINOR_CATEGORIES,
  MinorCategory,
} from "@/data/generic-tournament-data";
import { StatsSocialExportModal, StatItem } from "@/components/tournaments/stats-social-export-modal";
import { CrackDeLaJornadaShowcase } from "@/components/players/player-spotlight-card";
import { getAcademyBySlug } from "@/data/academies-data";
import { AcademyBadge } from "@/components/academies/academy-badge";
import { OFFICIAL_MINOR_1RA_SCORERS } from "@/data/official-scorers-data";
import {
  OFFICIAL_DISCIPLINARY_DATA,
  OfficialDisciplinaryItem,
} from "@/data/official-disciplinary-data";

function StatTeamShield({ teamName, size = 18 }: { teamName: string; size?: number }) {
  const academy = getAcademyBySlug(teamName);

  if (academy) {
    return (
      <div style={{ width: size, height: size }} className="shrink-0 flex items-center justify-center">
        <AcademyBadge slug={academy.slug} size={size} logoUrl={academy.logoUrl} />
      </div>
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
      className="shrink-0 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center text-[7px] font-black text-white"
    >
      {initials || "FM"}
    </div>
  );
}

export default function EstadisticasPage() {
  const [selectedTournament, setSelectedTournament] = useState<"daeris" | "prueba">("daeris");
  const [selectedDaerisSub, setSelectedDaerisSub] = useState<DaerisSubId>("infantil-1ra");
  const [selectedCategory, setSelectedCategory] = useState<MinorCategory>("Sub-12");

  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [exportStatType, setExportStatType] = useState<"goles" | "porteros">("goles");

  // Estado para la sección de amonestados y sanciones oficiales
  const [discCategory, setDiscCategory] = useState<string>("all");
  const [discSearch, setDiscSearch] = useState<string>("");

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

  // Filtrado reactivo de la tabla de sanciones
  const filteredDisciplinary = useMemo(() => {
    return OFFICIAL_DISCIPLINARY_DATA.filter((item) => {
      const matchCat = discCategory === "all" || item.category === discCategory;
      const q = discSearch.toLowerCase().trim();
      const matchQ =
        !q ||
        item.player.toLowerCase().includes(q) ||
        item.team.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [discCategory, discSearch]);

  const discStats = useMemo(() => {
    const totalCount = filteredDisciplinary.length;
    const suspendedCount = filteredDisciplinary.filter((d) => d.isSuspended).length;
    const totalDollars = filteredDisciplinary.reduce((acc, curr) => {
      const val = parseInt(curr.amount.replace(/[^0-9]/g, ""), 10) || 0;
      return acc + val;
    }, 0);
    return { totalCount, suspendedCount, totalDollars };
  }, [filteredDisciplinary]);

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
        <div className="mb-6 flex flex-col items-center sm:items-start text-center sm:text-left">
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

        {/* 🌟 EL CRACK DE LA JORNADA (Gamificación y Cromos Digitales Coleccionables) */}
        <CrackDeLaJornadaShowcase />

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
                {MINOR_CATEGORIES.map((cat) => {
                  const isOfficial = selectedDaerisSub === "infantil-1ra" && !!OFFICIAL_MINOR_1RA_SCORERS[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition inline-flex items-center gap-1.5 ${
                        selectedCategory === cat
                          ? "bg-red-600 text-white shadow-md shadow-red-600/30 ring-1 ring-red-400"
                          : "bg-neutral-800/90 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                      }`}
                    >
                      <span>{cat}</span>
                      {isOfficial && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 font-black">
                          OFICIAL
                        </span>
                      )}
                    </button>
                  );
                })}
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
                    <motion.tr
                      key={scorer.player}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15, delay: idx * 0.02 }}
                      className="hover:bg-neutral-800/30 transition"
                    >
                      <td className="py-3 font-bold text-neutral-400">
                        <span
                          className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-black ${
                            idx === 0
                              ? "bg-amber-400 text-black shadow-md shadow-amber-400/30"
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
                      <td className="py-3 text-neutral-300">
                        <div className="flex items-center gap-1.5">
                          <StatTeamShield teamName={scorer.team} size={18} />
                          <span className="truncate">{scorer.team}</span>
                        </div>
                      </td>
                      <td className="py-3 text-right font-black text-red-400 text-base">
                        {scorer.goals}
                      </td>
                    </motion.tr>
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
                    <motion.tr
                      key={keeper.player}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15, delay: idx * 0.02 }}
                      className="hover:bg-neutral-800/30 transition"
                    >
                      <td className="py-3 font-bold text-neutral-400">
                        <span
                          className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-black ${
                            idx === 0
                              ? "bg-emerald-400 text-black shadow-md shadow-emerald-400/30"
                              : "bg-neutral-800 text-neutral-400"
                          }`}
                        >
                          {idx + 1}
                        </span>
                      </td>
                      <td className="py-3 font-semibold text-white">{keeper.player}</td>
                      <td className="py-3 text-neutral-300">
                        <div className="flex items-center gap-1.5">
                          <StatTeamShield teamName={keeper.team} size={18} />
                          <span className="truncate">{keeper.team}</span>
                        </div>
                      </td>
                      <td className="py-3 text-center text-neutral-300">{keeper.matchesPlayed}</td>
                      <td className="py-3 text-center text-red-400 font-bold">{keeper.goalsConceded}</td>
                      <td className="py-3 text-right font-black text-emerald-400 text-base">
                        {keeper.cleanSheets}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 3. REPORTE OFICIAL DE AMONESTADOS, SANCIONES & FAIR PLAY */}
        <div className="mt-10 rounded-3xl border border-neutral-800 bg-neutral-900/70 p-4 sm:p-6 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-neutral-800 pb-5 mb-6">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-inner">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Reporte Oficial de Amonestados & Sanciones
                  </h2>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Oficial Daeris 2026
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                  Registro oficial de tarjetas amarillas, rojas, multas arancelarias en divisas ($) y suspensiones disciplinarias de 1ra División.
                </p>
              </div>
            </div>

            {/* Métricas rápidas */}
            <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
                <FileText className="h-3.5 w-3.5 text-neutral-400" />
                <span className="text-neutral-400">Total Casos:</span>
                <strong className="text-white font-mono">{discStats.totalCount}</strong>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
                <DollarSign className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-neutral-400">Arancel Total:</span>
                <strong className="text-amber-400 font-mono">${discStats.totalDollars}</strong>
              </div>
              {discStats.suspendedCount > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-300 font-bold animate-pulse">
                  <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                  <span>{discStats.suspendedCount} Suspendidos</span>
                </div>
              )}
            </div>
          </div>

          {/* Filtros de Categoría y Buscador */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-6 bg-neutral-950/70 p-3 sm:p-4 rounded-2xl border border-neutral-800/80">
            {/* Selector de Categorías de Sanción */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-neutral-400 font-semibold mr-1">Categoría:</span>
              {["all", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18", "Sub-20"].map((cat) => {
                const isSelected = discCategory === cat;
                const count =
                  cat === "all"
                    ? OFFICIAL_DISCIPLINARY_DATA.length
                    : OFFICIAL_DISCIPLINARY_DATA.filter((d) => d.category === cat).length;
                return (
                  <button
                    key={`disc-cat-${cat}`}
                    onClick={() => setDiscCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/30"
                        : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                    }`}
                  >
                    <span>{cat === "all" ? "Todas" : cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                        isSelected ? "bg-black/20 text-neutral-950" : "bg-neutral-800 text-neutral-300"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Buscador reactivo */}
            <div className="relative w-full lg:w-72">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
                <Search className="h-3.5 w-3.5" />
              </div>
              <input
                type="text"
                value={discSearch}
                onChange={(e) => setDiscSearch(e.target.value)}
                placeholder="Buscar jugador, DT o equipo..."
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 py-2 pl-9 pr-3 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
              />
            </div>
          </div>

          {/* Tabla de Amonestados */}
          <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-950/60">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/80 text-neutral-400 font-bold uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-3 sm:px-4">#</th>
                  <th className="py-3 px-3 sm:px-4">Atleta / Funcionario</th>
                  <th className="py-3 px-3 sm:px-4">Categoría</th>
                  <th className="py-3 px-3 sm:px-4">Equipo / Club</th>
                  <th className="py-3 px-3 sm:px-4 text-center">Rol</th>
                  <th className="py-3 px-3 sm:px-4 text-center">Arancel</th>
                  <th className="py-3 px-3 sm:px-4 text-right">Estatus Disciplinario</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {filteredDisciplinary.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-xs text-neutral-500">
                      No se encontraron registros de sanciones bajo los filtros seleccionados.
                    </td>
                  </tr>
                ) : (
                  filteredDisciplinary.map((item, idx) => {
                    const isSusp = item.isSuspended;
                    return (
                      <tr
                        key={item.id}
                        className={`transition hover:bg-neutral-800/40 ${
                          isSusp ? "bg-red-950/20" : ""
                        }`}
                      >
                        <td className="py-3 px-3 sm:px-4 font-mono text-neutral-500 font-semibold">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-3 sm:px-4 font-bold text-white">
                          <div className="flex items-center gap-2">
                            <span>{item.player}</span>
                            {isSusp && (
                              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-3 sm:px-4">
                          <span className="px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300 font-bold text-[10px] border border-neutral-700">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3 px-3 sm:px-4">
                          <div className="flex items-center gap-2 text-neutral-200 font-medium">
                            <StatTeamShield teamName={item.team} size={20} />
                            <span className="truncate max-w-[180px]">{item.team}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 sm:px-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              item.role === "Jugador"
                                ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                                : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            }`}
                          >
                            {item.role}
                          </span>
                        </td>
                        <td className="py-3 px-3 sm:px-4 text-center">
                          <span className="font-mono font-black text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-lg text-xs">
                            {item.amount}
                          </span>
                        </td>
                        <td className="py-3 px-3 sm:px-4 text-right">
                          {isSusp ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/30 text-red-300 border border-red-500/60 font-black text-[11px] shadow-sm shadow-red-900/50">
                              <AlertTriangle className="h-3.5 w-3.5 text-red-400 shrink-0" />
                              <span>{item.suspensionNotice || "SUSPENDIDO"}</span>
                            </span>
                          ) : (
                            <span className="text-[11px] text-neutral-400 font-semibold bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                              Multa por Amonestación
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
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
