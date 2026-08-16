"use server";

import { db } from "@/db";
import { gallery } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function extractFields(formData: FormData) {
  return {
    image: String(formData.get("image") || "").trim(),
    caption: String(formData.get("caption") || "").trim() || null,
    captionBn: String(formData.get("captionBn") || "").trim() || null,
    category: String(formData.get("category") || "General").trim() || "General",
  };
}

export async function createGalleryItem(formData: FormData) {
  const fields = extractFields(formData);
  if (!fields.image) return;
  await db.insert(gallery).values(fields);
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery");
}

export async function updateGalleryItem(id: number, formData: FormData) {
  await db.update(gallery).set(extractFields(formData)).where(eq(gallery.id, id));
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery");
}

export async function deleteGalleryItem(id: number) {
  await db.delete(gallery).where(eq(gallery.id, id));
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}
