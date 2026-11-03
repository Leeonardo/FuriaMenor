import Link from "next/link";
import { ArrowRight, Calendar, Goal, MapPin, Shield, Trophy } from "lucide-react";
import { TournamentData } from "@/data/tournaments-data";
import { DaerisBadge, PruebaBadge } from "@/components/ui/tournament-badges";

interface HeroSportsProps {
  tournament: TournamentData;
}

export function HeroSports({ tournament }: HeroSportsProps) {
  const nextMatch = tournament.highlightedMatch;
  const topScorer = tournament.topScorers[0];
  const topKeeper = tournament.leastConceded[0];

  return (
    <section className="relative overflow-hidden border-b border-neutral-800 bg-gradient-to-b from-neutral-900/50 via-neutral-950 to-neutral-950 py-10 sm:py-14">
      {/* Luz ambiental sutil de fondo según el torneo */}
      <div
        className={`pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl ${
          tournament.id === "daeris" ? "bg-red-600/10" : "bg-sky-500/10"
        }`}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Lado izquierdo: Introducción y accesos principales */}
          <div className="lg:col-span-7">
            <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${tournament.accentColor.pill}`}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-current"></span>
              </span>
              Furia Menor · {tournament.sport} · {tournament.name}
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white leading-tight">
              Resultados, Posiciones y Estadísticas en Vivo
            </h1>

            <p className="mt-4 max-w-2xl text-base text-neutral-300 sm:text-lg leading-relaxed">
              El centro digital de datos del futsal menor caraqueño. Consulta al instante
              el fixture de partidos, marcadores de cada jornada y el rendimiento de las categorías en el{" "}
              <strong className="text-white">{tournament.name}</strong>.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/calendario"
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition ${
                  tournament.id === "daeris"
                    ? "bg-red-600 shadow-red-600/20 hover:bg-red-500 hover:shadow-red-600/30"
                    : "bg-sky-600 shadow-sky-600/20 hover:bg-sky-500 hover:shadow-sky-600/30"
                }`}
              >
                <Calendar className="h-4 w-4" />
                Ver Calendario de Partidos
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/posiciones"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/80 px-4 py-3 text-sm font-semibold text-neutral-200 transition hover:border-neutral-600 hover:bg-neutral-800 hover:text-white"
              >
                <Trophy className="h-4 w-4 text-amber-400" />
                Tablas de Posiciones
              </Link>
              <Link
                href="/estadisticas"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-3 text-sm font-medium text-neutral-300 transition hover:border-neutral-700 hover:text-white"
              >
                <Goal className="h-4 w-4 text-red-400" />
                Goleadores
              </Link>
            </div>
          </div>

          {/* Lado derecho: Tarjeta de Partido Próximo Destacado con la Insignia del Torneo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-900/90 to-neutral-950 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4">
                <div className="flex items-center gap-3">
                  {tournament.id === "daeris" ? (
                    <DaerisBadge size={42} />
                  ) : (
                    <PruebaBadge size={42} />
                  )}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      {tournament.name}
                    </span>
                    <p className="text-[11px] text-neutral-400">{tournament.status} · Próxima Fecha</p>
                  </div>
                </div>
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tournament.accentColor.pill}`}>
                  {nextMatch.category} · {nextMatch.division || "Futsal"}
                </span>
              </div>

              {/* Enfrentamiento */}
              <div className="my-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-800/80 text-sm font-bold text-white border border-neutral-700/60">
                      {nextMatch.homeTeam.substring(0, 3).toUpperCase()}
                    </div>
                    <p className="mt-2 text-sm font-semibold text-white line-clamp-1">{nextMatch.homeTeam}</p>
                    <span className="text-[11px] text-neutral-500 uppercase tracking-wider">Local</span>
                  </div>

                  <div className="flex flex-col items-center justify-center px-2">
                    <span className="rounded-md bg-neutral-800/80 px-2 py-1 text-xs font-bold text-neutral-400">
                      VS
                    </span>
                    <span className={`mt-1 text-xs font-bold ${tournament.accentColor.text}`}>
                      {nextMatch.matchTime}
                    </span>
                  </div>

                  <div className="flex-1 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-800/80 text-sm font-bold text-white border border-neutral-700/60">
                      {nextMatch.awayTeam.substring(0, 3).toUpperCase()}
                    </div>
                    <p className="mt-2 text-sm font-semibold text-white line-clamp-1">{nextMatch.awayTeam}</p>
                    <span className="text-[11px] text-neutral-500 uppercase tracking-wider">Visitante</span>
                  </div>
                </div>
              </div>

              {/* Datos de sede y torneo */}
              <div className="space-y-2 rounded-xl bg-neutral-950/60 p-3 text-xs text-neutral-400 border border-neutral-800/60">
                <div className="flex items-center gap-2">
                  <Trophy className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span className="font-medium text-neutral-300">{tournament.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                  <span>{nextMatch.jornada || nextMatch.matchDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span className="truncate">{nextMatch.venue}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-800/80 text-center">
                <Link
                  href="/calendario"
                  className={`inline-flex items-center gap-1 text-xs font-semibold hover:underline transition ${tournament.accentColor.text}`}
                >
                  Ver todos los partidos de {tournament.shortName}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de métricas rápidas del torneo seleccionado (KPI cards) */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Link
            href="/torneos"
            className="group rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4 transition hover:border-neutral-700 hover:bg-neutral-900/80"
          >
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
              <Trophy className="h-4 w-4 text-amber-400" />
              <span>Torneo Activo</span>
            </div>
            <p className="mt-2 text-base font-bold text-white group-hover:text-red-400 transition truncate">
              {tournament.name}
            </p>
            <p className="text-xs text-neutral-500">{tournament.totalTeams} Equipos · {tournament.edition}</p>
          </Link>

          <Link
            href="/calendario"
            className="group rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4 transition hover:border-neutral-700 hover:bg-neutral-900/80"
          >
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
              <Calendar className="h-4 w-4 text-blue-400" />
              <span>Partidos Registrados</span>
            </div>
            <p className="mt-2 text-base font-bold text-white group-hover:text-red-400 transition">
              {tournament.matches.length}+ Encuentros
            </p>
            <p className="text-xs text-neutral-500 truncate">{tournament.venueShort}</p>
          </Link>

          <Link
            href="/estadisticas"
            className="group rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4 transition hover:border-neutral-700 hover:bg-neutral-900/80"
          >
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
              <Goal className="h-4 w-4 text-red-400" />
              <span>Líder Goleador</span>
            </div>
            <p className="mt-2 text-base font-bold text-white group-hover:text-red-400 transition truncate">
              {topScorer ? `${topScorer.player} (${topScorer.goals})` : "En disputa"}
            </p>
            <p className="text-xs text-neutral-500 truncate">{topScorer ? topScorer.team : "Futsal"}</p>
          </Link>

          <Link
            href="/estadisticas"
            className="group rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4 transition hover:border-neutral-700 hover:bg-neutral-900/80"
          >
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span>Valla Invicta</span>
            </div>
            <p className="mt-2 text-base font-bold text-white group-hover:text-red-400 transition truncate">
              {topKeeper ? `${topKeeper.player} (${topKeeper.cleanSheets})` : "En disputa"}
            </p>
            <p className="text-xs text-neutral-500 truncate">{topKeeper ? topKeeper.team : "Futsal"}</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
