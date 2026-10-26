"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Category } from "@/types";

interface CategoryItemProps {
  category: Category;
  isActive: boolean;
  hasSubCategories: boolean;
  onHover: () => void;
  onClick?: () => void;
}

export default function CategoryItem({
  category,
  isActive,
  hasSubCategories,
  onHover,
  onClick,
}: CategoryItemProps) {
  return (
    <div
      onMouseEnter={onHover}
      className={`group relative flex items-center justify-between px-5 py-[11px] text-[13px] transition-all duration-150 border-b border-[var(--border-color)]/60 last:border-0 cursor-pointer ${
        isActive
          ? "bg-[var(--primary)]/10 text-primary font-bold"
          : "text-[var(--foreground-muted)] hover:bg-[var(--surface-alt)] hover:text-[var(--foreground)]"
      }`}
    >
      {/* Active Left Accent Bar */}
      {isActive && (
        <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
      )}

      <Link
        href={`/shop?category=${category.slug}`}
        onClick={onClick}
        className="flex-1 truncate pr-2 transition-colors"
      >
        {category.name}
      </Link>

      {hasSubCategories && (
        <ChevronRight
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-150 ${
            isActive
              ? "text-primary translate-x-0.5"
              : "text-[var(--foreground-muted)] group-hover:text-primary"
          }`}
        />
      )}
    </div>
  );
}
