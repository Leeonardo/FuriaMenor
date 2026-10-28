import Link from "next/link";
import { Users, Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <main className="flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        <div className="flex items-center gap-3">
          <Trophy className="h-12 w-12 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Furia Menor
          </h1>
        </div>
        <p className="text-lg text-gray-600 sm:text-xl">
          Sistema de Gestión de Equipos de Futsal - SaaS Multi-Tenant
        </p>
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <Link
            href="/dashboard/players"
            className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-md hover:border-blue-300"
          >
            <Users className="h-10 w-10 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Gestión de Plantilla</h2>
            <p className="text-sm text-gray-600">Administrar jugadores por categoría</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
