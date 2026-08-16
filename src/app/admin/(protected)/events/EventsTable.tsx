"use client";

import { formatDateTime } from "@/lib/format-date";
import RowActions from "@/components/admin/RowActions";
import { deleteEvent } from "./actions";

type EventRow = {
  id: number;
  title: string;
  eventDate: Date | string;
  location: string | null;
};

export default function EventsTable({ items }: { items: EventRow[] }) {
  if (items.length === 0) {
    return (
      <div className="card p-10 text-center text-sm text-[var(--color-ink)]/55">
        No events yet. Click &ldquo;Add new&rdquo; to create one.
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left bg-[var(--color-paper-warm)] text-[var(--color-ink)]/60 text-xs uppercase">
            <th className="px-4 py-3 font-semibold">Title</th>
            <th className="px-4 py-3 font-semibold">Date & Time</th>
            <th className="px-4 py-3 font-semibold">Location</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t border-[var(--color-sage-line)]">
              <td className="px-4 py-3 font-medium">{item.title}</td>
              <td className="px-4 py-3 text-[var(--color-ink)]/60">
                {formatDateTime(item.eventDate, "en")}
              </td>
              <td className="px-4 py-3 text-[var(--color-ink)]/60">{item.location || "—"}</td>
              <td className="px-4 py-3">
                <RowActions
                  editHref={`/admin/events/${item.id}/edit`}
                  onDelete={() => deleteEvent(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
