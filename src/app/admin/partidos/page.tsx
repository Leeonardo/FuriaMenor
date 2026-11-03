"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPartidosRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin");
  }, [router]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6">
      <div className="text-center space-y-2">
        <div className="h-6 w-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-neutral-400">Redirigiendo al editor integral de partidos...</p>
      </div>
    </div>
  );
}
