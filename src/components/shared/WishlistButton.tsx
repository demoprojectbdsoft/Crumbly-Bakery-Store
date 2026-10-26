"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { getWishlistByUserId } from "@/lib/api/wishlist";
import { authClient } from "@/lib/auth-client";

interface WishlistButtonProps {
  className?: string;
  onClick?: () => void;
}

export default function WishlistButton({
  className = "",
  onClick,
}: WishlistButtonProps) {
  // ── User Session ──────────────────────────────────────────────────────────
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // ── Wishlist Badge Count ──────────────────────────────────────────────────
  const [count, setCount] = useState<number>(0);

  // ── Reactive Wishlist Sync ────────────────────────────────────────────────
  // Automatically loads wishlist when user logs in AND updates live whenever
  // a "wishlist-updated" event is dispatched anywhere in the app (e.g. product card or details).
  useEffect(() => {
    // Reset badge if user is not signed in
    if (!user?.id) {
      setCount(0);
      return;
    }

    // Function to fetch latest wishlist item count
    const loadWishlist = () => {
      getWishlistByUserId(user.id)
        .then((res) => {
          if (res?.success && res.data) {
            const total =
              res.data.totalItems ??
              res.data.itemCount ??
              (Array.isArray(res.data) ? res.data.length : res.data.items?.length || 0);
            setCount(total);
          }
        })
        .catch(() => {});
    };

    // Initial fetch on mount / user change
    loadWishlist();

    // Listen for global custom event dispatched on wishlist modifications
    window.addEventListener("wishlist-updated", loadWishlist);
    return () => window.removeEventListener("wishlist-updated", loadWishlist);
  }, [user?.id]);

  return (
    <Link
      href={user ? "/dashboard/customer/wishlist" : "/auth/login?callbackUrl=/dashboard/customer/wishlist"}
      onClick={onClick}
      aria-label="Wishlist"
      className={`relative flex items-center text-[var(--foreground-secondary)] dark:text-[var(--foreground)] hover:text-primary transition-colors ${className}`}
    >
      <div className="relative p-0.5">
        <Heart className="w-5 h-5 stroke-[1.8]" />
        {/* Wishlist count badge (only shown when authenticated) */}
        {Boolean(user) && (
          <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
            {count}
          </span>
        )}
      </div>
    </Link>
  );
}
