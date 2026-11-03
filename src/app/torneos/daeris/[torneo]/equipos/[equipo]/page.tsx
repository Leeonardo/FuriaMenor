import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDaerisSubTournament, getTeamInTournament, getSubTournamentData } from "@/data/daeris-subtournaments";
import {
  ArrowLeft,
  Shield,
  Users,
  Trophy,
  UserCheck,
  CheckCircle2,
  Goal,
  CreditCard,
  KeyRound,
  ChevronRight,
} from "lucide-react";

interface TeamPageProps {
  params: Promise<{ torneo: string; equipo: string }>;
  searchParams: Promise<{ cat?: string; categoria?: string }>;
}

export default async function TeamRosterPage({ params, searchParams }: TeamPageProps) {
  const { torneo: torneoSlug, equipo: equipoSlug } = await params;
  const query = await searchParams;
  const categoryParam = query?.cat || query?.categoria;

  const tournament = getDaerisSubTournament(torneoSlug);

  if (!tournament) {
    notFound();
  }

  const team = getTeamInTournament(tournament, equipoSlug, categoryParam);

  if (!team) {
    notFound();
  }

  const { standings, activeCategory } = getSubTournamentData(tournament, categoryParam);
  const teamStanding = standings.find(
    (s) => s.team.toLowerCase() === team.name.toLowerCase()
  ) || { pos: 1, jj: 8, jg: 6, je: 0, jp: 2, ga: 37, ge: 13, dif: 24, pts: 18 };

  const basePath = `/torneos/daeris/${tournament.slug}`;
  const catQueryString = activeCategory ? `?cat=${activeCategory}` : "";

  return (
    <div className="space-y-8">
      {/* 1. Barra de regreso y migas de pan */}
      <div className="flex items-center gap-2 text-xs text-neutral-400">
        <Link href={`${basePath}/equipos${catQueryString}`} className="hover:text-white transition flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver a Equipos
        </Link>
        <span>·</span>
        <Link href={`${basePath}${catQueryString}`} className="hover:text-white transition">
          {tournament.name}
        </Link>
        <ChevronRight className="h-3 w-3 text-neutral-600" />
        <span className="text-white font-bold">{team.name}</span>
      </div>

      {/* 2. Tarjeta de Identidad Oficial del Equipo */}
      <div className="rounded-3xl border border-red-500/40 bg-gradient-to-r from-red-950/40 via-neutral-900 to-neutral-950 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-red-600/20 text-red-400 border border-red-500/40 shadow-xl">
              <Shield className="h-10 w-10" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-bold text-red-400 border border-red-500/30">
                  {team.category}
                </span>
                <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs text-neutral-300 font-semibold">
                  {tournament.shortName}
                </span>
              </div>

              <h1 className="mt-1.5 text-2xl sm:text-3xl font-black text-white">
                {team.name}
              </h1>

              {/* ID Único Interno de Equipo */}
              <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-3 py-1 border border-neutral-800 font-mono text-xs">
                <KeyRound className="h-3.5 w-3.5 text-red-400" />
                <span className="text-neutral-400">ID Único de Equipo:</span>
                <span className="font-bold text-red-400">{team.id}</span>
              </div>
            </div>
          </div>

          {/* Cuerpo Técnico */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4 text-xs text-neutral-300 min-w-[240px]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
              <UserCheck className="h-3.5 w-3.5 text-red-400" />
              Cuerpo Técnico & Delegación
            </p>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-neutral-500">D.T.:</span>
                <span className="font-semibold text-white">{team.coach}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Asistente:</span>
                <span className="font-semibold text-white">{team.assistantCoach}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Delegado:</span>
                <span className="font-semibold text-white">{team.delegate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen del rendimiento del equipo en la tabla */}
        <div className="mt-6 pt-6 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 text-center">
          <div className="rounded-xl bg-neutral-950/70 p-2.5 border border-neutral-800">
            <span className="text-[10px] uppercase font-bold text-neutral-400">Posición</span>
            <p className="text-lg font-black text-amber-400">#{teamStanding.pos}</p>
          </div>
          <div className="rounded-xl bg-neutral-950/70 p-2.5 border border-neutral-800">
            <span className="text-[10px] uppercase font-bold text-neutral-400">JJ</span>
            <p className="text-lg font-black text-white">{teamStanding.jj}</p>
          </div>
          <div className="rounded-xl bg-neutral-950/70 p-2.5 border border-neutral-800">
            <span className="text-[10px] uppercase font-bold text-neutral-400">JG</span>
            <p className="text-lg font-black text-emerald-400">{teamStanding.jg}</p>
          </div>
          <div className="rounded-xl bg-neutral-950/70 p-2.5 border border-neutral-800">
            <span className="text-[10px] uppercase font-bold text-neutral-400">JE</span>
            <p className="text-lg font-black text-neutral-300">{teamStanding.je}</p>
          </div>
          <div className="rounded-xl bg-neutral-950/70 p-2.5 border border-neutral-800">
            <span className="text-[10px] uppercase font-bold text-neutral-400">JP</span>
            <p className="text-lg font-black text-neutral-400">{teamStanding.jp}</p>
          </div>
          <div className="rounded-xl bg-neutral-950/70 p-2.5 border border-neutral-800">
            <span className="text-[10px] uppercase font-bold text-neutral-400">Goles</span>
            <p className="text-lg font-black text-white">{teamStanding.ga} : {teamStanding.ge}</p>
          </div>
          <div className="rounded-xl bg-neutral-950/70 p-2.5 border border-neutral-800">
            <span className="text-[10px] uppercase font-bold text-neutral-400">DIF</span>
            <p className={`text-lg font-black ${teamStanding.dif >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {teamStanding.dif > 0 ? `+${teamStanding.dif}` : teamStanding.dif}
            </p>
          </div>
          <div className="rounded-xl bg-red-600/20 p-2.5 border border-red-500/40">
            <span className="text-[10px] uppercase font-bold text-red-300">Puntos</span>
            <p className="text-lg font-black text-white">{teamStanding.pts}</p>
          </div>
        </div>
      </div>

      {/* 3. PLANTILLA OFICIAL DE JUGADORES */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-red-400" />
              Plantilla Oficial de Atletas
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Jugadores inscritos con su C.I. y su ID Único Interno de Torneo para la base de datos
            </p>
          </div>
          <span className="rounded-full bg-neutral-900 border border-neutral-800 px-3 py-1 text-xs text-neutral-300 font-semibold">
            {team.roster.length} Jugadores Inscritos
          </span>
        </div>

        {/* Tabla de Plantilla */}
        <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-neutral-200">
              <thead>
                <tr className="bg-neutral-900/90 border-b border-neutral-800 text-neutral-400 font-extrabold uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-3 text-center w-12">#</th>
                  <th className="py-3 px-4 text-left">JUGADOR</th>
                  <th className="py-3 px-3 text-left">CÉDULA (C.I.)</th>
                  <th className="py-3 px-3 text-left">POSICIÓN</th>
                  <th className="py-3 px-3 text-left font-mono">ID ÚNICO TORNEO-JUGADOR</th>
                  <th className="py-3 px-2 text-center w-12">JJ</th>
                  <th className="py-3 px-2 text-center w-12 text-red-400">GOLES</th>
                  <th className="py-3 px-2 text-center w-14">TARJETAS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 font-medium">
                {team.roster.map((p) => {
                  const isKeeper = p.position === "Portero";

                  return (
                    <tr key={p.id} className="hover:bg-neutral-900/50 transition">
                      {/* Dorsal */}
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600/20 text-red-400 font-black border border-red-500/30 text-xs">
                          {p.dorsal}
                        </span>
                      </td>

                      {/* Nombre */}
                      <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                        {p.name}
                      </td>

                      {/* C.I. */}
                      <td className="py-3 px-3 text-neutral-300 whitespace-nowrap font-mono text-xs">
                        {p.ci}
                      </td>

                      {/* Posición */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            isKeeper
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              : p.position === "Pívot"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                              : p.position === "Cierre"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                              : "bg-neutral-800 text-neutral-300"
                          }`}
                        >
                          {p.position}
                        </span>
                      </td>

                      {/* ID Único Interno de Torneo */}
                      <td className="py-3 px-3 font-mono text-[11px] text-red-400/90 whitespace-nowrap">
                        <span className="bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                          {p.id}
                        </span>
                      </td>

                      {/* JJ */}
                      <td className="py-3 px-2 text-center text-neutral-300 font-semibold">
                        {p.matchesPlayed}
                      </td>

                      {/* Goles / Valla */}
                      <td className="py-3 px-2 text-center font-black text-red-400 text-sm">
                        {isKeeper ? (
                          <span className="text-emerald-400 text-xs font-semibold">
                            {p.cleanSheets} Inv ({p.goalsConceded} GC)
                          </span>
                        ) : (
                          p.goals
                        )}
                      </td>

                      {/* Tarjetas */}
                      <td className="py-3 px-2 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5 text-xs">
                          <span className="inline-block h-3.5 w-2.5 rounded-sm bg-yellow-400 shadow-sm" title="Tarjetas Amarillas" />
                          <span className="text-neutral-400">{p.yellowCards}</span>
                          <span className="inline-block h-3.5 w-2.5 rounded-sm bg-red-600 shadow-sm ml-1" title="Tarjetas Rojas" />
                          <span className="text-neutral-400">{p.redCards}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tarjeta explicativa de la lógica de Base de Datos para el Usuario */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 text-xs text-neutral-400">
          <div className="flex items-center gap-2 font-bold text-white mb-1.5 text-sm">
            <KeyRound className="h-4 w-4 text-red-400" />
            Estructura de Base de Datos y Actualización Automática
          </div>
          <p className="leading-relaxed">
            Cada jugador cuenta con un identificador único alfanumérico compuesto por:{" "}
            <code className="text-red-400 bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-800">
              [TORNEO]-[DIVISIÓN]-[CATEGORÍA]-[EQUIPO]-[CI]
            </code>
            . Al registrar un acta arbitral o resultado con el ID del anotador, la base de datos actualiza en tiempo real:
            la tabla general de posiciones (JJ, JG, JE, JP, GA, GE, DIF, PTS), la tabla de goleadores individuales (+goles por atleta) y la valla menos vencida (+partidos y metas invictas por arquero).
          </p>
        </div>
      </section>
    </div>
  );
}
