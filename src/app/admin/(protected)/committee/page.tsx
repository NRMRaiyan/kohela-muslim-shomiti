import { db } from "@/db";
import { committee } from "@/db/schema";
import { asc } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import CommitteeTable from "./CommitteeTable";

export default async function AdminCommitteePage() {
  let items: Awaited<ReturnType<typeof fetchMembers>> = [];
  try {
    items = await fetchMembers();
  } catch {
    items = [];
  }

  return (
    <div>
      <AdminPageHeader
        title="Committee"
        description="Manage committee members shown on the Committee page."
        newHref="/admin/committee/new"
        newLabel="Add member"
      />
      <CommitteeTable items={items} />
    </div>
  );
}

async function fetchMembers() {
  return db.select().from(committee).orderBy(asc(committee.sortOrder));
}
