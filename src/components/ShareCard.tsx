"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { copy } from "@/lib/copy";

export function ShareCard({ score, verdict }: { score: number; verdict: string }) {
  const [copied, setCopied] = useState(false);
  const shareLine = copy.shareLines[0];
  const text = `${verdict} — ${score} / 100\n${shareLine}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Card className="space-y-4">
      <p className="text-sm text-ink-700">{shareLine}</p>
      <Button onClick={handleCopy}>{copied ? "Copied" : "Copy to clipboard"}</Button>
    </Card>
  );
}
