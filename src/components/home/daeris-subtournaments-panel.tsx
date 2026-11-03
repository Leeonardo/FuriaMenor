"use client";

import React from "react";
import {
  DaerisInstitucionalBadge,
  DaerisFutbol7Badge,
  DaerisMaster50Badge,
  DaerisLibreParqueCaraboboBadge,
  DaerisInfantilPrimeraBadge,
  DaerisInfantilSegundaBadge,
} from "@/components/ui/daeris-sub-badges";
import { DaerisSubId, daerisSubList, DaerisSubTournament } from "@/data/daeris-subtournaments";
import { CheckCircle2, ChevronRight, Layers, MapPin, Users } from "lucide-react";

interface DaerisSubtournamentsPanelProps {
  selectedSubId: DaerisSubId;
  onSelectSub: (sub: DaerisSubTournament) => void;
}

export function DaerisSubtournamentsPanel({
  selectedSubId,
  onSelectSub,
}: DaerisSubtournamentsPanelProps) {
  // Renderiza el badge SVG correspondiente
  const renderBadge = (key: DaerisSubId, size = 52) => {
    switch (key) {
      case "infantil-1ra":
        return <DaerisInfantilPrimeraBadge size={size} />;
      case "infantil-2da":
        return <DaerisInfantilSegundaBadge size={size} />;
      case "institucional":
        return <DaerisInstitucionalBadge size={size} />;
      case "futbol7":
        return <DaerisFutbol7Badge size={size} />;
      case "master50":
        return <DaerisMaster50Badge size={size} />;
      case "libre-parquecarabobo":
        return <DaerisLibreParqueCaraboboBadge size={size} />;
      default:
        return <DaerisInfantilPrimeraBadge size={size} />;
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Encabezado con identidad de la Liga Daeris */}
      <div className="rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-950/40 via-neutral-900/90 to-neutral-950 p-5 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/20 text-red-400 border border-red-500/30">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.25em] text-red-400 font-bold">
                  Circuito Torneo Daeris
                </span>
                <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-300">
                  6 Competiciones
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                Ramas y Divisiones de Torneo Daeris
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400">
                Selecciona una de las 6 categorías para ver sus partidos, resultados y tabla de clasificación
              </p>
            </div>
          </div>

          <div className="text-xs text-neutral-500 font-medium">
            Mostrando:{" "}
            <span className="text-white font-bold">
              {daerisSubList.find((s) => s.id === selectedSubId)?.name}
            </span>
          </div>
        </div>
      </div>

      {/* Grid de los 6 Torneos Internos con sus Insignias Oficiales */}
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {daerisSubList.map((sub) => {
          const isSelected = selectedSubId === sub.id;

          return (
            <button
              key={sub.id}
              type="button"
              onClick={() => onSelectSub(sub)}
              className={`relative flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 group cursor-pointer ${
                isSelected
                  ? "border-red-500/80 bg-neutral-900/90 shadow-lg shadow-red-900/20 ring-2 ring-red-500/40"
                  : "border-neutral-800/80 bg-neutral-900/40 hover:border-neutral-700 hover:bg-neutral-900/70"
              }`}
            >
              {/* Insignia del torneo */}
              <div className="shrink-0 transition-transform duration-200 group-hover:scale-105">
                {renderBadge(sub.badgeKey, 54)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${sub.accent.pill}`}>
                    {sub.categoryLabel}
                  </span>
                  {isSelected && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-red-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Activo
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition leading-snug line-clamp-1">
                  {sub.name}
                </h4>

                <div className="mt-1 flex items-center gap-1 text-[11px] text-neutral-400 truncate">
                  <MapPin className="h-3 w-3 text-red-400 shrink-0" />
                  <span className="truncate">{sub.venue}</span>
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-500 pt-1.5 border-t border-neutral-800/60">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {sub.teamsCount} Equipos
                  </span>
                  <span className="text-neutral-400 font-medium flex items-center gap-0.5 group-hover:text-red-400 transition">
                    Ver datos
                    <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
