import React from "react";
import { notFound } from "next/navigation";
import { getDaerisSubTournament } from "@/data/daeris-subtournaments";
import { Goal, Shield } from "lucide-react";

interface PageProps {
  params: Promise<{ torneo: string }>;
}

export default async function SubTournamentEstadisticasPage({ params }: PageProps) {
  const { torneo: torneoSlug } = await params;
  const tournament = getDaerisSubTournament(torneoSlug);

  if (!tournament) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-neutral-800 pb-4">
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <Goal className="h-6 w-6 text-red-400" />
          Goleador del Torneo & Valla Menos Vencida
        </h2>
        <p className="text-sm text-neutral-400 mt-1">
          Rendimiento individual oficial de artilleros y porterías en {tournament.name}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* 1. Goleadores */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                <Goal className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Goleador del Torneo</h3>
                <p className="text-xs text-neutral-400">{tournament.shortName}</p>
              </div>
            </div>
            <span className="rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-bold text-red-400">
              Artilleros
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 text-xs">
                  <th className="py-2 text-left w-12">POS</th>
                  <th className="py-2 text-left">JUGADOR</th>
                  <th className="py-2 text-left">EQUIPO</th>
                  <th className="py-2 text-right">GOLES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {tournament.topScorers.map((scorer, idx) => (
                  <tr key={scorer.player} className="hover:bg-neutral-800/30 transition">
                    <td className="py-3 font-bold text-neutral-400">
                      <span
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-black ${
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
                    </td>
                    <td className="py-3 font-semibold text-white">{scorer.player}</td>
                    <td className="py-3 text-neutral-400">{scorer.team}</td>
                    <td className="py-3 text-right font-black text-red-400 text-base">
                      {scorer.goals}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Vallas Invictas */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Valla Menos Vencida</h3>
                <p className="text-xs text-neutral-400">Arquerías del Torneo</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
              Porteros
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 text-xs">
                  <th className="py-2 text-left w-12">POS</th>
                  <th className="py-2 text-left">PORTERO</th>
                  <th className="py-2 text-left">EQUIPO</th>
                  <th className="py-2 text-center">PJ</th>
                  <th className="py-2 text-center">GC</th>
                  <th className="py-2 text-right">INVICTAS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {tournament.leastConceded.map((keeper, idx) => (
                  <tr key={keeper.player} className="hover:bg-neutral-800/30 transition">
                    <td className="py-3 font-bold text-neutral-400">
                      <span
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-black ${
                          idx === 0
                            ? "bg-emerald-400 text-black"
                            : "bg-neutral-800 text-neutral-400"
                        }`}
                      >
                        {idx + 1}
                      </span>
                    </td>
                    <td className="py-3 font-semibold text-white">{keeper.player}</td>
                    <td className="py-3 text-neutral-400">{keeper.team}</td>
                    <td className="py-3 text-center text-neutral-300">{keeper.matchesPlayed}</td>
                    <td className="py-3 text-center text-red-400 font-bold">{keeper.goalsConceded}</td>
                    <td className="py-3 text-right font-black text-emerald-400 text-base">
                      {keeper.cleanSheets}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
