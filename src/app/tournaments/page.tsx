import { getTournaments } from '@/actions/tournaments';
import Link from 'next/link';

export default async function PublicTournamentsPage() {
  const tournaments = await getTournaments();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Torneos</h1>
          <p className="text-gray-600">Consulta de torneos, resultados y tablas</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tournaments.map((tournament: any) => (
            <Link
              key={tournament.id}
              href={`/tournaments/${tournament.id}`}
              className="rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-gray-900">{tournament.name}</h2>
              <p className="text-sm text-gray-600">{tournament.season || 'Sin temporada'}</p>
              <p className="mt-1 text-sm text-gray-500">{tournament.location}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
