"use client";

import React, { useState } from "react";
import { DBMatch, ClubLeagueDebt } from "@/types/auth-roles";
import {
  INITIAL_LEAGUE_DEBTS,
  generateLeagueDelegateWhatsAppNotice,
  evaluateRefereePayout,
} from "@/lib/financial-utils";
import { ScoresheetModal } from "@/components/transparency/scoresheet-modal";
import {
  DollarSign,
  Building2,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Send,
  Lock,
  Unlock,
  ShieldAlert,
  Eye,
  Trophy,
  Phone,
  Search,
} from "lucide-react";

interface LeagueTreasuryTabProps {
  matches: DBMatch[];
}

export function LeagueTreasuryTab({ matches }: LeagueTreasuryTabProps) {
  const [debts, setDebts] = useState<ClubLeagueDebt[]>(INITIAL_LEAGUE_DEBTS);
  const [selectedMatchForSheet, setSelectedMatchForSheet] = useState<DBMatch | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const totalClubDebt = debts.reduce(
    (acc, d) => acc + d.tournamentFeeDebt + d.finesDebt,
    0
  );

  const morosoClubs = debts.filter((d) => d.status === "moroso");

  // Partidos finalizados y liquidaciones
  const finishedMatches = matches.filter((m) => m.status === "finalizado");

  const filteredDebts = debts.filter((d) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      d.clubName.toLowerCase().includes(q) ||
      d.delegateName.toLowerCase().includes(q) ||
      d.categoryName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* 1. KPIs de Tesorería de la Liga */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-5 shadow-lg">
          <div className="flex items-center justify-between text-red-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Deuda Total de Clubes a la Liga</span>
            <DollarSign className="h-5 w-5" />
          </div>
          <div className="text-3xl font-black text-red-300">${totalClubDebt} USD</div>
          <span className="text-xs text-red-400/90 font-medium mt-1 block">
            {morosoClubs.length} clubes con saldos pendientes
          </span>
        </div>

        <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5 shadow-lg">
          <div className="flex items-center justify-between text-amber-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Multas por Tarjetas Pendientes</span>
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div className="text-3xl font-black text-amber-300">
            ${debts.reduce((acc, d) => acc + d.finesDebt, 0)} USD
          </div>
          <span className="text-xs text-amber-400/90 font-medium mt-1 block">
            Acumulado de amonestaciones y sanciones
          </span>
        </div>

        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 shadow-lg">
          <div className="flex items-center justify-between text-emerald-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Liquidación Arbitral Condicionada</span>
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="text-3xl font-black text-emerald-300">
            {finishedMatches.filter((m) => evaluateRefereePayout(m).isEligible).length} / {finishedMatches.length}
          </div>
          <span className="text-xs text-emerald-400/90 font-medium mt-1 block">
            Partidos con resultado + planilla cargada
          </span>
        </div>
      </div>

      {/* 2. TABLA: Control de Cobranza a Clubes de la Liga (Gestor Ronny) */}
      <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Building2 className="h-5 w-5 text-red-500" />
              Gestor Liga: Cobranza a Clubes y Solvencia Federativa
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Control centralizado de cuotas de torneo y multas por club con recordatorio oficial por WhatsApp en 1 clic.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-500" />
            <input
              type="text"
              placeholder="Buscar club o delegado..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:border-red-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/30">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-800 bg-neutral-900 text-[10px] uppercase tracking-wider text-neutral-400">
              <tr>
                <th className="py-3 px-4">Club / Academia</th>
                <th className="py-3 px-3">Categoría / Torneo</th>
                <th className="py-3 px-3">Delegado Contacto</th>
                <th className="py-3 px-3 text-center">Deuda Torneo</th>
                <th className="py-3 px-3 text-center">Multas Tarjetas</th>
                <th className="py-3 px-3 text-center">Total a Pagar</th>
                <th className="py-3 px-3 text-center">Estatus</th>
                <th className="py-3 px-4 text-right">Cobro WhatsApp Liga</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {filteredDebts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-neutral-500">
                    No se encontraron clubes en el registro de cobranza.
                  </td>
                </tr>
              ) : (
                filteredDebts.map((item) => {
                  const total = item.tournamentFeeDebt + item.finesDebt;
                  const isMoroso = total > 0;
                  const waLink = generateLeagueDelegateWhatsAppNotice(item, "Liga Furia Menor");

                  return (
                    <tr key={item.id} className="hover:bg-neutral-900/50 transition">
                      <td className="py-3 px-4 font-bold text-white">{item.clubName}</td>
                      <td className="py-3 px-3 text-neutral-300">
                        <div>{item.categoryName}</div>
                        <span className="text-[10px] text-neutral-500">{item.tournamentName}</span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-white">{item.delegateName}</div>
                        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                          <Phone className="h-2.5 w-2.5" /> {item.delegatePhone}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-amber-400">
                        ${item.tournamentFeeDebt} USD
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-red-400">
                        ${item.finesDebt} USD
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-black text-white text-sm">
                        ${total} USD
                      </td>
                      <td className="py-3 px-3 text-center">
                        {isMoroso ? (
                          <span className="inline-block rounded-full bg-red-500/20 border border-red-500/40 px-2.5 py-0.5 text-[10px] font-black text-red-400">
                            Moroso
                          </span>
                        ) : (
                          <span className="inline-block rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 text-[10px] font-black text-emerald-400">
                            Solvente
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {isMoroso ? (
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-white font-black text-[11px] shadow-sm transition"
                            title={`Enviar aviso formal de cobranza a ${item.delegateName}`}
                          >
                            <Send className="h-3 w-3" />
                            <span>Cobrar ${total}</span>
                          </a>
                        ) : (
                          <span className="text-[11px] font-bold text-emerald-400">
                            ✓ Solvente
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. CONDICIÓN DE PAGO A ÁRBITROS Y MESA TÉCNICA */}
      <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-amber-500" />
              Liquidación de Honorarios Arbitrales y Mesa Técnica
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Normativa de Rigor: <strong>Los árbitros y la mesa NO cobran</strong> a menos que carguen en el sistema el resultado y la fotografía de la planilla oficial firmada.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/30">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-800 bg-neutral-900 text-[10px] uppercase tracking-wider text-neutral-400">
              <tr>
                <th className="py-3 px-4">Partido / Jornada</th>
                <th className="py-3 px-3">Categoría</th>
                <th className="py-3 px-3">Árbitro Designado</th>
                <th className="py-3 px-3 text-center">Marcador</th>
                <th className="py-3 px-3 text-center">Planilla Física</th>
                <th className="py-3 px-3 text-center">Honorarios ($)</th>
                <th className="py-3 px-4 text-center">Estatus Liquidación</th>
                <th className="py-3 px-4 text-right">Verificación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {finishedMatches.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-neutral-500">
                    No hay partidos finalizados pendientes de liquidación.
                  </td>
                </tr>
              ) : (
                finishedMatches.map((m) => {
                  const payout = evaluateRefereePayout(m);
                  const hasSheet = Boolean(m.sheetPhotoUrl || m.scoresheetUrl);

                  return (
                    <tr key={m.id} className="hover:bg-neutral-900/50 transition">
                      <td className="py-3 px-4 font-bold text-white">
                        <div>
                          {m.homeClubName} vs {m.awayClubName}
                        </div>
                        <span className="text-[10px] text-neutral-500">
                          {m.jornada} · {m.matchDate}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-neutral-300">
                        {m.categoryName}
                      </td>
                      <td className="py-3 px-3 text-white font-medium">
                        {m.refereeName || "Colegio de Árbitros"}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-black text-amber-400">
                        {m.homeScore !== null && m.awayScore !== null
                          ? `${m.homeScore} - ${m.awayScore}`
                          : "Pendiente"}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {hasSheet ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                            <CheckCircle2 className="h-3 w-3" /> Cargada
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 border border-red-500/30 px-2 py-0.5 text-[10px] font-bold text-red-400">
                            <AlertTriangle className="h-3 w-3" /> Sin Planilla
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-white">
                        ${payout.totalAmount} USD
                        <span className="block text-[9px] text-neutral-500 font-normal">
                          ($15 Árb / $10 Mesa)
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {payout.isEligible ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-black text-emerald-300 shadow-sm">
                            <Unlock className="h-3.5 w-3.5 text-emerald-400" />
                            APROBADO PARA PAGO
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 border border-red-500/40 px-3 py-1 text-xs font-black text-red-300 shadow-sm"
                            title={payout.reason}
                          >
                            <Lock className="h-3.5 w-3.5 text-red-400" />
                            BLOQUEADO (FALTA PLANILLA)
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {hasSheet ? (
                          <button
                            onClick={() => setSelectedMatchForSheet(m)}
                            className="inline-flex items-center gap-1 rounded-xl border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-xs font-bold text-white hover:border-neutral-500 transition"
                          >
                            <Eye className="h-3 w-3 text-amber-400" />
                            <span>Planilla</span>
                          </button>
                        ) : (
                          <span className="text-[10px] text-red-400 italic">
                            Inhabilitado
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Planilla */}
      {selectedMatchForSheet && (
        <ScoresheetModal
          isOpen={Boolean(selectedMatchForSheet)}
          onClose={() => setSelectedMatchForSheet(null)}
          match={{
            homeTeam: selectedMatchForSheet.homeClubName,
            awayTeam: selectedMatchForSheet.awayClubName,
            homeScore: selectedMatchForSheet.homeScore,
            awayScore: selectedMatchForSheet.awayScore,
            categoryName: selectedMatchForSheet.categoryName,
            venue: selectedMatchForSheet.venue,
            matchDate: selectedMatchForSheet.matchDate,
            scoresheetUrl: selectedMatchForSheet.sheetPhotoUrl || selectedMatchForSheet.scoresheetUrl,
          }}
        />
      )}
    </div>
  );
}
