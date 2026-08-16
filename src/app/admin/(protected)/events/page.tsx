import { db } from "@/db";
import { events } from "@/db/schema";
import { desc } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import EventsTable from "./EventsTable";

export default async function AdminEventsPage() {
  let items: Awaited<ReturnType<typeof fetchEvents>> = [];
  try {
    items = await fetchEvents();
  } catch {
    items = [];
  }

  return (
    <div>
      <AdminPageHeader
        title="Events"
        description="Create and manage upcoming events."
        newHref="/admin/events/new"
        newLabel="Add event"
      />
      <EventsTable items={items} />
    </div>
  );
}

async function fetchEvents() {
  return db.select().from(events).orderBy(desc(events.eventDate));
}
