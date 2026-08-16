"use client";

import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { useLanguage, pick } from "@/lib/language-context";
import EmptyState from "./EmptyState";

export type CommitteeMember = {
  id: number;
  name: string;
  nameBn: string | null;
  position: string;
  positionBn: string | null;
  photo: string | null;
  bio: string | null;
  phone: string | null;
  email: string | null;
  group: string;
};

function MemberCard({ m }: { m: CommitteeMember }) {
  const { locale } = useLanguage();
  const name = pick(locale, m.name, m.nameBn);
  const position = pick(locale, m.position, m.positionBn);

  return (
    <div className="card p-5 text-center flex flex-col items-center">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-[var(--color-paper-warm)] relative mb-4 arch-top">
        {m.photo ? (
          <Image src={m.photo} alt={name} fill className="object-cover" sizes="96px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-display text-2xl text-[var(--color-forest)]/30">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="font-display font-semibold text-lg">{name}</h3>
      <p className="text-sm text-[var(--color-gold)] font-semibold mt-0.5">{position}</p>
      {m.bio && <p className="text-sm text-[var(--color-ink)]/65 mt-3 leading-relaxed">{m.bio}</p>}
      {(m.phone || m.email) && (
        <div className="flex gap-3 mt-4">
          {m.phone && (
            <a
              href={`tel:${m.phone}`}
              className="w-8 h-8 rounded-full bg-[var(--color-paper-warm)] flex items-center justify-center text-[var(--color-forest)] hover:bg-[var(--color-gold)] hover:text-white transition-colors"
              aria-label="Phone"
            >
              <Phone size={14} />
            </a>
          )}
          {m.email && (
            <a
              href={`mailto:${m.email}`}
              className="w-8 h-8 rounded-full bg-[var(--color-paper-warm)] flex items-center justify-center text-[var(--color-forest)] hover:bg-[var(--color-gold)] hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={14} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function CommitteeContent({ members }: { members: CommitteeMember[] }) {
  const { t } = useLanguage();
  const executive = members.filter((m) => m.group === "executive");
  const others = members.filter((m) => m.group !== "executive");

  return (
    <div className="container-page py-14 sm:py-20">
      <span className="eyebrow">{t("nav_committee")}</span>
      <h1 className="text-3xl sm:text-4xl font-semibold mt-2 mb-10">{t("committee_title")}</h1>

      {members.length === 0 ? (
        <EmptyState message={t("no_items")} />
      ) : (
        <>
          {executive.length > 0 && (
            <div className="mb-14">
              <h2 className="text-xl font-semibold text-[var(--color-forest)] mb-6">
                {t("executive_committee")}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {executive.map((m) => (
                  <MemberCard key={m.id} m={m} />
                ))}
              </div>
            </div>
          )}
          {others.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-[var(--color-forest)] mb-6">
                {t("executive_members")}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {others.map((m) => (
                  <MemberCard key={m.id} m={m} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
