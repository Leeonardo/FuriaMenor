"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DB_CLUBS, getStoredUsers, isClubDelegadoAssigned, setStoredUserRole } from "@/lib/db-store";
import {
  Users,
  Building2,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  User,
  Mail,
  KeyRound,
  Phone,
  FileText,
  Search,
  Lock,
  Sparkles,
} from "lucide-react";

export default function PublicRegisterPage() {
  const router = useRouter();

  // Campos de formulario
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [cedula, setCedula] = useState("");
  const [selectedClubId, setSelectedClubId] = useState("");
  const [searchClub, setSearchClub] = useState("");

  // Estado UI
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [assignedDelegatesMap, setAssignedDelegatesMap] = useState<Record<string, string>>({
    "la-paz-futsal": "Eudis Toro",
  });

  // Cargar disponibilidad de clubes al montar
  useEffect(() => {
    try {
      const storedUsers = getStoredUsers();
      const map: Record<string, string> = {};
      storedUsers.forEach((u) => {
        if (u.role === "delegado" && u.clubId) {
          map[u.clubId] = u.fullName;
        }
      });
      // Asegurar default demo
      if (!map["la-paz-futsal"]) {
        map["la-paz-futsal"] = "Eudis Toro";
      }
      setAssignedDelegatesMap(map);
    } catch {}
  }, []);

  // Filtrado de clubes para búsqueda
  const filteredClubs = useMemo(() => {
    return DB_CLUBS.filter((c) => {
      const query = searchClub.toLowerCase().trim();
      if (!query) return true;
      return (
        c.name.toLowerCase().includes(query) ||
        c.municipality.toLowerCase().includes(query) ||
        c.zoneDetail.toLowerCase().includes(query)
      );
    });
  }, [searchClub]);

  const selectedClub = useMemo(() => {
    return DB_CLUBS.find((c) => c.id === selectedClubId);
  }, [selectedClubId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!selectedClubId) {
      setErrorMsg("Debes seleccionar una academia o club deportivo de la lista.");
      return;
    }

    // Validación preventiva en cliente antes de enviar
    if (assignedDelegatesMap[selectedClubId]) {
      setErrorMsg(
        `El club seleccionado ya cuenta con un delegado oficial (${assignedDelegatesMap[selectedClubId]}). Cada club solo puede tener un único delegado.`
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          phone,
          cedula,
          clubId: selectedClubId,
          // Nótese: No se envía rol privilegiado; si alguien intentase inyectar role: 'admin', la API lo bloquea
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(data.message || "¡Registro completado con éxito!");
        setStoredUserRole("delegado");

        // Redirigir al panel de administración tras 1.5s
        setTimeout(() => {
          router.push("/admin");
          router.refresh();
        }, 1500);
      } else {
        setErrorMsg(data.message || "No se pudo procesar el registro.");
      }
    } catch {
      setErrorMsg("Error de red al intentar registrar el usuario delegado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-red-600 selection:text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* ENCABEZADO */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-600/10 border border-red-500/30 px-3.5 py-1 text-xs font-bold text-red-400">
            <Users className="h-3.5 w-3.5 text-red-500" />
            <span>Módulo de Autogestión Deportiva • Furia Menor</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Acreditación Oficial de Delegados de Club
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto">
            Habilita tu acceso para la inscripción de plantillas, fichaje de atletas y validación de categorías oficiales de la temporada.
          </p>
        </div>

        {/* NORMAS DE SEGURIDAD ESTRICTAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-1.5 flex items-start gap-3">
            <div className="h-8 w-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                1. Rol Exclusivo: Delegado de Club
              </h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                El registro público asigna automáticamente el rol de <strong>'delegado'</strong>. Las cuentas de árbitros y administradores son gestionadas de forma centralizada por la liga.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-1.5 flex items-start gap-3">
            <div className="h-8 w-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                2. Un Solo Delegado por Academia
              </h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Por normativa de control federativo, cada club deportivo cuenta con <strong>un único delegado autorizado</strong> para garantizar la integridad de las planillas.
              </p>
            </div>
          </div>
        </div>

        {/* FORMULARIO PRINCIPAL */}
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* SELECCIÓN DE CLUB / ACADEMIA */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-2">
                <label className="text-xs font-black uppercase tracking-wider text-neutral-200 flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-red-500" />
                  <span>Selecciona tu Club o Academia Federada <span className="text-red-500">*</span></span>
                </label>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-neutral-500" />
                  <input
                    type="text"
                    value={searchClub}
                    onChange={(e) => setSearchClub(e.target.value)}
                    placeholder="Buscar club o municipio..."
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-950 pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Selector tipo tarjetas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto p-1 border border-neutral-800/80 rounded-2xl bg-neutral-950/40">
                {filteredClubs.map((club) => {
                  const isTaken = !!assignedDelegatesMap[club.id];
                  const isSelected = selectedClubId === club.id;

                  return (
                    <button
                      type="button"
                      key={club.id}
                      disabled={isTaken}
                      onClick={() => setSelectedClubId(club.id)}
                      className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between ${
                        isTaken
                          ? "opacity-50 cursor-not-allowed border-neutral-800/60 bg-neutral-900/30"
                          : isSelected
                          ? "border-red-500 bg-red-600/10 shadow-md ring-1 ring-red-500"
                          : "border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 hover:bg-neutral-800/40"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className={`text-xs font-black truncate ${isSelected ? "text-red-400" : "text-white"}`}>
                            {club.name}
                          </span>
                          {isTaken ? (
                            <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-neutral-800 text-neutral-400 flex items-center gap-0.5">
                              <Lock className="h-2.5 w-2.5" />
                              Ocupado
                            </span>
                          ) : (
                            <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              Disponible
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-neutral-400 truncate">
                          {club.municipality} • {club.zoneDetail}
                        </p>
                      </div>

                      {isTaken && (
                        <p className="text-[9px] text-amber-400/80 mt-1.5 truncate">
                          Delegado: {assignedDelegatesMap[club.id]}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedClub && (
                <div className="rounded-xl border border-red-500/30 bg-red-600/10 p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0" />
                    <span className="text-white">
                      Representarás oficialmente a: <strong>{selectedClub.name}</strong> ({selectedClub.municipality})
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-mono font-bold text-red-400 bg-neutral-950 px-2 py-0.5 rounded-lg border border-red-500/20">
                    Rol: Delegado
                  </span>
                </div>
              )}
            </div>

            {/* DATOS PERSONALES DEL DELEGADO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                  Nombre y Apellido <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej. Roberto Mendoza"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 pl-9 pr-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                  Cédula de Identidad (V/E)
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                  <input
                    type="text"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="Ej. V-18.450.220"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 pl-9 pr-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                  Teléfono Móvil (WhatsApp)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej. +58 414-1234567"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 pl-9 pr-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                  Correo Electrónico <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="delegado@tuanalisis.com"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 pl-9 pr-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                  Contraseña de Acceso al Panel <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 pl-9 pr-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
                  />
                </div>
                <p className="text-[10px] text-neutral-500 mt-1">
                  Utiliza al menos 6 caracteres. Podrás acceder de inmediato tras completar el registro.
                </p>
              </div>
            </div>

            {/* MENSAJES DE ERROR O ÉXITO */}
            {errorMsg && (
              <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-300 flex items-start gap-2 animate-in fade-in">
                <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{successMsg} Redirigiendo al panel de autogestión...</span>
              </div>
            )}

            {/* BOTÓN SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-red-500 py-3.5 text-xs font-black text-white hover:from-red-500 hover:to-red-400 shadow-xl shadow-red-600/30 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span>{loading ? "Procesando Acreditación..." : "Completar Registro de Delegado"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* ENLACES SECUNDARIOS */}
          <div className="pt-6 border-t border-neutral-800 text-center space-y-2 text-xs text-neutral-400">
            <p>
              ¿Ya posees credenciales de Delegado o Árbitro?{" "}
              <Link href="/admin/login" className="font-bold text-red-400 hover:text-red-300 transition underline underline-offset-4">
                Inicia sesión aquí
              </Link>
            </p>
            <p className="text-[11px] text-neutral-500">
              ¿Eres árbitro federado? Las credenciales arbitrales son emitidas directamente por el Administrador General de la Liga.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
