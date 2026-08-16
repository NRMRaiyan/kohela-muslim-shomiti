import AdminPageHeader from "@/components/admin/AdminPageHeader";
import SettingsForm from "@/components/admin/SettingsForm";
import { getSettings } from "@/lib/data";

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  return (
    <div>
      <AdminPageHeader title="Site Settings" description="Content shown across the whole website." />
      <SettingsForm initial={settings} />
    </div>
  );
}
