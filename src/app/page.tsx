import { HeroSpotlight } from "@/components/home/hero-spotlight";
import { TorneosLive } from "@/components/home/torneos-live";
import { AcademiesPreview } from "@/components/home/academies-preview";
import { MultimediaGallery } from "@/components/home/multimedia-gallery";
import { latestNews } from "@/data/news";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

export default function Home() {
  const moreNews = latestNews.slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "Furia Menor",
    url: "https://furiamenor.com",
    description: "Portal Digital de Fútbol Menor en Venezuela. Cobertura periodística de futsal y fútbol base.",
    sameAs: ["https://instagram.com/furiamenor", "https://facebook.com/furiamenor"],
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Noticia principal + últimas */}
      <HeroSpotlight />

      {/* Marcadores y fixture — cobertura Torneo Daeris */}
      <TorneosLive />

      {/* Directorio academias */}
      <AcademiesPreview />

      {/* Galería multimedia */}
      <MultimediaGallery />

      {/* Más noticias */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-red-400">Actualidad</p>
            <h2 className="mt-1 text-xl font-bold sm:text-2xl">Más Noticias</h2>
            <p className="mt-1 text-sm text-neutral-400">Cobertura diaria del fútbol menor caraqueño</p>
          </div>
          <Link href="/noticias" className="flex items-center gap-1 text-sm text-red-400 transition hover:text-red-300">
            Archivo completo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {moreNews.map((item) => (
            <Link
              key={item.id}
              href={`/noticias/${item.slug}`}
              className="group rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 transition hover:border-red-500/40 hover:bg-neutral-900"
            >
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-red-400">{item.category}</span>
                <span>{new Date(item.publishedAt).toLocaleDateString("es-VE")}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-snug group-hover:text-white">{item.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-neutral-400">{item.excerpt}</p>
              <div className="mt-4 flex items-center gap-1 text-sm text-neutral-400">
                <FileText className="h-4 w-4" />
                <span>Leer nota</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:text-red-400" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Banner expansión */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-r from-red-950/40 via-neutral-900 to-neutral-950 p-8 text-center sm:p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-red-400">Piloto Futsal · Expansión Nacional</p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Arrancamos con futsal. Crecemos con Venezuela.</h2>
          <p className="mt-3 mx-auto max-w-2xl text-neutral-300">
            Furia Menor nace como portal periodístico del fútbol menor venezolano.
            Comenzamos cubriendo el futsal en Caracas y pronto llevaremos la cobertura
            a academias, ligas y regiones de todo el país.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <Link href="/noticias" className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500">
              Ver Coberturas
            </Link>
            <Link href="#" className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 transition hover:border-neutral-600 hover:text-white">
              Solicitar Cobertura
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
