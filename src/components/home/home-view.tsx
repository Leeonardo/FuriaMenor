"use client";

import { useMemo, useState } from "react";
import { TournamentId, tournamentsList, TournamentData } from "@/data/tournaments-data";
import { DaerisSubId, daerisSubTournaments, DaerisSubTournament } from "@/data/daeris-subtournaments";
import { TournamentSelector } from "@/components/home/tournament-selector";
import { DaerisSubtournamentsPanel } from "@/components/home/daeris-subtournaments-panel";
import { HeroSports } from "@/components/home/hero-sports";
import { TorneosLive } from "@/components/home/torneos-live";
import { StatsPreview } from "@/components/home/stats-preview";
import { AcademiesPreview } from "@/components/home/academies-preview";
import Link from "next/link";
import { Calendar, Mail } from "lucide-react";

export function HomeView() {
  const [selectedTournamentId, setSelectedTournamentId] = useState<TournamentId>("daeris");
  const [selectedDaerisSubId, setSelectedDaerisSubId] = useState<DaerisSubId>("infantil-1ra");

  // Torneo actual activo (con soporte para los 6 sub-torneos de Daeris)
  const currentTournament: TournamentData = useMemo(() => {
    if (selectedTournamentId === "prueba") {
      return tournamentsList.prueba;
    }

    const daerisBase = tournamentsList.daeris;
    const sub = daerisSubTournaments[selectedDaerisSubId];

    if (!sub) return daerisBase;

    return {
      ...daerisBase,
      name: `${daerisBase.name} · ${sub.name}`,
      shortName: sub.shortName,
      status: sub.status,
      venue: sub.venue,
      venueShort: sub.venue,
      totalTeams: sub.teamsCount,
      groupName: sub.groupName,
      qualificationRule: sub.qualificationRule,
      qualificationCutoff: sub.qualificationCutoff,
      highlightedMatch: sub.matches[0] || daerisBase.highlightedMatch,
      matches: sub.matches,
      standings: sub.standings,
      topScorers: sub.topScorers,
      leastConceded: sub.leastConceded,
      accentColor: {
        badge: "daeris",
        border: sub.accent.border,
        bgGlow: daerisBase.accentColor.bgGlow,
        pill: sub.accent.pill,
        text: sub.accent.text,
      },
    };
  }, [selectedTournamentId, selectedDaerisSubId]);

  return (
    <>
      {/* 1. Selector de Torneo Principal: Torneo Daeris vs Torneo de Prueba */}
      <TournamentSelector
        selectedId={selectedTournamentId}
        onSelect={(id) => setSelectedTournamentId(id)}
      />

      {/* 2. Si está en Torneo Daeris: Desplegar los 6 Torneos Internos con sus Insignias */}
      {selectedTournamentId === "daeris" && (
        <DaerisSubtournamentsPanel
          selectedSubId={selectedDaerisSubId}
          onSelectSub={(sub: DaerisSubTournament) => setSelectedDaerisSubId(sub.id)}
        />
      )}

      {/* 3. Hero Deportivo adaptado al torneo / sub-torneo activo */}
      <HeroSports tournament={currentTournament} />

      {/* 4. Marcadores y Próximos Partidos del torneo seleccionado */}
      <TorneosLive tournament={currentTournament} />

      {/* 5. Estadísticas Oficiales: Tabla idéntica al modelo reglamentario, Goleador y Valla Menos Vencida */}
      <StatsPreview tournament={currentTournament} />

      {/* 6. Vitrina de Academias & Clubes Participantes */}
      <AcademiesPreview />

      {/* 7. Banner de Cierre Furia Menor */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-r from-red-950/40 via-neutral-900 to-neutral-950 p-8 text-center sm:p-12 shadow-2xl">
          <div className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl" />

          <p className="text-xs uppercase tracking-[0.3em] text-red-400 font-semibold">
            Furia Menor
          </p>
          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl text-white">
            Arrancamos con futsal. Crecemos con Venezuela.
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base text-neutral-300 leading-relaxed">
            Furia Menor nace como portal deportivo del fútbol menor venezolano. Comenzamos cubriendo
            el futsal en Caracas y pronto llevaremos la cobertura a academias, ligas y regiones de todo el país.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/calendario"
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500 hover:shadow-red-600/30"
            >
              <Calendar className="h-4 w-4" />
              Ver Calendario
            </Link>
            <Link
              href="mailto:contacto@furiamenor.com"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/60 px-5 py-2.5 text-sm font-semibold text-neutral-300 transition hover:border-neutral-500 hover:bg-neutral-800 hover:text-white"
            >
              <Mail className="h-4 w-4" />
              Solicitar Cobertura
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
