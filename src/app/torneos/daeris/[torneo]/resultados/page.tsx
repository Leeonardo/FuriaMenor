import React from "react";
import { notFound } from "next/navigation";
import { getDaerisSubTournament, getSubTournamentData } from "@/data/daeris-subtournaments";
import { TournamentCategorySelector } from "@/components/tournaments/tournament-category-selector";
import { MatchCard } from "@/components/tournaments/match-card";
import { CheckCircle2, UserCheck } from "lucide-react";

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
  const basePath = `/torneos/daeris/${tournament.slug}`;

  return (
    <div className="space-y-6">
      <div className="border-b border-neutral-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            Resultados de Partidos Disputados {activeCategory && `· ${activeCategory}`}
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            Marcadores oficiales y cuerpo arbitral de los encuentros finalizados en {tournament.name}{" "}
            {activeCategory && `(Categoría ${activeCategory})`}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          <UserCheck className="h-4 w-4 text-emerald-400" />
          <span>Actas arbitrales validadas</span>
        </div>
      </div>

      {tournament.hasCategories && activeCategory && (
        <TournamentCategorySelector
          activeCategory={activeCategory}
          title={`Selecciona la Categoría Menor para consultar sus Resultados`}
        />
      )}

      {finishedMatches.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {finishedMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              baseTournamentPath={basePath}
              currentCategory={activeCategory || undefined}
            />
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
