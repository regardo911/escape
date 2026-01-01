import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { copy } from "@/lib/copy";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="grid gap-10 rounded-3xl bg-white p-10 shadow-sm md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl text-ink-900 md:text-5xl">{copy.hero.headline}</h1>
            <p className="text-lg text-ink-700">{copy.hero.subhead}</p>
          </div>
          <p className="whitespace-pre-line text-sm text-ink-700">{copy.hero.supporting}</p>
          <div className="space-y-2">
            <Button href="/start">{copy.hero.cta}</Button>
            <p className="text-xs text-ink-700">{copy.hero.ctaSmall}</p>
          </div>
        </div>
        <Card className="space-y-4">
          <SectionHeader eyebrow={copy.socialProof.header} title={copy.socialProof.bullets[0]} />
          <ul className="space-y-2 text-sm text-ink-700">
            {copy.socialProof.bullets.slice(1).map((line) => (
              <li key={line}>• {line}</li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <Card className="space-y-4">
          <SectionHeader eyebrow={copy.problem.header} title="“Just move to Vegas.”" />
          <p className="whitespace-pre-line text-sm text-ink-700">{copy.problem.body}</p>
        </Card>
        <Card className="space-y-6">
          <SectionHeader eyebrow={copy.value.header} title={copy.value.bullets[0]} />
          <ul className="space-y-2 text-sm text-ink-700">
            {copy.value.bullets.slice(1).map((line) => (
              <li key={line}>• {line}</li>
            ))}
          </ul>
          <div className="pt-2">
            <p className="text-xs uppercase tracking-[0.2em] text-ink-700">{copy.whoFor.header}</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-700">
              {copy.whoFor.bullets.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </div>
        </Card>
      </section>

      <section className="rounded-3xl bg-ink-900 p-10 text-white">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl">{copy.ctaSection.header}</h2>
          </div>
          <Button href="/start" variant="secondary" className="bg-white text-ink-900">
            {copy.ctaSection.cta}
          </Button>
        </div>
      </section>

      <footer className="grid gap-3 text-xs text-ink-700 md:grid-cols-2">
        {copy.shareLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </footer>
    </div>
  );
}
