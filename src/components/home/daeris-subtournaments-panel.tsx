"use client";

import React from "react";
import Link from "next/link";
import { DaerisBadgeRenderer } from "@/components/ui/daeris-sub-badge-renderer";
import { DaerisSubId, daerisSubList, DaerisSubTournament } from "@/data/daeris-subtournaments";
import { CheckCircle2, ChevronRight, ExternalLink, Layers, MapPin, Users, ShieldCheck } from "lucide-react";

interface DaerisSubtournamentsPanelProps {
  selectedSubId: DaerisSubId;
  onSelectSub: (sub: DaerisSubTournament) => void;
}

export function DaerisSubtournamentsPanel({
  selectedSubId,
  onSelectSub,
}: DaerisSubtournamentsPanelProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Encabezado con identidad de la Liga Daeris */}
      <div className="rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-950/40 via-neutral-900/90 to-neutral-950 p-5 sm:p-6 mb-6 shadow-xl">
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
                Selecciona una de las 6 categorías para filtrar la home o ingresa a su página oficial
              </p>
            </div>
          </div>

          <Link
            href="/torneos/daeris"
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-900/80 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:border-neutral-500 hover:text-white transition whitespace-nowrap self-start sm:self-auto"
          >
            Hub Oficial Daeris
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Grid de los 6 Torneos Internos con sus Insignias Oficiales */}
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {daerisSubList.map((sub) => {
          const isSelected = selectedSubId === sub.id;

          return (
            <div
              key={sub.id}
              onClick={() => onSelectSub(sub)}
              className={`relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 group cursor-pointer ${
                isSelected
                  ? "border-red-500/80 bg-neutral-900/90 shadow-lg shadow-red-900/20 ring-2 ring-red-500/40"
                  : "border-neutral-800/80 bg-neutral-900/40 hover:border-neutral-700 hover:bg-neutral-900/70"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Insignia del torneo: clicable para navegar directamente */}
                <Link
                  href={`/torneos/daeris/${sub.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  title={`Ingresar a ${sub.name}`}
                  className="shrink-0 transition-transform duration-200 hover:scale-110"
                >
                  <DaerisBadgeRenderer badgeKey={sub.badgeKey} size={56} />
                </Link>

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
                    <Link
                      href={`/torneos/daeris/${sub.slug}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {sub.name}
                    </Link>
                  </h4>

                  <div className="mt-1 flex items-center gap-1 text-[11px] text-neutral-400 truncate">
                    <MapPin className="h-3 w-3 text-red-400 shrink-0" />
                    <span className="truncate">{sub.venue}</span>
                  </div>

                  {sub.hasCategories && (
                    <div className="mt-1.5 flex items-center gap-1 text-[10px] text-red-400 font-semibold">
                      <ShieldCheck className="h-3 w-3" />
                      <span>Sub-8 a Sub-20</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Barra inferior con botón para ingresar a la home dedicada */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500 pt-2 border-t border-neutral-800/60">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {sub.teamsCount} Equipos
                </span>
                <Link
                  href={`/torneos/daeris/${sub.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 hover:underline"
                >
                  Ver Torneo
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
