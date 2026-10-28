import { getMatches } from '@/actions/tournaments';
import Link from 'next/link';
import { Suspense } from 'react';

async function FixtureContent({ id }: { id: string }) {
  const matches = await getMatches(id);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link href={`/dashboard/tournaments/${id}`} className="text-sm text-blue-600 hover:underline">
              ← Volver al torneo
            </Link>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">Fixture y Partidos</h1>
          </div>
          <Link
            href={`/dashboard/tournaments/${id}/fixture/new`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Programar Partido
          </Link>
        </div>

        <div className="rounded-lg border bg-white">
          <div className="divide-y">
            {matches.map((match: any) => (
              <div key={match.id} className="flex items-center justify-between p-4">
                <div className="flex flex-1 items-center gap-4">
                  <div className="text-right flex-1">
                    <p className="font-medium">{match.home_team?.team_name || 'Local'}</p>
                  </div>
                  <div className="px-4 text-center">
                    {match.status === 'finalizado' ? (
                      <p className="text-lg font-bold">
                        {match.home_score} - {match.away_score}
                      </p>
                    ) : (
                      <p className="text-gray-500">vs</p>
                    )}
                    <p className="text-xs text-gray-500">{match.status}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{match.away_team?.team_name || 'Visitante'}</p>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  {match.match_date && <p>{match.match_date}</p>}
                  {match.match_time && <p>{match.match_time}</p>}
                  {match.venue && <p>{match.venue}</p>}
                </div>
              </div>
            ))}
            {matches.length === 0 && (
              <div className="p-4 text-center text-gray-500">No hay partidos programados</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function FixturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 p-6">Cargando...</div>}>
      <FixtureContent id={id} />
    </Suspense>
  );
}
