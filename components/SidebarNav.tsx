// components/SidebarNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FaBookOpen, FaFeatherAlt, FaScroll, FaMagic } from "react-icons/fa";

export default function SidebarNav({
  isCollapsed = false,
}: {
  isCollapsed?: boolean;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Welcome", icon: <FaFeatherAlt />, href: "/dashboard" },
    { name: "My Journals", icon: <FaBookOpen />, href: "/dashboard/journals" },
    { name: "Quest Board", icon: <FaScroll />, href: "/dashboard/quests" },
    { name: "Oracle", icon: <FaMagic />, href: "/dashboard/oracle" },
  ];

  return (
    <nav className="flex flex-col gap-4 px-4 py-6">
      {navItems.map((item) => (
        <Link key={item.name} href={item.href}>
          <div
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-2 cursor-pointer transition-all",
              pathname === item.href
                ? "bg-leather text-white shadow"
                : "text-leather-dark hover:bg-leather/10"
            )}
          >
            <span className="text-xl">{item.icon}</span>
            {!isCollapsed && (
              <span className="text-base font-semibold">{item.name}</span>
            )}
          </div>
        </Link>
      ))}
    </nav>
  );
}
