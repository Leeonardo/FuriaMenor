"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  Trophy,
  Award,
  Sparkles,
  Share2,
  Download,
  Check,
  Flame,
  Star,
  Zap,
  Target,
  Shield,
  Send,
} from "lucide-react";
import * as htmlToImage from "html-to-image";
import { motion, AnimatePresence } from "framer-motion";
import { getAcademyBySlug } from "@/data/academies-data";
import { AcademyBadge } from "@/components/academies/academy-badge";

export interface SpotlightPlayer {
  id: string;
  name: string;
  number?: number;
  team: string;
  category: string;
  division?: string;
  position: string;
  rating: number; // e.g. 96 OVR
  photoUrl?: string;
  highlightTitle?: string;
  editionYear?: string;
  jornada?: string;
  quote?: string;
  stats: {
    goals?: number;
    assists?: number;
    matches: number;
    mvpCount: number;
    cleanSheets?: number;
    conceded?: number;
    speedOrRating?: string;
  };
}

interface PlayerSpotlightCardProps {
  player: SpotlightPlayer;
  onShareWhatsApp?: (player: SpotlightPlayer) => void;
  className?: string;
}

// Escudo para la tarjeta
function CardTeamShield({ teamName, size = 28 }: { teamName: string; size?: number }) {
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
      className="shrink-0 rounded-full bg-neutral-900 border border-white/30 flex items-center justify-center shadow text-[8px] font-black text-white"
    >
      {initials || "FM"}
    </div>
  );
}

export function PlayerSpotlightCard({
  player,
  className = "",
}: PlayerSpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Compartir por WhatsApp formateado con emojis deportivos
  const handleShareWhatsApp = () => {
    const isKeeper = player.position.toLowerCase().includes("portero") || player.position.toLowerCase().includes("arquero");
    const statHighlight = isKeeper
      ? `• Vallas Invictas: *${player.stats.cleanSheets ?? 4}* 🧤\n• Goles Recibidos: *${player.stats.conceded ?? 3}*`
      : `• Goles Anotados: *${player.stats.goals ?? 8}* ⚽\n• Asistencias Clave: *${player.stats.assists ?? 4}* 🎯`;

    const message =
      `🌟 *¡EL CRACK DE LA JORNADA EN FURIA MENOR!* ⚽🔥\n\n` +
      `🏅 *${player.name.toUpperCase()}* (#${player.number || 10})\n` +
      `🛡️ Club: *${player.team}*\n` +
      `📌 Categoría: *${player.category}* ${player.division ? `(${player.division})` : ""}\n` +
      `⚡ Posición: *${player.position}*\n` +
      `⭐ Rating Furia: *${player.rating} OVR*\n\n` +
      `📊 *Rendimiento Oficial:*\n` +
      `${statHighlight}\n` +
      `• Partidos Disputados: *${player.stats.matches}* 🏃\n` +
      `• Distinciones MVP: *${player.stats.mvpCount}* 🏆\n\n` +
      `📲 *Consulta la tabla de goleadores y la ficha oficial en Furia Menor:*\n` +
      `👉 https://furiamenor.com/estadisticas`;

    const encoded = encodeURIComponent(message);
    const url = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(url, "_blank");
  };

  // Descarga directa del cromo en PNG Ultra HD
  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    try {
      setIsDownloading(true);
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 3.2,
        cacheBust: true,
        backgroundColor: "#0a0a0a",
      });

      const cleanName = player.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
      const filename = `cromo-furia-menor-${cleanName}-ultra-hd.png`;

      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error al exportar cromo:", err);
      alert("No se pudo descargar el cromo. Inténtalo de nuevo.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyText = () => {
    const text = `🌟 ¡El Crack de la Jornada Furia Menor! Atleta: ${player.name} (${player.team} - ${player.category}) con ${player.stats.goals ?? player.stats.cleanSheets} goles/vallas. Más en furiamenor.com/estadisticas`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* CONTENEDOR CROMO COLECCIONABLE */}
      <div className="relative group p-1 rounded-3xl holo-card-border shadow-2xl transition-all duration-300 hover:scale-[1.02]">
        <div
          ref={cardRef}
          className="relative w-[300px] sm:w-[330px] rounded-[22px] overflow-hidden bg-neutral-950 text-white flex flex-col justify-between border border-white/20 shadow-2xl"
          style={{
            background:
              "radial-gradient(circle at 50% 15%, #1e1b4b 0%, #0f172a 45%, #05070f 100%)",
          }}
        >
          {/* Malla decorativa de fondo */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:14px_14px]" />

          {/* Luz Neón en esquina superior */}
          <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-amber-500/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-red-600/25 blur-3xl pointer-events-none" />

          {/* 1. Header de la Tarjeta Coleccionable */}
          <div className="relative z-10 px-4 pt-3.5 pb-2 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-sm">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                {player.highlightTitle || "CRACK DE LA JORNADA"}
              </span>
            </div>
            <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40">
              {player.editionYear || "OFICIAL 2026"}
            </span>
          </div>

          {/* 2. Cuerpo Central: OVR Rating + Posición + Avatar + Escudo */}
          <div className="relative z-10 px-4 pt-4 pb-2 flex flex-col">
            <div className="flex items-start justify-between">
              {/* Insignia de Rating FIFA / Panini Style */}
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 drop-shadow">
                  {player.rating}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-300 mt-0.5">
                  {player.position.slice(0, 3).toUpperCase()}
                </span>
                <div className="h-0.5 w-6 bg-amber-400/60 my-1" />
                <span className="text-[9px] font-extrabold text-neutral-400">
                  #{player.number || 10}
                </span>
              </div>

              {/* Silueta / Foto del Atleta con Aura Deportiva */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/30 via-red-600/30 to-purple-600/30 blur-xl animate-pulse" />
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-amber-400/60 overflow-hidden bg-neutral-900 shadow-xl flex items-center justify-center">
                  {player.photoUrl ? (
                    <Image
                      src={player.photoUrl}
                      alt={player.name}
                      width={112}
                      height={112}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-2">
                      <div className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-1 text-amber-400">
                        <Flame className="h-7 w-7" />
                      </div>
                      <span className="text-[9px] font-black text-amber-300 tracking-wider">
                        #{player.number || 10}
                      </span>
                    </div>
                  )}
                </div>

                {/* Insignia del Club Superpuesta */}
                <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-neutral-950 border border-white/20 shadow-lg">
                  <CardTeamShield teamName={player.team} size={26} />
                </div>
              </div>
            </div>

            {/* Nombre y Club */}
            <div className="mt-3 text-center">
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white drop-shadow">
                {player.name}
              </h3>
              <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wide flex items-center justify-center gap-1.5 mt-0.5">
                <span>{player.team}</span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-300">{player.category}</span>
              </p>
              {player.division && (
                <span className="text-[9px] text-neutral-400 uppercase font-semibold">
                  {player.division}
                </span>
              )}
            </div>

            {/* Grilla de Estadísticas Clave */}
            <div className="mt-3 grid grid-cols-4 gap-1.5 p-2 rounded-xl bg-black/50 border border-white/10 backdrop-blur-sm text-center">
              <div>
                <p className="text-[8.5px] uppercase font-bold text-neutral-400">
                  {player.stats.goals !== undefined ? "Goles" : "Vallas"}
                </p>
                <p className="text-sm font-black text-amber-400">
                  {player.stats.goals ?? player.stats.cleanSheets ?? 0}
                </p>
              </div>
              <div>
                <p className="text-[8.5px] uppercase font-bold text-neutral-400">
                  {player.stats.assists !== undefined ? "Asist" : "Partidos"}
                </p>
                <p className="text-sm font-black text-white">
                  {player.stats.assists ?? player.stats.matches}
                </p>
              </div>
              <div>
                <p className="text-[8.5px] uppercase font-bold text-neutral-400">PJ</p>
                <p className="text-sm font-black text-neutral-300">{player.stats.matches}</p>
              </div>
              <div>
                <p className="text-[8.5px] uppercase font-bold text-neutral-400">MVP</p>
                <p className="text-sm font-black text-emerald-400 flex items-center justify-center gap-0.5">
                  <Star className="h-2.5 w-2.5 fill-emerald-400" />
                  {player.stats.mvpCount}
                </p>
              </div>
            </div>
          </div>

          {/* 3. Footer del Cromo */}
          <div className="relative z-10 px-4 py-2 border-t border-white/10 bg-black/60 flex items-center justify-between text-[8px] text-neutral-400">
            <span className="font-bold text-neutral-300 uppercase tracking-wider">
              {player.jornada || "Furia Menor Caracas"}
            </span>
            <span className="font-mono font-bold text-amber-400">FURIAMENOR.COM</span>
          </div>
        </div>
      </div>

      {/* BOTONES FLOTANTES DE ACCIÓN RÁPIDA (WHATSAPP + DESCARGA) */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 w-full max-w-[330px]">
        {/* Botón WhatsApp Destacado */}
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-900/40 transition-all transform active:scale-95"
          title="Compartir por WhatsApp con familia y amigos"
        >
          <Send className="h-4 w-4" />
          <span>Compartir por WhatsApp</span>
        </button>

        {/* Botón Descargar PNG */}
        <button
          type="button"
          onClick={handleDownloadCard}
          disabled={isDownloading}
          className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition disabled:opacity-40"
          title="Descargar cromo en imagen PNG"
        >
          {isDownloading ? (
            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
        </button>

        {/* Copiar enlace / resumen */}
        <button
          type="button"
          onClick={handleCopyText}
          className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition"
          title="Copiar resumen del atleta"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

/**
 * Sección interactiva "El Crack de la Jornada"
 * Permite alternar entre los mejores atletas de la fecha con transiciones fluidas
 */
export function CrackDeLaJornadaShowcase() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const featuredPlayers: SpotlightPlayer[] = [
    {
      id: "crack-1",
      name: "Jesús Martínez",
      number: 10,
      team: "Fusión Académica A",
      category: "Sub-12",
      division: "1ra División",
      position: "Pívot / Goleador",
      rating: 96,
      highlightTitle: "MÁXIMO ARTILLERO",
      editionYear: "OFICIAL 2026",
      jornada: "Jornada Noviembre · Cancha La Paz",
      quote: "Triplete decisivo en la victoria ante Espartanos Futsal",
      stats: {
        goals: 8,
        assists: 4,
        matches: 6,
        mvpCount: 4,
        speedOrRating: "96 PAC",
      },
    },
    {
      id: "crack-2",
      name: "Carlos Herrera",
      number: 1,
      team: "Fusión Académica A",
      category: "Sub-12",
      division: "1ra División",
      position: "Portero",
      rating: 94,
      highlightTitle: "MURALLA DE LA FECHA",
      editionYear: "OFICIAL 2026",
      jornada: "Jornada Noviembre · Cancha La Paz",
      quote: "4 vallas invictas consecutivas con 89% de efectividad",
      stats: {
        cleanSheets: 4,
        conceded: 3,
        matches: 6,
        mvpCount: 2,
        speedOrRating: "94 REF",
      },
    },
    {
      id: "crack-3",
      name: "Alejandro Torres",
      number: 7,
      team: "Futconexión",
      category: "Sub-12",
      division: "1ra División",
      position: "Ala Ofensiva",
      rating: 93,
      highlightTitle: "CRACK REVELACIÓN",
      editionYear: "OFICIAL 2026",
      jornada: "Jornada Noviembre · Parque Carabobo",
      quote: "6 goles y liderazgo indiscutido en la fase regular",
      stats: {
        goals: 6,
        assists: 5,
        matches: 6,
        mvpCount: 3,
        speedOrRating: "93 DRI",
      },
    },
  ];

  const current = featuredPlayers[selectedIdx];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900/90 via-neutral-950 to-neutral-950 p-4 sm:p-6 shadow-2xl mb-10">
      {/* Luz ambiental */}
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

      {/* Encabezado de la Sección */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-neutral-800 pb-4 mb-6 text-center md:text-left">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Trophy className="h-3.5 w-3.5" />
            <span>Gamificación Oficial Furia Menor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            El Crack de la Jornada & Cromos Digitales
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mt-1">
            Reconocimiento coleccionable a los atletas más destacados del fin de semana. ¡Comparte su cromo en WhatsApp y redes sociales!
          </p>
        </div>

        {/* Selector de Pestañas / Atletas Destacados */}
        <div className="flex flex-wrap justify-center gap-1.5 p-1 rounded-2xl bg-neutral-900 border border-neutral-800">
          {featuredPlayers.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setSelectedIdx(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedIdx === idx
                  ? "bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/30 font-black"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <span>#{p.number || 10}</span>
              <span className="hidden sm:inline">{p.name.split(" ")[0]}</span>
              {selectedIdx === idx && <Zap className="h-3 w-3 fill-neutral-950" />}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido: Cromo Coleccionable + Descripción y Méritos */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Columna Izquierda: Tarjeta Cromo */}
        <div className="lg:col-span-5 flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <PlayerSpotlightCard player={current} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Columna Derecha: Méritos, Estadísticas Detalladas y Guía de Gamificación */}
        <div className="lg:col-span-7 space-y-4 text-left">
          <div className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
              ¿Por qué fue elegido Crack de la Semana?
            </span>
            <h3 className="text-lg font-bold text-white">{current.quote}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              El comité de veedores y planillas oficiales de Furia Menor premió a{" "}
              <strong className="text-white">{current.name}</strong> por su contundencia ofensiva y
              liderazgo deportivo en la categoría {current.category} defendiendo los colores de{" "}
              <strong className="text-amber-300">{current.team}</strong>.
            </p>
          </div>

          {/* Tarjetas de Habilidades / Estadísticas Pro */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-neutral-900/50 border border-white/5">
              <span className="text-[10px] text-neutral-400 block font-bold uppercase">
                Posición Táctica
              </span>
              <span className="text-sm font-black text-white">{current.position}</span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-900/50 border border-white/5">
              <span className="text-[10px] text-neutral-400 block font-bold uppercase">
                Disciplina
              </span>
              <span className="text-sm font-black text-amber-400">Fútbol Sala Menor</span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-900/50 border border-white/5 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-neutral-400 block font-bold uppercase">
                Sede del Partido
              </span>
              <span className="text-sm font-black text-emerald-400 truncate block">
                {current.jornada?.split("·")[1]?.trim() || "Cancha Principal"}
              </span>
            </div>
          </div>

          {/* Banner de Motivación para Padres y Chamos */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-950/40 via-neutral-900 to-neutral-950 border border-red-500/20 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                ¡Impulsa a tu chamo en redes sociales!
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Utiliza el botón de <strong>Compartir por WhatsApp</strong> para enviar el cromo a
                grupos de representantes, familiares y estados con un solo toque.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
