import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Calendar,
  Goal,
  LayoutDashboard,
  Shield,
  ShoppingBag,
  Target,
  Trophy,
  Users,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.jpeg" alt="Furia Menor" width={44} height={44} className="rounded-lg" />
            <span className="text-lg font-bold tracking-tight">Furia Menor</span>
          </Link>
          <div className="hidden items-center gap-6 lg:flex">
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
              Goleadores
            </Link>
            <Link href="/estadisticas" className="text-sm text-neutral-300 transition hover:text-white">
              Arquería Menos Vencida
            </Link>
            <Link href="#tienda" className="text-sm text-neutral-300 transition hover:text-white">
              Tienda
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
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-4 py-1.5 text-sm text-red-400">
                <Trophy className="h-4 w-4" />
                Torneo Único • Sub-6 a Sub-18 • Fútbol Campo y Futsal
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Furia Menor
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  {" "}Pura Pasión
                </span>
              </h1>
              <p className="mt-6 text-lg text-neutral-300 sm:text-xl">
                Gestión profesional del torneo infantil-juvenil. Calendario, resultados, tabla de posiciones, goleadores y arquería menos vencida.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/calendario"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 px-8 py-3 font-medium text-white shadow-lg shadow-red-600/25 transition hover:from-red-500 hover:to-orange-500 sm:w-auto"
                >
                  <Calendar className="h-5 w-5" />
                  Calendario & Resultados
                </Link>
                <Link
                  href="/posiciones"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/50 px-8 py-3 font-medium text-white backdrop-blur-sm transition hover:border-red-500/50 hover:bg-neutral-800/50 sm:w-auto"
                >
                  <Trophy className="h-5 w-5" />
                  Tabla de Posiciones
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-4">
            <Link href="/calendario" className="group rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 transition-all hover:border-red-500/50">
              <Calendar className="mb-4 h-8 w-8 text-red-500" />
              <h3 className="font-semibold">Calendario</h3>
              <p className="mt-1 text-sm text-neutral-400">Fechas, horarios y canchas</p>
            </Link>
            <Link href="/posiciones" className="group rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 transition-all hover:border-orange-500/50">
              <Trophy className="mb-4 h-8 w-8 text-orange-500" />
              <h3 className="font-semibold">Tabla de Posiciones</h3>
              <p className="mt-1 text-sm text-neutral-400">Puntos, PJ, PG, PE, PP, GF, GC, DG</p>
            </Link>
            <Link href="/estadisticas" className="group rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 transition-all hover:border-amber-500/50">
              <Goal className="mb-4 h-8 w-8 text-amber-500" />
              <h3 className="font-semibold">Tabla de Goleadores</h3>
              <p className="mt-1 text-sm text-neutral-400">Máximos anotadores por categoría</p>
            </Link>
            <Link href="/estadisticas" className="group rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 transition-all hover:border-yellow-500/50">
              <Target className="mb-4 h-8 w-8 text-yellow-500" />
              <h3 className="font-semibold">Arquería Menos Vencida</h3>
              <p className="mt-1 text-sm text-neutral-400">Mejor valla por categoría</p>
            </Link>
          </div>
        </section>

        {/* Categories */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Categorías Infantiles</h2>
            <p className="mt-4 text-lg text-neutral-400">
              Sub-6, Sub-8, Sub-10, Sub-12, Sub-14, Sub-16 y Sub-18 • Fútbol Campo y Futsal
            </p>
            <p className="mt-2 text-sm text-red-400">Cada categoría dividida en: Formación • Moderado • Competencia</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6">
              <Shield className="mb-4 h-8 w-8 text-red-500" />
              <h3 className="text-xl font-semibold">Sub-6 a Sub-10</h3>
              <p className="mt-2 text-sm text-neutral-400">Formación • Moderado • Competencia</p>
            </div>
            <div className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6">
              <Users className="mb-4 h-8 w-8 text-orange-500" />
              <h3 className="text-xl font-semibold">Sub-12 a Sub-14</h3>
              <p className="mt-2 text-sm text-neutral-400">Formación • Moderado • Competencia</p>
            </div>
            <div className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6">
              <BarChart3 className="mb-4 h-8 w-8 text-amber-500" />
              <h3 className="text-xl font-semibold">Sub-16 a Sub-18</h3>
              <p className="mt-2 text-sm text-neutral-400">Formación • Moderado • Competencia</p>
            </div>
          </div>
        </section>

        {/* Tienda visual */}
        <section id="tienda" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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
              <Image src="/logo.jpeg" alt="Furia Menor" width={40} height={40} className="rounded-lg" />
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
