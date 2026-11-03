import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDaerisSubTournament } from "@/data/daeris-subtournaments";
import { DaerisBadgeRenderer } from "@/components/ui/daeris-sub-badge-renderer";
import { ChevronRight, Home, Calendar, Trophy, Goal, CheckCircle2, MapPin, Users } from "lucide-react";

interface SubTournamentLayoutProps {
  children: React.ReactNode;
  params: Promise<{ torneo: string }>;
}

export default async function SubTournamentLayout({ children, params }: SubTournamentLayoutProps) {
  const { torneo: torneoSlug } = await params;
  const tournament = getDaerisSubTournament(torneoSlug);

  if (!tournament) {
    notFound();
  }

  const basePath = `/torneos/daeris/${tournament.slug}`;

  const navLinks = [
    { label: "Inicio", href: basePath, icon: Home },
    { label: "Calendario", href: `${basePath}/calendario`, icon: Calendar },
    { label: "Resultados", href: `${basePath}/resultados`, icon: CheckCircle2 },
    { label: "Tabla de Posiciones", href: `${basePath}/posiciones`, icon: Trophy },
    { label: "Goleador & Valla", href: `${basePath}/estadisticas`, icon: Goal },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* 1. Breadcrumbs de Jerarquía */}
      <div className="border-b border-neutral-800/80 bg-neutral-950/80">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 text-xs text-neutral-400 sm:px-6 lg:px-8">
          <Link href="/" className="hover:text-white transition whitespace-nowrap">
            Inicio
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0 text-neutral-600" />
          <Link href="/torneos" className="hover:text-white transition whitespace-nowrap">
            Torneos
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0 text-neutral-600" />
          <Link href="/torneos/daeris" className="hover:text-white transition whitespace-nowrap">
            Torneo Daeris
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0 text-neutral-600" />
          <span className="font-semibold text-white whitespace-nowrap truncate max-w-[200px]">
            {tournament.name}
          </span>
        </div>
      </div>

      {/* 2. Banner de Cabecera Oficial con Insignia del Torneo */}
      <header className="border-b border-neutral-800 bg-gradient-to-r from-red-950/30 via-neutral-900 to-neutral-950 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Insignia oficial */}
              <div className="shrink-0 drop-shadow-xl">
                <DaerisBadgeRenderer badgeKey={tournament.badgeKey} size={76} />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${tournament.accent.pill}`}>
                    {tournament.categoryLabel}
                  </span>
                  <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs font-semibold text-neutral-300">
                    {tournament.status}
                  </span>
                </div>

                <h1 className="mt-2 text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                  {tournament.name}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-red-400" />
                    {tournament.venue}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-neutral-400" />
                    {tournament.teamsCount} Equipos en competencia
                  </span>
                </div>
              </div>
            </div>

            {/* Selector rápido entre los otros torneos de Daeris */}
            <div className="shrink-0">
              <Link
                href="/torneos/daeris"
                className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-900/80 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:border-neutral-500 hover:text-white transition"
              >
                Ver los 6 Torneos Daeris
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* 3. Barra de Navegación del Torneo */}
          <div className="mt-8 flex gap-2 overflow-x-auto border-t border-neutral-800/80 pt-4 scrollbar-none">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-2 text-xs sm:text-sm font-semibold text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800 hover:text-white transition whitespace-nowrap"
                >
                  <Icon className="h-4 w-4 text-red-400" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Contenido de la sub-página */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
