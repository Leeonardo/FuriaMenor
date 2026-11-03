import React from "react";
import { notFound } from "next/navigation";
import { getDaerisSubTournament, getSubTournamentData } from "@/data/daeris-subtournaments";
import { TournamentCategorySelector } from "@/components/tournaments/tournament-category-selector";
import { Calendar, Clock, MapPin } from "lucide-react";

interface PageProps {
  params: Promise<{ torneo: string }>;
  searchParams: Promise<{ cat?: string; categoria?: string }>;
}

export default async function SubTournamentCalendarioPage({ params, searchParams }: PageProps) {
  const { torneo: torneoSlug } = await params;
  const query = await searchParams;
  const categoryParam = query?.cat || query?.categoria;

  const tournament = getDaerisSubTournament(torneoSlug);

  if (!tournament) {
    notFound();
  }

  const { matches, activeCategory } = getSubTournamentData(tournament, categoryParam);
  const scheduledMatches = matches.filter((m) => m.status === "scheduled");

  return (
    <div className="space-y-6">
      <div className="border-b border-neutral-800 pb-4">
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <Calendar className="h-6 w-6 text-red-400" />
          Calendario Oficial & Fixture {activeCategory && `· ${activeCategory}`}
        </h2>
        <p className="text-sm text-neutral-400 mt-1">
          Fechas, horarios y sedes de todos los partidos programados para {tournament.name}{" "}
          {activeCategory && `(Categoría ${activeCategory})`}
        </p>
      </div>

      {tournament.hasCategories && activeCategory && (
        <TournamentCategorySelector
          activeCategory={activeCategory}
          title={`Selecciona la Categoría Menor para consultar su Fixture`}
        />
      )}

      {scheduledMatches.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {scheduledMatches.map((match) => (
            <div
              key={match.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 hover:border-neutral-700 transition"
            >
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-3 border-b border-neutral-800/80 pb-2">
                <span className="font-bold text-red-400">{match.category}</span>
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="h-3.5 w-3.5" />
                  {match.matchDate} · {match.matchTime}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 text-base font-bold text-white">
                <span className="truncate flex-1">{match.homeTeam}</span>
                <span className="px-3 text-xs font-black text-neutral-500">VS</span>
                <span className="truncate flex-1 text-right">{match.awayTeam}</span>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-800/80">
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span className="truncate">{match.venue}</span>
                </span>
                <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-400 border border-blue-500/30">
                  Programado
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-neutral-800 p-12 text-center text-sm text-neutral-500">
          No hay encuentros pendientes programados para esta categoría en la jornada.
        </div>
      )}
    </div>
  );
}
