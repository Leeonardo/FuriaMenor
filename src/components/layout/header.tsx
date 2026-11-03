"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, Search, X, ChevronDown } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Caracas", href: "/caracas" },
  { label: "Torneos", href: "/torneos" },
  { label: "Academias", href: "/academias" },
  { label: "Entrevistas", href: "/entrevistas" },
  { label: "Galería", href: "/galeria" },
  { label: "Noticias", href: "/noticias" },
];

const categories = ["Sub-6", "Sub-8", "Sub-10", "Sub-12", "Sub-14", "Sub-16", "Sub-18", "Sub-20"];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Sub-12");

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-xl">
      <div className="border-b border-neutral-800/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="hidden sm:inline">Periódico Digital de Fútbol Menor • Caracas</span>
            <span className="sm:hidden">Fútbol Menor Caracas</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/admin" className="text-neutral-400 transition hover:text-white">
              Acceso Redacción / Admin
            </Link>
          </div>
        </div>
      </div>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Furia Menor" width={44} height={44} className="object-contain" />
            <div>
              <p className="text-lg font-bold tracking-tight leading-tight">Furia Menor</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-red-400">Fútbol Base</p>
            </div>
          </Link>
          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-neutral-300 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden items-center gap-2 rounded-lg border border-neutral-800 px-3 py-1.5 text-sm text-neutral-400 transition hover:border-neutral-700 hover:text-white md:flex">
            <Search className="h-4 w-4" />
            <span>Buscar...</span>
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center rounded-lg border border-neutral-800 p-2 text-neutral-300 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      <div className="border-t border-neutral-800">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
          <span className="flex items-center gap-1 text-xs text-neutral-500">
            <ChevronDown className="h-3 w-3" />
            Categorías
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-xs transition ${
                activeCategory === cat
                  ? "bg-red-600 text-white"
                  : "border border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      {mobileOpen && (
        <div className="border-t border-neutral-800 bg-neutral-950 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-neutral-800/60 py-2 text-sm text-neutral-300 last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
