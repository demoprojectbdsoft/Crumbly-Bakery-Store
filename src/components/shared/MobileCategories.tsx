"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight, Layers, FolderTree } from "lucide-react";
import { Category, SubCategory } from "@/types";

interface MobileCategoriesProps {
  categories: Category[];
  subCategories: SubCategory[];
  onClose: () => void;
}

export default function MobileCategories({
  categories,
  subCategories,
  onClose,
}: MobileCategoriesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Group subcategories by parent category ID
  const subCategoryMap = useMemo(() => {
    const map = new Map<string, SubCategory[]>();

    for (const sub of subCategories) {
      if (sub.isActive === false) continue;
      const catId =
        typeof sub.categoryId === "object" && sub.categoryId !== null
          ? (sub.categoryId as { _id?: string; id?: string })._id ||
            (sub.categoryId as { _id?: string; id?: string }).id
          : sub.categoryId;

      if (catId) {
        const key = String(catId);
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(sub);
      }
    }

    return map;
  }, [subCategories]);

  const toggleExpand = (catId: string) => {
    setExpandedId((prev) => (prev === catId ? null : catId));
  };

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between px-1 text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <FolderTree className="w-3.5 h-3.5 text-primary" />
          Categories
        </span>
        <span className="text-[11px] font-medium text-[var(--foreground-muted)]">
          {categories.length} departments
        </span>
      </div>

      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--surface-elevated)]/60 divide-y divide-[var(--border-color)]/60 dark:divide-[var(--border-color)]/80 overflow-hidden shadow-xs">
        {categories.map((category) => {
          const catKey = String(category._id || category.id || category.slug);
          const relatedSubs = subCategoryMap.get(catKey) || [];
          const hasSubs = relatedSubs.length > 0;
          const isExpanded = expandedId === catKey;
          const imageUrl =
            typeof category.image === "string" && category.image.trim().length > 0
              ? category.image.trim()
              : undefined;

          return (
            <div key={catKey} className="transition-colors">
              {/* Category Header Row */}
              <div className="flex items-center justify-between p-2.5 hover:bg-[var(--surface-alt)] dark:hover:bg-[var(--surface-alt)]/50 transition-colors">
                <Link
                  href={`/shop?category=${category.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 flex-1 min-w-0 pr-2 group"
                >
                  {/* Category Image covering the container area */}
                  {imageUrl ? (
                    <div className="relative w-12 h-12 rounded-lg shrink-0 overflow-hidden bg-[var(--surface-alt)] dark:bg-[var(--surface)] border border-[var(--border-color)]/80 shadow-xs">
                      <Image
                        src={imageUrl}
                        alt={category.name}
                        fill
                        quality={95}
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                        sizes="96px"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0 text-primary border border-primary/20">
                      <Layers className="w-5 h-5" />
                    </div>
                  )}

                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-[13px] font-semibold text-[var(--foreground)] dark:text-[var(--foreground)] truncate group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
                    {hasSubs && (
                      <span className="text-[10px] text-[var(--foreground-muted)] font-medium">
                        {relatedSubs.length} subcategories
                      </span>
                    )}
                  </div>
                </Link>

                {/* Subcategories Expand / Collapse Button */}
                {hasSubs ? (
                  <button
                    type="button"
                    aria-label={`Toggle ${category.name} subcategories`}
                    onClick={() => toggleExpand(catKey)}
                    className={`p-2 rounded-lg border text-[var(--foreground-muted)] hover:text-primary dark:hover:text-primary transition-all duration-200 cursor-pointer ${
                      isExpanded
                        ? "bg-primary/10 border-primary/30 text-primary dark:text-primary"
                        : "border-transparent hover:bg-[var(--surface-alt)]"
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={`/shop?category=${category.slug}`}
                    onClick={onClose}
                    className="p-2 text-[var(--foreground-muted)] hover:text-primary transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>

              {/* Subcategories Collapsible Section */}
              {hasSubs && isExpanded && (
                <div className="bg-[var(--surface-alt)]/70 dark:bg-[var(--surface-alt)]/80 px-3 py-2.5 border-t border-[var(--border-color)]/80 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                  <div className="grid grid-cols-1 gap-1 pl-9 sm:pl-10">
                    {relatedSubs.map((sub) => (
                      <Link
                        key={sub._id || sub.id || sub.slug}
                        href={`/shop?category=${category.slug}&subCategory=${sub.slug}`}
                        onClick={onClose}
                        className="group flex items-center justify-between py-1.5 px-2 rounded-md text-xs text-[var(--foreground-muted)] hover:text-primary dark:hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
                      >
                        <span className="truncate group-hover:translate-x-0.5 transition-transform duration-150">
                          {sub.name}
                        </span>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-primary transition-opacity shrink-0" />
                      </Link>
                    ))}

                    <Link
                      href={`/shop?category=${category.slug}`}
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline pt-2 mt-1 border-t border-[var(--border-color)]/60 dark:border-[var(--border-color)]/60"
                    >
                      <span>View all in {category.name}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
