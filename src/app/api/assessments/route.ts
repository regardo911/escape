import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { scoreAssessment, type AssessmentResponse } from "@/lib/scoring";

export async function POST(request: Request) {
  const body = (await request.json()) as AssessmentResponse;

  const result = scoreAssessment(body);

  const assessment = await prisma.assessment.create({
    data: {
      responses: body,
      result: {
        create: {
          score: result.score,
          verdict: result.verdict,
          drivers: result.drivers,
          translation: result.translation
        }
      }
    },
    include: { result: true }
  });

  return NextResponse.json({ id: assessment.id });
}
