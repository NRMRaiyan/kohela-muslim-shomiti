import { notFound } from "next/navigation";
import { db } from "@/db";
import { news } from "@/db/schema";
import { eq } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import NewsForm from "@/components/admin/NewsForm";
import { updateNews } from "../../actions";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await db.select().from(news).where(eq(news.id, Number(id))).limit(1);
  const item = rows[0];
  if (!item) notFound();

  const action = updateNews.bind(null, item.id);

  return (
    <div>
      <AdminPageHeader title="Edit News" description={item.title} />
      <NewsForm action={action} initial={item} />
    </div>
  );
}
