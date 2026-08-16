import AdminPageHeader from "@/components/admin/AdminPageHeader";
import NewsForm from "@/components/admin/NewsForm";
import { createNews } from "../actions";

export default function NewNewsPage() {
  return (
    <div>
      <AdminPageHeader title="Add News" description="Publish a new news item or announcement." />
      <NewsForm action={createNews} />
    </div>
  );
}
