"use client";

import Link from "next/link";
import { useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function RowActions({
  editHref,
  onDelete,
  confirmMessage = "Delete this item? This can't be undone.",
}: {
  editHref?: string;
  onDelete: () => Promise<void>;
  confirmMessage?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-1.5 justify-end">
      {editHref && (
        <Link
          href={editHref}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-forest)] hover:bg-[var(--color-paper-warm)]"
          aria-label="Edit"
        >
          <Pencil size={15} />
        </Link>
      )}
      <button
        onClick={() => {
          if (confirm(confirmMessage)) startTransition(() => onDelete());
        }}
        disabled={pending}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-brick)] hover:bg-[var(--color-brick)]/10 disabled:opacity-50"
        aria-label="Delete"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
