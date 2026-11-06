"use client";

import React, { useState, useMemo } from "react";
import {
  DBMatch,
  DBClub,
  DBPlayer,
  DBCategory,
  DBStandingsRow,
  AppUser,
  PlayerStatus,
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
  UserCheck,
  Smartphone,
  AlertTriangle,
  Trash2,
  UserPlus,
  BarChart3,
} from "lucide-react";
import { PlayerStatsModal } from "./player-stats-modal";

interface AdminGeneralViewProps {
  user: AppUser;
  clubs: DBClub[];
  categories: DBCategory[];
  players: DBPlayer[];
  matches: DBMatch[];
  onUpdateMatch: (match: DBMatch) => void;
  onAddMatch: (match: DBMatch) => void;
  onUpdatePlayer?: (player: DBPlayer) => void;
  onDeletePlayer?: (playerId: string) => void;
  onAddPlayer?: (player: DBPlayer) => void;
}

export function AdminGeneralView({
  user,
  clubs,
  categories,
  players,
  matches,
  onUpdateMatch,
  onAddMatch,
  onUpdatePlayer,
  onDeletePlayer,
  onAddPlayer,
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

  // Estados para Control Maestro de Atletas (Admin General)
  const [playerClubFilter, setPlayerClubFilter] = useState<string>("all");
  const [playerCategoryFilter, setPlayerCategoryFilter] = useState<string>("all");
  const [playerSearchQuery, setPlayerSearchQuery] = useState<string>("");
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<DBPlayer | null>(null);
  const [selectedPlayerForStats, setSelectedPlayerForStats] = useState<DBPlayer | null>(null);

  // Formulario de edición/creación de atleta (Admin)
  const [pFirstName, setPFirstName] = useState("");
  const [pLastName, setPLastName] = useState("");
  const [pIdType, setPIdType] = useState<"V" | "E" | "P">("V");
  const [pIdNumber, setPIdNumber] = useState("");
  const [pBirthDate, setPBirthDate] = useState("2014-05-10");
  const [pClubId, setPClubId] = useState("");
  const [pCategoryId, setPCategoryId] = useState("cat-sub-12");
  const [pJerseyNumber, setPJerseyNumber] = useState(10);
  const [pPosition, setPPosition] = useState<DBPlayer["position"]>("Ala");
  const [pStatus, setPStatus] = useState<PlayerStatus>("activo");

  // Atletas filtrados para el panel maestro
  const filteredAdminPlayers = useMemo(() => {
    return players.filter((p) => {
      const matchClub = playerClubFilter === "all" || p.clubId === playerClubFilter;
      const matchCat = playerCategoryFilter === "all" || p.categoryId === playerCategoryFilter;
      const q = playerSearchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        p.firstName.toLowerCase().includes(q) ||
        p.lastName.toLowerCase().includes(q) ||
        p.idNumber.toLowerCase().includes(q) ||
        p.clubName.toLowerCase().includes(q) ||
        String(p.jerseyNumber).includes(q);

      return matchClub && matchCat && matchQuery;
    });
  }, [players, playerClubFilter, playerCategoryFilter, playerSearchQuery]);

  const handleOpenEditPlayer = (p: DBPlayer) => {
    setEditingPlayer(p);
    setPFirstName(p.firstName);
    setPLastName(p.lastName);
    setPIdType(p.idType);
    setPIdNumber(p.idNumber);
    setPBirthDate(p.birthDate);
    setPClubId(p.clubId);
    setPCategoryId(p.categoryId);
    setPJerseyNumber(p.jerseyNumber);
    setPPosition(p.position);
    setPStatus(p.status);
    setIsPlayerModalOpen(true);
  };

  const handleOpenCreatePlayer = () => {
    setEditingPlayer(null);
    setPFirstName("");
    setPLastName("");
    setPIdType("V");
    setPIdNumber("");
    setPBirthDate("2014-05-10");
    setPClubId(playerClubFilter !== "all" ? playerClubFilter : clubs[0]?.id || "la-paz-futsal");
    setPCategoryId(playerCategoryFilter !== "all" ? playerCategoryFilter : "cat-sub-12");
    setPJerseyNumber(10);
    setPPosition("Ala");
    setPStatus("activo");
    setIsPlayerModalOpen(true);
  };

  const handleDeletePlayerAdmin = (p: DBPlayer) => {
    if (confirm(`¿Confirmas la eliminación definitiva del atleta ${p.firstName} ${p.lastName} (${p.clubName} - ${p.categoryName})? Esta acción desincorpora su registro de la base de datos.`)) {
      if (onDeletePlayer) {
        onDeletePlayer(p.id);
      }
    }
  };

  const handleSavePlayerAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const clubObj = clubs.find((c) => c.id === pClubId) || clubs[0];
    const catObj = categories.find((c) => c.id === pCategoryId) || categories[0];
    const birthYear = new Date(pBirthDate).getFullYear();

    if (editingPlayer) {
      const updated: DBPlayer = {
        ...editingPlayer,
        firstName: pFirstName,
        lastName: pLastName,
        idType: pIdType,
        idNumber: pIdNumber,
        birthDate: pBirthDate,
        birthYear,
        clubId: pClubId,
        clubName: clubObj?.name || pClubId,
        categoryId: pCategoryId,
        categoryName: catObj?.name || "Sub-12",
        jerseyNumber: pJerseyNumber,
        position: pPosition,
        status: pStatus,
        carnetNumber: editingPlayer.carnetNumber || `FM-26-${clubObj?.slug.toUpperCase().slice(0, 3)}-${catObj?.name.replace("-", "")}-${pJerseyNumber}`,
      };
      if (onUpdatePlayer) {
        onUpdatePlayer(updated);
      }
    } else {
      const created: DBPlayer = {
        id: `pl-${Date.now()}`,
        firstName: pFirstName,
        lastName: pLastName,
        idType: pIdType,
        idNumber: pIdNumber,
        birthDate: pBirthDate,
        birthYear,
        clubId: pClubId,
        clubName: clubObj?.name || pClubId,
        categoryId: pCategoryId,
        categoryName: catObj?.name || "Sub-12",
        jerseyNumber: pJerseyNumber,
        position: pPosition,
        status: pStatus,
        carnetNumber: `FM-26-${clubObj?.slug.toUpperCase().slice(0, 3)}-${catObj?.name.replace("-", "")}-${pJerseyNumber}`,
        enrolledTournaments: ["infantil-1ra-division"],
        photoUrl: "/placeholder-player.png",
        createdAt: new Date().toISOString(),
      };
      if (onAddPlayer) {
        onAddPlayer(created);
      } else if (onUpdatePlayer) {
        onUpdatePlayer(created);
      }
    }
    setIsPlayerModalOpen(false);
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

  // Estados para la gestión exclusiva de Árbitros (Regla 3)
  const [referees, setReferees] = useState<AppUser[]>([
    {
      id: "user-arbitro-01",
      email: "arbitro.colina@colegioarbitros.com",
      fullName: "Prof. José Colina",
      role: "arbitro",
      phone: "+58 416-5554321",
      cedula: "V-16.890.112",
      colegioArbitros: "Colegio de Árbitros de Futsal del Distrito Capital",
      createdAt: "2026-09-15T14:00:00Z",
    },
    {
      id: "user-arbitro-02",
      email: "ramon.rondon@colegioarbitros.com",
      fullName: "Prof. Ramón Rondón",
      role: "arbitro",
      phone: "+58 414-7771234",
      cedula: "V-14.230.998",
      colegioArbitros: "Comisión Arbitral Furia Menor",
      createdAt: "2026-10-01T11:00:00Z",
    },
  ]);
  const [newRefName, setNewRefName] = useState("");
  const [newRefEmail, setNewRefEmail] = useState("");
  const [newRefPhone, setNewRefPhone] = useState("");
  const [newRefCedula, setNewRefCedula] = useState("");
  const [newRefColegio, setNewRefColegio] = useState("Colegio de Árbitros de Futsal del Distrito Capital");
  const [refLoading, setRefLoading] = useState(false);
  const [refFeedback, setRefFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleCreateArbitro = async (e: React.FormEvent) => {
    e.preventDefault();
    setRefFeedback(null);
    setRefLoading(true);

    try {
      const res = await fetch("/api/admin/arbitros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: newRefName,
          email: newRefEmail,
          phone: newRefPhone,
          cedula: newRefCedula,
          colegioArbitros: newRefColegio,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setReferees((prev) => [data.arbitro, ...prev]);
        setRefFeedback({ type: "success", text: data.message || "Árbitro oficial acreditado con éxito." });
        setNewRefName("");
        setNewRefEmail("");
        setNewRefPhone("");
        setNewRefCedula("");
      } else {
        setRefFeedback({
          type: "error",
          text: data.message || "Error al crear el árbitro. Verifica permisos de administrador.",
        });
      }
    } catch {
      setRefFeedback({
        type: "error",
        text: "Error de comunicación con el endpoint de árbitros.",
      });
    } finally {
      setRefLoading(false);
    }
  };

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

      {/* 5. GESTIÓN INTEGRAL DE PLANTILLAS Y ATLETAS DE CLUBES (CONTROL MAESTRO ADMIN) */}
      <section className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-7 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider">
                  Gestión Integral de Plantillas y Atletas de Clubes
                </h3>
                <span className="rounded-full bg-red-500/20 text-red-400 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider border border-red-500/30">
                  Control Total
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Edición de fichas, corrección de dorsales, reasignación de categorías y desincorporación inmediata para cualquier club.
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenCreatePlayer}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-black text-white hover:bg-red-500 transition shadow-lg shadow-red-600/20 shrink-0"
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span>Fichar Nuevo Atleta</span>
          </button>
        </div>

        {/* Barra de Filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Selector de Club */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
              Filtrar por Club / Academia
            </label>
            <select
              value={playerClubFilter}
              onChange={(e) => setPlayerClubFilter(e.target.value)}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
            >
              <option value="all">Todos los Clubes ({clubs.length})</option>
              {clubs.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Selector de Categoría */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
              Filtrar por Categoría
            </label>
            <select
              value={playerCategoryFilter}
              onChange={(e) => setPlayerCategoryFilter(e.target.value)}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
            >
              <option value="all">Todas las Categorías ({categories.length})</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.division})
                </option>
              ))}
            </select>
          </div>

          {/* Búsqueda por Texto */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
              Buscar Atleta
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-500" />
              <input
                type="text"
                value={playerSearchQuery}
                onChange={(e) => setPlayerSearchQuery(e.target.value)}
                placeholder="Nombre, cédula o dorsal..."
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 pl-8 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Resumen de resultados */}
        <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
          <span>
            Mostrando <strong className="text-white">{filteredAdminPlayers.length}</strong> atletas federados
          </span>
          {(playerClubFilter !== "all" || playerCategoryFilter !== "all" || playerSearchQuery) && (
            <button
              onClick={() => {
                setPlayerClubFilter("all");
                setPlayerCategoryFilter("all");
                setPlayerSearchQuery("");
              }}
              className="text-red-400 hover:underline text-[11px] font-bold"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* VISTA MÓVIL: Tarjetas de Atletas */}
        <div className="block md:hidden space-y-3">
          {filteredAdminPlayers.length === 0 ? (
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-8 text-center text-xs text-neutral-500">
              No se encontraron atletas con los filtros seleccionados.
            </div>
          ) : (
            filteredAdminPlayers.map((player) => (
              <div
                key={player.id}
                className="rounded-2xl border border-neutral-800 bg-neutral-950/90 p-4 space-y-3 hover:border-neutral-700 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-10 w-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center font-mono font-black text-amber-400 text-sm shrink-0">
                      #{player.jerseyNumber}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">
                        {player.firstName} {player.lastName}
                      </h4>
                      <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                        {player.idType}-{player.idNumber || "Sin Cédula"}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider shrink-0 ${
                      player.status === "activo"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : player.status === "suspendido"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    {player.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-neutral-300">
                  <span className="rounded-lg bg-neutral-900 px-2 py-0.5 border border-neutral-800 font-bold text-white">
                    {player.clubName}
                  </span>
                  <span className="rounded-lg bg-neutral-900 px-2 py-0.5 border border-neutral-800 font-mono text-amber-400">
                    {player.categoryName}
                  </span>
                  <span className="rounded-lg bg-neutral-900 px-2 py-0.5 border border-neutral-800 text-neutral-400">
                    {player.position}
                  </span>
                </div>

                <div className="pt-2 border-t border-neutral-800/80 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPlayerForStats(player)}
                    className="flex-1 rounded-xl border border-red-500/30 bg-red-600/15 py-1.5 text-red-400 hover:bg-red-600 hover:text-white transition flex items-center justify-center gap-1 text-xs font-bold"
                  >
                    <BarChart3 className="h-3 w-3" />
                    <span>Expediente</span>
                  </button>

                  <button
                    onClick={() => handleOpenEditPlayer(player)}
                    className="rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-neutral-300 hover:text-white hover:border-neutral-500 transition text-xs font-bold flex items-center gap-1"
                  >
                    <Edit className="h-3 w-3" />
                    <span>Editar</span>
                  </button>

                  <button
                    onClick={() => handleDeletePlayerAdmin(player)}
                    className="rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-neutral-500 hover:text-red-400 hover:border-red-500/40 transition"
                    title="Eliminar atleta"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* VISTA ESCRITORIO: Tabla Completa de Atletas */}
        <div className="hidden md:block overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-950">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-800 bg-neutral-900 text-[10px] uppercase tracking-wider text-neutral-400">
              <tr>
                <th className="py-3 px-3 text-center w-12 font-black text-amber-400">DORSAL</th>
                <th className="py-3 px-4 font-black text-white">ATLETA</th>
                <th className="py-3 px-3 font-black text-neutral-300">CÉDULA / FICHA</th>
                <th className="py-3 px-3 font-black text-neutral-300">CLUB / ACADEMIA</th>
                <th className="py-3 px-3 font-black text-neutral-300">CATEGORÍA</th>
                <th className="py-3 px-3 font-black text-neutral-300">POSICIÓN</th>
                <th className="py-3 px-3 text-center font-black text-neutral-300">ESTATUS</th>
                <th className="py-3 px-4 text-right font-black text-neutral-300">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {filteredAdminPlayers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-neutral-500">
                    No se encontraron atletas federados con los filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredAdminPlayers.map((player) => (
                  <tr key={player.id} className="hover:bg-neutral-900/50 transition">
                    <td className="py-3 px-3 text-center font-mono font-black text-amber-400">
                      #{player.jerseyNumber}
                    </td>
                    <td className="py-3 px-4 font-bold text-white">
                      {player.firstName} {player.lastName}
                    </td>
                    <td className="py-3 px-3 font-mono text-neutral-400">
                      {player.idType}-{player.idNumber || "Sin Cédula"}
                    </td>
                    <td className="py-3 px-3 font-semibold text-neutral-200">
                      {player.clubName}
                    </td>
                    <td className="py-3 px-3 font-mono text-amber-400/90">
                      {player.categoryName}
                    </td>
                    <td className="py-3 px-3 text-neutral-400">
                      {player.position}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${
                          player.status === "activo"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : player.status === "suspendido"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-neutral-800 text-neutral-400"
                        }`}
                      >
                        {player.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedPlayerForStats(player)}
                          className="rounded-lg border border-red-500/30 bg-red-600/15 px-2 py-1 text-red-400 hover:bg-red-600 hover:text-white transition flex items-center gap-1 text-[11px] font-bold"
                          title="Ver expediente y estadísticas"
                        >
                          <BarChart3 className="h-3 w-3" />
                          <span>Expediente</span>
                        </button>

                        <button
                          onClick={() => handleOpenEditPlayer(player)}
                          className="rounded-lg border border-neutral-800 p-1 text-neutral-300 hover:text-white hover:border-neutral-600 transition"
                          title="Editar datos del atleta"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeletePlayerAdmin(player)}
                          className="rounded-lg border border-neutral-800 p-1 text-neutral-500 hover:text-red-400 hover:border-red-500/40 transition"
                          title="Eliminar atleta definitivamente"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. GESTIÓN EXCLUSIVA DE ÁRBITROS POR EL ADMIN (REGLA 3) */}
      <section className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-7 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Smartphone className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider">
                  Colegio de Árbitros & Jueces de Cancha
                </h3>
                <span className="hidden sm:inline-flex rounded-full bg-red-600/20 border border-red-500/30 px-2.5 py-0.5 text-[10px] font-black text-red-400">
                  Exclusivo Admin
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Acreditación oficial protegida por Middleware. Solo el Administrador General puede crear usuarios con el rol de 'árbitro'.
              </p>
            </div>
          </div>

          <span className="text-xs text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-xl self-start sm:self-auto font-mono font-bold">
            {referees.length} Árbitros Habilitados
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Formulario de Alta de Árbitro */}
          <div className="lg:col-span-5 rounded-2xl border border-neutral-800 bg-neutral-950/80 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2.5">
              <span className="text-xs font-black uppercase tracking-wider text-neutral-200 flex items-center gap-1.5">
                <UserCheck className="h-4 w-4 text-amber-400" />
                <span>Acreditar Nuevo Árbitro Oficial</span>
              </span>
              <span className="text-[10px] text-neutral-500">Rol: arbitro</span>
            </div>

            <form onSubmit={handleCreateArbitro} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-neutral-400 mb-1">
                  Nombre Completo y Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newRefName}
                  onChange={(e) => setNewRefName(e.target.value)}
                  placeholder="Ej. Prof. Williams Morales"
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">
                    Cédula de Identidad
                  </label>
                  <input
                    type="text"
                    value={newRefCedula}
                    onChange={(e) => setNewRefCedula(e.target.value)}
                    placeholder="V-14.890.300"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">
                    Teléfono Móvil
                  </label>
                  <input
                    type="text"
                    value={newRefPhone}
                    onChange={(e) => setNewRefPhone(e.target.value)}
                    placeholder="+58 412-1234567"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-400 mb-1">
                  Correo Electrónico Oficial <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={newRefEmail}
                  onChange={(e) => setNewRefEmail(e.target.value)}
                  placeholder="arbitro.morales@colegioarbitros.com"
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-400 mb-1">
                  Colegio o Asociación Arbitral
                </label>
                <select
                  value={newRefColegio}
                  onChange={(e) => setNewRefColegio(e.target.value)}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="Colegio de Árbitros de Futsal del Distrito Capital">
                    Colegio de Árbitros de Futsal del Distrito Capital
                  </option>
                  <option value="Comisión Arbitral Oficial Furia Menor">
                    Comisión Arbitral Oficial Furia Menor
                  </option>
                  <option value="Colegio de Árbitros del Estado Miranda">
                    Colegio de Árbitros del Estado Miranda
                  </option>
                  <option value="Juez de Mesa / Cronometrista Federado">
                    Juez de Mesa / Cronometrista Federado
                  </option>
                </select>
              </div>

              {refFeedback && (
                <div
                  className={`rounded-xl p-2.5 text-[11px] flex items-start gap-2 ${
                    refFeedback.type === "success"
                      ? "border border-emerald-500/40 bg-emerald-950/40 text-emerald-300"
                      : "border border-red-500/40 bg-red-950/40 text-red-300"
                  }`}
                >
                  {refFeedback.type === "success" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <span>{refFeedback.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={refLoading}
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 py-2.5 font-black text-black shadow-lg shadow-amber-500/20 transition disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              >
                <span>{refLoading ? "Acreditando..." : "Crear y Habilitar Árbitro"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

          {/* Listado de Árbitros Oficiales Registrados */}
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-neutral-400 block mb-1">
              Padrón de Árbitros Habilitados para Asignación en Cancha
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {referees.map((ref) => {
                const assignedMatchesCount = matches.filter(
                  (m) => m.refereeName?.toLowerCase() === ref.fullName.toLowerCase()
                ).length;

                return (
                  <div
                    key={ref.id}
                    className="rounded-2xl border border-neutral-800 bg-neutral-950/90 p-4 space-y-3 hover:border-neutral-700 transition"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-white">{ref.fullName}</span>
                          <span className="rounded-full bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 text-[9px] font-bold">
                            Activo
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-0.5 font-mono">{ref.email}</p>
                      </div>
                      <div className="h-7 w-7 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                        <Smartphone className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    <div className="space-y-1 text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/80">
                      <p className="truncate">
                        <strong className="text-neutral-300">Colegio:</strong>{" "}
                        {ref.colegioArbitros || "Distrito Capital"}
                      </p>
                      <p>
                        <strong className="text-neutral-300">Cédula:</strong>{" "}
                        {ref.cedula || "No indicada"} ·{" "}
                        <strong className="text-neutral-300">Tel:</strong> {ref.phone || "No indicado"}
                      </p>
                      <div className="flex items-center justify-between pt-1 text-[10px]">
                        <span className="text-amber-400 font-bold">
                          {assignedMatchesCount > 0
                            ? `${assignedMatchesCount} partidos asignados`
                            : "Disponible para designación"}
                        </span>
                        <span className="text-neutral-500 font-mono">Rol: arbitro</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. MODAL DE EDICIÓN / PROGRAMACIÓN DE PARTIDO */}
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

      {/* 7. MODAL DE EDICIÓN / FICHAJE DE ATLETA (ADMIN TOTAL) */}
      {isPlayerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="w-full max-w-lg rounded-3xl border border-neutral-800 bg-neutral-900 p-6 sm:p-7 shadow-2xl space-y-4 my-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center">
                  <UserPlus className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">
                    {editingPlayer ? "Editar Ficha de Atleta (Control Maestro)" : "Fichar Nuevo Atleta (Admin Total)"}
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Modificación con jerarquía máxima sobre la base de datos de atletas.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPlayerModalOpen(false)}
                className="text-neutral-500 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePlayerAdmin} className="space-y-4 text-xs">
              {/* Nombres y Apellidos */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Nombres</label>
                  <input
                    type="text"
                    required
                    value={pFirstName}
                    onChange={(e) => setPFirstName(e.target.value)}
                    placeholder="Ej: Daniel Jesús"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Apellidos</label>
                  <input
                    type="text"
                    required
                    value={pLastName}
                    onChange={(e) => setPLastName(e.target.value)}
                    placeholder="Ej: González Pérez"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
                  />
                </div>
              </div>

              {/* Asignación de Club y Categoría */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Club / Academia</label>
                  <select
                    value={pClubId}
                    onChange={(e) => setPClubId(e.target.value)}
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
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Categoría</label>
                  <select
                    value={pCategoryId}
                    onChange={(e) => setPCategoryId(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({cat.division})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Identificación (Cédula) */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Tipo</label>
                  <select
                    value={pIdType}
                    onChange={(e) => setPIdType(e.target.value as "V" | "E" | "P")}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-2 py-2 text-white"
                  >
                    <option value="V">V- (Venezolano)</option>
                    <option value="E">E- (Extranjero)</option>
                    <option value="P">P- (Pasaporte)</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Número de Cédula</label>
                  <input
                    type="text"
                    required
                    value={pIdNumber}
                    onChange={(e) => setPIdNumber(e.target.value)}
                    placeholder="Ej: 32456789"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              {/* Fecha de Nacimiento, Dorsal y Posición */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">F. Nacimiento</label>
                  <input
                    type="date"
                    required
                    value={pBirthDate}
                    onChange={(e) => setPBirthDate(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-2 py-2 text-white text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Dorsal (#)</label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    required
                    value={pJerseyNumber}
                    onChange={(e) => setPJerseyNumber(Number(e.target.value))}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white font-mono font-bold text-center"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Posición</label>
                  <select
                    value={pPosition}
                    onChange={(e) => setPPosition(e.target.value as DBPlayer["position"])}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-2 py-2 text-white"
                  >
                    <option value="Portero">Portero</option>
                    <option value="Cierre">Cierre</option>
                    <option value="Ala">Ala</option>
                    <option value="Pívot">Pívot</option>
                    <option value="Defensa">Defensa</option>
                    <option value="Medio">Medio</option>
                    <option value="Delantero">Delantero</option>
                  </select>
                </div>
              </div>

              {/* Estatus del Atleta */}
              <div>
                <label className="block text-[11px] font-bold text-neutral-400 mb-1">Estatus Federativo</label>
                <div className="grid grid-cols-4 gap-2">
                  {(["activo", "inactivo", "suspendido", "lesionado"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setPStatus(st)}
                      className={`rounded-xl border py-2 text-center text-xs font-bold capitalize transition ${
                        pStatus === st
                          ? st === "activo"
                            ? "border-emerald-500 bg-emerald-950 text-emerald-300 font-black"
                            : st === "suspendido"
                            ? "border-red-500 bg-red-950 text-red-300 font-black"
                            : st === "lesionado"
                            ? "border-amber-500 bg-amber-950 text-amber-300 font-black"
                            : "border-neutral-500 bg-neutral-800 text-white font-black"
                          : "border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlayerModalOpen(false)}
                  className="rounded-xl border border-neutral-800 px-4 py-2 font-bold text-neutral-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-red-600 px-5 py-2 font-black text-white hover:bg-red-500 shadow-lg shadow-red-600/30 transition"
                >
                  {editingPlayer ? "Guardar Cambios del Atleta" : "Registrar y Fichar Atleta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE EXPEDIENTE INDIVIDUAL DEL ATLETA */}
      {selectedPlayerForStats && (
        <PlayerStatsModal
          isOpen={!!selectedPlayerForStats}
          onClose={() => setSelectedPlayerForStats(null)}
          player={selectedPlayerForStats}
          onUpdatePlayer={onUpdatePlayer || (() => {})}
        />
      )}
    </div>
  );
}
