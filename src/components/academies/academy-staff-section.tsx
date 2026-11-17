"use client";

import React, { useState } from "react";
import { Academy, AcademyStaffMember, getAcademyStaff } from "@/data/academies-data";
import {
  Users,
  Award,
  ShieldCheck,
  Phone,
  Briefcase,
  Layers,
  Sparkles,
  CheckCircle2,
  Filter,
} from "lucide-react";

interface AcademyStaffSectionProps {
  academy: Academy;
}

export function AcademyStaffSection({ academy }: AcademyStaffSectionProps) {
  const staff = getAcademyStaff(academy);
  const [selectedRole, setSelectedRole] = useState<string>("all");

  const roles = ["all", ...Array.from(new Set(staff.map((s) => s.role)))];

  const filteredStaff = staff.filter((member) => {
    if (selectedRole === "all") return true;
    return member.role === selectedRole;
  });

  return (
    <section className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 shadow-2xl space-y-6">
      {/* 1. Encabezado de la Sección */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-red-500/20 text-amber-400 border border-amber-500/30 shadow-md">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wider">
                Cuerpo Técnico & Staff Profesional
              </h2>
              <span className="hidden sm:inline-flex rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                Staff Acreditado
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Entrenadores, preparadores físicos y coordinadores de formación en <strong>{academy.name}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-neutral-800 border border-neutral-700/80 px-3 py-1 text-xs font-bold text-amber-400">
            {staff.length} Formadores
          </span>
        </div>
      </div>

      {/* 2. Filtro rápido por Rol si hay más de 3 integrantes */}
      {roles.length > 2 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRole(r)}
              className={`rounded-xl px-3 py-1.5 font-bold transition whitespace-nowrap cursor-pointer ${
                selectedRole === r
                  ? "bg-amber-500 text-black shadow-md font-black"
                  : "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white"
              }`}
            >
              {r === "all" ? "Todo el Cuerpo Técnico" : r}
            </button>
          ))}
        </div>
      )}

      {/* 3. Grid de Tarjetas de Entrenadores y Staff */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredStaff.map((member) => {
          const initials = member.name
            .replace("Prof.", "")
            .trim()
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

          const isDt = member.role === "Director Técnico" || member.role === "Entrenador Principal";
          const isCoord = member.role === "Coordinador Deportivo";

          // Enlace WhatsApp
          let cleanPhone = (member.phone || academy.contact?.phone || "").replace(/\D/g, "");
          if (cleanPhone.startsWith("0")) cleanPhone = "58" + cleanPhone.substring(1);
          const waText = encodeURIComponent(
            `Hola ${member.name}, le contacto desde la plataforma Furia Menor respecto a sus categorías en ${academy.name}.`
          );
          const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${waText}` : null;

          return (
            <div
              key={member.id}
              className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/90 p-5 space-y-4 transition hover:border-neutral-700 hover:shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                {/* Cabecera del Miembro: Avatar + Nombre + Rol */}
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl font-black text-sm text-white shrink-0 shadow-lg border border-white/10"
                    style={{
                      background: `linear-gradient(135deg, ${academy.colors.primary}, #171717)`,
                    }}
                  >
                    {initials}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <h3 className="font-extrabold text-sm text-white truncate group-hover:text-amber-400 transition">
                      {member.name}
                    </h3>
                    <span
                      className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                        isDt
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : isCoord
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      }`}
                    >
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Categorías a Cargo */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                    Categorías Asignadas:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {member.categories.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-md bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-[10px] font-bold text-neutral-300"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certificación y Experiencia */}
                <div className="space-y-1.5 pt-2 border-t border-neutral-800/80 text-[11px]">
                  <div className="flex items-start gap-1.5 text-emerald-400 font-semibold">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span className="leading-tight">{member.license || "Certificación Técnica FVF / Liga"}</span>
                  </div>
                  {member.experience && (
                    <p className="text-neutral-400 text-[10px] leading-relaxed">
                      {member.experience}
                    </p>
                  )}
                </div>
              </div>

              {/* Botón de Contacto */}
              {waUrl && (
                <div className="pt-3 border-t border-neutral-800/80">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 px-3 py-2 text-emerald-300 hover:bg-emerald-600 hover:text-white transition text-xs font-bold"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Contactar con el Profesor</span>
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
