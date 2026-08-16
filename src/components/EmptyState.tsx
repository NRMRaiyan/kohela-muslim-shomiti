import { Inbox } from "lucide-react";

export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="card flex flex-col items-center justify-center text-center py-14 px-6 text-[var(--color-ink)]/60">
      <Inbox size={30} className="mb-3 text-[var(--color-sage-line)]" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
