import { NextRequest, NextResponse } from "next/server";
import { persistReview, recentReviews } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { planId, whatWorked, whatFailed, lesson } = await req.json().catch(() => ({}));
  if (!whatWorked && !whatFailed && !lesson) {
    return NextResponse.json({ error: "At least one of whatWorked, whatFailed, lesson is required" }, { status: 400 });
  }
  const result = await persistReview(planId ?? null, whatWorked ?? "", whatFailed ?? "", lesson ?? "");
  if (!result.persisted) {
    return NextResponse.json({ error: result.reason }, { status: 503 });
  }
  return NextResponse.json({ saved: true });
}

export async function GET() {
  const reviews = await recentReviews();
  return NextResponse.json({ reviews });
}
