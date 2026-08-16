"use client";

import { formatDate } from "@/lib/format-date";
import RowActions from "@/components/admin/RowActions";
import { deleteNotice } from "./actions";

type NoticeRow = {
  id: number;
  title: string;
  showOnHomepage: boolean;
  createdAt: Date | string;
};

export default function NoticesTable({ items }: { items: NoticeRow[] }) {
  if (items.length === 0) {
    return (
      <div className="card p-10 text-center text-sm text-[var(--color-ink)]/55">
        No notices yet. Click &ldquo;Add new&rdquo; to publish one.
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left bg-[var(--color-paper-warm)] text-[var(--color-ink)]/60 text-xs uppercase">
            <th className="px-4 py-3 font-semibold">Title</th>
            <th className="px-4 py-3 font-semibold">Homepage</th>
            <th className="px-4 py-3 font-semibold">Date</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t border-[var(--color-sage-line)]">
              <td className="px-4 py-3 font-medium">{item.title}</td>
              <td className="px-4 py-3 text-[var(--color-ink)]/60">
                {item.showOnHomepage ? "Yes" : "No"}
              </td>
              <td className="px-4 py-3 text-[var(--color-ink)]/60">{formatDate(item.createdAt, "en")}</td>
              <td className="px-4 py-3">
                <RowActions
                  editHref={`/admin/notices/${item.id}/edit`}
                  onDelete={() => deleteNotice(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
