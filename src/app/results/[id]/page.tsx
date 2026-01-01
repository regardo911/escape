import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { copy } from "@/lib/copy";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { ShareCard } from "@/components/ShareCard";

export default async function ResultsPage({ params }: { params: { id: string } }) {
  const assessment = await prisma.assessment.findUnique({
    where: { id: params.id },
    include: { result: true }
  });

  if (!assessment || !assessment.result) {
    notFound();
  }

  const { result } = assessment;

  return (
    <div className="space-y-10">
      <Card className="space-y-6">
        <p className="text-sm uppercase tracking-[0.2em] text-ink-700">{copy.results.verdictHeaderExample}</p>
        <h1 className="text-4xl text-ink-900">{result.verdict}</h1>
        <p className="whitespace-pre-line text-sm text-ink-700">{copy.results.subheader}</p>
        <div className="rounded-2xl bg-haze p-4">
          <p className="text-lg font-semibold text-ink-900">Residency Risk Score: {result.score} / 100</p>
          <p className="text-xs text-ink-700">{copy.results.riskScoreSmall}</p>
        </div>
        <p className="text-sm text-ink-700">{copy.results.uxTranslation}</p>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="space-y-4">
          <SectionHeader eyebrow={copy.results.whyHeader} title={copy.results.primaryDrivers} />
          <ul className="space-y-3 text-sm text-ink-700">
            {result.drivers.map((driver: { explanation: string }) => (
              <li key={driver.explanation}>• {driver.explanation}</li>
            ))}
          </ul>
          <SectionHeader
            eyebrow={copy.results.translationHeader}
            title={copy.results.translation}
          />
        </Card>
        <ShareCard score={result.score} verdict={result.verdict} />
      </div>

      <Card className="space-y-6">
        <SectionHeader eyebrow={copy.results.tradeoffHeader} title={copy.results.tradeoffIntro} />
        <p className="text-sm text-ink-700">{copy.results.tradeoffListIntro}</p>
        <ul className="space-y-2 text-sm text-ink-700">
          {copy.results.tradeoffList.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
        <p className="whitespace-pre-line text-sm text-ink-700">{copy.results.tradeoffOutro}</p>
      </Card>

      <Card className="space-y-4">
        <SectionHeader eyebrow={copy.results.financialHeader} title={copy.results.financialTitle} />
        <p className="text-sm text-ink-700">{copy.results.financialBody}</p>
        <p className="text-xs text-ink-700">{copy.results.financialSmall}</p>
      </Card>

      <Card className="space-y-4">
        <SectionHeader eyebrow={copy.results.nextStepsHeader} title={copy.results.nextStepsBody} />
        <p className="text-sm text-ink-700">{copy.results.nextStepsIntro}</p>
        <ul className="space-y-2 text-sm text-ink-700">
          {copy.results.nextStepsList.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
        <p className="text-sm text-ink-700">{copy.results.nextStepsOutro}</p>
      </Card>

      <Card className="text-xs text-ink-700">
        {copy.disclaimer}
      </Card>
    </div>
  );
}
