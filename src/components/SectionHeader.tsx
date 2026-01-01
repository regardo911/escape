import { clsx } from "clsx";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({ eyebrow, title, description, className }: SectionHeaderProps) {
  return (
    <div className={clsx("space-y-2", className)}>
      <p className="text-xs uppercase tracking-[0.2em] text-ink-700">{eyebrow}</p>
      <h2 className="text-2xl text-ink-900">{title}</h2>
      {description ? <p className="text-sm text-ink-700">{description}</p> : null}
    </div>
  );
}
