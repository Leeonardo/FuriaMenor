import Link from "next/link";
import { ArrowRight, Clock, MapPin, Trophy, Calendar } from "lucide-react";
import { TournamentData } from "@/data/tournaments-data";
import { DaerisBadge, PruebaBadge } from "@/components/ui/tournament-badges";

interface TorneosLiveProps {
  tournament: TournamentData;
}

export function TorneosLive({ tournament }: TorneosLiveProps) {
  const upcoming = tournament.matches
    .filter((m) => m.status === "scheduled")
    .sort((a, b) => a.matchDate.localeCompare(b.matchDate) || a.matchTime.localeCompare(b.matchTime))
    .slice(0, 6);

  const finished = tournament.matches
    .filter((m) => m.status === "finished")
    .sort((a, b) => b.matchDate.localeCompare(a.matchDate))
    .slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
          <div className="shrink-0">
            {tournament.id === "daeris" ? (
              <DaerisBadge size={52} />
            ) : (
              <PruebaBadge size={52} />
            )}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-red-400 font-bold">
              Cobertura en Vivo · {tournament.name}
            </p>
            <h2 className="mt-0.5 text-xl font-bold sm:text-2xl text-white">
              Marcadores y Próximos Partidos
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              {tournament.venue}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <Link
            href="/calendario"
            className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-3.5 py-1.5 text-xs sm:text-sm text-neutral-300 transition hover:border-neutral-700 hover:text-white"
          >
            Calendario Completo
          </Link>
          <Link
            href="/posiciones"
            className={`rounded-xl px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white transition ${
              tournament.id === "daeris" ? "bg-red-600 hover:bg-red-500 shadow-sm shadow-red-600/30" : "bg-sky-600 hover:bg-sky-500 shadow-sm"
            }`}
          >
            Tablas de Posiciones
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Próximos partidos */}
        <div className="lg:col-span-7">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-400" />
              Próximos Partidos Programados
            </h3>
            <span className="flex items-center gap-1 text-xs text-neutral-500">
              <Clock className="h-3 w-3" />
              Jornada activa
            </span>
          </div>

          {upcoming.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {upcoming.map((match) => (
                <div
                  key={match.id}
                  className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 transition hover:border-neutral-700"
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 font-medium ${tournament.accentColor.pill}`}>
                        {match.category}
                      </span>
                      {match.division && (
                        <span className="rounded-full bg-neutral-800 px-2 py-0.5 text-neutral-400">
                          {match.division}
                        </span>
                      )}
                    </div>
                    <span className="font-medium text-neutral-400">
                      {match.matchDate} · {match.matchTime}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 my-1">
                    <p className="flex-1 text-sm font-semibold text-white truncate">{match.homeTeam}</p>
                    <span className="text-xs font-bold text-neutral-500 px-1">vs</span>
                    <p className="flex-1 text-right text-sm font-semibold text-white truncate">{match.awayTeam}</p>
                  </div>

                  <div className="mt-2.5 flex items-center gap-1 text-[11px] text-neutral-500">
                    <MapPin className="h-3 w-3 text-red-400 shrink-0" />
                    <span className="truncate">{match.venue}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-800 p-8 text-center text-sm text-neutral-500">
              No hay partidos programados pendientes para esta fecha.
            </div>
          )}
        </div>

        {/* Últimos resultados */}
        <div className="lg:col-span-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-400" />
              Últimos Resultados
            </h3>
            <Link
              href="/calendario"
              className="flex items-center gap-1 text-xs text-red-400 transition hover:text-red-300"
            >
              Ver todos
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {finished.length > 0 ? (
              finished.map((match) => (
                <div
                  key={match.id}
                  className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 transition hover:border-neutral-700"
                >
                  <div className="mb-2 flex items-center justify-between text-xs text-neutral-500">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-neutral-800 px-2 py-0.5 text-neutral-300 font-medium">
                        {match.category}
                      </span>
                      {match.division && <span>{match.division}</span>}
                    </div>
                    <span>{match.matchDate}</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-200 truncate">{match.homeTeam}</span>
                      <span className="font-extrabold text-white text-base ml-2">{match.homeScore ?? "-"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-200 truncate">{match.awayTeam}</span>
                      <span className="font-extrabold text-white text-base ml-2">{match.awayScore ?? "-"}</span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] uppercase tracking-widest text-neutral-500 pt-2 border-t border-neutral-800/60">
                    <span>Finalizado</span>
                    <span className="text-neutral-400 lowercase">{match.venue}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-neutral-800 p-8 text-center text-sm text-neutral-500">
                Aún no hay resultados cerrados registrados en esta edición.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
