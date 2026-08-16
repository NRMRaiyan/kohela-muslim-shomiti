import { db } from "@/db";
import { gallery } from "@/db/schema";
import { desc } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import GalleryGrid from "./GalleryGrid";

export default async function AdminGalleryPage() {
  let items: Awaited<ReturnType<typeof fetchGallery>> = [];
  try {
    items = await fetchGallery();
  } catch {
    items = [];
  }

  return (
    <div>
      <AdminPageHeader
        title="Gallery"
        description="Upload and organize photos."
        newHref="/admin/gallery/new"
        newLabel="Add photo"
      />
      <GalleryGrid items={items} />
    </div>
  );
}

async function fetchGallery() {
  return db.select().from(gallery).orderBy(desc(gallery.createdAt));
}
