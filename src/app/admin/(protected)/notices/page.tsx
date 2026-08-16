import { db } from "@/db";
import { notices } from "@/db/schema";
import { desc } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import NoticesTable from "./NoticesTable";

export default async function AdminNoticesPage() {
  let items: Awaited<ReturnType<typeof fetchNotices>> = [];
  try {
    items = await fetchNotices();
  } catch {
    items = [];
  }

  return (
    <div>
      <AdminPageHeader
        title="Notices"
        description="Publish official notices."
        newHref="/admin/notices/new"
        newLabel="Add notice"
      />
      <NoticesTable items={items} />
    </div>
  );
}

async function fetchNotices() {
  return db.select().from(notices).orderBy(desc(notices.createdAt));
}
