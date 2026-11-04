"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  Filter,
  MapPin,
  UserCheck,
  ArrowLeft,
  FileText,
  Eye,
  ShieldCheck,
  Search,
  X,
  Layers,
  Activity,
  Sparkles,
  Clock,
} from "lucide-react";
import { useState, useEffect, useMemo, Suspense } from "react";
import {
  ALL_NOV_2026_FIXTURES,
  OFFICIAL_VENUES,
  CALENDAR_CATEGORIES,
  type Discipline,
  type MatchStatus,
  type OfficialFixture,
} from "@/data/fixtures-noviembre-2026";
import { getStoredMatches, DBMatch } from "@/lib/db-store";
import { ScoresheetModal } from "@/components/transparency/scoresheet-modal";
import { formatDateVE, formatFullDateVE } from "@/lib/date-utils";

interface ExtendedMatch {
  id: string;
  discipline: Discipline;
  category: string;
  division?: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  matchDate: string;
  matchTime: string;
  venue: string;
  venueShort?: string;
  courtDetail?: string;
  status: MatchStatus;
  matchday: number;
  jornada?: string;
  referees?: {
    principal: string;
    asistente: string;
    mesa?: string;
  };
  refereeName?: string;
  scoresheetUrl?: string | null;
  sheetPhotoUrl?: string | null;
  refereeNotes?: string;
}

type GroupByMode = "date" | "venue" | "list";

function CalendarioContent() {
  const searchParams = useSearchParams();

  // Estados de filtros
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("all");
  const [selectedVenue, setSelectedVenue] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [groupBy, setGroupBy] = useState<GroupByMode>("date");

  // Partidos dinámicos desde db-store / arbitraje
  const [storedDbMatches, setStoredDbMatches] = useState<DBMatch[]>([]);
  const [selectedScoresheetMatch, setSelectedScoresheetMatch] = useState<any>(null);

  // Inicializar parámetros desde la URL
  useEffect(() => {
    const pDiscipline = searchParams.get("disciplina");
    const pSede = searchParams.get("sede");
    const pCat = searchParams.get("cat") || searchParams.get("categoria");
    const pFecha = searchParams.get("fecha");

    if (pDiscipline) setSelectedDiscipline(pDiscipline);
    if (pSede) setSelectedVenue(pSede);
    if (pCat) setSelectedCategory(pCat);
    if (pFecha) setSelectedDate(pFecha);
  }, [searchParams]);

  useEffect(() => {
    setStoredDbMatches(getStoredMatches());
  }, []);

  // Combinar los fixtures de noviembre 2026 con los datos del store de árbitros
  const allMatches: ExtendedMatch[] = useMemo(() => {
    const dbMap = new Map<string, DBMatch>();
    storedDbMatches.forEach((m) => dbMap.set(m.id, m));

    // Convertir fixture oficial combinando con cualquier override guardado por el árbitro
    const fixturesCombined: ExtendedMatch[] = ALL_NOV_2026_FIXTURES.map((f) => {
      const dbMatch = dbMap.get(f.id);
      if (dbMatch) {
        const isFinished = dbMatch.status === "finalizado";
        const isLive = dbMatch.status === "en_vivo";
        const status: MatchStatus = isFinished ? "finished" : isLive ? "live" : "scheduled";

        return {
          ...f,
          homeScore: dbMatch.homeScore ?? f.homeScore,
          awayScore: dbMatch.awayScore ?? f.awayScore,
          status,
          scoresheetUrl: dbMatch.scoresheetUrl || dbMatch.sheetPhotoUrl || f.scoresheetUrl || f.sheetPhotoUrl,
          sheetPhotoUrl: dbMatch.sheetPhotoUrl || dbMatch.scoresheetUrl || f.sheetPhotoUrl || f.scoresheetUrl,
          refereeNotes: dbMatch.refereeNotes || f.refereeNotes,
          refereeName: dbMatch.refereeName || f.referees?.principal,
        };
      }

      return {
        ...f,
        scoresheetUrl: f.scoresheetUrl || f.sheetPhotoUrl,
        sheetPhotoUrl: f.sheetPhotoUrl || f.scoresheetUrl,
        refereeName: f.referees?.principal,
      };
    });

    return fixturesCombined;
  }, [storedDbMatches]);

  // Lista de fechas únicas disponibles
  const availableDates = useMemo(() => {
    const dates = Array.from(new Set(allMatches.map((m) => m.matchDate))).sort();
    return dates;
  }, [allMatches]);

  // Filtrado reactivo de partidos
  const filteredMatches = useMemo(() => {
    return allMatches.filter((m) => {
      // Filtro de disciplina
      if (selectedDiscipline !== "all" && m.discipline !== selectedDiscipline) {
        return false;
      }

      // Filtro de sede
      if (selectedVenue !== "all") {
        const matchVenue = m.venue.toLowerCase();
        const targetVenue = selectedVenue.toLowerCase();
        if (!matchVenue.includes(targetVenue) && !(m.venueShort && m.venueShort.toLowerCase().includes(targetVenue))) {
          return false;
        }
      }

      // Filtro de categoría
      if (selectedCategory !== "all" && m.category !== selectedCategory) {
        return false;
      }

      // Filtro de fecha
      if (selectedDate !== "all" && m.matchDate !== selectedDate) {
        return false;
      }

      // Búsqueda por texto (equipo o sede)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesHome = m.homeTeam.toLowerCase().includes(q);
        const matchesAway = m.awayTeam.toLowerCase().includes(q);
        const matchesVenue = m.venue.toLowerCase().includes(q);
        const matchesCat = m.category.toLowerCase().includes(q);
        if (!matchesHome && !matchesAway && !matchesVenue && !matchesCat) {
          return false;
        }
      }

      return true;
    });
  }, [allMatches, selectedDiscipline, selectedVenue, selectedCategory, selectedDate, searchQuery]);

  // Conteo de disciplinas
  const futsalCount = useMemo(() => filteredMatches.filter((m) => m.discipline === "Fútbol Sala").length, [filteredMatches]);
  const futbol7Count = useMemo(() => filteredMatches.filter((m) => m.discipline === "Fútbol 7").length, [filteredMatches]);

  // Reset de filtros
  const hasActiveFilters =
    selectedDiscipline !== "all" ||
    selectedVenue !== "all" ||
    selectedCategory !== "all" ||
    selectedDate !== "all" ||
    searchQuery.trim() !== "";

  const handleResetFilters = () => {
    setSelectedDiscipline("all");
    setSelectedVenue("all");
    setSelectedCategory("all");
    setSelectedDate("all");
    setSearchQuery("");
  };

  // Agrupamiento de partidos
  const groupedMatches = useMemo(() => {
    if (groupBy === "list") {
      return [{ groupKey: "all", groupTitle: "Listado Completo", matches: filteredMatches }];
    }

    if (groupBy === "venue") {
      const groups: Record<string, ExtendedMatch[]> = {};
      filteredMatches.forEach((m) => {
        const key = m.venue;
        if (!groups[key]) groups[key] = [];
        groups[key].push(m);
      });

      return Object.entries(groups).map(([venueName, matches]) => ({
        groupKey: venueName,
        groupTitle: venueName,
        matches,
      }));
    }

    // Default: groupBy === "date"
    const groups: Record<string, ExtendedMatch[]> = {};
    filteredMatches.forEach((m) => {
      const key = m.matchDate;
      if (!groups[key]) groups[key] = [];
      groups[key].push(m);
    });

    const sortedDates = Object.keys(groups).sort();
    return sortedDates.map((dateStr) => {
      return {
        groupKey: dateStr,
        groupTitle: formatFullDateVE(dateStr),
        matches: groups[dateStr],
      };
    });
  }, [filteredMatches, groupBy]);

  const statusLabel = (status: MatchStatus) => {
    if (status === "live") return "EN VIVO";
    if (status === "finished") return "FINALIZADO";
    return "PROGRAMADO";
  };

  const statusClass = (status: MatchStatus) => {
    if (status === "live") return "bg-red-500/20 text-red-400 border-red-500/50 animate-pulse";
    if (status === "finished") return "bg-neutral-800 text-neutral-300 border-neutral-700";
    return "bg-blue-500/10 text-blue-400 border-blue-500/40";
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mb-8 flex flex-col items-center sm:items-start text-center sm:text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition mb-3 self-center sm:self-auto"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al Inicio
          </Link>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-400 border border-red-500/30">
              <Calendar className="h-3.5 w-3.5" />
              FIXTURE OFICIAL · NOVIEMBRE 2026
            </span>
            <span className="rounded-full bg-neutral-900 border border-neutral-800 px-3 py-1 text-xs text-neutral-300">
              51 Partidos · 6 Canchas en Caracas
            </span>
          </div>

          <h1 className="mt-2 text-3xl font-black sm:text-4xl text-white">
            Calendario Oficial & Resultados
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-neutral-400 max-w-2xl">
            Programación integral de 37 partidos de Fútbol Sala y 14 partidos de Fútbol 7. Filtra por disciplina,
            cancha, categoría y fecha con acceso directo a las planillas originales firmadas.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 font-semibold text-neutral-300">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Futsal: <strong className="text-white">{futsalCount}</strong> partidos
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 font-semibold text-neutral-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Fútbol 7: <strong className="text-white">{futbol7Count}</strong> partidos
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 font-semibold text-neutral-300">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
              Cuerpos arbitrales certificados
            </span>
          </div>
        </div>

        {/* Panel de Filtros Mobile-First */}
        <div className="mb-8 rounded-3xl border border-neutral-800 bg-neutral-900/80 p-4 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-red-400" />
              <span className="text-xs font-black uppercase tracking-wider text-neutral-200">
                Filtros de Búsqueda & Agrupación
              </span>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-bold transition self-start sm:self-auto"
              >
                <X className="h-3.5 w-3.5" />
                Limpiar filtros ({filteredMatches.length} de {allMatches.length})
              </button>
            )}
          </div>

          {/* Buscador de equipos */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar por equipo, academia, cancha o categoría (ej. La Paz, SENIAT, Hogar Canario)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-neutral-800 bg-neutral-950 pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Selectores de Filtro en Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* 1. Disciplina */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                Disciplina
              </label>
              <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs font-semibold text-neutral-200 focus:border-red-500 focus:outline-none"
              >
                <option value="all">⚽ Todas las Disciplinas</option>
                <option value="Fútbol Sala">Fútbol Sala (Futsal - 37 Partidos)</option>
                <option value="Fútbol 7">Fútbol 7 (Sintético - 11 Partidos)</option>
              </select>
            </div>

            {/* 2. Sede / Cancha */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                Sede / Cancha
              </label>
              <select
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs font-semibold text-neutral-200 focus:border-red-500 focus:outline-none"
              >
                <option value="all">📍 Todas las Canchas (6 Sedes)</option>
                <option value="Cancha Hogar Canario">Hogar Canario (Futsal · 9 PJ)</option>
                <option value="Cancha de Futsal La Paz">Cancha La Paz (Futsal · 6 PJ)</option>
                <option value="Parque Carabobo">Parque Carabobo (Futsal · 15 PJ)</option>
                <option value="Bloque 17 de 23 de Enero">Bloque 17 - 23 de Enero (Futsal · 7 PJ)</option>
                <option value="Cancha Zona Rental">Cancha Zona Rental (Fútbol 7 · 5 PJ)</option>
                <option value="Cancha Guacamaya">Cancha Guacamaya (Fútbol 7 · 6 PJ)</option>
              </select>
            </div>

            {/* 3. Categoría */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs font-semibold text-neutral-200 focus:border-red-500 focus:outline-none"
              >
                <option value="all">🏆 Todas las Categorías</option>
                {CALENDAR_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Fecha */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                Fecha del Partido
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs font-semibold text-neutral-200 focus:border-red-500 focus:outline-none"
              >
                <option value="all">🗓️ Todas las Fechas Oficiales</option>
                <option value="2026-11-05">Jueves 5-11-2026 (Zona Rental F7)</option>
                <option value="2026-11-06">Viernes 6-11-2026 (Cancha Guacamaya F7)</option>
                <option value="2026-11-07">Sábado 7-11-2026 (Hogar Canario, La Paz, Parque Carabobo, Zona Rental, Guacamaya)</option>
                <option value="2026-11-08">Domingo 8-11-2026 (Parque Carabobo, Bloque 17 23 de Enero)</option>
              </select>
            </div>
          </div>

          {/* Agrupación */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Layers className="h-3.5 w-3.5 text-neutral-400" />
              <span className="font-semibold text-neutral-300">Modo de Vista:</span>
            </div>
            <div className="flex items-center rounded-xl bg-neutral-950 p-1 border border-neutral-800">
              <button
                type="button"
                onClick={() => setGroupBy("date")}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                  groupBy === "date" ? "bg-red-600 text-white shadow-sm" : "text-neutral-400 hover:text-white"
                }`}
              >
                Por Fecha
              </button>
              <button
                type="button"
                onClick={() => setGroupBy("venue")}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                  groupBy === "venue" ? "bg-red-600 text-white shadow-sm" : "text-neutral-400 hover:text-white"
                }`}
              >
                Por Sede / Cancha
              </button>
              <button
                type="button"
                onClick={() => setGroupBy("list")}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                  groupBy === "list" ? "bg-red-600 text-white shadow-sm" : "text-neutral-400 hover:text-white"
                }`}
              >
                Lista Continua
              </button>
            </div>
          </div>
        </div>

        {/* Listado de Partidos Agrupados */}
        <div className="space-y-8">
          {filteredMatches.length === 0 ? (
            <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800/60">
                <Calendar className="h-8 w-8 text-neutral-500" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">No se encontraron partidos</h3>
              <p className="text-sm text-neutral-400 max-w-md mx-auto">
                No hay encuentros programados que coincidan con los filtros seleccionados. Intenta cambiar de sede,
                disciplina o fecha.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-500 transition"
              >
                Ver todos los 51 partidos
              </button>
            </div>
          ) : (
            groupedMatches.map((group) => (
              <div key={group.groupKey} className="space-y-4">
                {/* Cabecera del Grupo */}
                {groupBy !== "list" && (
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
                    <div className="flex items-center gap-2">
                      {groupBy === "date" ? (
                        <Calendar className="h-5 w-5 text-red-400" />
                      ) : (
                        <MapPin className="h-5 w-5 text-emerald-400" />
                      )}
                      <h2 className="text-base sm:text-lg font-extrabold text-white">{group.groupTitle}</h2>
                    </div>
                    <span className="rounded-full bg-neutral-900 border border-neutral-800 px-2.5 py-0.5 text-xs font-bold text-neutral-400">
                      {group.matches.length} {group.matches.length === 1 ? "partido" : "partidos"}
                    </span>
                  </div>
                )}

                {/* Tarjetas de Partidos */}
                <div className="grid gap-4">
                  {group.matches.map((match) => {
                    const isFutsal = match.discipline === "Fútbol Sala";
                    return (
                      <div
                        key={match.id}
                        className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-4 sm:p-5 hover:border-neutral-700 transition shadow-lg"
                      >
                        {/* Fila superior: metadata */}
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-neutral-400">
                            {/* Insignia de disciplina */}
                            <span
                              className={`rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                                isFutsal
                                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                  : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              }`}
                            >
                              {match.discipline}
                            </span>

                            <span className="rounded-md bg-neutral-800 px-2 py-0.5 text-[11px] font-bold text-neutral-200">
                              {match.category} {match.division ? `(${match.division})` : ""}
                            </span>

                            {match.courtDetail && (
                              <span className="rounded-md bg-sky-500/10 border border-sky-500/30 px-2 py-0.5 text-[10px] font-bold text-sky-400">
                                {match.courtDetail}
                              </span>
                            )}

                            <span className="font-bold text-neutral-300">{match.jornada || `Jornada ${match.matchday}`}</span>

                            <span className="hidden sm:inline text-neutral-600">·</span>

                            <span className="flex items-center gap-1 font-bold text-neutral-200">
                              <Calendar className="h-3 w-3 text-red-400" />
                              {formatDateVE(match.matchDate)}
                            </span>

                            <span className="hidden sm:inline text-neutral-600">·</span>

                            <span className="flex items-center gap-1 text-neutral-300 font-semibold">
                              <Clock className="h-3 w-3 text-neutral-500" />
                              {match.matchTime}
                            </span>

                            <span className="hidden sm:inline text-neutral-600">·</span>

                            <span className="flex items-center gap-1 text-neutral-300">
                              <MapPin className="h-3 w-3 text-red-400" />
                              <span className="max-w-[220px] truncate sm:max-w-none">{match.venue}</span>
                            </span>
                          </div>

                          <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${statusClass(match.status)}`}>
                            {statusLabel(match.status)}
                          </span>
                        </div>

                        {/* Enfrentamiento y Marcador */}
                        <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-4 py-3 border-y border-neutral-800/80">
                          {/* Equipo Local */}
                          <div className="text-center sm:text-right">
                            <p className="text-base sm:text-lg font-black text-white">{match.homeTeam}</p>
                            <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">Local</span>
                          </div>

                          {/* Marcador Central */}
                          <div className="text-center px-4 flex flex-col items-center justify-center">
                            {match.status === "finished" ? (
                              <div className="flex flex-col items-center gap-1.5">
                                <p className="text-2xl font-black text-red-400 sm:text-3xl tracking-wider">
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
                                <p className="text-2xl font-black text-red-400 sm:text-3xl">
                                  {match.homeScore ?? 0} - {match.awayScore ?? 0}
                                </p>
                                <span className="rounded-full bg-red-600/30 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-red-400 animate-pulse">
                                  En Cancha
                                </span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-0.5">
                                <span className="text-xs font-black text-neutral-400 bg-neutral-950 px-3 py-1 rounded-lg border border-neutral-800">
                                  VS
                                </span>
                                <span className="text-[10px] text-neutral-500 mt-0.5">{match.matchTime}</span>
                              </div>
                            )}
                          </div>

                          {/* Equipo Visitante */}
                          <div className="text-center sm:text-left">
                            <p className="text-base sm:text-lg font-black text-white">{match.awayTeam}</p>
                            <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">Visitante</span>
                          </div>
                        </div>

                        {/* CUERPO ARBITRAL OFICIAL DESIGNADO */}
                        {match.referees && (
                          <div className="mt-2.5 pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-400">
                            <div className="flex items-center gap-1 text-amber-400 font-bold text-[11px] uppercase tracking-wider">
                              <UserCheck className="h-3.5 w-3.5" />
                              <span>Cuerpo Arbitral:</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-[11px]">
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
                    );
                  })}
                </div>
              </div>
            ))
          )}
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

export default function CalendarioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-neutral-400 text-sm">
          Cargando calendario oficial de partidos...
        </div>
      }
    >
      <CalendarioContent />
    </Suspense>
  );
}
