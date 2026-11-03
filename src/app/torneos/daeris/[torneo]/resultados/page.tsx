import React from "react";
import { notFound } from "next/navigation";
import { getDaerisSubTournament, getSubTournamentData } from "@/data/daeris-subtournaments";
import { TournamentCategorySelector } from "@/components/tournaments/tournament-category-selector";
import { CheckCircle2, MapPin } from "lucide-react";

interface PageProps {
  params: Promise<{ torneo: string }>;
  searchParams: Promise<{ cat?: string; categoria?: string }>;
}

export default async function SubTournamentResultadosPage({ params, searchParams }: PageProps) {
  const { torneo: torneoSlug } = await params;
  const query = await searchParams;
  const categoryParam = query?.cat || query?.categoria;

  const tournament = getDaerisSubTournament(torneoSlug);

  if (!tournament) {
    notFound();
  }

  const { matches, activeCategory } = getSubTournamentData(tournament, categoryParam);
  const finishedMatches = matches.filter((m) => m.status === "finished");

  return (
    <div className="space-y-6">
      <div className="border-b border-neutral-800 pb-4">
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-emerald-400" />
          Resultados de Partidos Disputados {activeCategory && `· ${activeCategory}`}
        </h2>
        <p className="text-sm text-neutral-400 mt-1">
          Marcadores oficiales de los encuentros finalizados en {tournament.name}{" "}
          {activeCategory && `(Categoría ${activeCategory})`}
        </p>
      </div>

      {tournament.hasCategories && activeCategory && (
        <TournamentCategorySelector
          activeCategory={activeCategory}
          title={`Selecciona la Categoría Menor para consultar sus Resultados`}
        />
      )}

      {finishedMatches.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {finishedMatches.map((match) => (
            <div
              key={match.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 hover:border-neutral-700 transition"
            >
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-3 border-b border-neutral-800/80 pb-2">
                <span className="font-bold text-neutral-300">{match.category}</span>
                <span className="font-medium">{match.matchDate}</span>
              </div>

              <div className="flex items-center justify-between py-2 text-base font-bold text-white">
                <span className="truncate flex-1">{match.homeTeam}</span>
                <span className="px-3 text-lg font-black text-red-400">
                  {match.homeScore} - {match.awayScore}
                </span>
                <span className="truncate flex-1 text-right">{match.awayTeam}</span>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-800/80">
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span className="truncate">{match.venue}</span>
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                  Finalizado
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-neutral-800 p-12 text-center text-sm text-neutral-500">
          Aún no hay resultados de partidos registrados para esta categoría.
        </div>
      )}
    </div>
  );
}
