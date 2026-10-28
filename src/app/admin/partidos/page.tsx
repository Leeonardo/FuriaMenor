"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Filter, Save, ArrowLeft } from "lucide-react";
import { CATEGORIES, MODALITIES, modalityLabels, type Category, type Modality } from "@/data/daeris";
import { torneoDaerisMatches, type MatchStatus } from "@/data/daeris/calendario";

const DIVISIONS = ["1era División", "2da División"] as const;
type Division = (typeof DIVISIONS)[number];

const JORNADAS = ["JORNADA SÁBADO 24-10-2026", "TODAS"] as const;

export default function AdminPartidosPage() {
  const [category, setCategory] = useState<Category | "all">("all");
  const [division, setDivision] = useState<Division | "all">("all");
  const [modality, setModality] = useState<Modality | "all">("all");
  const [jornada, setJornada] = useState<string>("TODAS");
  const [selectedMatchId, setSelectedMatchId] = useState("");
  const [homeScore, setHomeScore] = useState<number | "">("");
  const [awayScore, setAwayScore] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const matches = torneoDaerisMatches.filter((m) => {
    const matchCategory = category === "all" || m.category === category;
    const matchModality = modality === "all" || m.modality === modality;
    const matchDivision = division === "all" || m.division === division;
    const matchJornada = jornada === "TODAS" || m.jornada === jornada;
    return matchCategory && matchModality && matchDivision && matchJornada;
  });

  const selectedMatch = torneoDaerisMatches.find((m) => m.id === selectedMatchId);

  const statusLabel = (status: MatchStatus) => {
    if (status === "live") return "EN VIVO";
    if (status === "finished") return "FINALIZADO";
    return "PROGRAMADO";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMatchId || homeScore === "" || awayScore === "") return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId: selectedMatchId,
          homeScore: Number(homeScore),
          awayScore: Number(awayScore),
          goals: [],
          cards: [],
        }),
      });
      if (res.ok) {
        alert("Partido guardado y finalizado. Posiciones actualizadas automáticamente.");
        window.location.reload();
      } else {
        alert("Error al guardar");
      }
    } catch {
      alert("Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Furia Menor" width={40} height={40} className="object-contain" />
            <div>
              <p className="text-sm font-semibold">Furia Menor</p>
              <p className="text-xs text-neutral-400">Carga de Resultados - Torneo Daeris</p>
            </div>
          </Link>
          <Link href="/admin" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Volver al Panel
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-red-400">
            <Calendar className="h-5 w-5" />
            <span className="text-sm">Torneo Daeris</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Formulario de Carga de Resultados</h1>
          <p className="mt-2 text-neutral-400">Filtra por categoría, división, modalidad y jornada</p>
        </div>

        <div className="mb-8 grid gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="flex items-center gap-2 text-neutral-400 sm:col-span-2 lg:col-span-5">
            <Filter className="h-4 w-4" />
            <span className="text-sm">Filtros Jerárquicos</span>
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value as Category | "all")} className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm">
            <option value="all">Categoría (Sub-6 a Sub-18)</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select value={division} onChange={(e) => setDivision(e.target.value as Division | "all")} className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm">
            <option value="all">División</option>
            {DIVISIONS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select value={modality} onChange={(e) => setModality(e.target.value as Modality | "all")} className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm">
            <option value="all">Modalidad</option>
            {MODALITIES.map((m) => (
              <option key={m} value={m}>{modalityLabels[m]}</option>
            ))}
          </select>
          <select value={jornada} onChange={(e) => setJornada(e.target.value)} className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm">
            {JORNADAS.map((j) => (
              <option key={j} value={j}>{j}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60">
            <div className="border-b border-neutral-800 p-4">
              <h2 className="font-semibold">Partidos</h2>
              <p className="text-sm text-neutral-400">Selecciona un partido para cargar resultado</p>
            </div>
            <div className="divide-y divide-neutral-800/60 max-h-[600px] overflow-y-auto">
              {matches.length === 0 && (
                <p className="p-4 text-center text-neutral-400">No hay partidos con estos filtros</p>
              )}
              {matches.map((match) => (
                <button
                  key={match.id}
                  onClick={() => {
                    setSelectedMatchId(match.id);
                    setHomeScore(match.homeScore ?? "");
                    setAwayScore(match.awayScore ?? "");
                  }}
                  className={`w-full p-4 text-left transition hover:bg-neutral-800/30 ${selectedMatchId === match.id ? "bg-red-500/10" : ""}`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                      <span>{match.category}</span>
                      <span>•</span>
                      <span>{match.division}</span>
                      <span>•</span>
                      <span>{modalityLabels[match.modality]}</span>
                      <span>•</span>
                      <span>J{match.matchday}</span>
                    </div>
                    <span className="rounded-full border border-neutral-600 px-2 py-0.5 text-xs text-neutral-300">{statusLabel(match.status)}</span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <p className="text-right text-sm font-medium">{match.homeTeam}</p>
                    <p className="text-sm text-neutral-500">vs</p>
                    <p className="text-sm font-medium">{match.awayTeam}</p>
                  </div>
                  <p className="mt-2 text-xs text-neutral-500">{match.matchDate} • {match.matchTime} • {match.venue}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 h-fit">
            <div className="border-b border-neutral-800 p-4">
              <h2 className="font-semibold">Editar Partido</h2>
              <p className="text-sm text-neutral-400">Cargar marcador y finalizar</p>
            </div>
            {selectedMatch ? (
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div className="rounded-lg bg-neutral-950/60 p-3 text-center text-sm">
                  <p className="font-medium">{selectedMatch.homeTeam} vs {selectedMatch.awayTeam}</p>
                  <p className="mt-1 text-xs text-neutral-400">{selectedMatch.category} • {selectedMatch.division} • {modalityLabels[selectedMatch.modality]}</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm">Marcador Final</label>
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <div>
                      <p className="mb-1 text-center text-xs text-neutral-400">Local</p>
                      <input
                        type="number"
                        min="0"
                        value={homeScore}
                        onChange={(e) => setHomeScore(e.target.value === "" ? "" : parseInt(e.target.value))}
                        className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-center text-xl font-bold"
                        required
                      />
                    </div>
                    <span className="text-xl font-bold text-neutral-500">-</span>
                    <div>
                      <p className="mb-1 text-center text-xs text-neutral-400">Visitante</p>
                      <input
                        type="number"
                        min="0"
                        value={awayScore}
                        onChange={(e) => setAwayScore(e.target.value === "" ? "" : parseInt(e.target.value))}
                        className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-center text-xl font-bold"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm">Estado del Partido</label>
                  <input value="Finalizado (finished)" disabled className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-400" />
                  <p className="mt-1 text-xs text-neutral-500">Al guardar, el estado cambiará automáticamente a finalizado</p>
                </div>
                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold hover:bg-red-700 disabled:opacity-50">
                  <Save className="h-4 w-4" />
                  {loading ? "Guardando..." : "Guardar y Finalizar Partido"}
                </button>
              </form>
            ) : (
              <div className="p-6 text-center text-neutral-400">
                <p className="text-sm">Selecciona un partido de la lista para cargar el marcador</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
