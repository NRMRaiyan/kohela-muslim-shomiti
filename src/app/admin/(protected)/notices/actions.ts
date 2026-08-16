"use server";

import { db } from "@/db";
import { notices } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function extractFields(formData: FormData) {
  return {
    title: String(formData.get("title") || "").trim(),
    titleBn: String(formData.get("titleBn") || "").trim() || null,
    description: String(formData.get("description") || "").trim(),
    descriptionBn: String(formData.get("descriptionBn") || "").trim() || null,
    attachmentUrl: String(formData.get("attachmentUrl") || "").trim() || null,
    publishedBy: String(formData.get("publishedBy") || "").trim() || null,
    showOnHomepage: formData.get("showOnHomepage") === "on",
  };
}

export async function createNotice(formData: FormData) {
  await db.insert(notices).values(extractFields(formData));
  revalidatePath("/notices");
  revalidatePath("/");
  revalidatePath("/admin/notices");
  redirect("/admin/notices");
}

export async function updateNotice(id: number, formData: FormData) {
  await db.update(notices).set(extractFields(formData)).where(eq(notices.id, id));
  revalidatePath("/notices");
  revalidatePath("/");
  revalidatePath("/admin/notices");
  redirect("/admin/notices");
}

export async function deleteNotice(id: number) {
  await db.delete(notices).where(eq(notices.id, id));
  revalidatePath("/notices");
  revalidatePath("/");
  revalidatePath("/admin/notices");
}
