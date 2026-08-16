"use client";

import Link from "next/link";
//import image from "next/Image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { navLinks } from "@/lib/site-config";
import LanguageToggle from "./LanguageToggle";

export default function Navbar({
  societyNameEn,
  societyNameBn,
}: {
  societyNameEn: string;
  societyNameBn: string;
}) {
  const { t, locale } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isAdmin = pathname?.startsWith("/admin");
  if (isAdmin) return null;

  const name = locale === "bn" ? societyNameBn : societyNameEn;

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-forest)]/97 backdrop-blur text-white border-b border-black/10">
      <div className="container-page flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          {/* <span className="w-9 h-9 shrink-0 rounded-full bg-[var(--color-gold)] text-[var(--color-forest-dark)] flex items-center justify-center font-display font-bold text-lg">
            ক
          </span> */}
          {/* <span className="w-9 h-9 shrink-0 rounded-full overflow-hidden relative bg-[var(--color-gold)]">
            <Image src="/logo.png" alt={name} fill className="object-cover" />
          </span> */}
          <span className="font-display font-semibold text-lg leading-tight truncate">
            {name}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-[15px] font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-[var(--color-gold-light)] transition-colors ${
                pathname === link.href ? "text-[var(--color-gold-light)]" : "text-white/90"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageToggle dark />
          <Link href="/admin" className="btn-outline text-sm !py-2 !px-4">
            {t("nav_admin")}
          </Link>
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[var(--color-forest-dark)]">
          <nav className="container-page py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-white/90 hover:text-[var(--color-gold-light)] border-b border-white/10 last:border-none"
              >
                {t(link.key)}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="py-2.5 text-[var(--color-gold-light)] font-semibold"
            >
              {t("nav_admin")}
            </Link>
            <div className="pt-3">
              <LanguageToggle dark />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
