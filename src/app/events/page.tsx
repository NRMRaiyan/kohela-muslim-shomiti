import type { Metadata } from "next";
import EventsListContent from "@/components/EventsListContent";
import { getUpcomingEvents, getPastEvents } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and previous events of Kohela Muslim Shomitti.",
};

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([getUpcomingEvents(), getPastEvents()]);
  return <EventsListContent upcoming={upcoming} past={past} />;
}
