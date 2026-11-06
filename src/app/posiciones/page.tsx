"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Trophy,
  Filter,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Search,
  Users,
  ChevronDown,
  ChevronUp,
  X,
  Shield,
  Layers,
} from "lucide-react";
import { TournamentOfficialTable, OfficialTableRow } from "@/components/tournaments/tournament-official-table";
import { StandingsSocialExportModal } from "@/components/tournaments/standings-social-export-modal";
import { daerisSubList, DaerisSubId } from "@/data/daeris-subtournaments";
import {
  createGenericStandings,
  MINOR_CATEGORIES,
  MinorCategory,
  OFFICIAL_TEAMS_BY_CATEGORY,
  OFFICIAL_TEAMS_1RA_DIV,
  OFFICIAL_TEAMS_2DA_DIV,
} from "@/data/generic-tournament-data";
import {
  STANDINGS_INSTITUCIONAL_OFICIAL,
  STANDINGS_LIBRE_1RA_OFICIAL,
  STANDINGS_MASTER_50_OFICIAL,
  STANDINGS_LIBRE_2DA_GROUPS,
  OFFICIAL_MINOR_1RA_STANDINGS,
} from "@/data/official-standings-tables";
import {
  getStoredMatches,
  calculateStandingsForCategory,
  DB_CLUBS,
  DB_CATEGORIES,
  DBMatch,
} from "@/lib/db-store";
import { getAcademyBySlug } from "@/data/academies-data";
import { AcademyBadge } from "@/components/academies/academy-badge";

export default function PosicionesPage() {
  const [selectedTournament, setSelectedTournament] = useState<"daeris" | "prueba">("daeris");
  const [selectedDaerisSub, setSelectedDaerisSub] = useState<DaerisSubId>("institucional");
  const [selectedCategory, setSelectedCategory] = useState<MinorCategory>("Sub-12");
  const [selectedGroup, setSelectedGroup] = useState<string>("GRUPO A");
  const [storedMatches, setStoredMatches] = useState<DBMatch[]>([]);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [highlightedTeam, setHighlightedTeam] = useState<string>("");
  const [isTeamDirectoryOpen, setIsTeamDirectoryOpen] = useState<boolean>(false);

  useEffect(() => {
    setStoredMatches(getStoredMatches());
  }, []);

  const currentSub = daerisSubList.find((s) => s.id === selectedDaerisSub) || daerisSubList[0];

  // Construir directorio de todos los equipos del torneo para búsqueda rápida
  const allTournamentTeams = useMemo(() => {
    const list: {
      teamName: string;
      category: string;
      divisionId: DaerisSubId;
      divisionName: string;
      groupName?: string;
    }[] = [];

    // 1. Institucional Oficial
    STANDINGS_INSTITUCIONAL_OFICIAL.forEach((row) => {
      list.push({
        teamName: row.team,
        category: "Institucional",
        divisionId: "institucional",
        divisionName: "Institucional",
        groupName: "GRUPO U",
      });
    });

    // 2. Libre 1ra División Oficial
    STANDINGS_LIBRE_1RA_OFICIAL.forEach((row) => {
      list.push({
        teamName: row.team,
        category: "Libre 1ra Div",
        divisionId: "libre-parquecarabobo",
        divisionName: "Libre 1ra Div",
        groupName: "GRUPO U",
      });
    });

    // 3. Master 50 Oficial
    STANDINGS_MASTER_50_OFICIAL.forEach((row) => {
      list.push({
        teamName: row.team,
        category: "Master 50",
        divisionId: "master50",
        divisionName: "Master +50",
        groupName: "GRUPO U",
      });
    });

    // 4. Libre 2da División Oficial (Grupos A, B, C, D)
    Object.entries(STANDINGS_LIBRE_2DA_GROUPS).forEach(([groupName, rows]) => {
      rows.forEach((row) => {
        list.push({
          teamName: row.team,
          category: `Libre 2da (${groupName})`,
          divisionId: "libre-2da",
          divisionName: "Libre 2da Div",
          groupName,
        });
      });
    });

    // 5. Categorías Menores Formativas de 1ra División
    Object.entries(OFFICIAL_TEAMS_1RA_DIV).forEach(([cat, teams]) => {
      teams.forEach((t) => {
        list.push({
          teamName: t,
          category: cat,
          divisionId: "infantil-1ra",
          divisionName: "Infantil 1ra Div",
        });
      });
    });

    // 6. Categorías Menores Formativas de 2da División
    Object.entries(OFFICIAL_TEAMS_2DA_DIV).forEach(([cat, teams]) => {
      teams.forEach((t) => {
        list.push({
          teamName: t,
          category: cat,
          divisionId: "infantil-2da",
          divisionName: "Infantil 2da Div",
        });
      });
    });

    return list;
  }, []);

  // Resultados de búsqueda filtrados
  const searchResults = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term || term.length < 2) return [];

    return allTournamentTeams.filter(
      (item) =>
        item.teamName.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.divisionName.toLowerCase().includes(term)
    );
  }, [searchTerm, allTournamentTeams]);

  // Manejar selección desde la búsqueda
  const handleSelectTeamFromSearch = (item: (typeof allTournamentTeams)[0]) => {
    setSelectedTournament("daeris");
    setSelectedDaerisSub(item.divisionId);
    if (MINOR_CATEGORIES.includes(item.category as MinorCategory)) {
      setSelectedCategory(item.category as MinorCategory);
    }
    if (item.groupName) {
      setSelectedGroup(item.groupName);
    }
    setHighlightedTeam(item.teamName);
    setSearchTerm("");
  };

  const standingsRows: OfficialTableRow[] = useMemo(() => {
    if (selectedTournament === "prueba") {
      return createGenericStandings("Equipo");
    }

    // 1. Torneos con grupos múltiples (ej. Libre 2da División con Grupos A, B, C, D)
    if (currentSub.groups) {
      return currentSub.groups[selectedGroup] || currentSub.standings;
    }

    // 2. Torneos con categorías formativas (Sub-8 a Sub-20)
    if (currentSub.hasCategories && currentSub.categoryData) {
      // Comprobar si hay partidos finalizados en vivo
      const targetCatObj = DB_CATEGORIES.find((c) => c.name === selectedCategory);
      const catId = targetCatObj?.id || `cat-${selectedCategory.toLowerCase()}`;

      if (storedMatches.length > 0) {
        const liveStandings = calculateStandingsForCategory(catId, storedMatches, DB_CLUBS);
        const totalPlayed = liveStandings.reduce((sum, r) => sum + r.played, 0);

        if (totalPlayed > 0) {
          return liveStandings.map((row, idx) => ({
            pos: idx + 1,
            team: row.clubName,
            jj: row.played,
            jg: row.won,
            je: row.drawn,
            jp: row.lost,
            ga: row.goalsFor,
            ge: row.goalsAgainst,
            dif: row.goalDifference,
            pts: row.points,
            status: idx < (currentSub.qualificationCutoff || 8) ? "clasificado" : "normal",
          }));
        }
      }

      return currentSub.categoryData[selectedCategory]?.standings || currentSub.standings;
    }

    // 3. Tablas directas (Institucional, Master 50, Libre 1ra)
    return currentSub.standings;
  }, [selectedTournament, selectedCategory, selectedGroup, storedMatches, currentSub]);

  // Contadores de equipos por categoría según división activa
  const getCategoryTeamCount = (cat: MinorCategory) => {
    if (selectedDaerisSub === "infantil-1ra") {
      if (OFFICIAL_MINOR_1RA_STANDINGS[cat]) {
        return OFFICIAL_MINOR_1RA_STANDINGS[cat].standings.length;
      }
      return OFFICIAL_TEAMS_1RA_DIV[cat]?.length || OFFICIAL_TEAMS_BY_CATEGORY[cat]?.length || 0;
    }
    if (selectedDaerisSub === "infantil-2da") {
      return OFFICIAL_TEAMS_2DA_DIV[cat]?.length || OFFICIAL_TEAMS_BY_CATEGORY[cat]?.length || 0;
    }
    return OFFICIAL_TEAMS_BY_CATEGORY[cat]?.length || 0;
  };

  const activeCategoryPayload = currentSub.categoryData?.[selectedCategory];
  const activeRule =
    selectedTournament === "daeris"
      ? activeCategoryPayload?.qualificationRule || currentSub.qualificationRule
      : "CLASIFICAN LOS 8 PRIMEROS DE CADA GRUPO";
  const activeCutoff =
    selectedTournament === "daeris"
      ? activeCategoryPayload?.qualificationCutoff ?? currentSub.qualificationCutoff
      : 8;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <main className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
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
            <Trophy className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold">
              Tablas de Posiciones Oficiales
            </span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-4xl font-extrabold text-white">
            Planillas de Clasificación Oficiales
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-neutral-400 max-w-3xl">
            Tablas oficiales actualizadas con puntajes reales, goles y reglas clasificatorias de las categorías Institucional, Libre 1ra y 2da, Master 50 y categorías formativas.
          </p>
        </div>

        {/* 1. BUSCADOR RÁPIDO DE EQUIPOS / CLUBES */}
        <div className="mb-6 rounded-2xl border border-neutral-800 bg-neutral-900/80 p-3 sm:p-5 shadow-xl">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
                <Search className="h-4 w-4 text-red-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar equipo o academia (ej: BDV, PDVSA, HRD, La Paz Thimat, K9, Halcones, La Ladera...)"
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 py-2.5 pl-10 pr-9 text-xs sm:text-sm text-white placeholder-neutral-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsTeamDirectoryOpen(!isTeamDirectoryOpen)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700/80 text-neutral-200 hover:text-white text-xs font-bold transition shadow-sm"
            >
              <Users className="h-4 w-4 text-amber-400" />
              <span>Ver Equipos Oficiales</span>
              {isTeamDirectoryOpen ? (
                <ChevronUp className="h-3.5 w-3.5 text-neutral-400" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
              )}
            </button>
          </div>

          {/* Menú flotante de resultados de búsqueda */}
          {searchResults.length > 0 && (
            <div className="mt-3 divide-y divide-neutral-800 rounded-xl border border-neutral-700 bg-neutral-950 p-2 shadow-2xl max-h-60 overflow-y-auto">
              <div className="px-3 py-1.5 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                {searchResults.length} resultados encontrados — Haz clic para ver en su tabla:
              </div>
              {searchResults.map((item, idx) => {
                const academy = getAcademyBySlug(item.teamName);
                return (
                  <button
                    key={`${item.teamName}-${item.divisionId}-${item.category}-${idx}`}
                    onClick={() => handleSelectTeamFromSearch(item)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-neutral-800/80 rounded-lg transition group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {academy && (
                        <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                          <AcademyBadge slug={academy.slug} size={20} logoUrl={academy.logoUrl} />
                        </div>
                      )}
                      <span className="font-bold text-xs sm:text-sm text-white group-hover:text-red-400 truncate">
                        {item.teamName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-xs">
                      <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-semibold text-[10px]">
                        {item.divisionName}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 font-bold text-[10px]">
                        {item.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Directorio Completo de Equipos (Desplegable) */}
          {isTeamDirectoryOpen && (
            <div className="mt-4 pt-4 border-t border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="h-4 w-4" />
                  Listado de Equipos Oficiales por División
                </span>
                <span className="text-[11px] text-neutral-400">
                  Haz clic en cualquier equipo para abrir su tabla oficial
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 max-h-96 overflow-y-auto pr-1">
                {/* 1. Institucional */}
                <div className="rounded-xl border border-neutral-800/80 bg-neutral-950/70 p-3">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2">
                    <span className="font-black text-xs text-amber-400 uppercase tracking-wider">
                      Institucional
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-full">
                      {STANDINGS_INSTITUCIONAL_OFICIAL.length} Equipos
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {STANDINGS_INSTITUCIONAL_OFICIAL.map((r) => (
                      <button
                        key={`dir-inst-${r.team}`}
                        onClick={() => {
                          setSelectedTournament("daeris");
                          setSelectedDaerisSub("institucional");
                          setHighlightedTeam(r.team);
                          setIsTeamDirectoryOpen(false);
                        }}
                        className="px-2 py-1 rounded-md text-[11px] font-bold bg-neutral-900 border border-neutral-800 text-neutral-200 hover:border-amber-400 hover:text-white transition"
                      >
                        {r.team}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Libre 1ra */}
                <div className="rounded-xl border border-neutral-800/80 bg-neutral-950/70 p-3">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2">
                    <span className="font-black text-xs text-orange-400 uppercase tracking-wider">
                      Libre 1ra Div
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-full">
                      {STANDINGS_LIBRE_1RA_OFICIAL.length} Equipos
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {STANDINGS_LIBRE_1RA_OFICIAL.map((r) => (
                      <button
                        key={`dir-l1-${r.team}`}
                        onClick={() => {
                          setSelectedTournament("daeris");
                          setSelectedDaerisSub("libre-parquecarabobo");
                          setHighlightedTeam(r.team);
                          setIsTeamDirectoryOpen(false);
                        }}
                        className="px-2 py-1 rounded-md text-[11px] font-bold bg-neutral-900 border border-neutral-800 text-neutral-200 hover:border-orange-400 hover:text-white transition"
                      >
                        {r.team}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Master 50 */}
                <div className="rounded-xl border border-neutral-800/80 bg-neutral-950/70 p-3">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2">
                    <span className="font-black text-xs text-yellow-400 uppercase tracking-wider">
                      Master 50
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-full">
                      {STANDINGS_MASTER_50_OFICIAL.length} Equipos
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {STANDINGS_MASTER_50_OFICIAL.map((r) => (
                      <button
                        key={`dir-m50-${r.team}`}
                        onClick={() => {
                          setSelectedTournament("daeris");
                          setSelectedDaerisSub("master50");
                          setHighlightedTeam(r.team);
                          setIsTeamDirectoryOpen(false);
                        }}
                        className="px-2 py-1 rounded-md text-[11px] font-bold bg-neutral-900 border border-neutral-800 text-neutral-200 hover:border-yellow-400 hover:text-white transition"
                      >
                        {r.team}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Libre 2da */}
                <div className="rounded-xl border border-neutral-800/80 bg-neutral-950/70 p-3">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2">
                    <span className="font-black text-xs text-sky-400 uppercase tracking-wider">
                      Libre 2da (4 Grupos)
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-full">
                      28 Equipos
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(STANDINGS_LIBRE_2DA_GROUPS).map(([grp, rows]) => (
                      <button
                        key={`dir-l2-${grp}`}
                        onClick={() => {
                          setSelectedTournament("daeris");
                          setSelectedDaerisSub("libre-2da");
                          setSelectedGroup(grp);
                          setIsTeamDirectoryOpen(false);
                        }}
                        className="px-2 py-1 rounded-md text-[11px] font-bold bg-sky-950/60 border border-sky-800 text-sky-300 hover:bg-sky-900 transition"
                      >
                        {grp} ({rows.length})
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Infantil 1ra División (Oficiales) */}
                <div className="rounded-xl border border-neutral-800/80 bg-neutral-950/70 p-3 col-span-full sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2">
                    <span className="font-black text-xs text-rose-400 uppercase tracking-wider">
                      Infantil 1ra Div
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-full">
                      5 Categorías
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(OFFICIAL_MINOR_1RA_STANDINGS).map(([cat, info]) => (
                      <button
                        key={`dir-inf1-${cat}`}
                        onClick={() => {
                          setSelectedTournament("daeris");
                          setSelectedDaerisSub("infantil-1ra");
                          setSelectedCategory(cat as MinorCategory);
                          setIsTeamDirectoryOpen(false);
                        }}
                        className="px-2 py-1 rounded-md text-[11px] font-bold bg-rose-950/60 border border-rose-800 text-rose-300 hover:bg-rose-900 transition flex items-center gap-1"
                      >
                        <span>{cat}</span>
                        <span className="text-[9px] text-rose-400 font-normal">({info.standings.length})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. SELECTOR DE TORNEO Y DIVISIONES */}
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-3 sm:p-5">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-neutral-400">
              <Filter className="h-4 w-4 text-red-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                Torneo:
              </span>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <button
                onClick={() => {
                  setSelectedTournament("daeris");
                  setHighlightedTeam("");
                }}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  selectedTournament === "daeris"
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : "bg-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                Torneo Daeris (Tablas Oficiales 2026)
              </button>
              <button
                onClick={() => {
                  setSelectedTournament("prueba");
                  setHighlightedTeam("");
                }}
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

          {/* Sub-selector de las divisiones de Daeris */}
          {selectedTournament === "daeris" && (
            <div className="w-full pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
              <span className="text-xs text-neutral-500 font-medium mr-1 w-full sm:w-auto text-center sm:text-left">
                División:
              </span>
              {daerisSubList.map((sub) => {
                const isSelected = selectedDaerisSub === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setSelectedDaerisSub(sub.id);
                      setHighlightedTeam("");
                    }}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition inline-flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-neutral-100 text-neutral-950 font-bold shadow-sm"
                        : "bg-neutral-800/80 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                    }`}
                  >
                    <span>{sub.shortName}</span>
                    {sub.id === "institucional" && <span className="text-[10px] opacity-75 font-bold">OFICIAL</span>}
                    {sub.id === "master50" && <span className="text-[10px] opacity-75 font-bold">OFICIAL</span>}
                    {sub.id === "libre-parquecarabobo" && <span className="text-[10px] opacity-75 font-bold">OFICIAL</span>}
                    {sub.id === "libre-2da" && <span className="text-[10px] opacity-75 font-bold">OFICIAL</span>}
                    {sub.id === "infantil-1ra" && <span className="text-[10px] opacity-75 font-bold">OFICIAL</span>}
                  </button>
                );
              })}
            </div>
          )}

          {/* Sub-selector de Grupos para Libre 2da División (Grupos A, B, C, D) */}
          {selectedTournament === "daeris" && currentSub.groups && (
            <div className="w-full pt-3 border-t border-neutral-800">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    Grupo de Libre 2da División:
                  </span>
                </div>
                <span className="text-[11px] font-bold text-sky-400 sm:ml-auto">
                  {selectedGroup} ({currentSub.groups[selectedGroup]?.length || 0} Equipos)
                </span>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {Object.keys(currentSub.groups).map((grp) => {
                  const isSelected = selectedGroup === grp;
                  return (
                    <button
                      key={grp}
                      onClick={() => {
                        setSelectedGroup(grp);
                        setHighlightedTeam("");
                      }}
                      className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition inline-flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-sky-600 text-white shadow-md shadow-sky-600/30 ring-1 ring-sky-400"
                          : "bg-neutral-800/90 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                      }`}
                    >
                      <span>{grp}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                          isSelected ? "bg-white/20 text-white" : "bg-neutral-700/80 text-neutral-300"
                        }`}
                      >
                        {currentSub.groups?.[grp]?.length || 0}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Selector de Categorías si la división seleccionada tiene categorías formativas (Sub-8 a Sub-20) */}
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
                  {selectedCategory} ({getCategoryTeamCount(selectedCategory)} Equipos en esta categoría)
                </span>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 sm:gap-2">
                {MINOR_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  const count = getCategoryTeamCount(cat);
                  const isOfficial = selectedDaerisSub === "infantil-1ra" && !!OFFICIAL_MINOR_1RA_STANDINGS[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setHighlightedTeam("");
                      }}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition inline-flex items-center gap-1.5 ${
                        isSelected
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
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                          isSelected ? "bg-white/20 text-white" : "bg-neutral-700/80 text-neutral-300"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 3. TABLA OFICIAL */}
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Botón de Exportación Social Pro */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-3 sm:px-5">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Trophy className="h-4 w-4 text-amber-400" />
              <span>
                ¿Deseas publicar esta tabla oficial en tus redes sociales?
              </span>
            </div>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs shadow-lg shadow-red-900/30 transition transform active:scale-95"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Exportar Tabla (Historias / Feed / WhatsApp)</span>
            </button>
          </div>

          {/* Aviso si hay equipo resaltado */}
          {highlightedTeam && (
            <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-200">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-red-400" />
                Resaltando al equipo: <strong>{highlightedTeam}</strong>
              </span>
              <button
                onClick={() => setHighlightedTeam("")}
                className="text-red-400 hover:text-white font-bold text-[11px] underline ml-2"
              >
                Quitar resalte
              </button>
            </div>
          )}

          <TournamentOfficialTable
            title={
              selectedTournament === "daeris"
                ? `TABLA DE POSICIONES · ${currentSub.name}${
                    currentSub.hasCategories
                      ? ` (${selectedCategory.toUpperCase()})`
                      : currentSub.groups
                      ? ` (${selectedGroup})`
                      : ""
                  }`
                : "TABLA DE POSICIONES · TORNEO DE PRUEBA"
            }
            groupName={
              selectedTournament === "daeris"
                ? currentSub.hasCategories
                  ? `GRUPO ${selectedCategory.toUpperCase()}`
                  : currentSub.groups
                  ? selectedGroup
                  : currentSub.groupName
                : "GRUPO PRUEBA A"
            }
            qualificationRule={activeRule}
            qualificationCutoff={activeCutoff}
            rows={standingsRows}
            currentCategory={selectedCategory}
            highlightedTeam={highlightedTeam}
          />
        </div>

        {/* Modal de Exportación para Redes Sociales con 3 Diseños, Escudos y Selector Libre de Color */}
        <StandingsSocialExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          rows={standingsRows}
          tournamentName={selectedTournament === "daeris" ? "Torneo Daeris" : "Torneo de Prueba"}
          categoryName={
            selectedTournament === "daeris"
              ? currentSub.hasCategories
                ? selectedCategory
                : currentSub.groups
                ? `${currentSub.shortName} (${selectedGroup})`
                : currentSub.name
              : "Torneo de Prueba"
          }
          groupName={
            selectedTournament === "daeris"
              ? currentSub.hasCategories
                ? `Grupo ${selectedCategory}`
                : currentSub.groups
                ? selectedGroup
                : currentSub.groupName
              : "Grupo Prueba A"
          }
        />
      </main>
    </div>
  );
}
