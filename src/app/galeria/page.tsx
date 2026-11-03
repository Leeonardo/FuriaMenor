import { Camera, PlayCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Galería Multimedia | Furia Menor",
  description: "Cobertura fotográfica y resúmenes en video de las jornadas de fútbol menor en Caracas.",
};

const gallery = [
  { title: "Jornada Inaugural - Torneo Daeris", type: "Fotos", count: "48 fotos", date: "2026-10-24" },
  { title: "Fecha 1 - Mejores momentos", type: "Video", count: "6 resúmenes", date: "2026-10-25" },
  { title: "Emociones en cancha", type: "Fotos", count: "64 fotos", date: "2026-10-26" },
  { title: "Sub-12 en acción", type: "Fotos", count: "36 fotos", date: "2026-10-27" },
  { title: "Resúmenes destacados", type: "Video", count: "4 resúmenes", date: "2026-10-28" },
  { title: "Familias que apoyan", type: "Fotos", count: "28 fotos", date: "2026-10-29" },
];

export default function GaleriaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-red-400">Galería Multimedia</p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Cobertura Fotográfica y Audiovisual</h1>
        <p className="mt-1 text-neutral-400">Las mejores postales de las jornadas del fútbol menor caraqueño</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item) => (
          <Link
            key={item.title}
            href="#"
            className="group relative overflow-hidden rounded-2xl border border-neutral-800"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-neutral-950 to-neutral-950" />
            <div className="relative flex h-56 flex-col justify-between p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-neutral-950/80 px-2 py-1 text-xs text-neutral-300">
                  {item.type === "Video" ? <PlayCircle className="h-3 w-3" /> : <Camera className="h-3 w-3" />}
                  {item.type}
                </span>
                <span className="text-xs text-neutral-400">{new Date(item.date).toLocaleDateString("es-VE")}</span>
              </div>
              <div>
                <p className="text-lg font-semibold group-hover:text-white">{item.title}</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm text-neutral-400">{item.count}</span>
                  <span className="flex items-center gap-1 text-sm text-neutral-400">
                    Ver {item.type.toLowerCase()}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:text-red-400" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
