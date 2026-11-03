import React from "react";
import Link from "next/link";
import { DaerisBadge } from "@/components/ui/tournament-badges";
import { DaerisBadgeRenderer } from "@/components/ui/daeris-sub-badge-renderer";
import { daerisSubList } from "@/data/daeris-subtournaments";
import { ArrowRight, ChevronRight, Layers, MapPin, Trophy, Users, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Torneo Daeris | Circuito Oficial de Futsal",
  description: "Circuito Torneo Daeris en Caracas. Conoce sus 6 competiciones oficiales: Infantil 1ra y 2da División (Sub-8 a Sub-20), Institucional, Fútbol 7, Master 50 y Libre Parque Carabobo.",
};

export default function TorneoDaerisHubPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumb / Regreso */}
        <div className="mb-6 flex items-center gap-2 text-xs text-neutral-400">
          <Link href="/" className="hover:text-white transition">
            Inicio
          </Link>
          <ChevronRight className="h-3 w-3 text-neutral-600" />
          <Link href="/torneos" className="hover:text-white transition">
            Torneos
          </Link>
          <ChevronRight className="h-3 w-3 text-neutral-600" />
          <span className="font-semibold text-white">Torneo Daeris</span>
        </div>

        {/* Hero Banner Daeris */}
        <div className="mb-10 rounded-3xl border border-red-500/40 bg-gradient-to-r from-red-950/40 via-neutral-900 to-neutral-950 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="shrink-0 drop-shadow-2xl">
                <DaerisBadge size={92} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-red-500/20 px-3 py-0.5 text-xs font-bold text-red-400 border border-red-500/30">
                    Circuito Mayor de Futsal
                  </span>
                  <span className="rounded-full bg-neutral-800 px-3 py-0.5 text-xs text-neutral-300">
                    Caracas · 6 Torneos
                  </span>
                </div>
                <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                  Torneo Daeris
                </h1>
                <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
                  Bienvenido al centro oficial del Torneo Daeris. Selecciona a continuación
                  cualquiera de sus 6 competiciones para ingresar a su portal exclusivo con calendario,
                  resultados, tabla de posiciones oficial y estadísticas individuales.
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-neutral-400">
                  <MapPin className="h-4 w-4 text-red-400" />
                  <span>Sede Principal: Cancha Gimnasio Libertador del 23 de Enero, Caracas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Las 6 Competiciones de Daeris */}
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-red-400 font-bold">
                <Layers className="h-4 w-4" />
                Divisiones & Modalidades
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Las 6 Competiciones Oficiales de Torneo Daeris
              </h2>
            </div>
            <span className="text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full">
              Cada insignia e información es interactiva
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {daerisSubList.map((sub) => (
              <div
                key={sub.id}
                className="group flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 transition-all duration-300 hover:border-red-500/50 hover:bg-neutral-900 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    {/* Insignia clicable directa */}
                    <Link
                      href={`/torneos/daeris/${sub.slug}`}
                      className="transition-transform duration-300 hover:scale-110 shrink-0"
                      title={`Ver ${sub.name}`}
                    >
                      <DaerisBadgeRenderer badgeKey={sub.badgeKey} size={64} />
                    </Link>
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${sub.accent.pill}`}>
                      {sub.categoryLabel}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition leading-snug">
                    <Link href={`/torneos/daeris/${sub.slug}`}>
                      {sub.name}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs text-neutral-400 leading-relaxed line-clamp-2">
                    {sub.description}
                  </p>

                  {sub.hasCategories && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-red-400 font-semibold bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-lg">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                      <span>Segmentado en Sub-8, Sub-10, Sub-12, Sub-14, Sub-16, Sub-18 y Sub-20</span>
                    </div>
                  )}

                  <div className="mt-4 space-y-1.5 text-xs text-neutral-400 pt-3 border-t border-neutral-800/80">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-red-400 shrink-0" />
                      <span className="truncate">{sub.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                      <span>{sub.teamsCount} Equipos participantes</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800">
                  <div className="grid grid-cols-2 gap-2 mb-3 text-[11px] font-semibold">
                    <Link
                      href={`/torneos/daeris/${sub.slug}/posiciones`}
                      className="rounded-lg bg-neutral-800/80 px-2.5 py-1.5 text-center text-neutral-300 hover:bg-neutral-800 hover:text-white transition"
                    >
                      Posiciones
                    </Link>
                    <Link
                      href={`/torneos/daeris/${sub.slug}/calendario`}
                      className="rounded-lg bg-neutral-800/80 px-2.5 py-1.5 text-center text-neutral-300 hover:bg-neutral-800 hover:text-white transition"
                    >
                      Calendario
                    </Link>
                  </div>

                  <Link
                    href={`/torneos/daeris/${sub.slug}`}
                    className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-red-500 transition w-full"
                  >
                    Ingresar al Torneo
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
