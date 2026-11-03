"use client";

import React, { useState } from "react";
import {
  DBMatch,
  AppUser,
} from "@/types/auth-roles";
import {
  Camera,
  CheckCircle2,
  Clock,
  MapPin,
  Trophy,
  Shield,
  Smartphone,
  Upload,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Award,
  FileText,
} from "lucide-react";

interface ArbitroViewProps {
  user: AppUser;
  matches: DBMatch[];
  onUpdateMatchScore: (
    matchId: string,
    homeScore: number,
    awayScore: number,
    status: DBMatch["status"],
    sheetPhotoUrl?: string,
    notes?: string
  ) => void;
}

export function ArbitroView({
  user,
  matches,
  onUpdateMatchScore,
}: ArbitroViewProps) {
  // Partidos del árbitro o disponibles para arbitraje
  const refereeMatches = matches;
  const [selectedMatchId, setSelectedMatchId] = useState<string>(
    refereeMatches[0]?.id || ""
  );

  const currentMatch = refereeMatches.find((m) => m.id === selectedMatchId) || refereeMatches[0];

  // Estado local del marcador en vivo
  const [homeScore, setHomeScore] = useState<number>(currentMatch?.homeScore ?? 0);
  const [awayScore, setAwayScore] = useState<number>(currentMatch?.awayScore ?? 0);
  const [matchStatus, setMatchStatus] = useState<DBMatch["status"]>(
    currentMatch?.status || "programado"
  );
  const [sheetPhoto, setSheetPhoto] = useState<string>(
    currentMatch?.sheetPhotoUrl || ""
  );
  const [refereeNotes, setRefereeNotes] = useState<string>(
    currentMatch?.refereeNotes || ""
  );
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // Al cambiar de partido en el selector, sincronizamos el marcador
  const handleSelectMatch = (match: DBMatch) => {
    setSelectedMatchId(match.id);
    setHomeScore(match.homeScore ?? 0);
    setAwayScore(match.awayScore ?? 0);
    setMatchStatus(match.status);
    setSheetPhoto(match.sheetPhotoUrl || "");
    setRefereeNotes(match.refereeNotes || "");
    setSuccessBanner(null);
  };

  // Simular captura de foto de planilla con cámara o galería
  const handleSimulatePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setSheetPhoto(fakeUrl);
    } else {
      setSheetPhoto("/images/planilla-ejemplo.jpg");
    }
  };

  // Guardar y Finalizar Partido (dispara recálculo automático de la tabla)
  const handleSaveAndFinalize = (isFinal: boolean) => {
    if (!currentMatch) return;

    const newStatus: DBMatch["status"] = isFinal ? "finalizado" : "en_vivo";
    setMatchStatus(newStatus);

    onUpdateMatchScore(
      currentMatch.id,
      homeScore,
      awayScore,
      newStatus,
      sheetPhoto || "/images/planilla-ejemplo.jpg",
      refereeNotes
    );

    setSuccessBanner(
      isFinal
        ? `¡Partido Finalizado Exitosamente! Marcador ${homeScore} - ${awayScore} asentado y tabla de posiciones de ${currentMatch.categoryName} recalculada automáticamente.`
        : `Marcador en vivo actualizado: ${homeScore} - ${awayScore}. Estado: En Juego.`
    );

    // Auto-ocultar banner después de unos segundos
    setTimeout(() => {
      setSuccessBanner(null);
    }, 6000);
  };

  if (!currentMatch) {
    return (
      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8 text-center text-neutral-400">
        No hay partidos asignados para arbitraje en esta jornada.
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* 1. CABECERA MOBILE-FIRST DEL ÁRBITRO */}
      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/80 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-black">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                Módulo Oficial de Arbitraje en Cancha
              </span>
              <h2 className="text-base sm:text-lg font-black text-white">
                {user.fullName}
              </h2>
            </div>
          </div>

          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-[11px] font-bold text-emerald-400">
            En Cancha
          </span>
        </div>

        {/* Selector de Partido Asignado */}
        <div className="mt-4">
          <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
            Seleccionar Encuentro de la Jornada:
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {refereeMatches.map((m) => {
              const isSelected = m.id === currentMatch.id;
              return (
                <button
                  key={m.id}
                  onClick={() => handleSelectMatch(m)}
                  className={`rounded-2xl p-3 text-left transition shrink-0 w-64 border ${
                    isSelected
                      ? "border-red-500 bg-red-600/10 ring-1 ring-red-400"
                      : "border-neutral-800 bg-neutral-950/70 hover:border-neutral-700 text-neutral-400"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                    <span className="text-amber-400">{m.categoryName}</span>
                    <span
                      className={`uppercase ${
                        m.status === "finalizado"
                          ? "text-emerald-400"
                          : m.status === "en_vivo"
                          ? "text-red-400 animate-pulse"
                          : "text-blue-400"
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                  <p className="text-xs font-black text-white truncate">
                    {m.homeClubName} vs {m.awayClubName}
                  </p>
                  <p className="text-[10px] text-neutral-400 truncate mt-0.5">
                    {m.matchTime} • {m.venue}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* NOTIFICACIÓN DE ÉXITO Y RECÁLCULO */}
      {successBanner && (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-4 text-xs text-emerald-300 flex items-start gap-3 shadow-lg animate-in fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-black text-emerald-200">¡Acta Registrada con Éxito!</p>
            <p className="mt-0.5 text-[11px] text-emerald-300/90 leading-relaxed">
              {successBanner}
            </p>
          </div>
        </div>
      )}

      {/* 2. PANTALLA TÁCTIL DE MARCADOR EN VIVO (TOUCH-FRIENDLY) */}
      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/90 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Metadatos del Partido */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-3 py-0.5 text-xs font-bold text-neutral-300">
            <Trophy className="h-3.5 w-3.5 text-amber-400" />
            <span>{currentMatch.tournamentName}</span>
            <span>•</span>
            <span className="text-red-400">{currentMatch.categoryName}</span>
          </div>
          <p className="text-xs text-neutral-400 flex items-center justify-center gap-1.5 pt-1">
            <MapPin className="h-3 w-3 text-red-500" />
            <span>{currentMatch.venue}</span>
          </p>
        </div>

        {/* Tablero de Marcador Táctil */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2">
          {/* EQUIPO LOCAL */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950/90 p-5 text-center flex flex-col items-center justify-between shadow-xl">
            <span className="text-[10px] font-black uppercase tracking-wider text-red-400">
              Equipo Local
            </span>
            <h3 className="text-base sm:text-lg font-black text-white mt-1 line-clamp-2 min-h-[48px] flex items-center justify-center">
              {currentMatch.homeClubName}
            </h3>

            {/* Número de Goles Gigante */}
            <div className="my-4">
              <span className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight drop-shadow-lg">
                {homeScore}
              </span>
            </div>

            {/* Botones Táctiles de Suma / Resta */}
            <div className="flex items-center gap-2.5 w-full">
              <button
                type="button"
                onClick={() => setHomeScore((prev) => Math.max(0, prev - 1))}
                className="flex-1 rounded-2xl border border-neutral-700 bg-neutral-900 py-3 text-lg font-black text-neutral-300 hover:bg-neutral-800 active:scale-95 transition"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => setHomeScore((prev) => prev + 1)}
                className="flex-1 rounded-2xl bg-red-600 py-3 text-lg font-black text-white hover:bg-red-500 active:scale-95 transition shadow-lg shadow-red-600/30"
              >
                +
              </button>
            </div>
          </div>

          {/* EQUIPO VISITANTE */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950/90 p-5 text-center flex flex-col items-center justify-between shadow-xl">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-400">
              Equipo Visitante
            </span>
            <h3 className="text-base sm:text-lg font-black text-white mt-1 line-clamp-2 min-h-[48px] flex items-center justify-center">
              {currentMatch.awayClubName}
            </h3>

            {/* Número de Goles Gigante */}
            <div className="my-4">
              <span className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight drop-shadow-lg">
                {awayScore}
              </span>
            </div>

            {/* Botones Táctiles de Suma / Resta */}
            <div className="flex items-center gap-2.5 w-full">
              <button
                type="button"
                onClick={() => setAwayScore((prev) => Math.max(0, prev - 1))}
                className="flex-1 rounded-2xl border border-neutral-700 bg-neutral-900 py-3 text-lg font-black text-neutral-300 hover:bg-neutral-800 active:scale-95 transition"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => setAwayScore((prev) => prev + 1)}
                className="flex-1 rounded-2xl bg-blue-600 py-3 text-lg font-black text-white hover:bg-blue-500 active:scale-95 transition shadow-lg shadow-blue-600/30"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* 3. CAPTURA Y SUBIDA DE LA PLANILLA FIRMADA */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-amber-400" />
              <label className="text-xs font-bold text-white">
                Foto de Planilla Oficial Firmada
              </label>
            </div>
            {sheetPhoto && (
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Planilla Adjunta
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <label className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/60 p-3 text-xs text-neutral-300 hover:border-amber-400 hover:text-white transition cursor-pointer w-full">
              <Upload className="h-4 w-4 text-amber-400" />
              <span>Tomar Foto / Subir desde Galería</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleSimulatePhotoUpload}
                className="hidden"
              />
            </label>

            {sheetPhoto && (
              <div className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 p-2 shrink-0">
                <span className="text-xs font-mono text-neutral-400">planilla.jpg</span>
                <button
                  type="button"
                  onClick={() => setSheetPhoto("")}
                  className="text-red-400 hover:text-red-300 text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Observaciones del Árbitro */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider">
            Observaciones e Incidencias del Acta:
          </label>
          <textarea
            rows={2}
            value={refereeNotes}
            onChange={(e) => setRefereeNotes(e.target.value)}
            placeholder="Amonestaciones, incidencias disciplinarias o detalles del encuentro..."
            className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 p-3 text-xs text-white placeholder-neutral-500 focus:border-red-500 focus:outline-none"
          />
        </div>

        {/* 4. BOTONES DE ACCIÓN RÁPIDA EN CANCHA */}
        <div className="grid gap-3 sm:grid-cols-2 pt-2">
          <button
            type="button"
            onClick={() => handleSaveAndFinalize(false)}
            className="flex items-center justify-center gap-2 rounded-2xl border border-neutral-700 bg-neutral-800/80 py-3.5 text-xs font-bold text-neutral-200 hover:bg-neutral-800 hover:text-white transition active:scale-98"
          >
            <Play className="h-4 w-4 text-amber-400" />
            <span>Actualizar Marcador En Vivo</span>
          </button>

          <button
            type="button"
            onClick={() => handleSaveAndFinalize(true)}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 py-3.5 text-xs font-black text-white hover:from-red-500 hover:to-red-400 transition shadow-xl shadow-red-600/30 active:scale-98"
          >
            <CheckCircle2 className="h-4 w-4 text-white" />
            <span>Firmar & Finalizar Encuentro</span>
          </button>
        </div>
      </div>
    </div>
  );
}
