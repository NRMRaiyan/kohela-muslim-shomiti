import { notFound } from "next/navigation";
import { db } from "@/db";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import EventForm from "@/components/admin/EventForm";
import { updateEvent } from "../../actions";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await db.select().from(events).where(eq(events.id, Number(id))).limit(1);
  const item = rows[0];
  if (!item) notFound();

  const action = updateEvent.bind(null, item.id);

  return (
    <div>
      <AdminPageHeader title="Edit Event" description={item.title} />
      <EventForm action={action} initial={item} />
    </div>
  );
}
