import type { Metadata } from "next";
import GalleryContent from "@/components/GalleryContent";
import { getGallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Photos from events and activities of Kohela Muslim Shomitti.",
};

export default async function GalleryPage() {
  const items = await getGallery();
  return <GalleryContent items={items} />;
}
