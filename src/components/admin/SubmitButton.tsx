"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ children = "Save" }: { children?: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
      {pending ? "Saving…" : children}
    </button>
  );
}
