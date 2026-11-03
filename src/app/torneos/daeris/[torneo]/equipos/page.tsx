import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDaerisSubTournament, getSubTournamentData } from "@/data/daeris-subtournaments";
import { TournamentCategorySelector } from "@/components/tournaments/tournament-category-selector";
import { Users, Shield, ArrowRight, UserCheck, Trophy } from "lucide-react";

interface PageProps {
  params: Promise<{ torneo: string }>;
  searchParams: Promise<{ cat?: string; categoria?: string }>;
}

export default async function SubTournamentEquiposPage({ params, searchParams }: PageProps) {
  const { torneo: torneoSlug } = await params;
  const query = await searchParams;
  const categoryParam = query?.cat || query?.categoria;

  const tournament = getDaerisSubTournament(torneoSlug);

  if (!tournament) {
    notFound();
  }

  const { teams, activeCategory } = getSubTournamentData(tournament, categoryParam);
  const basePath = `/torneos/daeris/${tournament.slug}`;
  const catQueryString = activeCategory ? `?cat=${activeCategory}` : "";

  return (
    <div className="space-y-6">
      <div className="border-b border-neutral-800 pb-4">
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <Users className="h-6 w-6 text-red-400" />
          Equipos & Plantillas Oficiales {activeCategory && `· ${activeCategory}`}
        </h2>
        <p className="text-sm text-neutral-400 mt-1">
          Directorio de clubes participantes en {tournament.name}. Selecciona cualquier equipo para consultar su plantilla completa, dorsales, cédulas e IDs únicos.
        </p>
      </div>

      {tournament.hasCategories && activeCategory && (
        <TournamentCategorySelector
          activeCategory={activeCategory}
          title={`Selecciona la Categoría Menor para consultar sus Equipos`}
        />
      )}

      {/* Grid de Equipos participantes */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team, idx) => (
          <Link
            key={team.id}
            href={`${basePath}/equipos/${team.slug}${catQueryString}`}
            className="group flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 transition-all duration-300 hover:border-red-500/60 hover:bg-neutral-900 shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 font-black text-lg group-hover:scale-105 transition-transform">
                  <Shield className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-[10px] font-bold text-neutral-300 uppercase">
                  {team.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition truncate">
                {team.name}
              </h3>

              <div className="mt-2 font-mono text-[11px] text-red-400/90 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 truncate">
                ID: {team.id}
              </div>

              <div className="mt-4 space-y-1 text-xs text-neutral-400 pt-3 border-t border-neutral-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Director Técnico:</span>
                  <span className="text-neutral-200 font-medium">{team.coach}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Jugadores Registrados:</span>
                  <span className="text-neutral-200 font-medium">{team.roster.length} Atletas</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs font-bold text-red-400 group-hover:text-red-300">
              <span>Ver Plantilla Completa</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
