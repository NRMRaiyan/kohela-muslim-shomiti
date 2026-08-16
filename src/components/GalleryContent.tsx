"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useLanguage, pick } from "@/lib/language-context";
import EmptyState from "./EmptyState";

export type GalleryItem = {
  id: number;
  image: string;
  caption: string | null;
  captionBn: string | null;
  category: string;
};

export default function GalleryContent({ items }: { items: GalleryItem[] }) {
  const { t, locale } = useLanguage();
  const [active, setActive] = useState<string>("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(items.map((i) => i.category)))],
    [items]
  );

  const filtered = active === "all" ? items : items.filter((i) => i.category === active);

  return (
    <div className="container-page py-14 sm:py-20">
      <span className="eyebrow">{t("nav_gallery")}</span>
      <h1 className="text-3xl sm:text-4xl font-semibold mt-2 mb-8">{t("gallery_title")}</h1>

      {items.length === 0 ? (
        <EmptyState message={t("no_items")} />
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                  active === c
                    ? "bg-[var(--color-forest)] text-white border-[var(--color-forest)]"
                    : "border-[var(--color-sage-line)] text-[var(--color-forest)] hover:bg-[var(--color-paper-warm)]"
                }`}
              >
                {c === "all" ? t("all_categories") : c}
              </button>
            ))}
          </div>

          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
            {filtered.map((item) => {
              const caption = pick(locale, item.caption, item.captionBn);
              return (
                <button
                  key={item.id}
                  onClick={() => setLightbox(item)}
                  className="mb-4 block w-full break-inside-avoid rounded-xl overflow-hidden relative group"
                >
                  <Image
                    src={item.image}
                    alt={caption || item.category}
                    width={500}
                    height={500}
                    className="w-full h-auto object-cover group-hover:opacity-90 transition-opacity"
                  />
                  {caption && (
                    <span className="absolute bottom-0 left-0 right-0 bg-black/55 text-white text-xs px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity text-left">
                      {caption}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-5 right-5 text-white/80 hover:text-white"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={lightbox.image}
                alt={pick(locale, lightbox.caption, lightbox.captionBn) || lightbox.category}
                fill
                className="object-contain"
              />
            </div>
            {(lightbox.caption || lightbox.captionBn) && (
              <p className="text-white/85 text-center mt-3 text-sm">
                {pick(locale, lightbox.caption, lightbox.captionBn)}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
