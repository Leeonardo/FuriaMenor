"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Save, Plus, Minus, AlertTriangle } from "lucide-react";
import { CATEGORIES, MODALITIES, modalityLabels, type Category, type Modality } from "@/data/daeris";
import { torneoDaerisMatches } from "@/data/daeris/calendario";

const DIVISIONS = ["1era División", "2da División"] as const;
type Division = (typeof DIVISIONS)[number];

export default function AdminPage() {
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState<Category | "all">("all");
  const [division, setDivision] = useState<Division | "all">("all");
  const [modality, setModality] = useState<Modality | "all">("all");
  const [selectedMatchId, setSelectedMatchId] = useState("");
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [goals, setGoals] = useState<Array<{ player: string; team: "home" | "away"; minute?: string }>>([{ player: "", team: "home", minute: "" }]);
  const [cards, setCards] = useState<Array<{ player: string; team: "home" | "away"; type: "amarilla" | "roja" }>>([]);

  const matches = torneoDaerisMatches.filter((m) => {
    const matchCategory = category === "all" || m.category === category;
    const matchModality = modality === "all" || m.modality === modality;
    const matchDivision = division === "all" || m.division === division;
    return (m.status === "scheduled" || m.status === "live") && matchCategory && matchModality && matchDivision;
  });

  const selectedMatch = torneoDaerisMatches.find((m) => m.id === selectedMatchId);

  const addGoal = () => {
    setGoals([...goals, { player: "", team: "home", minute: "" }]);
  };

  const removeGoal = (idx: number) => {
    if (goals.length > 1) {
      setGoals(goals.filter((_, i) => i !== idx));
    }
  };

  const updateGoal = (idx: number, field: string, value: string) => {
    const newGoals = [...goals];
    newGoals[idx] = { ...newGoals[idx], [field]: value };
    setGoals(newGoals);
  };

  const addCard = () => {
    setCards([...cards, { player: "", team: "home", type: "amarilla" }]);
  };

  const removeCard = (idx: number) => {
    setCards(cards.filter((_, i) => i !== idx));
  };

  const updateCard = (idx: number, field: string, value: string) => {
    const newCards = [...cards];
    newCards[idx] = { ...newCards[idx], [field]: value };
    setCards(newCards);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMatchId) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId: selectedMatchId,
          homeScore,
          awayScore,
          goals: goals.filter((g) => g.player.trim()),
          cards: cards.filter((c) => c.player.trim()),
        }),
      });
      if (res.ok) {
        alert("Partido finalizado. Tablas, goleadores, arquería y fair play actualizados.");
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
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Furia Menor" width={40} height={40} className="object-contain" />
            <div>
              <p className="text-sm font-semibold">Furia Menor</p>
              <p className="text-xs text-neutral-400">Panel Admin - Torneo Daeris</p>
            </div>
          </Link>
          <Link href="/admin/login" className="text-sm text-neutral-400 hover:text-white">
            Cerrar sesión
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-red-400">
            <Trophy className="h-5 w-5" />
            <span className="text-sm">Torneo Daeris</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Carga de Resultados</h1>
          <p className="mt-2 text-neutral-400">Finalizar partidos y actualizar tablas automáticamente</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4">
            <h2 className="text-lg font-semibold">Selección de Partido</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <select value={category} onChange={(e) => setCategory(e.target.value as Category | "all")} className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2">
                <option value="all">Categoría (Sub-6 a Sub-18)</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select value={division} onChange={(e) => setDivision(e.target.value as Division | "all")} className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2">
                <option value="all">División</option>
                {DIVISIONS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <select value={modality} onChange={(e) => setModality(e.target.value as Modality | "all")} className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2">
                <option value="all">Modalidad</option>
                {MODALITIES.map((m) => (
                  <option key={m} value={m}>{modalityLabels[m]}</option>
                ))}
              </select>
            </div>
            <select value={selectedMatchId} onChange={(e) => setSelectedMatchId(e.target.value)} className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2" required>
              <option value="">Partidos en estado PROGRAMADO o EN VIVO</option>
              {matches.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.category} | {m.division} | {modalityLabels[m.modality]} | {m.homeTeam} vs {m.awayTeam} | {m.matchDate} {m.matchTime} - {m.status === "live" ? "EN VIVO" : "PROGRAMADO"}
                </option>
              ))}
            </select>
          </div>

          {selectedMatch && (
            <>
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4">
                <h2 className="text-lg font-semibold">Marcador Final</h2>
                <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
                  <div className="text-center">
                    <p className="mb-2 font-semibold">{selectedMatch.homeTeam}</p>
                    <input
                      type="number"
                      min="0"
                      value={homeScore}
                      onChange={(e) => setHomeScore(parseInt(e.target.value) || 0)}
                      className="w-24 rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-center text-2xl font-bold"
                    />
                  </div>
                  <div className="text-center text-2xl font-bold text-neutral-500">-</div>
                  <div className="text-center">
                    <p className="mb-2 font-semibold">{selectedMatch.awayTeam}</p>
                    <input
                      type="number"
                      min="0"
                      value={awayScore}
                      onChange={(e) => setAwayScore(parseInt(e.target.value) || 0)}
                      className="w-24 rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-center text-2xl font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Goleadores</h2>
                  <button type="button" onClick={addGoal} className="flex items-center gap-1 rounded-lg bg-neutral-800 px-3 py-1 text-sm hover:bg-neutral-700">
                    <Plus className="h-4 w-4" /> Agregar Gol
                  </button>
                </div>
                {goals.map((goal, idx) => (
                  <div key={idx} className="grid gap-3 sm:grid-cols-[1.5fr_1fr_80px_auto]">
                    <input
                      placeholder="Jugador"
                      value={goal.player}
                      onChange={(e) => updateGoal(idx, "player", e.target.value)}
                      className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2"
                    />
                    <select value={goal.team} onChange={(e) => updateGoal(idx, "team", e.target.value)} className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2">
                      <option value="home">{selectedMatch.homeTeam}</option>
                      <option value="away">{selectedMatch.awayTeam}</option>
                    </select>
                    <input
                      placeholder="Min"
                      value={goal.minute}
                      onChange={(e) => updateGoal(idx, "minute", e.target.value)}
                      className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2"
                    />
                    <button type="button" onClick={() => removeGoal(idx)} className="rounded-lg bg-neutral-800 p-2 hover:bg-neutral-700">
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                    <h2 className="text-lg font-semibold">Amonestaciones y Sanciones</h2>
                  </div>
                  <button type="button" onClick={addCard} className="flex items-center gap-1 rounded-lg bg-neutral-800 px-3 py-1 text-sm hover:bg-neutral-700">
                    <Plus className="h-4 w-4" /> Agregar Tarjeta
                  </button>
                </div>
                {cards.length === 0 && <p className="text-sm text-neutral-500">Sin tarjetas registradas</p>}
                {cards.map((card, idx) => (
                  <div key={idx} className="grid gap-3 sm:grid-cols-[1.5fr_1fr_1fr_auto]">
                    <input
                      placeholder="Jugador"
                      value={card.player}
                      onChange={(e) => updateCard(idx, "player", e.target.value)}
                      className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2"
                    />
                    <select value={card.team} onChange={(e) => updateCard(idx, "team", e.target.value)} className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2">
                      <option value="home">{selectedMatch.homeTeam}</option>
                      <option value="away">{selectedMatch.awayTeam}</option>
                    </select>
                    <select value={card.type} onChange={(e) => updateCard(idx, "type", e.target.value)} className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2">
                      <option value="amarilla">Tarjeta Amarilla (TA)</option>
                      <option value="roja">Tarjeta Roja (TR)</option>
                    </select>
                    <button type="button" onClick={() => removeCard(idx)} className="rounded-lg bg-neutral-800 p-2 hover:bg-neutral-700">
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <p className="text-xs text-neutral-500">Se aplicará Fair Play (tarjetas) al recálculo de posiciones.</p>
              </div>

              <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold hover:bg-red-700 disabled:opacity-50">
                <Save className="h-5 w-5" />
                {loading ? "Guardando..." : "Finalizar Partido y Actualizar Tablas"}
              </button>
            </>
          )}
        </form>
      </main>
    </div>
  );
}
