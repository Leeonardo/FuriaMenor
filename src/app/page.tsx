import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Goal,
  LayoutDashboard,
  Shield,
  ShoppingBag,
  Target,
  Trophy,
  Users,
  Clock,
  MapPin,
} from "lucide-react";
import { torneoDaerisMatches } from "@/data/daeris/calendario";
import { topScorers, leastConceded } from "@/data/daeris";

export const metadata: Metadata = {
  title: "Torneo Daeris | Furia Menor - Calendario, Resultados y Posiciones",
  description:
    "Seguimiento oficial del Torneo Daeris de Furia Menor. Calendario, tabla de posiciones, goleadores, arquería menos vencida y resultados por categoría y modalidad.",
  openGraph: {
    title: "Torneo Daeris | Furia Menor - Calendario, Resultados y Posiciones",
    description:
      "Seguimiento oficial del Torneo Daeris de Furia Menor. Calendario, tabla de posiciones, goleadores, arquería menos vencida y resultados por categoría y modalidad.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Torneo Daeris | Furia Menor - Calendario, Resultados y Posiciones",
    description:
      "Seguimiento oficial del Torneo Daeris de Furia Menor. Calendario, tabla de posiciones, goleadores, arquería menos vencida y resultados por categoría y modalidad.",
  },
};

export default function Home() {
  const upcomingMatches = torneoDaerisMatches
    .filter((m) => m.status === "scheduled")
    .sort((a, b) => a.matchTime.localeCompare(b.matchTime))
    .slice(0, 6);

  const finishedMatches = torneoDaerisMatches
    .filter((m) => m.status === "finished")
    .sort((a, b) => b.matchDate.localeCompare(a.matchDate))
    .slice(0, 4);

  const nextMatch = upcomingMatches[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: "Furia Menor",
    description: "Torneo infantil-juvenil Furia Menor",
    sport: "Soccer",
  };

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: "Torneo Daeris",
    sport: "Soccer",
    organizer: {
      "@type": "SportsOrganization",
      name: "Furia Menor",
    },
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Furia Menor" width={44} height={44} className="object-contain" />
            <span className="text-lg font-bold tracking-tight">Furia Menor</span>
          </Link>
          <div className="hidden items-center gap-6 lg:flex">
            <Link href="/" className="text-sm text-white">
              Inicio
            </Link>
            <Link href="/calendario" className="text-sm text-neutral-300 transition hover:text-white">
              Torneos
            </Link>
            <Link href="/calendario" className="text-sm text-neutral-300 transition hover:text-white">
              Calendario
            </Link>
            <Link href="/calendario" className="text-sm text-neutral-300 transition hover:text-white">
              Resultados
            </Link>
            <Link href="/posiciones" className="text-sm text-neutral-300 transition hover:text-white">
              Tabla de Posiciones
            </Link>
            <Link href="/estadisticas" className="text-sm text-neutral-300 transition hover:text-white">
              Estadísticas
            </Link>
            <Link href="#tienda" className="text-sm text-neutral-300 transition hover:text-white">
              Tienda
            </Link>
            <Link href="/admin" className="text-sm text-red-400 transition hover:text-red-300">
              Panel Admin
            </Link>
          </div>
          <Link
            href="/dashboard/tournaments"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-red-600/20 transition hover:from-red-500 hover:to-orange-500"
          >
            <LayoutDashboard className="h-4 w-4" />
            Acceso Administrador
          </Link>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-red-950/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/15 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-4 py-1.5 text-sm text-red-400">
                <Trophy className="h-4 w-4" />
                Múltiples Torneos • Sub-6 a Sub-18 • Futsal
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Torneos
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  {" "}Furia Menor
                </span>
              </h1>
              <p className="mt-6 text-lg text-neutral-300 sm:text-xl">
                Seguimiento oficial de todos nuestros torneos. Calendario, resultados, tabla de posiciones, goleadores y arquería menos vencida por categoría y modalidad.
              </p>
            </div>
          </div>
        </section>

        {/* Torneo Daeris Block */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Torneo Daeris</h2>
              <p className="mt-1 text-neutral-400">Sede: Cancha Gimnasio Libertador del 23 de Enero</p>
            </div>
            <span className="rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-sm text-red-400">
              En Curso
            </span>
          </div>
          <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/30 via-neutral-900 to-neutral-950 p-6 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-neutral-800 px-3 py-1 text-sm">Sub-6 a Sub-18</span>
              <span className="rounded-full bg-neutral-800 px-3 py-1 text-sm">1ra División • 2da División</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/calendario"
                className="group flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-950/60 p-4 transition-all hover:border-red-500/50 hover:bg-neutral-900"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-red-500" />
                  <span className="font-medium">Calendario</span>
                </div>
                <ArrowRight className="h-4 w-4 text-neutral-500 transition group-hover:translate-x-1 group-hover:text-red-400" />
              </Link>
              <Link
                href="/calendario"
                className="group flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-950/60 p-4 transition-all hover:border-orange-500/50 hover:bg-neutral-900"
              >
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-orange-500" />
                  <span className="font-medium">Resultados</span>
                </div>
                <ArrowRight className="h-4 w-4 text-neutral-500 transition group-hover:translate-x-1 group-hover:text-orange-400" />
              </Link>
              <Link
                href="/posiciones"
                className="group flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-950/60 p-4 transition-all hover:border-amber-500/50 hover:bg-neutral-900"
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-amber-500" />
                  <span className="font-medium">Tabla de Posiciones</span>
                </div>
                <ArrowRight className="h-4 w-4 text-neutral-500 transition group-hover:translate-x-1 group-hover:text-amber-400" />
              </Link>
              <Link
                href="/estadisticas"
                className="group flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-950/60 p-4 transition-all hover:border-yellow-500/50 hover:bg-neutral-900"
              >
                <div className="flex items-center gap-3">
                  <Goal className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">Estadísticas</span>
                </div>
                <ArrowRight className="h-4 w-4 text-neutral-500 transition group-hover:translate-x-1 group-hover:text-yellow-400" />
              </Link>
            </div>
          </div>
        </section>

        {/* Lo más destacado & Últimos resultados */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Lo más destacado */}
            <div className="lg:col-span-1">
              <h2 className="mb-4 text-xl font-bold">Lo más destacado</h2>
              {nextMatch ? (
                <div className="rounded-2xl border border-red-500/40 bg-gradient-to-br from-red-950/40 to-neutral-900 p-6">
                  <div className="mb-4 flex items-center gap-2 text-red-400">
                    {nextMatch.status === "live" ? (
                      <>
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                        </span>
                        <span className="text-sm font-medium">EN VIVO</span>
                      </>
                    ) : (
                      <>
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium">Próximo Partido</span>
                      </>
                    )}
                  </div>
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{nextMatch.homeTeam}</span>
                      <span className="text-neutral-500">vs</span>
                      <span className="font-semibold text-right">{nextMatch.awayTeam}</span>
                    </div>
                  </div>
                  {nextMatch.status === "live" && (
                    <div className="mb-3 text-center">
                      <p className="text-2xl font-bold text-red-400">
                        {nextMatch.homeScore ?? 0} - {nextMatch.awayScore ?? 0}
                      </p>
                    </div>
                  )}
                  <div className="space-y-2 text-sm text-neutral-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {nextMatch.matchDate} • {nextMatch.matchTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{nextMatch.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4" />
                      <span>
                        {nextMatch.category} • {nextMatch.division || "Categoría"}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/calendario"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium transition hover:bg-red-500"
                  >
                    Ver calendario completo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 text-center text-neutral-400">
                  No hay partidos programados
                </div>
              )}
            </div>

            {/* Últimos resultados */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Últimos resultados</h2>
                <Link href="/calendario" className="flex items-center gap-1 text-sm text-red-400 transition hover:text-red-300">
                  Ver todos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              {finishedMatches.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {finishedMatches.map((match) => (
                    <div key={match.id} className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
                      <div className="mb-2 flex items-center justify-between text-xs text-neutral-500">
                        <span>
                          {match.category} {match.division ? `• ${match.division}` : ""}
                        </span>
                        <span>{match.matchDate}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{match.homeTeam}</span>
                          <span className="font-bold">{match.homeScore ?? "-"}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{match.awayTeam}</span>
                          <span className="font-bold">{match.awayScore ?? "-"}</span>
                        </div>
                      </div>
                      <div className="mt-2 text-center">
                        <span className="text-[10px] uppercase tracking-widest text-neutral-500">Finalizado</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 text-center text-neutral-400">
                  No hay partidos registrados/finalizados para esta modalidad en la jornada seleccionada.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Próximos partidos */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Próximos partidos - Torneo Daeris</h2>
            <Link href="/calendario" className="flex items-center gap-1 text-sm text-red-400 transition hover:text-red-300">
              Ver calendario completo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {upcomingMatches.map((match) => (
              <div key={match.id} className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 transition hover:border-neutral-700">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-red-400">{match.category}</span>
                    {match.division && <span className="rounded-full bg-neutral-800 px-2 py-0.5">{match.division}</span>}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <Clock className="h-3 w-3" />
                    <span>
                      {match.matchDate} • {match.matchTime}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 text-right">
                    <p className="text-sm font-medium">{match.homeTeam}</p>
                  </div>
                  <div className="text-center text-neutral-500">vs</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{match.awayTeam}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-neutral-500">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{match.venue}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Goleadores & Arquería */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Top Goleadores</h2>
                <Link href="/estadisticas" className="flex items-center gap-1 text-sm text-red-400 transition hover:text-red-300">
                  Ver todos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60">
                {topScorers.slice(0, 3).map((scorer, idx) => (
                  <div
                    key={`${scorer.player}-${idx}`}
                    className="flex items-center justify-between border-b border-neutral-800 p-4 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-sm font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-medium">{scorer.player}</p>
                        <p className="text-xs text-neutral-500">
                          {scorer.team} • {scorer.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-amber-400">{scorer.goals}</p>
                      <p className="text-xs text-neutral-500">goles</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Arquería Menos Vencida</h2>
                <Link href="/estadisticas" className="flex items-center gap-1 text-sm text-red-400 transition hover:text-red-300">
                  Ver todos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60">
                {leastConceded.slice(0, 3).map((gk, idx) => (
                  <div
                    key={`${gk.player}-${idx}`}
                    className="flex items-center justify-between border-b border-neutral-800 p-4 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-medium">{gk.player}</p>
                        <p className="text-xs text-neutral-500">
                          {gk.team} • {gk.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-cyan-400">{gk.goalsConceded}</p>
                      <p className="text-xs text-neutral-500">{gk.cleanSheets} vallas invictas</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Otros torneos */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Otros torneos</h2>
            <p className="mt-1 text-neutral-400">Próximamente más torneos</p>
          </div>
          <div className="rounded-2xl border border-dashed border-neutral-700 bg-neutral-900/40 p-8 text-center">
            <Trophy className="mx-auto mb-3 h-10 w-10 text-neutral-600" />
            <p className="text-neutral-400">Próximamente se añadirán nuevos torneos</p>
          </div>
        </section>

        {/* Categories */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Categorías</h2>
            <p className="mt-4 text-lg text-neutral-400">
              Sub-6, Sub-8, Sub-10, Sub-12, Sub-14, Sub-16 y Sub-18
            </p>
            <p className="mt-2 text-sm text-red-400">1ra División • 2da División</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6">
              <Shield className="mb-4 h-8 w-8 text-red-500" />
              <h3 className="text-xl font-semibold">Sub-6 a Sub-10</h3>
              <p className="mt-2 text-sm text-neutral-400">1ra División • 2da División</p>
            </div>
            <div className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6">
              <Users className="mb-4 h-8 w-8 text-orange-500" />
              <h3 className="text-xl font-semibold">Sub-12 a Sub-14</h3>
              <p className="mt-2 text-sm text-neutral-400">1ra División • 2da División</p>
            </div>
            <div className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6">
              <BarChart3 className="mb-4 h-8 w-8 text-amber-500" />
              <h3 className="text-xl font-semibold">Sub-16 a Sub-18</h3>
              <p className="mt-2 text-sm text-neutral-400">1ra División • 2da División</p>
            </div>
          </div>
        </section>

        {/* Tienda visual */}
        <section id="tienda" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-r from-red-950/40 via-neutral-900 to-orange-950/40 p-8 text-center">
            <ShoppingBag className="mx-auto mb-4 h-10 w-10 text-red-500" />
            <h2 className="text-2xl font-bold sm:text-3xl">Tienda Furia Menor</h2>
            <p className="mt-2 text-neutral-400">Uniformes, equipamiento y artículos deportivos</p>
            <p className="mt-4 text-sm text-red-400">Próximamente</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Furia Menor" width={40} height={40} className="object-contain" />
              <span className="font-bold">Furia Menor</span>
            </div>
            <p className="text-center text-sm text-neutral-500">
              © {new Date().getFullYear()} Furia Menor. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
