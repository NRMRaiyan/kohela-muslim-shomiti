"use server";

import { db } from "@/db";
import { news } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/slug";

function extractFields(formData: FormData) {
  return {
    title: String(formData.get("title") || "").trim(),
    titleBn: String(formData.get("titleBn") || "").trim() || null,
    shortDescription: String(formData.get("shortDescription") || "").trim(),
    shortDescriptionBn: String(formData.get("shortDescriptionBn") || "").trim() || null,
    content: String(formData.get("content") || "").trim(),
    contentBn: String(formData.get("contentBn") || "").trim() || null,
    featuredImage: String(formData.get("featuredImage") || "").trim() || null,
    author: String(formData.get("author") || "").trim() || null,
    attachmentUrl: String(formData.get("attachmentUrl") || "").trim() || null,
    published: formData.get("published") === "on",
  };
}

export async function createNews(formData: FormData) {
  const fields = extractFields(formData);
  let slug = slugify(fields.title) || `news-${Date.now()}`;

  // Ensure uniqueness
  const existing = await db.select().from(news).where(eq(news.slug, slug));
  if (existing.length > 0) slug = `${slug}-${Date.now().toString().slice(-5)}`;

  await db.insert(news).values({ ...fields, slug, updatedAt: new Date() });

  revalidatePath("/news");
  revalidatePath("/");
  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function updateNews(id: number, formData: FormData) {
  const fields = extractFields(formData);
  await db
    .update(news)
    .set({ ...fields, updatedAt: new Date() })
    .where(eq(news.id, id));

  revalidatePath("/news");
  revalidatePath("/");
  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function deleteNews(id: number) {
  await db.delete(news).where(eq(news.id, id));
  revalidatePath("/news");
  revalidatePath("/");
  revalidatePath("/admin/news");
}
