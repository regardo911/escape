import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { copy } from "@/lib/copy";

export default function StartPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <Card className="space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl">{copy.welcome.title}</h1>
          <p className="whitespace-pre-line text-lg text-ink-700">{copy.welcome.subtitle}</p>
        </div>
        <p className="whitespace-pre-line text-sm text-ink-700">{copy.welcome.body}</p>
        <Button href="/assessment">{copy.welcome.cta}</Button>
      </Card>
    </div>
  );
}
