"use client";

import { TextField, TextAreaField, CheckboxField, FormActions } from "@/components/admin/FormFields";

export type NoticeFormValues = {
  title: string;
  titleBn: string | null;
  description: string;
  descriptionBn: string | null;
  attachmentUrl: string | null;
  publishedBy: string | null;
  showOnHomepage: boolean;
};

export default function NoticeForm({
  action,
  initial,
}: {
  action: (formData: FormData) => void;
  initial?: NoticeFormValues;
}) {
  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-5">
        <TextField name="title" label="Title (English)" defaultValue={initial?.title} required />
        <TextField name="titleBn" label="Title (Bangla)" defaultValue={initial?.titleBn} />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <TextAreaField
          name="description"
          label="Description (English)"
          defaultValue={initial?.description}
          required
          rows={6}
        />
        <TextAreaField
          name="descriptionBn"
          label="Description (Bangla)"
          defaultValue={initial?.descriptionBn}
          rows={6}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <TextField
          name="attachmentUrl"
          label="Attachment URL (optional PDF/document)"
          defaultValue={initial?.attachmentUrl}
        />
        <TextField name="publishedBy" label="Published by" defaultValue={initial?.publishedBy} />
      </div>

      <CheckboxField
        name="showOnHomepage"
        label="Show on homepage"
        defaultChecked={initial?.showOnHomepage ?? true}
      />

      <FormActions cancelHref="/admin/notices" />
    </form>
  );
}
