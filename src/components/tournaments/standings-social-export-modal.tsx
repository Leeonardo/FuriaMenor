"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  Download,
  Share2,
  X,
  Trophy,
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
  SlidersHorizontal,
  Flame,
  Tv,
  Gem,
} from "lucide-react";
import * as htmlToImage from "html-to-image";
import { OfficialTableRow } from "@/components/tournaments/tournament-official-table";
import { getAcademyBySlug } from "@/data/academies-data";
import { AcademyBadge } from "@/components/academies/academy-badge";

export type SocialCardFormat = "story" | "feed" | "whatsapp";
export type StandingsTemplate = "cyber" | "arena" | "minimal";

interface StandingsSocialExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  rows: OfficialTableRow[];
  tournamentName?: string;
  categoryName?: string;
  groupName?: string;
}

// Convertidor Hex a RGBA para efectos dinámicos
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

// Componente para escudo de equipo
function TeamShieldSmall({ teamName, size = 20 }: { teamName: string; size?: number }) {
  const academy = getAcademyBySlug(teamName);

  if (academy) {
    return (
      <div style={{ width: size, height: size }} className="shrink-0 flex items-center justify-center">
        <AcademyBadge slug={academy.slug} size={size} logoUrl={academy.logoUrl} />
      </div>
    );
  }

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
      className="shrink-0 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center shadow text-[7.5px] font-black text-white"
    >
      {initials || "FM"}
    </div>
  );
}

export function StandingsSocialExportModal({
  isOpen,
  onClose,
  rows,
  tournamentName = "Torneo Daeris",
  categoryName = "Sub-12",
  groupName,
}: StandingsSocialExportModalProps) {
  const flyerRef = useRef<HTMLDivElement>(null);

  // Estados de configuración
  const [format, setFormat] = useState<SocialCardFormat>("story");
  const [designTemplate, setDesignTemplate] = useState<StandingsTemplate>("cyber");
  const [accentColor, setAccentColor] = useState<string>("#dc2626");
  const [showTeamShields, setShowTeamShields] = useState<boolean>(true);
  const [customTitle, setCustomTitle] = useState<string>("TABLA DE POSICIONES");
  const [customSubtitle, setCustomSubtitle] = useState<string>(
    `${tournamentName.toUpperCase()} · ${categoryName.toUpperCase()}${groupName ? ` · ${groupName.toUpperCase()}` : ""}`
  );

  // Densidad / Límite de filas por diapositiva
  const [rowsPerPage, setRowsPerPage] = useState<number>(7);
  const [currentSlide, setCurrentSlide] = useState<number>(1);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Ajustar subtítulo si cambian props
  useEffect(() => {
    setCustomSubtitle(
      `${tournamentName.toUpperCase()} · ${categoryName.toUpperCase()}${groupName ? ` · ${groupName.toUpperCase()}` : ""}`
    );
  }, [tournamentName, categoryName, groupName]);

  // Ajustar densidad recomendada al cambiar de formato
  useEffect(() => {
    if (format === "feed") {
      setRowsPerPage(5);
    } else {
      setRowsPerPage(7);
    }
    setCurrentSlide(1);
  }, [format]);

  // Presets rápidos
  const QUICK_PRESETS = [
    { label: "Rojo Furia", hex: "#dc2626" },
    { label: "Dorado Campeón", hex: "#f59e0b" },
    { label: "Cyan Eléctrico", hex: "#06b6d4" },
    { label: "Verde Neón", hex: "#10b981" },
    { label: "Morado Pro", hex: "#8b5cf6" },
    { label: "Azul Real", hex: "#2563eb" },
  ];

  // Paginación de filas
  const totalSlides = Math.max(1, Math.ceil(rows.length / rowsPerPage));
  const activeSlideIndex = Math.min(Math.max(1, currentSlide), totalSlides);

  const paginatedRows = useMemo(() => {
    const start = (activeSlideIndex - 1) * rowsPerPage;
    return rows.slice(start, start + rowsPerPage);
  }, [rows, activeSlideIndex, rowsPerPage]);

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
      const filename = `tabla-posiciones-${categoryName.toLowerCase()}-${format}-slide-${activeSlideIndex}.png`;

      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();

      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
    } catch (err) {
      console.error("Error al exportar tabla:", err);
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
        pixelRatio: 2.2,
        cacheBust: true,
      });

      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `tabla-posiciones-${categoryName.toLowerCase()}-${format}.png`, {
        type: "image/png",
      });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Tabla de Posiciones · ${categoryName}`,
          text: `Consulta la clasificación oficial: ${customSubtitle}`,
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
      <div className="relative w-full max-w-5xl max-h-[95vh] flex flex-col rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden">
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
              <Trophy style={{ color: accentColor }} className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                Exportar Tabla de Posiciones
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
                Póster oficial listo para Instagram Historias, Feed y Estados de WhatsApp
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

        {/* 2 Columnas: Ajustes / Previsualización */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 bg-neutral-950/60 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
          {/* PANEL IZQUIERDO: CONTROLES */}
          <div className="lg:col-span-5 p-4 sm:p-6 space-y-5 overflow-y-auto max-h-[46vh] lg:max-h-[76vh]">
            {/* 1. Formato */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-neutral-300">
                1. Formato de Publicación:
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
                  <span className="text-[9px] opacity-75">9:16</span>
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
                  <span className="text-[9px] opacity-75">9:16</span>
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
                  <span className="text-[11px] font-extrabold">Feed Post</span>
                  <span className="text-[9px] opacity-75">1:1</span>
                </button>
              </div>
            </div>

            {/* 2. Estilo de Diseño (3 Opciones Pro) */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-neutral-300">
                2. Estilo Visual del Póster:
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
                    Aura neón, ranking brillante con podio destacado.
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
                    Gráfica de televisión oficial con columnas completas.
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
                    Diseño limpio, minimalista y tipografía sobria.
                  </p>
                </button>
              </div>
            </div>

            {/* 3. Selector Libre de Color */}
            <div className="space-y-2 p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-black uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Palette className="h-3.5 w-3.5 text-neutral-400" />
                  <span>3. Color de Acento:</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-white bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                    {accentColor}
                  </span>
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
                      title="Elegir cualquier color"
                    />
                  </label>
                </div>
              </div>

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

            {/* 4. Escudos & Título */}
            <div className="space-y-3 p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Mostrar Escudos de Equipos</span>
                  <span className="text-[10px] text-neutral-400">
                    Agrega los emblemas oficiales al lado del nombre
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

              <div>
                <label className="text-[10px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                  Título del Flyer:
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Ej: TABLA DE POSICIONES"
                  className="w-full px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                  Subtítulo / Categoría:
                </label>
                <input
                  type="text"
                  value={customSubtitle}
                  onChange={(e) => setCustomSubtitle(e.target.value)}
                  placeholder="Ej: SUB-12 · PRIMERA DIVISIÓN"
                  className="w-full px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs font-bold focus:outline-none"
                />
              </div>
            </div>

            {/* 5. Filas por Diapositiva & Paginación */}
            <div className="space-y-2 p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-300 flex items-center gap-1.5">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-neutral-400" />
                  Filas por Diapositiva:
                </span>
                <span className="font-black text-white px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800">
                  {rowsPerPage} equipos
                </span>
              </div>

              <div className="flex gap-1.5">
                {[4, 5, 6, 7, 8].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      setRowsPerPage(num);
                      setCurrentSlide(1);
                    }}
                    style={
                      rowsPerPage === num
                        ? { backgroundColor: accentColor, color: "#ffffff" }
                        : {}
                    }
                    className={`flex-1 py-1.5 rounded-xl font-bold text-xs transition ${
                      rowsPerPage === num
                        ? "shadow"
                        : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

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
          </div>

          {/* PANEL DERECHO: PREVISUALIZACIÓN DEL FLYER */}
          <div className="lg:col-span-7 p-3 sm:p-6 flex flex-col items-center justify-center bg-neutral-950/80 overflow-y-auto">
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
                {/* Decoración según template */}
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
                        Clasificación Oficial
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
                    {customSubtitle}
                  </p>
                </div>

                {/* 3. Tabla de Posiciones Deportiva Oficial */}
                <div className="relative z-10 flex-1 flex flex-col justify-center my-1 overflow-hidden">
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-neutral-950/80 backdrop-blur-md">
                    {/* Cabecera de Columnas */}
                    <div className="grid grid-cols-[28px_1fr_26px_26px_26px_32px_36px] items-center text-[7.5px] sm:text-[8.5px] font-black uppercase text-neutral-400 border-b border-white/10 px-2 py-1 bg-white/5 text-center">
                      <span className="text-left">Pos</span>
                      <span className="text-left pl-1">Club / Academia</span>
                      <span>JJ</span>
                      <span>JG</span>
                      <span>JP</span>
                      <span>DIF</span>
                      <span style={{ color: accentColor }}>PTS</span>
                    </div>

                    {/* Filas de Posiciones */}
                    <div className="divide-y divide-white/5">
                      {paginatedRows.map((r, idx) => {
                        const isTop3 = r.pos <= 3;
                        const medalColor =
                          r.pos === 1 ? "#f59e0b" : r.pos === 2 ? "#94a3b8" : r.pos === 3 ? "#d97706" : "";

                        return (
                          <div
                            key={r.team || idx}
                            style={
                              r.pos === 1 && designTemplate === "arena"
                                ? { borderLeftColor: accentColor, borderLeftWidth: "3px" }
                                : {}
                            }
                            className={`grid grid-cols-[28px_1fr_26px_26px_26px_32px_36px] items-center text-[8.5px] sm:text-[9.5px] px-2 py-1.5 transition-colors ${
                              r.pos === 1 ? "bg-white/[0.04]" : ""
                            }`}
                          >
                            {/* Posición con insignia */}
                            <div className="text-left font-black">
                              {isTop3 ? (
                                <span
                                  style={{ backgroundColor: medalColor, color: "#000000" }}
                                  className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-black shadow"
                                >
                                  {r.pos}
                                </span>
                              ) : (
                                <span className="text-neutral-400 pl-1">{r.pos}</span>
                              )}
                            </div>

                            {/* Equipo con Escudo */}
                            <div className="flex items-center gap-1.5 min-w-0 pr-1 text-left">
                              {showTeamShields && (
                                <TeamShieldSmall teamName={r.team} size={18} />
                              )}
                              <span className="font-extrabold text-white uppercase truncate text-[9px] sm:text-[10px]">
                                {r.team}
                              </span>
                            </div>

                            {/* Estadísticas */}
                            <span className="font-semibold text-neutral-300 text-center">{r.jj}</span>
                            <span className="font-semibold text-neutral-300 text-center">{r.jg}</span>
                            <span className="font-semibold text-neutral-400 text-center">{r.jp}</span>
                            <span className="font-bold text-neutral-300 text-center">
                              {r.dif > 0 ? `+${r.dif}` : r.dif}
                            </span>
                            <span
                              style={{
                                color: "#ffffff",
                                backgroundColor: hexToRgba(accentColor, 0.85),
                              }}
                              className="font-black text-center py-0.5 rounded text-[9px] shadow-sm"
                            >
                              {r.pts}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 4. Footer del Flyer */}
                <div className="relative z-10 border-t border-white/15 pt-1.5 flex items-center justify-between text-[8px] text-neutral-400">
                  <div className="flex items-center gap-1">
                    <Trophy className="h-2.5 w-2.5 text-amber-400" />
                    <span>Clasificación Oficial Furia Menor</span>
                  </div>
                  <div className="font-extrabold text-white tracking-wider uppercase">
                    furiamenor.com
                  </div>
                </div>
              </div>

              {/* Sub-texto */}
              <div className="mt-2.5 flex items-center gap-2 text-[11px] text-neutral-400 font-medium">
                <span>
                  Mostrando {paginatedRows.length} de {rows.length} equipos
                </span>
                {totalSlides > 1 && (
                  <span style={{ color: accentColor }} className="font-bold">
                    · Diapositiva {activeSlideIndex} de {totalSlides}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BARRA INFERIOR DE ACCIONES */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-t border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2 text-xs">
            {copiedNotification ? (
              <span className="flex items-center gap-1 text-emerald-400 font-bold text-xs animate-in fade-in">
                <CheckCircle2 className="h-4 w-4" /> ¡Tabla de posiciones descargada en alta resolución!
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
              disabled={isGenerating || paginatedRows.length === 0}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs transition border border-neutral-700 disabled:opacity-50"
            >
              <Share2 className="h-4 w-4" />
              <span>Compartir en Redes</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadImage}
              disabled={isGenerating || paginatedRows.length === 0}
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
