import Link from "next/link";
import { ArrowRight, Camera, PlayCircle } from "lucide-react";

const items = [
  { title: "Jornada Inaugural - Torneo Daeris", type: "Fotos", count: "48 fotos" },
  { title: "Resúmenes en video - Fecha 1", type: "Video", count: "6 resúmenes" },
  { title: "Familias y emociones - Cobertura", type: "Fotos", count: "32 fotos" },
];

export function MultimediaGallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-red-400">Galería Multimedia</p>
          <h2 className="mt-1 text-xl font-bold sm:text-2xl">Cobertura Fotográfica y Audiovisual</h2>
          <p className="mt-1 text-sm text-neutral-400">Las mejores postales de las jornadas en Caracas</p>
        </div>
        <Link href="/galeria" className="flex items-center gap-1 text-sm text-red-400 transition hover:text-red-300">
          Ver galería completa
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.title}
            href="/galeria"
            className="group relative overflow-hidden rounded-2xl border border-neutral-800"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-neutral-950 to-neutral-950" />
            <div className="relative flex h-48 flex-col justify-between p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-neutral-950/80 px-2 py-1 text-xs text-neutral-300">
                  {item.type === "Video" ? <PlayCircle className="h-3 w-3" /> : <Camera className="h-3 w-3" />}
                  {item.type}
                </span>
                <span className="text-xs text-neutral-400">{item.count}</span>
              </div>
              <div>
                <p className="text-lg font-semibold group-hover:text-white">{item.title}</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-neutral-400">
                  Ver cobertura
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
