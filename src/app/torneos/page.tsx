import Link from "next/link";
import { Calendar, MapPin, Trophy, Users, Layers, ArrowRight, ShieldCheck, Activity, Sparkles } from "lucide-react";
import { DaerisBadge, PruebaBadge } from "@/components/ui/tournament-badges";
import { DaerisBadgeRenderer } from "@/components/ui/daeris-sub-badge-renderer";
import { daerisSubList } from "@/data/daeris-subtournaments";
import { OFFICIAL_VENUES } from "@/data/fixtures-noviembre-2026";

export const metadata = {
  title: "Torneos & Ligas | Furia Menor",
  description: "Circuito oficial de torneos de futsal en Caracas. Torneo Daeris y sus 6 divisiones, y Torneo de Prueba.",
};

export default function TorneosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Encabezado */}
      <div className="mb-8 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-red-400 font-bold">
            <Trophy className="h-4 w-4" />
            Competiciones Oficiales
          </div>
          <h1 className="mt-1 text-3xl font-extrabold text-white sm:text-4xl">
            Torneos & Ligas de Futsal
          </h1>
          <p className="mt-1 text-sm text-neutral-400">
            Seguimiento de resultados, posiciones y fixture por circuito y categoría en Caracas
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <Link
            href="/calendario"
            className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-2 text-xs sm:text-sm font-semibold text-neutral-300 transition hover:border-neutral-700 hover:text-white"
          >
            Calendario General
          </Link>
          <Link
            href="/posiciones"
            className="rounded-xl bg-red-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md transition hover:bg-red-500 shadow-red-600/30"
          >
            Tablas de Posiciones
          </Link>
        </div>
      </div>

      {/* BANNER OFICIAL: PROGRAMACIÓN NOVIEMBRE 2026 (FUTSAL & FÚTBOL 7) */}
      <div className="mb-10 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/80 p-5 sm:p-7 shadow-2xl relative">
        <div className="absolute top-0 right-0 h-40 w-40 bg-red-600/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 h-40 w-40 bg-emerald-600/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-800/80">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 px-3 py-1 text-xs font-black text-red-400 border border-red-500/30">
                <Sparkles className="h-3.5 w-3.5" />
                NUEVOS FIXTURES OFICIALES · NOVIEMBRE 2026
              </span>
              <span className="rounded-full bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-neutral-300">
                51 Partidos Programados
              </span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
              Calendarios Oficiales de Futsal & Fútbol 7
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-300 max-w-2xl">
              Consulta la programación integral para noviembre de 2026 en las 6 canchas oficiales de Caracas:
              37 partidos de Fútbol Sala y 14 encuentros de Fútbol 7 sobre césped sintético.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link
              href="/calendario?disciplina=Fútbol+Sala"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 px-4 py-2.5 text-xs font-bold text-white transition shadow-md shadow-red-600/20 active:scale-95"
            >
              ⚽ Ver Futsal (37)
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/calendario?disciplina=Fútbol+7"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white transition shadow-md shadow-emerald-600/20 active:scale-95"
            >
              🏟️ Ver Fútbol 7 (14)
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Sedes directas para acceso móvil instantáneo */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Acceso Rápido por Sede & Cancha:
            </span>
            <span className="text-[11px] text-neutral-500">Haz clic para filtrar</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {OFFICIAL_VENUES.map((v) => {
              const isFutsal = v.discipline === "Fútbol Sala";
              const count = v.id === "la-paz" ? 10 : v.id === "zona-rental" ? 8 : v.id === "guacamaya" ? 6 : 9;
              return (
                <Link
                  key={v.id}
                  href={`/calendario?sede=${encodeURIComponent(v.name)}`}
                  className={`group flex flex-col justify-between p-3 rounded-2xl border transition hover:scale-[1.02] active:scale-98 ${
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
                      {v.discipline === "Fútbol Sala" ? "Futsal" : "Fútbol 7"}
                    </span>
                    <span className="text-xs font-black text-white">{count} PJ</span>
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
        </div>
      </div>

      {/* 1. SECCIÓN PRINCIPAL: TORNEO DAERIS Y SUS 6 DIVISIONES */}
      <div className="mb-12 rounded-3xl border border-red-500/40 bg-gradient-to-r from-red-950/40 via-neutral-900 to-neutral-950 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-800/80">
          <div className="flex items-center gap-5">
            {/* Insignia oficial con enlace directo */}
            <Link
              href="/torneos/daeris"
              className="shrink-0 drop-shadow-md transition-transform duration-300 hover:scale-105"
              title="Ingresar a Torneo Daeris"
            >
              <DaerisBadge size={84} />
            </Link>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-bold text-red-400 border border-red-500/30">
                  En Curso · Circuito Principal
                </span>
                <span className="text-xs text-neutral-400">Temporada 2026</span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">
                <Link href="/torneos/daeris" className="hover:text-red-400 transition">
                  Torneo Daeris
                </Link>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mt-1">
                El circuito de futsal de referencia en Caracas. Dividido en 6 torneos independientes
                que abarcan desde categorías formativas menores (Sub-8 a Sub-20) hasta institucional, libre y master.
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs text-neutral-400">
                <MapPin className="h-3.5 w-3.5 text-red-400" />
                <span>Gimnasio Libertador del 23 de Enero, Caracas</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <Link
              href="/torneos/daeris"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-red-500 transition shadow-lg shadow-red-600/30"
            >
              Ingresar a Torneo Daeris
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Las 6 Divisiones de Torneo Daeris con insignias y tarjetas clicables */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-red-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-300">
                Las 6 Competiciones de Torneo Daeris
              </h3>
            </div>
            <span className="text-xs text-neutral-400">Haz clic en cualquier torneo o insignia</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {daerisSubList.map((sub) => (
              <Link
                key={sub.id}
                href={`/torneos/daeris/${sub.slug}`}
                className="group flex items-start gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 transition-all duration-300 hover:border-red-500/60 hover:bg-neutral-900 hover:shadow-xl hover:shadow-red-950/20"
              >
                {/* Insignia clicable */}
                <div className="shrink-0 pt-0.5 transition-transform duration-300 group-hover:scale-110">
                  <DaerisBadgeRenderer badgeKey={sub.badgeKey} size={58} />
                </div>

                <div className="flex-1 min-w-0">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-1 ${sub.accent.pill}`}>
                    {sub.categoryLabel}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition truncate">
                    {sub.name}
                  </h4>
                  <p className="mt-1 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {sub.description}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-500 pt-1.5 border-t border-neutral-800/60">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {sub.teamsCount} Equipos
                    </span>
                    <span className="text-red-400 font-semibold group-hover:translate-x-0.5 transition flex items-center gap-0.5">
                      Ver torneo
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 2. SEGUNDO TORNEO: TORNEO DE PRUEBA */}
      <div className="rounded-3xl border border-sky-500/30 bg-gradient-to-r from-sky-950/30 via-neutral-900 to-neutral-950 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="shrink-0 drop-shadow-md transition-transform duration-300 hover:scale-105"
              title="Torneo de Prueba"
            >
              <PruebaBadge size={80} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-sky-500/20 px-2.5 py-0.5 text-xs font-bold text-sky-400 border border-sky-500/30">
                  Fase Piloto · En Disputa
                </span>
                <span className="text-xs text-neutral-400">Edición 2026</span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">Torneo de Prueba</h2>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mt-1">
                Torneo piloto de prueba para el seguimiento y validación de marcadores,
                categorías y estadísticas del fútbol sala base caraqueño.
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs text-neutral-400">
                <MapPin className="h-3.5 w-3.5 text-sky-400" />
                <span>Cancha Parque Central, Caracas · Sub-10 a Sub-16 (12 Equipos)</span>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-500 transition shadow-md shadow-sky-600/20"
            >
              Seleccionar en Home
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
