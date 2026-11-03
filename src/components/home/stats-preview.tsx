import Link from "next/link";
import { ArrowRight, Goal, Shield, Trophy } from "lucide-react";
import { TournamentData } from "@/data/tournaments-data";

interface StatsPreviewProps {
  tournament: TournamentData;
}

export function StatsPreview({ tournament }: StatsPreviewProps) {
  // Top 5 posiciones del torneo activo
  const topStandings = tournament.standings.slice(0, 5);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Encabezado de la sección */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-red-400 font-semibold">
            Rendimiento & Clasificación
          </p>
          <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
            Estadísticas de {tournament.name}
          </h2>
          <p className="mt-1 text-sm text-neutral-400">
            Seguimiento de tabla de posiciones, líderes de goleo y arquerías menos vencidas
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/posiciones"
            className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 text-xs font-medium text-neutral-300 transition hover:border-neutral-700 hover:text-white"
          >
            Todas las Tablas
          </Link>
          <Link
            href="/estadisticas"
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition ${
              tournament.id === "daeris" ? "bg-red-600 hover:bg-red-500" : "bg-sky-600 hover:bg-sky-500"
            }`}
          >
            Líderes de Goleo
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Columna Izquierda: Estadísticas Colectivas (Tabla de Clasificación) */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 lg:col-span-7 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
                <Trophy className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Tabla de Posiciones</h3>
                <p className="text-xs text-neutral-400">
                  {tournament.name} · Categoría Principal
                </p>
              </div>
            </div>
            <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-[11px] font-medium text-neutral-400">
              Top 5
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 font-medium">
                  <th className="pb-3 pl-2 w-8">#</th>
                  <th className="pb-3">Equipo</th>
                  <th className="pb-3 text-center">JJ</th>
                  <th className="pb-3 text-center">JG</th>
                  <th className="pb-3 text-center">DIF</th>
                  <th className="pb-3 pr-2 text-right">PTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/50">
                {topStandings.map((team) => (
                  <tr
                    key={team.team}
                    className="transition hover:bg-neutral-800/30 group"
                  >
                    <td className="py-3 pl-2 font-bold text-neutral-500 group-hover:text-red-400">
                      {team.pos}
                    </td>
                    <td className="py-3 font-semibold text-white flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          team.pos <= 4 ? "bg-emerald-400" : "bg-neutral-600"
                        }`}
                      />
                      <span className="truncate max-w-[170px] sm:max-w-none">{team.team}</span>
                    </td>
                    <td className="py-3 text-center text-neutral-400">{team.jj}</td>
                    <td className="py-3 text-center text-neutral-400">{team.jg}</td>
                    <td className="py-3 text-center font-medium text-neutral-300">
                      {team.dif > 0 ? `+${team.dif}` : team.dif}
                    </td>
                    <td className={`py-3 pr-2 text-right font-extrabold text-sm ${tournament.accentColor.text}`}>
                      {team.pts}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
            <span className="text-neutral-500 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Zona de Clasificación
            </span>
            <Link
              href="/posiciones"
              className={`inline-flex items-center gap-1 font-semibold hover:underline transition ${tournament.accentColor.text}`}
            >
              Ver tabla completa
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Columna Derecha: Estadísticas Individuales (Goleadores y Vallas) */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          {/* Tarjeta de Goleadores */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 backdrop-blur-sm flex-1">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                  <Goal className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Líderes de Goleo</h3>
                  <p className="text-[11px] text-neutral-400">{tournament.name}</p>
                </div>
              </div>
              <Link
                href="/estadisticas"
                className="text-xs text-red-400 hover:text-red-300 transition"
              >
                Ver todos
              </Link>
            </div>

            <div className="space-y-2.5">
              {tournament.topScorers.slice(0, 3).map((scorer, idx) => (
                <div
                  key={scorer.player}
                  className="flex items-center justify-between rounded-xl bg-neutral-950/50 border border-neutral-800/60 p-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800 text-xs font-bold text-neutral-400">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">{scorer.player}</p>
                      <p className="text-[11px] text-neutral-400">{scorer.team} · {scorer.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-red-400">{scorer.goals}</span>
                    <span className="text-[10px] text-neutral-500 ml-1">goles</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tarjeta de Vallas Invictas */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 backdrop-blur-sm flex-1">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Valla Menos Vencida</h3>
                  <p className="text-[11px] text-neutral-400">Arquería {tournament.shortName}</p>
                </div>
              </div>
              <Link
                href="/estadisticas"
                className="text-xs text-emerald-400 hover:text-emerald-300 transition"
              >
                Ver todos
              </Link>
            </div>

            <div className="space-y-2.5">
              {tournament.leastConceded.slice(0, 2).map((keeper, idx) => (
                <div
                  key={keeper.player}
                  className="flex items-center justify-between rounded-xl bg-neutral-950/50 border border-neutral-800/60 p-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800 text-xs font-bold text-neutral-400">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">{keeper.player}</p>
                      <p className="text-[11px] text-neutral-400">{keeper.team}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-emerald-400">{keeper.cleanSheets}</span>
                    <span className="text-[10px] text-neutral-500 ml-1">invictas ({keeper.goalsConceded} GC)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
