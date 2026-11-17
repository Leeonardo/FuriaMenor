"use client";

import React, { useState } from "react";
import { DBPlayer, RepresentativeData, PlayerFinancialStatus } from "@/types/auth-roles";
import { generateParentWhatsAppReminder } from "@/lib/financial-utils";
import {
  X,
  User,
  Phone,
  Mail,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Send,
  Save,
  Clock,
  ShieldAlert,
  Percent,
} from "lucide-react";

interface PlayerRepresentativeModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: DBPlayer | null;
  clubName: string;
  onUpdatePlayer?: (updated: DBPlayer) => void;
}

export function PlayerRepresentativeModal({
  isOpen,
  onClose,
  player,
  clubName,
  onUpdatePlayer,
}: PlayerRepresentativeModalProps) {
  if (!isOpen || !player) return null;

  const [repName, setRepName] = useState(player.representative?.name || "");
  const [relationship, setRelationship] = useState<RepresentativeData["relationship"]>(
    player.representative?.relationship || "Padre"
  );
  const [repPhone, setRepPhone] = useState(player.representative?.phone || "");
  const [repEmail, setRepEmail] = useState(player.representative?.email || "");
  const [repId, setRepId] = useState(player.representative?.idNumber || "");

  // Finanzas
  const [monthlyStatus, setMonthlyStatus] = useState<"al_dia" | "moroso" | "becado">(
    player.financials?.monthlyFeeStatus || "al_dia"
  );
  const [monthlyAmount, setMonthlyAmount] = useState<number>(
    player.financials?.monthlyFeeAmount || 20
  );
  const [debtMonths, setDebtMonths] = useState<number>(
    player.financials?.debtMonths || 0
  );
  const [tournamentStatus, setTournamentStatus] = useState<"al_dia" | "moroso" | "exonerado">(
    player.financials?.tournamentFeeStatus || "al_dia"
  );
  const [tournamentAmount, setTournamentAmount] = useState<number>(
    player.financials?.tournamentFeeAmount || 15
  );
  const [finNotes, setFinNotes] = useState(player.financials?.notes || "");

  // Asistencia
  const attendances = player.attendances || [];
  const totalAtt = attendances.length;
  const presentAtt = attendances.filter((a) => a.status === "presente").length;
  const attRate = totalAtt > 0 ? Math.round((presentAtt / totalAtt) * 100) : 100;

  const totalOwed = (monthlyStatus === "moroso" ? monthlyAmount * Math.max(1, debtMonths) : 0) +
    (tournamentStatus === "moroso" ? tournamentAmount : 0);

  const handleSave = () => {
    if (!onUpdatePlayer) return;

    const updated: DBPlayer = {
      ...player,
      representative: {
        name: repName,
        relationship,
        idNumber: repId,
        phone: repPhone,
        email: repEmail,
      },
      financials: {
        monthlyFeeStatus: monthlyStatus,
        monthlyFeeAmount: monthlyAmount,
        debtMonths: monthlyStatus === "moroso" ? Math.max(1, debtMonths) : 0,
        tournamentFeeStatus: tournamentStatus,
        tournamentFeeAmount: tournamentAmount,
        lastPaymentDate: player.financials?.lastPaymentDate || new Date().toISOString().split("T")[0],
        notes: finNotes,
      },
    };

    onUpdatePlayer(updated);
    onClose();
  };

  const whatsappUrl = generateParentWhatsAppReminder(player, clubName, {
    customPhone: repPhone,
    customRepName: repName,
    customDebt: totalOwed,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 font-mono font-black text-white text-lg shadow-lg">
              #{player.jerseyNumber}
            </div>
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                {player.firstName} {player.lastName}
                <span className="rounded-full bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-[10px] font-mono text-amber-400">
                  {player.categoryName}
                </span>
              </h3>
              <p className="text-xs text-neutral-400 font-mono">
                {player.idType}-{player.idNumber} · Carnet: {player.carnetNumber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-neutral-800 p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sección 1: Datos del Representante */}
        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <User className="h-4 w-4" />
              Datos del Representante Legal
            </h4>
            <span className="text-[10px] text-neutral-400">Vínculo para avisos de cobro y convocatorias</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-neutral-400 font-semibold mb-1 block">Nombre y Apellido</label>
              <input
                type="text"
                value={repName}
                onChange={(e) => setRepName(e.target.value)}
                placeholder="Ej. Carmen Mendoza"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-white focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-neutral-400 font-semibold mb-1 block">Parentesco</label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value as any)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-white focus:border-red-500 focus:outline-none"
              >
                <option value="Padre">Padre</option>
                <option value="Madre">Madre</option>
                <option value="Tutor Legal">Tutor Legal</option>
                <option value="Abuelo(a)">Abuelo(a)</option>
              </select>
            </div>

            <div>
              <label className="text-neutral-400 font-semibold mb-1 block flex items-center gap-1">
                <Phone className="h-3 w-3 text-emerald-400" /> WhatsApp Directo
              </label>
              <input
                type="text"
                value={repPhone}
                onChange={(e) => setRepPhone(e.target.value)}
                placeholder="Ej. 0412-1234567"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-emerald-300 font-mono focus:border-emerald-500 focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="text-neutral-400 font-semibold mb-1 block">Cédula del Representante</label>
              <input
                type="text"
                value={repId}
                onChange={(e) => setRepId(e.target.value)}
                placeholder="Ej. V-14.500.123"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-white font-mono focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Sección 2: Finanzas y Cobranzas */}
        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Mensualidad y Solvencia de Torneo
            </h4>
            {totalOwed > 0 ? (
              <span className="rounded-full bg-red-500/20 border border-red-500/30 px-2.5 py-0.5 text-xs font-black text-red-400 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> Deuda Total: ${totalOwed} USD
              </span>
            ) : (
              <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-black text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Solvente 100%
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Mensualidad Academia */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3 space-y-2">
              <span className="font-bold text-white block">Cuota Mensual Academia</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">Estatus</label>
                  <select
                    value={monthlyStatus}
                    onChange={(e) => setMonthlyStatus(e.target.value as any)}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-2 py-1.5 text-white font-bold"
                  >
                    <option value="al_dia">Al Día</option>
                    <option value="moroso">Moroso</option>
                    <option value="becado">Becado</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">Monto ($/mes)</label>
                  <input
                    type="number"
                    value={monthlyAmount}
                    onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-2 py-1.5 text-white font-mono"
                  />
                </div>
              </div>

              {monthlyStatus === "moroso" && (
                <div>
                  <label className="text-[10px] text-red-400 font-bold block mb-1">Meses Adeudados</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={debtMonths}
                    onChange={(e) => setDebtMonths(Number(e.target.value))}
                    className="w-full rounded-lg border border-red-500/40 bg-red-950/20 px-2 py-1 text-red-300 font-mono font-bold"
                  />
                </div>
              )}
            </div>

            {/* Cuota Torneo Federado */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3 space-y-2">
              <span className="font-bold text-white block">Inscripción a Torneo Oficial</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">Estatus</label>
                  <select
                    value={tournamentStatus}
                    onChange={(e) => setTournamentStatus(e.target.value as any)}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-2 py-1.5 text-white font-bold"
                  >
                    <option value="al_dia">Solvente</option>
                    <option value="moroso">Debe Cuota</option>
                    <option value="exonerado">Exonerado</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">Cuota ($)</label>
                  <input
                    type="number"
                    value={tournamentAmount}
                    onChange={(e) => setTournamentAmount(Number(e.target.value))}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-2 py-1.5 text-white font-mono"
                  />
                </div>
              </div>
              <p className="text-[10px] text-neutral-500 italic mt-1">
                {player.enrolledTournaments?.length
                  ? `Inscrito en ${player.enrolledTournaments.length} torneo(s)`
                  : "Atleta sin torneo asignado"}
              </p>
            </div>
          </div>

          {/* Botón de 1 Clic para WhatsApp */}
          {totalOwed > 0 && (
            <div className="pt-2 border-t border-neutral-800">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-4 py-3 text-white font-black text-xs shadow-lg transition transform hover:-translate-y-0.5"
              >
                <Send className="h-4 w-4" />
                <span>Enviar Recordatorio de Cobro a {repName} por WhatsApp (${totalOwed} USD)</span>
              </a>
            </div>
          )}
        </div>

        {/* Sección 3: Asistencias y Compromiso */}
        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Asistencias a Entrenamientos y Convocatorias
            </h4>
            <span className="text-xs font-bold text-white bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-lg">
              {attRate}% de Asistencia
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {attendances.map((att) => (
              <div
                key={att.id}
                className={`rounded-xl border px-3 py-1.5 text-center shrink-0 ${
                  att.status === "presente"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                    : "border-red-500/30 bg-red-500/10 text-red-300"
                }`}
              >
                <div className="text-[9px] font-mono opacity-80">{att.date.slice(5)}</div>
                <div className="text-[10px] font-black capitalize">{att.status}</div>
                <div className="text-[8px] opacity-70 capitalize">{att.type}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer y Guardado */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-neutral-800 px-4 py-2 text-xs font-bold text-neutral-400 hover:text-white transition"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-red-600 hover:bg-red-500 px-5 py-2 text-xs font-black text-white transition flex items-center gap-2 shadow-lg"
          >
            <Save className="h-4 w-4" />
            <span>Guardar Cambios</span>
          </button>
        </div>
      </div>
    </div>
  );
}
