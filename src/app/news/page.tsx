import type { Metadata } from "next";
import NewsListContent from "@/components/NewsListContent";
import { getAllNews } from "@/lib/data";

export const metadata: Metadata = {
  title: "News & Announcements",
  description: "Latest news and announcements from Kohela Muslim Shomitti.",
};

export default async function NewsPage() {
  const items = await getAllNews();
  return <NewsListContent items={items} />;
}
