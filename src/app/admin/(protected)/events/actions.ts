"use server";

import { db } from "@/db";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function extractFields(formData: FormData) {
  const dateStr = String(formData.get("eventDate") || "");
  return {
    title: String(formData.get("title") || "").trim(),
    titleBn: String(formData.get("titleBn") || "").trim() || null,
    description: String(formData.get("description") || "").trim(),
    descriptionBn: String(formData.get("descriptionBn") || "").trim() || null,
    eventDate: dateStr ? new Date(dateStr) : new Date(),
    location: String(formData.get("location") || "").trim() || null,
    image: String(formData.get("image") || "").trim() || null,
    registrationInfo: String(formData.get("registrationInfo") || "").trim() || null,
  };
}

export async function createEvent(formData: FormData) {
  await db.insert(events).values(extractFields(formData));
  revalidatePath("/events");
  revalidatePath("/");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function updateEvent(id: number, formData: FormData) {
  await db.update(events).set(extractFields(formData)).where(eq(events.id, id));
  revalidatePath("/events");
  revalidatePath("/");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function deleteEvent(id: number) {
  await db.delete(events).where(eq(events.id, id));
  revalidatePath("/events");
  revalidatePath("/");
  revalidatePath("/admin/events");
}
