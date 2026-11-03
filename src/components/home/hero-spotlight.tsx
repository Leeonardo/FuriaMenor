import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Trophy } from "lucide-react";
import { latestNews } from "@/data/news";

export function HeroSpotlight() {
  const featured = latestNews.find((n) => n.featured) || latestNews[0];
  const quick = latestNews.filter((n) => n.id !== featured.id).slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-red-400">Portada</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">Fútbol Menor en Caracas</h1>
        </div>
        <Link href="/noticias" className="flex items-center gap-1 text-sm text-red-400 transition hover:text-red-300">
          Ver todas las noticias
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-12">
        <article className="group relative overflow-hidden rounded-2xl border border-neutral-800 lg:col-span-7">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-neutral-950 to-neutral-950" />
          <div className="relative flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-red-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
                <Trophy className="h-3 w-3" />
                {featured.category}
              </span>
              <h2 className="mt-4 max-w-2xl text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base text-neutral-300 sm:text-lg">{featured.excerpt}</p>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-sm text-neutral-400">
                <span>{featured.author}</span>
                <span>•</span>
                <span>{new Date(featured.publishedAt).toLocaleDateString("es-VE")}</span>
              </div>
              <Link
                href={`/noticias/${featured.slug}`}
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
              >
                Leer cobertura completa
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </article>
        <div className="lg:col-span-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Últimas Noticias</h3>
            <span className="text-xs text-neutral-500">Caracas / Nacional</span>
          </div>
          <div className="flex flex-col gap-3">
            {quick.map((item) => (
              <Link
                key={item.id}
                href={`/noticias/${item.slug}`}
                className="group flex items-start gap-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 transition hover:border-red-500/40 hover:bg-neutral-900"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600/20 text-red-400">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <span className="text-red-400">{item.category}</span>
                    <span>•</span>
                    <span>{new Date(item.publishedAt).toLocaleDateString("es-VE")}</span>
                  </div>
                  <p className="mt-1 font-medium leading-snug group-hover:text-white">{item.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-neutral-400">{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
