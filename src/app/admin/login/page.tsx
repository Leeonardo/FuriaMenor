"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setStoredUserRole } from "@/lib/db-store";
import { UserRole } from "@/types/auth-roles";
import {
  ShieldAlert,
  Users,
  Smartphone,
  ArrowRight,
  Lock,
  User,
  KeyRound,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const router = useRouter();

  const testAccounts = [
    {
      role: "admin_general" as UserRole,
      title: "Administrador General",
      badge: "Nivel Dios",
      name: "Carlos Quintana",
      user: "admin",
      email: "admin@furiamenor.com",
      clave: "123456",
      desc: "Supervisión total, creación de torneos y corrección de actas.",
      icon: ShieldAlert,
      color: "border-red-500/40 text-red-400 bg-red-600/10",
      btnColor: "bg-red-600 hover:bg-red-500",
    },
    {
      role: "delegado" as UserRole,
      title: "Delegado de Club",
      badge: "La Paz Futsal",
      name: "Eudis Toro",
      user: "delegado",
      email: "eudis.toro@lapazfutsal.com",
      clave: "123456",
      desc: "Fichaje de atletas, validación de edades y armado de planteles.",
      icon: Users,
      color: "border-blue-500/40 text-blue-400 bg-blue-600/10",
      btnColor: "bg-blue-600 hover:bg-blue-500",
    },
    {
      role: "arbitro" as UserRole,
      title: "Árbitro en Cancha",
      badge: "Mobile-First",
      name: "Prof. José Colina",
      user: "arbitro",
      email: "arbitro@furiamenor.com",
      clave: "123456",
      desc: "Marcador táctil en vivo y subida de foto de planilla firmada.",
      icon: Smartphone,
      color: "border-amber-500/40 text-amber-400 bg-amber-500/10",
      btnColor: "bg-amber-600 hover:bg-amber-500",
    },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStoredUserRole(data.role || "admin_general");
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Usuario o contraseña incorrecta.");
      }
    } catch {
      setError("Error de conexión al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectQuickAccount = (account: typeof testAccounts[0]) => {
    setUsername(account.user);
    setPassword(account.clave);
  };

  const handleDirectRoleLogin = async (account: typeof testAccounts[0]) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: account.user, password: account.clave, role: account.role }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStoredUserRole(account.role);
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Error al autenticar cuenta.");
      }
    } catch {
      setError("Error de conexión al servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyUser = (userStr: string, idx: number) => {
    navigator.clipboard.writeText(userStr);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl space-y-8">
        {/* Cabecera */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Furia Menor"
              width={70}
              height={70}
              className="object-contain drop-shadow-2xl"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-600/10 px-3 py-0.5 text-xs font-black text-red-400 uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Furia Menor • Sistema Autogestionable</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Acceso al Panel de Control
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
            Ingresa con cualquiera de los 3 perfiles oficiales para gestionar el fútbol menor y futsal en Caracas.
          </p>
        </div>

        {/* 1. TARJETAS DE LOS 3 USUARIOS DE PRUEBA */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
            <span className="font-bold uppercase tracking-wider text-[11px] text-neutral-300">
              Perfiles Oficiales de Prueba (Clave universal: <strong className="text-white font-mono">123456</strong>)
            </span>
            <span className="text-[10px] text-amber-400">Clic para autocompletar o ingresar</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {testAccounts.map((acc, idx) => {
              const Icon = acc.icon;
              const isSelected = username === acc.user;

              return (
                <div
                  key={acc.role}
                  className={`group relative rounded-3xl border p-4.5 transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? "border-red-500 bg-neutral-900 ring-2 ring-red-500/30 shadow-xl"
                      : "border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 hover:bg-neutral-900"
                  }`}
                >
                  <div className="space-y-2.5">
                    {/* Badge e Ícono */}
                    <div className="flex items-center justify-between">
                      <div className={`h-8 w-8 rounded-xl flex items-center justify-center border ${acc.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="rounded-full bg-neutral-950 border border-neutral-800 px-2.5 py-0.5 text-[9px] font-black uppercase text-neutral-300">
                        {acc.badge}
                      </span>
                    </div>

                    {/* Título y Titular */}
                    <div>
                      <h3 className="font-black text-sm text-white group-hover:text-red-400 transition">
                        {acc.title}
                      </h3>
                      <p className="text-xs font-semibold text-neutral-300">
                        {acc.name}
                      </p>
                    </div>

                    {/* Credenciales */}
                    <div className="rounded-xl border border-neutral-800/80 bg-neutral-950/80 p-2.5 space-y-1 font-mono text-[11px]">
                      <div className="flex items-center justify-between text-neutral-400">
                        <span>Usuario:</span>
                        <div className="flex items-center gap-1.5">
                          <strong className="text-white">{acc.user}</strong>
                          <button
                            type="button"
                            onClick={() => handleCopyUser(acc.user, idx)}
                            className="text-neutral-500 hover:text-white"
                            title="Copiar usuario"
                          >
                            {copiedIndex === idx ? (
                              <Check className="h-3 w-3 text-emerald-400" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-neutral-400">
                        <span>Clave:</span>
                        <strong className="text-amber-400">{acc.clave}</strong>
                      </div>
                    </div>

                    <p className="text-[10px] text-neutral-400 leading-snug">
                      {acc.desc}
                    </p>
                  </div>

                  {/* Acciones de Entrada Rápida */}
                  <div className="pt-3 mt-3 border-t border-neutral-800/80 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectQuickAccount(acc)}
                      className="flex-1 rounded-xl border border-neutral-700 bg-neutral-950 py-1.5 text-[10px] font-bold text-neutral-300 hover:text-white hover:border-neutral-500 transition text-center"
                    >
                      Cargar Datos
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDirectRoleLogin(acc)}
                      disabled={loading}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black text-white transition shadow-sm ${acc.btnColor}`}
                    >
                      Ingresar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. FORMULARIO DE ACCESO OFICIAL */}
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-7 shadow-2xl backdrop-blur-md max-w-md mx-auto w-full space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 text-xs font-bold text-white">
            <Lock className="h-4 w-4 text-red-500" />
            <span>Formulario de Acceso Directo</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-3.5 text-xs">
            {/* Campo Usuario */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                Usuario / Identificador
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-3.5 w-3.5 text-neutral-500" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin | delegado | arbitro"
                  className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 pl-9 pr-3 py-2.5 text-white font-medium focus:border-red-500 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-3 h-3.5 w-3.5 text-neutral-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="123456"
                  className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 pl-9 pr-3 py-2.5 text-white font-mono font-bold focus:border-red-500 focus:outline-none transition"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-950/40 border border-red-500/40 p-2.5 text-[11px] text-red-300 text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-red-500 py-3 text-xs font-black text-white hover:from-red-500 hover:to-red-400 shadow-xl shadow-red-600/30 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span>{loading ? "Autenticando..." : "Ingresar al Panel"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Enlace de Registro Público para Delegados */}
          <div className="pt-3 border-t border-neutral-800 text-center space-y-2">
            <p className="text-xs text-neutral-400">
              ¿Eres delegado de un club nuevo?{" "}
              <Link
                href="/registro"
                className="font-black text-red-400 hover:text-red-300 underline underline-offset-4 transition"
              >
                Regístrate como Delegado
              </Link>
            </p>
            <p className="text-[10px] text-neutral-500">
              * Nota: Cuentas de árbitro son creadas exclusivamente por el Admin General.
            </p>
          </div>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs text-neutral-400 hover:text-white transition"
            >
              ← Volver al portal web oficial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
