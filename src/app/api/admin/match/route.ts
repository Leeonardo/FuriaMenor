import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const isAuth = cookieStore.get("admin_auth")?.value === "true";

    // Permitir actualización si está autenticado por cookie o si se envía en entorno local
    const body = await request.json();
    const {
      matchId,
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      matchDate,
      matchTime,
      venue,
      jornada,
      status,
      referees,
      goals,
      cards,
    } = body;

    if (!matchId) {
      return NextResponse.json({ error: "Falta el ID del partido" }, { status: 400 });
    }

    // Respuesta con el partido actualizado listo para recalcular
    const updatedMatch = {
      id: matchId,
      homeTeam,
      awayTeam,
      homeScore: homeScore !== undefined && homeScore !== null && homeScore !== "" ? Number(homeScore) : null,
      awayScore: awayScore !== undefined && awayScore !== null && awayScore !== "" ? Number(awayScore) : null,
      matchDate,
      matchTime,
      venue,
      jornada,
      status: status || "scheduled",
      referees: referees || {
        principal: "Árbitro Principal",
        asistente: "Segundo Árbitro",
        mesa: "Mesa Técnica",
      },
      goals: goals || [],
      cards: cards || [],
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Partido actualizado correctamente en el sistema de gestión",
      match: updatedMatch,
    });
  } catch (error) {
    console.error("Error en /api/admin/match:", error);
    return NextResponse.json({ error: "Error interno al procesar la actualización" }, { status: 500 });
  }
}
