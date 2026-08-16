"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { navLinks } from "@/lib/site-config";

type Settings = {
  societyNameEn: string;
  societyNameBn: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  whatsappUrl: string | null;
};

export default function Footer({ settings }: { settings: Settings }) {
  const { t, locale } = useLanguage();
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const name = locale === "bn" ? settings.societyNameBn : settings.societyNameEn;
  const year = new Date().getFullYear();

  const socials = [
    { url: settings.facebookUrl, label: "Facebook", short: "f" },
    { url: settings.instagramUrl, label: "Instagram", short: "IG" },
    { url: settings.youtubeUrl, label: "YouTube", short: "YT" },
    { url: settings.whatsappUrl, label: "WhatsApp", short: "" },
  ].filter((s) => s.url) as { url: string; label: string; short: string }[];

  return (
    <footer className="mt-20 bg-[var(--color-forest-dark)] text-white/85">
      <div className="container-page py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-xl text-white mb-3">{name}</div>
          <p className="text-sm leading-relaxed text-white/70">
            {locale === "bn"
              ? "আমাদের সমাজের সরকারি তথ্যকেন্দ্র।"
              : "The official information hub of our community."}
          </p>
          {socials.length > 0 && (
            <div className="flex gap-3 mt-4">
              {socials.map(({ url, label, short }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-[var(--color-forest-dark)] transition-colors text-xs font-bold"
                >
                  {short || <MessageCircle size={16} />}
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="eyebrow mb-3">{t("quick_links")}</div>
          <ul className="space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/75 hover:text-[var(--color-gold-light)]">
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-2">
          <div className="eyebrow mb-3">{t("contact_title")}</div>
          <ul className="space-y-2.5 text-sm text-white/75">
            {settings.address && (
              <li className="flex gap-2.5 items-start">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--color-gold-light)]" />
                <span>{settings.address}</span>
              </li>
            )}
            {settings.phone && (
              <li className="flex gap-2.5 items-center">
                <Phone size={16} className="shrink-0 text-[var(--color-gold-light)]" />
                <a href={`tel:${settings.phone}`} className="hover:text-[var(--color-gold-light)]">
                  {settings.phone}
                </a>
              </li>
            )}
            {settings.email && (
              <li className="flex gap-2.5 items-center">
                <Mail size={16} className="shrink-0 text-[var(--color-gold-light)]" />
                <a href={`mailto:${settings.email}`} className="hover:text-[var(--color-gold-light)]">
                  {settings.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-page text-xs text-white/55 flex flex-col sm:flex-row gap-2 justify-between">
          <span>
            © {year} {name}. {t("footer_rights")}
          </span>
        </div>
      </div>
    </footer>
  );
}
