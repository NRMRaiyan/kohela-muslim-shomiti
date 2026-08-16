import AdminPageHeader from "@/components/admin/AdminPageHeader";
import EventForm from "@/components/admin/EventForm";
import { createEvent } from "../actions";

export default function NewEventPage() {
  return (
    <div>
      <AdminPageHeader title="Add Event" description="Create a new upcoming event." />
      <EventForm action={createEvent} />
    </div>
  );
}
