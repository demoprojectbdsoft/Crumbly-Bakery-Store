"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { Category, SubCategory } from "@/types";

interface SubCategoryMenuProps {
  category: Category;
  subCategories: SubCategory[];
  onItemClick?: () => void;
}

export default function SubCategoryMenu({
  category,
  subCategories,
  onItemClick,
}: SubCategoryMenuProps) {
  const bgImage =
    typeof category.image === "string" && category.image.trim().length > 0
      ? category.image
      : undefined;

  return (
    <div className="relative flex flex-col justify-between w-[460px] min-h-[380px] p-6 bg-[var(--surface-elevated)] dark:bg-[var(--surface-alt)] overflow-hidden">
      {/* Background Image of the Category */}
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-right-bottom bg-no-repeat transition-all duration-300 opacity-20 dark:opacity-15 pointer-events-none"
          style={{ backgroundImage: `url("${bgImage}")` }}
        />
      )}

      {/* Subtle Gradient Overlays for contrast */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/95 via-white/85 to-white/60 dark:from-gray-950/95 dark:via-gray-950/85 dark:to-gray-950/70 pointer-events-none" />

      {/* Submenu Content */}
      <div className="relative z-10 flex flex-col flex-1 justify-between">
        <div>
          {/* Category Header */}
          <div className="pb-3 mb-4 border-b border-[var(--border-color)]/80 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Category</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)] dark:text-[var(--foreground)]">
                {category.name}
              </h3>
              {category.description && (
                <p className="text-xs text-[var(--foreground-muted)] line-clamp-2 mt-1 max-w-sm">
                  {category.description}
                </p>
              )}
            </div>
          </div>

          {/* Subcategories List / Grid */}
          <div>
            {subCategories.length > 0 ? (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--foreground-muted)] mb-2.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Subcategories ({subCategories.length})</span>
                </div>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {subCategories.map((sub) => (
                    <li key={sub._id || sub.id || sub.slug}>
                      <Link
                        href={`/shop?category=${category.slug}&subCategory=${sub.slug}`}
                        onClick={onItemClick}
                        className="group flex items-center justify-between p-2 rounded-md text-[13px] text-[var(--foreground)] hover:text-primary dark:hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
                      >
                        <span className="truncate group-hover:translate-x-0.5 transition-transform duration-150">
                          {sub.name}
                        </span>
                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 text-primary shrink-0 ml-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <Layers className="w-5 h-5" />
                </div>
                <p className="text-sm font-medium text-[var(--foreground)]">
                  Explore all {category.name} products
                </p>
                <p className="text-xs text-[var(--foreground-muted)] mt-1 max-w-xs">
                  Browse our collection and find the best deals in this category.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Link: View All */}
        <div className="mt-6 pt-3 border-t border-[var(--border-color)]/80 flex items-center justify-between">
          <Link
            href={`/shop?category=${category.slug}`}
            onClick={onItemClick}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)] hover:text-primary transition-colors"
          >
            <span>View all in {category.name}</span>
            <ArrowRight className="w-3.5 h-3.5 text-primary" />
          </Link>
        </div>
      </div>
    </div>
  );
}
