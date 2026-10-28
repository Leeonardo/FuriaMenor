import { NextRequest, NextResponse } from "next/server";
import { torneoDaerisMatches } from "@/data/daeris/calendario";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get("admin_auth")?.value !== "true") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { matchId, homeScore, awayScore, goals } = await request.json();

    // Update match in memory (for demo/static data)
    const matchIndex = torneoDaerisMatches.findIndex((m) => m.id === matchId);
    if (matchIndex !== -1) {
      torneoDaerisMatches[matchIndex].homeScore = homeScore;
      torneoDaerisMatches[matchIndex].awayScore = awayScore;
      torneoDaerisMatches[matchIndex].status = "finished";
    }

    // Here you would update Supabase/Postgres tables
    // For now, data is updated in memory for the session

    return NextResponse.json({ success: true, matchId, homeScore, awayScore });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
