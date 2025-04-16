// app/dashboard/layout.tsx
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-parchment-dark border-r p-4">
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard">
            <Button variant={pathname === "/dashboard" ? "default" : "outline"}>🏠 Welcome</Button>
          </Link>
          <Link href="/dashboard/journals">
            <Button variant={pathname.includes("journals") ? "default" : "outline"}>📚 My Journals</Button>
          </Link>
          <Link href="/dashboard/quests">
            <Button variant={pathname.includes("quests") ? "default" : "outline"}>📜 Quest Board</Button>
          </Link>
          <Link href="/dashboard/oracle">
            <Button variant={pathname.includes("oracle") ? "default" : "outline"}>🔮 Oracle</Button>
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
