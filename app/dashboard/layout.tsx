// app/dashboard/layout.tsx
"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronsLeft, ChevronsRight } from "lucide-react";
import SidebarNav from "@/components/SidebarNav";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-collapse sidebar when screen is small
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize(); // Set initial sidebar state

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen md:flex-row bg-parchment-light">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block ${
          isCollapsed ? "w-20" : "w-64"
        } sticky top-0 self-start h-screen bg-parchment-dark border-r border-leather-light shadow-md transition-all duration-300 z-20`}
      >
        <div className="flex justify-end p-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="text-leather-dark"
          >
            {isCollapsed ? <ChevronsRight /> : <ChevronsLeft />}
          </Button>
        </div>
        <SidebarNav isCollapsed={isCollapsed} />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-parchment-dark border-b border-leather-light">
        <h1 className="text-xl font-bold text-leather-dark">📚 Hero Journal</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="w-6 h-6 text-leather-dark" />
          ) : (
            <Menu className="w-6 h-6 text-leather-dark" />
          )}
        </Button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-parchment-dark p-6">
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(false)}
            >
              <X className="w-6 h-6 text-leather-dark" />
            </Button>
          </div>
          <SidebarNav />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-y-auto p-6 box-border">
        {children}
      </main>
    </div>
  );
}
