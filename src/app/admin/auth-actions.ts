"use server";

import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createSession, destroySession, verifyPassword } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { ok: false as const, error: "Please enter your email and password." };
  }

  try {
    const rows = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
    const user = rows[0];

    if (!user) {
      return { ok: false as const, error: "Invalid email or password." };
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return { ok: false as const, error: "Invalid email or password." };
    }

    await createSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return { ok: true as const };
  } catch (err) {
    console.error("Login failed", err);
    return {
      ok: false as const,
      error:
        "Could not connect to the database. Make sure DATABASE_URL is set and the database has been seeded (see README.md).",
    };
  }
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
