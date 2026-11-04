"use client";

import React, { useRef, useState, useMemo } from "react";
import Image from "next/image";
import {
  Download,
  Share2,
  X,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Smartphone,
  Square,
  Check,
  Palette,
  Shield,
  Layers,
  CheckCircle2,
} from "lucide-react";
import * as htmlToImage from "html-to-image";
import { formatDateVE } from "@/lib/date-utils";

export interface CalendarExportMatch {
  id: string;
  discipline?: string;
  category: string;
  division?: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number | null;
  awayScore?: number | null;
  matchDate: string;
  matchTime: string;
  venue: string;
  venueShort?: string;
  courtDetail?: string;
  status?: string;
  jornada?: string;
  refereeName?: string;
}

export type SocialCardFormat = "story" | "feed" | "whatsapp";

interface CalendarSocialExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  matches: CalendarExportMatch[];
  activeFilterSummary?: {
    venue?: string;
    date?: string;
    team?: string;
    category?: string;
    discipline?: string;
  };
}

export function CalendarSocialExportModal({
  isOpen,
  onClose,
  matches,
  activeFilterSummary,
}: CalendarSocialExportModalProps) {
  const flyerRef = useRef<HTMLDivElement>(null);

  // Estados de personalización
  const [format, setFormat] = useState<SocialCardFormat>("story");
  const [accentTheme, setAccentTheme] = useState<"red" | "gold" | "cyan" | "emerald">("red");
  const [customTitle, setCustomTitle] = useState<string>("CARTELERA OFICIAL");
  const [showReferees, setShowReferees] = useState<boolean>(false);
  const [maxDisplay, setMaxDisplay] = useState<number>(7);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Calcular subtítulo inteligente según filtros activos
  const computedSubtitle = useMemo(() => {
    const parts: string[] = [];
    if (activeFilterSummary?.venue && activeFilterSummary.venue !== "all") {
      parts.push(activeFilterSummary.venue.toUpperCase());
    }
    if (activeFilterSummary?.date && activeFilterSummary.date !== "all") {
      parts.push(formatDateVE(activeFilterSummary.date));
    }
    if (activeFilterSummary?.team && activeFilterSummary.team !== "all") {
      parts.push(`EQUIPO: ${activeFilterSummary.team.toUpperCase()}`);
    }
    if (activeFilterSummary?.category && activeFilterSummary.category !== "all") {
      parts.push(`CAT: ${activeFilterSummary.category}`);
    }
    if (parts.length === 0) {
      return "JORNADA OFICIAL NOVIEMBRE 2026";
    }
    return parts.join(" · ");
  }, [activeFilterSummary]);

  // Lista de partidos a mostrar según límite
  const matchesToRender = useMemo(() => {
    const limit = format === "feed" ? Math.min(maxDisplay, 5) : maxDisplay;
    return matches.slice(0, limit);
  }, [matches, format, maxDisplay]);

  if (!isOpen) return null;

  // Temas de colores
  const themeStyles = {
    red: {
      accent: "text-red-500",
      accentBg: "bg-red-600",
      border: "border-red-500/40",
      glow: "rgba(220, 38, 38, 0.4)",
      badgeBg: "bg-red-500/20 text-red-300 border-red-500/30",
      pill: "bg-red-600 text-white shadow-red-600/30",
    },
    gold: {
      accent: "text-amber-400",
      accentBg: "bg-amber-500",
      border: "border-amber-500/40",
      glow: "rgba(245, 158, 11, 0.4)",
      badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      pill: "bg-amber-500 text-black shadow-amber-500/30",
    },
    cyan: {
      accent: "text-cyan-400",
      accentBg: "bg-cyan-500",
      border: "border-cyan-500/40",
      glow: "rgba(6, 182, 212, 0.4)",
      badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      pill: "bg-cyan-500 text-black shadow-cyan-500/30",
    },
    emerald: {
      accent: "text-emerald-400",
      accentBg: "bg-emerald-500",
      border: "border-emerald-500/40",
      glow: "rgba(16, 185, 129, 0.4)",
      badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      pill: "bg-emerald-500 text-white shadow-emerald-500/30",
    },
  }[accentTheme];

  // Descarga directa PNG
  const handleDownloadImage = async () => {
    if (!flyerRef.current) return;
    try {
      setIsGenerating(true);
      const dataUrl = await htmlToImage.toPng(flyerRef.current, {
        quality: 1,
        pixelRatio: 2, // 2x para resolución óptima 1080x1920 / 1080x1080
        cacheBust: true,
      });

      const cleanTitle = customTitle.toLowerCase().replace(/[^a-z0-9]/g, "-");
      const filename = `cartelera-${cleanTitle}-${format}.png`;

      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();

      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
    } catch (err) {
      console.error("Error al exportar cartelera:", err);
      alert("No se pudo generar la imagen. Inténtalo de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Compartir nativo (WhatsApp, Instagram Stories, etc.)
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
      const file = new File([blob], `cartelera-furia-menor-${format}.png`, {
        type: "image/png",
      });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Cartelera Furia Menor · ${computedSubtitle}`,
          text: `Consulta los partidos oficiales de Furia Menor: ${computedSubtitle}`,
        });
      } else {
        handleDownloadImage();
      }
    } catch (err) {
      console.error("Error al compartir:", err);
      handleDownloadImage();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-neutral-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[94vh] flex flex-col rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden">
        {/* Cabecera Principal */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-4 sm:px-6 py-3.5 bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${themeStyles.badgeBg}`}>
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                Exportar Cartelera Deportiva
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-600/30 text-red-400 border border-red-500/30">
                  HD 1080p
                </span>
              </h3>
              <p className="text-[11px] text-neutral-400">
                Diseño listo para Instagram Historias, Feed y Estados de WhatsApp
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

        {/* Barra de Controles y Personalización */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 px-4 sm:px-6 py-3 border-b border-neutral-800 bg-neutral-950/50 text-xs">
          {/* 1. Selector de Formato */}
          <div className="md:col-span-5 flex flex-col gap-1">
            <span className="font-semibold text-neutral-400 uppercase tracking-wider text-[10px]">
              Formato de Redes:
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setFormat("story")}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl font-bold transition text-xs ${
                  format === "story"
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30 ring-1 ring-red-400"
                    : "bg-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                <Smartphone className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">IG Story (9:16)</span>
              </button>

              <button
                onClick={() => setFormat("whatsapp")}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl font-bold transition text-xs ${
                  format === "whatsapp"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-1 ring-emerald-400"
                    : "bg-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                <Smartphone className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">WhatsApp (9:16)</span>
              </button>

              <button
                onClick={() => setFormat("feed")}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl font-bold transition text-xs ${
                  format === "feed"
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30 ring-1 ring-red-400"
                    : "bg-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                <Square className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Feed (1:1)</span>
              </button>
            </div>
          </div>

          {/* 2. Selector de Estilo / Tema */}
          <div className="md:col-span-3 flex flex-col gap-1">
            <span className="font-semibold text-neutral-400 uppercase tracking-wider text-[10px] flex items-center gap-1">
              <Palette className="h-3 w-3" /> Color de Acento:
            </span>
            <div className="flex gap-2 items-center h-8">
              {(
                [
                  { key: "red", bg: "bg-red-600", label: "Rojo Furia" },
                  { key: "gold", bg: "bg-amber-500", label: "Dorado" },
                  { key: "cyan", bg: "bg-cyan-500", label: "Cyan" },
                  { key: "emerald", bg: "bg-emerald-500", label: "Verde" },
                ] as const
              ).map((th) => (
                <button
                  key={th.key}
                  onClick={() => setAccentTheme(th.key)}
                  title={th.label}
                  className={`h-7 w-7 rounded-full ${th.bg} transition-all flex items-center justify-center ${
                    accentTheme === th.key ? "ring-2 ring-white scale-110" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {accentTheme === th.key && <Check className="h-3.5 w-3.5 text-black" />}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Título personalizado */}
          <div className="md:col-span-4 flex flex-col gap-1">
            <span className="font-semibold text-neutral-400 uppercase tracking-wider text-[10px]">
              Título del Póster:
            </span>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Ej: CARTELERA OFICIAL"
              className="w-full px-3 py-1.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 font-bold"
            />
          </div>
        </div>

        {/* Zona Central: Vista Previa Interactiva */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-950/70 flex flex-col items-center justify-center">
          {matches.length === 0 ? (
            <div className="text-center py-12 text-neutral-400">
              <Layers className="h-10 w-10 mx-auto text-neutral-600 mb-2" />
              <p className="font-bold">No hay partidos filtrados para mostrar en la cartelera.</p>
              <p className="text-xs text-neutral-500 mt-1">Ajusta los filtros para incluir partidos.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full">
              {/* LIENZO A EXPORTAR */}
              <div
                ref={flyerRef}
                className={`relative overflow-hidden text-neutral-100 flex flex-col justify-between border-2 ${
                  themeStyles.border
                } shadow-2xl transition-all ${
                  format === "feed"
                    ? "w-full max-w-[440px] aspect-square p-5"
                    : "w-full max-w-[360px] aspect-[9/16] p-5 sm:p-6"
                }`}
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${themeStyles.glow} 0%, rgba(13, 13, 13, 0.98) 60%, #050505 100%)`,
                }}
              >
                {/* Patrón deportivo de fondo */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                <div
                  className="absolute top-0 right-0 w-36 h-36 blur-3xl pointer-events-none"
                  style={{ backgroundColor: themeStyles.glow }}
                />

                {/* 1. Header del Flyer */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 shrink-0 relative flex items-center justify-center rounded-xl bg-neutral-900 border border-neutral-700">
                      <Image
                        src="/logo.png"
                        alt="Furia Menor"
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-black tracking-tight leading-none text-white uppercase">
                        Furia Menor
                      </p>
                      <p className={`text-[8.5px] uppercase tracking-[0.2em] ${themeStyles.accent} font-extrabold mt-0.5`}>
                        Torneo Oficial 2026
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-400 block">
                      OFICIAL
                    </span>
                    <span className={`text-[10px] font-black ${themeStyles.accent} uppercase`}>
                      Caracas, VE
                    </span>
                  </div>
                </div>

                {/* 2. Banner de Título */}
                <div className="relative z-10 my-2 text-center">
                  <h2 className="text-sm sm:text-base font-black tracking-tight text-white uppercase drop-shadow-md">
                    {customTitle}
                  </h2>
                  <p className="text-[9px] sm:text-[9.5px] font-bold text-neutral-300 uppercase tracking-wider mt-0.5 px-2 py-0.5 inline-block rounded-md bg-white/10">
                    {computedSubtitle}
                  </p>
                </div>

                {/* 3. Lista de Partidos */}
                <div className="relative z-10 flex-1 flex flex-col justify-center gap-1.5 overflow-hidden my-1">
                  {matchesToRender.map((m, idx) => (
                    <div
                      key={m.id || idx}
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-neutral-900/80 border border-white/10 backdrop-blur-sm"
                    >
                      {/* Horario y Categoría */}
                      <div className="flex flex-col items-start min-w-[70px] shrink-0">
                        <span className="text-[10px] font-black text-white leading-tight flex items-center gap-1">
                          <Clock className={`h-2.5 w-2.5 ${themeStyles.accent}`} />
                          {m.matchTime}
                        </span>
                        <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.2 rounded mt-0.5 ${themeStyles.badgeBg}`}>
                          {m.category}
                        </span>
                      </div>

                      {/* Equipos */}
                      <div className="flex-1 px-2 flex items-center justify-center text-center">
                        <div className="flex items-center justify-center gap-1.5 w-full">
                          <span className="text-[10px] sm:text-[11px] font-black text-white uppercase truncate max-w-[105px] sm:max-w-[125px] text-right">
                            {m.homeTeam}
                          </span>
                          <span className={`text-[8px] font-black px-1 rounded ${themeStyles.accent}`}>
                            VS
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-black text-white uppercase truncate max-w-[105px] sm:max-w-[125px] text-left">
                            {m.awayTeam}
                          </span>
                        </div>
                      </div>

                      {/* Cancha Corta */}
                      <div className="text-right min-w-[65px] shrink-0">
                        <span className="text-[8px] font-bold text-neutral-400 block truncate max-w-[75px]">
                          {m.venueShort || m.venue.replace("Cancha ", "")}
                        </span>
                        {m.courtDetail && (
                          <span className="text-[7.5px] font-extrabold text-neutral-500 uppercase">
                            Cancha {m.courtDetail}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {matches.length > matchesToRender.length && (
                    <div className="text-center py-0.5">
                      <span className="text-[8px] text-neutral-400 font-bold uppercase tracking-wider">
                        + {matches.length - matchesToRender.length} partidos adicionales en furiamenor.com
                      </span>
                    </div>
                  )}
                </div>

                {/* 4. Footer del Flyer */}
                <div className="relative z-10 border-t border-white/15 pt-2 flex items-center justify-between text-[8px] text-neutral-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-2.5 w-2.5 text-neutral-400" />
                    <span>Fútbol Sala Menor & Fútbol 7</span>
                  </div>
                  <div className="font-extrabold text-white tracking-wider uppercase">
                    furiamenor.com
                  </div>
                </div>
              </div>

              {/* Indicador de partidos incluidos */}
              <p className="text-[11px] text-neutral-500 mt-2 font-medium">
                Mostrando {matchesToRender.length} de {matches.length} partidos filtrados en este flyer.
              </p>
            </div>
          )}
        </div>

        {/* Barra Inferior de Acciones */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-4 border-t border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            {copiedNotification && (
              <span className="flex items-center gap-1 text-emerald-400 font-bold text-xs animate-in fade-in">
                <CheckCircle2 className="h-4 w-4" /> ¡Imagen descargada con éxito!
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleNativeShare}
              disabled={isGenerating || matches.length === 0}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs transition border border-neutral-700 disabled:opacity-50"
            >
              <Share2 className="h-4 w-4" />
              <span>Compartir en Redes</span>
            </button>

            <button
              onClick={handleDownloadImage}
              disabled={isGenerating || matches.length === 0}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-xs transition text-white shadow-lg disabled:opacity-50 ${
                format === "whatsapp" ? "bg-emerald-600 hover:bg-emerald-500" : "bg-red-600 hover:bg-red-500"
              }`}
            >
              <Download className="h-4 w-4" />
              <span>{isGenerating ? "Generando..." : "Descargar Imagen PNG"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
