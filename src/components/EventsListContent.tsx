"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import EmptyState from "./EmptyState";
import EventCard, { EventCardData } from "./EventCard";

export default function EventsListContent({
  upcoming,
  past,
}: {
  upcoming: EventCardData[];
  past: EventCardData[];
}) {
  const { t } = useLanguage();
  const [tab, setTab] = useState<"upcoming" | "previous">("upcoming");
  const items = tab === "upcoming" ? upcoming : past;

  return (
    <div className="container-page py-14 sm:py-20">
      <span className="eyebrow">{t("nav_events")}</span>
      <h1 className="text-3xl sm:text-4xl font-semibold mt-2 mb-8">{t("events_title")}</h1>

      <div className="inline-flex rounded-full border border-[var(--color-sage-line)] mb-10 overflow-hidden">
        <button
          onClick={() => setTab("upcoming")}
          className={`px-5 py-2 text-sm font-semibold transition-colors ${
            tab === "upcoming"
              ? "bg-[var(--color-forest)] text-white"
              : "text-[var(--color-forest)] hover:bg-[var(--color-paper-warm)]"
          }`}
        >
          {t("upcoming")} ({upcoming.length})
        </button>
        <button
          onClick={() => setTab("previous")}
          className={`px-5 py-2 text-sm font-semibold transition-colors ${
            tab === "previous"
              ? "bg-[var(--color-forest)] text-white"
              : "text-[var(--color-forest)] hover:bg-[var(--color-paper-warm)]"
          }`}
        >
          {t("previous")} ({past.length})
        </button>
      </div>

      {items.length === 0 ? (
        <EmptyState message={t("no_items")} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((e) => (
            <EventCard key={e.id} item={e} />
          ))}
        </div>
      )}
    </div>
  );
}
