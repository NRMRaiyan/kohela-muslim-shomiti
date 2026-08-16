"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage, pick } from "@/lib/language-context";
import { formatDate } from "@/lib/format-date";

export type NewsCardData = {
  slug: string;
  title: string;
  titleBn: string | null;
  shortDescription: string;
  shortDescriptionBn: string | null;
  featuredImage: string | null;
  createdAt: Date | string;
  author?: string | null;
};

export default function NewsCard({ item }: { item: NewsCardData }) {
  const { locale, t } = useLanguage();
  const title = pick(locale, item.title, item.titleBn);
  const desc = pick(locale, item.shortDescription, item.shortDescriptionBn);

  return (
    <Link href={`/news/${item.slug}`} className="card group flex flex-col h-full">
      <div className="relative aspect-[16/10] bg-[var(--color-paper-warm)] overflow-hidden">
        {item.featuredImage ? (
          <Image
            src={item.featuredImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--color-forest)]/25 font-display text-3xl">
            ক
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <span className="text-xs text-[var(--color-ink)]/50">{formatDate(item.createdAt, locale)}</span>
        <h3 className="font-display text-lg font-semibold leading-snug group-hover:text-[var(--color-forest)] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-[var(--color-ink)]/70 line-clamp-2 flex-1">{desc}</p>
        <span className="text-sm font-semibold text-[var(--color-gold)] mt-1">
          {t("read_more")} →
        </span>
      </div>
    </Link>
  );
}
