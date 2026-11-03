import React from "react";
import { notFound } from "next/navigation";
import { getDaerisSubTournament } from "@/data/daeris-subtournaments";
import { TournamentOfficialTable } from "@/components/tournaments/tournament-official-table";
import { Trophy } from "lucide-react";

interface PageProps {
  params: Promise<{ torneo: string }>;
}

export default async function SubTournamentPosicionesPage({ params }: PageProps) {
  const { torneo: torneoSlug } = await params;
  const tournament = getDaerisSubTournament(torneoSlug);

  if (!tournament) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-neutral-800 pb-4">
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-400" />
          Tabla de Posiciones Oficial
        </h2>
        <p className="text-sm text-neutral-400 mt-1">
          Planilla oficial de clasificación correspondiente a {tournament.name}
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <TournamentOfficialTable
          title={`TABLA DE POSICIONES · ${tournament.name}`}
          groupName={tournament.groupName}
          qualificationRule={tournament.qualificationRule}
          qualificationCutoff={tournament.qualificationCutoff}
          rows={tournament.standings}
        />
      </div>
    </div>
  );
}
