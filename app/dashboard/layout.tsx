"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavLinks = () => (
    <nav className="flex flex-col gap-2 text-fluidBase">
      <Link href="/dashboard">
        <Button
          variant={pathname === "/dashboard" ? "default" : "outline"}
          className="w-full justify-start"
        >
          🏠 Welcome
        </Button>
      </Link>
      <Link href="/dashboard/journals">
        <Button
          variant={pathname.includes("journals") ? "default" : "outline"}
          className="w-full justify-start"
        >
          📚 My Journals
        </Button>
      </Link>
      <Link href="/dashboard/quests">
        <Button
          variant={pathname.includes("quests") ? "default" : "outline"}
          className="w-full justify-start"
        >
          📜 Quest Board
        </Button>
      </Link>
      <Link href="/dashboard/oracle">
        <Button
          variant={pathname.includes("oracle") ? "default" : "outline"}
          className="w-full justify-start"
        >
          🔮 Oracle
        </Button>
      </Link>
    </nav>
  );

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 bg-parchment-dark border-r p-4">
        <NavLinks />
      </aside>

      {/* Mobile Topbar */}
      <div className="flex items-center justify-between p-4 md:hidden border-b bg-parchment-dark">
        <h1 className="text-lg font-bold">Dashboard</h1>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-parchment-dark/95 p-4">
          <div className="flex justify-end">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setMobileOpen(false)}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          <NavLinks />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-fluidPadding">{children}</main>
    </div>
  );
}
