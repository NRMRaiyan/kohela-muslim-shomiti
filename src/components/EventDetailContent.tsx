"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock } from "lucide-react";
import { useLanguage, pick } from "@/lib/language-context";
import { formatDateTime } from "@/lib/format-date";

export type EventDetail = {
  title: string;
  titleBn: string | null;
  description: string;
  descriptionBn: string | null;
  eventDate: Date | string;
  location: string | null;
  image: string | null;
  registrationInfo: string | null;
};

export default function EventDetailContent({ item }: { item: EventDetail }) {
  const { locale, t } = useLanguage();
  const title = pick(locale, item.title, item.titleBn);
  const desc = pick(locale, item.description, item.descriptionBn);

  return (
    <article className="container-page py-14 sm:py-20 max-w-3xl">
      <Link
        href="/events"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-forest)] hover:text-[var(--color-gold)] mb-8"
      >
        <ArrowLeft size={15} /> {t("nav_events")}
      </Link>

      {item.image && (
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8 bg-[var(--color-paper-warm)]">
          <Image src={item.image} alt={title} fill className="object-cover" sizes="768px" />
        </div>
      )}

      <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">{title}</h1>

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--color-ink)]/70 mt-4">
        <span className="flex items-center gap-1.5">
          <Clock size={15} /> {formatDateTime(item.eventDate, locale)}
        </span>
        {item.location && (
          <span className="flex items-center gap-1.5">
            <MapPin size={15} /> {item.location}
          </span>
        )}
      </div>

      <div className="mt-8 text-[16px] leading-relaxed text-[var(--color-ink)]/85 whitespace-pre-line">
        {desc}
      </div>

      {item.registrationInfo && (
        <div className="mt-8 p-5 rounded-xl bg-[var(--color-paper-warm)] border border-[var(--color-sage-line)]">
          <h2 className="font-semibold mb-1.5">Registration</h2>
          <p className="text-sm text-[var(--color-ink)]/75 whitespace-pre-line">
            {item.registrationInfo}
          </p>
        </div>
      )}
    </article>
  );
}
