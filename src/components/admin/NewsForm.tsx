"use client";

import { TextField, TextAreaField, CheckboxField, FormActions } from "@/components/admin/FormFields";
import ImageField from "@/components/admin/ImageField";

export type NewsFormValues = {
  title: string;
  titleBn: string | null;
  shortDescription: string;
  shortDescriptionBn: string | null;
  content: string;
  contentBn: string | null;
  featuredImage: string | null;
  author: string | null;
  attachmentUrl: string | null;
  published: boolean;
};

export default function NewsForm({
  action,
  initial,
}: {
  action: (formData: FormData) => void;
  initial?: NewsFormValues;
}) {
  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-5">
        <TextField name="title" label="Title (English)" defaultValue={initial?.title} required />
        <TextField name="titleBn" label="Title (Bangla)" defaultValue={initial?.titleBn} />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <TextAreaField
          name="shortDescription"
          label="Short description (English)"
          defaultValue={initial?.shortDescription}
          required
          rows={3}
        />
        <TextAreaField
          name="shortDescriptionBn"
          label="Short description (Bangla)"
          defaultValue={initial?.shortDescriptionBn}
          rows={3}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <TextAreaField
          name="content"
          label="Full article (English)"
          defaultValue={initial?.content}
          required
          rows={8}
        />
        <TextAreaField
          name="contentBn"
          label="Full article (Bangla)"
          defaultValue={initial?.contentBn}
          rows={8}
        />
      </div>

      <ImageField name="featuredImage" label="Featured image" defaultValue={initial?.featuredImage} />

      <div className="grid sm:grid-cols-2 gap-5">
        <TextField name="author" label="Author" defaultValue={initial?.author} />
        <TextField
          name="attachmentUrl"
          label="Attachment URL (optional PDF/document)"
          defaultValue={initial?.attachmentUrl}
        />
      </div>

      <CheckboxField name="published" label="Published (visible on the website)" defaultChecked={initial?.published ?? true} />

      <FormActions cancelHref="/admin/news" />
    </form>
  );
}
