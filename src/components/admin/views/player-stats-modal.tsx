"use client";

import React, { useState, useMemo } from "react";
import {
  DBPlayer,
  PlayerTournamentRecord,
  PlayerMatchLog,
} from "@/types/auth-roles";
import {
  OFFICIAL_TOURNAMENTS,
  filterPlayerStats,
} from "@/lib/db-store";
import {
  Trophy,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Award,
  Filter,
  Plus,
  BarChart3,
  TrendingUp,
  FileText,
  UserCheck,
  ChevronRight,
  Shield,
} from "lucide-react";

interface PlayerStatsModalProps {
  player: DBPlayer | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdatePlayer: (updatedPlayer: DBPlayer) => void;
}

export function PlayerStatsModal({
  player,
  isOpen,
  onClose,
  onUpdatePlayer,
}: PlayerStatsModalProps) {
  if (!isOpen || !player) return null;

  const [activeTab, setActiveTab] = useState<"tournaments" | "period" | "new_log">("tournaments");

  // Filtros de período de tiempo
  const [selectedTournamentFilter, setSelectedTournamentFilter] = useState<string>("all");
  const [periodPreset, setPeriodPreset] = useState<"all" | "30days" | "6months" | "2026" | "custom">("all");
  const [startDate, setStartDate] = useState<string>("2026-10-01");
  const [endDate, setEndDate] = useState<string>("2026-11-03");

  // Formulario de nueva actuación
  const [newLogTournamentId, setNewLogTournamentId] = useState<string>(
    player.enrolledTournaments[0] || OFFICIAL_TOURNAMENTS[0].id
  );
  const [newLogDate, setNewLogDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [newLogRival, setNewLogRival] = useState<string>("DVO Paraíso");
  const [newLogResult, setNewLogResult] = useState<string>("3 - 2 (Victoria)");
  const [newLogMinutes, setNewLogMinutes] = useState<number>(40);
  const [newLogGoals, setNewLogGoals] = useState<number>(1);
  const [newLogYellow, setNewLogYellow] = useState<number>(0);
  const [newLogRed, setNewLogRed] = useState<number>(0);

  // Estadísticas filtradas dinámicamente según el período elegido
  const periodStats = useMemo(() => {
    return filterPlayerStats(player, {
      tournamentId: selectedTournamentFilter,
      periodPreset,
      startDate: periodPreset === "custom" ? startDate : undefined,
      endDate: periodPreset === "custom" ? endDate : undefined,
    });
  }, [player, selectedTournamentFilter, periodPreset, startDate, endDate]);

  // Manejador para agregar una nueva actuación en la bitácora
  const handleAddNewMatchLog = (e: React.FormEvent) => {
    e.preventDefault();

    const tObj = OFFICIAL_TOURNAMENTS.find((t) => t.id === newLogTournamentId);
    const tournamentName = tObj?.name || "Torneo Oficial";

    const newLog: PlayerMatchLog = {
      id: `log-${Date.now()}`,
      matchId: `m-${Date.now()}`,
      date: newLogDate,
      tournamentId: newLogTournamentId,
      tournamentName,
      rivalClubName: newLogRival,
      result: newLogResult,
      minutes: Number(newLogMinutes),
      goals: Number(newLogGoals),
      yellowCards: Number(newLogYellow),
      redCards: Number(newLogRed),
    };

    const currentLogs = player.matchLogs || [];
    const updatedLogs = [newLog, ...currentLogs];

    // Actualizar o crear registro acumulado por torneo
    const currentRecords = player.tournamentRecords ? [...player.tournamentRecords] : [];
    const existingRecIndex = currentRecords.findIndex((r) => r.tournamentId === newLogTournamentId);

    if (existingRecIndex >= 0) {
      const rec = currentRecords[existingRecIndex];
      currentRecords[existingRecIndex] = {
        ...rec,
        matchesPlayed: rec.matchesPlayed + 1,
        goals: rec.goals + Number(newLogGoals),
        yellowCards: rec.yellowCards + Number(newLogYellow),
        redCards: rec.redCards + Number(newLogRed),
        minutesPlayed: rec.minutesPlayed + Number(newLogMinutes),
      };
    } else {
      currentRecords.push({
        tournamentId: newLogTournamentId,
        tournamentName,
        categoryName: player.categoryName,
        enrolledAt: newLogDate,
        status: "habilitado",
        matchesPlayed: 1,
        goals: Number(newLogGoals),
        yellowCards: Number(newLogYellow),
        redCards: Number(newLogRed),
        minutesPlayed: Number(newLogMinutes),
      });
    }

    // Asegurar que el torneo esté en enrolledTournaments
    const updatedEnrolled = Array.from(new Set([...player.enrolledTournaments, newLogTournamentId]));

    const updatedPlayer: DBPlayer = {
      ...player,
      enrolledTournaments: updatedEnrolled,
      tournamentRecords: currentRecords,
      matchLogs: updatedLogs,
    };

    onUpdatePlayer(updatedPlayer);
    setActiveTab("period");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-3xl rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden my-6">
        {/* 1. CABECERA DEL EXPEDIENTE DEL ATLETA */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 p-5 sm:p-6 border-b border-neutral-800 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="h-14 w-14 rounded-2xl bg-neutral-950 border border-neutral-700 flex items-center justify-center text-xl font-black text-white shadow-inner shrink-0 mx-auto sm:mx-0">
                {player.jerseyNumber}
              </div>
              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="rounded-full bg-red-600/20 text-red-400 border border-red-500/30 px-2.5 py-0.5 text-[10px] font-black uppercase">
                    {player.categoryName}
                  </span>
                  <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-[10px] font-semibold text-neutral-300">
                    Posición: {player.position}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {player.carnetNumber}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {player.firstName} {player.lastName}
                </h2>
                <p className="text-xs text-neutral-400">
                  {player.clubName} • C.I. {player.idType}-{player.idNumber} • Nac. {player.birthYear} ({player.birthDate})
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white text-xs font-bold self-center sm:self-auto bg-neutral-800/80 hover:bg-neutral-800 px-3 py-1.5 rounded-xl border border-neutral-700 transition"
            >
              ✕ Cerrar
            </button>
          </div>

          {/* PESTAÑAS DE NAVEGACIÓN */}
          <div className="flex items-center gap-1.5 mt-5 pt-3 border-t border-neutral-800/80 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveTab("tournaments")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
                activeTab === "tournaments"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
              }`}
            >
              <Trophy className="h-3.5 w-3.5" />
              <span className="sm:hidden">Por Torneo</span>
              <span className="hidden sm:inline">Control Individual por Torneo ({player.enrolledTournaments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("period")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
                activeTab === "period"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span className="sm:hidden">Por Períodos</span>
              <span className="hidden sm:inline">Control por Períodos a Medida</span>
            </button>

            <button
              onClick={() => setActiveTab("new_log")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === "new_log"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
              }`}
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="sm:hidden">Registrar</span>
              <span className="hidden sm:inline">Registrar Actuación</span>
            </button>
          </div>
        </div>

        {/* 2. CONTENIDO SEGÚN LA PESTAÑA */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* ========================================================================= */}
          {/* PESTAÑA 1: CONTROL INDIVIDUAL POR TORNEO */}
          {/* ========================================================================= */}
          {activeTab === "tournaments" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    Torneos Oficiales en Competencia
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Desglose de rendimiento particular del atleta en cada liga o copa inscrita
                  </p>
                </div>
              </div>

              <div className="grid gap-3.5">
                {player.enrolledTournaments.map((tId) => {
                  const tObj = OFFICIAL_TOURNAMENTS.find((t) => t.id === tId);
                  const record = player.tournamentRecords?.find((r) => r.tournamentId === tId) || {
                    tournamentId: tId,
                    tournamentName: tObj?.name || tId,
                    categoryName: player.categoryName,
                    enrolledAt: "2026-09-15",
                    status: "habilitado" as const,
                    matchesPlayed: 0,
                    goals: 0,
                    yellowCards: 0,
                    redCards: 0,
                    minutesPlayed: 0,
                  };

                  const gPerMatch = record.matchesPlayed > 0
                    ? (record.goals / record.matchesPlayed).toFixed(2)
                    : "0.00";

                  return (
                    <div
                      key={tId}
                      className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-4.5 space-y-3.5 shadow-md hover:border-neutral-700 transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-bold">
                            <Trophy className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-black text-sm text-white">
                              {tObj?.name || tId}
                            </h4>
                            <p className="text-[10px] text-neutral-400">
                              División: {tObj?.division || "1era División"} • Temporada 2026
                            </p>
                          </div>
                        </div>

                        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 text-[10px] font-bold text-emerald-400 self-start sm:self-auto uppercase">
                          ● {record.status}
                        </span>
                      </div>

                      {/* Métricas del Torneo */}
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-2">
                          <span className="text-[9px] uppercase font-bold text-neutral-400">Partidos (PJ)</span>
                          <p className="text-base font-black text-white mt-0.5">{record.matchesPlayed}</p>
                        </div>
                        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-2">
                          <span className="text-[9px] uppercase font-bold text-amber-400">Goles (GF)</span>
                          <p className="text-base font-black text-amber-400 mt-0.5 flex items-center justify-center gap-1">
                            <Flame className="h-3 w-3" />
                            {record.goals}
                          </p>
                        </div>
                        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-2">
                          <span className="text-[9px] uppercase font-bold text-neutral-400">Minutos</span>
                          <p className="text-base font-black text-neutral-200 mt-0.5">{record.minutesPlayed}'</p>
                        </div>
                        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-2">
                          <span className="text-[9px] uppercase font-bold text-neutral-400">Tarjetas (A/R)</span>
                          <p className="text-base font-black text-neutral-300 mt-0.5">
                            <span className="text-amber-400">{record.yellowCards}</span> /{" "}
                            <span className="text-rose-400">{record.redCards}</span>
                          </p>
                        </div>
                        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-2 col-span-2 sm:col-span-1">
                          <span className="text-[9px] uppercase font-bold text-emerald-400">Prom. G/PJ</span>
                          <p className="text-base font-black text-emerald-400 mt-0.5">{gPerMatch}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PESTAÑA 2: CONTROL POR PERÍODOS DE TIEMPO A MEDIDA */}
          {/* ========================================================================= */}
          {activeTab === "period" && (
            <div className="space-y-5">
              {/* Controles de Filtros */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 space-y-3.5 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-bold text-neutral-300">
                    <Filter className="h-3.5 w-3.5 text-red-500" />
                    <span>Filtros Temporales y de Torneo:</span>
                  </div>

                  {/* Selector de Torneo */}
                  <select
                    value={selectedTournamentFilter}
                    onChange={(e) => setSelectedTournamentFilter(e.target.value)}
                    className="rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="all">Todos los Torneos Combinados</option>
                    {player.enrolledTournaments.map((tId) => {
                      const tObj = OFFICIAL_TOURNAMENTS.find((t) => t.id === tId);
                      return (
                        <option key={tId} value={tId}>
                          {tObj?.name || tId}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Botones de Preselección de Período */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <button
                    onClick={() => setPeriodPreset("all")}
                    className={`rounded-xl px-3 py-1 text-[11px] font-bold transition ${
                      periodPreset === "all"
                        ? "bg-red-600 text-white shadow-sm"
                        : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                    }`}
                  >
                    Toda la Trayectoria
                  </button>
                  <button
                    onClick={() => setPeriodPreset("2026")}
                    className={`rounded-xl px-3 py-1 text-[11px] font-bold transition ${
                      periodPreset === "2026"
                        ? "bg-red-600 text-white shadow-sm"
                        : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                    }`}
                  >
                    Temporada 2026
                  </button>
                  <button
                    onClick={() => setPeriodPreset("30days")}
                    className={`rounded-xl px-3 py-1 text-[11px] font-bold transition ${
                      periodPreset === "30days"
                        ? "bg-red-600 text-white shadow-sm"
                        : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                    }`}
                  >
                    Últimos 30 Días
                  </button>
                  <button
                    onClick={() => setPeriodPreset("6months")}
                    className={`rounded-xl px-3 py-1 text-[11px] font-bold transition ${
                      periodPreset === "6months"
                        ? "bg-red-600 text-white shadow-sm"
                        : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                    }`}
                  >
                    Últimos 6 Meses
                  </button>
                  <button
                    onClick={() => setPeriodPreset("custom")}
                    className={`rounded-xl px-3 py-1 text-[11px] font-bold transition ${
                      periodPreset === "custom"
                        ? "bg-amber-500 text-black font-black shadow-sm"
                        : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                    }`}
                  >
                    📅 Rango Personalizado
                  </button>
                </div>

                {/* Fechas personalizadas */}
                {periodPreset === "custom" && (
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-neutral-800">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 mb-1">Fecha Desde:</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 mb-1">Fecha Hasta:</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* KPIs de Rendimiento en el Período */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center text-xs">
                <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-3">
                  <span className="text-[10px] uppercase font-bold text-neutral-400">Partidos en Período</span>
                  <p className="text-2xl font-black text-white mt-1">{periodStats.matchesPlayed}</p>
                </div>
                <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-3">
                  <span className="text-[10px] uppercase font-bold text-amber-400">Goles en Período</span>
                  <p className="text-2xl font-black text-amber-400 mt-1 flex items-center justify-center gap-1">
                    <Flame className="h-4 w-4" />
                    {periodStats.goals}
                  </p>
                </div>
                <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-3">
                  <span className="text-[10px] uppercase font-bold text-neutral-400">Minutos Jugados</span>
                  <p className="text-2xl font-black text-neutral-200 mt-1">{periodStats.minutesPlayed}'</p>
                </div>
                <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-3">
                  <span className="text-[10px] uppercase font-bold text-neutral-400">Tarjetas (A / R)</span>
                  <p className="text-2xl font-black text-neutral-300 mt-1">
                    <span className="text-amber-400">{periodStats.yellowCards}</span> /{" "}
                    <span className="text-rose-400">{periodStats.redCards}</span>
                  </p>
                </div>
                <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-3 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-400">Promedio Gol/PJ</span>
                  <p className="text-2xl font-black text-emerald-400 mt-1">{periodStats.goalsPerMatch}</p>
                </div>
              </div>

              {/* Bitácora de Partidos en el Período */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  Bitácora Cronológica de Partidos ({periodStats.filteredLogs.length} cotejos):
                </h4>

                {periodStats.filteredLogs.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-neutral-800 p-8 text-center text-neutral-500 text-xs">
                    No se registran partidos jugados en el rango de fechas seleccionado.
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-950">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-neutral-800 bg-neutral-900 text-[10px] uppercase tracking-wider text-neutral-400">
                        <tr>
                          <th className="py-2.5 px-3">Fecha</th>
                          <th className="py-2.5 px-3">Torneo</th>
                          <th className="py-2.5 px-3">Rival</th>
                          <th className="py-2.5 px-3">Resultado</th>
                          <th className="py-2.5 px-3 text-center">Minutos</th>
                          <th className="py-2.5 px-3 text-center">Goles</th>
                          <th className="py-2.5 px-3 text-center">Tarjetas</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-900 font-mono">
                        {periodStats.filteredLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-neutral-900/60 transition">
                            <td className="py-2.5 px-3 text-neutral-300 font-sans">{log.date}</td>
                            <td className="py-2.5 px-3 text-red-400 font-sans font-bold">{log.tournamentName}</td>
                            <td className="py-2.5 px-3 text-white font-sans">{log.rivalClubName}</td>
                            <td className="py-2.5 px-3 text-amber-400 font-bold">{log.result}</td>
                            <td className="py-2.5 px-3 text-center text-neutral-200">{log.minutes}'</td>
                            <td className="py-2.5 px-3 text-center font-black text-amber-400">{log.goals}</td>
                            <td className="py-2.5 px-3 text-center text-neutral-400">
                              {log.yellowCards > 0 && <span className="text-amber-400 font-bold">🟨 {log.yellowCards} </span>}
                              {log.redCards > 0 && <span className="text-rose-400 font-bold">🟥 {log.redCards}</span>}
                              {log.yellowCards === 0 && log.redCards === 0 && <span>-</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PESTAÑA 3: REGISTRAR NUEVA ACTUACIÓN MANUALMENTE */}
          {/* ========================================================================= */}
          {activeTab === "new_log" && (
            <form onSubmit={handleAddNewMatchLog} className="space-y-4 text-xs">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 space-y-1">
                <p className="font-bold text-white text-xs">Carga de Actuación Individual de Partido</p>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Permite al delegado registrar el desempeño del atleta (minutos, goles y tarjetas) en un partido oficial para actualizar tanto su acumulado del torneo como su bitácora cronológica.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Torneo Disputado</label>
                  <select
                    value={newLogTournamentId}
                    onChange={(e) => setNewLogTournamentId(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
                  >
                    {OFFICIAL_TOURNAMENTS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Fecha del Partido</label>
                  <input
                    type="date"
                    required
                    value={newLogDate}
                    onChange={(e) => setNewLogDate(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Rival Enfrentado</label>
                  <input
                    type="text"
                    required
                    value={newLogRival}
                    onChange={(e) => setNewLogRival(e.target.value)}
                    placeholder="Ej. Fratelsa Sport"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Resultado del Encuentro</label>
                  <input
                    type="text"
                    required
                    value={newLogResult}
                    onChange={(e) => setNewLogResult(e.target.value)}
                    placeholder="Ej. 4 - 2 (Victoria)"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 p-3 rounded-2xl bg-neutral-950 border border-neutral-800">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 mb-1">Minutos</label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    required
                    value={newLogMinutes}
                    onChange={(e) => setNewLogMinutes(Number(e.target.value))}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-amber-400 mb-1">Goles</label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    required
                    value={newLogGoals}
                    onChange={(e) => setNewLogGoals(Number(e.target.value))}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-amber-300 mb-1">Amarillas</label>
                  <input
                    type="number"
                    min={0}
                    max={2}
                    required
                    value={newLogYellow}
                    onChange={(e) => setNewLogYellow(Number(e.target.value))}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-rose-400 mb-1">Rojas</label>
                  <input
                    type="number"
                    min={0}
                    max={1}
                    required
                    value={newLogRed}
                    onChange={(e) => setNewLogRed(Number(e.target.value))}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-white font-bold"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("tournaments")}
                  className="rounded-xl border border-neutral-800 px-4 py-2 font-bold text-neutral-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-red-600 px-5 py-2 font-black text-white hover:bg-red-500 shadow-lg shadow-red-600/30 transition"
                >
                  Guardar en Expediente Histórico
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
