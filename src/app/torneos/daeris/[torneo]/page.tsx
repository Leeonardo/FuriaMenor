import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDaerisSubTournament, getSubTournamentData } from "@/data/daeris-subtournaments";
import { TournamentOfficialTable } from "@/components/tournaments/tournament-official-table";
import { TournamentCategorySelector } from "@/components/tournaments/tournament-category-selector";
import { MatchCard } from "@/components/tournaments/match-card";
import { Clock, Goal, MapPin, Shield, Trophy, ArrowRight, UserCheck, Users, Camera } from "lucide-react";

interface SubTournamentPageProps {
  params: Promise<{ torneo: string }>;
  searchParams: Promise<{ cat?: string; categoria?: string }>;
}

export default async function SubTournamentHomePage({
  params,
  searchParams,
}: SubTournamentPageProps) {
  const { torneo: torneoSlug } = await params;
  const query = await searchParams;
  const categoryParam = query?.cat || query?.categoria;

  const tournament = getDaerisSubTournament(torneoSlug);

  if (!tournament) {
    notFound();
  }

  const {
    standings,
    topScorers,
    leastConceded,
    matches,
    teams,
    activeCategory,
  } = getSubTournamentData(tournament, categoryParam);

  const upcomingMatches = matches.filter((m) => m.status === "scheduled");
  const finishedMatches = matches.filter((m) => m.status === "finished");
  const basePath = `/torneos/daeris/${tournament.slug}`;
  const catQueryString = activeCategory ? `?cat=${activeCategory}` : "";

  return (
    <div className="space-y-10">
      {/* Selector de Categorías (Sub-8 a Sub-20) si el torneo es formativo */}
      {tournament.hasCategories && activeCategory && (
        <TournamentCategorySelector
          activeCategory={activeCategory}
          title={`Categorías Menores · ${tournament.name}`}
        />
      )}

      {/* 1. SECCIÓN DE PARTIDOS CON CUERPO ARBITRAL OFICIAL Y POST DESCARGABLE */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-red-400" />
              Jornada en Curso · Fixture, Árbitros & Post Descargable {activeCategory && `(${activeCategory})`}
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Partidos con designación arbitral oficial y generador de flyers en formato post e historias para redes
            </p>
          </div>
          <Link
            href={`${basePath}/calendario${catQueryString}`}
            className="text-xs font-bold text-red-400 hover:text-red-300 transition flex items-center gap-1"
          >
            Ver calendario completo
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {upcomingMatches.length > 0 && (
            <MatchCard
              match={upcomingMatches[0]}
              baseTournamentPath={basePath}
              currentCategory={activeCategory || undefined}
              tournamentName={tournament.name}
              badgeKey={tournament.badgeKey}
            />
          )}

          {finishedMatches.length > 0 ? (
            <MatchCard
              match={finishedMatches[0]}
              baseTournamentPath={basePath}
              currentCategory={activeCategory || undefined}
              tournamentName={tournament.name}
              badgeKey={tournament.badgeKey}
            />
          ) : (
            upcomingMatches.length > 1 && (
              <MatchCard
                match={upcomingMatches[1]}
                baseTournamentPath={basePath}
                currentCategory={activeCategory || undefined}
                tournamentName={tournament.name}
                badgeKey={tournament.badgeKey}
              />
            )
          )}
        </div>
      </section>

      {/* 2. TABLA OFICIAL REGLAMENTARIA (CON EQUIPOS CLICABLES) */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-400" />
              Tabla de Posiciones Oficial {activeCategory && `· ${activeCategory}`}
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Planilla oficial de clasificación correspondiente a {tournament.name}. Haz clic en cualquier equipo para consultar su plantilla.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`${basePath}/equipos${catQueryString}`}
              className="text-xs font-bold text-neutral-300 hover:text-white transition flex items-center gap-1 border border-neutral-800 bg-neutral-900 px-3 py-1.5 rounded-xl"
            >
              <Users className="h-3.5 w-3.5 text-red-400" />
              Ver los {teams.length} Equipos
            </Link>
            <Link
              href={`${basePath}/posiciones${catQueryString}`}
              className="text-xs font-bold text-red-400 hover:text-red-300 transition flex items-center gap-1"
            >
              Ver tabla completa
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <TournamentOfficialTable
          title={`TABLA DE POSICIONES · ${tournament.name}${activeCategory ? ` (${activeCategory.toUpperCase()})` : ""}`}
          groupName={activeCategory ? `GRUPO ${activeCategory.toUpperCase()}` : tournament.groupName}
          qualificationRule={tournament.qualificationRule}
          qualificationCutoff={tournament.qualificationCutoff}
          rows={standings}
          baseTournamentPath={basePath}
          currentCategory={activeCategory || undefined}
        />
      </section>

      {/* 3. GOLEADOR DEL TORNEO Y VALLA MENOS VENCIDA */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Goal className="h-5 w-5 text-red-400" />
            Líderes Individuales Oficiales {activeCategory && `· ${activeCategory}`}
          </h2>
          <Link
            href={`${basePath}/estadisticas${catQueryString}`}
            className="text-xs font-bold text-red-400 hover:text-red-300 transition flex items-center gap-1"
          >
            Ver todas las estadísticas
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Goleador */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Goal className="h-4 w-4 text-red-400" />
                Goleador del Torneo {activeCategory && `(${activeCategory})`}
              </h3>
              <span className="text-[10px] font-bold text-red-400 uppercase bg-red-500/10 px-2 py-0.5 rounded-full">
                Artilleros
              </span>
            </div>
            <div className="space-y-2">
              {topScorers.slice(0, 4).map((s, idx) => (
                <div key={s.player} className="flex items-center justify-between text-xs p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/60">
                  <span className="font-bold text-neutral-400">
                    {idx + 1}. <strong className="text-white font-semibold">{s.player}</strong> ({s.team})
                  </span>
                  <span className="font-black text-red-400 text-sm">{s.goals} Goles</span>
                </div>
              ))}
            </div>
          </div>

          {/* Valla */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                Valla Menos Vencida {activeCategory && `(${activeCategory})`}
              </h3>
              <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded-full">
                Porterías
              </span>
            </div>
            <div className="space-y-2">
              {leastConceded.slice(0, 4).map((k, idx) => (
                <div key={k.player} className="flex items-center justify-between text-xs p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/60">
                  <span className="font-bold text-neutral-400">
                    {idx + 1}. <strong className="text-white font-semibold">{k.player}</strong> ({k.team})
                  </span>
                  <span className="font-black text-emerald-400 text-sm">
                    {k.cleanSheets} Invictas <span className="text-[10px] text-neutral-500">({k.goalsConceded} GC)</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
