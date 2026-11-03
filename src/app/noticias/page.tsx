import Link from "next/link";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import { latestNews } from "@/data/news";

export const metadata = {
  title: "Noticias | Furia Menor - Fútbol Base Caracas",
  description: "Cobertura noticiosa del fútbol menor en Caracas: torneos, academias, entrevistas, galería y jugador de la semana.",
};

export default function NoticiasPage() {
  const featured = latestNews.find((n) => n.featured) || latestNews[0];
  const others = latestNews.filter((n) => n.id !== featured.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-red-400">Noticias</p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Archivo Noticioso</h1>
        <p className="mt-1 text-neutral-400">Cobertura integral del fútbol menor caraqueño</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-12">
        <article className="lg:col-span-7 rounded-2xl border border-neutral-800 bg-gradient-to-br from-red-950/30 via-neutral-900 to-neutral-950 p-6 sm:p-8">
          <span className="inline-flex rounded-full bg-red-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
            {featured.category}
          </span>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{featured.title}</h2>
          <p className="mt-3 max-w-2xl text-neutral-300">{featured.excerpt}</p>
          <div className="mt-4 flex items-center gap-3 text-sm text-neutral-400">
            <span>{featured.author}</span>
            <span>•</span>
            <span>{new Date(featured.publishedAt).toLocaleDateString("es-VE")}</span>
          </div>
          <Link
            href={`/noticias/${featured.slug}`}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
          >
            Leer nota completa
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
        <div className="lg:col-span-5 flex flex-col gap-3">
          {others.map((item) => (
            <Link
              key={item.id}
              href={`/noticias/${item.slug}`}
              className="group flex items-start gap-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 transition hover:border-red-500/40 hover:bg-neutral-900"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600/20 text-red-400">
                <FileText className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <span className="text-red-400">{item.category}</span>
                  <span>•</span>
                  <span>{new Date(item.publishedAt).toLocaleDateString("es-VE")}</span>
                </div>
                <p className="mt-1 font-medium group-hover:text-white">{item.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-neutral-400">{item.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
