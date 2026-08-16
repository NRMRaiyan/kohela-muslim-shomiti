"use client";

import { useState, useTransition } from "react";
import { TextField, TextAreaField } from "@/components/admin/FormFields";
import ImageField from "@/components/admin/ImageField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { saveSettings } from "@/app/admin/(protected)/settings/actions";

type Settings = {
  societyNameEn: string;
  societyNameBn: string | null;
  tagline: string | null;
  taglineBn: string | null;
  history: string | null;
  historyBn: string | null;
  mission: string | null;
  missionBn: string | null;
  vision: string | null;
  visionBn: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  officeHours: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  whatsappUrl: string | null;
  mapEmbedUrl: string | null;
  logoUrl: string | null;
  heroImageUrl: string | null;
};

export default function SettingsForm({ initial }: { initial: Settings }) {
  const [saved, setSaved] = useState(false);
  const [, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setSaved(false);
    startTransition(async () => {
      await saveSettings(formData);
      setSaved(true);
    });
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-10 max-w-2xl">
      <section>
        <h2 className="font-semibold text-lg mb-4 text-[var(--color-forest)]">Identity</h2>
        <div className="flex flex-col gap-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <TextField name="societyNameEn" label="Society name (English)" defaultValue={initial.societyNameEn} required />
            <TextField name="societyNameBn" label="Society name (Bangla)" defaultValue={initial.societyNameBn} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <TextAreaField name="tagline" label="Tagline (English)" defaultValue={initial.tagline} rows={2} />
            <TextAreaField name="taglineBn" label="Tagline (Bangla)" defaultValue={initial.taglineBn} rows={2} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <ImageField name="logoUrl" label="Logo" defaultValue={initial.logoUrl} />
            <ImageField name="heroImageUrl" label="Homepage hero background image" defaultValue={initial.heroImageUrl} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-semibold text-lg mb-4 text-[var(--color-forest)]">About the Society</h2>
        <div className="flex flex-col gap-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <TextAreaField name="history" label="History (English)" defaultValue={initial.history} rows={5} />
            <TextAreaField name="historyBn" label="History (Bangla)" defaultValue={initial.historyBn} rows={5} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <TextAreaField name="mission" label="Mission (English)" defaultValue={initial.mission} rows={3} />
            <TextAreaField name="missionBn" label="Mission (Bangla)" defaultValue={initial.missionBn} rows={3} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <TextAreaField name="vision" label="Vision (English)" defaultValue={initial.vision} rows={3} />
            <TextAreaField name="visionBn" label="Vision (Bangla)" defaultValue={initial.visionBn} rows={3} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-semibold text-lg mb-4 text-[var(--color-forest)]">Contact</h2>
        <div className="flex flex-col gap-5">
          <TextAreaField name="address" label="Address" defaultValue={initial.address} rows={2} />
          <div className="grid sm:grid-cols-2 gap-5">
            <TextField name="phone" label="Phone" defaultValue={initial.phone} />
            <TextField name="email" label="Email" type="email" defaultValue={initial.email} />
          </div>
          <TextField name="officeHours" label="Office hours" defaultValue={initial.officeHours} />
          <TextField name="mapEmbedUrl" label="Google Maps embed URL (optional)" defaultValue={initial.mapEmbedUrl} />
        </div>
      </section>

      <section>
        <h2 className="font-semibold text-lg mb-4 text-[var(--color-forest)]">Social Links</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <TextField name="facebookUrl" label="Facebook URL" defaultValue={initial.facebookUrl} />
          <TextField name="instagramUrl" label="Instagram URL" defaultValue={initial.instagramUrl} />
          <TextField name="youtubeUrl" label="YouTube URL" defaultValue={initial.youtubeUrl} />
          <TextField name="whatsappUrl" label="WhatsApp URL" defaultValue={initial.whatsappUrl} />
        </div>
      </section>

      <div className="flex items-center gap-4">
        <SubmitButton>Save settings</SubmitButton>
        {saved && <span className="text-sm text-[var(--color-forest)] font-semibold">Saved ✓</span>}
      </div>
    </form>
  );
}
