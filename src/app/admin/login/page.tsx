"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Contraseña incorrecta");
      }
    } catch {
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <Image src="/logo.png" alt="Furia Menor" width={60} height={60} className="object-contain" />
          </div>
          <h1 className="text-2xl font-bold">Administrador Único</h1>
          <p className="mt-2 text-neutral-400">Acceso exclusivo al Panel de Torneo Daeris</p>
        </div>
        <form onSubmit={handleLogin} className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4">
          <div>
            <label className="block text-sm mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2"
              required
              autoFocus
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-red-600 px-4 py-2 font-semibold hover:bg-red-700 disabled:opacity-50">
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
          <Link href="/" className="block text-center text-sm text-neutral-400 hover:text-white">
            Volver al inicio
          </Link>
        </form>
      </div>
    </div>
  );
}
