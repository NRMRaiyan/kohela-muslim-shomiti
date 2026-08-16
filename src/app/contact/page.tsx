import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact information for Kohela Muslim Shomitti.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  return <ContactContent settings={settings} />;
}
