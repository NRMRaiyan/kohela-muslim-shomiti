"use client";

import { useLanguage } from "@/lib/language-context";
import EmptyState from "./EmptyState";
import NewsCard, { NewsCardData } from "./NewsCard";

export default function NewsListContent({ items }: { items: NewsCardData[] }) {
  const { t } = useLanguage();
  return (
    <div className="container-page py-14 sm:py-20">
      <span className="eyebrow">{t("nav_news")}</span>
      <h1 className="text-3xl sm:text-4xl font-semibold mt-2 mb-10">{t("news_title")}</h1>
      {items.length === 0 ? (
        <EmptyState message={t("no_items")} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((n) => (
            <NewsCard key={n.slug} item={n} />
          ))}
        </div>
      )}
    </div>
  );
}
