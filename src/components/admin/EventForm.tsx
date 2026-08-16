"use client";

import { TextField, TextAreaField, FormActions } from "@/components/admin/FormFields";
import ImageField from "@/components/admin/ImageField";

export type EventFormValues = {
  title: string;
  titleBn: string | null;
  description: string;
  descriptionBn: string | null;
  eventDate: Date | string;
  location: string | null;
  image: string | null;
  registrationInfo: string | null;
};

function toLocalInputValue(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(
    d.getMinutes()
  )}`;
}

export default function EventForm({
  action,
  initial,
}: {
  action: (formData: FormData) => void;
  initial?: EventFormValues;
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
          rows={5}
        />
        <TextAreaField
          name="descriptionBn"
          label="Description (Bangla)"
          defaultValue={initial?.descriptionBn}
          rows={5}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="eventDate" className="text-sm font-semibold block mb-1.5">
            Date & time <span className="text-[var(--color-brick)]">*</span>
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="datetime-local"
            required
            defaultValue={initial ? toLocalInputValue(initial.eventDate) : undefined}
            className="w-full rounded-lg border border-[var(--color-sage-line)] px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
          />
        </div>
        <TextField name="location" label="Location" defaultValue={initial?.location} />
      </div>

      <ImageField name="image" label="Event image" defaultValue={initial?.image} />

      <TextAreaField
        name="registrationInfo"
        label="Registration info (optional)"
        defaultValue={initial?.registrationInfo}
        rows={3}
      />

      <FormActions cancelHref="/admin/events" />
    </form>
  );
}
