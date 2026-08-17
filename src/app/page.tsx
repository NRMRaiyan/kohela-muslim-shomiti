import Hero from "@/components/Hero";
import HomeSections from "@/components/HomeSections";
import { getSettings, getLatestNews, getLatestNotices, getUpcomingEvents } from "@/lib/data";

export default async function HomePage() {
  const [settings, news, notices, events] = await Promise.all([
    getSettings(),
    getLatestNews(10),
    getLatestNotices(5, true),
    getUpcomingEvents(4),
  ]);

  return (
    <>
      <Hero
        nameEn={settings.societyNameEn}
        nameBn={settings.societyNameBn!}
        tagline={settings.tagline!}
        taglineBn={settings.taglineBn!}
        heroImageUrl={settings.heroImageUrl}
      />
      <HomeSections latestNews={news} latestNotices={notices} upcomingEvents={events} />
    </>
  );
}
