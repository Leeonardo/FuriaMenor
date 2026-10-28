import { getTournaments } from '@/actions/tournaments';
import Link from 'next/link';

export default async function TournamentsPage() {
  const tournaments = await getTournaments();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Torneos</h1>
            <p className="text-gray-600">Gestión de torneos de fútbol menor</p>
          </div>
          <Link
            href="/dashboard/tournaments/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Nuevo Torneo
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tournaments.map((tournament: any) => (
            <Link
              key={tournament.id}
              href={`/dashboard/tournaments/${tournament.id}`}
              className="rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-gray-900">{tournament.name}</h2>
              <p className="text-sm text-gray-600">{tournament.season || 'Sin temporada'}</p>
              <span className="mt-2 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                {tournament.status}
              </span>
            </Link>
          ))}
        </div>

        {tournaments.length === 0 && (
          <div className="rounded-lg border bg-white p-8 text-center text-gray-500">
            No hay torneos creados aún.
          </div>
        )}
      </div>
    </div>
  );
}
