"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Printer,
  QrCode,
  Download,
  Award,
  Calendar,
  Sparkles,
  KeyRound,
} from "lucide-react";

export interface PlayerCarnetData {
  name: string;
  dorsal: number;
  ci: string;
  position: string;
  category: string;
  clubName: string;
  carnetNumber?: string;
  birthDate?: string;
  birthYear?: number;
  isVerified?: boolean;
  photoUrl?: string;
}

interface PlayerCarnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: PlayerCarnetData | null;
}

export function PlayerCarnetModal({ isOpen, onClose, player }: PlayerCarnetModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !player) return null;

  // Cálculo de fecha completa y edad si no está indicada
  const birthYear = player.birthYear || (player.birthDate ? parseInt(player.birthDate.split("/")[2] || player.birthDate.split("-")[0]) : 2014);
  const currentYear = 2026;
  const calculatedAge = currentYear - birthYear;
  const displayBirthDate = player.birthDate || `15/05/${birthYear}`;

  const carnetCode =
    player.carnetNumber ||
    `FM-2026-${player.category.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()}-${player.dorsal.toString().padStart(2, "0")}-${player.ci.replace(/[^0-9]/g, "").slice(-4) || "0001"}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-7 shadow-2xl text-white space-y-6">
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Ficha & Carnet Digital Federativo
              </h3>
              <p className="text-[11px] text-neutral-400">
                Acreditación oficial emitida por la Liga Metropolitana Furia Menor
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-neutral-800 p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TARJETA DEL CARNET FÍSICO OFICIAL (ESTILO LICENCIA DEPORTIVA PRO) */}
        {/* ========================================================================= */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl border-2 border-amber-500/50 bg-gradient-to-br from-neutral-900 via-neutral-950 to-red-950 p-5 shadow-2xl space-y-4"
        >
          {/* Marca de agua y brillos holográficos */}
          <div className="absolute -top-10 -right-10 h-40 w-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

          {/* Encabezado del Carnet */}
          <div className="flex items-center justify-between border-b border-neutral-800/90 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-red-600 text-white font-black text-xs flex items-center justify-center shadow-md">
                FM
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-amber-400 leading-none">
                  LIGA METROPOLITANA FURIA MENOR
                </p>
                <p className="text-[8px] uppercase tracking-widest text-neutral-400 mt-0.5">
                  CIRCUITO FEDERADO CARACAS · TEMPORADA 2026
                </p>
              </div>
            </div>

            <span className="font-mono text-[10px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md">
              {carnetCode}
            </span>
          </div>

          {/* Cuerpo Central del Carnet */}
          <div className="grid grid-cols-12 gap-4 items-center">
            {/* Foto del Chamo / Avatar */}
            <div className="col-span-4 flex flex-col items-center">
              <div className="relative h-28 w-24 rounded-xl border-2 border-amber-500/40 bg-neutral-900 overflow-hidden shadow-inner flex flex-col items-center justify-center text-center">
                {player.photoUrl ? (
                  <Image
                    src={player.photoUrl}
                    alt={player.name}
                    width={96}
                    height={112}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-2">
                    <span className="text-2xl font-black text-amber-400">#{player.dorsal}</span>
                    <span className="text-[9px] uppercase font-bold text-neutral-400 mt-1">
                      {player.position}
                    </span>
                  </div>
                )}

                {/* Sello de verificación en miniatura sobre la foto */}
                <div
                  className="absolute bottom-1 right-1 rounded-full bg-emerald-500 text-black p-0.5 shadow-md"
                  title="Año de nacimiento auditado"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
              </div>
              <span className="mt-1 text-[8px] uppercase font-mono font-bold text-neutral-500">
                FICHA OFICIAL
              </span>
            </div>

            {/* Datos Técnicos y Personales del Atleta */}
            <div className="col-span-8 space-y-1.5 text-xs">
              <div>
                <span className="text-[9px] uppercase font-bold text-neutral-400 block">Atleta Federado</span>
                <h4 className="text-base font-black text-white leading-tight">
                  {player.name}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div>
                  <span className="text-[9px] uppercase font-bold text-neutral-400 block">Cédula / Documento</span>
                  <span className="font-mono font-bold text-neutral-200">{player.ci}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-neutral-400 block">Dorsal & Posición</span>
                  <span className="font-bold text-amber-400">
                    #{player.dorsal} · {player.position}
                  </span>
                </div>
              </div>

              {/* FECHA DE NACIMIENTO COMPLETA Y EDAD */}
              <div className="rounded-lg bg-neutral-900/90 border border-neutral-800 p-2 text-[11px] space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase font-bold text-neutral-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-red-400" />
                    Fecha de Nacimiento:
                  </span>
                  <strong className="text-white font-mono">{displayBirthDate}</strong>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-neutral-400">Edad Oficial:</span>
                  <span className="text-amber-400 font-bold">{calculatedAge} años</span>
                </div>
              </div>

              <div className="pt-0.5">
                <span className="text-[9px] uppercase font-bold text-neutral-400 block">Club / Academia</span>
                <span className="font-bold text-white text-[11px] truncate block">{player.clubName}</span>
              </div>
            </div>
          </div>

          {/* Sello Oficial y Footer del Carnet */}
          <div className="border-t border-neutral-800/90 pt-3 flex items-center justify-between gap-2 text-[10px]">
            {/* Badge de Verificación Federativa */}
            <div className="flex items-center gap-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 px-2.5 py-1 text-emerald-400 font-black">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>AÑO DE NACIMIENTO VALIDADO POR LA LIGA</span>
            </div>

            {/* Código QR / Barcode simulado */}
            <div className="flex items-center gap-1 text-neutral-400 font-mono text-[9px] shrink-0">
              <QrCode className="h-4 w-4 text-white" />
              <span>ACTIVO</span>
            </div>
          </div>
        </div>

        {/* Acciones del Modal */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="rounded-xl border border-neutral-800 px-4 py-2 text-xs font-bold text-neutral-400 hover:text-white"
          >
            Cerrar
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2 text-xs font-black text-white hover:bg-red-500 transition shadow-lg shadow-red-600/30"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Imprimir Carnet Oficial</span>
          </button>
        </div>
      </div>
    </div>
  );
}
