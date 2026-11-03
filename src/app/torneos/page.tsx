import Link from "next/link";
import { Calendar, MapPin, Trophy } from "lucide-react";
import { torneoDaerisMatches, modalityLabels } from "@/data/daeris/calendario";

export const metadata = {
  title: "Torneos & Ligas | Furia Menor",
  description: "Marcadores en vivo, próximos partidos, tablas de posiciones y cobertura de torneos de fútbol menor y futsal en Caracas.",
};

export default function TorneosPage() {
  const upcoming = torneoDaerisMatches
    .filter((m) => m.status === "scheduled")
    .sort((a, b) => a.matchDate.localeCompare(b.matchDate) || a.matchTime.localeCompare(b.matchTime))
    .slice(0, 12);

  const jornadas = Array.from(new Set(upcoming.map((m) => m.jornada))).filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-red-400">Torneos & Ligas</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Caracas · Cobertura Futsal</h1>
          <p className="mt-1 text-neutral-400">Marcadores, posiciones, calendario y seguimiento por categoría</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/calendario" className="rounded-lg border border-neutral-800 px-3 py-1.5 text-sm text-neutral-300 transition hover:border-neutral-700 hover:text-white">
            Calendario Detallado
          </Link>
          <Link href="/posiciones" className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-red-500">
            Tablas de Posiciones
          </Link>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-red-500/40 bg-gradient-to-r from-red-950/40 via-neutral-900 to-neutral-950 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/20 text-red-400">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Torneo Daeris</h2>
                <span className="rounded bg-red-600/20 px-2 py-0.5 text-xs text-red-400">Futsal</span>
              </div>
              <p className="text-sm text-neutral-400">Cancha Gimnasio Libertador del 23 de Enero · Sub-6 a Sub-18 · 1ra y 2da División</p>
              <p className="text-xs text-neutral-500 mt-0.5">Cobertura periodística oficial por Furia Menor</p>
            </div>
          </div>
          <span className="self-start rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-sm text-red-400 sm:self-auto">En Curso</span>
        </div>
      </div>

      {jornadas.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {jornadas.map((j) => (
            <span key={j} className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
              {j}
            </span>
          ))}
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        {upcoming.map((match) => (
          <div key={match.id} className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-red-400">{match.category}</span>
                {match.division && <span className="rounded-full bg-neutral-800 px-2 py-0.5">{match.division}</span>}
                {match.modality && (
                  <span className="rounded-full bg-neutral-800 px-2 py-0.5">
                    {modalityLabels[match.modality] || match.modality}
                  </span>
                )}
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

      <div className="mt-8 rounded-2xl border border-dashed border-neutral-700 p-8 text-center">
        <Calendar className="mx-auto mb-3 h-10 w-10 text-neutral-600" />
        <p className="text-lg font-semibold">Más ligas y torneos en camino</p>
        <p className="mt-1 text-neutral-400">
          Furia Menor expandirá su cobertura periodística a más torneos y academias de Caracas y el resto del país.
        </p>
      </div>
    </div>
  );
}
