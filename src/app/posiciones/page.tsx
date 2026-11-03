"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy, Filter, ArrowLeft } from "lucide-react";
import { TournamentOfficialTable } from "@/components/tournaments/tournament-official-table";
import { daerisSubList, DaerisSubId } from "@/data/daeris-subtournaments";
import { createGenericStandings } from "@/data/generic-tournament-data";

export default function PosicionesPage() {
  const [selectedTournament, setSelectedTournament] = useState<"daeris" | "prueba">("daeris");
  const [selectedDaerisSub, setSelectedDaerisSub] = useState<DaerisSubId>("infantil-1ra");

  const currentSub = daerisSubList.find((s) => s.id === selectedDaerisSub) || daerisSubList[0];
  const standingsRows = selectedTournament === "daeris" ? currentSub.standings : createGenericStandings("Equipo");

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al Inicio
          </Link>
          <div className="flex items-center gap-2 text-red-400">
            <Trophy className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold">
              Tablas de Posiciones Oficiales
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl text-white">
            Planillas de Clasificación
          </h1>
          <p className="mt-1 text-sm text-neutral-400">
            JJ: Juegos Jugados · JG: Ganados · JE: Empatados · JP: Perdidos · GA: Goles a Favor · GE: Goles en Contra · DIF: Diferencia · PTS: Puntos
          </p>
        </div>

        {/* Filtros de Torneo */}
        <div className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
          <div className="flex items-center gap-2 text-neutral-400">
            <Filter className="h-4 w-4 text-red-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Torneo:
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTournament("daeris")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                selectedTournament === "daeris"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "bg-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              Torneo Daeris (6 Divisiones)
            </button>
            <button
              onClick={() => setSelectedTournament("prueba")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                selectedTournament === "prueba"
                  ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                  : "bg-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              Torneo de Prueba
            </button>
          </div>

          {/* Sub-selector de las 6 divisiones de Daeris */}
          {selectedTournament === "daeris" && (
            <div className="w-full pt-3 border-t border-neutral-800 flex flex-wrap items-center gap-2">
              <span className="text-xs text-neutral-500 font-medium mr-1">División:</span>
              {daerisSubList.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedDaerisSub(sub.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    selectedDaerisSub === sub.id
                      ? "bg-neutral-100 text-neutral-950 font-bold shadow-sm"
                      : "bg-neutral-800/80 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  {sub.shortName}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tabla Oficial idéntica a la imagen de referencia */}
        <div className="max-w-4xl mx-auto">
          <TournamentOfficialTable
            title={
              selectedTournament === "daeris"
                ? `TABLA DE POSICIONES · ${currentSub.name}`
                : "TABLA DE POSICIONES · TORNEO DE PRUEBA"
            }
            groupName={selectedTournament === "daeris" ? currentSub.groupName : "GRUPO PRUEBA A"}
            qualificationRule={
              selectedTournament === "daeris"
                ? currentSub.qualificationRule
                : "CLASIFICAN LOS 8 PRIMEROS DE CADA GRUPO"
            }
            qualificationCutoff={selectedTournament === "daeris" ? currentSub.qualificationCutoff : 8}
            rows={standingsRows}
          />
        </div>
      </main>
    </div>
  );
}
