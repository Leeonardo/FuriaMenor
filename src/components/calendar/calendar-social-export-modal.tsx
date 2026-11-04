"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
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
  Sliders,
  ChevronLeft,
  ChevronRight,
  Info,
  SlidersHorizontal,
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

  // Formato seleccionado
  const [format, setFormat] = useState<SocialCardFormat>("story");
  const [accentTheme, setAccentTheme] = useState<"red" | "gold" | "cyan" | "emerald">("red");
  const [customTitle, setCustomTitle] = useState<string>("CARTELERA OFICIAL");

  // Filtros internos dentro del modal para máxima personalización autogestionable
  const [modalVenue, setModalVenue] = useState<string>("all");
  const [modalDate, setModalDate] = useState<string>("all");
  const [modalTeam, setModalTeam] = useState<string>("all");
  const [modalCategory, setModalCategory] = useState<string>("all");

  // Densidad / Límite de partidos por flyer (Recomendado Social Media: 5 en Stories, 4 en Feed)
  const [matchesPerPage, setMatchesPerPage] = useState<number>(5);
  const [currentSlide, setCurrentSlide] = useState<number>(1);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Inicializar filtros internos con los filtros activos del calendario
  useEffect(() => {
    if (activeFilterSummary) {
      if (activeFilterSummary.venue && activeFilterSummary.venue !== "all") {
        setModalVenue(activeFilterSummary.venue);
      }
      if (activeFilterSummary.date && activeFilterSummary.date !== "all") {
        setModalDate(activeFilterSummary.date);
      }
      if (activeFilterSummary.team && activeFilterSummary.team !== "all") {
        setModalTeam(activeFilterSummary.team);
      }
      if (activeFilterSummary.category && activeFilterSummary.category !== "all") {
        setModalCategory(activeFilterSummary.category);
      }
    }
  }, [activeFilterSummary, isOpen]);

  // Ajustar densidad recomendada al cambiar de formato
  useEffect(() => {
    if (format === "feed") {
      setMatchesPerPage(4);
    } else {
      setMatchesPerPage(5);
    }
    setCurrentSlide(1);
  }, [format]);

  // Extraer opciones únicas para los filtros internos del modal
  const uniqueVenues = useMemo(() => {
    const s = new Set<string>();
    matches.forEach((m) => {
      if (m.venue) s.add(m.venue);
    });
    return Array.from(s).sort();
  }, [matches]);

  const uniqueDates = useMemo(() => {
    const s = new Set<string>();
    matches.forEach((m) => {
      if (m.matchDate) s.add(m.matchDate);
    });
    return Array.from(s).sort();
  }, [matches]);

  const uniqueTeams = useMemo(() => {
    const s = new Set<string>();
    matches.forEach((m) => {
      if (m.homeTeam) s.add(m.homeTeam);
      if (m.awayTeam) s.add(m.awayTeam);
    });
    return Array.from(s).sort();
  }, [matches]);

  const uniqueCategories = useMemo(() => {
    const s = new Set<string>();
    matches.forEach((m) => {
      if (m.category) s.add(m.category);
    });
    return Array.from(s).sort();
  }, [matches]);

  // Partidos filtrados en el modal
  const filteredMatchesInModal = useMemo(() => {
    return matches.filter((m) => {
      if (modalVenue !== "all") {
        const v = m.venue.toLowerCase();
        const target = modalVenue.toLowerCase();
        if (!v.includes(target) && !(m.venueShort && m.venueShort.toLowerCase().includes(target))) {
          return false;
        }
      }
      if (modalDate !== "all" && m.matchDate !== modalDate) {
        return false;
      }
      if (modalTeam !== "all" && m.homeTeam !== modalTeam && m.awayTeam !== modalTeam) {
        return false;
      }
      if (modalCategory !== "all" && m.category !== modalCategory) {
        return false;
      }
      return true;
    });
  }, [matches, modalVenue, modalDate, modalTeam, modalCategory]);

  // Paginación / Diapositivas
  const totalSlides = Math.max(1, Math.ceil(filteredMatchesInModal.length / matchesPerPage));

  // Asegurar slide válido
  const activeSlideIndex = Math.min(Math.max(1, currentSlide), totalSlides);

  const paginatedMatches = useMemo(() => {
    const start = (activeSlideIndex - 1) * matchesPerPage;
    return filteredMatchesInModal.slice(start, start + matchesPerPage);
  }, [filteredMatchesInModal, activeSlideIndex, matchesPerPage]);

  // Subtítulo inteligente para el flyer
  const computedSubtitle = useMemo(() => {
    const parts: string[] = [];
    if (modalVenue !== "all") {
      parts.push(modalVenue.replace("Cancha de Futsal ", "Cancha ").toUpperCase());
    }
    if (modalDate !== "all") {
      parts.push(formatDateVE(modalDate));
    }
    if (modalTeam !== "all") {
      parts.push(`EQUIPO: ${modalTeam.toUpperCase()}`);
    }
    if (modalCategory !== "all") {
      parts.push(`CAT: ${modalCategory}`);
    }
    if (parts.length === 0) {
      return "JORNADA OFICIAL NOVIEMBRE 2026";
    }
    return parts.join(" · ");
  }, [modalVenue, modalDate, modalTeam, modalCategory]);

  if (!isOpen) return null;

  // Temas de colores
  const themeStyles = {
    red: {
      accent: "text-red-500",
      accentBg: "bg-red-600",
      border: "border-red-500/50",
      glow: "rgba(220, 38, 38, 0.45)",
      badgeBg: "bg-red-500/20 text-red-300 border-red-500/30",
      pill: "bg-red-600 text-white shadow-md shadow-red-600/30",
      ring: "ring-red-400",
    },
    gold: {
      accent: "text-amber-400",
      accentBg: "bg-amber-500",
      border: "border-amber-500/50",
      glow: "rgba(245, 158, 11, 0.45)",
      badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      pill: "bg-amber-500 text-black shadow-md shadow-amber-500/30",
      ring: "ring-amber-400",
    },
    cyan: {
      accent: "text-cyan-400",
      accentBg: "bg-cyan-500",
      border: "border-cyan-500/50",
      glow: "rgba(6, 182, 212, 0.45)",
      badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      pill: "bg-cyan-500 text-black shadow-md shadow-cyan-500/30",
      ring: "ring-cyan-400",
    },
    emerald: {
      accent: "text-emerald-400",
      accentBg: "bg-emerald-500",
      border: "border-emerald-500/50",
      glow: "rgba(16, 185, 129, 0.45)",
      badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      pill: "bg-emerald-500 text-white shadow-md shadow-emerald-500/30",
      ring: "ring-emerald-400",
    },
  }[accentTheme];

  // Descarga PNG (alta resolución 2x)
  const handleDownloadImage = async () => {
    if (!flyerRef.current) return;
    try {
      setIsGenerating(true);
      const dataUrl = await htmlToImage.toPng(flyerRef.current, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
      });

      const cleanTitle = customTitle.toLowerCase().replace(/[^a-z0-9]/g, "-");
      const filename = `furia-menor-${cleanTitle}-${format}-parte-${activeSlideIndex}.png`;

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

  // Compartir nativo
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
          title: `Cartelera Oficial Furia Menor`,
          text: `Consulta los partidos oficiales: ${computedSubtitle}`,
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
      <div className="relative w-full max-w-6xl max-h-[94vh] flex flex-col rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden">
        {/* Cabecera Principal */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-4 sm:px-6 py-3.5 bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${themeStyles.badgeBg}`}>
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                Exportador Profesional para Redes Sociales
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-600/30 text-red-400 border border-red-500/30">
                  HD 1080p
                </span>
              </h3>
              <p className="text-[11px] text-neutral-400">
                Diseño optimizado para Instagram Historias, Feed y Estados de WhatsApp
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

        {/* CONTENEDOR EN 2 COLUMNAS (CONTROLES / PREVIEW) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 bg-neutral-950/60 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
          {/* COLUMNA IZQUIERDA: CONTROLES & PERSONALIZACIÓN */}
          <div className="lg:col-span-5 p-4 sm:p-6 space-y-5 overflow-y-auto max-h-[45vh] lg:max-h-[76vh]">
            {/* 1. Selector de Formato */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-neutral-300 flex items-center justify-between">
                <span>Formato de Publicación:</span>
                <span className="text-[10px] text-neutral-500 font-semibold">Resolución Pro</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormat("story")}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-2xl font-bold transition text-xs gap-1 border ${
                    format === "story"
                      ? "bg-red-600 text-white border-red-400 shadow-md shadow-red-600/30"
                      : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                  }`}
                >
                  <Smartphone className="h-4 w-4" />
                  <span className="text-[11px] font-extrabold">IG Story</span>
                  <span className="text-[9px] opacity-75">9:16 (1080p)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormat("whatsapp")}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-2xl font-bold transition text-xs gap-1 border ${
                    format === "whatsapp"
                      ? "bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-600/30"
                      : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                  }`}
                >
                  <Smartphone className="h-4 w-4" />
                  <span className="text-[11px] font-extrabold">WhatsApp</span>
                  <span className="text-[9px] opacity-75">9:16 (1080p)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormat("feed")}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-2xl font-bold transition text-xs gap-1 border ${
                    format === "feed"
                      ? "bg-red-600 text-white border-red-400 shadow-md shadow-red-600/30"
                      : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                  }`}
                >
                  <Square className="h-4 w-4" />
                  <span className="text-[11px] font-extrabold">Feed / Post</span>
                  <span className="text-[9px] opacity-75">1:1 Cuadrado</span>
                </button>
              </div>
            </div>

            {/* 2. Paleta de Color de Acento */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <Palette className="h-3.5 w-3.5 text-neutral-400" />
                <span>Color de Acento & Luces Neón:</span>
              </label>
              <div className="flex gap-2.5 items-center">
                {(
                  [
                    { key: "red", bg: "bg-red-600", label: "Rojo Furia" },
                    { key: "gold", bg: "bg-amber-500", label: "Dorado Campeón" },
                    { key: "cyan", bg: "bg-cyan-500", label: "Cyan Eléctrico" },
                    { key: "emerald", bg: "bg-emerald-500", label: "Verde Cancha" },
                  ] as const
                ).map((th) => (
                  <button
                    key={th.key}
                    type="button"
                    onClick={() => setAccentTheme(th.key)}
                    className={`h-8 w-8 rounded-full ${th.bg} transition-all flex items-center justify-center shadow-lg ${
                      accentTheme === th.key ? "ring-2 ring-white scale-110" : "opacity-60 hover:opacity-100"
                    }`}
                    title={th.label}
                  >
                    {accentTheme === th.key && <Check className="h-4 w-4 text-black font-black" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Título personalizado del Póster */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-neutral-300">
                Título del Póster:
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Ej: CARTELERA OFICIAL"
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 font-bold"
              />
            </div>

            {/* 4. Densidad de Partidos & Paginación por Diapositivas */}
            <div className="space-y-2.5 p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-300 flex items-center gap-1.5">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-red-400" />
                  Partidos por Diapositiva:
                </span>
                <span className="font-black text-white px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700">
                  {matchesPerPage} {matchesPerPage <= 5 ? "⭐ Óptimo" : "Compacto"}
                </span>
              </div>

              {/* Botones de densidad */}
              <div className="flex gap-1.5">
                {[3, 4, 5, 6, 7].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      setMatchesPerPage(num);
                      setCurrentSlide(1);
                    }}
                    className={`flex-1 py-1.5 rounded-xl font-bold text-xs transition ${
                      matchesPerPage === num
                        ? "bg-red-600 text-white shadow"
                        : "bg-neutral-800 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Selector de diapositivas si hay más partidos */}
              {totalSlides > 1 && (
                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400">
                    Diapositiva <strong className="text-white">{activeSlideIndex}</strong> de{" "}
                    <strong className="text-white">{totalSlides}</strong>
                  </span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      disabled={activeSlideIndex <= 1}
                      onClick={() => setCurrentSlide((p) => Math.max(1, p - 1))}
                      className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-white"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={activeSlideIndex >= totalSlides}
                      onClick={() => setCurrentSlide((p) => Math.min(totalSlides, p + 1))}
                      className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-white"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Filtros Internos para Personalización Inmediata */}
            <div className="space-y-2 p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800">
              <span className="text-[11px] font-black uppercase tracking-wider text-neutral-300 block">
                Filtros Rápidos para este Flyer:
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Sede */}
                <div>
                  <label className="block text-[10px] text-neutral-400 mb-0.5">Sede / Cancha:</label>
                  <select
                    value={modalVenue}
                    onChange={(e) => {
                      setModalVenue(e.target.value);
                      setCurrentSlide(1);
                    }}
                    className="w-full px-2 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                  >
                    <option value="all">Todas las Sedes</option>
                    {uniqueVenues.map((v) => (
                      <option key={v} value={v}>
                        {v.replace("Cancha de Futsal ", "Cancha ")}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fecha */}
                <div>
                  <label className="block text-[10px] text-neutral-400 mb-0.5">Fecha:</label>
                  <select
                    value={modalDate}
                    onChange={(e) => {
                      setModalDate(e.target.value);
                      setCurrentSlide(1);
                    }}
                    className="w-full px-2 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                  >
                    <option value="all">Todas las Fechas</option>
                    {uniqueDates.map((d) => (
                      <option key={d} value={d}>
                        {formatDateVE(d)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Equipo */}
                <div>
                  <label className="block text-[10px] text-neutral-400 mb-0.5">Equipo:</label>
                  <select
                    value={modalTeam}
                    onChange={(e) => {
                      setModalTeam(e.target.value);
                      setCurrentSlide(1);
                    }}
                    className="w-full px-2 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                  >
                    <option value="all">Todos los Equipos</option>
                    {uniqueTeams.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Categoría */}
                <div>
                  <label className="block text-[10px] text-neutral-400 mb-0.5">Categoría:</label>
                  <select
                    value={modalCategory}
                    onChange={(e) => {
                      setModalCategory(e.target.value);
                      setCurrentSlide(1);
                    }}
                    className="w-full px-2 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white"
                  >
                    <option value="all">Todas las Categorías</option>
                    {uniqueCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Tip Profesional de Social Media */}
            <div className="flex items-start gap-2 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs leading-relaxed">
              <Info className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
              <div>
                <p className="font-bold text-[11px] text-amber-200">Recomendación Social Media:</p>
                <p className="text-[10.5px] text-amber-300/90 mt-0.5">
                  Para Stories y WhatsApp Status, el límite óptimo son <strong>4 a 5 partidos</strong> para que
                  los usuarios lean claramente nombres y horarios en 5 segundos. Para jornadas largas, exporta en
                  varias diapositivas.
                </p>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: VISTA PREVIA DEL FLYER */}
          <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col items-center justify-center bg-neutral-950/80 overflow-y-auto">
            {paginatedMatches.length === 0 ? (
              <div className="text-center py-12 text-neutral-400">
                <Layers className="h-10 w-10 mx-auto text-neutral-600 mb-2" />
                <p className="font-bold text-sm">No hay partidos con los filtros seleccionados.</p>
                <p className="text-xs text-neutral-500 mt-1">
                  Ajusta los filtros de sede, equipo o categoría en el panel izquierdo.
                </p>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center">
                {/* CONTENEDOR ESCALABLE DEL LIENZO */}
                <div
                  ref={flyerRef}
                  className={`relative overflow-hidden text-neutral-100 flex flex-col justify-between border-2 ${
                    themeStyles.border
                  } shadow-2xl transition-all ${
                    format === "feed"
                      ? "w-full max-w-[420px] aspect-square p-4 sm:p-5"
                      : "w-full max-w-[340px] sm:max-w-[370px] aspect-[9/16] p-4 sm:p-5"
                  }`}
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${themeStyles.glow} 0%, rgba(10, 10, 10, 0.98) 55%, #050505 100%)`,
                  }}
                >
                  {/* Patrón deportivo de fondo */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div
                    className="absolute top-0 right-0 w-36 h-36 blur-3xl pointer-events-none"
                    style={{ backgroundColor: themeStyles.glow }}
                  />

                  {/* 1. Header del Flyer */}
                  <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 shrink-0 relative flex items-center justify-center rounded-xl bg-neutral-900 border border-neutral-700">
                        <Image
                          src="/logo.png"
                          alt="Furia Menor"
                          width={26}
                          height={26}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-black tracking-tight leading-none text-white uppercase">
                          Furia Menor
                        </p>
                        <p className={`text-[8px] uppercase tracking-[0.2em] ${themeStyles.accent} font-extrabold mt-0.5`}>
                          Torneo Oficial 2026
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      {totalSlides > 1 ? (
                        <span className={`text-[9px] font-black ${themeStyles.accent} uppercase tracking-wider block`}>
                          PARTE {activeSlideIndex} DE {totalSlides}
                        </span>
                      ) : (
                        <span className="text-[8.5px] uppercase font-bold tracking-widest text-neutral-400 block">
                          OFICIAL
                        </span>
                      )}
                      <span className="text-[9px] font-extrabold text-neutral-300 uppercase">
                        Caracas, VE
                      </span>
                    </div>
                  </div>

                  {/* 2. Banner de Título */}
                  <div className="relative z-10 my-1.5 text-center">
                    <h2 className="text-sm sm:text-base font-black tracking-tight text-white uppercase drop-shadow-md">
                      {customTitle}
                    </h2>
                    <p className="text-[8.5px] sm:text-[9px] font-bold text-neutral-200 uppercase tracking-wider mt-0.5 px-2 py-0.5 inline-block rounded-md bg-white/10 max-w-[95%] truncate">
                      {computedSubtitle}
                    </p>
                  </div>

                  {/* 3. Lista de Enfrentamientos con Diseño Espacioso (SIN TEXTOS CORTADOS) */}
                  <div className="relative z-10 flex-1 flex flex-col justify-center gap-2 my-1 overflow-hidden">
                    {paginatedMatches.map((m, idx) => (
                      <div
                        key={m.id || idx}
                        className="rounded-xl bg-neutral-900/90 border border-white/10 p-2 sm:p-2.5 backdrop-blur-md shadow-lg"
                      >
                        {/* Fila Superior del Partido: Hora + Categoría + Cancha */}
                        <div className="flex items-center justify-between text-[8.5px] sm:text-[9.5px] border-b border-white/10 pb-1 mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-black text-white flex items-center gap-1">
                              <Clock className={`h-2.5 w-2.5 ${themeStyles.accent}`} />
                              {m.matchTime}
                            </span>
                            <span className={`px-1.5 py-0.2 rounded text-[7.5px] sm:text-[8px] font-black uppercase ${themeStyles.badgeBg}`}>
                              {m.category} {m.division ? `(${m.division})` : ""}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-[8px] sm:text-[8.5px] text-neutral-300 font-semibold truncate max-w-[140px]">
                            <MapPin className="h-2.5 w-2.5 text-neutral-400 shrink-0" />
                            <span className="truncate">{m.venueShort || m.venue.replace("Cancha ", "")}</span>
                            {m.courtDetail && (
                              <span className="text-neutral-400 font-bold">({m.courtDetail})</span>
                            )}
                          </div>
                        </div>

                        {/* Enfrentamiento: Nombres Completos con Espacio Total */}
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                          <p className="text-[10.5px] sm:text-[11.5px] font-black text-white uppercase text-right leading-tight break-words">
                            {m.homeTeam}
                          </p>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[8.5px] font-black ${themeStyles.pill} shrink-0`}
                          >
                            VS
                          </span>
                          <p className="text-[10.5px] sm:text-[11.5px] font-black text-white uppercase text-left leading-tight break-words">
                            {m.awayTeam}
                          </p>
                        </div>
                      </div>
                    ))}
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

                {/* Indicador de Diapositiva & Total */}
                <div className="mt-3 flex items-center gap-2 text-[11px] text-neutral-400 font-medium">
                  <span>
                    Mostrando {paginatedMatches.length} de {filteredMatchesInModal.length} partidos filtrados
                  </span>
                  {totalSlides > 1 && (
                    <span className="text-red-400 font-bold">
                      · Diapositiva {activeSlideIndex} de {totalSlides}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BARRA INFERIOR DE ACCIONES */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-t border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2 text-xs">
            {copiedNotification ? (
              <span className="flex items-center gap-1 text-emerald-400 font-bold text-xs animate-in fade-in">
                <CheckCircle2 className="h-4 w-4" /> ¡Imagen descargada en alta resolución!
              </span>
            ) : (
              <span className="text-neutral-500 text-xs">
                💡 Consejo: Si exportas en historias, descarga cada diapositiva para subirlas en secuencia.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleNativeShare}
              disabled={isGenerating || paginatedMatches.length === 0}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs transition border border-neutral-700 disabled:opacity-50"
            >
              <Share2 className="h-4 w-4" />
              <span>Compartir en Redes</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadImage}
              disabled={isGenerating || paginatedMatches.length === 0}
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
