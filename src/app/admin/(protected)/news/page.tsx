import { db } from "@/db";
import { news } from "@/db/schema";
import { desc } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import NewsTable from "./NewsTable";

export default async function AdminNewsPage() {
  let items: Awaited<ReturnType<typeof fetchNews>> = [];
  try {
    items = await fetchNews();
  } catch {
    items = [];
  }

  return (
    <div>
      <AdminPageHeader title="News" description="Publish news and announcements." newHref="/admin/news/new" newLabel="Add news" />
      <NewsTable items={items} />
    </div>
  );
}

async function fetchNews() {
  return db.select().from(news).orderBy(desc(news.createdAt));
}
