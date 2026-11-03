"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Trophy, Filter, ArrowLeft, ShieldCheck, RefreshCw } from "lucide-react";
import { TournamentOfficialTable, OfficialTableRow } from "@/components/tournaments/tournament-official-table";
import { daerisSubList, DaerisSubId } from "@/data/daeris-subtournaments";
import {
  createGenericStandings,
  MINOR_CATEGORIES,
  MinorCategory,
  createCategoryStandings,
} from "@/data/generic-tournament-data";
import {
  getStoredMatches,
  calculateStandingsForCategory,
  DB_CLUBS,
  DB_CATEGORIES,
  DBMatch,
} from "@/lib/db-store";

export default function PosicionesPage() {
  const [selectedTournament, setSelectedTournament] = useState<"daeris" | "prueba">("daeris");
  const [selectedDaerisSub, setSelectedDaerisSub] = useState<DaerisSubId>("infantil-1ra");
  const [selectedCategory, setSelectedCategory] = useState<MinorCategory>("Sub-12");
  const [storedMatches, setStoredMatches] = useState<DBMatch[]>([]);

  useEffect(() => {
    setStoredMatches(getStoredMatches());
  }, []);

  const currentSub = daerisSubList.find((s) => s.id === selectedDaerisSub) || daerisSubList[0];

  const standingsRows: OfficialTableRow[] = useMemo(() => {
    if (selectedTournament === "prueba") {
      return createGenericStandings("Equipo");
    }

    // Comprobar si hay partidos finalizados en la base de datos para esta categoría
    const targetCatObj = DB_CATEGORIES.find((c) => c.name === selectedCategory);
    const catId = targetCatObj?.id || `cat-${selectedCategory.toLowerCase()}`;

    if (storedMatches.length > 0) {
      const liveStandings = calculateStandingsForCategory(catId, storedMatches, DB_CLUBS);
      const totalPlayed = liveStandings.reduce((sum, r) => sum + r.played, 0);

      if (totalPlayed > 0) {
        return liveStandings.map((row, idx) => ({
          pos: idx + 1,
          team: row.clubName,
          jj: row.played,
          jg: row.won,
          je: row.drawn,
          jp: row.lost,
          ga: row.goalsFor,
          ge: row.goalsAgainst,
          dif: row.goalDifference,
          pts: row.points,
          status: idx < (currentSub.qualificationCutoff || 8) ? "clasificado" : "normal",
        }));
      }
    }

    if (currentSub.hasCategories && currentSub.categoryData) {
      return currentSub.categoryData[selectedCategory]?.standings || currentSub.standings;
    }

    return currentSub.standings;
  }, [selectedTournament, selectedCategory, storedMatches, currentSub]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mb-8 flex flex-col items-center sm:items-start text-center sm:text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition mb-3 self-center sm:self-auto"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al Inicio
          </Link>
          <div className="flex items-center gap-2 text-red-400 justify-center sm:justify-start">
            <Trophy className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold">
              Tablas de Posiciones Oficiales
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl text-white">
            Planillas de Clasificación
          </h1>
          <p className="mt-1 text-sm text-neutral-400 max-w-3xl">
            JJ: Juegos Jugados · JG: Ganados · JE: Empatados · JP: Perdidos · GA: Goles a Favor · GE: Goles en Contra · DIF: Diferencia · PTS: Puntos
          </p>
        </div>

        {/* Filtros de Torneo */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-neutral-400">
              <Filter className="h-4 w-4 text-red-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                Torneo:
              </span>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
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
          </div>

          {/* Sub-selector de las 6 divisiones de Daeris */}
          {selectedTournament === "daeris" && (
            <div className="w-full pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-xs text-neutral-500 font-medium mr-1 w-full sm:w-auto text-center sm:text-left">División:</span>
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

          {/* Selector de Categorías si la división seleccionada tiene categorías (Sub-8 a Sub-20) */}
          {selectedTournament === "daeris" && currentSub.hasCategories && (
            <div className="w-full pt-3 border-t border-neutral-800">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-red-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    Categoría Menor Segmentada:
                  </span>
                </div>
                <span className="text-[11px] font-bold text-red-400 sm:ml-auto">
                  {selectedCategory}
                </span>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {MINOR_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                      selectedCategory === cat
                        ? "bg-red-600 text-white shadow-md shadow-red-600/30 ring-1 ring-red-400"
                        : "bg-neutral-800/90 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tabla Oficial idéntica a la imagen de referencia */}
        <div className="max-w-4xl mx-auto">
          <TournamentOfficialTable
            title={
              selectedTournament === "daeris"
                ? `TABLA DE POSICIONES · ${currentSub.name}${currentSub.hasCategories ? ` (${selectedCategory.toUpperCase()})` : ""}`
                : "TABLA DE POSICIONES · TORNEO DE PRUEBA"
            }
            groupName={
              selectedTournament === "daeris"
                ? currentSub.hasCategories
                  ? `GRUPO ${selectedCategory.toUpperCase()}`
                  : currentSub.groupName
                : "GRUPO PRUEBA A"
            }
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
