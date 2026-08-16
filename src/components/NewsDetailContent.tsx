"use client";

import Image from "next/image";
import Link from "next/link";
import { Download, ArrowLeft } from "lucide-react";
import { useLanguage, pick } from "@/lib/language-context";
import { formatDate } from "@/lib/format-date";

export type NewsDetail = {
  slug: string;
  title: string;
  titleBn: string | null;
  content: string;
  contentBn: string | null;
  featuredImage: string | null;
  author: string | null;
  attachmentUrl: string | null;
  createdAt: Date | string;
};

export default function NewsDetailContent({ item }: { item: NewsDetail }) {
  const { locale, t } = useLanguage();
  const title = pick(locale, item.title, item.titleBn);
  const content = pick(locale, item.content, item.contentBn);

  return (
    <article className="container-page py-14 sm:py-20 max-w-3xl">
      <Link
        href="/news"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-forest)] hover:text-[var(--color-gold)] mb-8"
      >
        <ArrowLeft size={15} /> {t("nav_news")}
      </Link>

      <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">{title}</h1>
      <div className="flex items-center gap-3 text-sm text-[var(--color-ink)]/55 mt-4">
        <span>{formatDate(item.createdAt, locale)}</span>
        {item.author && (
          <>
            <span aria-hidden="true">·</span>
            <span>
              {t("by")} {item.author}
            </span>
          </>
        )}
      </div>

      {item.featuredImage && (
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden mt-8 bg-[var(--color-paper-warm)]">
          <Image src={item.featuredImage} alt={title} fill className="object-cover" sizes="768px" />
        </div>
      )}

      <div className="prose-content mt-8 text-[16px] leading-relaxed text-[var(--color-ink)]/85 whitespace-pre-line">
        {content}
      </div>

      {item.attachmentUrl && (
        <a
          href={item.attachmentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 btn-primary"
        >
          <Download size={16} /> {t("download")} {t("attachment")}
        </a>
      )}
    </article>
  );
}
