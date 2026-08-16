"use client";

import { TextField, TextAreaField, SelectField, FormActions } from "@/components/admin/FormFields";
import ImageField from "@/components/admin/ImageField";

export type MemberFormValues = {
  name: string;
  nameBn: string | null;
  position: string;
  positionBn: string | null;
  photo: string | null;
  bio: string | null;
  phone: string | null;
  email: string | null;
  group: string;
  sortOrder: number;
};

export default function MemberForm({
  action,
  initial,
}: {
  action: (formData: FormData) => void;
  initial?: MemberFormValues;
}) {
  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-5">
        <TextField name="name" label="Name (English)" defaultValue={initial?.name} required />
        <TextField name="nameBn" label="Name (Bangla)" defaultValue={initial?.nameBn} />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <TextField name="position" label="Position (English)" defaultValue={initial?.position} required />
        <TextField name="positionBn" label="Position (Bangla)" defaultValue={initial?.positionBn} />
      </div>

      <ImageField name="photo" label="Photo" defaultValue={initial?.photo} />

      <TextAreaField name="bio" label="Short bio (optional)" defaultValue={initial?.bio} rows={3} />

      <div className="grid sm:grid-cols-2 gap-5">
        <TextField name="phone" label="Phone" defaultValue={initial?.phone} />
        <TextField name="email" label="Email" type="email" defaultValue={initial?.email} />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <SelectField
          name="group"
          label="Group"
          defaultValue={initial?.group ?? "executive"}
          options={[
            { value: "executive", label: "Executive Committee" },
            { value: "member", label: "General Member" },
          ]}
        />
        <TextField
          name="sortOrder"
          label="Display order (lower = first)"
          type="number"
          defaultValue={String(initial?.sortOrder ?? 0)}
        />
      </div>

      <FormActions cancelHref="/admin/committee" />
    </form>
  );
}
