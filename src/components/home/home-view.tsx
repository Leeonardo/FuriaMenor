"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trophy,
  ArrowRight,
  MapPin,
  Users,
  ShieldCheck,
  Calendar,
  Sparkles,
  Layers,
  ChevronRight,
  IdCard,
  Building2,
  ExternalLink,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { DaerisBadge, PruebaBadge } from "@/components/ui/tournament-badges";
import { DaerisBadgeRenderer } from "@/components/ui/daeris-sub-badge-renderer";
import { daerisSubList } from "@/data/daeris-subtournaments";
import { AcademiesPreview } from "@/components/home/academies-preview";

export function HomeView() {
  return (
    <div className="space-y-12 pb-16">
      {/* 1. HERO DE BIENVENIDA LIMPIO & DIRECTO (CERO ARROZ CON MANGO) */}
      <section className="relative overflow-hidden border-b border-neutral-800 bg-gradient-to-b from-neutral-900/60 via-neutral-950 to-neutral-950 pt-10 pb-12 sm:pt-14 sm:pb-16">
        {/* Glow de ambientación deportiva */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-600/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-red-400 mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>
            <span>Furia Menor · Portal Oficial del Fútbol Menor & Futsal en Caracas</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight uppercase">
            Selecciona tu Torneo <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-red-500 via-amber-400 to-red-400 bg-clip-text text-transparent">
              y Vive la Pasión del Futsal
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Elige la competición en la que participa tu equipo para acceder directamente a sus{" "}
            <strong className="text-white">calendarios de juego</strong>,{" "}
            <strong className="text-white">tablas de posiciones en tiempo real</strong>,{" "}
            <strong className="text-white">actas físicas firmadas</strong> y estadísticas oficiales de tu categoría.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#torneos-principales"
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500 hover:shadow-red-600/35"
            >
              <Trophy className="h-4 w-4" />
              <span>Ver Torneos en Disputa</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/academias"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/80 px-5 py-3 text-sm font-bold text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-800 hover:text-white"
            >
              <Building2 className="h-4 w-4 text-amber-400" />
              <span>Directorio de Academias</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SELECTOR DE TORNEO PROTAGONISTA: EL COMIENZO DEL FLUJO */}
      <section id="torneos-principales" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-red-400">
              <Layers className="h-4 w-4" />
              Paso 1: Selecciona una Competición
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 uppercase tracking-tight">
              Torneos & Circuitos Activos
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Cada torneo cuenta con su portal exclusivo para evitar mezclas y ahorrar el consumo de datos móviles.
            </p>
          </div>

          <Link
            href="/torneos"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:text-red-400 transition"
          >
            <span>Ver listado completo de ligas</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* REJILLA DE COMPETICIONES PRINCIPALES */}
        <div className="grid gap-6 lg:grid-cols-12 items-stretch">
          {/* A. TARJETA DESTACADA 1: TORNEO DAERIS (CIRCUITO FORMATIVO DE FUTSAL MENOR) */}
          <div className="lg:col-span-8 rounded-3xl border border-red-500/40 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-red-500/80 transition-all duration-300">
            {/* Glow de fondo */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-red-600/10 blur-3xl group-hover:bg-red-600/20 transition" />

            <div className="space-y-6">
              {/* Cabecera */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="shrink-0 transition-transform duration-300 group-hover:scale-105 drop-shadow-xl">
                    <DaerisBadge size={76} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-red-500/15 border border-red-500/30 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-red-400">
                        En Curso · Temporada 2026
                      </span>
                      <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-[10px] font-bold text-neutral-300">
                        Circuito Mayor Futsal
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-1 uppercase">
                      Torneo Daeris · Futsal Menor
                    </h3>
                  </div>
                </div>

                <Link
                  href="/torneos/daeris"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs sm:text-sm font-black text-white shadow-lg shadow-red-600/30 hover:bg-red-500 transition shrink-0"
                >
                  <span>Entrar al Torneo</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Descripción & Sedes */}
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                El circuito deportivo líder del fútbol sala menor en Caracas. Abarca todas las categorías formativas
                desde la <strong className="text-white">Sub-8 hasta la Sub-20</strong> en 1ra y 2da división, con seguimiento
                exhaustivo de goles, amonestaciones y actas oficiales de cada partido.
              </p>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-neutral-400 border-t border-b border-neutral-800/80 py-3">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-red-400 shrink-0" />
                  <span>Sedes: Gimnasio Libertador (23 de Enero) · Chacao · San Agustín</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>Más de 119 Clubes & Academias</span>
                </div>
              </div>

              {/* Accesos directos a las divisiones y categorías */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400">
                  Acceso Directo por Categoría / División:
                </span>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/torneos/daeris/infantil-1ra-division"
                    className="rounded-xl border border-neutral-800 bg-neutral-900/90 px-3 py-1.5 text-xs font-bold text-neutral-200 hover:border-red-500 hover:text-white transition flex items-center gap-1.5"
                  >
                    <span>Infantil 1ra División (Sub-8 a Sub-20)</span>
                    <ArrowRight className="h-3 w-3 text-red-400" />
                  </Link>

                  <Link
                    href="/torneos/daeris/infantil-2da-division"
                    className="rounded-xl border border-neutral-800 bg-neutral-900/90 px-3 py-1.5 text-xs font-bold text-neutral-200 hover:border-red-500 hover:text-white transition flex items-center gap-1.5"
                  >
                    <span>Infantil 2da División (Ascenso)</span>
                    <ArrowRight className="h-3 w-3 text-red-400" />
                  </Link>

                  <Link
                    href="/torneos/daeris/infantil-2da-division?cat=Sub-16"
                    className="rounded-xl border border-neutral-800 bg-neutral-900/50 px-2.5 py-1.5 text-[11px] font-semibold text-neutral-300 hover:border-amber-500/50 hover:text-white transition"
                  >
                    Sub-16 Intermedio
                  </Link>

                  <Link
                    href="/torneos/daeris/infantil-2da-division?cat=Sub-14"
                    className="rounded-xl border border-neutral-800 bg-neutral-900/50 px-2.5 py-1.5 text-[11px] font-semibold text-neutral-300 hover:border-amber-500/50 hover:text-white transition"
                  >
                    Sub-14 2da
                  </Link>

                  <Link
                    href="/torneos/daeris/infantil-2da-division?cat=Sub-12"
                    className="rounded-xl border border-neutral-800 bg-neutral-900/50 px-2.5 py-1.5 text-[11px] font-semibold text-neutral-300 hover:border-amber-500/50 hover:text-white transition"
                  >
                    Sub-12 2da
                  </Link>

                  <Link
                    href="/torneos/daeris/infantil-2da-division?cat=Sub-10"
                    className="rounded-xl border border-neutral-800 bg-neutral-900/50 px-2.5 py-1.5 text-[11px] font-semibold text-neutral-300 hover:border-amber-500/50 hover:text-white transition"
                  >
                    Sub-10 2da
                  </Link>

                  <Link
                    href="/torneos/daeris/infantil-2da-division?cat=Sub-8"
                    className="rounded-xl border border-neutral-800 bg-neutral-900/50 px-2.5 py-1.5 text-[11px] font-semibold text-neutral-300 hover:border-amber-500/50 hover:text-white transition"
                  >
                    Sub-8 2da
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer de la tarjeta con recordatorio del flujo limpio */}
            <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Navegación unificada: Calendarios · Posiciones · Resultados con Actas · Goleadores
              </span>
              <span className="font-bold text-red-400 hidden sm:inline">6 Torneos Oficiales</span>
            </div>
          </div>

          {/* B. TARJETA DESTACADA 2: TORNEO INSTITUCIONAL FÚTBOL 7 */}
          <div className="lg:col-span-4 rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6 sm:p-7 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-amber-500/50 hover:bg-neutral-900 transition-all duration-300">
            {/* Glow de fondo */}
            <div className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-amber-500/10 blur-2xl group-hover:bg-amber-500/20 transition" />

            <div className="space-y-5">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-400">
                  Fútbol 7 · Grupo Único
                </span>
                <span className="text-[11px] font-bold text-neutral-400">5 Equipos</span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                  Torneo Institucional Fútbol 7
                </h3>
                <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                  Competición de instituciones y empresas públicas y privadas de la Gran Caracas.
                </p>
              </div>

              {/* Lista rápida de equipos institucionales */}
              <div className="rounded-2xl border border-neutral-800/80 bg-neutral-950 p-3.5 space-y-1.5 text-xs">
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-wider block mb-1">
                  Equipos en Disputa:
                </span>
                <div className="flex items-center justify-between font-bold text-white">
                  <span>1. Polar FC</span>
                  <span className="text-emerald-400 font-mono text-[11px]">7 pts</span>
                </div>
                <div className="flex items-center justify-between font-bold text-white">
                  <span>2. CNPB</span>
                  <span className="text-emerald-400 font-mono text-[11px]">7 pts</span>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span>3. Operaciones FC</span>
                  <span className="text-neutral-400 font-mono text-[11px]">3 pts</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                  <span>4. CICPC Vehículos</span>
                  <span>0 pts</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                  <span>5. Banco del Tesoro</span>
                  <span>0 pts</span>
                </div>
              </div>

              <div className="text-xs text-neutral-400 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Clasifican los 4 primeros a la fase final</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800">
              <Link
                href="/torneos/daeris/futbol-7"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500/20 border border-amber-500/40 px-4 py-2.5 text-xs font-black text-amber-300 hover:bg-amber-500/30 transition shadow-sm"
              >
                <span>Entrar a Institucional F7</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRES PILARES DE AUTOGESTIÓN & SERVICIOS PARA LA COMUNIDAD */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-3">
          {/* Tarjeta 1: Carnet Digital */}
          <Link
            href="/academias"
            className="group rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 transition-all duration-300 hover:border-red-500/40 hover:bg-neutral-900 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/15 border border-red-500/30 text-red-400 mb-3 group-hover:scale-105 transition">
                <IdCard className="h-5 w-5" />
              </div>
              <h4 className="text-base font-black text-white uppercase tracking-wider">
                Carnet Digital Federado
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Fichas oficiales validadas por la liga con fecha de nacimiento exacta, código QR y credencial de juego.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-red-400">
              <span>Consultar Carnets</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Tarjeta 2: Directorio de Academias & Staff */}
          <Link
            href="/academias"
            className="group rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 transition-all duration-300 hover:border-blue-500/40 hover:bg-neutral-900 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400 mb-3 group-hover:scale-105 transition">
                <Building2 className="h-5 w-5" />
              </div>
              <h4 className="text-base font-black text-white uppercase tracking-wider">
                37+ Academias & Staff
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Perfiles de clubes, nóminas de atletas por categoría, directores técnicos con licencia FVF y contactos.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-blue-400">
              <span>Explorar Directorio</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Tarjeta 3: Panel Administrativo & Delegados */}
          <Link
            href="/admin/login"
            className="group rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 transition-all duration-300 hover:border-amber-500/40 hover:bg-neutral-900 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 mb-3 group-hover:scale-105 transition">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="text-base font-black text-white uppercase tracking-wider">
                Panel de Autogestión
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Acceso oficial para Delegados de Club, Árbitros en Cancha con marcador táctil y Administración General.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <span>Ingresar al Panel</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>
        </div>
      </section>

      {/* 4. VITRINA DE ACADEMIAS & CLUBES AFILIADOS */}
      <AcademiesPreview />

      {/* 5. BANNER DE CIERRE INSTITUCIONAL FURIA MENOR */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-r from-red-950/40 via-neutral-900 to-neutral-950 p-8 text-center sm:p-12 shadow-2xl">
          <div className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl" />

          <p className="text-xs uppercase tracking-[0.3em] text-red-400 font-black">
            Furia Menor · Transformando el Fútbol Menor
          </p>
          <h2 className="mt-3 text-2xl font-black sm:text-3xl lg:text-4xl text-white uppercase">
            Arrancamos con futsal. Crecemos con Venezuela.
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-xs sm:text-base text-neutral-300 leading-relaxed">
            Furia Menor es la plataforma digital de referencia para torneos, academias y familias del fútbol menor.
            Visualiza partidos, valida nóminas federadas y sigue la evolución de cada atleta en un entorno profesional.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/torneos/daeris"
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs sm:text-sm font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500 hover:shadow-red-600/30"
            >
              <Trophy className="h-4 w-4" />
              <span>Explorar Torneo Daeris</span>
            </Link>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/80 px-5 py-2.5 text-xs sm:text-sm font-bold text-neutral-300 transition hover:border-neutral-500 hover:bg-neutral-800 hover:text-white"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Acceso Delegados y Árbitros</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
