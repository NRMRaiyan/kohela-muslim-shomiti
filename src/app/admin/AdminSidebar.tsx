"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Bell,
  CalendarDays,
  Users,
  Image as ImageIcon,
  Settings,
  Mail,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { logout } from "./auth-actions";

const links = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard, exact: true },
  { href: "/admin/news", label: "News", Icon: Newspaper },
  { href: "/admin/notices", label: "Notices", Icon: Bell },
  { href: "/admin/events", label: "Events", Icon: CalendarDays },
  { href: "/admin/committee", label: "Committee", Icon: Users },
  { href: "/admin/gallery", label: "Gallery", Icon: ImageIcon },
  { href: "/admin/messages", label: "Messages", Icon: Mail },
  { href: "/admin/settings", label: "Site Settings", Icon: Settings },
];

export default function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-[var(--color-forest-dark)] text-white/90 min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="font-display text-lg font-semibold text-white">Kohela Shomitti</div>
        <div className="text-xs text-white/50 mt-0.5">Committee Dashboard</div>
      </div>

      <nav className="flex-1 py-4 px-3 flex flex-col gap-0.5">
        {links.map(({ href, label, Icon, exact }) => {
          const active = exact ? pathname === href : pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-[var(--color-gold)] text-[var(--color-forest-dark)]"
                  : "hover:bg-white/10 text-white/85"
              }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10 flex flex-col gap-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 text-white/85"
        >
          <ExternalLink size={17} /> View site
        </a>
        <div className="px-3 py-2 text-xs text-white/45 truncate">{userName}</div>
        <form action={logout}>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 text-white/85">
            <LogOut size={17} /> Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
