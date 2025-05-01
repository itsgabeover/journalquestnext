// app/dashboard/layout.tsx
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Menu, X, ChevronsLeft, ChevronsRight, BookOpen } from "lucide-react";
import SidebarNav from "@/components/DashboardNav";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize(); // initial

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-parchment-light">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col h-screen overflow-x-hidden  ${
          isCollapsed ? "w-20" : "w-64"
        } bg-parchment-dark border-r border-leather-light shadow-md transition-all duration-300 z-20`}
      >
        <div className="flex justify-between items-center p-3 border-b border-leather-light/20">
          {!isCollapsed && (
            <div className="flex items-center gap-2 px-2">
              <span className="font-bold text-leather-dark text-lg text-nowrap">
                Journal Quest
              </span>
            </div>
          )}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="text-leather-dark hover:bg-leather-light/10"
          >
            {isCollapsed ? <ChevronsRight /> : <ChevronsLeft />}
          </Button>
        </div>
        <SidebarNav isCollapsed={isCollapsed} />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-parchment-dark border-b border-leather-light">
        <h1 className="text-xl font-bold text-leather-dark flex items-center gap-2">
          <span>Journal Quest</span>
        </h1>
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

      {/* Mobile Drawer */}
      {mobileOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="md:hidden fixed inset-0 z-50 bg-parchment-dark p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-leather-dark" />
              <span className="font-bold text-leather-dark text-lg">
                Hero Journal
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(false)}
            >
              <X className="w-6 h-6 text-leather-dark" />
            </Button>
          </div>
          <SidebarNav />
        </motion.div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-2 md:p-4 box-border">
        {children}
      </main>
    </div>
  );
}
