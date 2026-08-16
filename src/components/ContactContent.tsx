"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { submitContactMessage } from "@/app/contact/actions";

type Settings = {
  address: string | null;
  phone: string | null;
  email: string | null;
  officeHours: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  whatsappUrl: string | null;
  mapEmbedUrl: string | null;
};

export default function ContactContent({ settings }: { settings: Settings }) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const socials = [
    { url: settings.facebookUrl, label: "Facebook", short: "f" },
    { url: settings.instagramUrl, label: "Instagram", short: "IG" },
    { url: settings.youtubeUrl, label: "YouTube", short: "YT" },
    { url: settings.whatsappUrl, label: "WhatsApp", short: "" },
  ].filter((s) => s.url) as { url: string; label: string; short: string }[];

  async function handleSubmit(formData: FormData) {
    setStatus("sending");
    const result = await submitContactMessage(formData);
    setStatus(result.ok ? "sent" : "error");
  }

  return (
    <div className="container-page py-14 sm:py-20">
      <span className="eyebrow">{t("nav_contact")}</span>
      <h1 className="text-3xl sm:text-4xl font-semibold mt-2 mb-10">{t("contact_title")}</h1>

      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <ul className="space-y-5">
            {settings.address && (
              <li className="flex gap-3 items-start">
                <span className="w-10 h-10 rounded-full bg-[var(--color-forest)]/10 text-[var(--color-forest)] flex items-center justify-center shrink-0">
                  <MapPin size={17} />
                </span>
                <div>
                  <div className="text-xs uppercase font-semibold text-[var(--color-ink)]/50">
                    {t("office_location")}
                  </div>
                  <div className="mt-0.5">{settings.address}</div>
                </div>
              </li>
            )}
            {settings.phone && (
              <li className="flex gap-3 items-start">
                <span className="w-10 h-10 rounded-full bg-[var(--color-forest)]/10 text-[var(--color-forest)] flex items-center justify-center shrink-0">
                  <Phone size={17} />
                </span>
                <div>
                  <div className="text-xs uppercase font-semibold text-[var(--color-ink)]/50">
                    {t("phone")}
                  </div>
                  <a href={`tel:${settings.phone}`} className="mt-0.5 inline-block hover:text-[var(--color-gold)]">
                    {settings.phone}
                  </a>
                </div>
              </li>
            )}
            {settings.email && (
              <li className="flex gap-3 items-start">
                <span className="w-10 h-10 rounded-full bg-[var(--color-forest)]/10 text-[var(--color-forest)] flex items-center justify-center shrink-0">
                  <Mail size={17} />
                </span>
                <div>
                  <div className="text-xs uppercase font-semibold text-[var(--color-ink)]/50">
                    {t("email")}
                  </div>
                  <a
                    href={`mailto:${settings.email}`}
                    className="mt-0.5 inline-block hover:text-[var(--color-gold)]"
                  >
                    {settings.email}
                  </a>
                </div>
              </li>
            )}
            {settings.officeHours && (
              <li className="flex gap-3 items-start">
                <span className="w-10 h-10 rounded-full bg-[var(--color-forest)]/10 text-[var(--color-forest)] flex items-center justify-center shrink-0">
                  <Clock size={17} />
                </span>
                <div>
                  <div className="text-xs uppercase font-semibold text-[var(--color-ink)]/50">
                    {t("office_hours")}
                  </div>
                  <div className="mt-0.5">{settings.officeHours}</div>
                </div>
              </li>
            )}
          </ul>

          {socials.length > 0 && (
            <div className="mt-8">
              <div className="text-xs uppercase font-semibold text-[var(--color-ink)]/50 mb-3">
                {t("follow_us")}
              </div>
              <div className="flex gap-3">
                {socials.map(({ url, label, short }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-[var(--color-forest)]/10 text-[var(--color-forest)] flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-white transition-colors text-xs font-bold"
                  >
                    {short || <MessageCircle size={17} />}
                  </a>
                ))}
              </div>
            </div>
          )}

          {settings.mapEmbedUrl && (
            <div className="mt-8 rounded-xl overflow-hidden border border-[var(--color-sage-line)] aspect-video">
              <iframe
                src={settings.mapEmbedUrl}
                className="w-full h-full"
                loading="lazy"
                title="Location map"
              />
            </div>
          )}
        </div>

        <div className="card p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold mb-5">{t("send_message")}</h2>
          <form action={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-semibold block mb-1.5" htmlFor="name">
                {t("your_name")}
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-lg border border-[var(--color-sage-line)] px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
              />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1.5" htmlFor="email">
                {t("your_email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-[var(--color-sage-line)] px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
              />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1.5" htmlFor="message">
                {t("your_message")}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full rounded-lg border border-[var(--color-sage-line)] px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary justify-center disabled:opacity-60"
            >
              {status === "sending" ? "…" : t("send")}
            </button>
            {status === "sent" && (
              <p className="text-sm text-[var(--color-forest)] font-semibold">
                {t("send") === "Send" ? "Message sent — thank you!" : "বার্তা পাঠানো হয়েছে — ধন্যবাদ!"}
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-[var(--color-brick)] font-semibold">
                Something went wrong. Please try again or use the contact details above.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
