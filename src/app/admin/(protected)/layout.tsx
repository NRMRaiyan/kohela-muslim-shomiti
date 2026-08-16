import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminSidebar from "../AdminSidebar";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[var(--color-paper)]">
      <AdminSidebar userName={session.name} />
      <div className="flex-1 min-w-0">
        <main className="p-6 sm:p-10 max-w-5xl">{children}</main>
      </div>
    </div>
  );
}
