"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Landmark,
  LogOut,
  Menu,
  User,
  BookOpen,
  Info,
  LogIn,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";

export default function NavBar({ user, setUser, setJournals }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoutClick = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
      method: "DELETE",
      credentials: "include",
    });
    setUser(null);
    setJournals([]);
    router.push("/");
    setIsOpen(false);
  };

  const navItems = user
    ? [
        { name: "Dashboard", href: "/dashboard", icon: Home },
        { name: "My Journals", href: "/myjournal", icon: BookOpen },
        { name: "My Profile", href: "/myprofile", icon: User },
        { name: "Home", href: "/", icon: Landmark },
        { name: "Archetypes", href: "/archetypes", icon: Info },
      ]
    : [
        { name: "Home", href: "/", icon: Landmark },
        { name: "Archetypes", href: "/archetypes", icon: Info },
        { name: "Sign Up", href: "/signup", icon: UserPlus },
        { name: "Login", href: "/login", icon: LogIn },
      ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-leather text-white px-3 py-2 rounded-md"
        onClick={() => setIsOpen(true)}
        aria-label="Toggle sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-[15vw] bg-parchment-light border-r border-leather-light/30 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"} 
        ${!isOpen ? "hidden lg:block" : ""} 
        lg:translate-x-0`}
      >
        <div className="flex flex-col h-full p-4 relative">
          {/* Close button for mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-md bg-leather text-white hover:bg-leather-dark lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-6 mt-2 flex justify-center">
            <Link href="/" className="flex items-center">
                        <Image src="/logo.png" alt="Logo" width={96} height={96} className="object-contain" /></Link>

          </div>

          <nav className="flex flex-col gap-2 mt-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md font-quicksand font-medium text-leather hover:bg-leather/10 ${
                  pathname === item.href ? "bg-leather/20 text-leather-dark" : ""
                } break-words whitespace-normal w-full`}
                onClick={() => setIsOpen(false)}
              >
                <span>{item.name}</span>
              </Link>
            ))}

            {user && (
              <button
                onClick={handleLogoutClick}
                className="flex items-center gap-3 px-4 py-2 rounded-md font-quicksand font-medium text-leather hover:bg-leather/10"
              >
                <LogOut className="w-5 h-5 text-leather" />
                <span>Logout</span>
              </button>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
}
