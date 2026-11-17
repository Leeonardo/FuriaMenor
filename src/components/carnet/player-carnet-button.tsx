"use client";

import React, { useState } from "react";
import { PlayerCarnetModal, PlayerCarnetData } from "./player-carnet-modal";
import { IdCard, ShieldCheck } from "lucide-react";

interface PlayerCarnetButtonProps {
  player: PlayerCarnetData;
  compact?: boolean;
}

export function PlayerCarnetButton({ player, compact = false }: PlayerCarnetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`group inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-amber-300 hover:bg-amber-500 hover:text-black transition cursor-pointer shadow-sm ${
          compact ? "text-[10px]" : "text-xs font-bold"
        }`}
        title={`Ver Carnet Digital Oficial de ${player.name} (Validado por la Liga)`}
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400 group-hover:bg-black shrink-0 animate-pulse" />
        <span className="font-mono font-bold">🪪 Carnet</span>
      </button>

      <PlayerCarnetModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        player={player}
      />
    </>
  );
}
