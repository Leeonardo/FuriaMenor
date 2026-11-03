import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDaerisSubTournament } from "@/data/daeris-subtournaments";
import { TournamentOfficialTable } from "@/components/tournaments/tournament-official-table";
import { Calendar, CheckCircle2, Clock, Goal, MapPin, Shield, Trophy, ArrowRight } from "lucide-react";

interface SubTournamentPageProps {
  params: Promise<{ torneo: string }>;
}

export default async function SubTournamentHomePage({ params }: SubTournamentPageProps) {
  const { torneo: torneoSlug } = await params;
  const tournament = getDaerisSubTournament(torneoSlug);

  if (!tournament) {
    notFound();
  }

  const upcomingMatches = tournament.matches.filter((m) => m.status === "scheduled");
  const finishedMatches = tournament.matches.filter((m) => m.status === "finished");
  const basePath = `/torneos/daeris/${tournament.slug}`;

  return (
    <div className="space-y-10">
      {/* 1. SECCIÓN DE PARTIDOS RÁPIDOS (PRÓXIMOS Y RESULTADOS) */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-red-400" />
            Jornada en Curso · Marcadores y Fixture
          </h2>
          <Link
            href={`${basePath}/calendario`}
            className="text-xs font-bold text-red-400 hover:text-red-300 transition flex items-center gap-1"
          >
            Ver calendario completo
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Próximo partido */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/30">
              Próximo Partido
            </span>
            {upcomingMatches.length > 0 ? (
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span>{upcomingMatches[0].jornada || "Fecha Oficial"}</span>
                  <span>{upcomingMatches[0].matchDate} · {upcomingMatches[0].matchTime}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-y border-neutral-800/80 my-2">
                  <span className="font-bold text-white text-base">{upcomingMatches[0].homeTeam}</span>
                  <span className="text-xs text-neutral-500 font-black px-2">VS</span>
                  <span className="font-bold text-white text-base text-right">{upcomingMatches[0].awayTeam}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-2">
                  <MapPin className="h-3.5 w-3.5 text-red-400" />
                  <span>{upcomingMatches[0].venue}</span>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-xs text-neutral-400">Sin partidos programados pendientes.</p>
            )}
          </div>

          {/* Último resultado */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Último Resultado
            </span>
            {finishedMatches.length > 0 ? (
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span>{finishedMatches[0].jornada || "Fecha Finalizada"}</span>
                  <span>{finishedMatches[0].matchDate}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-y border-neutral-800/80 my-2">
                  <span className="font-bold text-white text-base">{finishedMatches[0].homeTeam}</span>
                  <span className="font-black text-red-400 text-lg px-2">
                    {finishedMatches[0].homeScore} - {finishedMatches[0].awayScore}
                  </span>
                  <span className="font-bold text-white text-base text-right">{finishedMatches[0].awayTeam}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-neutral-500 mt-2">
                  <span>Finalizado</span>
                  <Link href={`${basePath}/resultados`} className="text-red-400 hover:underline">
                    Ver todos los resultados
                  </Link>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-xs text-neutral-400">Aún no se han disputado encuentros en esta fecha.</p>
            )}
          </div>
        </div>
      </section>

      {/* 2. TABLA OFICIAL REGLAMENTARIA */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-400" />
              Tabla de Posiciones Oficial
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Planilla oficial de clasificación correspondiente a {tournament.name}
            </p>
          </div>
          <Link
            href={`${basePath}/posiciones`}
            className="text-xs font-bold text-red-400 hover:text-red-300 transition flex items-center gap-1"
          >
            Ver tabla completa
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <TournamentOfficialTable
          title={`TABLA DE POSICIONES · ${tournament.name}`}
          groupName={tournament.groupName}
          qualificationRule={tournament.qualificationRule}
          qualificationCutoff={tournament.qualificationCutoff}
          rows={tournament.standings}
        />
      </section>

      {/* 3. GOLEADOR DEL TORNEO Y VALLA MENOS VENCIDA */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Goal className="h-5 w-5 text-red-400" />
            Líderes Individuales Oficiales
          </h2>
          <Link
            href={`${basePath}/estadisticas`}
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
                Goleador del Torneo
              </h3>
              <span className="text-[10px] font-bold text-red-400 uppercase bg-red-500/10 px-2 py-0.5 rounded-full">
                Artilleros
              </span>
            </div>
            <div className="space-y-2">
              {tournament.topScorers.slice(0, 4).map((s, idx) => (
                <div key={s.player} className="flex items-center justify-between text-xs p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/60">
                  <span className="font-bold text-neutral-400">{idx + 1}. <strong className="text-white font-semibold">{s.player}</strong> ({s.team})</span>
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
                Valla Menos Vencida
              </h3>
              <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded-full">
                Porterías
              </span>
            </div>
            <div className="space-y-2">
              {tournament.leastConceded.slice(0, 4).map((k, idx) => (
                <div key={k.player} className="flex items-center justify-between text-xs p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/60">
                  <span className="font-bold text-neutral-400">{idx + 1}. <strong className="text-white font-semibold">{k.player}</strong> ({k.team})</span>
                  <span className="font-black text-emerald-400 text-sm">{k.cleanSheets} Invictas <span className="text-[10px] text-neutral-500">({k.goalsConceded} GC)</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
