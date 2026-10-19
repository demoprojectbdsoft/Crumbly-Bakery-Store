"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Bell, User, Menu, Sun, Moon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import CartButton from "@/components/shared/CartButton";

import { useTheme } from "next-themes";

interface DashboardNavbarProps {
  onToggleSidebar: () => void;
}

export default function DashboardNavbar({ onToggleSidebar }: DashboardNavbarProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const isCustomerRoute = pathname.startsWith("/dashboard/customer");
  const userRole = ((user as { role?: string })?.role || (isCustomerRoute ? "customer" : "admin")).toLowerCase();
  const userImage = user?.image || (user as { avatar?: string })?.avatar;
  const displayName = user?.name || (userRole === "admin" ? "Alex Rivera" : "Valued Customer");
  const initial = displayName ? displayName.charAt(0).toUpperCase() : "U";

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = (resolvedTheme || theme) === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className="h-16 w-full border-b border-[var(--border-color)] bg-[var(--surface)]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Mobile Hamburger & Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
          className="lg:hidden p-2 rounded-xl border border-[var(--border-color)] text-[var(--foreground-muted)] hover:bg-[var(--surface-alt)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-48 sm:w-64 md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)]" />
          <input
            type="text"
            placeholder="Search orders, products, items..."
            className="w-full pl-10 pr-4 py-2 bg-[var(--surface-alt)] border border-[var(--border-color)] focus:border-primary rounded-xl text-xs focus:outline-none focus:bg-[var(--surface)] transition-all placeholder:text-[var(--foreground-muted)] text-[var(--foreground)]"
          />
        </div>
      </div>

      {/* Controls & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Switcher Toggle */}
        {mounted && (
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-9 h-9 rounded-xl border border-[var(--border-color)] flex items-center justify-center text-[var(--foreground-muted)] hover:bg-[var(--surface-alt)] hover:text-primary transition-colors cursor-pointer"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-primary transition-transform hover:-rotate-12" />
            )}
          </button>
        )}

        {/* Notifications Bell */}
        <button
          aria-label="Notifications"
          className="w-9 h-9 rounded-xl border border-[var(--border-color)] flex items-center justify-center text-[var(--foreground-muted)] hover:bg-[var(--surface-alt)] hover:text-[var(--foreground)] transition-colors relative cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
        </button>

        {/* Cart Item Count & Dollar Total — hidden for admin/demoadmin */}
        {userRole !== "admin" && userRole !== "demoadmin" && (
          <CartButton
            showTotal={true}
            className="px-2 py-1.5 rounded-xl hover:bg-[var(--surface-alt)] transition-colors"
          />
        )}

        <div className="h-5 w-px bg-[var(--border-color)] hidden sm:block" />

        {/* User Profile Link */}
        <Link
          href={isCustomerRoute ? "/dashboard/customer/profile" : "/dashboard/admin/profile"}
          className="flex items-center gap-3 pl-1 hover:opacity-85 transition-opacity"
        >
          <div className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs shadow-xs overflow-hidden shrink-0">
            {userImage ? (
              <Image
                src={userImage}
                alt={displayName}
                fill
                sizes="32px"
                className="object-cover rounded-full"
                unoptimized
              />
            ) : (
              <span>{initial}</span>
            )}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-[var(--foreground)] leading-none truncate max-w-[120px]">
              {displayName}
            </p>
            <p className="text-[10px] text-[var(--foreground-muted)] mt-1 leading-none capitalize">
              {userRole === "demoadmin" ? "Demo Admin" : userRole === "admin" ? "Store Admin" : "Customer Account"}
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
