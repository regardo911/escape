import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const results = await prisma.riskResult.findMany({
    orderBy: { createdAt: "desc" },
    include: { assessment: true }
  });

  return NextResponse.json(
    results.map((result) => ({
      id: result.assessmentId,
      score: result.score,
      verdict: result.verdict,
      createdAt: result.createdAt
    }))
  );
}
