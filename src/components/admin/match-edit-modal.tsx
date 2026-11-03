"use client";

import React, { useState, useEffect } from "react";
import { FullMatchData, MatchGoalEvent, MatchCardEvent } from "@/data/admin-match-manager";
import {
  X,
  Save,
  Calendar,
  Clock,
  MapPin,
  UserCheck,
  Trophy,
  AlertTriangle,
  Plus,
  Trash2,
  RotateCcw,
  CheckCircle2,
  Shield,
  Layers,
} from "lucide-react";

interface MatchEditModalProps {
  match: FullMatchData | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveSuccess: (updatedMatch: FullMatchData) => void;
}

export function MatchEditModal({
  match,
  isOpen,
  onClose,
  onSaveSuccess,
}: MatchEditModalProps) {
  if (!isOpen || !match) return null;

  // Estados de edición del partido
  const [homeTeam, setHomeTeam] = useState(match.homeTeam);
  const [awayTeam, setAwayTeam] = useState(match.awayTeam);
  const [homeScore, setHomeScore] = useState<string | number>(
    match.homeScore !== null && match.homeScore !== undefined ? match.homeScore : ""
  );
  const [awayScore, setAwayScore] = useState<string | number>(
    match.awayScore !== null && match.awayScore !== undefined ? match.awayScore : ""
  );
  const [matchDate, setMatchDate] = useState(match.matchDate || "");
  const [matchTime, setMatchTime] = useState(match.matchTime || "");
  const [venue, setVenue] = useState(match.venue || "");
  const [jornada, setJornada] = useState(match.jornada || "");
  const [status, setStatus] = useState<"scheduled" | "live" | "finished">(
    match.status || "scheduled"
  );

  // Estados de Árbitros
  const [refPrincipal, setRefPrincipal] = useState(
    match.referees?.principal || "Árbitro 1 (Principal)"
  );
  const [refAsistente, setRefAsistente] = useState(
    match.referees?.asistente || "Árbitro 2 (Segundo Árbitro)"
  );
  const [refMesa, setRefMesa] = useState(
    match.referees?.mesa || "Anotador 1 (Mesa Técnica)"
  );

  // Estados de Goles y Tarjetas
  const [goals, setGoals] = useState<MatchGoalEvent[]>(match.goalsList || []);
  const [cards, setCards] = useState<MatchCardEvent[]>(match.cardsList || []);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    setHomeTeam(match.homeTeam);
    setAwayTeam(match.awayTeam);
    setHomeScore(match.homeScore !== null && match.homeScore !== undefined ? match.homeScore : "");
    setAwayScore(match.awayScore !== null && match.awayScore !== undefined ? match.awayScore : "");
    setMatchDate(match.matchDate || "");
    setMatchTime(match.matchTime || "");
    setVenue(match.venue || "");
    setJornada(match.jornada || "");
    setStatus(match.status || "scheduled");
    setRefPrincipal(match.referees?.principal || "Árbitro 1 (Principal)");
    setRefAsistente(match.referees?.asistente || "Árbitro 2 (Segundo Árbitro)");
    setRefMesa(match.referees?.mesa || "Anotador 1 (Mesa Técnica)");
    setGoals(match.goalsList || []);
    setCards(match.cardsList || []);
    setMessage(null);
  }, [match]);

  // Manejo de Goles
  const handleAddGoal = () => {
    setGoals([
      ...goals,
      {
        id: `goal-${Date.now()}-${Math.random()}`,
        playerId: "",
        playerName: "",
        team: "home",
        minute: "",
      },
    ]);
  };

  const handleUpdateGoal = (idx: number, field: keyof MatchGoalEvent, val: string) => {
    const updated = [...goals];
    updated[idx] = { ...updated[idx], [field]: val };
    setGoals(updated);
  };

  const handleRemoveGoal = (idx: number) => {
    setGoals(goals.filter((_, i) => i !== idx));
  };

  // Manejo de Tarjetas
  const handleAddCard = () => {
    setCards([
      ...cards,
      {
        id: `card-${Date.now()}-${Math.random()}`,
        playerId: "",
        playerName: "",
        team: "home",
        cardType: "amarilla",
        minute: "",
      },
    ]);
  };

  const handleUpdateCard = (idx: number, field: keyof MatchCardEvent, val: string) => {
    const updated = [...cards];
    updated[idx] = { ...updated[idx], [field]: val };
    setCards(updated);
  };

  const handleRemoveCard = (idx: number) => {
    setCards(cards.filter((_, i) => i !== idx));
  };

  // Restablecer partido a no jugado
  const handleResetMatch = () => {
    if (confirm("¿Deseas restablecer este partido a estado 'Programado' y borrar los goles/marcador?")) {
      setHomeScore("");
      setAwayScore("");
      setStatus("scheduled");
      setGoals([]);
      setCards([]);
    }
  };

  // Guardar Cambios
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const numericHomeScore =
      homeScore !== "" && homeScore !== null ? Number(homeScore) : null;
    const numericAwayScore =
      awayScore !== "" && awayScore !== null ? Number(awayScore) : null;

    const updatedMatch: FullMatchData = {
      ...match,
      homeTeam,
      awayTeam,
      homeScore: numericHomeScore,
      awayScore: numericAwayScore,
      matchDate,
      matchTime,
      venue,
      jornada,
      status: numericHomeScore !== null && numericAwayScore !== null ? status : "scheduled",
      referees: {
        principal: refPrincipal,
        asistente: refAsistente,
        mesa: refMesa,
      },
      goalsList: goals,
      cardsList: cards,
    };

    try {
      const res = await fetch("/api/admin/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId: match.id,
          homeTeam,
          awayTeam,
          homeScore: numericHomeScore,
          awayScore: numericAwayScore,
          matchDate,
          matchTime,
          venue,
          jornada,
          status: updatedMatch.status,
          referees: updatedMatch.referees,
          goals,
          cards,
        }),
      });

      if (res.ok) {
        setMessage({
          text: "¡Cambios guardados con éxito! Los calendarios, tablas y estadísticas se actualizarán.",
          type: "success",
        });
        setTimeout(() => {
          onSaveSuccess(updatedMatch);
          onClose();
        }, 800);
      } else {
        setMessage({ text: "Error al guardar en el servidor", type: "error" });
      }
    } catch (err) {
      console.error(err);
      // Guardar de todas formas localmente
      onSaveSuccess(updatedMatch);
      setMessage({
        text: "Guardado localmente en tu sesión administrativa.",
        type: "success",
      });
      setTimeout(() => {
        onClose();
      }, 800);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden">
        {/* Cabecera del Editor */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4 bg-neutral-950">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-[10px] font-bold text-red-400 uppercase tracking-wider">
                {match.tournamentName} · {match.subCategory || match.category}
              </span>
              <span className="text-xs text-neutral-400 font-mono">ID: {match.id}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white mt-1">
              Editar Partido, Calendario & Marcador Oficial
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mensaje de retroalimentación */}
        {message && (
          <div
            className={`px-6 py-2.5 text-xs font-bold flex items-center gap-2 ${
              message.type === "success"
                ? "bg-emerald-500/20 text-emerald-300 border-b border-emerald-500/30"
                : "bg-red-500/20 text-red-300 border-b border-red-500/30"
            }`}
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{message.text}</span>
          </div>
        )}

        {/* Formulario scrolleable con todas las secciones */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* SECCIÓN 1: PROGRAMACIÓN & CALENDARIO (Imprevistos de hora/cancha) */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-neutral-800 pb-2">
              <Calendar className="h-4 w-4 text-red-400" />
              1. Datos de Calendario & Programación (Imprevistos de Sede/Horario)
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Fecha del Partido
                </label>
                <input
                  type="date"
                  value={matchDate}
                  onChange={(e) => setMatchDate(e.target.value)}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Hora de Inicio
                </label>
                <input
                  type="time"
                  value={matchTime}
                  onChange={(e) => setMatchTime(e.target.value)}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Estado del Encuentro
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white font-semibold"
                >
                  <option value="scheduled">Programado (Por disputar)</option>
                  <option value="live">En Vivo (En Disputa)</option>
                  <option value="finished">Finalizado (Oficial)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Cancha / Sede Oficial
                </label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="Ej: Gimnasio Libertador del 23 de Enero"
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Jornada / Fecha
                </label>
                <input
                  type="text"
                  value={jornada}
                  onChange={(e) => setJornada(e.target.value)}
                  placeholder="Ej: Jornada 1 · Fecha Oficial"
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: EQUIPOS & RESULTADO OFICIAL */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-neutral-800 pb-2">
              <Trophy className="h-4 w-4 text-amber-400" />
              2. Equipos Enfrentados & Marcador Oficial
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 items-center">
              {/* Equipo Local */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-red-400 uppercase">
                  <Shield className="h-4 w-4" />
                  Equipo Local
                </div>
                <input
                  type="text"
                  value={homeTeam}
                  onChange={(e) => setHomeTeam(e.target.value)}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm font-bold text-white mb-3"
                  required
                />
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Goles Local</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Sin jugar"
                    value={homeScore}
                    onChange={(e) => setHomeScore(e.target.value)}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-center text-xl font-black text-white"
                  />
                </div>
              </div>

              {/* Equipo Visitante */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-blue-400 uppercase">
                  <Shield className="h-4 w-4" />
                  Equipo Visitante
                </div>
                <input
                  type="text"
                  value={awayTeam}
                  onChange={(e) => setAwayTeam(e.target.value)}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm font-bold text-white mb-3"
                  required
                />
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Goles Visitante</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Sin jugar"
                    value={awayScore}
                    onChange={(e) => setAwayScore(e.target.value)}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-center text-xl font-black text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: CUERPO ARBITRAL DE LA JORNADA */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-neutral-800 pb-2">
              <UserCheck className="h-4 w-4 text-emerald-400" />
              3. Designación Arbitral Oficial (Cambio de Árbitros)
            </h3>

            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  1er Árbitro (Principal)
                </label>
                <input
                  type="text"
                  value={refPrincipal}
                  onChange={(e) => setRefPrincipal(e.target.value)}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  2do Árbitro (Auxiliar)
                </label>
                <input
                  type="text"
                  value={refAsistente}
                  onChange={(e) => setRefAsistente(e.target.value)}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Mesa Técnica / Cronómetro
                </label>
                <input
                  type="text"
                  value={refMesa}
                  onChange={(e) => setRefMesa(e.target.value)}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white font-medium"
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN 4: ACTA DE INCIDENCIAS (GOLES Y TARJETAS) */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                4. Acta de Incidencias: Goles y Sanciones
              </h3>
            </div>

            {/* Goles del Partido */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-neutral-300">Goleadores registrados:</span>
                <button
                  type="button"
                  onClick={handleAddGoal}
                  className="inline-flex items-center gap-1 rounded-lg bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-700 transition"
                >
                  <Plus className="h-3.5 w-3.5" /> Agregar Gol
                </button>
              </div>

              {goals.length === 0 ? (
                <p className="text-xs text-neutral-500 italic">No hay goles individuales cargados.</p>
              ) : (
                <div className="space-y-2">
                  {goals.map((g, idx) => (
                    <div key={g.id || idx} className="grid grid-cols-[1fr_120px_80px_auto] gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Nombre / ID del Jugador"
                        value={g.playerName}
                        onChange={(e) => handleUpdateGoal(idx, "playerName", e.target.value)}
                        className="rounded-lg border border-neutral-700 bg-neutral-900 px-2.5 py-1.5 text-xs text-white"
                      />
                      <select
                        value={g.team}
                        onChange={(e) => handleUpdateGoal(idx, "team", e.target.value as any)}
                        className="rounded-lg border border-neutral-700 bg-neutral-900 px-2.5 py-1.5 text-xs text-white"
                      >
                        <option value="home">{homeTeam || "Local"}</option>
                        <option value="away">{awayTeam || "Visitante"}</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Minuto"
                        value={g.minute || ""}
                        onChange={(e) => handleUpdateGoal(idx, "minute", e.target.value)}
                        className="rounded-lg border border-neutral-700 bg-neutral-900 px-2.5 py-1.5 text-xs text-center text-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveGoal(idx)}
                        className="p-1.5 text-neutral-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tarjetas del Partido */}
            <div className="pt-3 border-t border-neutral-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-neutral-300">Tarjetas y Sanciones:</span>
                <button
                  type="button"
                  onClick={handleAddCard}
                  className="inline-flex items-center gap-1 rounded-lg bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-700 transition"
                >
                  <Plus className="h-3.5 w-3.5" /> Agregar Tarjeta
                </button>
              </div>

              {cards.length === 0 ? (
                <p className="text-xs text-neutral-500 italic">No hay tarjetas registradas en el encuentro.</p>
              ) : (
                <div className="space-y-2">
                  {cards.map((c, idx) => (
                    <div key={c.id || idx} className="grid grid-cols-[1fr_120px_100px_80px_auto] gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Nombre / ID del Jugador"
                        value={c.playerName}
                        onChange={(e) => handleUpdateCard(idx, "playerName", e.target.value)}
                        className="rounded-lg border border-neutral-700 bg-neutral-900 px-2.5 py-1.5 text-xs text-white"
                      />
                      <select
                        value={c.team}
                        onChange={(e) => handleUpdateCard(idx, "team", e.target.value as any)}
                        className="rounded-lg border border-neutral-700 bg-neutral-900 px-2.5 py-1.5 text-xs text-white"
                      >
                        <option value="home">{homeTeam || "Local"}</option>
                        <option value="away">{awayTeam || "Visitante"}</option>
                      </select>
                      <select
                        value={c.cardType}
                        onChange={(e) => handleUpdateCard(idx, "cardType", e.target.value as any)}
                        className="rounded-lg border border-neutral-700 bg-neutral-900 px-2 py-1.5 text-xs font-bold text-white"
                      >
                        <option value="amarilla">Amarilla (TA)</option>
                        <option value="roja">Roja (TR)</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Minuto"
                        value={c.minute || ""}
                        onChange={(e) => handleUpdateCard(idx, "minute", e.target.value)}
                        className="rounded-lg border border-neutral-700 bg-neutral-900 px-2 py-1.5 text-xs text-center text-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveCard(idx)}
                        className="p-1.5 text-neutral-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Barra de Acciones del Formulario */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={handleResetMatch}
              className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2 text-xs font-semibold text-neutral-400 hover:text-white hover:border-neutral-500 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Restablecer Marcador a Pendiente
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2 text-xs font-bold text-neutral-300 hover:text-white transition"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2 text-xs font-bold text-white hover:bg-red-500 transition shadow-lg shadow-red-600/30 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {saving ? "Guardando Cambios..." : "Guardar Modificaciones"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
