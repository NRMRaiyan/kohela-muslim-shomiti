"use client";

import { useLanguage, pick } from "@/lib/language-context";

type Settings = {
  societyNameEn: string;
  societyNameBn: string;
  history: string | null;
  historyBn: string | null;
  mission: string | null;
  missionBn: string | null;
  vision: string | null;
  visionBn: string | null;
};

export default function AboutContent({ settings }: { settings: Settings }) {
  const { t, locale } = useLanguage();
  const name = pick(locale, settings.societyNameEn, settings.societyNameBn);

  const blocks = [
    { key: "history", label: t("history"), text: pick(locale, settings.history, settings.historyBn) },
    { key: "mission", label: t("mission"), text: pick(locale, settings.mission, settings.missionBn) },
    { key: "vision", label: t("vision"), text: pick(locale, settings.vision, settings.visionBn) },
  ];

  return (
    <div className="container-page py-14 sm:py-20 max-w-3xl">
      <span className="eyebrow">{t("nav_about")}</span>
      <h1 className="text-3xl sm:text-4xl font-semibold mt-2 mb-8">{t("about_title")}</h1>
      <p className="text-lg text-[var(--color-ink)]/75 mb-10 leading-relaxed">{name}</p>

      <div className="flex flex-col gap-10">
        {blocks.map(
          (b) =>
            b.text && (
              <div key={b.key}>
                <h2 className="text-xl font-semibold text-[var(--color-forest)] mb-2">{b.label}</h2>
                <p className="text-[15px] leading-relaxed text-[var(--color-ink)]/80 whitespace-pre-line">
                  {b.text}
                </p>
              </div>
            )
        )}
      </div>
    </div>
  );
}
