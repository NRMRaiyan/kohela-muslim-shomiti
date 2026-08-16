"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { dictionary, Locale, DictKey } from "./dictionary";

type LanguageContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: DictKey) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("kms_locale") as Locale | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading persisted locale after mount is intentional (localStorage is unavailable during SSR)
    if (saved === "en" || saved === "bn") setLocaleState(saved);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem("kms_locale", l);
  };

  const t = (key: DictKey) => dictionary[locale][key];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      <div lang={locale} className={locale === "bn" ? "font-bengali" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

// Helper to pick the right field for content that has an EN/BN pair,
// falling back to English when the Bangla field is empty.
export function pick(
  locale: Locale,
  en: string | null | undefined,
  bn: string | null | undefined
) {
  if (locale === "bn" && bn && bn.trim().length > 0) return bn;
  return en ?? "";
}
