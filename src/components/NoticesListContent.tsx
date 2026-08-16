"use client";

import { useLanguage } from "@/lib/language-context";
import EmptyState from "./EmptyState";
import NoticeCard, { NoticeCardData } from "./NoticeCard";

export default function NoticesListContent({ items }: { items: NoticeCardData[] }) {
  const { t } = useLanguage();
  return (
    <div className="container-page py-14 sm:py-20 max-w-3xl">
      <span className="eyebrow">{t("nav_notices")}</span>
      <h1 className="text-3xl sm:text-4xl font-semibold mt-2 mb-10">{t("notices_title")}</h1>
      {items.length === 0 ? (
        <EmptyState message={t("no_items")} />
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((n) => (
            <NoticeCard key={n.id} item={n} />
          ))}
        </div>
      )}
    </div>
  );
}
