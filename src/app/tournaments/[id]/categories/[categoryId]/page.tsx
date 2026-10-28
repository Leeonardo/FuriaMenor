import { getMatches, getStandings, getTopScorers } from '@/actions/tournaments';

export default async function CategoryViewPage({
  params,
}: {
  params: Promise<{ id: string; categoryId: string }>;
}) {
  const { id, categoryId } = await params;
  const [matches, standings, topScorers] = await Promise.all([
    getMatches(id, categoryId),
    getStandings(id, categoryId),
    getTopScorers(id, categoryId),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categoría</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border bg-white">
            <div className="border-b p-4">
              <h2 className="font-semibold">Tabla de Posiciones</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 text-left">#</th>
                    <th className="p-2 text-left">Equipo</th>
                    <th className="p-2 text-center">PJ</th>
                    <th className="p-2 text-center">PG</th>
                    <th className="p-2 text-center">PE</th>
                    <th className="p-2 text-center">PP</th>
                    <th className="p-2 text-center">GF</th>
                    <th className="p-2 text-center">GC</th>
                    <th className="p-2 text-center">DG</th>
                    <th className="p-2 text-center">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((row: any, idx: number) => (
                    <tr key={row.tournament_team_id} className="border-t">
                      <td className="p-2">{idx + 1}</td>
                      <td className="p-2 font-medium">{row.team_name}</td>
                      <td className="p-2 text-center">{row.played}</td>
                      <td className="p-2 text-center">{row.won}</td>
                      <td className="p-2 text-center">{row.drawn}</td>
                      <td className="p-2 text-center">{row.lost}</td>
                      <td className="p-2 text-center">{row.goals_for}</td>
                      <td className="p-2 text-center">{row.goals_against}</td>
                      <td className="p-2 text-center">{row.goal_difference}</td>
                      <td className="p-2 text-center font-bold">{row.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg border bg-white">
            <div className="border-b p-4">
              <h2 className="font-semibold">Goleadores</h2>
            </div>
            <div className="divide-y">
              {topScorers.map((scorer: any, idx: number) => (
                <div key={scorer.player_id} className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500">{idx + 1}</span>
                    <div>
                      <p className="font-medium">
                        {scorer.first_name} {scorer.last_name}
                      </p>
                      <p className="text-sm text-gray-600">{scorer.team_name}</p>
                    </div>
                  </div>
                  <span className="font-bold">{scorer.goals}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white">
          <div className="border-b p-4">
            <h2 className="font-semibold">Partidos</h2>
          </div>
          <div className="divide-y">
            {matches.map((match: any) => (
              <div key={match.id} className="flex items-center justify-between p-4">
                <div className="flex flex-1 items-center gap-4">
                  <div className="flex-1 text-right">
                    <p className="font-medium">{match.home_team?.team_name}</p>
                  </div>
                  <div className="px-4 text-center">
                    {match.status === 'finalizado' ? (
                      <p className="text-lg font-bold">
                        {match.home_score} - {match.away_score}
                      </p>
                    ) : (
                      <p className="text-gray-500">vs</p>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{match.away_team?.team_name}</p>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  {match.match_date} {match.match_time}
                </div>
              </div>
            ))}
          </div>
</div>
      </div>
    </div>
  );
}
