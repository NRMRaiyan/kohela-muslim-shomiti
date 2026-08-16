"use client";

import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { deleteGalleryItem } from "./actions";

type GalleryRow = {
  id: number;
  image: string;
  caption: string | null;
  category: string;
};

export default function GalleryGrid({ items }: { items: GalleryRow[] }) {
  const [pending, startTransition] = useTransition();

  if (items.length === 0) {
    return (
      <div className="card p-10 text-center text-sm text-[var(--color-ink)]/55">
        No photos yet. Click &ldquo;Add new&rdquo; to upload one.
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.id} className="card overflow-hidden group relative">
          <div className="relative aspect-square bg-[var(--color-paper-warm)]">
            <Image src={item.image} alt={item.caption || item.category} fill className="object-cover" />
          </div>
          <div className="p-3">
            <p className="text-xs font-semibold text-[var(--color-ink)]/70 truncate">{item.category}</p>
            {item.caption && (
              <p className="text-xs text-[var(--color-ink)]/50 truncate mt-0.5">{item.caption}</p>
            )}
          </div>
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link
              href={`/admin/gallery/${item.id}/edit`}
              className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-[var(--color-forest)] shadow"
              aria-label="Edit"
            >
              <Pencil size={13} />
            </Link>
            <button
              onClick={() => {
                if (confirm("Delete this photo?")) startTransition(() => deleteGalleryItem(item.id));
              }}
              disabled={pending}
              className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-[var(--color-brick)] shadow disabled:opacity-50"
              aria-label="Delete"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
