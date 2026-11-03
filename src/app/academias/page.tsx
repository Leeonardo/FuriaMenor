import { Metadata } from "next";
import { AcademiesDirectory } from "@/components/academies/academies-directory";
import { Building2, ShieldCheck, MapPin, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Directorio de Academias y Clubes | Furia Menor",
  description:
    "Directorio oficial interactivo de escuelas y clubes formativos de fútbol menor y fútbol sala en Caracas. Filtros por municipio, disciplina, categorías, sedes y planteles.",
};

export default function AcademiasPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Hero Header Deportivo */}
      <section className="relative overflow-hidden border-b border-neutral-800 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-600/10 px-3 py-1 text-xs font-black tracking-widest text-red-400 uppercase">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Registro Oficial de Clubes</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase">
                Directorio de <span className="text-red-500">Academias</span> y Clubes
              </h1>
              <p className="max-w-2xl text-sm sm:text-base text-neutral-400 leading-relaxed">
                Directorio integral del fútbol menor y fútbol sala caraqueño. Explora las escuelas formativas, consulta sus sedes de entrenamiento en los 5 municipios, disciplinas y planteles activos desde Sub-6 hasta Sub-20.
              </p>
            </div>

            {/* Micro badges de estadísticas rápidas */}
            <div className="grid grid-cols-3 gap-3 shrink-0">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-3 text-center">
                <p className="text-xl sm:text-2xl font-black text-white">9</p>
                <p className="text-[10px] font-semibold uppercase text-neutral-400">Clubes Top</p>
              </div>
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-3 text-center">
                <p className="text-xl sm:text-2xl font-black text-red-500">5</p>
                <p className="text-[10px] font-semibold uppercase text-neutral-400">Municipios</p>
              </div>
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-3 text-center">
                <p className="text-xl sm:text-2xl font-black text-amber-400">8+</p>
                <p className="text-[10px] font-semibold uppercase text-neutral-400">Categorías</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido Principal con Filtros y Directorio */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AcademiesDirectory />
      </main>
    </div>
  );
}
