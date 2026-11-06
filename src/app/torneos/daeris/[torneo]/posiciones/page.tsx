import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDaerisSubTournament, getSubTournamentData } from "@/data/daeris-subtournaments";
import { TournamentOfficialTable } from "@/components/tournaments/tournament-official-table";
import { TournamentCategorySelector } from "@/components/tournaments/tournament-category-selector";
import { Trophy, Layers } from "lucide-react";

interface PageProps {
  params: Promise<{ torneo: string }>;
  searchParams: Promise<{ cat?: string; categoria?: string; grupo?: string; group?: string }>;
}

export default async function SubTournamentPosicionesPage({ params, searchParams }: PageProps) {
  const { torneo: torneoSlug } = await params;
  const query = await searchParams;
  const categoryParam = query?.cat || query?.categoria;
  const groupParam = (query?.grupo || query?.group || "").toUpperCase();

  const tournament = getDaerisSubTournament(torneoSlug);

  if (!tournament) {
    notFound();
  }

  const {
    standings,
    activeCategory,
    groups: categoryGroups,
    qualificationRule,
    qualificationCutoff,
  } = getSubTournamentData(tournament, categoryParam);
  const basePath = `/torneos/daeris/${tournament.slug}`;

  // Si el torneo o la categoría tiene múltiples grupos (ej. Libre 2da o Sub-10 a Sub-16 en Infantil 2da)
  const effectiveGroups = categoryGroups || tournament.groups;
  let activeGroupName = tournament.groupName;
  let rowsToDisplay = standings;

  if (effectiveGroups) {
    const availableGroups = Object.keys(effectiveGroups);
    const matchedGroup = availableGroups.find((g) => g.toUpperCase() === groupParam) || availableGroups[0];
    activeGroupName = matchedGroup;
    rowsToDisplay = effectiveGroups[matchedGroup] || standings;
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-neutral-800 pb-4">
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-400" />
          Tabla de Posiciones Oficial {activeCategory && `· ${activeCategory}`} {effectiveGroups && `· ${activeGroupName}`}
        </h2>
        <p className="text-sm text-neutral-400 mt-1">
          Planilla oficial de clasificación correspondiente a {tournament.name}{" "}
          {activeCategory && `(Categoría ${activeCategory})`}
          {effectiveGroups && `(${activeGroupName})`}. Haz clic en el nombre de cualquier equipo para ver su perfil o estadísticas.
        </p>
      </div>

      {/* Selector de Grupos si aplica */}
      {effectiveGroups && (
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
            <Layers className="h-4 w-4 text-emerald-400" />
            <span>Grupos de Competencia (Fase Regular):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.keys(effectiveGroups).map((groupKey) => {
              const isSelected = groupKey.toUpperCase() === activeGroupName.toUpperCase();
              const catQuery = activeCategory ? `&cat=${encodeURIComponent(activeCategory)}` : "";
              return (
                <Link
                  key={groupKey}
                  href={`${basePath}/posiciones?grupo=${encodeURIComponent(groupKey)}${catQuery}`}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                    isSelected
                      ? "bg-gradient-to-r from-emerald-500 to-green-600 text-black shadow-lg shadow-emerald-500/20 scale-105"
                      : "bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700 hover:text-white"
                  }`}
                >
                  {groupKey}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {tournament.hasCategories && activeCategory && (
        <TournamentCategorySelector
          activeCategory={activeCategory}
          title={`Selecciona la Categoría Menor para consultar su Tabla de Posiciones`}
        />
      )}

      <div className="max-w-4xl mx-auto">
        <TournamentOfficialTable
          title={`TABLA DE POSICIONES · ${tournament.name}${activeCategory ? ` (${activeCategory.toUpperCase()}${effectiveGroups ? ` · ${activeGroupName}` : ""})` : ""}`}
          groupName={effectiveGroups ? activeGroupName : activeCategory ? `GRUPO ${activeCategory.toUpperCase()}` : activeGroupName}
          qualificationRule={qualificationRule || tournament.qualificationRule}
          qualificationCutoff={qualificationCutoff ?? tournament.qualificationCutoff}
          rows={rowsToDisplay}
          baseTournamentPath={basePath}
          currentCategory={activeCategory || undefined}
        />
      </div>
    </div>
  );
}
