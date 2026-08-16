"use client";

import Link from "next/link";
import { Download, ArrowLeft } from "lucide-react";
import { useLanguage, pick } from "@/lib/language-context";
import { formatDate } from "@/lib/format-date";

export type NoticeDetail = {
  title: string;
  titleBn: string | null;
  description: string;
  descriptionBn: string | null;
  attachmentUrl: string | null;
  publishedBy: string | null;
  createdAt: Date | string;
};

export default function NoticeDetailContent({ item }: { item: NoticeDetail }) {
  const { locale, t } = useLanguage();
  const title = pick(locale, item.title, item.titleBn);
  const desc = pick(locale, item.description, item.descriptionBn);

  return (
    <article className="container-page py-14 sm:py-20 max-w-2xl">
      <Link
        href="/notices"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-forest)] hover:text-[var(--color-gold)] mb-8"
      >
        <ArrowLeft size={15} /> {t("nav_notices")}
      </Link>

      <h1 className="text-2xl sm:text-3xl font-semibold leading-tight">{title}</h1>
      <div className="flex items-center gap-3 text-sm text-[var(--color-ink)]/55 mt-4">
        <span>{formatDate(item.createdAt, locale)}</span>
        {item.publishedBy && (
          <>
            <span aria-hidden="true">·</span>
            <span>
              {t("published_by")}: {item.publishedBy}
            </span>
          </>
        )}
      </div>

      <div className="mt-8 text-[16px] leading-relaxed text-[var(--color-ink)]/85 whitespace-pre-line">
        {desc}
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
