'use client';

import { useState, useTransition } from 'react';
import { User, Edit, Eye, Phone, Users } from 'lucide-react';
import { PlayerWithGuardians } from '@/types/database';
import { getPlayersByCategory } from '@/actions/players';
import { cn } from '@/lib/utils';

interface CategoryOption {
  id: string;
  name: string;
  min_birth_year: number;
  max_birth_year: number;
}

interface PlayersViewProps {
  academyId: string;
  categories: CategoryOption[];
  initialPlayers: PlayerWithGuardians[];
  initialCategoryId: string;
}

const statusConfig = {
  activo: { label: 'Activo', className: 'bg-green-100 text-green-800' },
  inactivo: { label: 'Inactivo', className: 'bg-gray-100 text-gray-800' },
  lesionado: { label: 'Lesionado', className: 'bg-yellow-100 text-yellow-800' },
  suspendido: { label: 'Suspendido', className: 'bg-red-100 text-red-800' },
};

const positionColors = {
  'Píot': 'bg-purple-100 text-purple-800',
  'Ala': 'bg-blue-100 text-blue-800',
  'Cierre': 'bg-orange-100 text-orange-800',
  'Guardameta': 'bg-emerald-100 text-emerald-800',
};

export default function PlayersView({
  academyId,
  categories,
  initialPlayers,
  initialCategoryId,
}: PlayersViewProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId);
  const [players, setPlayers] = useState<PlayerWithGuardians[]>(initialPlayers);
  const [isPending, startTransition] = useTransition();

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    startTransition(async () => {
      const result = await getPlayersByCategory(academyId, categoryId);
      if (result.success) {
        setPlayers(result.data || []);
      }
    });
  };

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Categorías</h2>
        </div>
        <div className="flex flex-wrap gap-2 p-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              disabled={isPending}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition',
                selectedCategoryId === category.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                isPending && 'cursor-not-allowed opacity-60'
              )}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-90">
                ({category.min_birth_year} - {category.max_birth_year})
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Plantilla - {selectedCategory?.name}</h2>
              <p className="mt-1 text-sm text-gray-600">{players.length} jugador(es) registrado(s)</p>
            </div>
          </div>
        </div>

        {isPending ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : players.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No hay jugadores registrados</h3>
            <p className="mt-1 text-sm text-gray-600">Comienza registrando jugadores en esta categoría</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Jugador
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Dorsal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Posición
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Representantes
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {players.map((player) => {
                  const status = statusConfig[player.status];
                  const primaryGuardian = player.guardians?.find((g) => g.is_primary_contact) || player.guardians?.[0];

                  return (
                    <tr key={player.id} className="transition hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
                            {player.photo_url ? (
                              <img src={player.photo_url} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <User className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {player.first_name} {player.last_name}
                            </div>
                            {player.birth_date && (
                              <div className="text-sm text-gray-500">
                                {new Date(player.birth_date).toLocaleDateString('es-ES')}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {player.jersey_number ? (
                          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-900 text-sm font-bold text-white">
                            {player.jersey_number}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {player.position ? (
                          <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', positionColors[player.position])}>
                            {player.position}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">Sin asignar</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', status.className)}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {primaryGuardian ? (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="h-4 w-4" />
                            <span>{primaryGuardian.first_name} {primaryGuardian.last_name}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">Sin representante</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
