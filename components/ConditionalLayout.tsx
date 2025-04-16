// components/ConditionalLayout.tsx
"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar";
import UserLoader from "@/components/UserLoader";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const inDashboard = pathname?.startsWith("/dashboard");

  return (
    <>
      {!inDashboard && <NavBar />}
      <UserLoader />
      <main className={!inDashboard ? "lg:ml-[15vw]" : ""}>{children}</main>
    </>
  );
}
