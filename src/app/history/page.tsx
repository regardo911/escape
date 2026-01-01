import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/Card";
import { copy } from "@/lib/copy";

export default async function HistoryPage() {
  const results = await prisma.riskResult.findMany({
    orderBy: { createdAt: "desc" },
    include: { assessment: true }
  });

  return (
    <div className="space-y-6">
      <Card className="space-y-2">
        <h1 className="text-3xl">History</h1>
        <p className="text-sm text-ink-700">{copy.shareLines[2]}</p>
      </Card>

      <div className="grid gap-4">
        {results.length === 0 ? (
          <Card className="text-sm text-ink-700">{copy.shareLines[3]}</Card>
        ) : (
          results.map((result) => (
            <Card key={result.id} className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-ink-700">{result.verdict}</p>
                <p className="text-lg font-semibold text-ink-900">{result.score} / 100</p>
              </div>
              <Link href={`/results/${result.assessmentId}`} className="text-sm font-semibold text-ink-900">
                View
              </Link>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
