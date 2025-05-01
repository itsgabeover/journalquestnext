"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Landmark,
  LogOut,
  Menu,
  Info,
  LogIn,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout } from "@/lib/features/auth/authSlice";
import { useToast } from "@/hooks/use-toast";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const user = useAppSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = async () => {
    setIsLoggingOut(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: "DELETE",
        credentials: "include",
      });

      dispatch(logout());
      router.push("/");
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
        variant: "default",
      });
    } catch (error: unknown) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "Something went wrong while logging out.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
      setIsOpen(false);
    }
  };

  const navItems = [
    { name: "Home", href: "/", icon: Landmark },
    { name: "Archetypes", href: "/archetypes", icon: Info },
    ...(user
      ? [{ name: "Dashboard", href: "/dashboard", icon: Home }]
      : [
          { name: "Sign Up", href: "/signup", icon: UserPlus },
          { name: "Login", href: "/login", icon: LogIn },
        ]),
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
        />
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

          {/* Logo */}
          <div className="mb-6 mt-2 flex justify-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={96}
                height={96}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-2 mt-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md font-quicksand font-medium text-leather hover:bg-leather/10 ${
                  pathname === item.href
                    ? "bg-leather/20 text-leather-dark"
                    : ""
                } break-words whitespace-normal w-full`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5 text-leather" />
                <span>{item.name}</span>
              </Link>
            ))}

            {user && (
              <button
                onClick={handleLogoutClick}
                className="flex items-center gap-3 px-4 py-2 rounded-md font-quicksand font-medium text-leather hover:bg-leather/10 disabled:opacity-50"
                disabled={isLoggingOut}
              >
                <LogOut className="w-5 h-5 text-leather" />
                <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
              </button>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
}
