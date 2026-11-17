"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Home,
  Calendar,
  CheckCircle2,
  Trophy,
  Goal,
  Users,
} from "lucide-react";

interface TournamentNavTabsProps {
  basePath: string;
}

export function TournamentNavTabs({ basePath }: TournamentNavTabsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCat = searchParams.get("cat") || searchParams.get("categoria");
  const catQuery = currentCat ? `?cat=${encodeURIComponent(currentCat)}` : "";

  const tabs = [
    { label: "Inicio", href: `${basePath}${catQuery}`, exact: true, icon: Home },
    { label: "Posiciones", href: `${basePath}/posiciones${catQuery}`, icon: Trophy },
    { label: "Resultados", href: `${basePath}/resultados${catQuery}`, icon: CheckCircle2 },
    { label: "Calendario", href: `${basePath}/calendario${catQuery}`, icon: Calendar },
    { label: "Goleadores", href: `${basePath}/estadisticas${catQuery}`, icon: Goal },
    { label: "Equipos", href: `${basePath}/equipos${catQuery}`, icon: Users },
  ];

  return (
    <div className="mt-6 flex gap-2 overflow-x-auto border-t border-neutral-800/80 pt-4 scrollbar-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.exact
          ? pathname === basePath
          : pathname.startsWith(tab.href.split("?")[0]);

        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              isActive
                ? "bg-red-600 text-white font-black shadow-lg shadow-red-600/30 scale-102"
                : "border border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-red-400"}`} />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
