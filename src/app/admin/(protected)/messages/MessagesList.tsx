"use client";

import { useTransition } from "react";
import { Trash2, Mail, MailOpen } from "lucide-react";
import { formatDateTime } from "@/lib/format-date";
import { markMessageRead, deleteMessage } from "./actions";

type MessageRow = {
  id: number;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: Date | string;
};

export default function MessagesList({ items }: { items: MessageRow[] }) {
  const [, startTransition] = useTransition();

  if (items.length === 0) {
    return (
      <div className="card p-10 text-center text-sm text-[var(--color-ink)]/55">
        No messages yet. Messages sent through the Contact page will appear here.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((m) => (
        <div
          key={m.id}
          className={`card p-5 ${m.read ? "" : "border-[var(--color-gold)]"}`}
          onMouseEnter={() => !m.read && startTransition(() => markMessageRead(m.id))}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              {m.read ? (
                <MailOpen size={16} className="text-[var(--color-ink)]/40 shrink-0" />
              ) : (
                <Mail size={16} className="text-[var(--color-gold)] shrink-0" />
              )}
              <div className="min-w-0">
                <div className="font-semibold text-sm truncate">{m.name}</div>
                <a href={`mailto:${m.email}`} className="text-xs text-[var(--color-forest)] hover:underline">
                  {m.email}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-[var(--color-ink)]/45">
                {formatDateTime(m.createdAt, "en")}
              </span>
              <button
                onClick={() => {
                  if (confirm("Delete this message?")) startTransition(() => deleteMessage(m.id));
                }}
                className="text-[var(--color-brick)] hover:bg-[var(--color-brick)]/10 w-7 h-7 rounded-full flex items-center justify-center"
                aria-label="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          <p className="text-sm text-[var(--color-ink)]/75 mt-3 whitespace-pre-line">{m.message}</p>
        </div>
      ))}
    </div>
  );
}
