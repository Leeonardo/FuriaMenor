"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Download,
  Calendar,
  MapPin,
  UserCheck,
} from "lucide-react";
import { formatDateVE } from "@/lib/date-utils";

export interface ScoresheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: {
    homeTeam: string;
    awayTeam: string;
    homeScore: number | null;
    awayScore: number | null;
    category?: string;
    categoryName?: string;
    venue?: string;
    matchDate?: string;
    refereeName?: string;
    referees?: { principal?: string; asistente?: string };
    scoresheetUrl?: string | null;
    sheetPhotoUrl?: string | null;
    refereeNotes?: string;
  } | null;
}

export function ScoresheetModal({ isOpen, onClose, match }: ScoresheetModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  if (!isOpen || !match) return null;

  const photoUrl =
    match.scoresheetUrl ||
    match.sheetPhotoUrl ||
    "/images/planilla-ejemplo.jpg";

  const refName =
    match.refereeName ||
    match.referees?.principal ||
    "Cuerpo Arbitral Colegio Furia Menor";

  const catName = match.categoryName || match.category || "Futsal Menor";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-neutral-700 bg-neutral-950 text-neutral-100 shadow-2xl overflow-hidden">
        {/* CABECERA DEL MODAL */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-neutral-800 bg-neutral-900/90 p-4 sm:p-5">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800">
                  Transparencia Total Furia Menor
                </span>
                <span className="text-[10px] font-bold text-neutral-400">
                  {catName}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
                Planilla Oficial del Encuentro (Acta Firmada)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={photoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 hover:text-white transition"
              title="Abrir imagen en pestaña completa"
            >
              <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden sm:inline">Pestaña Completa</span>
            </a>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white transition"
              aria-label="Cerrar modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* METADATOS DEL ENCUENTRO */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-neutral-800/80 bg-neutral-900/50 p-3 sm:px-6 text-xs">
          {/* Marcador */}
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-[10px] uppercase font-bold text-neutral-400">
              Resultado Oficial
            </span>
            <div className="flex items-center gap-2 mt-0.5 font-bold">
              <span className="text-white truncate max-w-[100px] sm:max-w-[120px]">
                {match.homeTeam}
              </span>
              <span className="rounded bg-red-600/20 border border-red-500/30 px-2 py-0.5 text-sm font-black text-red-400">
                {match.homeScore ?? 0} - {match.awayScore ?? 0}
              </span>
              <span className="text-white truncate max-w-[100px] sm:max-w-[120px]">
                {match.awayTeam}
              </span>
            </div>
          </div>

          {/* Sede y Fecha */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold text-neutral-400">
              Sede y Fecha
            </span>
            <div className="flex items-center gap-1.5 mt-0.5 text-neutral-300 truncate max-w-full">
              <MapPin className="h-3.5 w-3.5 text-red-400 shrink-0" />
              <span className="truncate">{match.venue || "Cancha de Futsal"}</span>
              {match.matchDate && (
                <>
                  <span className="text-neutral-600">•</span>
                  <span>{formatDateVE(match.matchDate)}</span>
                </>
              )}
            </div>
          </div>

          {/* Árbitro Certificante */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold text-neutral-400">
              Árbitro Certificante
            </span>
            <div className="flex items-center gap-1.5 mt-0.5 text-neutral-300">
              <UserCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span className="font-semibold text-emerald-300">{refName}</span>
            </div>
          </div>
        </div>

        {/* CONTENEDOR DE LA PLANILLA / VISOR DE IMAGEN */}
        <div className="relative flex-1 overflow-auto bg-neutral-950 p-4 sm:p-6 flex flex-col items-center justify-center min-h-[340px]">
          {/* Controles de Zoom */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/90 p-1.5 backdrop-blur-sm shadow-lg">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.2))}
              className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition"
              title="Alejar"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-[10px] font-mono text-neutral-300 px-1">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
              className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition"
              title="Acercar"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="rounded-lg px-2 py-1 text-[10px] font-bold text-neutral-400 hover:bg-neutral-800 hover:text-white transition"
            >
              100%
            </button>
          </div>

          <div
            className="transition-transform duration-150 ease-out origin-center flex items-center justify-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={photoUrl}
              alt={`Planilla Oficial del encuentro ${match.homeTeam} vs ${match.awayTeam}`}
              className="max-h-[58vh] max-w-full rounded-2xl border border-neutral-800 object-contain shadow-2xl"
            />
          </div>

          {match.refereeNotes && (
            <div className="mt-4 w-full max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-900/70 p-3 text-xs text-neutral-300">
              <span className="font-bold text-amber-400">Observaciones del Árbitro en Cancha:</span>{" "}
              {match.refereeNotes}
            </div>
          )}
        </div>

        {/* PIE DEL MODAL CON SELLO DE AUDITORÍA */}
        <div className="border-t border-neutral-800 bg-neutral-900/90 p-3.5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Documento fidedigno auditado por la Comisión Técnica de Furia Menor</span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl bg-neutral-800 px-5 py-2 font-bold text-white hover:bg-neutral-700 transition"
          >
            Cerrar Visor
          </button>
        </div>
      </div>
    </div>
  );
}
