"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";

export default function DashboardHome() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);
  const pathname = usePathname();

  //Redirect if not logged in after loading finishes
  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?next=${pathname}`);
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null;
  }

  if (loading) {
  return <div className="p-6">Loading...</div>;
}

  return (
    <div className="space-y-6">
      {/* Exit Dashboard Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => router.push("/")}
          variant="outline"
          className="flex items-center gap-2 text-leather-dark border-leather hover:bg-parchment-dark"
        >
          <LogOut className="w-4 h-4" />
          Exit Dashboard
        </Button>
      </div>

      <h1 className="text-3xl font-bold font-quicksand text-leather-dark">
        Welcome back, {user?.first_name || "Hero"}! 🧭
      </h1>

      <p className="text-leather text-lg max-w-2xl">
        Your journey continues. Choose where you'd like to go:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
        <Card className="p-6 space-y-2 shadow-md border-mythicalBlue-200">
          <h2 className="text-xl font-semibold text-leather-dark">📚 My Journals</h2>
          <p className="text-leather text-sm">View, sort, and reflect on your past entries.</p>
          <Link href="/dashboard/journals">
            <Button className="mt-2 bg-leather text-white hover:bg-leather-dark" size="sm">
              Go to Journals
            </Button>
          </Link>
        </Card>

        <Card className="p-6 space-y-2 shadow-md border-mythicalBlue-200">
          <h2 className="text-xl font-semibold text-leather-dark">📜 Quest Board</h2>
          <p className="text-leather text-sm">Track your goals and personal challenges.</p>
          <Link href="/dashboard/quests">
            <Button className="mt-2 bg-leather text-white hover:bg-leather-dark" size="sm">
              Go to QuestBoard
            </Button>
          </Link>
        </Card>

        <Card className="p-6 space-y-2 shadow-md border-mythicalBlue-200">
          <h2 className="text-xl font-semibold text-leather-dark">🔮 The Oracle</h2>
          <p className="text-leather text-sm">Let the Oracle uncover insights from your entries.</p>
          <Link href="/dashboard/oracle">
            <Button className="mt-2 bg-leather text-white hover:bg-leather-dark" size="sm">
              Consult the Oracle
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
