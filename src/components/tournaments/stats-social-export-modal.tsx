"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  Download,
  Share2,
  X,
  Goal,
  Shield,
  Sparkles,
  Smartphone,
  Square,
  Check,
  Palette,
  Layers,
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  Tv,
  Gem,
  Award,
} from "lucide-react";
import * as htmlToImage from "html-to-image";
import { getAcademyBySlug } from "@/data/academies-data";
import { AcademyBadge } from "@/components/academies/academy-badge";

export type SocialCardFormat = "story" | "feed" | "whatsapp";
export type StatsTemplate = "cyber" | "arena" | "minimal";

export interface StatItem {
  pos: number;
  player: string;
  team: string;
  category?: string;
  value: number; // Goles o Goles Concedidos
  matches?: number;
  statLabel: string; // "Goles" o "Goles Recibidos"
  statType: "goles" | "porteros";
}

interface StatsSocialExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: StatItem[];
  tournamentName?: string;
  categoryName?: string;
  defaultStatType?: "goles" | "porteros";
}

// Convertidor Hex a RGBA para efectos neón
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

// Escudo del club
function TeamShieldSmall({ teamName, size = 22 }: { teamName: string; size?: number }) {
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
      className="shrink-0 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center shadow text-[8px] font-black text-white"
    >
      {initials || "FM"}
    </div>
  );
}

export function StatsSocialExportModal({
  isOpen,
  onClose,
  items,
  tournamentName = "Torneo Daeris",
  categoryName = "Sub-12",
  defaultStatType = "goles",
}: StatsSocialExportModalProps) {
  const flyerRef = useRef<HTMLDivElement>(null);

  const [format, setFormat] = useState<SocialCardFormat>("story");
  const [designTemplate, setDesignTemplate] = useState<StatsTemplate>("cyber");
  const [accentColor, setAccentColor] = useState<string>(
    defaultStatType === "goles" ? "#f59e0b" : "#06b6d4"
  );
  const [showTeamShields, setShowTeamShields] = useState<boolean>(true);
  const [customTitle, setCustomTitle] = useState<string>(
    defaultStatType === "goles" ? "LÍDERES DE GOLEO" : "VALLA MENOS VENCIDA"
  );
  const [customSubtitle, setCustomSubtitle] = useState<string>(
    `${tournamentName.toUpperCase()} · ${categoryName.toUpperCase()}`
  );

  const [maxDisplay, setMaxDisplay] = useState<number>(5);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  useEffect(() => {
    setCustomTitle(defaultStatType === "goles" ? "LÍDERES DE GOLEO" : "VALLA MENOS VENCIDA");
    setCustomSubtitle(`${tournamentName.toUpperCase()} · ${categoryName.toUpperCase()}`);
    setAccentColor(defaultStatType === "goles" ? "#f59e0b" : "#06b6d4");
  }, [defaultStatType, tournamentName, categoryName]);

  useEffect(() => {
    if (format === "feed") {
      setMaxDisplay(4);
    } else {
      setMaxDisplay(5);
    }
  }, [format]);

  const QUICK_PRESETS = [
    { label: "Dorado Bota de Oro", hex: "#f59e0b" },
    { label: "Cyan Guante de Oro", hex: "#06b6d4" },
    { label: "Rojo Furia", hex: "#dc2626" },
    { label: "Verde Neón", hex: "#10b981" },
    { label: "Morado Pro", hex: "#8b5cf6" },
    { label: "Naranja Fuego", hex: "#f97316" },
  ];

  const itemsToRender = useMemo(() => {
    return items.slice(0, maxDisplay);
  }, [items, maxDisplay]);

  const topLeader = itemsToRender[0];

  if (!isOpen) return null;

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
      const filename = `estadisticas-${cleanTitle}-${categoryName.toLowerCase()}-${format}.png`;

      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();

      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
    } catch (err) {
      console.error("Error al exportar estadísticas:", err);
      alert("No se pudo generar la imagen. Inténtalo de nuevo.");
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
        pixelRatio: 2.2,
        cacheBust: true,
      });

      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `estadisticas-${categoryName.toLowerCase()}-${format}.png`, {
        type: "image/png",
      });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${customTitle} · ${categoryName}`,
          text: `Consulta los líderes oficiales: ${customSubtitle}`,
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
              <Award style={{ color: accentColor }} className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                Exportar Estadísticas Individuales
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
                Póster oficial de Máximos Goleadores y Valla Menos Vencida
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
                1. Formato de Redes:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormat("story")}
                  style={format === "story" ? { backgroundColor: accentColor, borderColor: accentColor } : {}}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-2xl font-bold transition text-xs gap-1 border ${
                    format === "story"
                      ? "text-black shadow-lg"
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
                      ? "text-black shadow-lg"
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
                      ? "text-black shadow-lg"
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
                2. Estilo Visual del Líder:
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
                    <Flame className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-[11px] font-black uppercase">Spotlight</span>
                  </div>
                  <p className="text-[9px] text-neutral-400 leading-tight">
                    Foco gigante en el #1 con aureola brillante.
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
                    <Tv className="h-3.5 w-3.5 text-cyan-400" />
                    <span className="text-[11px] font-black uppercase">Arena TV</span>
                  </div>
                  <p className="text-[9px] text-neutral-400 leading-tight">
                    Tarjeta broadcast con barras de rendimiento.
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
                    <Gem className="h-3.5 w-3.5 text-red-400" />
                    <span className="text-[11px] font-black uppercase">Editorial</span>
                  </div>
                  <p className="text-[9px] text-neutral-400 leading-tight">
                    Estilo revista deportiva con números gigantes.
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

            {/* 4. Escudos & Títulos */}
            <div className="space-y-3 p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Mostrar Escudo del Club</span>
                  <span className="text-[10px] text-neutral-400">
                    Muestra el emblema de la academia al lado del atleta
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
                  placeholder="Ej: LÍDERES DE GOLEO"
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
                  placeholder="Ej: TORNEO DAERIS · SUB-12"
                  className="w-full px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs font-bold focus:outline-none"
                />
              </div>
            </div>

            {/* 5. Cantidad de Atletas a Mostrar */}
            <div className="space-y-2 p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-300 flex items-center gap-1.5">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-neutral-400" />
                  Atletas en el Póster:
                </span>
                <span className="font-black text-white px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800">
                  Top {maxDisplay}
                </span>
              </div>

              <div className="flex gap-1.5">
                {[3, 4, 5, 7, 8].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setMaxDisplay(num)}
                    style={
                      maxDisplay === num
                        ? { backgroundColor: accentColor, color: "#000000" }
                        : {}
                    }
                    className={`flex-1 py-1.5 rounded-xl font-bold text-xs transition ${
                      maxDisplay === num
                        ? "shadow font-black"
                        : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* PANEL DERECHO: PREVISUALIZACIÓN */}
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
                        Estadísticas Oficiales
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[8.5px] uppercase font-bold tracking-widest text-neutral-400 block">
                      OFICIAL
                    </span>
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

                {/* 3. Contenido Principal: Tarjeta Spotlight del #1 + Lista */}
                <div className="relative z-10 flex-1 flex flex-col justify-center gap-2 my-1 overflow-hidden">
                  {/* SPOTLIGHT DEL LÍDER #1 */}
                  {topLeader && (
                    <div
                      style={{
                        borderColor: hexToRgba(accentColor, 0.6),
                        background: `linear-gradient(135deg, ${hexToRgba(
                          accentColor,
                          0.15
                        )} 0%, rgba(20, 20, 20, 0.85) 100%)`,
                      }}
                      className="rounded-2xl border p-2.5 sm:p-3 shadow-xl backdrop-blur-md flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Insignia #1 */}
                        <div
                          style={{
                            backgroundColor: accentColor,
                            color: "#000000",
                            boxShadow: `0 0 16px ${hexToRgba(accentColor, 0.6)}`,
                          }}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-black text-sm"
                        >
                          #1
                        </div>

                        {/* Nombre y Club */}
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-black text-white uppercase truncate">
                            {topLeader.player}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {showTeamShields && (
                              <TeamShieldSmall teamName={topLeader.team} size={16} />
                            )}
                            <p className="text-[9.5px] text-neutral-300 uppercase font-bold truncate">
                              {topLeader.team}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Cifra del Líder */}
                      <div className="text-right pl-2 shrink-0">
                        <span
                          style={{ color: accentColor }}
                          className="text-2xl sm:text-3xl font-black leading-none block drop-shadow-md"
                        >
                          {topLeader.value}
                        </span>
                        <span className="text-[7.5px] uppercase font-extrabold tracking-wider text-neutral-400 block">
                          {topLeader.statLabel}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Resto de atletas (Posición 2 en adelante) */}
                  <div className="space-y-1.5 overflow-hidden">
                    {itemsToRender.slice(1).map((item, idx) => {
                      const posNumber = idx + 2;
                      return (
                        <div
                          key={item.player + idx}
                          className="flex items-center justify-between rounded-xl bg-neutral-900/80 border border-white/10 px-2.5 py-1.5 backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-[9px] font-black text-neutral-300">
                              #{posNumber}
                            </span>
                            {showTeamShields && (
                              <TeamShieldSmall teamName={item.team} size={16} />
                            )}
                            <div className="min-w-0">
                              <p className="text-[10px] sm:text-[11px] font-black text-white uppercase truncate">
                                {item.player}
                              </p>
                              <p className="text-[8px] text-neutral-400 uppercase font-semibold truncate">
                                {item.team}
                              </p>
                            </div>
                          </div>

                          <div className="text-right pl-2 shrink-0">
                            <span
                              style={{ color: accentColor }}
                              className="text-xs sm:text-sm font-black"
                            >
                              {item.value}
                            </span>
                            <span className="text-[7.5px] text-neutral-500 font-bold ml-1 uppercase">
                              {item.statLabel.slice(0, 3)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Footer del Flyer */}
                <div className="relative z-10 border-t border-white/15 pt-1.5 flex items-center justify-between text-[8px] text-neutral-400">
                  <div className="flex items-center gap-1">
                    <Award className="h-2.5 w-2.5 text-amber-400" />
                    <span>Líderes Oficiales Furia Menor</span>
                  </div>
                  <div className="font-extrabold text-white tracking-wider uppercase">
                    furiamenor.com
                  </div>
                </div>
              </div>

              {/* Sub-texto */}
              <p className="mt-2 text-[11px] text-neutral-400 font-medium">
                Mostrando Top {itemsToRender.length} de {items.length} atletas registrados
              </p>
            </div>
          </div>
        </div>

        {/* BARRA INFERIOR DE ACCIONES */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-t border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2 text-xs">
            {copiedNotification ? (
              <span className="flex items-center gap-1 text-emerald-400 font-bold text-xs animate-in fade-in">
                <CheckCircle2 className="h-4 w-4" /> ¡Póster de estadísticas descargado con éxito!
              </span>
            ) : (
              <span className="text-neutral-500 text-xs">
                💡 Consejo: Publica los líderes de goleo cada lunes tras finalizar la jornada del fin de semana.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleNativeShare}
              disabled={isGenerating || itemsToRender.length === 0}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs transition border border-neutral-700 disabled:opacity-50"
            >
              <Share2 className="h-4 w-4" />
              <span>Compartir en Redes</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadImage}
              disabled={isGenerating || itemsToRender.length === 0}
              style={{
                backgroundColor: accentColor,
                color: "#000000",
                boxShadow: `0 4px 14px ${hexToRgba(accentColor, 0.4)}`,
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs transition hover:brightness-110 active:scale-95 disabled:opacity-50"
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
