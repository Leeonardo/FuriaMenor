"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Academy,
  academiesData,
  CARACAS_MUNICIPALITIES,
  SPORT_DISCIPLINES,
  ACADEMY_CATEGORIES,
  Municipality,
  SportDiscipline,
  AcademyCategory,
  filterAcademies,
} from "@/data/academies-data";
import { AcademyBadge } from "@/components/academies/academy-badge";
import {
  Building2,
  MapPin,
  Users,
  Search,
  Filter,
  ArrowRight,
  Shield,
  Trophy,
  RotateCcw,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export function AcademiesDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState<Municipality | "all">("all");
  const [selectedDiscipline, setSelectedDiscipline] = useState<SportDiscipline | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<AcademyCategory | "all">("all");

  const filtered = useMemo(() => {
    return filterAcademies(academiesData, {
      query: searchQuery,
      municipality: selectedMunicipality,
      discipline: selectedDiscipline,
      category: selectedCategory,
    });
  }, [searchQuery, selectedMunicipality, selectedDiscipline, selectedCategory]);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedMunicipality !== "all" ||
    selectedDiscipline !== "all" ||
    selectedCategory !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedMunicipality("all");
    setSelectedDiscipline("all");
    setSelectedCategory("all");
  };

  return (
    <div className="space-y-8">
      {/* 1. SECCIÓN DE FILTROS INTERACTIVOS */}
      <section className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-5 sm:p-7 shadow-2xl backdrop-blur-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-600/20 text-red-400 border border-red-500/30">
              <Filter className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider">
                Filtros Interactivos de Búsqueda
              </h2>
              <p className="text-xs text-neutral-400">
                Segmenta por municipio, formato de juego y categorías formativas
              </p>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 transition self-start sm:self-auto"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Limpiar todos los filtros
            </button>
          )}
        </div>

        {/* Buscador de texto */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Buscar por nombre de academia, sector, sede o entrenador..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:border-red-500 focus:outline-none transition"
          />
        </div>

        {/* Filtro 1: Por Municipio / Zona de Caracas */}
        <div>
          <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2.5">
            Municipio de Caracas:
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedMunicipality("all")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition whitespace-nowrap ${
                selectedMunicipality === "all"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30 ring-1 ring-red-400"
                  : "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-700"
              }`}
            >
              Todos los Municipios
            </button>
            {CARACAS_MUNICIPALITIES.map((mun) => (
              <button
                key={mun}
                onClick={() => setSelectedMunicipality(mun)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition whitespace-nowrap ${
                  selectedMunicipality === mun
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30 ring-1 ring-red-400"
                    : "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-700"
                }`}
              >
                {mun}
              </button>
            ))}
          </div>
        </div>

        {/* Filtro 2: Disciplina / Formato */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2.5">
              Disciplina o Formato:
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDiscipline("all")}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                  selectedDiscipline === "all"
                    ? "bg-neutral-100 text-neutral-950 font-black shadow-md"
                    : "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white"
                }`}
              >
                Todas
              </button>
              {SPORT_DISCIPLINES.map((disc) => (
                <button
                  key={disc}
                  onClick={() => setSelectedDiscipline(disc)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                    selectedDiscipline === disc
                      ? "bg-neutral-100 text-neutral-950 font-black shadow-md"
                      : "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white"
                  }`}
                >
                  {disc}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro 3: Categoría Activa */}
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2.5">
              Categoría Formativa:
            </label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === "all"
                    ? "bg-amber-500 text-black font-black shadow-md"
                    : "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white"
                }`}
              >
                Todas
              </button>
              {ACADEMY_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-amber-500 text-black font-black shadow-md"
                      : "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. BARRA DE MÉTRICAS & RESULTADOS */}
      <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
        <span>
          Mostrando <strong className="text-white font-bold">{filtered.length}</strong> academias federadas y clubes activos
        </span>
        {hasActiveFilters && (
          <span className="text-amber-400 font-semibold flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Filtros aplicados
          </span>
        )}
      </div>

      {/* 3. GRID DE TARJETAS DE ACADEMIAS */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-neutral-800 p-12 text-center text-neutral-400 space-y-3">
          <Building2 className="h-10 w-10 text-neutral-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No se encontraron academias</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Ninguna escuela coincide con la combinación de filtros y búsqueda actual. Intenta limpiando los filtros.
          </p>
          <button
            onClick={clearFilters}
            className="rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-500 transition"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((acad) => (
            <div
              key={acad.id}
              className="group flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 transition-all duration-300 hover:border-red-500/50 hover:bg-neutral-900 hover:shadow-2xl shadow-xl"
            >
              <div>
                {/* Cabecera de la Tarjeta */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  {/* Escudo Oficial de la Academia */}
                  <Link
                    href={`/academias/${acad.slug}`}
                    className="shrink-0 transition-transform duration-300 group-hover:scale-105 drop-shadow-xl"
                    title={`Ver ficha técnica de ${acad.name}`}
                  >
                    <AcademyBadge slug={acad.slug} size={64} />
                  </Link>

                  <div className="flex flex-col items-end gap-1.5">
                    <span className="rounded-full bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 text-[10px] font-bold text-red-400 uppercase tracking-wider">
                      {acad.municipality}
                    </span>
                    <span className="text-[11px] text-neutral-500 font-medium">
                      Fund. {acad.foundationYear}
                    </span>
                  </div>
                </div>

                {/* Nombre & Lema */}
                <h3 className="text-lg font-black text-white group-hover:text-red-400 transition leading-snug">
                  <Link href={`/academias/${acad.slug}`}>
                    {acad.name}
                  </Link>
                </h3>

                <p className="text-xs text-neutral-400 italic mt-0.5 line-clamp-1">
                  "{acad.motto}"
                </p>

                {/* Ubicación y Zona */}
                <div className="mt-3 flex items-center gap-1.5 text-xs text-neutral-300">
                  <MapPin className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span className="truncate">{acad.zoneDetail}</span>
                </div>

                {/* Disciplinas en píldoras */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {acad.disciplines.map((d) => (
                    <span
                      key={d}
                      className="rounded-lg bg-neutral-950 px-2.5 py-0.5 text-[10px] font-bold text-neutral-300 border border-neutral-800"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                {/* Resumen de Categorías */}
                <div className="mt-3.5 pt-3 border-t border-neutral-800/80 space-y-1.5 text-xs text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                    <span className="font-medium text-neutral-300">Categorías:</span>
                    <span className="truncate text-neutral-400 text-[11px]">
                      {acad.categories[0]} a {acad.categories[acad.categories.length - 1]} ({acad.categories.length} ramas)
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Trophy className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span className="text-neutral-300 font-medium">Desempeño:</span>
                    <span className="text-amber-300/90 font-bold text-[11px]">
                      {acad.performance.averagePosition}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botón de Entrada a la Ficha Individual */}
              <div className="mt-5 pt-4 border-t border-neutral-800">
                <Link
                  href={`/academias/${acad.slug}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-red-500 transition w-full group/btn"
                >
                  <span>Ver Ficha Técnica Oficial</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
