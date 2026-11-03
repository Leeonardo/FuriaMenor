"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { MinorCategory, MINOR_CATEGORIES } from "@/data/generic-tournament-data";
import { ShieldCheck } from "lucide-react";

interface CategorySelectorProps {
  activeCategory: MinorCategory;
  categories?: readonly MinorCategory[];
  title?: string;
}

export function TournamentCategorySelector({
  activeCategory,
  categories = MINOR_CATEGORIES,
  title = "Selecciona la Categoría Menor (Sub-8 a Sub-20)",
}: CategorySelectorProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5 shadow-lg backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-red-400" />
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-300">
            {title}
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-neutral-400">
          Categoría activa:{" "}
          <strong className="text-red-400 font-extrabold uppercase">{activeCategory}</strong>
        </span>
      </div>

      {/* Selector de Categorías en estilo píldoras atléticas */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = cat.toLowerCase() === activeCategory.toLowerCase();

          // Preserva otros parámetros si existen
          const params = new URLSearchParams(searchParams.toString());
          params.set("cat", cat);
          const href = `${pathname}?${params.toString()}`;

          return (
            <Link
              key={cat}
              href={href}
              scroll={false}
              className={`flex items-center justify-center rounded-xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105 ring-2 ring-red-400"
                  : "border border-neutral-800 bg-neutral-950/70 text-neutral-400 hover:border-neutral-700 hover:text-white hover:bg-neutral-900"
              }`}
            >
              <span>{cat}</span>
              {isActive && (
                <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
