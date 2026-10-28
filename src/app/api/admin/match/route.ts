import { NextRequest, NextResponse } from "next/server";
import { torneoDaerisMatches } from "@/data/daeris/calendario";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get("admin_auth")?.value !== "true") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { matchId, homeScore, awayScore, goals, cards } = await request.json();

    const matchIndex = torneoDaerisMatches.findIndex((m) => m.id === matchId);
    if (matchIndex !== -1) {
      torneoDaerisMatches[matchIndex].homeScore = homeScore;
      torneoDaerisMatches[matchIndex].awayScore = awayScore;
      torneoDaerisMatches[matchIndex].status = "finished";
    }

    // Automatic recalculation would update Supabase/Postgres:
    // - Standings: PJ, PG, PE, PP, GF, GC, DIF, PTS per team by (category, division, modality)
    // - Scorers table from goals
    // - Least conceded / clean sheets (valla invicta) when awayScore==0 or homeScore==0
    // - Fair Play from cards (TA/TR)
    // - Classification cut line based on groups/division rules

    return NextResponse.json({ success: true, matchId, homeScore, awayScore, goalsCount: goals?.length || 0, cardsCount: cards?.length || 0 });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
