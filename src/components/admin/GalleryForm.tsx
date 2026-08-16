"use client";

import { TextField, FormActions } from "@/components/admin/FormFields";
import ImageField from "@/components/admin/ImageField";

export type GalleryFormValues = {
  image: string;
  caption: string | null;
  captionBn: string | null;
  category: string;
};

export default function GalleryForm({
  action,
  initial,
}: {
  action: (formData: FormData) => void;
  initial?: GalleryFormValues;
}) {
  return (
    <form action={action} className="flex flex-col gap-5 max-w-xl">
      <ImageField name="image" label="Photo" defaultValue={initial?.image} />

      <div className="grid sm:grid-cols-2 gap-5">
        <TextField name="caption" label="Caption (English)" defaultValue={initial?.caption} />
        <TextField name="captionBn" label="Caption (Bangla)" defaultValue={initial?.captionBn} />
      </div>

      <TextField
        name="category"
        label="Category"
        defaultValue={initial?.category ?? "General"}
        placeholder="e.g. Eid Program, Mosque, Waterworks"
      />

      <FormActions cancelHref="/admin/gallery" />
    </form>
  );
}
