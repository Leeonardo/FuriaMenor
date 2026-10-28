'use client';

import { createTournament } from '@/actions/tournaments';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewTournamentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const tournament = await createTournament({
        name: formData.get('name') as string,
        slug: (formData.get('name') as string).toLowerCase().replace(/\s+/g, '-'),
        season: formData.get('season') as string,
        start_date: formData.get('start_date') as string,
        end_date: formData.get('end_date') as string,
        location: formData.get('location') as string,
        description: formData.get('description') as string,
        status: 'draft',
      });
      router.push(`/dashboard/tournaments/${tournament.id}`);
    } catch (error) {
      alert('Error al crear torneo');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Nuevo Torneo</h1>
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-white p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del Torneo</label>
            <input name="name" required className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Temporada</label>
              <input name="season" placeholder="2026" className="mt-1 w-full rounded-lg border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sede/Ubicación</label>
              <input name="location" className="mt-1 w-full rounded-lg border px-3 py-2" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
              <input type="date" name="start_date" className="mt-1 w-full rounded-lg border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha Fin</label>
              <input type="date" name="end_date" className="mt-1 w-full rounded-lg border px-3 py-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea name="description" rows={3} className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creando...' : 'Crear Torneo'}
          </button>
        </form>
      </div>
    </div>
  );
}
