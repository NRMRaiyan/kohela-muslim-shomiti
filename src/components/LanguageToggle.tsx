"use client";

import { useLanguage } from "@/lib/language-context";

export default function LanguageToggle({ dark = false }: { dark?: boolean }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`inline-flex rounded-full border text-sm font-semibold overflow-hidden ${
        dark ? "border-white/40" : "border-[var(--color-sage-line)]"
      }`}
      role="group"
      aria-label="Language"
    >
      <button
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`px-3 py-1.5 transition-colors ${
          locale === "en"
            ? "bg-[var(--color-gold)] text-[var(--color-forest-dark)]"
            : dark
            ? "text-white/85 hover:bg-white/10"
            : "text-[var(--color-forest)] hover:bg-[var(--color-paper-warm)]"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale("bn")}
        aria-pressed={locale === "bn"}
        className={`px-3 py-1.5 transition-colors font-bengali ${
          locale === "bn"
            ? "bg-[var(--color-gold)] text-[var(--color-forest-dark)]"
            : dark
            ? "text-white/85 hover:bg-white/10"
            : "text-[var(--color-forest)] hover:bg-[var(--color-paper-warm)]"
        }`}
      >
        বাংলা
      </button>
    </div>
  );
}
