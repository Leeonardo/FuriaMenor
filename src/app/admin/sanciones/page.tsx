"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, ShieldAlert, ArrowLeft, Plus, Minus } from "lucide-react";
import { CATEGORIES, MODALITIES, modalityLabels, type Category, type Modality } from "@/data/daeris";
import { torneoDaerisMatches } from "@/data/daeris/calendario";

const DIVISIONS = ["1era División", "2da División"] as const;
type Division = (typeof DIVISIONS)[number];

interface CardEvent {
  id: string;
  matchId: string;
  team: "home" | "away";
  player: string;
  cardType: "amarilla" | "roja";
  minute: string;
}

const teamCards: Record<string, { ta: number; tr: number }> = {};

export default function SancionesPage() {
  const [category, setCategory] = useState<Category | "all">("all");
  const [division, setDivision] = useState<Division | "all">("all");
  const [modality, setModality] = useState<Modality | "all">("all");
  const [selectedMatchId, setSelectedMatchId] = useState("");
  const [events, setEvents] = useState<CardEvent[]>([]);
  const [player, setPlayer] = useState("");
  const [team, setTeam] = useState<"home" | "away">("home");
  const [cardType, setCardType] = useState<"amarilla" | "roja">("amarilla");
  const [minute, setMinute] = useState("");
  const [loading, setLoading] = useState(false);

  const matches = torneoDaerisMatches.filter((m) => {
    const matchCategory = category === "all" || m.category === category;
    const matchModality = modality === "all" || m.modality === modality;
    const matchDivision = division === "all" || m.division === division;
    return matchCategory && matchModality && matchDivision;
  });

  const selectedMatch = torneoDaerisMatches.find((m) => m.id === selectedMatchId);

  const addEvent = () => {
    if (!player.trim() || !selectedMatchId) return;
    const newEvent: CardEvent = {
      id: `${Date.now()}`,
      matchId: selectedMatchId,
      team,
      player: player.trim(),
      cardType,
      minute,
    };
    setEvents([...events, newEvent]);
    setPlayer("");
    setMinute("");
  };

  const removeEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetch("/api/admin/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ events }),
      });
      alert("Sanciones registradas. Fair Play actualizado y suspensiones calculadas.");
    } catch {
      alert("Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  // Mock suspensiones
  const suspensiones = [
    { jugador: "M. Rojas", equipo: "TETSU FUTSAL", motivo: "Acumulación de 3 tarjetas amarillas", estado: "Suspendido para la próxima fecha" },
    { jugador: "L. Vargas", equipo: "LA PAZ FUTSAL", motivo: "Tarjeta roja directa", estado: "Suspendido para la próxima fecha" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Furia Menor" width={40} height={40} className="object-contain" />
            <div>
              <p className="text-sm font-semibold">Furia Menor</p>
              <p className="text-xs text-neutral-400">Sanciones, Tarjetas y Fair Play</p>
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
            <ShieldAlert className="h-5 w-5" />
            <span className="text-sm">Control Disciplinario</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Módulo de Sanciones</h1>
          <p className="mt-2 text-neutral-400">Registro de TA/TR, Fair Play y control de suspensiones</p>
        </div>

        <div className="mb-6 grid gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:grid-cols-3">
          <select value={category} onChange={(e) => setCategory(e.target.value as Category | "all")} className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm">
            <option value="all">Categoría</option>
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
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60">
            <div className="border-b border-neutral-800 p-4">
              <h2 className="font-semibold">Seleccionar Partido</h2>
            </div>
            <div className="divide-y divide-neutral-800/60 max-h-[400px] overflow-y-auto">
              {matches.map((match) => (
                <button
                  key={match.id}
                  onClick={() => setSelectedMatchId(match.id)}
                  className={`w-full p-4 text-left hover:bg-neutral-800/30 ${selectedMatchId === match.id ? "bg-red-500/10" : ""}`}
                >
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">{match.homeTeam} vs {match.awayTeam}</p>
                    <span className="text-xs text-neutral-400">{match.category} • {match.division}</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-500">{match.matchDate} {match.matchTime}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60">
            <div className="border-b border-neutral-800 p-4">
              <h2 className="font-semibold">Registrar Amonestaciones</h2>
              <p className="text-sm text-neutral-400">TA / TR por jugador</p>
            </div>
            {selectedMatch ? (
              <div className="p-4 space-y-4">
                <div className="rounded-lg bg-neutral-950/60 p-3 text-center text-sm">
                  <p className="font-medium">{selectedMatch.homeTeam} vs {selectedMatch.awayTeam}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input placeholder="Jugador" value={player} onChange={(e) => setPlayer(e.target.value)} className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2" />
                  <input placeholder="Minuto" value={minute} onChange={(e) => setMinute(e.target.value)} className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <select value={team} onChange={(e) => setTeam(e.target.value as "home" | "away")} className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2">
                    <option value="home">{selectedMatch.homeTeam}</option>
                    <option value="away">{selectedMatch.awayTeam}</option>
                  </select>
                  <select value={cardType} onChange={(e) => setCardType(e.target.value as "amarilla" | "roja")} className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2">
                    <option value="amarilla">Tarjeta Amarilla (TA)</option>
                    <option value="roja">Tarjeta Roja (TR)</option>
                  </select>
                </div>
                <button onClick={addEvent} className="w-full flex items-center justify-center gap-2 rounded-lg bg-neutral-800 px-4 py-2 hover:bg-neutral-700">
                  <Plus className="h-4 w-4" />
                  Agregar Incidencia
                </button>
                {events.length > 0 && (
                  <div className="space-y-2">
                    {events.map((ev) => (
                      <div key={ev.id} className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-950/60 p-3">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className={`h-4 w-4 ${ev.cardType === "roja" ? "text-red-500" : "text-amber-400"}`} />
                          <div>
                            <p className="text-sm font-medium">{ev.player}</p>
                            <p className="text-xs text-neutral-400">{ev.cardType === "roja" ? "Tarjeta Roja" : "Tarjeta Amarilla"} {ev.minute && `• ${ev.minute}'`}</p>
                          </div>
                        </div>
                        <button onClick={() => removeEvent(ev.id)} className="text-neutral-400 hover:text-white">
                          <Minus className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button onClick={handleSave} disabled={loading} className="w-full rounded-lg bg-red-600 px-4 py-2 font-semibold hover:bg-red-700 disabled:opacity-50">
                      {loading ? "Guardando..." : "Guardar Sanciones y Actualizar Fair Play"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 text-center text-neutral-400">
                <p className="text-sm">Selecciona un partido para registrar tarjetas</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-900/60">
          <div className="flex items-center gap-2 border-b border-neutral-800 p-4">
            <ShieldAlert className="h-5 w-5 text-red-400" />
            <h2 className="font-semibold">Suspendidos para la Próxima Fecha</h2>
          </div>
          <div className="divide-y divide-neutral-800/60">
            {suspensiones.map((s, idx) => (
              <div key={idx} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{s.jugador}</p>
                  <p className="text-sm text-neutral-400">{s.equipo} • {s.motivo}</p>
                </div>
                <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400 border border-red-500/40">{s.estado}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
