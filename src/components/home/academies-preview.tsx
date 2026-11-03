import Link from "next/link";
import { ArrowRight, Building2, MapPin, Users } from "lucide-react";

const academies = [
  { name: "DVO Paraçoto", zone: "Caracas", category: "Sub-6 a Sub-18" },
  { name: "Fénix FS", zone: "Caracas", category: "Sub-8 a Sub-14" },
  { name: "Fratelsa Sport", zone: "Caracas", category: "Sub-6 a Sub-12" },
  { name: "Futsaconexion", zone: "Caracas", category: "Sub-8 a Sub-16" },
  { name: "Union Libertador", zone: "Caracas", category: "Sub-6 a Sub-18" },
  { name: "Tetsu Futsal", zone: "Caracas", category: "Sub-10 a Sub-14" },
];

export function AcademiesPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-red-400">Academias & Clubes</p>
          <h2 className="mt-1 text-xl font-bold sm:text-2xl">Vitrina de Escuelas de Fútbol Menor</h2>
          <p className="mt-1 text-sm text-neutral-400">Formando talento en Caracas</p>
        </div>
        <Link href="/academias" className="flex items-center gap-1 text-sm text-red-400 transition hover:text-red-300">
          Ver directorio completo
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {academies.map((academy) => (
          <Link
            key={academy.name}
            href="/academias"
            className="group flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 transition hover:border-red-500/40 hover:bg-neutral-900"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600/20 text-red-400">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium group-hover:text-white">{academy.name}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
                  <MapPin className="h-3 w-3" />
                  <span>{academy.zone}</span>
                  <span>•</span>
                  <Users className="h-3 w-3" />
                  <span>{academy.category}</span>
                </div>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-neutral-600 transition group-hover:translate-x-1 group-hover:text-red-400" />
          </Link>
        ))}
      </div>
    </section>
  );
}
