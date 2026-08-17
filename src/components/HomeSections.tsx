"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import SectionHeading from "./SectionHeading";
import EmptyState from "./EmptyState";
import NewsCard, { NewsCardData } from "./NewsCard";
import NoticeCard, { NoticeCardData } from "./NoticeCard";
import EventCard, { EventCardData } from "./EventCard";
import NewsCarousel from "./NewsCarousel";
import { navLinks } from "@/lib/site-config";

export default function HomeSections({
  latestNews,
  latestNotices,
  upcomingEvents,
}: {
  latestNews: NewsCardData[];
  latestNotices: NoticeCardData[];
  upcomingEvents: EventCardData[];
}) {
  const { t } = useLanguage();

  return (
    <>
      {/* Latest News */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow={t("nav_news")}
          title={t("latest_news")}
          viewAllHref="/news"
          viewAllLabel={t("view_all")}
        />
        {/* {latestNews.length === 0 ? (
          <EmptyState message={t("no_items")} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((n) => (
              <NewsCard key={n.slug} item={n} />
            ))}
          </div>
        )} */}

        {latestNews.length === 0 ? (
          <EmptyState message={t("no_items")} />
        ) : (
          <NewsCarousel items={latestNews} />
        )}

        <Link href="/news" className="sm:hidden mt-6 inline-block text-sm font-semibold text-[var(--color-forest)]">
          {t("view_all")} →
        </Link>
      </section>

      {/* Notices + Upcoming Events, side by side */}
      <section className="bg-[var(--color-paper-warm)]">
        <div className="container-page py-16 sm:py-20 grid lg:grid-cols-2 gap-14">
          <div>
            <SectionHeading
              eyebrow={t("nav_notices")}
              title={t("latest_notices")}
              viewAllHref="/notices"
              viewAllLabel={t("view_all")}
            />
            {latestNotices.length === 0 ? (
              <EmptyState message={t("no_items")} />
            ) : (
              <div className="flex flex-col gap-3">
                {latestNotices.map((n) => (
                  <NoticeCard key={n.id} item={n} />
                ))}
              </div>
            )}
          </div>

          <div>
            <SectionHeading
              eyebrow={t("nav_events")}
              title={t("upcoming_events")}
              viewAllHref="/events"
              viewAllLabel={t("view_all")}
            />
            {upcomingEvents.length === 0 ? (
              <EmptyState message={t("no_items")} />
            ) : (
              // <div className="grid sm:grid-cols-2 gap-5">
              //   {upcomingEvents.slice(0, 4).map((e) => (
              //     <EventCard key={e.id} item={e} />
              //   ))}
              // </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {upcomingEvents.map((e) => (
                  <EventCard key={e.id} item={e} />
                  ))}
              </div>
              
            )}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading eyebrow={t("nav_home")} title={t("quick_links")} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="card p-5 text-center font-semibold text-[var(--color-forest)] hover:border-[var(--color-gold)] hover:-translate-y-0.5 transition-transform"
            >
              {t(link.key)}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
