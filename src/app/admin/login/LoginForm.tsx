"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { login } from "../auth-actions";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(result.error ?? "Login failed.");
      }
    });
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="text-sm font-semibold block mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="w-full rounded-lg border border-[var(--color-sage-line)] px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-semibold block mb-1.5">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-[var(--color-sage-line)] px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
        />
      </div>
      {error && <p className="text-sm text-[var(--color-brick)]">{error}</p>}
      <button type="submit" disabled={pending} className="btn-primary justify-center disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
