"use server";

import { db } from "@/db";
import { committee } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function extractFields(formData: FormData) {
  return {
    name: String(formData.get("name") || "").trim(),
    nameBn: String(formData.get("nameBn") || "").trim() || null,
    position: String(formData.get("position") || "").trim(),
    positionBn: String(formData.get("positionBn") || "").trim() || null,
    photo: String(formData.get("photo") || "").trim() || null,
    bio: String(formData.get("bio") || "").trim() || null,
    phone: String(formData.get("phone") || "").trim() || null,
    email: String(formData.get("email") || "").trim() || null,
    group: String(formData.get("group") || "executive"),
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
}

export async function createMember(formData: FormData) {
  await db.insert(committee).values(extractFields(formData));
  revalidatePath("/committee");
  revalidatePath("/admin/committee");
  redirect("/admin/committee");
}

export async function updateMember(id: number, formData: FormData) {
  await db.update(committee).set(extractFields(formData)).where(eq(committee.id, id));
  revalidatePath("/committee");
  revalidatePath("/admin/committee");
  redirect("/admin/committee");
}

export async function deleteMember(id: number) {
  await db.delete(committee).where(eq(committee.id, id));
  revalidatePath("/committee");
  revalidatePath("/admin/committee");
}
