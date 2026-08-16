import Link from "next/link";
import { db } from "@/db";
import { news, notices, events, committee, gallery, contactMessages } from "@/db/schema";
import { Newspaper, Bell, CalendarDays, Users, Image as ImageIcon, Mail } from "lucide-react";

async function getCounts() {
  try {
    const [n, no, e, c, g, m] = await Promise.all([
      db.$count(news),
      db.$count(notices),
      db.$count(events),
      db.$count(committee),
      db.$count(gallery),
      db.$count(contactMessages),
    ]);
    return { news: n, notices: no, events: e, committee: c, gallery: g, messages: m };
  } catch {
    return { news: 0, notices: 0, events: 0, committee: 0, gallery: 0, messages: 0 };
  }
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  const cards = [
    { label: "News", value: counts.news, href: "/admin/news", Icon: Newspaper },
    { label: "Notices", value: counts.notices, href: "/admin/notices", Icon: Bell },
    { label: "Events", value: counts.events, href: "/admin/events", Icon: CalendarDays },
    { label: "Committee", value: counts.committee, href: "/admin/committee", Icon: Users },
    { label: "Gallery photos", value: counts.gallery, href: "/admin/gallery", Icon: ImageIcon },
    { label: "Messages", value: counts.messages, href: "/admin/messages", Icon: Mail },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Welcome back</h1>
      <p className="text-sm text-[var(--color-ink)]/60 mb-8">
        Here&rsquo;s a quick overview of everything on the site.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(({ label, value, href, Icon }) => (
          <Link
            key={href}
            href={href}
            className="card p-5 flex items-center gap-4 hover:border-[var(--color-gold)] transition-colors"
          >
            <span className="w-11 h-11 rounded-full bg-[var(--color-forest)]/10 text-[var(--color-forest)] flex items-center justify-center shrink-0">
              <Icon size={19} />
            </span>
            <div>
              <div className="text-2xl font-semibold font-display">{value}</div>
              <div className="text-sm text-[var(--color-ink)]/60">{label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 card p-6">
        <h2 className="font-semibold mb-2">Keeping the site up to date</h2>
        <p className="text-sm text-[var(--color-ink)]/65 leading-relaxed">
          Anything you publish here — news, notices, events, committee members, or photos — appears on
          the public website within a few seconds. Use the sidebar to add new content any time. Draft
          news items stay hidden from the public until you mark them as &ldquo;Published&rdquo;.
        </p>
      </div>
    </div>
  );
}
