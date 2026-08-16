"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, Link as LinkIcon, X, Loader2 } from "lucide-react";

export default function ImageField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
}) {
  const [url, setUrl] = useState(defaultValue || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const fileInput = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="text-sm font-semibold block mb-1.5">{label}</label>
      <input type="hidden" name={name} value={url} />

      <div className="inline-flex rounded-lg border border-[var(--color-sage-line)] mb-2.5 overflow-hidden text-xs font-semibold">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`px-3 py-1.5 flex items-center gap-1.5 ${
            mode === "upload" ? "bg-[var(--color-forest)] text-white" : "text-[var(--color-forest)]"
          }`}
        >
          <Upload size={12} /> Upload
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`px-3 py-1.5 flex items-center gap-1.5 ${
            mode === "url" ? "bg-[var(--color-forest)] text-white" : "text-[var(--color-forest)]"
          }`}
        >
          <LinkIcon size={12} /> Paste URL
        </button>
      </div>

      {mode === "upload" ? (
        <div>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            disabled={uploading}
            className="w-full border-2 border-dashed border-[var(--color-sage-line)] rounded-lg py-6 text-sm text-[var(--color-ink)]/60 hover:border-[var(--color-gold)] transition-colors flex flex-col items-center gap-2"
          >
            {uploading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Upload size={20} />
            )}
            {uploading ? "Uploading…" : "Click to choose an image"}
          </button>
        </div>
      ) : (
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/photo.jpg"
          className="w-full rounded-lg border border-[var(--color-sage-line)] px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
        />
      )}

      {error && <p className="text-xs text-[var(--color-brick)] mt-2">{error}</p>}

      {url && (
        <div className="relative mt-3 w-40 aspect-video rounded-lg overflow-hidden border border-[var(--color-sage-line)] group">
          <Image src={url} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => setUrl("")}
            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove image"
          >
            <X size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
