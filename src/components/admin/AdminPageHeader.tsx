import Link from "next/link";
import { Plus } from "lucide-react";

export default function AdminPageHeader({
  title,
  description,
  newHref,
  newLabel,
}: {
  title: string;
  description?: string;
  newHref?: string;
  newLabel?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && <p className="text-sm text-[var(--color-ink)]/60 mt-1">{description}</p>}
      </div>
      {newHref && (
        <Link href={newHref} className="btn-primary text-sm !py-2.5">
          <Plus size={16} /> {newLabel ?? "Add new"}
        </Link>
      )}
    </div>
  );
}
