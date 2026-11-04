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
  isCategoryRosterFrozen,
  saveStoredCategories,
} from "@/lib/db-store";
import { ScoresheetModal } from "@/components/transparency/scoresheet-modal";
import { formatDateVE } from "@/lib/date-utils";
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
  Lock,
  Unlock,
  Eye,
  ShieldCheck,
  Clock,
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
  const [scoresheetMatch, setScoresheetMatch] = useState<DBMatch | null>(null);
  const [categoriesState, setCategoriesState] = useState<DBCategory[]>(categories || DB_CATEGORIES);

  const handleToggleCategoryDeadline = (catId: string) => {
    setCategoriesState((prev) => {
      const updated = prev.map((cat) => {
        if (cat.id === catId) {
          const isFrozen = isCategoryRosterFrozen(cat, prev).isFrozen;
          // Si está congelada la abrimos al 30 de noviembre; si está abierta la congelamos al 31 de octubre
          const newDeadline = isFrozen ? "2026-11-30" : "2026-10-31";
          return { ...cat, registrationDeadline: newDeadline };
        }
        return cat;
      });
      saveStoredCategories(updated);
      return updated;
    });
  };

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

        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-center sm:justify-start gap-2">
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

          <div className="flex items-center justify-center sm:justify-start gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={handleNewMatch}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-black text-white shadow-xl shadow-red-600/30 hover:bg-red-500 transition w-full sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Programar Encuentro</span>
            </button>
          </div>
        </div>

        {/* KPIs del Sistema */}
        <div className="mt-6 pt-5 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
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
              className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 hover:border-neutral-700 transition flex flex-col md:flex-row items-center md:items-start text-center md:text-left justify-between gap-4 shadow-lg"
            >
              <div className="space-y-1.5 w-full md:w-auto">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs">
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

                <div className="flex items-center justify-center md:justify-start gap-3 my-1">
                  <span className="text-base font-bold text-white">{m.homeClubName}</span>
                  <span className="rounded-lg bg-neutral-950 px-3 py-0.5 font-mono font-black text-red-400 text-sm border border-neutral-800">
                    {m.homeScore !== null && m.awayScore !== null
                      ? `${m.homeScore} - ${m.awayScore}`
                      : "VS"}
                  </span>
                  <span className="text-base font-bold text-white">{m.awayClubName}</span>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-neutral-400">
                  <span>📅 {formatDateVE(m.matchDate)} · {m.matchTime}</span>
                  <span>📍 {m.venue}</span>
                  {m.refereeName && <span className="text-amber-400">👨‍⚖️ {m.refereeName}</span>}
                </div>
                {m.refereeNotes && (
                  <p className="text-xs text-amber-300/90 bg-neutral-950/80 rounded-xl px-3 py-1.5 border border-amber-500/20 italic text-left">
                    <strong className="text-amber-400 not-italic font-bold">Acta / Incidencias: </strong>
                    {m.refereeNotes}
                  </p>
                )}
              </div>

              <div className="shrink-0 flex flex-wrap items-center justify-center w-full md:w-auto gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-800/80">
                {(m.sheetPhotoUrl || m.scoresheetUrl) && (
                  <button
                    onClick={() => setScoresheetMatch(m)}
                    className="w-full md:w-auto rounded-xl border border-emerald-500/40 bg-emerald-600/20 px-3.5 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-600/30 transition flex items-center justify-center gap-1.5 shadow-sm"
                    title="Ver planilla física original firmada"
                  >
                    <Eye className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Ver Planilla Original</span>
                  </button>
                )}

                <button
                  onClick={() => handleEditMatch(m)}
                  className="w-full md:w-auto rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2 text-xs font-bold text-white hover:bg-red-600 transition flex items-center justify-center gap-1.5"
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span>Modificar Acta</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CONTROL DE FECHAS DE INSCRIPCIÓN Y ROSTERS CONGELADOS (TRANSPARENCIA TOTAL) */}
      <section className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-7 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider">
                Control de Fechas de Inscripción & Rosters Dinámicos Congelados
              </h3>
              <p className="text-xs text-neutral-400">
                Al vencer el plazo ("registration_deadline"), el roster se bloquea para delegados y pasa a dominio público
              </p>
            </div>
          </div>
          <span className="text-xs text-neutral-400 bg-neutral-950 px-3 py-1 rounded-xl border border-neutral-800 self-start sm:self-auto">
            Configuración Global de Temporada
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categoriesState.map((cat) => {
            const frozenInfo = isCategoryRosterFrozen(cat, categoriesState);
            return (
              <div
                key={cat.id}
                className={`rounded-2xl border p-4 space-y-3 transition flex flex-col justify-between ${
                  frozenInfo.isFrozen
                    ? "border-amber-500/40 bg-amber-950/20 shadow-md"
                    : "border-neutral-800 bg-neutral-950/80 hover:border-neutral-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-sm font-black text-white">{cat.name}</span>
                    {frozenInfo.isFrozen ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                        <Lock className="h-3 w-3" />
                        Congelado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        Abierto
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    {cat.discipline} • {cat.division}
                  </p>
                  <p className="text-[11px] text-neutral-300 font-mono mt-1">
                    Cierre: <strong>{frozenInfo.deadlineFormatted}</strong>
                  </p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">
                    {frozenInfo.isFrozen
                      ? "Plantilla auditada de dominio público"
                      : `${frozenInfo.daysRemaining} días restantes para fichajes`}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-800/60">
                  <button
                    type="button"
                    onClick={() => handleToggleCategoryDeadline(cat.id)}
                    className={`w-full rounded-xl py-2 px-3 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      frozenInfo.isFrozen
                        ? "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white"
                        : "bg-amber-600/20 border border-amber-500/40 text-amber-300 hover:bg-amber-600/30"
                    }`}
                  >
                    {frozenInfo.isFrozen ? (
                      <>
                        <Unlock className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Descongelar Roster</span>
                      </>
                    ) : (
                      <>
                        <Lock className="h-3.5 w-3.5 text-amber-400" />
                        <span>Congelar Ahora</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. MODAL DE EDICIÓN / PROGRAMACIÓN DE PARTIDO */}
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
      {/* MODAL DE VISUALIZACIÓN DE PLANILLA ORIGINAL FIRMADA */}
      <ScoresheetModal
        isOpen={!!scoresheetMatch}
        onClose={() => setScoresheetMatch(null)}
        match={
          scoresheetMatch
            ? {
                homeTeam: scoresheetMatch.homeClubName,
                awayTeam: scoresheetMatch.awayClubName,
                homeScore: scoresheetMatch.homeScore,
                awayScore: scoresheetMatch.awayScore,
                categoryName: scoresheetMatch.categoryName,
                venue: scoresheetMatch.venue,
                matchDate: scoresheetMatch.matchDate,
                refereeName: scoresheetMatch.refereeName,
                scoresheetUrl: scoresheetMatch.scoresheetUrl || scoresheetMatch.sheetPhotoUrl,
                sheetPhotoUrl: scoresheetMatch.sheetPhotoUrl || scoresheetMatch.scoresheetUrl,
                refereeNotes: scoresheetMatch.refereeNotes,
              }
            : null
        }
      />
    </div>
  );
}
