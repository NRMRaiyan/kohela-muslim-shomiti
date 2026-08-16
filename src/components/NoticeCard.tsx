"use client";

import Link from "next/link";
import { FileText, Paperclip } from "lucide-react";
import { useLanguage, pick } from "@/lib/language-context";
import { formatDate } from "@/lib/format-date";

export type NoticeCardData = {
  id: number;
  title: string;
  titleBn: string | null;
  description: string;
  descriptionBn: string | null;
  attachmentUrl: string | null;
  createdAt: Date | string;
};

export default function NoticeCard({ item }: { item: NoticeCardData }) {
  const { locale } = useLanguage();
  const title = pick(locale, item.title, item.titleBn);
  const desc = pick(locale, item.description, item.descriptionBn);

  return (
    <Link
      href={`/notices/${item.id}`}
      className="flex gap-4 items-start p-4 rounded-xl border border-[var(--color-sage-line)] bg-[var(--color-cream-card)] hover:border-[var(--color-gold)] transition-colors"
    >
      <div className="w-10 h-10 rounded-full bg-[var(--color-brick)]/10 text-[var(--color-brick)] flex items-center justify-center shrink-0">
        <FileText size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-[15px] leading-snug">{title}</h3>
          {item.attachmentUrl && <Paperclip size={13} className="text-[var(--color-ink)]/40 shrink-0" />}
        </div>
        <p className="text-sm text-[var(--color-ink)]/65 line-clamp-1 mt-0.5">{desc}</p>
        <span className="text-xs text-[var(--color-ink)]/45 mt-1 inline-block">
          {formatDate(item.createdAt, locale)}
        </span>
      </div>
    </Link>
  );
}
