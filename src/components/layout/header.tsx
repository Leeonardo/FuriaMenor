"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Torneos", href: "/torneos" },
  { label: "Calendario", href: "/calendario" },
  { label: "Posiciones", href: "/posiciones" },
  { label: "Estadísticas", href: "/estadisticas" },
  { label: "Academias", href: "/academias" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-xl">
      {/* Barra superior de identidad */}
      <div className="border-b border-neutral-800/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="hidden sm:inline">Portal Digital de Fútbol Menor · Resultados y Estadísticas · Caracas, Venezuela</span>
            <span className="sm:hidden">Furia Menor · Futsal Caracas</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/registro" className="text-red-400 font-bold hover:text-red-300 transition">
              + Registrar Delegado
            </Link>
            <Link href="/admin" className="text-neutral-400 transition hover:text-white">
              Panel Administrativo
            </Link>
          </div>
        </div>
      </div>

      {/* Nav principal */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="Furia Menor"
              width={42}
              height={42}
              className="object-contain transition group-hover:scale-105"
            />
            <div>
              <p className="text-lg font-bold tracking-tight leading-tight group-hover:text-red-400 transition">
                Furia Menor
              </p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-red-400 font-semibold">
                Fútbol & Futsal Menor
              </p>
            </div>
          </Link>
          <div className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-neutral-300 transition hover:text-white hover:text-red-400"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/calendario"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-red-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-red-500 transition"
          >
            Ver Partidos
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menú"
            className="flex items-center justify-center rounded-lg border border-neutral-800 p-2 text-neutral-300 lg:hidden hover:border-neutral-700"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Menú mobile */}
      {mobileOpen && (
        <div className="border-t border-neutral-800 bg-neutral-950 lg:hidden animate-in fade-in duration-200">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-neutral-300 transition hover:bg-neutral-900 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-neutral-800/80 space-y-1">
              <Link
                href="/registro"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-xs font-bold text-red-400 hover:text-red-300"
              >
                + Registrar Delegado de Club
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-xs text-neutral-400 hover:text-white"
              >
                Acceso Administrativo
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
