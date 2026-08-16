import Link from "next/link";

export default function SectionHeading({
  eyebrow,
  title,
  viewAllHref,
  viewAllLabel,
}: {
  eyebrow: string;
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-8">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="text-2xl sm:text-3xl font-semibold mt-1.5">{title}</h2>
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="hidden sm:inline-block text-sm font-semibold text-[var(--color-forest)] hover:text-[var(--color-gold)] whitespace-nowrap"
        >
          {viewAllLabel} →
        </Link>
      )}
    </div>
  );
}
