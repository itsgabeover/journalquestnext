"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FaBookOpen,
  FaFeatherAlt,
  FaScroll,
  FaMagic,
  FaCog,
  FaUser,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function SidebarNav({
  isCollapsed = false,
}: {
  isCollapsed?: boolean;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Welcome", icon: <FaFeatherAlt />, href: "/dashboard" },
    { name: "My Journals", icon: <FaBookOpen />, href: "/dashboard/journals" },
    { name: "Quest Board", icon: <FaScroll />, href: "/dashboard/questboard" },
    { name: "Oracle", icon: <FaMagic />, href: "/dashboard/oracle" },
    { name: "Profile", icon: <FaUser />, href: "/dashboard/profile" },
    { name: "Settings", icon: <FaCog />, href: "/dashboard/settings" },
  ];

  const mainNavItems = navItems.slice(0, 4);
  const secondaryNavItems = navItems.slice(4);

  return (
    <div className="flex flex-col h-screen">
      {/* Scrollable main nav */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-leather-light/50 scrollbar-track-parchment overflow-x-hidden text-nowrap">
        {mainNavItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 cursor-pointer transition-all",
                pathname === item.href
                  ? "bg-leather text-white shadow-md"
                  : "text-leather-dark hover:bg-leather/10"
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <span className={cn("text-xl", isCollapsed && "mx-auto")}>
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className="text-base font-semibold">{item.name}</span>
              )}
            </motion.div>
          </Link>
        ))}
      </nav>

      {/* Pinned bottom nav */}
      <div className="px-4 py-4 border-t border-leather-light/20 flex flex-col gap-3">
        {secondaryNavItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-2 cursor-pointer transition-all",
                pathname === item.href
                  ? "bg-leather text-white shadow-md"
                  : "text-leather-dark hover:bg-leather/10"
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <span className={cn("text-xl", isCollapsed && "mx-auto")}>
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className="text-base font-semibold">{item.name}</span>
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
