"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { TournamentMatchItem } from "@/data/tournaments-data";
import { DaerisBadge } from "@/components/ui/tournament-badges";
import { DaerisBadgeRenderer } from "@/components/ui/daeris-sub-badge-renderer";
import {
  Download,
  Share2,
  X,
  Calendar,
  Clock,
  MapPin,
  UserCheck,
  Shield,
  Smartphone,
  Square,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import * as htmlToImage from "html-to-image";

interface MatchSocialCardModalProps {
  match: TournamentMatchItem;
  tournamentName?: string;
  badgeKey?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function MatchSocialCardModal({
  match,
  tournamentName = "Torneo Daeris",
  badgeKey,
  isOpen,
  onClose,
}: MatchSocialCardModalProps) {
  const [format, setFormat] = useState<"post" | "story">("post");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const flyerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const isFinished = match.status === "finished";
  const homeName = match.homeTeam;
  const awayName = match.awayTeam;

  const handleDownload = async () => {
    if (!flyerRef.current) return;
    try {
      setIsGenerating(true);
      const dataUrl = await htmlToImage.toPng(flyerRef.current, {
        quality: 1,
        pixelRatio: 2, // 2x para resolución retina nítida (1080x1080 o 1080x1920)
        cacheBust: true,
      });

      const cleanHome = homeName.toLowerCase().replace(/\s+/g, "-");
      const cleanAway = awayName.toLowerCase().replace(/\s+/g, "-");
      const filename = `furia-menor-${cleanHome}-vs-${cleanAway}-${format}.png`;

      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error al generar la imagen:", err);
      alert("No se pudo generar la imagen automáticamente. Inténtalo de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNativeShare = async () => {
    if (!flyerRef.current) return;
    try {
      setIsGenerating(true);
      const dataUrl = await htmlToImage.toPng(flyerRef.current, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
      });

      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `partido-${homeName}-vs-${awayName}.png`, {
        type: "image/png",
      });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${homeName} vs ${awayName} · Furia Menor`,
          text: `Sigue el partido ${homeName} vs ${awayName} por Furia Menor`,
        });
      } else {
        // Fallback a descarga si no soporta compartir archivo
        handleDownload();
      }
    } catch (err) {
      console.error("Error al compartir:", err);
      handleDownload();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden">
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-5 py-4 bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-600/20 text-red-400 border border-red-500/30">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                Generador de Post para Redes
              </h3>
              <p className="text-[11px] text-neutral-400">
                Descarga el flyer oficial para Instagram, WhatsApp o Facebook
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Selector de Formato (Post 1:1 vs Historia 9:16) */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-800 bg-neutral-900/60 text-xs">
          <span className="font-bold text-neutral-400 uppercase tracking-wider text-[11px]">
            Elige el formato:
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setFormat("post")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                format === "post"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30 ring-1 ring-red-400"
                  : "bg-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              <Square className="h-3.5 w-3.5" />
              Feed (1:1)
            </button>
            <button
              onClick={() => setFormat("story")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                format === "story"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30 ring-1 ring-red-400"
                  : "bg-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              Historia / WhatsApp (9:16)
            </button>
          </div>
        </div>

        {/* Zona de Visualización del Flyer (Scrollable en móviles) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-950/70 flex justify-center items-center">
          {/* EL FLYER DEPORTIVO QUE SE CONVIERTE EN IMAGEN */}
          <div
            ref={flyerRef}
            className={`relative overflow-hidden text-neutral-100 flex flex-col justify-between border-2 border-red-500/50 shadow-2xl transition-all ${
              format === "post"
                ? "w-full max-w-[420px] aspect-square p-5 sm:p-6"
                : "w-full max-w-[340px] aspect-[9/16] p-5 sm:p-6"
            }`}
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(185, 28, 28, 0.45) 0%, rgba(15, 15, 15, 0.98) 55%, #050505 100%)",
            }}
          >
            {/* Patrón de líneas deportivas decorativas */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 blur-3xl pointer-events-none" />

            {/* 1. Header del Flyer: Marca Furia Menor + Insignia del Torneo */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 shrink-0 relative flex items-center justify-center rounded-xl bg-neutral-900 border border-neutral-700">
                  <Image src="/logo.png" alt="Furia Menor" width={32} height={32} className="object-contain" />
                </div>
                <div>
                  <p className="text-base font-black tracking-tight leading-none text-white uppercase">
                    Furia Menor
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-red-400 font-extrabold mt-0.5">
                    Fútbol Sala Menor
                  </p>
                </div>
              </div>

              {/* Insignia del torneo */}
              <div className="shrink-0 drop-shadow-lg">
                {badgeKey ? (
                  <DaerisBadgeRenderer badgeKey={badgeKey} size={42} />
                ) : (
                  <DaerisBadge size={42} />
                )}
              </div>
            </div>

            {/* 2. Banner de Torneo, Jornada y Categoría */}
            <div className="relative z-10 text-center my-auto py-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 border border-red-500/40 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-red-300 mb-2">
                <span>{tournamentName}</span>
                <span>·</span>
                <span className="text-white">{match.category}</span>
              </div>

              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                {match.jornada || "JORNADA OFICIAL DE COMPETICIÓN"}
              </p>

              {/* ENFRENTAMIENTO CENTRAL DE EQUIPOS */}
              <div className="mt-4 flex items-center justify-between gap-2 bg-neutral-900/80 p-3 sm:p-4 rounded-2xl border border-neutral-800 shadow-xl backdrop-blur-md">
                {/* Equipo Local */}
                <div className="flex-1 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 mb-1.5 shadow-md">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-black text-white uppercase leading-tight line-clamp-2">
                    {homeName}
                  </h4>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                    Local
                  </span>
                </div>

                {/* Marcador o VS */}
                <div className="px-2 shrink-0 text-center">
                  {isFinished && match.homeScore !== null && match.awayScore !== null ? (
                    <div className="rounded-xl bg-neutral-950 px-3 py-1 border border-neutral-700">
                      <span className="text-xl sm:text-2xl font-black text-red-400">
                        {match.homeScore} - {match.awayScore}
                      </span>
                      <p className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">
                        Finalizado
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="rounded-xl bg-neutral-950 px-3 py-1.5 text-xs sm:text-sm font-black text-amber-400 border border-amber-500/30 shadow-lg">
                        VS
                      </span>
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-400 mt-1">
                        Partido
                      </span>
                    </div>
                  )}
                </div>

                {/* Equipo Visitante */}
                <div className="flex-1 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 mb-1.5 shadow-md">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-black text-white uppercase leading-tight line-clamp-2">
                    {awayName}
                  </h4>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                    Visitante
                  </span>
                </div>
              </div>

              {/* Datos de Horario y Cancha */}
              <div className="mt-3.5 space-y-1.5 text-xs text-neutral-300">
                <div className="flex items-center justify-center gap-2 font-bold text-white">
                  <Clock className="h-3.5 w-3.5 text-red-400" />
                  <span>{match.matchDate}</span>
                  <span>·</span>
                  <span className="text-amber-400">{match.matchTime}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-neutral-400 text-[11px]">
                  <MapPin className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span className="truncate">{match.venue}</span>
                </div>
              </div>

              {/* CUERPO ARBITRAL OFICIAL EN EL POST */}
              {match.referees && (
                <div className="mt-3 rounded-xl bg-neutral-950/80 p-2.5 border border-neutral-800 text-[10px] text-neutral-300">
                  <div className="flex items-center justify-center gap-1 font-bold text-amber-400 uppercase tracking-wider mb-1">
                    <UserCheck className="h-3 w-3" />
                    <span>Cuerpo Arbitral Oficial</span>
                  </div>
                  <p className="truncate">
                    <strong className="text-neutral-400">Principal:</strong> {match.referees.principal}
                    {" · "}
                    <strong className="text-neutral-400">Auxiliar:</strong> {match.referees.asistente}
                  </p>
                </div>
              )}
            </div>

            {/* 3. Footer del Flyer: Llamado a la Acción y URL */}
            <div className="relative z-10 border-t border-white/15 pt-2.5 mt-auto flex items-center justify-between text-[10px] text-neutral-400">
              <span className="font-semibold text-neutral-300">
                Cobertura oficial, tabla y goleadores en:
              </span>
              <span className="font-black text-red-400 uppercase tracking-wider text-xs bg-neutral-900 px-2 py-0.5 rounded border border-red-500/30">
                furiamenor.com
              </span>
            </div>
          </div>
        </div>

        {/* Barra de Acciones y Descarga */}
        <div className="border-t border-neutral-800 p-4 bg-neutral-950 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-neutral-400 hidden sm:block">
            Formato listo para publicar en redes sin necesidad de diseñador
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleNativeShare}
              disabled={isGenerating}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-xs font-bold text-neutral-200 hover:border-neutral-500 hover:text-white transition"
            >
              <Share2 className="h-4 w-4" />
              Compartir
            </button>

            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-red-500 transition shadow-lg shadow-red-600/30 disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              {isGenerating ? "Generando PNG..." : "Descargar Imagen (PNG)"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
