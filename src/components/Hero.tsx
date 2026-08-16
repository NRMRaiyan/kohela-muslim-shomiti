"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import ArchDivider from "./ArchDivider";

export default function Hero({
  nameEn,
  nameBn,
  tagline,
  taglineBn,
  heroImageUrl,
}: {
  nameEn: string;
  nameBn: string;
  tagline: string;
  taglineBn: string;
  heroImageUrl?: string | null;
}) {
  const { t, locale } = useLanguage();
  const name = locale === "bn" ? nameBn : nameEn;
  const tag = locale === "bn" ? taglineBn : tagline;

  return (
    <section className="relative arch-clip-bottom bg-[var(--color-forest)] text-white overflow-hidden">
      {/* subtle geometric backdrop, mosque-lattice inspired */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.09] pointer-events-none"
        aria-hidden="true"
      >
        <pattern id="lattice" width="46" height="46" patternUnits="userSpaceOnUse">
          <path
            d="M23 2 L44 23 L23 44 L2 23 Z"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#lattice)" />
      </svg>

      {heroImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${heroImageUrl})` }}
          aria-hidden="true"
        />
      )}

      <div className="relative container-page pt-16 pb-28 sm:pt-24 sm:pb-36 text-center">
        <span className="eyebrow inline-block mb-5">
          {locale === "bn" ? "যোহেলা, বাংলাদেশ" : "Kohela, Bangladesh"}
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-semibold leading-tight max-w-3xl mx-auto">
          {name}
        </h1>
        <p className="mt-5 text-base sm:text-lg text-white/85 max-w-xl mx-auto leading-relaxed">
          {tag}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href="/news" className="btn-primary">
            {t("hero_cta_news")}
          </Link>
          <Link href="/contact" className="btn-outline">
            {t("hero_cta_contact")}
          </Link>
        </div>
      </div>
    </section>
  );
}
