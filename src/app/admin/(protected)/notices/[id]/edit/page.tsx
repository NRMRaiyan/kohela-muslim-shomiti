import { notFound } from "next/navigation";
import { db } from "@/db";
import { notices } from "@/db/schema";
import { eq } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import NoticeForm from "@/components/admin/NoticeForm";
import { updateNotice } from "../../actions";

export default async function EditNoticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await db.select().from(notices).where(eq(notices.id, Number(id))).limit(1);
  const item = rows[0];
  if (!item) notFound();

  const action = updateNotice.bind(null, item.id);

  return (
    <div>
      <AdminPageHeader title="Edit Notice" description={item.title} />
      <NoticeForm action={action} initial={item} />
    </div>
  );
}
