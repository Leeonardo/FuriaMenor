import { MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Entrevistas | Furia Menor",
  description: "Conversaciones con entrenadores, dirigentes, árbitros y protagonistas del fútbol menor en Caracas.",
};

const interviews = [
  { title: "\"Formar personas antes que jugadores\"", person: "Cuerpo Técnico - Fénix FS", category: "Técnico", excerpt: "Filosofía, valores y visión para el fútbol base." },
  { title: "\"El torneo crece porque las familias confían\"", person: "Organización Torneo Daeris", category: "Dirigencial", excerpt: "Balance de la jornada inaugural y proyección." },
  { title: "\"Hay talento por todos lados\"", person: "DT de Academia DVO Paraçoto", category: "Técnico", excerpt: "Formación integral y seguimiento a jugadores." },
  { title: "\"El arbitraje formativo es clave\"", person: "Comisión de Árbitros", category: "Arbitraje", excerpt: "Desarrollo y enseñanza en el fútbol menor." },
];

export default function EntrevistasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-red-400">Entrevistas</p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Voces del Fútbol Base</h1>
        <p className="mt-1 text-neutral-400">Conversaciones con protagonistas del fútbol menor caraqueño</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {interviews.map((item) => (
          <Link
            key={item.title}
            href="#"
            className="group rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 transition hover:border-red-500/40 hover:bg-neutral-900"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs text-red-400">{item.category}</span>
              <MessageSquare className="h-4 w-4 text-neutral-600" />
            </div>
            <h2 className="mt-3 text-lg font-semibold leading-snug group-hover:text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-neutral-300">{item.person}</p>
            <p className="mt-2 text-sm text-neutral-400">{item.excerpt}</p>
            <div className="mt-4 flex items-center gap-1 text-sm text-neutral-400">
              Leer entrevista
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:text-red-400" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
