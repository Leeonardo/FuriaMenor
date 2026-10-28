import { getTournament, getTournamentCategories } from '@/actions/tournaments';
import Link from 'next/link';
import { Suspense } from 'react';

async function PublicTournamentContent({ id }: { id: string }) {
  const [tournament, categories] = await Promise.all([getTournament(id), getTournamentCategories(id)]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <Link href="/tournaments" className="text-sm text-blue-600 hover:underline">
            ← Volver a torneos
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">{tournament.name}</h1>
          <p className="text-gray-600">{tournament.season} • {tournament.location}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category: any) => (
            <Link
              key={category.id}
              href={`/tournaments/${id}/categories/${category.id}`}
              className="rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-gray-900">{category.name}</h2>
              <p className="text-sm text-gray-600">{category.age_group}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function PublicTournamentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 p-6">Cargando...</div>}>
      <PublicTournamentContent id={id} />
    </Suspense>
  );
}
