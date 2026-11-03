import Link from "next/link";
import { ArrowRight, Goal, Shield, Trophy } from "lucide-react";
import { TournamentData } from "@/data/tournaments-data";
import { TournamentOfficialTable } from "@/components/tournaments/tournament-official-table";

interface StatsPreviewProps {
  tournament: TournamentData;
}

export function StatsPreview({ tournament }: StatsPreviewProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Encabezado de la sección */}
      <div className="mb-6 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-red-400 font-semibold">
            Rendimiento & Clasificación Oficial
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
            Estadísticas de {tournament.name}
          </h2>
          <p className="mt-1 text-sm text-neutral-400">
            Tabla de posiciones oficial reglamentaria, goleador del torneo y valla menos vencida
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <Link
            href="/posiciones"
            className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-3.5 py-1.5 text-xs font-semibold text-neutral-300 transition hover:border-neutral-700 hover:text-white"
          >
            Ver en Posiciones
          </Link>
          <Link
            href="/estadisticas"
            className="rounded-xl bg-red-600 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-red-500 shadow-sm shadow-red-600/30"
          >
            Ver Goleadores
          </Link>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Columna Izquierda: Tabla Oficial Exacta al Diseño de la Imagen */}
        <div className="lg:col-span-8">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-amber-400" />
              Planilla Oficial de Clasificación
            </span>
            <span className="text-xs text-neutral-500">
              {tournament.shortName} · 11 Equipos
            </span>
          </div>

          <TournamentOfficialTable
            title={`TABLA DE POSICIONES · ${tournament.name}`}
            groupName={tournament.groupName || "GRUPO A"}
            qualificationRule={tournament.qualificationRule || "CLASIFICAN LOS 8 PRIMEROS DE CADA GRUPO"}
            qualificationCutoff={tournament.qualificationCutoff || 8}
            rows={tournament.standings}
          />
        </div>

        {/* Columna Derecha: Goleador del Torneo y Valla Menos Vencida */}
        <div className="flex flex-col gap-5 lg:col-span-4">
          {/* 1. Goleador del Torneo */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 shadow-xl backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                  <Goal className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Goleador del Torneo</h3>
                  <p className="text-[11px] text-neutral-400">Tabla de Máximos Artilleros</p>
                </div>
              </div>
              <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-400">
                Líderes
              </span>
            </div>

            <div className="space-y-2">
              {tournament.topScorers.map((scorer, idx) => (
                <div
                  key={scorer.player}
                  className="flex items-center justify-between rounded-xl bg-neutral-950/70 border border-neutral-800/80 p-2.5 hover:border-neutral-700 transition"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-black ${
                        idx === 0
                          ? "bg-amber-400 text-black"
                          : idx === 1
                          ? "bg-neutral-300 text-black"
                          : idx === 2
                          ? "bg-amber-700 text-white"
                          : "bg-neutral-800 text-neutral-400"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">{scorer.player}</p>
                      <p className="text-[11px] text-neutral-400">{scorer.team}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-red-400">{scorer.goals}</span>
                    <span className="text-[10px] text-neutral-500 ml-1 font-semibold">Goles</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800/80 text-center">
              <Link
                href="/estadisticas"
                className="inline-flex items-center gap-1 text-xs font-bold text-red-400 hover:text-red-300 transition"
              >
                Ver tabla completa de goleadores
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* 2. Valla Menos Vencida */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 shadow-xl backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Valla Menos Vencida</h3>
                  <p className="text-[11px] text-neutral-400">Arquerías del Torneo</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                Porteros
              </span>
            </div>

            <div className="space-y-2">
              {tournament.leastConceded.map((keeper, idx) => (
                <div
                  key={keeper.player}
                  className="flex items-center justify-between rounded-xl bg-neutral-950/70 border border-neutral-800/80 p-2.5 hover:border-neutral-700 transition"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-black ${
                        idx === 0
                          ? "bg-emerald-400 text-black"
                          : "bg-neutral-800 text-neutral-400"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">{keeper.player}</p>
                      <p className="text-[11px] text-neutral-400">{keeper.team}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-400">
                      {keeper.cleanSheets} <span className="text-[10px] text-neutral-400 font-normal">invictas</span>
                    </div>
                    <div className="text-[10px] text-neutral-500">
                      {keeper.goalsConceded} GC ({keeper.matchesPlayed} PJ)
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800/80 text-center">
              <Link
                href="/estadisticas"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition"
              >
                Ver tabla completa de porteros
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
