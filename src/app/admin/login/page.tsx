"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setStoredUserRole } from "@/lib/db-store";
import { UserRole } from "@/types/auth-roles";
import { ShieldAlert, Users, Smartphone, ArrowRight, Lock } from "lucide-react";

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
        setStoredUserRole("admin_general");
        router.push("/admin");
        router.refresh();
      } else {
        setError("Contraseña incorrecta (Usa: 123456 o los accesos por rol)");
      }
    } catch {
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleQuickLogin = async (role: UserRole) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (res.ok) {
        setStoredUserRole(role);
        router.push("/admin");
        router.refresh();
      } else {
        setError("Error al autenticar rol");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Image src="/logo.png" alt="Furia Menor" width={64} height={64} className="object-contain drop-shadow-xl" />
          </div>
          <span className="inline-block rounded-full bg-red-600/10 border border-red-500/20 px-3 py-0.5 text-xs font-black text-red-400 uppercase tracking-widest">
            Furia Menor • Caracas
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Sistema Autogestionable
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Ingreso por roles para Delegados, Árbitros y Administradores
          </p>
        </div>

        {/* 1. SELECCIÓN DIRECTA DE ROL (ACCESO RÁPIDO) */}
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/80 p-5 space-y-3 shadow-xl backdrop-blur-md">
          <p className="text-[10px] font-black uppercase tracking-wider text-neutral-400 text-center">
            Selecciona tu perfil de acceso:
          </p>

          <div className="grid gap-2.5">
            {/* Rol 1: Admin General */}
            <button
              onClick={() => handleRoleQuickLogin("admin_general")}
              disabled={loading}
              className="group flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-950 p-3.5 text-left transition hover:border-red-500/50 hover:bg-neutral-900"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center border border-red-500/30">
                  <ShieldAlert className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-black text-xs text-white group-hover:text-red-400 transition">
                    👑 Administrador General
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    "Nivel Dios" • Control global de torneos y tablas
                  </p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-red-400 transition group-hover:translate-x-0.5" />
            </button>

            {/* Rol 2: Delegado */}
            <button
              onClick={() => handleRoleQuickLogin("delegado")}
              disabled={loading}
              className="group flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-950 p-3.5 text-left transition hover:border-red-500/50 hover:bg-neutral-900"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-black text-xs text-white group-hover:text-blue-400 transition">
                    📋 Delegado de Club
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    La Paz Futsal (Eudis Toro) • Fichajes y rosters
                  </p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-blue-400 transition group-hover:translate-x-0.5" />
            </button>

            {/* Rol 3: Árbitro */}
            <button
              onClick={() => handleRoleQuickLogin("arbitro")}
              disabled={loading}
              className="group flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-950 p-3.5 text-left transition hover:border-red-500/50 hover:bg-neutral-900"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Smartphone className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-black text-xs text-white group-hover:text-amber-400 transition">
                    📱 Árbitro en Cancha
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    Mobile-First • Marcadores y subida de planillas
                  </p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-amber-400 transition group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* 2. FORMULARIO CON CONTRASEÑA MANUAL */}
        <form onSubmit={handleLogin} className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-300">
            <Lock className="h-3.5 w-3.5 text-red-500" />
            <span>O ingresa con contraseña maestra:</span>
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña (por defecto: 123456)"
              className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-red-500 focus:outline-none"
              autoFocus
            />
          </div>

          {error && <p className="text-xs text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-red-500 disabled:opacity-50 transition shadow-lg shadow-red-600/30"
          >
            {loading ? "Ingresando..." : "Acceder al Panel"}
          </button>

          <Link href="/" className="block text-center text-xs text-neutral-400 hover:text-white transition pt-2">
            ← Volver al portal web
          </Link>
        </form>
      </div>
    </div>
  );
}
