import { notFound } from "next/navigation";
import { db } from "@/db";
import { committee } from "@/db/schema";
import { eq } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import MemberForm from "@/components/admin/MemberForm";
import { updateMember } from "../../actions";

export default async function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await db.select().from(committee).where(eq(committee.id, Number(id))).limit(1);
  const item = rows[0];
  if (!item) notFound();

  const action = updateMember.bind(null, item.id);

  return (
    <div>
      <AdminPageHeader title="Edit Committee Member" description={item.name} />
      <MemberForm action={action} initial={item} />
    </div>
  );
}
