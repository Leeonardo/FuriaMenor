'use client';

import { getCategories } from '@/actions/players';
import { registerTeam } from '@/actions/tournaments';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RegisterTeamPage() {
  const params = useParams();
  const router = useRouter();
  const tournamentId = params.id as string;
  const [categories, setCategories] = useState<any[]>([]);
  const [academies, setAcademies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // For now, we'll need to fetch from database
    // This is a simplified version
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      await registerTeam({
        tournament_id: tournamentId,
        tournament_category_id: formData.get('category_id') as string,
        academy_id: formData.get('academy_id') as string,
        team_name: formData.get('team_name') as string,
        notes: formData.get('notes') as string,
      });
      router.push(`/dashboard/tournaments/${tournamentId}`);
    } catch (error) {
      alert('Error al inscribir equipo');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Inscribir Equipo</h1>
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-white p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <input name="category_id" required placeholder="ID de categoría" className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Academia/Club</label>
            <input name="academy_id" required placeholder="ID de academia" className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del Equipo</label>
            <input name="team_name" className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Notas</label>
            <textarea name="notes" rows={3} className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Inscribiendo...' : 'Inscribir Equipo'}
          </button>
        </form>
      </div>
    </div>
  );
}
