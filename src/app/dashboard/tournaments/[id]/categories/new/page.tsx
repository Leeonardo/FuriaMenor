'use client';

import { createTournamentCategory } from '@/actions/tournaments';
import { useParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';

const AGE_GROUPS = ['Sub-6', 'Sub-8', 'Sub-10', 'Sub-12', 'Sub-14', 'Sub-16', 'Sub-18'];

function NewCategoryForm() {
  const params = useParams();
  const router = useRouter();
  const tournamentId = params.id as string;
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const maxTeams = formData.get('max_teams');
      await createTournamentCategory({
        tournament_id: tournamentId,
        age_group: formData.get('age_group') as any,
        name: formData.get('name') as string,
        max_teams: maxTeams && maxTeams !== '' ? Number(maxTeams) : undefined,
        registration_open: true,
      });
      router.push(`/dashboard/tournaments/${tournamentId}`);
    } catch (error) {
      alert('Error al crear categoría');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Agregar Categoría</h1>
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-white p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría de Edad</label>
            <select name="age_group" required className="mt-1 w-full rounded-lg border px-3 py-2">
              {AGE_GROUPS.map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input name="name" required placeholder="Ej: Sub-12 Masculino" className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Máximo de Equipos</label>
            <input type="number" name="max_teams" className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function NewCategoryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 p-6">Cargando...</div>}>
      <NewCategoryForm />
    </Suspense>
  );
}
