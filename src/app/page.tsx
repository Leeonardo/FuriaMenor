import { HomeView } from "@/components/home/home-view";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: "Furia Menor",
    url: "https://furiamenor.com",
    description: "Portal Digital de Fútbol Menor en Venezuela. Resultados, calendario, posiciones y estadísticas de futsal.",
    sameAs: ["https://instagram.com/furiamenor", "https://facebook.com/furiamenor"],
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeView />
    </div>
  );
}
