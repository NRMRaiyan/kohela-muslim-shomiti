import { notFound } from "next/navigation";
import { db } from "@/db";
import { gallery } from "@/db/schema";
import { eq } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import GalleryForm from "@/components/admin/GalleryForm";
import { updateGalleryItem } from "../../actions";

export default async function EditGalleryItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await db.select().from(gallery).where(eq(gallery.id, Number(id))).limit(1);
  const item = rows[0];
  if (!item) notFound();

  const action = updateGalleryItem.bind(null, item.id);

  return (
    <div>
      <AdminPageHeader title="Edit Photo" />
      <GalleryForm action={action} initial={item} />
    </div>
  );
}
