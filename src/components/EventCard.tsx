"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { useLanguage, pick } from "@/lib/language-context";

export type EventCardData = {
  id: number;
  title: string;
  titleBn: string | null;
  description: string;
  descriptionBn: string | null;
  eventDate: Date | string;
  location: string | null;
  image: string | null;
};

export default function EventCard({ item }: { item: EventCardData }) {
  const { locale } = useLanguage();
  const title = pick(locale, item.title, item.titleBn);
  const d = new Date(item.eventDate);

  const day = new Intl.DateTimeFormat(locale === "bn" ? "bn-BD" : "en-US", { day: "numeric" }).format(d);
  const month = new Intl.DateTimeFormat(locale === "bn" ? "bn-BD" : "en-US", { month: "short" }).format(d);

  return (
    <Link href={`/events/${item.id}`} className="card group flex flex-col h-full">
      <div className="relative aspect-[16/10] bg-[var(--color-paper-warm)] overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
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
        <div className="absolute top-3 left-3 bg-[var(--color-gold)] text-[var(--color-forest-dark)] rounded-lg px-2.5 py-1.5 text-center leading-none shadow">
          <div className="font-display font-bold text-lg">{day}</div>
          <div className="text-[10px] uppercase font-semibold tracking-wide">{month}</div>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 className="font-display text-lg font-semibold leading-snug group-hover:text-[var(--color-forest)] transition-colors">
          {title}
        </h3>
        {item.location && (
          <span className="flex items-center gap-1.5 text-sm text-[var(--color-ink)]/60">
            <MapPin size={14} /> {item.location}
          </span>
        )}
      </div>
    </Link>
  );
}
