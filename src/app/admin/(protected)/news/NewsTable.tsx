"use client";

import { formatDate } from "@/lib/format-date";
import RowActions from "@/components/admin/RowActions";
import { deleteNews } from "./actions";

type NewsRow = {
  id: number;
  title: string;
  published: boolean;
  createdAt: Date | string;
};

export default function NewsTable({ items }: { items: NewsRow[] }) {
  if (items.length === 0) {
    return (
      <div className="card p-10 text-center text-sm text-[var(--color-ink)]/55">
        No news items yet. Click &ldquo;Add new&rdquo; to publish your first one.
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left bg-[var(--color-paper-warm)] text-[var(--color-ink)]/60 text-xs uppercase">
            <th className="px-4 py-3 font-semibold">Title</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Date</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t border-[var(--color-sage-line)]">
              <td className="px-4 py-3 font-medium">{item.title}</td>
              <td className="px-4 py-3">
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    item.published
                      ? "bg-[var(--color-forest)]/10 text-[var(--color-forest)]"
                      : "bg-[var(--color-ink)]/10 text-[var(--color-ink)]/60"
                  }`}
                >
                  {item.published ? "Published" : "Draft"}
                </span>
              </td>
              <td className="px-4 py-3 text-[var(--color-ink)]/60">{formatDate(item.createdAt, "en")}</td>
              <td className="px-4 py-3">
                <RowActions
                  editHref={`/admin/news/${item.id}/edit`}
                  onDelete={() => deleteNews(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
