import AdminPageHeader from "@/components/admin/AdminPageHeader";
import NoticeForm from "@/components/admin/NoticeForm";
import { createNotice } from "../actions";

export default function NewNoticePage() {
  return (
    <div>
      <AdminPageHeader title="Add Notice" description="Publish a new official notice." />
      <NoticeForm action={createNotice} />
    </div>
  );
}
