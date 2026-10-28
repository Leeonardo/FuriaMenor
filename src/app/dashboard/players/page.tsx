import { getPlayersByCategory, getCategories } from '@/actions/players';
import PlayersView from './PlayersView';
import { Suspense } from 'react';

async function PlayersData() {
  const academyId = '00000000-0000-0000-0000-000000000001';

  const [categoriesResult, playersResult] = await Promise.all([
    getCategories(academyId),
    getPlayersByCategory(academyId, '00000000-0000-0000-0000-000000000002'),
  ]);

  const categories = categoriesResult.success ? categoriesResult.data || [] : [];
  const initialPlayers = playersResult.success ? playersResult.data || [] : [];

  return (
    <PlayersView
      academyId={academyId}
      categories={categories}
      initialPlayers={initialPlayers}
      initialCategoryId={categories[0]?.id || '00000000-0000-0000-0000-000000000002'}
    />
  );
}

export default function PlayersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Plantilla</h1>
          <p className="mt-1 text-sm text-gray-600">Administra los jugadores por categoría</p>
        </div>
        <Suspense fallback={<div className="flex justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div></div>}>
          <PlayersData />
        </Suspense>
      </div>
    </div>
  );
}
