import React from "react";

interface ProductCardSkeletonProps {
  hasRightBorder?: boolean;
}

export default function ProductCardSkeleton({
  hasRightBorder = false,
}: ProductCardSkeletonProps) {
  return (
    <div
      className={`relative flex flex-col justify-between p-2.5 sm:p-4 
        bg-[var(--surface-elevated)] 
        h-full rounded-xl animate-pulse ${
        hasRightBorder ? "border-r border-[var(--border-color)]" : ""
      }`}
    >
      {/* Top Image Skeleton */}
      <div className="relative w-full h-32 sm:h-44 md:h-48 rounded-lg bg-[var(--surface-alt)] mb-2 sm:mb-3 overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Category & Title Skeleton */}
      <div className="flex-1 flex flex-col space-y-2 mb-2 sm:mb-3">
        {/* Category tag skeleton */}
        <div className="h-2.5 w-16 bg-primary/20 rounded-full" />
        {/* Title skeleton */}
        <div className="h-3.5 w-4/5 bg-[var(--surface-alt)] rounded-md" />
        <div className="h-3.5 w-3/5 bg-[var(--surface-alt)] rounded-md" />
        {/* Rating skeleton */}
        <div className="flex items-center gap-1.5 py-0.5">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-xs bg-[var(--surface-alt)]" />
            ))}
          </div>
          <div className="h-2.5 w-6 bg-[var(--surface-alt)] rounded-full" />
        </div>
        {/* Description line skeleton (hidden on mobile) */}
        <div className="hidden sm:block h-2.5 w-1/2 bg-[var(--surface-alt)] rounded-md" />
      </div>

      {/* Bottom Footer: Price & Button Skeleton */}
      <div className="flex items-end justify-between pt-1.5 sm:pt-2 border-t border-[var(--border-color)]">
        <div className="space-y-1">
          <div className="h-2.5 w-10 bg-[var(--surface-alt)] rounded-full" />
          <div className="h-4 sm:h-5 w-14 bg-[var(--surface-alt)] rounded-md" />
        </div>
        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[var(--surface-alt)]" />
      </div>
    </div>
  );
}
