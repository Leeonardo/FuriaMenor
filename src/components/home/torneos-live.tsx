import Link from "next/link";
import { ArrowRight, Clock, MapPin, Trophy, Newspaper } from "lucide-react";
import { torneoDaerisMatches } from "@/data/daeris/calendario";

export function TorneosLive() {
  const upcoming = torneoDaerisMatches
    .filter((m) => m.status === "scheduled")
    .sort((a, b) => a.matchDate.localeCompare(b.matchDate) || a.matchTime.localeCompare(b.matchTime))
    .slice(0, 6);

  const finished = torneoDaerisMatches
    .filter((m) => m.status === "finished")
    .sort((a, b) => b.matchDate.localeCompare(a.matchDate))
    .slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-red-400">Cobertura Futsal</p>
          <h2 className="mt-1 text-xl font-bold sm:text-2xl">Marcadores, Posiciones y Próximos Partidos</h2>
          <p className="mt-1 text-sm text-neutral-400">
            Seguimiento periodístico del Torneo Daeris · Futsal · Caracas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/calendario" className="rounded-lg border border-neutral-800 px-3 py-1.5 text-sm text-neutral-300 transition hover:border-neutral-700 hover:text-white">
            Calendario Completo
          </Link>
          <Link href="/posiciones" className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-red-500">
            Tablas de Posiciones
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Próximos partidos */}
        <div className="lg:col-span-7">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Próximos Partidos</h3>
            <span className="flex items-center gap-1 text-xs text-neutral-500">
              <Clock className="h-3 w-3" />
              Jornada en curso
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {upcoming.map((match) => (
              <div key={match.id} className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 transition hover:border-neutral-700">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-red-400">{match.category}</span>
                    {match.division && <span className="rounded-full bg-neutral-800 px-2 py-0.5">{match.division}</span>}
                  </div>
                  <span>{match.matchDate} · {match.matchTime}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <p className="flex-1 text-sm font-medium">{match.homeTeam}</p>
                  <span className="text-xs text-neutral-500">vs</span>
                  <p className="flex-1 text-right text-sm font-medium">{match.awayTeam}</p>
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-neutral-500">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{match.venue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Últimos resultados */}
        <div className="lg:col-span-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Últimos Resultados</h3>
            <Link href="/calendario" className="flex items-center gap-1 text-sm text-red-400 transition hover:text-red-300">
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {finished.length > 0 ? (
              finished.map((match) => (
                <div key={match.id} className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
                  <div className="mb-2 flex items-center justify-between text-xs text-neutral-500">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-neutral-800 px-2 py-0.5">{match.category}</span>
                      {match.division && <span>{match.division}</span>}
                    </div>
                    <span>{match.matchDate}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{match.homeTeam}</span>
                      <span className="font-bold">{match.homeScore ?? "-"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{match.awayTeam}</span>
                      <span className="font-bold">{match.awayScore ?? "-"}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-center text-[10px] uppercase tracking-widest text-neutral-500">Final</div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-neutral-700 p-6 text-center text-sm text-neutral-500">
                Sin resultados registrados aún
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Banner Torneo Daeris — aclaración de rol */}
      <div className="mt-6 rounded-2xl border border-neutral-800 bg-gradient-to-r from-red-950/30 via-neutral-900 to-neutral-950 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-600/20">
            <Newspaper className="h-6 w-6 text-red-400" />
          </div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.2em] text-red-400">Cobertura Periodística</p>
            <h3 className="mt-1 text-lg font-bold">Torneo Daeris — Futsal Menor</h3>
            <p className="mt-1 text-sm text-neutral-300">
              Furia Menor cubre periodísticamente el Torneo Daeris. Nos encargamos de traerte
              noticias, crónicas, resultados y entrevistas — la organización del torneo es
              independiente a este portal.
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              Sede: Cancha Gimnasio Libertador, 23 de Enero · Categorías Sub-6 a Sub-18 · 1ra y 2da División
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Link href="/calendario" className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500">
              Ver Calendario
            </Link>
            <Link href="/estadisticas" className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 transition hover:border-neutral-600 hover:text-white">
              Estadísticas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
