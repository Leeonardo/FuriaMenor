import Link from "next/link";
import {
  BarChart3,
  Calendar,
  Flame,
  LayoutDashboard,
  ShoppingBag,
  Shield,
  Trophy,
  Users,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600">
              <Flame className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">Furia Menor</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/tournaments" className="text-sm text-slate-300 transition hover:text-white">
              Torneos
            </Link>
            <Link href="#equipos" className="text-sm text-slate-300 transition hover:text-white">
              Equipos
            </Link>
            <Link href="/tournaments" className="text-sm text-slate-300 transition hover:text-white">
              Fixture
            </Link>
            <Link href="#posiciones" className="text-sm text-slate-300 transition hover:text-white">
              Tabla de Posiciones
            </Link>
            <Link href="#tienda" className="text-sm text-slate-300 transition hover:text-white">
              Tienda Online
            </Link>
          </div>
          <Link
            href="/dashboard/tournaments"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-emerald-500/20 transition hover:from-emerald-400 hover:to-emerald-500"
          >
            <LayoutDashboard className="h-4 w-4" />
            Acceso Delegados / Admin
          </Link>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
                <Trophy className="h-4 w-4" />
                Fútbol Menor • Fútbol Campo y Futsal
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                La Pasión del Fútbol Menor
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {" "}en un Solo Lugar
                </span>
              </h1>
              <p className="mt-6 text-lg text-slate-300 sm:text-xl">
                Gestión profesional de torneos, control de equipos y equipamiento deportivo desde Sub-6 hasta Sub-18 (Fútbol Campo y Futsal).
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/tournaments"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-3 font-medium text-white shadow-lg shadow-emerald-500/25 transition hover:from-emerald-400 hover:to-emerald-500 sm:w-auto"
                >
                  <Trophy className="h-5 w-5" />
                  Ver Torneos Activos
                </Link>
                <Link
                  href="/dashboard/tournaments"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 px-8 py-3 font-medium text-white backdrop-blur-sm transition hover:border-emerald-500/50 hover:bg-slate-800/50 sm:w-auto"
                >
                  <Users className="h-5 w-5" />
                  Inscribir mi Equipo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats / Quick Access */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/tournaments"
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md shadow-xl transition-all hover:border-emerald-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                  <Trophy className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold">Torneos en Curso</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Categorías activas y partidos programados para la semana
                </p>
                <p className="mt-4 text-sm font-medium text-emerald-400">Ver torneos →</p>
              </div>
            </Link>

            <Link
              href="/tournaments"
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md shadow-xl transition-all hover:border-emerald-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
                  <Calendar className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold">Próxima Jornada</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Resumen rápido del partido más cercano o estelar de la fecha
                </p>
                <p className="mt-4 text-sm font-medium text-cyan-400">Ver fixture →</p>
              </div>
            </Link>

            <Link
              href="#tienda"
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md shadow-xl transition-all hover:border-emerald-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                  <ShoppingBag className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold">Tienda Furia Menor</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Catálogo de uniformes e indumentaria deportiva
                </p>
                <p className="mt-4 text-sm font-medium text-blue-400">Próximamente →</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Categories */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Categorías Activas</h2>
            <p className="mt-4 text-lg text-slate-400">
              Cubrimos todas las etapas formativas y competitivas
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 transition-all hover:border-emerald-500/50">
              <div className="mb-4 flex items-center justify-between">
                <Shield className="h-8 w-8 text-emerald-400" />
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">Formativo</span>
              </div>
              <h3 className="text-xl font-semibold">Sub-6 a Sub-10</h3>
              <p className="mt-2 text-sm text-slate-400">Fútbol Base / Iniciación y Formación</p>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 transition-all hover:border-cyan-500/50">
              <div className="mb-4 flex items-center justify-between">
                <Users className="h-8 w-8 text-cyan-400" />
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400">Desarrollo</span>
              </div>
              <h3 className="text-xl font-semibold">Sub-12 a Sub-14</h3>
              <p className="mt-2 text-sm text-slate-400">Desarrollo Táctico y Técnico</p>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 transition-all hover:border-blue-500/50">
              <div className="mb-4 flex items-center justify-between">
                <BarChart3 className="h-8 w-8 text-blue-400" />
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">Competitivo</span>
              </div>
              <h3 className="text-xl font-semibold">Sub-16 a Sub-18</h3>
              <p className="mt-2 text-sm text-slate-400">Competitivo / Juvenil</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600">
                  <Flame className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">Furia Menor</span>
              </div>
              <p className="mt-4 max-w-md text-sm text-slate-400">
                Plataforma integral de gestión digital y comercio para el fútbol menor. Organización, gestión de fixture, resultados, estadísticas y más.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Plataforma</h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/tournaments" className="transition hover:text-white">
                    Torneos
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/tournaments" className="transition hover:text-white">
                    Panel Admin
                  </Link>
                </li>
                <li>
                  <Link href="#tienda" className="transition hover:text-white">
                    Tienda
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Institucional</h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li>Aviso Legal</li>
                <li>Política de Privacidad</li>
                <li>Términos y Condiciones</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Furia Menor. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
