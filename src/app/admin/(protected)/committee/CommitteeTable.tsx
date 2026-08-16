"use client";

import RowActions from "@/components/admin/RowActions";
import { deleteMember } from "./actions";

type MemberRow = {
  id: number;
  name: string;
  position: string;
  group: string;
  sortOrder: number;
};

export default function CommitteeTable({ items }: { items: MemberRow[] }) {
  if (items.length === 0) {
    return (
      <div className="card p-10 text-center text-sm text-[var(--color-ink)]/55">
        No committee members yet. Click &ldquo;Add new&rdquo; to add one.
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left bg-[var(--color-paper-warm)] text-[var(--color-ink)]/60 text-xs uppercase">
            <th className="px-4 py-3 font-semibold">Name</th>
            <th className="px-4 py-3 font-semibold">Position</th>
            <th className="px-4 py-3 font-semibold">Group</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t border-[var(--color-sage-line)]">
              <td className="px-4 py-3 font-medium">{item.name}</td>
              <td className="px-4 py-3 text-[var(--color-ink)]/60">{item.position}</td>
              <td className="px-4 py-3 text-[var(--color-ink)]/60 capitalize">{item.group}</td>
              <td className="px-4 py-3">
                <RowActions
                  editHref={`/admin/committee/${item.id}/edit`}
                  onDelete={() => deleteMember(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
