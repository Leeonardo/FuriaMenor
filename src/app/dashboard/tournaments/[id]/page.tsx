import { getTournament, getTournamentCategories, getTournamentTeams } from '@/actions/tournaments';
import Link from 'next/link';

async function TournamentDetailContent({ id }: { id: string }) {
  const [tournament, categories, teams] = await Promise.all([
    getTournament(id),
    getTournamentCategories(id),
    getTournamentTeams(id),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <Link href="/dashboard/tournaments" className="text-sm text-blue-600 hover:underline">
            ← Volver a torneos
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">{tournament.name}</h1>
          <p className="text-gray-600">{tournament.season} • {tournament.location}</p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-4">
            <p className="text-sm text-gray-600">Categorías</p>
            <p className="text-2xl font-bold">{categories.length}</p>
          </div>
          <div className="rounded-lg border bg-white p-4">
            <p className="text-sm text-gray-600">Equipos Inscritos</p>
            <p className="text-2xl font-bold">{teams.length}</p>
          </div>
          <div className="rounded-lg border bg-white p-4">
            <p className="text-sm text-gray-600">Estado</p>
            <p className="text-lg font-semibold">{tournament.status}</p>
          </div>
        </div>

        <div className="mb-6 flex gap-3">
          <Link
            href={`/dashboard/tournaments/${id}/categories/new`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Agregar Categoría
          </Link>
          <Link
            href={`/dashboard/tournaments/${id}/teams/register`}
            className="rounded-lg border bg-white px-4 py-2 hover:bg-gray-50"
          >
            Inscribir Equipo
          </Link>
          <Link
            href={`/dashboard/tournaments/${id}/fixture`}
            className="rounded-lg border bg-white px-4 py-2 hover:bg-gray-50"
          >
            Fixture / Partidos
          </Link>
        </div>

        <div className="rounded-lg border bg-white">
          <div className="border-b p-4">
            <h2 className="font-semibold">Categorías</h2>
          </div>
          <div className="divide-y">
            {categories.map((category: any) => (
              <Link
                key={category.id}
                href={`/dashboard/tournaments/${id}/categories/${category.id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium">{category.name}</p>
                  <p className="text-sm text-gray-600">{category.age_group}</p>
                </div>
                <span className="text-sm text-gray-500">→</span>
              </Link>
            ))}
            {categories.length === 0 && (
              <div className="p-4 text-center text-gray-500">No hay categorías configuradas</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function TournamentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TournamentDetailContent id={id} />;
}
