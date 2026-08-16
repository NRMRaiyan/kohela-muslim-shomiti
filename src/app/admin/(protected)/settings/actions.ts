"use server";

import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

function extractFields(formData: FormData) {
  const get = (k: string) => String(formData.get(k) || "").trim() || null;
  return {
    societyNameEn: get("societyNameEn") || "Kohela Muslim Shomitti",
    societyNameBn: get("societyNameBn"),
    tagline: get("tagline"),
    taglineBn: get("taglineBn"),
    history: get("history"),
    historyBn: get("historyBn"),
    mission: get("mission"),
    missionBn: get("missionBn"),
    vision: get("vision"),
    visionBn: get("visionBn"),
    address: get("address"),
    phone: get("phone"),
    email: get("email"),
    officeHours: get("officeHours"),
    facebookUrl: get("facebookUrl"),
    instagramUrl: get("instagramUrl"),
    youtubeUrl: get("youtubeUrl"),
    whatsappUrl: get("whatsappUrl"),
    mapEmbedUrl: get("mapEmbedUrl"),
    logoUrl: get("logoUrl"),
    heroImageUrl: get("heroImageUrl"),
  };
}

export async function saveSettings(formData: FormData) {
  const fields = extractFields(formData);
  const rows = await db.select().from(siteSettings).limit(1);

  if (rows.length === 0) {
    await db.insert(siteSettings).values(fields);
  } else {
    await db.update(siteSettings).set(fields).where(eq(siteSettings.id, rows[0].id));
  }

  revalidatePath("/", "layout");
  return { ok: true as const };
}
