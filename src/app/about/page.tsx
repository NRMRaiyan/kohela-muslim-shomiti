import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "About the Society",
  description: "History, mission, and vision of Kohela Muslim Shomitti.",
};

export default async function AboutPage() {
  const settings = await getSettings();
  return <AboutContent settings={settings} />;
}
