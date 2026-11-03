"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Academy,
  AcademyCategory,
  academiesData,
} from "@/data/academies-data";
import { AcademyBadge } from "@/components/academies/academy-badge";
import {
  MapPin,
  Calendar,
  Users,
  Trophy,
  Phone,
  Mail,
  Clock,
  ArrowLeft,
  Shield,
  Award,
  ChevronRight,
  ExternalLink,
  Flame,
  UserCheck,
  Activity,
  Layers,
  Sparkles,
  Camera,
  Star,
} from "lucide-react";

// Inline brand SVGs for Instagram, Facebook and WhatsApp
function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

interface AcademyProfileViewProps {
  academy: Academy;
}

export function AcademyProfileView({ academy }: AcademyProfileViewProps) {
  // Available categories with rosters
  const availableCategories = Object.keys(academy.rosters) as AcademyCategory[];
  const initialCategory = availableCategories.length > 0 ? availableCategories[0] : academy.categories[0];
  
  const [activeCategory, setActiveCategory] = useState<AcademyCategory>(initialCategory);

  const currentRoster = academy.rosters[activeCategory];

  // Academias recomendadas del mismo municipio o disciplinas
  const relatedAcademies = academiesData
    .filter((a) => a.id !== academy.id && (a.municipality === academy.municipality || a.disciplines.some(d => academy.disciplines.includes(d))))
    .slice(0, 3);

  // Colores de badges de posiciones de jugadores
  const getPositionBadge = (pos: string) => {
    switch (pos) {
      case "Portero":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Cierre":
      case "Defensa":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Ala":
      case "Medio":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Pívot":
      case "Delantero":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-neutral-800 text-neutral-300 border-neutral-700";
    }
  };

  return (
    <div className="space-y-10">
      {/* 0. BREADCRUMBS & RETORNO */}
      <nav className="flex items-center gap-2 text-xs text-neutral-400">
        <Link
          href="/academias"
          className="inline-flex items-center gap-1.5 font-bold text-neutral-300 hover:text-red-400 transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Volver al Directorio de Academias</span>
        </Link>
        <span>/</span>
        <span className="text-neutral-500">{academy.municipality}</span>
        <span>/</span>
        <span className="text-white font-semibold truncate">{academy.name}</span>
      </nav>

      {/* 1. HERO CABECERA DEL CLUB */}
      <section className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/90 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-md">
        {/* Glow de color representativo */}
        <div
          className="absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: academy.colors.primary }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Escudo + Datos Principales */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative shrink-0 drop-shadow-2xl">
              <AcademyBadge slug={academy.slug} size={110} logoUrl={academy.logoUrl} />
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-red-600/20 border border-red-500/30 px-3 py-0.5 text-xs font-black text-red-400 uppercase tracking-wider">
                  {academy.municipality}
                </span>
                <span className="rounded-full bg-neutral-800 px-3 py-0.5 text-xs font-semibold text-neutral-300">
                  Fundado en {academy.foundationYear}
                </span>
                {academy.founder && (
                  <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-0.5 text-xs font-semibold text-amber-300">
                    Fundador: <strong className="text-white">{academy.founder}</strong>
                  </span>
                )}
                <span className="rounded-full border border-neutral-700 bg-neutral-950 px-2.5 py-0.5 text-xs text-neutral-400">
                  ID: {academy.id}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight">
                {academy.name}
              </h1>

              <p className="text-sm font-semibold text-neutral-400">
                {academy.officialName}
              </p>

              <p className="text-xs sm:text-sm italic text-amber-400/90 font-medium">
                "{academy.motto}"
              </p>

              {/* Rating Google Maps si está disponible */}
              {academy.rating && (
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <div className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span>{academy.rating.score.toFixed(1)}</span>
                    <span className="text-neutral-400 font-normal">
                      ({academy.rating.reviewsCount} opiniones en {academy.rating.source})
                    </span>
                  </div>
                  {academy.googleMapsUrl && (
                    <a
                      href={academy.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300 transition"
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      <span>Cómo llegar</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              )}

              {/* Colores oficiales */}
              <div className="pt-2 flex items-center gap-2 text-xs text-neutral-300">
                <span className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">
                  Colores:
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-neutral-700 shadow-sm"
                    style={{ backgroundColor: academy.colors.primary }}
                    title={academy.colors.names[0]}
                  />
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-neutral-700 shadow-sm"
                    style={{ backgroundColor: academy.colors.secondary }}
                    title={academy.colors.names[1]}
                  />
                  {academy.colors.tertiary && (
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-neutral-700 shadow-sm"
                      style={{ backgroundColor: academy.colors.tertiary }}
                      title={academy.colors.names[2] || "Blanco"}
                    />
                  )}
                  <span className="text-xs text-neutral-300 font-medium">
                    {academy.colors.names.length > 2
                      ? `${academy.colors.names.slice(0, -1).join(", ")} y ${academy.colors.names[academy.colors.names.length - 1]}`
                      : academy.colors.names.join(" y ")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Redes Sociales y Contacto Directo */}
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end justify-center shrink-0 border-t border-neutral-800/80 pt-5 lg:border-t-0 lg:pt-0">
            {/* Canales Digitales */}
            <div className="flex items-center gap-2">
              {academy.socials.instagram && (
                <a
                  href={`https://instagram.com/${academy.socials.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-800/80 px-3 py-2 text-xs font-bold text-neutral-200 hover:border-pink-500 hover:text-pink-400 hover:bg-neutral-800 transition"
                  title="Instagram Oficial"
                >
                  <InstagramIcon className="h-4 w-4 text-pink-400" />
                  <span>{academy.socials.instagram}</span>
                </a>
              )}

              {academy.socials.facebook && (
                <a
                  href={`https://facebook.com/${academy.socials.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-800/80 px-3 py-2 text-xs font-bold text-neutral-200 hover:border-blue-500 hover:text-blue-400 hover:bg-neutral-800 transition"
                  title="Facebook Oficial"
                >
                  <FacebookIcon className="h-4 w-4 text-blue-400" />
                  <span className="hidden sm:inline">Facebook</span>
                </a>
              )}

              {academy.socials.whatsapp && (
                <a
                  href={`https://wa.me/${academy.socials.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-800/80 px-3 py-2 text-xs font-bold text-neutral-200 hover:border-emerald-500 hover:text-emerald-400 hover:bg-neutral-800 transition"
                  title="WhatsApp Coordinación"
                >
                  <WhatsAppIcon className="h-4 w-4 text-emerald-400" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              )}
            </div>

            {/* Ficha de Coordinación y Directiva */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-3 text-xs text-neutral-300 space-y-1.5 w-full sm:w-auto">
              {academy.founder && (
                <div className="flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span className="font-semibold text-white">Fundador:</span>
                  <span className="text-amber-300/90 font-medium">{academy.founder}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <UserCheck className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                <span className="font-semibold text-white">Coordinador:</span>
                <span>{academy.contact.coordinator}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                <span className="text-neutral-400">Tlf:</span>
                <span className="font-mono text-neutral-200">{academy.contact.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                <span className="text-neutral-400">Atención:</span>
                <span>{academy.contact.officeHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reseña institucional */}
        <div className="mt-6 pt-5 border-t border-neutral-800/80">
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-4xl">
            {academy.bio}
          </p>
        </div>
      </section>

      {/* 2. GRID PRINCIPAL: SEDES Y RENDIMIENTO */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* COLUMNA 1 & 2: SEDES Y CANCHAS DE ENTRENAMIENTO */}
        <section className="lg:col-span-2 rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-7 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-600/20 text-red-400 border border-red-500/30">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider">
                  Sedes y Canchas de Entrenamiento
                </h2>
                <p className="text-xs text-neutral-400">
                  Espacios de localía y preparación técnica en Caracas
                </p>
              </div>
            </div>
            <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs font-semibold text-neutral-300">
              {academy.venues.length} Sede{academy.venues.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {academy.venues.map((venue, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-5 space-y-3 transition hover:border-neutral-700"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-white text-sm leading-snug">
                    {venue.name}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      venue.surface === "Tabloncillo"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : venue.surface === "Césped Sintético"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}
                  >
                    {venue.surface}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-neutral-400">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
                    <span>{venue.address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-neutral-300 font-medium">{venue.schedule}</span>
                  </div>
                </div>

                {venue.googleMapsUrl && (
                  <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between">
                    <a
                      href={venue.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-red-400 hover:text-red-300 transition"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Cómo llegar (Google Maps)</span>
                    </a>
                    <span className="text-[10px] text-neutral-500 font-mono">F3J3+88X</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* COLUMNA 3: WIDGET DE RESUMEN DE RENDIMIENTO */}
        <section className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-7 shadow-xl space-y-5">
          <div className="flex items-center gap-2.5 border-b border-neutral-800 pb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Trophy className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider">
                Resumen de Rendimiento
              </h2>
              <p className="text-[11px] text-neutral-400">
                Torneos en competencia activa
              </p>
            </div>
          </div>

          {/* Torneo Activo */}
          <div className="rounded-2xl border border-red-500/20 bg-red-600/10 p-3.5">
            <p className="text-[10px] font-black uppercase tracking-wider text-red-400">
              Torneo Oficial en Disputa
            </p>
            <p className="mt-0.5 text-xs font-bold text-white">
              {academy.performance.activeTournament}
            </p>
          </div>

          {/* Métricas Numéricas */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-2">
              <p className="text-base font-black text-white">{academy.performance.matchesPlayed}</p>
              <p className="text-[9px] font-bold uppercase text-neutral-400">PJ</p>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-2">
              <p className="text-base font-black text-emerald-400">{academy.performance.wins}</p>
              <p className="text-[9px] font-bold uppercase text-neutral-400">PG</p>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-2">
              <p className="text-base font-black text-amber-400">{academy.performance.draws}</p>
              <p className="text-[9px] font-bold uppercase text-neutral-400">PE</p>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-2">
              <p className="text-base font-black text-rose-400">{academy.performance.losses}</p>
              <p className="text-[9px] font-bold uppercase text-neutral-400">PP</p>
            </div>
          </div>

          {/* Goles y Efectividad */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-3.5 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Goles a Favor / Contra:</span>
              <span className="font-bold text-white">
                {academy.performance.goalsFor} GF / {academy.performance.goalsAgainst} GC
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Efectividad de Victorias:</span>
              <span className="font-black text-emerald-400">{academy.performance.winRate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Posición Promedio:</span>
              <span className="font-black text-amber-400">{academy.performance.averagePosition}</span>
            </div>
          </div>

          {/* Palmarés y Logros */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Palmarés Reciente:
            </p>
            <div className="space-y-1.5">
              {academy.performance.achievements.map((ach, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                  <Award className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{ach}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 3. LISTADO DE PLANTELES (ROSTERS) POR CATEGORÍA */}
      <section className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-red-600/20 text-red-400 border border-red-500/30">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wider">
                Planteles Oficiales por Categoría
              </h2>
              <p className="text-xs text-neutral-400">
                Nómina de atletas federados y cuerpo técnico para la temporada actual
              </p>
            </div>
          </div>

          {/* Selector de Categorías (Píldoras) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-black transition whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30 ring-1 ring-red-400"
                    : "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-700"
                }`}
              >
                {cat}
                <span className="ml-1.5 opacity-70 text-[10px]">
                  ({academy.rosters[cat]?.players.length || 0})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Información del Cuerpo Técnico para la categoría activa */}
        {currentRoster && (
          <div className="grid gap-3 sm:grid-cols-3 rounded-2xl border border-neutral-800 bg-neutral-950/70 p-4 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-400 font-black">
                DT
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-neutral-400">Director Técnico</p>
                <p className="font-bold text-white">{currentRoster.coach}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-blue-400 font-black">
                AT
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-neutral-400">Asistente Técnico</p>
                <p className="font-bold text-white">{currentRoster.assistant}</p>
              </div>
            </div>

            {currentRoster.captain && (
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 font-black">
                  C
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-neutral-400">Capitán del Plantel</p>
                  <p className="font-bold text-amber-300">{currentRoster.captain}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tabla / Grid Responsive de Atletas */}
        {currentRoster && currentRoster.players.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-950">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-neutral-800 bg-neutral-900/80 text-[10px] uppercase tracking-wider text-neutral-400">
                <tr>
                  <th className="py-3 px-3 text-center w-12">#</th>
                  <th className="py-3 px-4">Atleta</th>
                  <th className="py-3 px-3">Posición</th>
                  <th className="py-3 px-3">Cédula / Ficha</th>
                  <th className="py-3 px-3 text-center">Año Nac.</th>
                  <th className="py-3 px-3 text-center">Goles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {currentRoster.players.map((player) => (
                  <tr
                    key={player.ci + player.dorsal}
                    className="transition hover:bg-neutral-900/60"
                  >
                    {/* Dorsal */}
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-neutral-800 font-black text-xs text-white border border-neutral-700">
                        {player.dorsal}
                      </span>
                    </td>

                    {/* Nombre */}
                    <td className="py-3 px-4 font-bold text-white">
                      <div className="flex items-center gap-2">
                        <span>{player.name}</span>
                        {player.name === currentRoster.captain && (
                          <span className="rounded bg-amber-500/20 border border-amber-500/30 px-1.5 py-0.2 text-[9px] font-black text-amber-400 uppercase">
                            Cap
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Posición */}
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-bold ${getPositionBadge(
                          player.position
                        )}`}
                      >
                        {player.position}
                      </span>
                    </td>

                    {/* C.I. */}
                    <td className="py-3 px-3 font-mono text-neutral-400 text-xs">
                      {player.ci}
                    </td>

                    {/* Año Nacimiento */}
                    <td className="py-3 px-3 text-center text-neutral-300 font-medium">
                      {player.birthYear}
                    </td>

                    {/* Goles */}
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center gap-1 font-black text-white">
                        <Flame className="h-3 w-3 text-amber-500" />
                        {player.goals ?? 0}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-neutral-800 p-8 text-center text-neutral-400">
            <p className="text-xs font-semibold">
              El plantel de {activeCategory} se encuentra en fase de validación federativa.
            </p>
          </div>
        )}
      </section>

      {/* 4. GALERÍA MULTIMEDIA DEL CLUB */}
      <section className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Camera className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wider">
                Galería Multimedia Oficial
              </h2>
              <p className="text-xs text-neutral-400">
                Postales fotográficas de entrenamientos, jornadas y celebraciones
              </p>
            </div>
          </div>
          <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs font-semibold text-neutral-300">
            {academy.gallery.length} Fotos
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {academy.gallery.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 transition hover:border-neutral-700 hover:shadow-xl"
            >
              {/* Contenedor de simulación de fotografía deportiva con gradiente y escudo sutil */}
              <div
                className="relative flex h-48 w-full items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${item.colorBg}88, #0a0a0a)`,
                }}
              >
                <div className="opacity-20 transition-opacity duration-300 group-hover:opacity-40">
                  <AcademyBadge slug={academy.slug} size={70} />
                </div>
                
                <span className="absolute top-3 left-3 rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/20">
                  {item.category}
                </span>

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
              </div>

              {/* Pie de foto */}
              <div className="p-3.5 bg-neutral-950">
                <p className="text-xs font-semibold text-neutral-200 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ACADEMIAS RELACIONADAS / EXPLORAR OTROS CLUBES */}
      {relatedAcademies.length > 0 && (
        <section className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Otras Academias en {academy.municipality} o Disciplinas Afines
            </h3>
            <Link
              href="/academias"
              className="text-xs font-bold text-red-400 hover:text-red-300 transition flex items-center gap-1"
            >
              <span>Ver todas</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {relatedAcademies.map((rel) => (
              <Link
                key={rel.id}
                href={`/academias/${rel.slug}`}
                className="group flex items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-950/70 p-4 transition hover:border-red-500/40 hover:bg-neutral-900"
              >
                <div className="shrink-0 group-hover:scale-105 transition-transform">
                  <AcademyBadge slug={rel.slug} size={48} logoUrl={rel.logoUrl} />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-white text-xs group-hover:text-red-400 transition truncate">
                    {rel.name}
                  </p>
                  <p className="text-[10px] text-neutral-400 truncate">
                    {rel.municipality} • {rel.categories[0]} a {rel.categories[rel.categories.length - 1]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
