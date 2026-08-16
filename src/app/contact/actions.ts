"use server";

import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(150),
  email: z.string().email().max(160),
  message: z.string().min(1).max(4000),
});

export async function submitContactMessage(formData: FormData) {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { ok: false as const };
  }

  try {
    await db.insert(contactMessages).values(parsed.data);
    return { ok: true as const };
  } catch (err) {
    console.error("Failed to save contact message", err);
    return { ok: false as const };
  }
}
