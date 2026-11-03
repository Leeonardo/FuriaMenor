import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAcademyBySlug, academiesData } from "@/data/academies-data";
import { AcademyProfileView } from "@/components/academies/academy-profile-view";

interface AcademyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return academiesData.map((academy) => ({
    id: academy.slug,
  }));
}

export async function generateMetadata({
  params,
}: AcademyPageProps): Promise<Metadata> {
  const { id } = await params;
  const academy = getAcademyBySlug(id);

  if (!academy) {
    return {
      title: "Academia No Encontrada | Furia Menor",
      description: "La ficha técnica del club solicitada no existe o fue reubicada.",
    };
  }

  return {
    title: `${academy.name} | Ficha Técnica Oficial | Furia Menor`,
    description: `Ficha técnica de ${academy.officialName} en Caracas (${academy.municipality}). Sedes de entrenamiento, cuerpo técnico, planteles desde ${academy.categories[0]} hasta ${academy.categories[academy.categories.length - 1]} y palmarés.`,
  };
}

export default async function AcademyDetailPage({ params }: AcademyPageProps) {
  const { id } = await params;
  const academy = getAcademyBySlug(id);

  if (!academy) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AcademyProfileView academy={academy} />
      </main>
    </div>
  );
}
