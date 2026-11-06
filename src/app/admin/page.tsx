"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  UserRole,
  AppUser,
  DBClub,
  DBCategory,
  DBPlayer,
  DBMatch,
} from "@/types/auth-roles";
import {
  DEMO_USERS,
  DB_CATEGORIES,
  DB_CLUBS,
  getStoredUserRole,
  setStoredUserRole,
  getStoredPlayers,
  saveStoredPlayers,
  getStoredMatches,
  saveStoredMatches,
} from "@/lib/db-store";
import { AdminGeneralView } from "@/components/admin/views/admin-general-view";
import { DelegadoView } from "@/components/admin/views/delegado-view";
import { ArbitroView } from "@/components/admin/views/arbitro-view";
import {
  ShieldAlert,
  Users,
  Smartphone,
  LogOut,
  ChevronDown,
  Sparkles,
  Database,
  Building2,
  CheckCircle2,
} from "lucide-react";

export default function AdminPage() {
  const [activeRole, setActiveRole] = useState<UserRole>("admin_general");
  const [currentUser, setCurrentUser] = useState<AppUser>(DEMO_USERS.admin_general);
  const [players, setPlayers] = useState<DBPlayer[]>([]);
  const [matches, setMatches] = useState<DBMatch[]>([]);
  const [clubs, setClubs] = useState<DBClub[]>(DB_CLUBS);
  const [selectedClubId, setSelectedClubId] = useState<string>("la-paz-futsal");
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  // Cargar estado persistente en el cliente
  useEffect(() => {
    const role = getStoredUserRole();
    setActiveRole(role);
    setCurrentUser(DEMO_USERS[role]);
    setPlayers(getStoredPlayers());
    setMatches(getStoredMatches());
    setIsClientLoaded(true);
  }, []);

  // Cambio de Rol interactivo
  const handleSwitchRole = (newRole: UserRole) => {
    setActiveRole(newRole);
    setStoredUserRole(newRole);
    const user = { ...DEMO_USERS[newRole] };
    if (newRole === "delegado") {
      user.clubId = selectedClubId;
      const c = clubs.find((x) => x.id === selectedClubId);
      user.clubName = c?.name || "Club";
    }
    setCurrentUser(user);
  };

  // Cambio de club para el delegado
  const handleSwitchDelegadoClub = (clubId: string) => {
    setSelectedClubId(clubId);
    const c = clubs.find((x) => x.id === clubId);
    if (currentUser.role === "delegado") {
      setCurrentUser((prev) => ({
        ...prev,
        clubId,
        clubName: c?.name || "Club",
      }));
    }
  };

  // Manejadores de Atletas (Delegado & Admin)
  const handleAddPlayer = (newPlayer: DBPlayer) => {
    setPlayers((prev) => {
      const updated = [newPlayer, ...prev];
      saveStoredPlayers(updated);
      return updated;
    });
  };

  const handleUpdatePlayer = (updatedPlayer: DBPlayer) => {
    setPlayers((prev) => {
      const updated = prev.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p));
      saveStoredPlayers(updated);
      return updated;
    });
  };

  const handleDeletePlayer = (playerId: string) => {
    setPlayers((prev) => {
      const updated = prev.filter((p) => p.id !== playerId);
      saveStoredPlayers(updated);
      return updated;
    });
  };

  // Manejadores de Partidos (Árbitro & Admin)
  const handleUpdateMatch = (updatedMatch: DBMatch) => {
    setMatches((prev) => {
      const updated = prev.map((m) => (m.id === updatedMatch.id ? updatedMatch : m));
      saveStoredMatches(updated);
      return updated;
    });
  };

  const handleAddMatch = (newMatch: DBMatch) => {
    setMatches((prev) => {
      const updated = [newMatch, ...prev];
      saveStoredMatches(updated);
      return updated;
    });
  };

  const handleUpdateMatchScore = (
    matchId: string,
    homeScore: number,
    awayScore: number,
    status: DBMatch["status"],
    sheetPhotoUrl?: string,
    notes?: string
  ) => {
    setMatches((prev) => {
      const updated = prev.map((m) => {
        if (m.id === matchId) {
          return {
            ...m,
            homeScore,
            awayScore,
            status,
            sheetPhotoUrl: sheetPhotoUrl || m.sheetPhotoUrl,
            scoresheetUrl: sheetPhotoUrl || m.scoresheetUrl || m.sheetPhotoUrl,
            refereeNotes: notes !== undefined ? notes : m.refereeNotes,
            updatedAt: new Date().toISOString(),
          };
        }
        return m;
      });
      saveStoredMatches(updated);
      return updated;
    });
  };

  const activeClub = clubs.find((c) => c.id === selectedClubId) || clubs[0];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      {/* 1. BARRA SUPERIOR DE SELECTOR DE ROLES (AUTOGESTIONABLE) */}
      <div className="border-b border-neutral-800 bg-neutral-900/90 backdrop-blur-xl px-4 py-2.5 sm:px-6 lg:px-8 sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center justify-between w-full sm:w-auto">
              <Link href="/" className="flex items-center gap-2.5 group">
                <Image src="/logo.png" alt="Furia Menor" width={32} height={32} className="object-contain" />
                <div className="min-w-0">
                  <p className="text-sm font-extrabold text-white leading-tight group-hover:text-red-400 transition">
                    Furia Menor
                  </p>
                  <p className="text-[9px] uppercase tracking-wider text-red-400 font-bold">
                    Sistema Autogestionable por Roles
                  </p>
                </div>
              </Link>

              <Link
                href="/"
                className="sm:hidden rounded-lg border border-neutral-800 bg-neutral-950 px-2.5 py-1 text-xs text-neutral-400 hover:text-white transition"
              >
                Volver
              </Link>
            </div>

            <span className="hidden md:inline text-neutral-600">|</span>

            {/* Selector de Rol Centrado y Ordenado en Móvil */}
            <div className="grid grid-cols-3 w-full sm:w-auto gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800 text-xs">
              <button
                onClick={() => handleSwitchRole("admin_general")}
                className={`flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg font-bold transition text-center ${
                  activeRole === "admin_general"
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Admin</span>
              </button>

              <button
                onClick={() => handleSwitchRole("delegado")}
                className={`flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg font-bold transition text-center ${
                  activeRole === "delegado"
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Users className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Delegado</span>
              </button>

              <button
                onClick={() => handleSwitchRole("arbitro")}
                className={`flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg font-bold transition text-center ${
                  activeRole === "arbitro"
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Smartphone className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Árbitro</span>
              </button>
            </div>
          </div>

          {/* Selector de Club para el Delegado y Acceso Rápido */}
          <div className="flex items-center gap-3 text-xs">
            {activeRole === "delegado" && (
              <div className="flex items-center gap-2 bg-neutral-950 px-2.5 py-1 rounded-xl border border-neutral-800">
                <Building2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span className="text-[10px] uppercase font-bold text-neutral-400">Club:</span>
                <select
                  value={selectedClubId}
                  onChange={(e) => handleSwitchDelegadoClub(e.target.value)}
                  className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                >
                  {clubs.map((c) => (
                    <option key={c.id} value={c.id} className="bg-neutral-900 text-white">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <Link
              href="/"
              className="hidden sm:inline-flex rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-neutral-300 hover:text-white transition"
            >
              Ver Portal Web
            </Link>

            <Link
              href="/admin/login"
              className="text-neutral-400 hover:text-red-400 transition flex items-center gap-1"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. CONTENIDO PRINCIPAL SEGÚN EL ROL ACTIVO */}
      <main className="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 w-full">
        {activeRole === "admin_general" && (
          <AdminGeneralView
            user={currentUser}
            clubs={clubs}
            categories={DB_CATEGORIES}
            players={players}
            matches={matches}
            onUpdateMatch={handleUpdateMatch}
            onAddMatch={handleAddMatch}
            onUpdatePlayer={handleUpdatePlayer}
            onDeletePlayer={handleDeletePlayer}
            onAddPlayer={handleAddPlayer}
          />
        )}

        {activeRole === "delegado" && (
          <DelegadoView
            user={currentUser}
            club={activeClub}
            players={players}
            onAddPlayer={handleAddPlayer}
            onUpdatePlayer={handleUpdatePlayer}
            onDeletePlayer={handleDeletePlayer}
          />
        )}

        {activeRole === "arbitro" && (
          <ArbitroView
            user={currentUser}
            matches={matches}
            onUpdateMatchScore={handleUpdateMatchScore}
          />
        )}
      </main>
    </div>
  );
}
