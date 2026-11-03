"use client";

import { useState } from "react";
import { TournamentId, tournamentsList } from "@/data/tournaments-data";
import { TournamentSelector } from "@/components/home/tournament-selector";
import { HeroSports } from "@/components/home/hero-sports";
import { TorneosLive } from "@/components/home/torneos-live";
import { StatsPreview } from "@/components/home/stats-preview";
import { AcademiesPreview } from "@/components/home/academies-preview";
import { MultimediaGallery } from "@/components/home/multimedia-gallery";
import Link from "next/link";
import { Calendar, Mail } from "lucide-react";

export function HomeView() {
  const [selectedTournamentId, setSelectedTournamentId] = useState<TournamentId>("daeris");
  const currentTournament = tournamentsList[selectedTournamentId];

  return (
    <>
      {/* 1. Selector de Torneo Interactivo con Insignias Oficiales */}
      <TournamentSelector
        selectedId={selectedTournamentId}
        onSelect={(id) => setSelectedTournamentId(id)}
      />

      {/* 2. Hero Deportivo adaptado al torneo activo */}
      <HeroSports tournament={currentTournament} />

      {/* 3. Marcadores y Próximos Partidos del torneo seleccionado */}
      <TorneosLive tournament={currentTournament} />

      {/* 4. Estadísticas Colectivas e Individuales del torneo */}
      <StatsPreview tournament={currentTournament} />

      {/* 5. Vitrina de Academias & Clubes de Caracas */}
      <AcademiesPreview />

      {/* 6. Galería Multimedia de la Cancha */}
      <MultimediaGallery />

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
