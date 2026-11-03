"use client";

import React, { useState, useMemo } from "react";
import {
  DBPlayer,
  DBCategory,
  DBClub,
  AppUser,
  AgeValidationResult,
} from "@/types/auth-roles";
import {
  validatePlayerAge,
  DB_CATEGORIES,
  OFFICIAL_TOURNAMENTS,
} from "@/lib/db-store";
import { PlayerStatsModal } from "./player-stats-modal";
import {
  UserPlus,
  Shield,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Edit,
  UserCheck,
  Search,
  Filter,
  FileCheck,
  Award,
  Layers,
  ArrowRight,
  Flame,
  Trophy,
  BarChart3,
} from "lucide-react";

interface DelegadoViewProps {
  user: AppUser;
  club: DBClub;
  players: DBPlayer[];
  onAddPlayer: (player: DBPlayer) => void;
  onUpdatePlayer: (player: DBPlayer) => void;
  onDeletePlayer: (playerId: string) => void;
}

export function DelegadoView({
  user,
  club,
  players,
  onAddPlayer,
  onUpdatePlayer,
  onDeletePlayer,
}: DelegadoViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);

  // Expediente individual del jugador
  const [selectedPlayerForStats, setSelectedPlayerForStats] = useState<DBPlayer | null>(null);

  // Formulario de Fichaje
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idType, setIdType] = useState<"V" | "E" | "P">("V");
  const [idNumber, setIdNumber] = useState("");
  const [birthDate, setBirthDate] = useState("2014-05-10");
  const [categoryId, setCategoryId] = useState("cat-sub-12");
  const [jerseyNumber, setJerseyNumber] = useState(10);
  const [position, setPosition] = useState<DBPlayer["position"]>("Ala");
  const [status, setStatus] = useState<DBPlayer["status"]>("activo");
  const [enrolledTournaments, setEnrolledTournaments] = useState<string[]>([
    "infantil-1ra-division",
  ]);

  // Validación de edad en tiempo real mientras el delegado escribe
  const ageValidation: AgeValidationResult = useMemo(() => {
    return validatePlayerAge(birthDate, categoryId);
  }, [birthDate, categoryId]);

  // Filtrar jugadores del club
  const clubPlayers = useMemo(() => {
    return players.filter((p) => p.clubId === club.id);
  }, [players, club.id]);

  const filteredPlayers = useMemo(() => {
    return clubPlayers.filter((p) => {
      const matchCat = selectedCategory === "all" || p.categoryId === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        p.firstName.toLowerCase().includes(query) ||
        p.lastName.toLowerCase().includes(query) ||
        p.idNumber.includes(query) ||
        p.carnetNumber.toLowerCase().includes(query);
      return matchCat && matchSearch;
    });
  }, [clubPlayers, selectedCategory, searchQuery]);

  // Alternar selección de torneos (multi-torneo)
  const handleToggleTournament = (tId: string) => {
    setEnrolledTournaments((prev) => {
      if (prev.includes(tId)) {
        if (prev.length === 1) return prev; // Mantener al menos un torneo
        return prev.filter((id) => id !== tId);
      } else {
        return [...prev, tId];
      }
    });
  };

  // Abrir modal para crear
  const handleOpenCreateModal = () => {
    setEditingPlayerId(null);
    setFirstName("");
    setLastName("");
    setIdNumber("");
    setBirthDate("2014-05-10");
    setCategoryId("cat-sub-12");
    setJerseyNumber(10);
    setPosition("Ala");
    setStatus("activo");
    setEnrolledTournaments(["infantil-1ra-division"]);
    setIsModalOpen(true);
  };

  // Abrir modal para editar
  const handleOpenEditModal = (player: DBPlayer) => {
    setEditingPlayerId(player.id);
    setFirstName(player.firstName);
    setLastName(player.lastName);
    setIdType(player.idType);
    setIdNumber(player.idNumber);
    setBirthDate(player.birthDate);
    setCategoryId(player.categoryId);
    setJerseyNumber(player.jerseyNumber);
    setPosition(player.position);
    setStatus(player.status);
    setEnrolledTournaments(
      player.enrolledTournaments && player.enrolledTournaments.length > 0
        ? player.enrolledTournaments
        : ["infantil-1ra-division"]
    );
    setIsModalOpen(true);
  };

  // Guardar fichaje
  const handleSubmitPlayer = (e: React.FormEvent) => {
    e.preventDefault();

    if (!ageValidation.isValid) {
      alert(`Error en el fichaje: ${ageValidation.message}`);
      return;
    }

    const cat = DB_CATEGORIES.find((c) => c.id === categoryId);
    const categoryName = cat?.name || "Sub-12";
    const birthYear = new Date(birthDate).getFullYear();

    if (editingPlayerId) {
      const existing = clubPlayers.find((p) => p.id === editingPlayerId);
      const updated: DBPlayer = {
        ...existing,
        id: editingPlayerId,
        clubId: club.id,
        clubName: club.name,
        categoryId,
        categoryName,
        firstName,
        lastName,
        idType,
        idNumber,
        birthDate,
        birthYear,
        jerseyNumber,
        position,
        carnetNumber: `FM-26-${club.slug.toUpperCase().slice(0, 3)}-${categoryName.replace("-", "")}-${jerseyNumber}`,
        status,
        enrolledTournaments,
        createdAt: existing?.createdAt || new Date().toISOString(),
      };
      onUpdatePlayer(updated);
    } else {
      const newPlayer: DBPlayer = {
        id: `player-${Date.now()}`,
        clubId: club.id,
        clubName: club.name,
        categoryId,
        categoryName,
        firstName,
        lastName,
        idType,
        idNumber,
        birthDate,
        birthYear,
        jerseyNumber,
        position,
        carnetNumber: `FM-26-${club.slug.toUpperCase().slice(0, 3)}-${categoryName.replace("-", "")}-${jerseyNumber}`,
        status,
        enrolledTournaments,
        tournamentRecords: enrolledTournaments.map((tId) => {
          const tObj = OFFICIAL_TOURNAMENTS.find((t) => t.id === tId);
          return {
            tournamentId: tId,
            tournamentName: tObj?.name || tId,
            categoryName,
            enrolledAt: new Date().toISOString().split("T")[0],
            status: "habilitado",
            matchesPlayed: 0,
            goals: 0,
            yellowCards: 0,
            redCards: 0,
            minutesPlayed: 0,
          };
        }),
        matchLogs: [],
        createdAt: new Date().toISOString(),
      };
      onAddPlayer(newPlayer);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* 1. CABECERA DEL CLUB DELEGADO */}
      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 h-40 w-40 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="h-16 w-16 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-red-500 font-black text-2xl shadow-inner shrink-0 mx-auto sm:mx-0">
              {club.logoUrl ? (
                <img src={club.logoUrl} alt={club.name} className="h-12 w-12 rounded-full object-contain" />
              ) : (
                club.name.slice(0, 2).toUpperCase()
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="rounded-full bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 text-[10px] font-black text-red-400 uppercase tracking-wider">
                  Módulo de Delegado de Club
                </span>
                <span className="text-xs text-neutral-400 font-medium">
                  {club.municipality}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white">{club.name}</h2>
              <p className="text-xs text-neutral-400">
                Delegado oficial: <strong className="text-white">{user.fullName}</strong> • C.I. {user.cedula}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 w-full sm:w-auto">
            <button
              onClick={handleOpenCreateModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-600/30 hover:bg-red-500 transition w-full sm:w-auto"
            >
              <UserPlus className="h-4 w-4" />
              <span>Fichar Nuevo Atleta</span>
            </button>
          </div>
        </div>

        {/* Métricas del Club */}
        <div className="mt-6 pt-5 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-3">
            <span className="text-[10px] uppercase font-bold text-neutral-400">Atletas Federados</span>
            <p className="text-xl font-black text-white mt-0.5">{clubPlayers.length}</p>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-3">
            <span className="text-[10px] uppercase font-bold text-emerald-400">Activos Habilitados</span>
            <p className="text-xl font-black text-emerald-400 mt-0.5">
              {clubPlayers.filter((p) => p.status === "activo").length}
            </p>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-3">
            <span className="text-[10px] uppercase font-bold text-amber-400">Categorías Inscritas</span>
            <p className="text-xl font-black text-amber-400 mt-0.5">
              {new Set(clubPlayers.map((p) => p.categoryName)).size || 6}
            </p>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-3">
            <span className="text-[10px] uppercase font-bold text-blue-400">Sede Oficial</span>
            <p className="text-xs font-bold text-neutral-200 mt-1 truncate">
              {club.zoneDetail.split("·")[0]}
            </p>
          </div>
        </div>
      </div>

      {/* 2. BARRA DE FILTROS & BÚSQUEDA */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-black text-white uppercase tracking-wider">
            <Filter className="h-4 w-4 text-red-400" />
            <span>Filtro de Plantillas por Categoría</span>
          </div>
          <span className="text-xs text-neutral-400">
            Mostrando <strong className="text-white">{filteredPlayers.length}</strong> atletas de {club.name}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {/* Selector de Categorías */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white"
              }`}
            >
              Todas las Categorías
            </button>
            {DB_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Búsqueda por Cédula o Nombre */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-3.5 w-3.5 text-neutral-500" />
            <input
              type="text"
              placeholder="Buscar por nombre, apellido, cédula o carnet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-950 pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-red-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 3. LISTADO DE ATLETAS DEL CLUB: VISTA MÓVIL (TARJETAS) Y ESCRITORIO (TABLA) */}
      
      {/* VISTA MÓVIL (md:hidden): Tarjetas centradas, táctiles y ordenadas */}
      <div className="md:hidden space-y-3">
        {filteredPlayers.length === 0 ? (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-8 text-center text-neutral-500 text-xs">
            No hay atletas registrados en esta categoría para {club.name}.
          </div>
        ) : (
          filteredPlayers.map((player) => (
            <div
              key={player.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-4 space-y-3 shadow-lg"
            >
              {/* Cabecera del atleta en tarjeta */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/20 text-red-400 font-black text-sm border border-red-500/30 shrink-0">
                    #{player.jerseyNumber}
                  </span>
                  <div>
                    <h4 className="font-black text-white text-sm">
                      {player.firstName} {player.lastName}
                    </h4>
                    <p className="text-[11px] font-mono text-neutral-400">
                      {player.idType}-{player.idNumber} • Nac. {player.birthYear}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase shrink-0 ${
                    player.status === "activo"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                      : player.status === "suspendido"
                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                      : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {player.status}
                </span>
              </div>

              {/* Categoría y Posición */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-800/80 text-xs">
                <span className="rounded-lg bg-neutral-950 border border-neutral-800 px-2 py-0.5 text-[10px] font-bold text-neutral-300">
                  {player.categoryName}
                </span>
                <span className="rounded-lg bg-neutral-950 border border-neutral-800 px-2 py-0.5 text-[10px] font-semibold text-neutral-300">
                  {player.position}
                </span>
                <span className="text-[10px] font-mono text-neutral-500">
                  {player.carnetNumber}
                </span>
              </div>

              {/* Torneos Inscritos (Multi-Torneo) */}
              <div className="pt-2 border-t border-neutral-800/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                  Torneos Inscritos:
                </span>
                <div className="flex flex-wrap gap-1">
                  {player.enrolledTournaments && player.enrolledTournaments.length > 0 ? (
                    player.enrolledTournaments.map((tId) => {
                      const tObj = OFFICIAL_TOURNAMENTS.find((t) => t.id === tId);
                      return (
                        <span
                          key={tId}
                          className="rounded bg-neutral-950 border border-neutral-800 px-2 py-0.5 text-[9px] font-bold text-red-400"
                        >
                          {tObj?.shortName || tId}
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-[10px] text-neutral-500">1era Div Menor</span>
                  )}
                </div>
              </div>

              {/* Acciones principales móviles */}
              <div className="flex items-center gap-2 pt-2 border-t border-neutral-800/80">
                <button
                  onClick={() => setSelectedPlayerForStats(player)}
                  className="flex-1 rounded-xl border border-red-500/40 bg-red-600/15 py-2 text-red-400 hover:bg-red-600 hover:text-white transition flex items-center justify-center gap-1.5 text-xs font-bold shadow-sm"
                >
                  <BarChart3 className="h-3.5 w-3.5" />
                  <span>Expediente</span>
                </button>

                <button
                  onClick={() => handleOpenEditModal(player)}
                  className="rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-300 hover:text-white transition text-xs font-bold flex items-center gap-1"
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span>Editar</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm(`¿Eliminar a ${player.firstName} ${player.lastName}?`)) {
                      onDeletePlayer(player.id);
                    }
                  }}
                  className="rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-neutral-500 hover:text-red-400 hover:border-red-500/40 transition"
                  title="Eliminar registro"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* VISTA ESCRITORIO (hidden md:block): Tabla Completa de Atletas */}
      <div className="hidden md:block overflow-x-auto rounded-3xl border border-neutral-800 bg-neutral-950 shadow-xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="border-b border-neutral-800 bg-neutral-900/80 text-[10px] uppercase tracking-wider text-neutral-400">
            <tr>
              <th className="py-3 px-3 text-center w-12">#</th>
              <th className="py-3 px-4">Atleta</th>
              <th className="py-3 px-3">Cédula / Ficha</th>
              <th className="py-3 px-3">Categoría</th>
              <th className="py-3 px-3">Posición</th>
              <th className="py-3 px-3 text-center">Año Nac.</th>
              <th className="py-3 px-3">Torneos Inscritos</th>
              <th className="py-3 px-3 text-center">Estatus</th>
              <th className="py-3 px-3 text-right">Acciones y Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {filteredPlayers.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-neutral-500">
                  No hay atletas registrados en esta categoría para {club.name}.
                </td>
              </tr>
            ) : (
              filteredPlayers.map((player) => (
                <tr key={player.id} className="transition hover:bg-neutral-900/60">
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-neutral-800 font-black text-xs text-white border border-neutral-700">
                      {player.jerseyNumber}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-white">
                    {player.firstName} {player.lastName}
                  </td>
                  <td className="py-3 px-3 font-mono text-neutral-400 text-xs">
                    {player.idType}-{player.idNumber}
                  </td>
                  <td className="py-3 px-3">
                    <span className="rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-[10px] font-bold text-neutral-300">
                      {player.categoryName}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-[10px] font-semibold text-neutral-300">
                      {player.position}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center text-neutral-300 font-medium">
                    {player.birthYear}
                  </td>

                  {/* Badges de Torneos de Participación (Multi-Torneo) */}
                  <td className="py-3 px-3">
                    <div className="flex flex-wrap gap-1 max-w-[190px]">
                      {player.enrolledTournaments && player.enrolledTournaments.length > 0 ? (
                        player.enrolledTournaments.map((tId) => {
                          const tObj = OFFICIAL_TOURNAMENTS.find((t) => t.id === tId);
                          return (
                            <span
                              key={tId}
                              className="rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-[9px] font-bold text-red-400"
                              title={tObj?.name || tId}
                            >
                              {tObj?.shortName || tId}
                            </span>
                          );
                        })
                      ) : (
                        <span className="text-[10px] text-neutral-500">1era Div Menor</span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        player.status === "activo"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : player.status === "suspendido"
                          ? "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                          : "bg-neutral-800 text-neutral-400"
                      }`}
                    >
                      {player.status}
                    </span>
                  </td>

                  {/* Acciones: Expediente, Editar, Eliminar */}
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedPlayerForStats(player)}
                        className="rounded-xl border border-red-500/30 bg-red-600/15 px-2.5 py-1.5 text-red-400 hover:bg-red-600 hover:text-white transition flex items-center gap-1.5 text-xs font-bold shadow-sm"
                        title="Control individual por torneo y por período"
                      >
                        <BarChart3 className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Expediente</span>
                      </button>

                      <button
                        onClick={() => handleOpenEditModal(player)}
                        className="rounded-xl border border-neutral-800 p-1.5 text-neutral-400 hover:text-white hover:border-neutral-600 transition"
                        title="Editar ficha del atleta"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar a ${player.firstName} ${player.lastName}?`)) {
                            onDeletePlayer(player.id);
                          }
                        }}
                        className="rounded-xl border border-neutral-800 p-1.5 text-neutral-500 hover:text-red-400 hover:border-red-500/40 transition"
                        title="Eliminar registro"
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

      {/* 4. MODAL DE FICHAJE CON SELECCIÓN MULTI-TORNEO & VALIDACIÓN DE EDAD */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="w-full max-w-lg rounded-3xl border border-neutral-800 bg-neutral-900 p-6 sm:p-7 shadow-2xl space-y-4 my-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center border border-red-500/30">
                  <UserPlus className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">
                    {editingPlayerId ? "Editar Ficha de Atleta" : "Fichar Nuevo Atleta"}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Club: {club.name} • Temporada 2026
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-500 hover:text-white text-xs font-bold"
              >
                ✕ Cerrar
              </button>
            </div>

            <form onSubmit={handleSubmitPlayer} className="space-y-3.5 text-xs">
              {/* Nombres y Apellidos */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 mb-1">Nombre</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ej. Lucas"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white placeholder-neutral-600 focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 mb-1">Apellido</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Ej. Gil"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white placeholder-neutral-600 focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Cédula y Tipo */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 mb-1">Tipo</label>
                  <select
                    value={idType}
                    onChange={(e) => setIdType(e.target.value as any)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white focus:border-red-500 focus:outline-none"
                  >
                    <option value="V">V - Venezolano</option>
                    <option value="E">E - Extranjero</option>
                    <option value="P">P - Pasaporte</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[11px] font-bold text-neutral-300 mb-1">Número de Documento</label>
                  <input
                    type="text"
                    required
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    placeholder="Ej. 37100201"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white placeholder-neutral-600 focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Categoría y Fecha de Nacimiento */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 mb-1">Categoría</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white focus:border-red-500 focus:outline-none"
                  >
                    {DB_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.minBirthYear}-{c.maxBirthYear})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 mb-1">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    required
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* CARD DE VALIDACIÓN DE EDAD AUTOMÁTICA */}
              <div
                className={`rounded-2xl p-3 border flex items-start gap-2.5 transition ${
                  ageValidation.isValid
                    ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300"
                    : "bg-rose-950/30 border-rose-500/40 text-rose-300"
                }`}
              >
                {ageValidation.isValid ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                )}
                <div>
                  <p className="font-bold text-[11px]">
                    {ageValidation.isValid ? "Validación de Edad Aprobada" : "Incompatibilidad de Edad"}
                  </p>
                  <p className="text-[10px] mt-0.5 leading-relaxed opacity-90">
                    {ageValidation.message}
                  </p>
                </div>
              </div>

              {/* SECCIÓN MULTI-TORNEO: SELECCIÓN EN CUÁLES TORNEOS PARTICIPARÁ */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold text-neutral-300">
                    Torneos en los que Participará (Selección Múltiple):
                  </label>
                  <span className="text-[10px] text-amber-400 font-bold">
                    {enrolledTournaments.length} seleccionado(s)
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400 leading-snug">
                  El atleta puede competir en múltiples torneos simultáneamente. Marca todas las competiciones donde participará:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 rounded-2xl bg-neutral-950 border border-neutral-800 max-h-44 overflow-y-auto">
                  {OFFICIAL_TOURNAMENTS.map((t) => {
                    const isEnrolled = enrolledTournaments.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => handleToggleTournament(t.id)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition ${
                          isEnrolled
                            ? "border-red-500 bg-red-600/15 text-white"
                            : "border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700"
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <p className="font-bold text-[11px] truncate">{t.name}</p>
                          <p className="text-[9px] text-neutral-400">{t.division} • {t.season}</p>
                        </div>
                        <span
                          className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 text-[10px] font-bold ${
                            isEnrolled
                              ? "border-red-500 bg-red-600 text-white"
                              : "border-neutral-700 bg-neutral-950"
                          }`}
                        >
                          {isEnrolled && "✓"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dorsal, Posición y Estatus */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 mb-1">Dorsal</label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    required
                    value={jerseyNumber}
                    onChange={(e) => setJerseyNumber(parseInt(e.target.value) || 1)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 mb-1">Posición</label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value as any)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white focus:border-red-500 focus:outline-none"
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
                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 mb-1">Estatus</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white focus:border-red-500 focus:outline-none"
                  >
                    <option value="activo">Activo</option>
                    <option value="suspendido">Suspendido</option>
                    <option value="lesionado">Lesionado</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
              </div>

              {/* Botón de Envío */}
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
                  disabled={!ageValidation.isValid}
                  className="rounded-xl bg-red-600 px-5 py-2 font-black text-white hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-red-600/30 transition"
                >
                  {editingPlayerId ? "Guardar Cambios" : "Completar Fichaje"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. MODAL DE EXPEDIENTE INTEGRAL Y CONTROL HISTÓRICO DEL JUGADOR */}
      {selectedPlayerForStats && (
        <PlayerStatsModal
          player={selectedPlayerForStats}
          isOpen={!!selectedPlayerForStats}
          onClose={() => setSelectedPlayerForStats(null)}
          onUpdatePlayer={(updatedPlayer) => {
            onUpdatePlayer(updatedPlayer);
            setSelectedPlayerForStats(updatedPlayer);
          }}
        />
      )}
    </div>
  );
}
