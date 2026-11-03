import { Building2, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Academias & Clubes | Furia Menor",
  description: "Directorio de escuelas y clubes de fútbol menor en Caracas. Fichas, categorías y contacto.",
};

const academies = [
  { name: "DVO Paraçoto", zone: "Caracas", categories: "Sub-6, Sub-8, Sub-10, Sub-12, Sub-14, Sub-16, Sub-18", description: "Formación integral con énfasis en técnica y disciplina." },
  { name: "Fénix FS", zone: "Caracas", categories: "Sub-8, Sub-10, Sub-12, Sub-14", description: "Club con sólida trayectoria en torneos caraqueños." },
  { name: "Fratelsa Sport", zone: "Caracas", categories: "Sub-6, Sub-8, Sub-10, Sub-12", description: "Semillero con enfoque en desarrollo por etapas." },
  { name: "Futsaconexion", zone: "Caracas", categories: "Sub-8, Sub-10, Sub-12, Sub-14, Sub-16", description: "Promoción del fútbol sala y fútbol campo en todas las categorías." },
  { name: "Union Libertador", zone: "Caracas", categories: "Sub-6, Sub-8, Sub-10, Sub-12, Sub-14, Sub-16, Sub-18", description: "Tradición y compromiso con la formación de jóvenes valores." },
  { name: "Tetsu Futsal", zone: "Caracas", categories: "Sub-10, Sub-12, Sub-14", description: "Especialistas en formación técnica para el futsal." },
  { name: "Black Bulls", zone: "Caracas", categories: "Sub-10, Sub-12, Sub-14, Sub-16", description: "Proyectos formativos con proyección competitiva." },
  { name: "Espartanos Cutira", zone: "Caracas", categories: "Sub-14, Sub-16", description: "Academia en constante crecimiento en el fútbol base." },
];

export default function AcademiasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-red-400">Academias & Clubes</p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Directorio de Escuelas de Fútbol Menor</h1>
        <p className="mt-1 text-neutral-400">Vitrina interactiva de clubes que forman talento en Caracas</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {academies.map((academy) => (
          <div key={academy.name} className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 transition hover:border-red-500/40">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/20 text-red-400">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{academy.name}</h2>
                  <div className="mt-1 flex items-center gap-2 text-sm text-neutral-400">
                    <MapPin className="h-4 w-4" />
                    <span>{academy.zone}</span>
                  </div>
                </div>
              </div>
              <span className="rounded-full border border-neutral-700 px-2 py-1 text-xs text-neutral-400">Caracas</span>
            </div>
            <p className="mt-4 text-sm text-neutral-300">{academy.description}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-neutral-400">
              <Users className="h-4 w-4" />
              <span>Categorías: {academy.categories}</span>
            </div>
            <Link href="#" className="mt-4 inline-flex items-center gap-1 text-sm text-red-400 transition hover:text-red-300">
              Ver ficha completa
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
