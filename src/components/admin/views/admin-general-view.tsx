"use client";

import React, { useState, useMemo } from "react";
import {
  DBMatch,
  DBClub,
  DBPlayer,
  DBCategory,
  DBStandingsRow,
  AppUser,
} from "@/types/auth-roles";
import {
  calculateStandingsForCategory,
  DB_CATEGORIES,
} from "@/lib/db-store";
import {
  ShieldAlert,
  Trophy,
  Users,
  Calendar,
  Building2,
  CheckCircle2,
  Edit,
  Plus,
  RefreshCw,
  Search,
  Filter,
  Flame,
  Award,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

interface AdminGeneralViewProps {
  user: AppUser;
  clubs: DBClub[];
  categories: DBCategory[];
  players: DBPlayer[];
  matches: DBMatch[];
  onUpdateMatch: (match: DBMatch) => void;
  onAddMatch: (match: DBMatch) => void;
}

export function AdminGeneralView({
  user,
  clubs,
  categories,
  players,
  matches,
  onUpdateMatch,
  onAddMatch,
}: AdminGeneralViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("cat-sub-12");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMatch, setEditingMatch] = useState<DBMatch | null>(null);

  // Formulario de edición de partido
  const [homeClubId, setHomeClubId] = useState("");
  const [awayClubId, setAwayClubId] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [matchTime, setMatchTime] = useState("");
  const [venue, setVenue] = useState("");
  const [matchCategory, setMatchCategory] = useState("cat-sub-12");
  const [homeScore, setHomeScore] = useState<number | "">("");
  const [awayScore, setAwayScore] = useState<number | "">("");
  const [status, setStatus] = useState<DBMatch["status"]>("programado");
  const [refereeName, setRefereeName] = useState("Prof. José Colina");
  const [refereeNotes, setRefereeNotes] = useState("");

  // Tabla de posiciones recalculada en tiempo real
  const currentStandings: DBStandingsRow[] = useMemo(() => {
    return calculateStandingsForCategory(selectedCategory, matches, clubs);
  }, [selectedCategory, matches, clubs]);

  const activeCategoryObj = useMemo(() => {
    return categories.find((c) => c.id === selectedCategory) || categories[0];
  }, [categories, selectedCategory]);

  // Filtrado de partidos
  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      const matchCat = selectedCategory === "all" || m.categoryId === selectedCategory;
      const matchStatus = statusFilter === "all" || m.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        m.homeClubName.toLowerCase().includes(q) ||
        m.awayClubName.toLowerCase().includes(q) ||
        m.venue.toLowerCase().includes(q) ||
        (m.refereeName && m.refereeName.toLowerCase().includes(q));

      return matchCat && matchStatus && matchSearch;
    });
  }, [matches, selectedCategory, statusFilter, searchQuery]);

  // Abrir modal para editar
  const handleEditMatch = (match: DBMatch) => {
    setEditingMatch(match);
    setHomeClubId(match.homeClubId);
    setAwayClubId(match.awayClubId);
    setMatchDate(match.matchDate);
    setMatchTime(match.matchTime);
    setVenue(match.venue);
    setMatchCategory(match.categoryId);
    setHomeScore(match.homeScore !== null ? match.homeScore : "");
    setAwayScore(match.awayScore !== null ? match.awayScore : "");
    setStatus(match.status);
    setRefereeName(match.refereeName || "Prof. José Colina");
    setRefereeNotes(match.refereeNotes || "");
    setIsModalOpen(true);
  };

  // Abrir modal para programar nuevo partido
  const handleNewMatch = () => {
    setEditingMatch(null);
    setHomeClubId(clubs[0]?.id || "la-paz-futsal");
    setAwayClubId(clubs[1]?.id || "dvo-paraiso");
    setMatchDate(new Date().toISOString().split("T")[0]);
    setMatchTime("10:00");
    setVenue("Cancha de Futsal LA PAZ");
    setMatchCategory(selectedCategory);
    setHomeScore("");
    setAwayScore("");
    setStatus("programado");
    setRefereeName("Prof. José Colina");
    setRefereeNotes("");
    setIsModalOpen(true);
  };

  // Guardar partido
  const handleSaveMatch = (e: React.FormEvent) => {
    e.preventDefault();

    const homeClub = clubs.find((c) => c.id === homeClubId);
    const awayClub = clubs.find((c) => c.id === awayClubId);
    const cat = categories.find((c) => c.id === matchCategory);

    const parsedHomeScore = homeScore !== "" ? Number(homeScore) : null;
    const parsedAwayScore = awayScore !== "" ? Number(awayScore) : null;

    if (editingMatch) {
      const updated: DBMatch = {
        ...editingMatch,
        categoryId: matchCategory,
        categoryName: cat?.name || "Sub-12",
        homeClubId,
        homeClubName: homeClub?.name || homeClubId,
        awayClubId,
        awayClubName: awayClub?.name || awayClubId,
        matchDate,
        matchTime,
        venue,
        homeScore: parsedHomeScore,
        awayScore: parsedAwayScore,
        status,
        refereeName,
        refereeNotes,
        updatedAt: new Date().toISOString(),
      };
      onUpdateMatch(updated);
    } else {
      const created: DBMatch = {
        id: `match-${Date.now()}`,
        tournamentName: "Torneo Daeris 1era División",
        categoryId: matchCategory,
        categoryName: cat?.name || "Sub-12",
        homeClubId,
        homeClubName: homeClub?.name || homeClubId,
        awayClubId,
        awayClubName: awayClub?.name || awayClubId,
        matchDate,
        matchTime,
        venue,
        jornada: "Jornada Extraordinaria",
        homeScore: parsedHomeScore,
        awayScore: parsedAwayScore,
        status,
        refereeName,
        refereeNotes,
        updatedAt: new Date().toISOString(),
      };
      onAddMatch(created);
    }

    setIsModalOpen(false);
  };

  // Contadores globales
  const totalMatches = matches.length;
  const finishedMatches = matches.filter((m) => m.status === "finalizado").length;
  const totalPlayers = players.length;

  return (
    <div className="space-y-8">
      {/* 1. CABECERA NIVEL DIOS */}
      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 h-48 w-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-red-500/20 border border-red-500/30 px-3 py-0.5 text-xs font-black text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Nivel Dios • Control Total Furia Menor</span>
              </span>
              <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs text-neutral-300">
                {user.fullName}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Panel Maestro de Competiciones & Autogestión
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              Supervisión de fichajes de delegados, designación arbitral, corrección de registros de imprevisto y recálculo automático de la tabla de posiciones en tiempo real.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleNewMatch}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-black text-white shadow-xl shadow-red-600/30 hover:bg-red-500 transition"
            >
              <Plus className="h-4 w-4" />
              <span>Programar Encuentro</span>
            </button>
          </div>
        </div>

        {/* KPIs del Sistema */}
        <div className="mt-6 pt-5 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-3">
            <span className="text-[10px] uppercase font-bold text-neutral-400">Clubes Federados</span>
            <p className="text-2xl font-black text-white mt-0.5">{clubs.length}</p>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-3">
            <span className="text-[10px] uppercase font-bold text-amber-400">Atletas en Base de Datos</span>
            <p className="text-2xl font-black text-amber-400 mt-0.5">{totalPlayers}</p>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-3">
            <span className="text-[10px] uppercase font-bold text-emerald-400">Partidos Finalizados</span>
            <p className="text-2xl font-black text-emerald-400 mt-0.5">
              {finishedMatches} <span className="text-xs text-neutral-400 font-normal">/ {totalMatches}</span>
            </p>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-3">
            <span className="text-[10px] uppercase font-bold text-blue-400">Automatización</span>
            <p className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Triggers Activos</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2. INSPECTOR EN VIVO: TABLA DE POSICIONES AUTOMATIZADA */}
      <section className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-7 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Trophy className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider">
                Tabla de Posiciones Oficial en Tiempo Real
              </h3>
              <p className="text-xs text-neutral-400">
                Se recalcula automáticamente al modificar o finalizar cualquier marcador
              </p>
            </div>
          </div>

          {/* Selector de Categoría para la Tabla */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-amber-500 text-black font-black shadow-md"
                    : "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tabla Renderizada con Colores y Formato Oficial */}
        <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-950">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-neutral-800 bg-neutral-900 text-[10px] uppercase tracking-wider text-neutral-400">
              <tr>
                <th className="py-3 px-3 text-center w-12 font-black text-amber-400">POS</th>
                <th className="py-3 px-4 font-black text-white">EQUIPOS</th>
                <th className="py-3 px-2 text-center font-bold">JJ</th>
                <th className="py-3 px-2 text-center font-bold text-emerald-400">JG</th>
                <th className="py-3 px-2 text-center font-bold text-amber-400">JE</th>
                <th className="py-3 px-2 text-center font-bold text-rose-400">JP</th>
                <th className="py-3 px-2 text-center font-bold">GA</th>
                <th className="py-3 px-2 text-center font-bold">GE</th>
                <th className="py-3 px-2 text-center font-bold">DIF</th>
                <th className="py-3 px-3 text-center font-black text-amber-300">PTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900 font-mono">
              {currentStandings.map((row, idx) => (
                <tr
                  key={row.clubId}
                  className={`transition hover:bg-neutral-900/60 ${
                    idx < 4 ? "bg-emerald-950/10" : ""
                  }`}
                >
                  <td className="py-3 px-3 text-center font-black text-white">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-4 font-bold text-white font-sans flex items-center gap-2">
                    <span>{row.clubName}</span>
                    {idx === 0 && (
                      <span className="rounded bg-amber-500/20 text-amber-400 px-1.5 py-0.2 text-[9px] font-bold">
                        Líder
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-center text-neutral-300">{row.played}</td>
                  <td className="py-3 px-2 text-center text-emerald-400 font-bold">{row.won}</td>
                  <td className="py-3 px-2 text-center text-amber-400 font-bold">{row.drawn}</td>
                  <td className="py-3 px-2 text-center text-rose-400 font-bold">{row.lost}</td>
                  <td className="py-3 px-2 text-center text-neutral-300">{row.goalsFor}</td>
                  <td className="py-3 px-2 text-center text-neutral-300">{row.goalsAgainst}</td>
                  <td
                    className={`py-3 px-2 text-center font-bold ${
                      row.goalDifference > 0
                        ? "text-emerald-400"
                        : row.goalDifference < 0
                        ? "text-rose-400"
                        : "text-neutral-400"
                    }`}
                  >
                    {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                  </td>
                  <td className="py-3 px-3 text-center font-black text-amber-400 text-sm">
                    {row.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. GESTOR DE PARTIDOS & CORRECCIÓN DE REGISTROS */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-red-500" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Calendario de Partidos y Corrección de Actas
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <input
              type="text"
              placeholder="Buscar por equipo, cancha o árbitro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-1.5 text-white placeholder-neutral-500 focus:border-red-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredMatches.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 hover:border-neutral-700 transition flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-red-600/20 text-red-400 px-2 py-0.5 text-[10px] font-bold">
                    {m.categoryName}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                      m.status === "finalizado"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                    }`}
                  >
                    {m.status}
                  </span>
                  <span className="text-neutral-500 font-mono text-[11px]">{m.jornada}</span>
                </div>

                <div className="flex items-center gap-3 my-1">
                  <span className="text-base font-bold text-white">{m.homeClubName}</span>
                  <span className="rounded-lg bg-neutral-950 px-3 py-0.5 font-mono font-black text-red-400 text-sm border border-neutral-800">
                    {m.homeScore !== null && m.awayScore !== null
                      ? `${m.homeScore} - ${m.awayScore}`
                      : "VS"}
                  </span>
                  <span className="text-base font-bold text-white">{m.awayClubName}</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                  <span>📅 {m.matchDate} · {m.matchTime}</span>
                  <span>📍 {m.venue}</span>
                  {m.refereeName && <span className="text-amber-400">👨‍⚖️ {m.refereeName}</span>}
                </div>
                {m.refereeNotes && (
                  <p className="text-xs text-amber-300/90 bg-neutral-950/80 rounded-xl px-3 py-1.5 border border-amber-500/20 italic">
                    <strong className="text-amber-400 not-italic font-bold">Acta / Incidencias: </strong>
                    {m.refereeNotes}
                  </p>
                )}
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={() => handleEditMatch(m)}
                  className="rounded-xl border border-neutral-700 bg-neutral-800 px-3 py-2 text-xs font-bold text-white hover:bg-red-600 transition flex items-center gap-1.5"
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span>Modificar Acta</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MODAL DE EDICIÓN / PROGRAMACIÓN DE PARTIDO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-black text-white">
                {editingMatch ? "Modificar Partido / Corregir Acta" : "Programar Nuevo Encuentro"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-500 hover:text-white text-xs font-bold"
              >
                ✕ Cerrar
              </button>
            </div>

            <form onSubmit={handleSaveMatch} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Equipo Local</label>
                  <select
                    value={homeClubId}
                    onChange={(e) => setHomeClubId(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
                  >
                    {clubs.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Equipo Visitante</label>
                  <select
                    value={awayClubId}
                    onChange={(e) => setAwayClubId(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
                  >
                    {clubs.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Categoría</label>
                  <select
                    value={matchCategory}
                    onChange={(e) => setMatchCategory(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Estado</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
                  >
                    <option value="programado">Programado</option>
                    <option value="en_vivo">En Vivo</option>
                    <option value="finalizado">Finalizado</option>
                  </select>
                </div>
              </div>

              {/* Marcadores */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-neutral-950 border border-neutral-800">
                <div>
                  <label className="block text-[11px] font-bold text-red-400 mb-1">Goles Local</label>
                  <input
                    type="number"
                    min={0}
                    value={homeScore}
                    onChange={(e) => setHomeScore(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="Sin jugar"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-white font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-blue-400 mb-1">Goles Visitante</label>
                  <input
                    type="number"
                    min={0}
                    value={awayScore}
                    onChange={(e) => setAwayScore(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="Sin jugar"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-white font-mono font-bold"
                  />
                </div>
              </div>

              {/* Fecha, Hora, Cancha */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={matchDate}
                    onChange={(e) => setMatchDate(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Hora</label>
                  <input
                    type="time"
                    required
                    value={matchTime}
                    onChange={(e) => setMatchTime(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Árbitro</label>
                  <input
                    type="text"
                    value={refereeName}
                    onChange={(e) => setRefereeName(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-400 mb-1">Sede / Cancha</label>
                <input
                  type="text"
                  required
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-amber-400 mb-1">
                  Acta de Partido, Incidencias & Tarjetas (Corrección de Imprevistos)
                </label>
                <textarea
                  rows={2}
                  value={refereeNotes}
                  onChange={(e) => setRefereeNotes(e.target.value)}
                  placeholder="Ej: Goles: 2x Carlos Pérez (min 12, 28). TA: Juan Ruiz min 34. Cambio de horario autorizado por lluvia."
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-neutral-800 px-4 py-2 font-bold text-neutral-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-red-600 px-5 py-2 font-black text-white hover:bg-red-500 shadow-lg shadow-red-600/30 transition"
                >
                  Guardar & Recalcular Posiciones
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
