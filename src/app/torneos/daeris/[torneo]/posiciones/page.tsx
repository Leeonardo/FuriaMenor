import React from "react";
import { notFound } from "next/navigation";
import { getDaerisSubTournament, getSubTournamentData } from "@/data/daeris-subtournaments";
import { TournamentOfficialTable } from "@/components/tournaments/tournament-official-table";
import { TournamentCategorySelector } from "@/components/tournaments/tournament-category-selector";
import { Trophy } from "lucide-react";

interface PageProps {
  params: Promise<{ torneo: string }>;
  searchParams: Promise<{ cat?: string; categoria?: string }>;
}

export default async function SubTournamentPosicionesPage({ params, searchParams }: PageProps) {
  const { torneo: torneoSlug } = await params;
  const query = await searchParams;
  const categoryParam = query?.cat || query?.categoria;

  const tournament = getDaerisSubTournament(torneoSlug);

  if (!tournament) {
    notFound();
  }

  const { standings, activeCategory } = getSubTournamentData(tournament, categoryParam);

  return (
    <div className="space-y-6">
      <div className="border-b border-neutral-800 pb-4">
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-400" />
          Tabla de Posiciones Oficial {activeCategory && `· ${activeCategory}`}
        </h2>
        <p className="text-sm text-neutral-400 mt-1">
          Planilla oficial de clasificación correspondiente a {tournament.name}{" "}
          {activeCategory && `(Categoría ${activeCategory})`}
        </p>
      </div>

      {tournament.hasCategories && activeCategory && (
        <TournamentCategorySelector
          activeCategory={activeCategory}
          title={`Selecciona la Categoría Menor para consultar su Tabla de Posiciones`}
        />
      )}

      <div className="max-w-4xl mx-auto">
        <TournamentOfficialTable
          title={`TABLA DE POSICIONES · ${tournament.name}${activeCategory ? ` (${activeCategory.toUpperCase()})` : ""}`}
          groupName={activeCategory ? `GRUPO ${activeCategory.toUpperCase()}` : tournament.groupName}
          qualificationRule={tournament.qualificationRule}
          qualificationCutoff={tournament.qualificationCutoff}
          rows={standings}
        />
      </div>
    </div>
  );
}
