import type { Metadata } from "next";
import NoticesListContent from "@/components/NoticesListContent";
import { getAllNotices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Notices",
  description: "Important notices from Kohela Muslim Shomitti.",
};

export default async function NoticesPage() {
  const items = await getAllNotices();
  return <NoticesListContent items={items} />;
}
