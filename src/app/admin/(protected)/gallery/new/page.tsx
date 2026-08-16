import AdminPageHeader from "@/components/admin/AdminPageHeader";
import GalleryForm from "@/components/admin/GalleryForm";
import { createGalleryItem } from "../actions";

export default function NewGalleryItemPage() {
  return (
    <div>
      <AdminPageHeader title="Add Photo" description="Upload a new photo to the gallery." />
      <GalleryForm action={createGalleryItem} />
    </div>
  );
}
