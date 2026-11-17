"use client";

import React, { useState, useMemo } from "react";
import { DBPlayer } from "@/types/auth-roles";
import { generateParentWhatsAppReminder } from "@/lib/financial-utils";
import { PlayerRepresentativeModal } from "./player-representative-modal";
import {
  DollarSign,
  Users,
  AlertTriangle,
  CheckCircle2,
  Send,
  UserX,
  Trophy,
  Filter,
  Search,
  ExternalLink,
  Edit,
  Phone,
  Clock,
  Sparkles,
} from "lucide-react";

interface AcademyFinancialTabProps {
  players: DBPlayer[];
  clubName: string;
  onUpdatePlayer?: (player: DBPlayer) => void;
}

export function AcademyFinancialTab({
  players,
  clubName,
  onUpdatePlayer,
}: AcademyFinancialTabProps) {
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "unassigned" | "debt_monthly" | "debt_tournament" | "solvent"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlayerForEdit, setSelectedPlayerForEdit] = useState<DBPlayer | null>(null);

  // Cálculos de KPIs
  const totalPlayers = players.length;

  const unassignedPlayers = useMemo(() => {
    return players.filter((p) => !p.enrolledTournaments || p.enrolledTournaments.length === 0);
  }, [players]);

  const monthlyDebtors = useMemo(() => {
    return players.filter((p) => p.financials?.monthlyFeeStatus === "moroso");
  }, [players]);

  const tournamentDebtors = useMemo(() => {
    return players.filter((p) => p.financials?.tournamentFeeStatus === "moroso");
  }, [players]);

  const solventPlayers = useMemo(() => {
    return players.filter(
      (p) =>
        p.financials?.monthlyFeeStatus !== "moroso" &&
        p.financials?.tournamentFeeStatus !== "moroso"
    );
  }, [players]);

  const totalMonthlyDebtAmount = monthlyDebtors.reduce(
    (acc, p) => acc + (p.financials?.monthlyFeeAmount || 20) * Math.max(1, p.financials?.debtMonths || 1),
    0
  );

  const totalTournamentDebtAmount = tournamentDebtors.reduce(
    (acc, p) => acc + (p.financials?.tournamentFeeAmount || 15),
    0
  );

  // Filtrado reactivo
  const filteredList = useMemo(() => {
    return players.filter((p) => {
      // 1. Filtro de auditoría
      if (selectedFilter === "unassigned") {
        if (p.enrolledTournaments && p.enrolledTournaments.length > 0) return false;
      } else if (selectedFilter === "debt_monthly") {
        if (p.financials?.monthlyFeeStatus !== "moroso") return false;
      } else if (selectedFilter === "debt_tournament") {
        if (p.financials?.tournamentFeeStatus !== "moroso") return false;
      } else if (selectedFilter === "solvent") {
        if (
          p.financials?.monthlyFeeStatus === "moroso" ||
          p.financials?.tournamentFeeStatus === "moroso"
        )
          return false;
      }

      // 2. Filtro de búsqueda
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      const pName = `${p.firstName} ${p.lastName}`.toLowerCase();
      const repName = (p.representative?.name || "").toLowerCase();
      const repPhone = (p.representative?.phone || "").toLowerCase();
      const cat = p.categoryName.toLowerCase();
      return pName.includes(q) || repName.includes(q) || repPhone.includes(q) || cat.includes(q);
    });
  }, [players, selectedFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* 1. Tarjetas Resumen de Finanzas (KPIs) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 shadow-md">
          <div className="flex items-center justify-between text-neutral-400 mb-1">
            <span className="text-xs font-semibold">Total Atletas</span>
            <Users className="h-4 w-4 text-neutral-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalPlayers}</div>
          <span className="text-[10px] text-neutral-500">Plantel completo del club</span>
        </div>

        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 shadow-md">
          <div className="flex items-center justify-between text-emerald-400 mb-1">
            <span className="text-xs font-semibold">Solventes 100%</span>
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="text-2xl font-black text-emerald-300">
            {solventPlayers.length}
            <span className="text-xs font-normal text-emerald-400/80 ml-1.5">
              ({totalPlayers ? Math.round((solventPlayers.length / totalPlayers) * 100) : 0}%)
            </span>
          </div>
          <span className="text-[10px] text-emerald-500/80">Sin deudas de cuotas</span>
        </div>

        <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-4 shadow-md">
          <div className="flex items-center justify-between text-red-400 mb-1">
            <span className="text-xs font-semibold">Morosos Mensualidad</span>
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div className="text-2xl font-black text-red-300">{monthlyDebtors.length}</div>
          <span className="text-[10px] text-red-400 font-bold">
            Deuda: ${totalMonthlyDebtAmount} USD
          </span>
        </div>

        <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 shadow-md">
          <div className="flex items-center justify-between text-amber-400 mb-1">
            <span className="text-xs font-semibold">Morosos Torneo</span>
            <Trophy className="h-4 w-4" />
          </div>
          <div className="text-2xl font-black text-amber-300">{tournamentDebtors.length}</div>
          <span className="text-[10px] text-amber-400 font-bold">
            Deuda: ${totalTournamentDebtAmount} USD
          </span>
        </div>
      </div>

      {/* 2. Matriz de Control Inteligente (Filtros del Profesor Karin) */}
      <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-5 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
          <div>
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              Auditoría y Clasificación de Atletas
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Identifica rápidamente quién debe mensualidad, quién debe torneo o quién no está compitiendo.
            </p>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-500" />
            <input
              type="text"
              placeholder="Buscar atleta o representante..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:border-red-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Botones de Filtro por Caso Administrativo */}
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`rounded-xl px-3 py-2 font-bold transition flex items-center gap-1.5 ${
              selectedFilter === "all"
                ? "bg-white text-black shadow-lg"
                : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            Todos ({players.length})
          </button>

          <button
            onClick={() => setSelectedFilter("debt_monthly")}
            className={`rounded-xl px-3 py-2 font-bold transition flex items-center gap-1.5 ${
              selectedFilter === "debt_monthly"
                ? "bg-red-600 text-white shadow-lg"
                : "bg-neutral-900 border border-neutral-800 text-red-400 hover:bg-neutral-800"
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            Debe Mensualidad ({monthlyDebtors.length})
          </button>

          <button
            onClick={() => setSelectedFilter("debt_tournament")}
            className={`rounded-xl px-3 py-2 font-bold transition flex items-center gap-1.5 ${
              selectedFilter === "debt_tournament"
                ? "bg-amber-600 text-white shadow-lg"
                : "bg-neutral-900 border border-neutral-800 text-amber-400 hover:bg-neutral-800"
            }`}
          >
            <Trophy className="h-3.5 w-3.5" />
            Debe Cuota Torneo ({tournamentDebtors.length})
          </button>

          <button
            onClick={() => setSelectedFilter("unassigned")}
            className={`rounded-xl px-3 py-2 font-bold transition flex items-center gap-1.5 ${
              selectedFilter === "unassigned"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-neutral-900 border border-neutral-800 text-purple-400 hover:bg-neutral-800"
            }`}
          >
            <UserX className="h-3.5 w-3.5" />
            Sin Competencia Asignada ({unassignedPlayers.length})
          </button>

          <button
            onClick={() => setSelectedFilter("solvent")}
            className={`rounded-xl px-3 py-2 font-bold transition flex items-center gap-1.5 ${
              selectedFilter === "solvent"
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-neutral-900 border border-neutral-800 text-emerald-400 hover:bg-neutral-800"
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Solventes 100% ({solventPlayers.length})
          </button>
        </div>

        {/* 3. Tabla / Listado de Atletas con Cobranza 1-Click WhatsApp */}
        <div className="overflow-x-auto rounded-2xl border border-neutral-800/80 bg-neutral-900/40">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-800 bg-neutral-900 text-[10px] uppercase tracking-wider text-neutral-400">
              <tr>
                <th className="py-3 px-3 text-center w-12">#</th>
                <th className="py-3 px-4">Atleta</th>
                <th className="py-3 px-3">Categoría</th>
                <th className="py-3 px-4">Datos Representante</th>
                <th className="py-3 px-3 text-center">Mensualidad</th>
                <th className="py-3 px-3 text-center">Cuota Torneo</th>
                <th className="py-3 px-3 text-center">Competencias</th>
                <th className="py-3 px-4 text-right">Aviso de Cobro WhatsApp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-neutral-500">
                    No hay atletas que coincidan con el filtro seleccionado.
                  </td>
                </tr>
              ) : (
                filteredList.map((player) => {
                  const fin = player.financials;
                  const isMonthlyMoroso = fin?.monthlyFeeStatus === "moroso";
                  const isTournMoroso = fin?.tournamentFeeStatus === "moroso";
                  const debtMonths = fin?.debtMonths || 1;
                  const totalOwed = (isMonthlyMoroso ? (fin?.monthlyFeeAmount || 20) * debtMonths : 0) +
                    (isTournMoroso ? (fin?.tournamentFeeAmount || 15) : 0);

                  const repPhone = player.representative?.phone || "0412-0000000";
                  const repName = player.representative?.name || "Representante";
                  const whatsappLink = generateParentWhatsAppReminder(player, clubName, {
                    customDebt: totalOwed,
                  });

                  return (
                    <tr key={player.id} className="hover:bg-neutral-900/60 transition">
                      <td className="py-3 px-3 text-center font-mono font-bold text-amber-400">
                        #{player.jerseyNumber}
                      </td>
                      <td className="py-3 px-4 font-bold text-white">
                        <div>
                          {player.firstName} {player.lastName}
                        </div>
                        <span className="text-[10px] font-mono text-neutral-500">
                          {player.idType}-{player.idNumber}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-neutral-300">
                        {player.categoryName}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{repName}</div>
                        <div className="text-[10px] text-neutral-400 flex items-center gap-1 font-mono">
                          <Phone className="h-2.5 w-2.5 text-emerald-400" />
                          {repPhone} ({player.representative?.relationship || "Tutor"})
                        </div>
                      </td>

                      {/* Mensualidad */}
                      <td className="py-3 px-3 text-center">
                        {isMonthlyMoroso ? (
                          <span className="inline-block rounded-full bg-red-500/20 border border-red-500/40 px-2 py-0.5 text-[10px] font-black text-red-400">
                            Debe {debtMonths} mes (${(fin?.monthlyFeeAmount || 20) * debtMonths})
                          </span>
                        ) : fin?.monthlyFeeStatus === "becado" ? (
                          <span className="inline-block rounded-full bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 text-[10px] font-black text-purple-400">
                            Becado
                          </span>
                        ) : (
                          <span className="inline-block rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-black text-emerald-400">
                            Al Día
                          </span>
                        )}
                      </td>

                      {/* Cuota Torneo */}
                      <td className="py-3 px-3 text-center">
                        {isTournMoroso ? (
                          <span className="inline-block rounded-full bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 text-[10px] font-black text-amber-400">
                            Debe ${fin?.tournamentFeeAmount || 15}
                          </span>
                        ) : fin?.tournamentFeeStatus === "exonerado" ? (
                          <span className="inline-block rounded-full bg-neutral-800 px-2 py-0.5 text-[10px] text-neutral-400">
                            Exonerado
                          </span>
                        ) : (
                          <span className="inline-block rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-black text-emerald-400">
                            Solvente
                          </span>
                        )}
                      </td>

                      {/* Competencias */}
                      <td className="py-3 px-3 text-center">
                        {player.enrolledTournaments && player.enrolledTournaments.length > 0 ? (
                          <span className="inline-block rounded-md bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 text-[9px] font-bold text-neutral-300">
                            {player.enrolledTournaments.length} Torneo(s)
                          </span>
                        ) : (
                          <span className="inline-block rounded-md bg-purple-500/20 border border-purple-500/30 px-1.5 py-0.5 text-[9px] font-black text-purple-400">
                            Sin Asignar
                          </span>
                        )}
                      </td>

                      {/* Acciones de Cobro */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {totalOwed > 0 ? (
                            <a
                              href={whatsappLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-white font-black text-[11px] shadow-sm transition"
                              title={`Enviar aviso de cobro por WhatsApp a ${repName}`}
                            >
                              <Send className="h-3 w-3" />
                              <span>Cobrar ${totalOwed}</span>
                            </a>
                          ) : (
                            <span className="text-[10px] text-emerald-400 font-bold px-2 py-1">
                              ✓ Solvente
                            </span>
                          )}

                          <button
                            onClick={() => setSelectedPlayerForEdit(player)}
                            className="rounded-xl border border-neutral-800 p-1.5 text-neutral-400 hover:text-white hover:border-neutral-700 transition"
                            title="Editar ficha financiera y de representante"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Edición de Representante y Finanzas */}
      <PlayerRepresentativeModal
        isOpen={Boolean(selectedPlayerForEdit)}
        onClose={() => setSelectedPlayerForEdit(null)}
        player={selectedPlayerForEdit}
        clubName={clubName}
        onUpdatePlayer={onUpdatePlayer}
      />
    </div>
  );
}
