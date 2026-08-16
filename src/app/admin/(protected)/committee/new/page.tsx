import AdminPageHeader from "@/components/admin/AdminPageHeader";
import MemberForm from "@/components/admin/MemberForm";
import { createMember } from "../actions";

export default function NewMemberPage() {
  return (
    <div>
      <AdminPageHeader title="Add Committee Member" />
      <MemberForm action={createMember} />
    </div>
  );
}
