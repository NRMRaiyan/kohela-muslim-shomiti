import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { desc } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import MessagesList from "./MessagesList";

export default async function AdminMessagesPage() {
  let items: Awaited<ReturnType<typeof fetchMessages>> = [];
  try {
    items = await fetchMessages();
  } catch {
    items = [];
  }

  return (
    <div>
      <AdminPageHeader title="Messages" description="Messages submitted through the Contact page." />
      <MessagesList items={items} />
    </div>
  );
}

async function fetchMessages() {
  return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
}
