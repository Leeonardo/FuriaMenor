import Link from "next/link";
import { ArrowRight, MapPin, Users, Trophy } from "lucide-react";
import { academiesData } from "@/data/academies-data";
import { AcademyBadge } from "@/components/academies/academy-badge";

export function AcademiesPreview() {
  // Mostramos 6 academias destacadas en la home, priorizando a La Paz Futsal
  const laPaz = academiesData.find((a) => a.slug === "la-paz-futsal");
  const others = academiesData.filter((a) => a.slug !== "la-paz-futsal");
  const featured = laPaz ? [laPaz, ...others.slice(0, 5)] : academiesData.slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-red-400 font-bold">Academias & Clubes</p>
          <h2 className="mt-1 text-xl font-bold sm:text-2xl text-white uppercase tracking-tight">
            Vitrina de Escuelas de Fútbol Menor
          </h2>
          <p className="mt-1 text-sm text-neutral-400">
            Clubes federados y semilleros que forman talento en Caracas
          </p>
        </div>
        <Link
          href="/academias"
          className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-red-400 transition hover:text-red-300 rounded-xl border border-red-500/30 bg-red-600/10 px-3.5 py-1.5 hover:bg-red-600/20"
        >
          <span>Ver directorio completo</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((academy) => (
          <Link
            key={academy.id}
            href={`/academias/${academy.slug}`}
            className="group flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 transition duration-300 hover:border-red-500/40 hover:bg-neutral-900 hover:shadow-xl"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
                <AcademyBadge slug={academy.slug} size={50} logoUrl={academy.logoUrl} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="rounded bg-red-600/20 px-1.5 py-0.2 text-[9px] font-bold text-red-400 uppercase">
                    {academy.municipality}
                  </span>
                </div>
                <p className="font-bold text-white group-hover:text-red-400 transition truncate text-sm mt-0.5">
                  {academy.name}
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs text-neutral-400">
                  <Users className="h-3 w-3 text-neutral-500 shrink-0" />
                  <span className="truncate text-[11px]">
                    {academy.categories[0]} a {academy.categories[academy.categories.length - 1]}
                  </span>
                </div>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-neutral-600 transition group-hover:translate-x-1 group-hover:text-red-400 shrink-0 ml-2" />
          </Link>
        ))}
      </div>
    </section>
  );
}
