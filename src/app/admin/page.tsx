"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getAllTournamentMatches,
  getSavedMatchOverrides,
  saveMatchOverride,
  FullMatchData,
} from "@/data/admin-match-manager";
import { daerisSubList } from "@/data/daeris-subtournaments";
import { MINOR_CATEGORIES, MinorCategory } from "@/data/generic-tournament-data";
import { MatchEditModal } from "@/components/admin/match-edit-modal";
import {
  Trophy,
  Calendar,
  Clock,
  MapPin,
  UserCheck,
  Edit,
  Plus,
  Search,
  Filter,
  Shield,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  LogOut,
  Layers,
} from "lucide-react";

export default function AdminPage() {
  const [matches, setMatches] = useState<FullMatchData[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modal de edición
  const [editingMatch, setEditingMatch] = useState<FullMatchData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar partidos iniciales y fusionar con modificaciones guardadas
  useEffect(() => {
    const defaultMatches = getAllTournamentMatches();
    const overrides = getSavedMatchOverrides();

    const merged = defaultMatches.map((m) => {
      if (overrides[m.id]) {
        return overrides[m.id];
      }
      return m;
    });

    setMatches(merged);
  }, []);

  // Manejar partido guardado exitosamente
  const handleSaveSuccess = (updatedMatch: FullMatchData) => {
    saveMatchOverride(updatedMatch);
    setMatches((prev) =>
      prev.map((m) => (m.id === updatedMatch.id ? updatedMatch : m))
    );
  };

  // Abrir modal de edición
  const handleEditMatch = (match: FullMatchData) => {
    setEditingMatch(match);
    setIsModalOpen(true);
  };

  // Crear nuevo partido de imprevisto
  const handleCreateNewMatch = () => {
    const newId = `match-new-${Date.now()}`;
    const newMatch: FullMatchData = {
      id: newId,
      category: "Sub-12",
      division: "1ra División",
      tournamentSlug: "infantil-1ra-division",
      tournamentName: "Torneo Infantil 1era División",
      subCategory: "Sub-12",
      homeTeam: "Equipo Local",
      awayTeam: "Equipo Visitante",
      homeScore: null,
      awayScore: null,
      matchDate: new Date().toISOString().split("T")[0],
      matchTime: "10:00",
      venue: "Cancha Gimnasio Libertador del 23 de Enero",
      status: "scheduled",
      jornada: "JORNADA EXTRAORDINARIA",
      referees: {
        principal: "Árbitro 1 (Principal)",
        asistente: "Árbitro 2 (Auxiliar)",
        mesa: "Mesa Técnica",
      },
      goalsList: [],
      cardsList: [],
    };

    setEditingMatch(newMatch);
    setIsModalOpen(true);
  };

  // Filtrado de partidos
  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      const matchTourney =
        selectedTournament === "all" ||
        m.tournamentSlug.toLowerCase() === selectedTournament.toLowerCase();

      const matchCat =
        selectedCategory === "all" ||
        (m.subCategory && m.subCategory.toLowerCase() === selectedCategory.toLowerCase()) ||
        m.category.toLowerCase().includes(selectedCategory.toLowerCase());

      const matchStatus =
        statusFilter === "all" || m.status.toLowerCase() === statusFilter.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        m.homeTeam.toLowerCase().includes(query) ||
        m.awayTeam.toLowerCase().includes(query) ||
        m.venue.toLowerCase().includes(query) ||
        (m.referees?.principal && m.referees.principal.toLowerCase().includes(query)) ||
        m.id.toLowerCase().includes(query);

      return matchTourney && matchCat && matchStatus && matchSearch;
    });
  }, [matches, selectedTournament, selectedCategory, statusFilter, searchQuery]);

  // Contadores
  const totalMatches = matches.length;
  const finishedCount = matches.filter((m) => m.status === "finished").length;
  const scheduledCount = matches.filter((m) => m.status === "scheduled").length;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header del Panel */}
      <header className="border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-xl sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image src="/logo.png" alt="Furia Menor" width={38} height={38} className="object-contain" />
              <div>
                <p className="text-base font-extrabold text-white leading-none group-hover:text-red-400 transition">
                  Furia Menor
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-red-400 font-bold mt-0.5">
                  Panel de Control Administrativo
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/"
              className="rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-1.5 text-neutral-300 hover:text-white hover:border-neutral-700 transition"
            >
              Ver Sitio Web
            </Link>
            <Link
              href="/admin/login"
              className="flex items-center gap-1.5 text-neutral-400 hover:text-red-400 transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Cerrar Sesión</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Título y Acciones Principales */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-widest">
              <Trophy className="h-4 w-4" />
              Gestión Integral de Competiciones
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black text-white">
              Editor de Partidos, Calendario & Marcadores
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400">
              Edita cualquier imprevisto de hora, sede, árbitros, goles o tarjetas con recálculo automático de posiciones
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCreateNewMatch}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-600/30 hover:bg-red-500 transition"
            >
              <Plus className="h-4 w-4" />
              Programar Nuevo Partido
            </button>
          </div>
        </div>

        {/* Tarjetas de Resumen Rápido */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 shadow-lg">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Total Partidos</span>
            <p className="text-2xl font-black text-white mt-1">{totalMatches}</p>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 shadow-lg">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">Programados</span>
            <p className="text-2xl font-black text-blue-400 mt-1">{scheduledCount}</p>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 shadow-lg">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Finalizados</span>
            <p className="text-2xl font-black text-emerald-400 mt-1">{finishedCount}</p>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 shadow-lg">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Módulos Extra</span>
            <div className="mt-1 flex items-center gap-2 text-xs">
              <Link href="/admin/sanciones" className="text-amber-400 hover:underline font-bold">
                Fair Play & Sanciones →
              </Link>
            </div>
          </div>
        </div>

        {/* Filtros Jerárquicos y Barra de Búsqueda */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-neutral-300 font-bold text-xs uppercase tracking-wider">
              <Filter className="h-4 w-4 text-red-400" />
              <span>Filtros y Búsqueda de Encuentros</span>
            </div>
            <span className="text-xs text-neutral-400">
              Mostrando <strong className="text-white">{filteredMatches.length}</strong> de {matches.length} partidos
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* Filtro de Torneo */}
            <div>
              <label className="block text-[11px] font-medium text-neutral-400 mb-1">Torneo / Rama</label>
              <select
                value={selectedTournament}
                onChange={(e) => setSelectedTournament(e.target.value)}
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white"
              >
                <option value="all">Todos los Torneos</option>
                {daerisSubList.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro de Categoría */}
            <div>
              <label className="block text-[11px] font-medium text-neutral-400 mb-1">Categoría</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white"
              >
                <option value="all">Todas las Categorías</option>
                {MINOR_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="Institucional">Institucional</option>
                <option value="Fútbol 7">Fútbol 7</option>
                <option value="Master 50">Master 50</option>
                <option value="Libre">Libre</option>
              </select>
            </div>

            {/* Filtro de Estado */}
            <div>
              <label className="block text-[11px] font-medium text-neutral-400 mb-1">Estado del Partido</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white"
              >
                <option value="all">Todos los Estados</option>
                <option value="scheduled">Solo Programados</option>
                <option value="live">En Vivo</option>
                <option value="finished">Solo Finalizados</option>
              </select>
            </div>

            {/* Búsqueda por texto */}
            <div>
              <label className="block text-[11px] font-medium text-neutral-400 mb-1">Buscar por Equipo o Árbitro</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Ej: Equipo 1, Cancha, Árbitro..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 pl-8 pr-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Listado de Partidos con Botón de Edición Rápida */}
        <div className="space-y-3">
          {filteredMatches.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-800 p-12 text-center text-neutral-400">
              <p className="text-sm">No se encontraron partidos con los filtros seleccionados.</p>
            </div>
          ) : (
            filteredMatches.map((match) => {
              const isFinished = match.status === "finished";

              return (
                <div
                  key={match.id}
                  className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5 hover:border-neutral-700 transition flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg"
                >
                  <div className="flex-1 min-w-0">
                    {/* Metadatos */}
                    <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
                      <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 font-bold text-red-400 text-[10px] uppercase tracking-wider">
                        {match.tournamentName}
                      </span>
                      <span className="rounded-full bg-neutral-800 px-2 py-0.5 font-semibold text-neutral-300 text-[10px]">
                        {match.subCategory || match.category}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          isFinished
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {isFinished ? "Finalizado" : "Programado"}
                      </span>
                      <span className="text-neutral-500 font-mono text-[11px]">ID: {match.id}</span>
                    </div>

                    {/* Enfrentamiento de Equipos */}
                    <div className="flex items-center gap-3 my-2">
                      <span className="text-base sm:text-lg font-bold text-white truncate max-w-[180px] sm:max-w-[240px]">
                        {match.homeTeam}
                      </span>

                      {isFinished && match.homeScore !== null && match.awayScore !== null ? (
                        <span className="rounded-lg bg-neutral-950 px-3 py-1 font-black text-red-400 text-base border border-neutral-800 shrink-0">
                          {match.homeScore} - {match.awayScore}
                        </span>
                      ) : (
                        <span className="rounded-md bg-neutral-950 px-2 py-0.5 text-xs font-black text-neutral-500 border border-neutral-800 shrink-0">
                          VS
                        </span>
                      )}

                      <span className="text-base sm:text-lg font-bold text-white truncate max-w-[180px] sm:max-w-[240px]">
                        {match.awayTeam}
                      </span>
                    </div>

                    {/* Datos de Horario, Cancha y Árbitros */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-red-400" />
                        {match.matchDate} · {match.matchTime}
                      </span>
                      <span className="flex items-center gap-1 truncate max-w-[260px]">
                        <MapPin className="h-3.5 w-3.5 text-neutral-500" />
                        <span className="truncate">{match.venue}</span>
                      </span>
                      {match.referees && (
                        <span className="flex items-center gap-1 text-amber-400/90 truncate max-w-[300px]">
                          <UserCheck className="h-3.5 w-3.5" />
                          <span className="truncate">Árbitro: {match.referees.principal}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Botón de Edición del Partido */}
                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      onClick={() => handleEditMatch(match)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-800 hover:bg-red-600 px-4 py-2.5 text-xs font-bold text-white transition shadow-md group"
                    >
                      <Edit className="h-3.5 w-3.5 text-red-400 group-hover:text-white transition" />
                      <span>Editar Partido / Acta</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* MODAL DE EDICIÓN INTEGRAL */}
      <MatchEditModal
        match={editingMatch}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveSuccess={handleSaveSuccess}
      />
    </div>
  );
}
