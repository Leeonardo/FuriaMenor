"use client";

import React from "react";
import Link from "next/link";
import { DaerisBadge, PruebaBadge } from "@/components/ui/tournament-badges";
import { TournamentId, tournamentsList } from "@/data/tournaments-data";
import { CheckCircle2, MapPin, Trophy, Users, ExternalLink } from "lucide-react";

interface TournamentSelectorProps {
  selectedId: TournamentId;
  onSelect: (id: TournamentId) => void;
}

export function TournamentSelector({ selectedId, onSelect }: TournamentSelectorProps) {
  const daeris = tournamentsList.daeris;
  const prueba = tournamentsList.prueba;

  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 pb-4 sm:px-6 lg:px-8">
      {/* Encabezado del selector */}
      <div className="mb-5 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left justify-between gap-3">
        <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <p className="text-xs uppercase tracking-[0.25em] text-red-400 font-bold">
              Futsal Menor · Competiciones
            </p>
          </div>
          <h2 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
            Selecciona el Torneo Activo
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-neutral-400">
            Escoge una competición para filtrar los marcadores, calendario y tablas de posiciones en la home
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/torneos"
            className="rounded-full border border-neutral-800 bg-neutral-900/60 px-3.5 py-1 text-xs text-neutral-300 hover:border-neutral-700 hover:text-white transition flex items-center gap-1.5"
          >
            <span>Ver Directorio de Torneos</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Grid de los 2 Torneos con sus Insignias Oficiales */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* 1. Tarjeta Torneo Daeris */}
        <div
          onClick={() => onSelect("daeris")}
          className={`relative flex flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-300 group cursor-pointer ${
            selectedId === "daeris"
              ? "border-red-500/80 bg-gradient-to-r from-red-950/50 via-neutral-900 to-neutral-950 shadow-xl shadow-red-900/20 ring-2 ring-red-500/40"
              : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 hover:bg-neutral-900/80"
          }`}
        >
          <div className="flex items-center gap-5">
            {/* Insignia SVG Torneo Daeris */}
            <Link
              href="/torneos/daeris"
              onClick={(e) => e.stopPropagation()}
              title="Ir a Torneo Daeris"
              className="shrink-0 transition-transform duration-300 hover:scale-110"
            >
              <DaerisBadge size={76} />
            </Link>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full border border-red-500/40 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-400">
                  {daeris.status}
                </span>
                {selectedId === "daeris" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Activo
                  </span>
                )}
              </div>

              <h3 className="mt-1.5 text-lg font-bold text-white group-hover:text-red-400 transition truncate">
                {daeris.name}
              </h3>

              <div className="mt-1 flex items-center gap-1.5 text-xs text-neutral-400 truncate">
                <MapPin className="h-3.5 w-3.5 text-red-400 shrink-0" />
                <span className="truncate">{daeris.venueShort}</span>
              </div>

              <div className="mt-2.5 flex items-center gap-3 text-[11px] text-neutral-500 font-medium">
                <span className="flex items-center gap-1">
                  <Trophy className="h-3 w-3 text-amber-400" />
                  Sub-8 a Sub-20
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-neutral-400" />
                  6 Divisiones
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-neutral-800/60 flex items-center justify-between text-xs">
            <span className="text-[11px] text-neutral-400">
              {selectedId === "daeris" ? "Mostrando datos en Inicio" : "Haz clic para activar en Inicio"}
            </span>
            <Link
              href="/torneos/daeris"
              onClick={(e) => e.stopPropagation()}
              className="text-red-400 hover:text-red-300 font-bold text-xs flex items-center gap-1 hover:underline"
            >
              Hub Oficial Daeris
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* 2. Tarjeta Torneo de Prueba */}
        <div
          onClick={() => onSelect("prueba")}
          className={`relative flex flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-300 group cursor-pointer ${
            selectedId === "prueba"
              ? "border-sky-500/80 bg-gradient-to-r from-sky-950/50 via-neutral-900 to-neutral-950 shadow-xl shadow-sky-900/20 ring-2 ring-sky-500/40"
              : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 hover:bg-neutral-900/80"
          }`}
        >
          <div className="flex items-center gap-5">
            {/* Insignia SVG Torneo de Prueba */}
            <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
              <PruebaBadge size={76} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full border border-sky-500/40 bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-400">
                  {prueba.status}
                </span>
                {selectedId === "prueba" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-600 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Activo
                  </span>
                )}
              </div>

              <h3 className="mt-1.5 text-lg font-bold text-white group-hover:text-sky-400 transition truncate">
                {prueba.name}
              </h3>

              <div className="mt-1 flex items-center gap-1.5 text-xs text-neutral-400 truncate">
                <MapPin className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                <span className="truncate">{prueba.venueShort}</span>
              </div>

              <div className="mt-2.5 flex items-center gap-3 text-[11px] text-neutral-500 font-medium">
                <span className="flex items-center gap-1">
                  <Trophy className="h-3 w-3 text-sky-400" />
                  Sub-10 a Sub-16
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-neutral-400" />
                  12 Equipos
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-neutral-800/60 flex items-center justify-between text-xs">
            <span className="text-[11px] text-neutral-400">
              {selectedId === "prueba" ? "Mostrando datos en Inicio" : "Haz clic para activar en Inicio"}
            </span>
            <span className="text-sky-400 font-semibold text-xs">
              Piloto Caracas
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
