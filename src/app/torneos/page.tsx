import React from "react";
import Link from "next/link";
import {
  Trophy,
  Users,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  Layers,
  ChevronRight,
} from "lucide-react";
import { DaerisBadge, PruebaBadge } from "@/components/ui/tournament-badges";
import { DaerisBadgeRenderer } from "@/components/ui/daeris-sub-badge-renderer";
import { daerisSubList } from "@/data/daeris-subtournaments";
import { OFFICIAL_VENUES } from "@/data/fixtures-noviembre-2026";

export const metadata = {
  title: "Torneos & Ligas Oficiales | Furia Menor",
  description:
    "Circuito oficial de torneos de fútbol sala y fútbol 7 en Caracas. Consulta clasificaciones, resultados oficiales con actas firmadas, goleadores y calendarios por categoría.",
};

export default function TorneosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
      {/* 1. ENCABEZADO PRINCIPAL DE TORNEOS */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left justify-between gap-6 border-b border-neutral-800 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-red-400 font-extrabold mb-1">
            <Trophy className="h-4 w-4" />
            Circuitos y Ligas Federadas
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Torneos & Ligas Oficiales
          </h1>
          <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
            Selecciona una competición para consultar de forma exclusiva sus tablas de posiciones,
            resultados con actas físicas firmadas, calendarios y estadísticas por categoría.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/posiciones"
            className="rounded-xl bg-red-600 px-5 py-2.5 text-xs sm:text-sm font-black text-white hover:bg-red-500 transition shadow-lg shadow-red-600/30"
          >
            Tablas Generales
          </Link>
          <Link
            href="/calendario"
            className="rounded-xl border border-neutral-800 bg-neutral-900/80 px-4 py-2.5 text-xs sm:text-sm font-bold text-neutral-300 hover:border-neutral-700 hover:text-white transition"
          >
            Calendario Macro
          </Link>
        </div>
      </div>

      {/* 2. LISTADO PROTAGÓNICO DE COMPETICIONES (DIRECTO Y SIN ARROZ CON MANGO) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-red-400" />
              Competiciones en Disputa (Temporada Oficial 2026)
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Cada torneo cuenta con su propio portal independiente: posiciones, actas, fixture y goleadores.
            </p>
          </div>
          <span className="text-xs font-bold text-neutral-500 self-start sm:self-auto">
            {daerisSubList.length} Torneos Activos
          </span>
        </div>

        {/* Rejilla de Torneos Oficiales */}
        <div className="grid gap-6 md:grid-cols-2">
          {daerisSubList.map((sub) => {
            const basePath = `/torneos/daeris/${sub.slug}`;

            return (
              <div
                key={sub.id}
                className="group relative rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6 sm:p-7 transition-all duration-300 hover:border-red-500/60 hover:bg-neutral-900 hover:shadow-2xl hover:shadow-red-950/20 flex flex-col justify-between overflow-hidden"
              >
                {/* Glow decorativo de fondo */}
                <div className="absolute top-0 right-0 h-32 w-32 bg-red-600/5 rounded-full blur-2xl pointer-events-none group-hover:bg-red-600/10 transition" />

                <div>
                  {/* Cabecera del Torneo */}
                  <div className="flex items-start gap-4 mb-4">
                    <Link
                      href={basePath}
                      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
                    >
                      <DaerisBadgeRenderer badgeKey={sub.badgeKey} size={70} />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${sub.accent.pill}`}
                        >
                          {sub.categoryLabel}
                        </span>
                        <span className="rounded-full bg-neutral-800 px-2 py-0.5 text-[10px] font-bold text-neutral-300">
                          {sub.status}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-red-400 transition truncate">
                        <Link href={basePath}>{sub.name}</Link>
                      </h3>

                      <p className="text-xs text-neutral-400 flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3 text-red-400 shrink-0" />
                        <span className="truncate">{sub.venue}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5">
                    {sub.description}
                  </p>

                  {/* Acceso Directo por Categorías (Si tiene categorías menores) */}
                  {sub.hasCategories && sub.categories && (
                    <div className="mb-5 pt-3 border-t border-neutral-800/80">
                      <span className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 mb-2">
                        Elige tu categoría (Acceso directo sin filtros):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {sub.categories.map((cat) => (
                          <Link
                            key={cat}
                            href={`${basePath}?cat=${cat.toLowerCase()}`}
                            className="rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs font-bold text-neutral-300 hover:border-red-500 hover:bg-red-600 hover:text-white transition shadow-sm active:scale-95"
                          >
                            {cat}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Pie de la Tarjeta con Enlace Completo */}
                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-semibold flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-neutral-500" />
                    {sub.teamsCount} Equipos Oficiales
                  </span>

                  <Link
                    href={basePath}
                    className="inline-flex items-center gap-1.5 font-black text-red-400 group-hover:text-red-300 transition"
                  >
                    <span>Entrar a la Liga</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. UTILIDADES ADICIONALES: PROGRAMACIÓN POR CANCHAS */}
      <section className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-red-400" />
              Sedes Deportivas Oficiales de Caracas
            </span>
            <h3 className="text-lg font-black text-white mt-1">
              Cartelera de Partidos por Sede y Cancha
            </h3>
          </div>
          <Link
            href="/calendario"
            className="text-xs font-bold text-red-400 hover:text-red-300 transition flex items-center gap-1"
          >
            Ver calendario general de todas las canchas
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {OFFICIAL_VENUES.map((v) => {
            const isFutsal = v.discipline === "Fútbol Sala";
            return (
              <Link
                key={v.id}
                href={`/calendario?sede=${encodeURIComponent(v.name)}`}
                className={`group flex flex-col justify-between p-3.5 rounded-2xl border transition hover:scale-[1.02] active:scale-98 ${
                  isFutsal
                    ? "border-neutral-800 bg-neutral-950/70 hover:border-red-500/50 hover:bg-neutral-900"
                    : "border-neutral-800 bg-neutral-950/70 hover:border-emerald-500/50 hover:bg-neutral-900"
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isFutsal ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
                    }`}
                  >
                    {isFutsal ? "Futsal" : "Fútbol 7"}
                  </span>
                  <span className="text-xs font-black text-white">{v.matchesCount} PJ</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-200 group-hover:text-white transition line-clamp-1">
                    {v.short}
                  </h4>
                  <p className="text-[10px] text-neutral-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="h-2.5 w-2.5 shrink-0" />
                    <span className="truncate">{v.location}</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
