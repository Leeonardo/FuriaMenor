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
  ChevronLeft,
  ChevronRight,
  Info,
  SlidersHorizontal,
  Flame,
  Tv,
  Gem,
  Eye,
} from "lucide-react";
import * as htmlToImage from "html-to-image";
import { formatDateVE } from "@/lib/date-utils";
import { getAcademyBySlug } from "@/data/academies-data";
import { AcademyBadge } from "@/components/academies/academy-badge";

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
export type DesignTemplate = "cyber" | "arena" | "minimal";

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

// Convertidor Hex a RGBA para efectos dinámicos neón con cualquier color personalizado
function hexToRgba(hex: string, alpha: number) {
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c.split("").map((x) => x + x).join("");
  }
  const num = parseInt(c || "dc2626", 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Componente para renderizar el escudo oficial o monograma heráldico de un equipo
function TeamShield({ teamName, size = 26 }: { teamName: string; size?: number }) {
  const academy = getAcademyBySlug(teamName);

  if (academy) {
    return (
      <div style={{ width: size, height: size }} className="shrink-0 flex items-center justify-center">
        <AcademyBadge slug={academy.slug} size={size} logoUrl={academy.logoUrl} />
      </div>
    );
  }

  // Monograma de respaldo para clubes sin escudo vectorial formal
  const initials = teamName
    .replace(/\s*\([a-z0-9]\)/gi, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      style={{ width: size, height: size }}
      className="shrink-0 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center shadow text-[8px] font-black text-white"
    >
      {initials || "FM"}
    </div>
  );
}

export function CalendarSocialExportModal({
  isOpen,
  onClose,
  matches,
  activeFilterSummary,
}: CalendarSocialExportModalProps) {
  const flyerRef = useRef<HTMLDivElement>(null);

  // Estados de personalización principales
  const [format, setFormat] = useState<SocialCardFormat>("story");
  const [designTemplate, setDesignTemplate] = useState<DesignTemplate>("cyber");
  const [accentColor, setAccentColor] = useState<string>("#dc2626"); // Color hexadecimal 100% personalizable
  const [showTeamShields, setShowTeamShields] = useState<boolean>(true); // Opción de mostrar escudos
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

  // Paleta de presets rápidos populares
  const QUICK_PRESETS = [
    { label: "Rojo Furia", hex: "#dc2626" },
    { label: "Dorado Real", hex: "#f59e0b" },
    { label: "Cyan Eléctrico", hex: "#06b6d4" },
    { label: "Verde Neón", hex: "#10b981" },
    { label: "Morado Pro", hex: "#8b5cf6" },
    { label: "Naranja Fuego", hex: "#f97316" },
  ];

  // Sincronizar filtros al abrir
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

  // Opciones únicas de filtros
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

  // Paginación por diapositivas
  const totalSlides = Math.max(1, Math.ceil(filteredMatchesInModal.length / matchesPerPage));
  const activeSlideIndex = Math.min(Math.max(1, currentSlide), totalSlides);

  const paginatedMatches = useMemo(() => {
    const start = (activeSlideIndex - 1) * matchesPerPage;
    return filteredMatchesInModal.slice(start, start + matchesPerPage);
  }, [filteredMatchesInModal, activeSlideIndex, matchesPerPage]);

  // Subtítulo dinámico
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

  // Descarga en PNG a resolución Retina 2x (1080x1920 o 1080x1080)
  const handleDownloadImage = async () => {
    if (!flyerRef.current) return;
    try {
      setIsGenerating(true);
      const dataUrl = await htmlToImage.toPng(flyerRef.current, {
        quality: 1,
        pixelRatio: 2.2,
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

  // Compartir nativo en redes móviles
  const handleNativeShare = async () => {
    if (!flyerRef.current) return;
    try {
      setIsGenerating(true);
      const dataUrl = await htmlToImage.toPng(flyerRef.current, {
        quality: 1,
        pixelRatio: 2.2,
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
      <div className="relative w-full max-w-6xl max-h-[95vh] flex flex-col rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden">
        {/* Cabecera Principal */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-4 sm:px-6 py-3.5 bg-neutral-950">
          <div className="flex items-center gap-3">
            <div
              style={{
                backgroundColor: hexToRgba(accentColor, 0.2),
                borderColor: hexToRgba(accentColor, 0.4),
              }}
              className="flex h-9 w-9 items-center justify-center rounded-xl border text-white shadow"
            >
              <Sparkles style={{ color: accentColor }} className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                Exportador Oficial para Redes Sociales
                <span
                  style={{
                    backgroundColor: hexToRgba(accentColor, 0.25),
                    color: accentColor,
                    borderColor: hexToRgba(accentColor, 0.4),
                  }}
                  className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border"
                >
                  HD 1080p
                </span>
              </h3>
              <p className="text-[11px] text-neutral-400">
                Personalización total de colores, escudos y estilos de diapositiva
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

        {/* CONTENEDOR EN 2 COLUMNAS (AJUSTES / PREVISUALIZACIÓN) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 bg-neutral-950/60 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
          {/* PANEL IZQUIERDO: CONTROLES & PERSONALIZACIÓN */}
          <div className="lg:col-span-5 p-4 sm:p-6 space-y-5 overflow-y-auto max-h-[46vh] lg:max-h-[76vh]">
            {/* 1. Selector de Formato */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-neutral-300 flex items-center justify-between">
                <span>1. Formato de Publicación:</span>
                <span className="text-[10px] text-neutral-500 font-semibold">1080p Ultra HD</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormat("story")}
                  style={format === "story" ? { backgroundColor: accentColor, borderColor: accentColor } : {}}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-2xl font-bold transition text-xs gap-1 border ${
                    format === "story"
                      ? "text-white shadow-lg"
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
                  style={format === "whatsapp" ? { backgroundColor: accentColor, borderColor: accentColor } : {}}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-2xl font-bold transition text-xs gap-1 border ${
                    format === "whatsapp"
                      ? "text-white shadow-lg"
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
                  style={format === "feed" ? { backgroundColor: accentColor, borderColor: accentColor } : {}}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-2xl font-bold transition text-xs gap-1 border ${
                    format === "feed"
                      ? "text-white shadow-lg"
                      : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                  }`}
                >
                  <Square className="h-4 w-4" />
                  <span className="text-[11px] font-extrabold">Feed / Post</span>
                  <span className="text-[9px] opacity-75">1:1 Cuadrado</span>
                </button>
              </div>
            </div>

            {/* 2. Selector de Estilo / Template de Diseño */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-neutral-300 flex items-center justify-between">
                <span>2. Estilo Visual del Póster:</span>
                <span className="text-[10px] text-neutral-400 font-bold">3 Diseños Pro</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDesignTemplate("cyber")}
                  className={`flex flex-col items-start p-2.5 rounded-2xl border text-left transition ${
                    designTemplate === "cyber"
                      ? "bg-neutral-800 border-white text-white shadow-md ring-1 ring-white/50"
                      : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Flame className="h-3.5 w-3.5 text-red-400" />
                    <span className="text-[11px] font-black uppercase">Cyber Neón</span>
                  </div>
                  <p className="text-[9px] text-neutral-400 leading-tight">
                    Fondo carbón con luces neón y estética esports.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDesignTemplate("arena")}
                  className={`flex flex-col items-start p-2.5 rounded-2xl border text-left transition ${
                    designTemplate === "arena"
                      ? "bg-neutral-800 border-white text-white shadow-md ring-1 ring-white/50"
                      : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Tv className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-[11px] font-black uppercase">Arena TV</span>
                  </div>
                  <p className="text-[9px] text-neutral-400 leading-tight">
                    Franjas dinámicas estilo transmisión Premier League.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDesignTemplate("minimal")}
                  className={`flex flex-col items-start p-2.5 rounded-2xl border text-left transition ${
                    designTemplate === "minimal"
                      ? "bg-neutral-800 border-white text-white shadow-md ring-1 ring-white/50"
                      : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Gem className="h-3.5 w-3.5 text-cyan-400" />
                    <span className="text-[11px] font-black uppercase">Editorial</span>
                  </div>
                  <p className="text-[9px] text-neutral-400 leading-tight">
                    Diseño limpio, minimalista y tipografía elegante.
                  </p>
                </button>
              </div>
            </div>

            {/* 3. Selector Libre de Color (Cualquier Color en la Rueda) */}
            <div className="space-y-2 p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-black uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Palette className="h-3.5 w-3.5 text-neutral-400" />
                  <span>3. Color Personalizado:</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-white bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                    {accentColor}
                  </span>
                  {/* Selector Nativo de Color HTML5 */}
                  <label className="relative cursor-pointer">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      style={{ backgroundColor: accentColor }}
                      className="h-7 w-7 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition"
                      title="Seleccionar cualquier color personalizado"
                    />
                  </label>
                </div>
              </div>

              {/* Chips de Colores Rápidos */}
              <div className="flex flex-wrap gap-2 items-center pt-1">
                {QUICK_PRESETS.map((p) => (
                  <button
                    key={p.hex}
                    type="button"
                    onClick={() => setAccentColor(p.hex)}
                    style={{ backgroundColor: p.hex }}
                    className={`h-6 w-6 rounded-full transition-transform flex items-center justify-center ${
                      accentColor.toLowerCase() === p.hex.toLowerCase()
                        ? "ring-2 ring-white scale-110 shadow-md"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    title={p.label}
                  >
                    {accentColor.toLowerCase() === p.hex.toLowerCase() && (
                      <Check className="h-3.5 w-3.5 text-black font-black" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Opción de Escudos & Título */}
            <div className="space-y-3 p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800">
              {/* Toggle de Escudos */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Mostrar Escudos de Equipos</span>
                  <span className="text-[10px] text-neutral-400">
                    Incluye los emblemas oficiales o monogramas de cada academia
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTeamShields((prev) => !prev)}
                  style={showTeamShields ? { backgroundColor: accentColor } : {}}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                    showTeamShields ? "" : "bg-neutral-800"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${
                      showTeamShields ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Título editable */}
              <div>
                <label className="text-[10px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                  Título Principal del Flyer:
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Ej: CARTELERA OFICIAL"
                  className="w-full px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 font-bold"
                />
              </div>
            </div>

            {/* 5. Partidos por Diapositiva & Paginación */}
            <div className="space-y-2 p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-300 flex items-center gap-1.5">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-neutral-400" />
                  Partidos por Diapositiva:
                </span>
                <span className="font-black text-white px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800">
                  {matchesPerPage} {matchesPerPage <= 5 ? "⭐ Recomendado" : "Compacto"}
                </span>
              </div>

              <div className="flex gap-1.5">
                {[3, 4, 5, 6, 7].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      setMatchesPerPage(num);
                      setCurrentSlide(1);
                    }}
                    style={
                      matchesPerPage === num
                        ? { backgroundColor: accentColor, color: "#ffffff" }
                        : {}
                    }
                    className={`flex-1 py-1.5 rounded-xl font-bold text-xs transition ${
                      matchesPerPage === num
                        ? "shadow"
                        : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Diapositivas / Carrusel */}
              {totalSlides > 1 && (
                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-300">
                    Diapositiva <strong className="text-white">{activeSlideIndex}</strong> de{" "}
                    <strong className="text-white">{totalSlides}</strong>
                  </span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      disabled={activeSlideIndex <= 1}
                      onClick={() => setCurrentSlide((p) => Math.max(1, p - 1))}
                      className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 text-white"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={activeSlideIndex >= totalSlides}
                      onClick={() => setCurrentSlide((p) => Math.min(totalSlides, p + 1))}
                      className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 text-white"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 6. Filtros Rápidos (Sede, Fecha, Equipo, Categoría) */}
            <div className="space-y-2 p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800">
              <span className="text-[11px] font-black uppercase tracking-wider text-neutral-300 block">
                Filtros Rápidos para este Flyer:
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs">
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
          </div>

          {/* PANEL DERECHO: PREVISUALIZACIÓN DEL FLYER (RESPONSIVO Y SIN RECORTES) */}
          <div className="lg:col-span-7 p-3 sm:p-6 flex flex-col items-center justify-center bg-neutral-950/80 overflow-y-auto">
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
                {/* LIENZO A EXPORTAR */}
                <div
                  ref={flyerRef}
                  className={`relative overflow-hidden text-neutral-100 flex flex-col justify-between shadow-2xl transition-all ${
                    format === "feed"
                      ? "w-full max-w-[420px] aspect-square p-4 sm:p-5"
                      : "w-full max-w-[340px] sm:max-w-[365px] aspect-[9/16] p-4 sm:p-5"
                  } ${
                    designTemplate === "arena"
                      ? "border-2"
                      : designTemplate === "minimal"
                      ? "border"
                      : "border-2"
                  }`}
                  style={{
                    borderColor: hexToRgba(accentColor, 0.45),
                    background:
                      designTemplate === "arena"
                        ? `repeating-linear-gradient(45deg, #09090b, #09090b 14px, #101014 14px, #101014 28px)`
                        : designTemplate === "minimal"
                        ? `#09090b`
                        : `radial-gradient(circle at 50% 0%, ${hexToRgba(
                            accentColor,
                            0.45
                          )} 0%, rgba(10, 10, 10, 0.98) 55%, #050505 100%)`,
                  }}
                >
                  {/* Decoraciones de fondo según estilo */}
                  {designTemplate === "cyber" && (
                    <>
                      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                      <div
                        className="absolute top-0 right-0 w-36 h-36 blur-3xl pointer-events-none"
                        style={{ backgroundColor: hexToRgba(accentColor, 0.35) }}
                      />
                    </>
                  )}

                  {designTemplate === "arena" && (
                    <>
                      <div
                        className="absolute -top-12 -left-12 w-44 h-44 blur-3xl pointer-events-none"
                        style={{ backgroundColor: hexToRgba(accentColor, 0.3) }}
                      />
                      <div
                        className="absolute top-0 right-0 w-2 h-full opacity-70"
                        style={{ backgroundColor: accentColor }}
                      />
                    </>
                  )}

                  {designTemplate === "minimal" && (
                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-transparent to-neutral-950/80 pointer-events-none" />
                  )}

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
                        <p
                          style={{ color: accentColor }}
                          className="text-[8px] uppercase tracking-[0.2em] font-extrabold mt-0.5"
                        >
                          Torneo Oficial 2026
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      {totalSlides > 1 ? (
                        <span
                          style={{ color: accentColor }}
                          className="text-[9px] font-black uppercase tracking-wider block"
                        >
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
                  <div className="relative z-10 my-1 text-center">
                    <h2 className="text-sm sm:text-base font-black tracking-tight text-white uppercase drop-shadow-md">
                      {customTitle}
                    </h2>
                    <p className="text-[8.5px] sm:text-[9px] font-bold text-neutral-200 uppercase tracking-wider mt-0.5 px-2 py-0.5 inline-block rounded-md bg-white/10 max-w-[95%] truncate">
                      {computedSubtitle}
                    </p>
                  </div>

                  {/* 3. Lista de Enfrentamientos con Escudos y Espacio Amplio */}
                  <div className="relative z-10 flex-1 flex flex-col justify-center gap-2 my-1 overflow-hidden">
                    {paginatedMatches.map((m, idx) => {
                      return (
                        <div
                          key={m.id || idx}
                          style={
                            designTemplate === "arena"
                              ? { borderLeftColor: accentColor, borderLeftWidth: "4px" }
                              : {}
                          }
                          className={`rounded-xl p-2 sm:p-2.5 backdrop-blur-md shadow-lg transition-all ${
                            designTemplate === "minimal"
                              ? "bg-neutral-900/60 border border-white/5"
                              : "bg-neutral-900/90 border border-white/10"
                          }`}
                        >
                          {/* Fila Superior: Hora + Categoría + Cancha */}
                          <div className="flex items-center justify-between text-[8px] sm:text-[9px] border-b border-white/10 pb-1 mb-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className="font-black text-white flex items-center gap-1">
                                <Clock style={{ color: accentColor }} className="h-2.5 w-2.5" />
                                {m.matchTime}
                              </span>
                              <span
                                style={{
                                  backgroundColor: hexToRgba(accentColor, 0.2),
                                  color: accentColor,
                                  borderColor: hexToRgba(accentColor, 0.35),
                                }}
                                className="px-1.5 py-0.2 rounded text-[7.5px] sm:text-[8px] font-black uppercase border"
                              >
                                {m.category} {m.division ? `(${m.division})` : ""}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 text-[8px] text-neutral-300 font-semibold truncate max-w-[130px]">
                              <MapPin className="h-2.5 w-2.5 text-neutral-400 shrink-0" />
                              <span className="truncate">
                                {m.venueShort || m.venue.replace("Cancha ", "")}
                              </span>
                              {m.courtDetail && (
                                <span className="text-neutral-400 font-bold">({m.courtDetail})</span>
                              )}
                            </div>
                          </div>

                          {/* Enfrentamiento con Escudos Opcionales */}
                          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                            {/* Equipo Local */}
                            <div className="flex items-center justify-end gap-1.5 min-w-0">
                              <p className="text-[10px] sm:text-[11.5px] font-black text-white uppercase text-right leading-tight break-words">
                                {m.homeTeam}
                              </p>
                              {showTeamShields && (
                                <TeamShield teamName={m.homeTeam} size={22} />
                              )}
                            </div>

                            {/* Insignia Central VS */}
                            <span
                              style={{
                                backgroundColor: accentColor,
                                color: "#ffffff",
                                boxShadow: `0 2px 10px ${hexToRgba(accentColor, 0.4)}`,
                              }}
                              className="px-2 py-0.5 rounded-full text-[8px] font-black shrink-0 tracking-wider"
                            >
                              VS
                            </span>

                            {/* Equipo Visitante */}
                            <div className="flex items-center justify-start gap-1.5 min-w-0">
                              {showTeamShields && (
                                <TeamShield teamName={m.awayTeam} size={22} />
                              )}
                              <p className="text-[10px] sm:text-[11.5px] font-black text-white uppercase text-left leading-tight break-words">
                                {m.awayTeam}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* 4. Footer del Flyer */}
                  <div className="relative z-10 border-t border-white/15 pt-1.5 flex items-center justify-between text-[8px] text-neutral-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-2.5 w-2.5 text-neutral-400" />
                      <span>Fútbol Sala Menor & Fútbol 7</span>
                    </div>
                    <div className="font-extrabold text-white tracking-wider uppercase">
                      furiamenor.com
                    </div>
                  </div>
                </div>

                {/* Sub-texto informativo de la diapositiva */}
                <div className="mt-2.5 flex items-center gap-2 text-[11px] text-neutral-400 font-medium">
                  <span>
                    Mostrando {paginatedMatches.length} de {filteredMatchesInModal.length} partidos
                  </span>
                  {totalSlides > 1 && (
                    <span style={{ color: accentColor }} className="font-bold">
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
                <CheckCircle2 className="h-4 w-4" /> ¡Imagen generada y descargada en alta resolución!
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
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 4px 14px ${hexToRgba(accentColor, 0.4)}`,
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-xs transition text-white hover:brightness-110 active:scale-95 disabled:opacity-50"
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
