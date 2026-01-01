import Link from "next/link";
import { clsx } from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
};

export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  className,
  disabled
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-ink-900 text-white hover:bg-ink-800"
      : "border border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white";

  if (href) {
    return (
      <Link href={href} className={clsx(base, styles, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(base, styles, className)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
