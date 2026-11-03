import Link from "next/link";
import { Calendar, MapPin, Trophy, Users, Layers, ArrowRight } from "lucide-react";
import { DaerisBadge, PruebaBadge } from "@/components/ui/tournament-badges";
import {
  DaerisInstitucionalBadge,
  DaerisFutbol7Badge,
  DaerisMaster50Badge,
  DaerisLibreParqueCaraboboBadge,
  DaerisInfantilPrimeraBadge,
  DaerisInfantilSegundaBadge,
} from "@/components/ui/daeris-sub-badges";
import { daerisSubList } from "@/data/daeris-subtournaments";

export const metadata = {
  title: "Torneos & Ligas | Furia Menor",
  description: "Circuito oficial de torneos de futsal en Caracas. Torneo Daeris y sus 6 divisiones, y Torneo de Prueba.",
};

export default function TorneosPage() {
  const getSubBadge = (key: string, size = 60) => {
    switch (key) {
      case "infantil-1ra":
        return <DaerisInfantilPrimeraBadge size={size} />;
      case "infantil-2da":
        return <DaerisInfantilSegundaBadge size={size} />;
      case "institucional":
        return <DaerisInstitucionalBadge size={size} />;
      case "futbol7":
        return <DaerisFutbol7Badge size={size} />;
      case "master50":
        return <DaerisMaster50Badge size={size} />;
      case "libre-parquecarabobo":
        return <DaerisLibreParqueCaraboboBadge size={size} />;
      default:
        return <DaerisInfantilPrimeraBadge size={size} />;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Encabezado */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
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

        <div className="flex items-center gap-2">
          <Link
            href="/calendario"
            className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-2 text-xs sm:text-sm font-semibold text-neutral-300 transition hover:border-neutral-700 hover:text-white"
          >
            Calendario General
          </Link>
          <Link
            href="/posiciones"
            className="rounded-xl bg-red-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md transition hover:bg-red-500"
          >
            Tablas de Posiciones
          </Link>
        </div>
      </div>

      {/* 1. SECCIÓN PRINCIPAL: TORNEO DAERIS Y SUS 6 DIVISIONES */}
      <div className="mb-12 rounded-3xl border border-red-500/40 bg-gradient-to-r from-red-950/40 via-neutral-900 to-neutral-950 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-800/80">
          <div className="flex items-center gap-5">
            <div className="shrink-0 drop-shadow-md">
              <DaerisBadge size={80} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-bold text-red-400 border border-red-500/30">
                  En Curso · Circuito Principal
                </span>
                <span className="text-xs text-neutral-400">Temporada 2026</span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">Torneo Daeris</h2>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mt-1">
                El circuito de futsal de referencia en Caracas. Dividido en 6 torneos independientes
                que abarcan desde categorías formativas menores hasta institucional, libre y master.
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs text-neutral-400">
                <MapPin className="h-3.5 w-3.5 text-red-400" />
                <span>Gimnasio Libertador del 23 de Enero, Caracas</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-500 transition"
            >
              Ver en Vivo en Home
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Las 6 Divisiones de Torneo Daeris */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="h-4 w-4 text-red-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-300">
              Las 6 Competiciones de Torneo Daeris
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {daerisSubList.map((sub) => (
              <div
                key={sub.id}
                className="flex items-start gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 transition hover:border-red-500/40 hover:bg-neutral-900"
              >
                <div className="shrink-0 pt-0.5">
                  {getSubBadge(sub.badgeKey, 56)}
                </div>

                <div className="flex-1 min-w-0">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-1 ${sub.accent.pill}`}>
                    {sub.categoryLabel}
                  </span>
                  <h4 className="text-sm font-bold text-white truncate">{sub.name}</h4>
                  <p className="mt-1 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {sub.description}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-500 pt-1.5 border-t border-neutral-800/60">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {sub.teamsCount} Equipos
                    </span>
                    <span className="text-neutral-400 font-medium">{sub.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. SEGUNDO TORNEO: TORNEO DE PRUEBA */}
      <div className="rounded-3xl border border-sky-500/30 bg-gradient-to-r from-sky-950/30 via-neutral-900 to-neutral-950 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="shrink-0 drop-shadow-md">
              <PruebaBadge size={80} />
            </div>
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
