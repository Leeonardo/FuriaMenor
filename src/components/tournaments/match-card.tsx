import React from "react";
import Link from "next/link";
import { TournamentMatchItem } from "@/data/tournaments-data";
import { Clock, MapPin, UserCheck, Shield } from "lucide-react";

interface MatchCardProps {
  match: TournamentMatchItem;
  baseTournamentPath?: string;
  currentCategory?: string;
}

export function MatchCard({ match, baseTournamentPath, currentCategory }: MatchCardProps) {
  const catParam = currentCategory ? `?cat=${currentCategory}` : "";
  const homeSlug = match.homeTeam.toLowerCase().replace(/\s+/g, "-");
  const awaySlug = match.awayTeam.toLowerCase().replace(/\s+/g, "-");

  const homeHref = baseTournamentPath ? `${baseTournamentPath}/equipos/${homeSlug}${catParam}` : undefined;
  const awayHref = baseTournamentPath ? `${baseTournamentPath}/equipos/${awaySlug}${catParam}` : undefined;

  const isFinished = match.status === "finished";

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 hover:border-neutral-700 transition flex flex-col justify-between shadow-lg">
      <div>
        {/* Cabecera del Partido */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-3 border-b border-neutral-800/80 pb-2">
          <span className="font-bold text-red-400 uppercase tracking-wider">{match.category}</span>
          <span className="flex items-center gap-1 font-medium text-neutral-300">
            <Clock className="h-3.5 w-3.5 text-neutral-500" />
            {match.matchDate} · {match.matchTime}
          </span>
        </div>

        {/* Enfrentamiento de Equipos */}
        <div className="flex items-center justify-between py-2 text-base font-bold text-white my-1">
          {/* Equipo Local */}
          <div className="flex-1 truncate">
            {homeHref ? (
              <Link
                href={homeHref}
                className="hover:text-red-400 transition truncate hover:underline"
                title={`Ver plantilla de ${match.homeTeam}`}
              >
                {match.homeTeam}
              </Link>
            ) : (
              <span className="truncate">{match.homeTeam}</span>
            )}
          </div>

          {/* Marcador / VS */}
          <div className="px-3 shrink-0 text-center">
            {isFinished && match.homeScore !== null && match.awayScore !== null ? (
              <span className="font-black text-red-400 text-lg px-2 py-0.5 rounded-lg bg-neutral-950 border border-neutral-800">
                {match.homeScore} - {match.awayScore}
              </span>
            ) : (
              <span className="text-xs font-black text-neutral-500 bg-neutral-950 px-2 py-1 rounded-md border border-neutral-800/80">
                VS
              </span>
            )}
          </div>

          {/* Equipo Visitante */}
          <div className="flex-1 truncate text-right">
            {awayHref ? (
              <Link
                href={awayHref}
                className="hover:text-red-400 transition truncate hover:underline"
                title={`Ver plantilla de ${match.awayTeam}`}
              >
                {match.awayTeam}
              </Link>
            ) : (
              <span className="truncate">{match.awayTeam}</span>
            )}
          </div>
        </div>

        {/* Sede */}
        <div className="mt-2 flex items-center gap-1 text-xs text-neutral-400">
          <MapPin className="h-3.5 w-3.5 text-red-400 shrink-0" />
          <span className="truncate">{match.venue}</span>
        </div>
      </div>

      {/* CUERPO ARBITRAL DESIGNADO PARA EL PARTIDO */}
      {match.referees && (
        <div className="mt-4 pt-3 border-t border-neutral-800/80 bg-neutral-950/60 -mx-5 -mb-5 p-4 rounded-b-2xl">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1.5">
            <UserCheck className="h-3.5 w-3.5" />
            <span>Cuerpo Arbitral Oficial</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-neutral-300">
            <div>
              <span className="text-neutral-500 font-medium">Principal: </span>
              <strong className="text-neutral-200">{match.referees.principal}</strong>
            </div>
            <div>
              <span className="text-neutral-500 font-medium">Auxiliar: </span>
              <strong className="text-neutral-200">{match.referees.asistente}</strong>
            </div>
            {match.referees.mesa && (
              <div className="sm:col-span-2 text-neutral-400">
                <span className="text-neutral-500 font-medium">Mesa / Cronómetro: </span>
                <span>{match.referees.mesa}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
