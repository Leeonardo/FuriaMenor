import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get("admin_auth")?.value !== "true") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { events } = await request.json();

    // Insert into match_events (card_type: yellow_card/red_card)
    // Update team fair play: TA, TR counters
    // Calculate suspensions: >=3 yellow cards -> suspended next match; red card/double yellow -> suspended next match
    // Apply as tiebreaker in standings: lower TA+TR better

    return NextResponse.json({ success: true, count: events?.length || 0 });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
