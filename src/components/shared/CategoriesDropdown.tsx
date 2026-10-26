"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ChevronDown, AlertCircle, Menu } from "lucide-react";
import { Category, SubCategory } from "@/types";
import { getCategories } from "@/lib/api/categories";
import { getSubCategories } from "@/lib/api/subCategories";
import CategoryItem from "./CategoryItem";
import SubCategoryMenu from "./SubCategoryMenu";

interface CategoriesDropdownProps {
  initialCategories?: Category[];
  initialSubCategories?: SubCategory[];
  variant?: "default" | "departments" | "docked";
  label?: string;
  defaultOpen?: boolean;
}

export default function CategoriesDropdown({
  initialCategories,
  initialSubCategories,
  variant = "default",
  label = "All Departments",
  defaultOpen = false,
}: CategoriesDropdownProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [categories, setCategories] = useState<Category[]>(initialCategories || []);
  const [subCategories, setSubCategories] = useState<SubCategory[]>(
    initialSubCategories || []
  );
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!initialCategories?.length);

  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      setCategories(initialCategories);
      if (initialSubCategories) setSubCategories(initialSubCategories);
      const defaultId =
        initialCategories[0]._id || initialCategories[0].id || initialCategories[0].slug;
      setActiveCategoryId(defaultId);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchData() {
      try {
        const [catRes, subRes] = await Promise.allSettled([
          getCategories(),
          getSubCategories(),
        ]);

        if (!isMounted) return;

        let loadedCategories: Category[] = [];
        let loadedSubCategories: SubCategory[] = [];

        if (catRes.status === "fulfilled") {
          const val = catRes.value;
          if (val?.success && Array.isArray(val.data)) {
            loadedCategories = val.data;
          } else if (Array.isArray(val)) {
            loadedCategories = val;
          }
        }

        if (subRes.status === "fulfilled") {
          const val = subRes.value;
          if (val?.success && Array.isArray(val.data)) {
            loadedSubCategories = val.data;
          } else if (Array.isArray(val)) {
            loadedSubCategories = val;
          }
        }

        const activeCats = loadedCategories.filter((c) => c.isActive !== false);
        setCategories(activeCats);
        setSubCategories(loadedSubCategories.filter((s) => s.isActive !== false));

        if (activeCats.length > 0) {
          const defaultId =
            activeCats[0]._id || activeCats[0].id || activeCats[0].slug;
          setActiveCategoryId(defaultId);
        }
      } catch (err) {
        console.error("Failed to fetch categories/subcategories:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [initialCategories, initialSubCategories]);

  // Map subcategories to categoryId for fast lookup
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

  // Active Category (for dropdown)
  const activeCategory = useMemo(() => {
    if (!categories.length) return null;
    if (activeCategoryId) {
      const found = categories.find(
        (c) =>
          (c._id && c._id === activeCategoryId) ||
          (c.id && c.id === activeCategoryId) ||
          c.slug === activeCategoryId
      );
      if (found) return found;
    }
    return categories[0] || null;
  }, [categories, activeCategoryId]);

  const activeSubCategories = useMemo(() => {
    if (!activeCategory) return [];
    const catId = activeCategory._id || activeCategory.id || "";
    return subCategoryMap.get(String(catId)) || [];
  }, [activeCategory, subCategoryMap]);

  // Hovered Category (for docked sidebar on homepage hero)
  const hoveredCategory = useMemo(() => {
    if (!hoveredCategoryId) return null;
    return (
      categories.find(
        (c) =>
          (c._id && c._id === hoveredCategoryId) ||
          (c.id && c.id === hoveredCategoryId) ||
          c.slug === hoveredCategoryId
      ) || null
    );
  }, [categories, hoveredCategoryId]);

  const hoveredSubCategories = useMemo(() => {
    if (!hoveredCategory) return [];
    const catId = hoveredCategory._id || hoveredCategory.id || "";
    return subCategoryMap.get(String(catId)) || [];
  }, [hoveredCategory, subCategoryMap]);

  // ── Render Docked (Always Visible on Homepage Hero) ──
  if (variant === "docked") {
    return (
      <div
        className="relative w-[270px] bg-[var(--surface-elevated)] border border-[var(--border-color)] shadow-md rounded-b-xl z-40"
        onMouseLeave={() => setHoveredCategoryId(null)}
      >
        {/* Top Header */}
        <div className="bg-brand-gradient text-[var(--on-grad-text)] px-5 py-3.5 font-bold text-sm flex items-center gap-2.5 rounded-t-xl select-none">
          <Menu className="w-4 h-4 stroke-[2.5]" />
          <span>{label}</span>
        </div>

        {/* Categories list */}
        {isLoading ? (
          <div className="py-1 flex flex-col divide-y divide-[var(--border-color)]/60">
            {Array.from({ length: 10 }).map((_, i) => {
              const widths = ["w-3/5", "w-4/5", "w-2/3", "w-3/4", "w-1/2", "w-4/5", "w-3/5", "w-2/3"];
              return (
                <div
                  key={i}
                  className="flex items-center justify-between px-5 py-[12px] animate-pulse"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-4 h-4 rounded-full bg-[var(--border-color)] dark:bg-[var(--surface)] shrink-0" />
                    <div
                      className={`h-3.5 bg-[var(--border-color)] dark:bg-[var(--surface)] rounded-md ${widths[i % widths.length]}`}
                    />
                  </div>
                  <div className="w-3 h-3 rounded-full bg-[var(--surface-alt)] shrink-0" />
                </div>
              );
            })}
          </div>
        ) : categories.length === 0 ? (
          <div className="p-4 text-xs text-[var(--foreground-muted)] text-center">No categories</div>
        ) : (
          <div className="py-1 flex flex-col relative">
            {categories.map((category) => {
              const catKey = category._id || category.id || category.slug;
              const isHovered =
                (hoveredCategory?._id && hoveredCategory._id === category._id) ||
                (hoveredCategory?.slug && hoveredCategory.slug === category.slug);

              const relatedSubs =
                subCategoryMap.get(String(category._id || category.id || "")) || [];

              return (
                <CategoryItem
                  key={catKey}
                  category={category}
                  isActive={Boolean(isHovered)}
                  hasSubCategories={relatedSubs.length > 0}
                  onHover={() => setHoveredCategoryId(catKey)}
                />
              );
            })}

            {/* Stable Single Submenu flyout anchored at top-0 left-full with bridge */}
            {hoveredCategory && (
              <div
                className="absolute left-[calc(100%-1px)] top-0 z-50 animate-in fade-in-50 duration-150 shadow-2xl border border-[var(--border-color)] rounded-r-xl overflow-hidden bg-[var(--surface-elevated)]"
                onMouseEnter={() => {
                  if (hoveredCategoryId) setHoveredCategoryId(hoveredCategoryId);
                }}
              >
                <SubCategoryMenu
                  category={hoveredCategory}
                  subCategories={hoveredSubCategories}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ── Render Dropdown (Standard or Departments Button) ──
  const isDepartments = variant === "departments";

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Categories Trigger Button */}
      {isDepartments ? (
        <button
          type="button"
          aria-label="All Departments Menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-brand-gradient text-[var(--on-grad-text)] font-bold text-xs sm:text-[13px] px-4 sm:px-5 py-3 rounded-t-lg flex items-center justify-between gap-3 w-[220px] sm:w-[260px] lg:w-[270px] transition-colors cursor-pointer shadow-sm"
        >
          <span className="flex items-center gap-2.5">
            <Menu className="w-4 h-4 stroke-[2.5]" />
            <span>{label}</span>
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      ) : (
        <button
          type="button"
          aria-label="Categories Menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 font-bold text-sm text-[var(--foreground)] hover:text-primary transition-colors cursor-pointer bg-transparent border-0 p-0 focus:outline-none"
        >
          <span>Categories</span>
          <ChevronDown
            className={`w-4 h-4 text-[var(--foreground-muted)] transition-transform duration-200 ${
              isOpen ? "rotate-180 text-primary" : ""
            }`}
          />
        </button>
      )}

      {/* Mega Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-0 z-50 animate-in fade-in-50 slide-in-from-top-1 duration-150">
          <div className="flex bg-[var(--surface-elevated)] border border-[var(--border-color)] shadow-2xl overflow-hidden rounded-b-xl">
            {/* Accent Bar at top */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand-gradient z-20" />

            {isLoading ? (
              <div className="w-[260px] py-1 bg-[var(--surface-elevated)] divide-y divide-[var(--border-color)]/60">
                {Array.from({ length: 7 }).map((_, i) => {
                  const widths = ["w-3/5", "w-4/5", "w-2/3", "w-3/4", "w-1/2", "w-4/5", "w-3/5"];
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between px-5 py-[12px] animate-pulse"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="w-4 h-4 rounded-full bg-[var(--surface-alt)] shrink-0" />
                        <div
                          className={`h-3.5 bg-[var(--surface-alt)] rounded-md ${widths[i % widths.length]}`}
                        />
                      </div>
                      <div className="w-3 h-3 rounded-full bg-[var(--surface-alt)]/50 shrink-0" />
                    </div>
                  );
                })}
              </div>
            ) : categories.length === 0 ? (
              <div className="flex items-center justify-center p-8 w-[300px] text-[var(--foreground-muted)] gap-2">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs">No categories found</span>
              </div>
            ) : (
              <>
                {/* Left Column: Category List */}
                <div className="w-[260px] pt-3 pb-1 bg-[var(--surface-elevated)] border-r border-[var(--border-color)] flex flex-col shrink-0">
                  {categories.map((category) => {
                    const catKey =
                      category._id || category.id || category.slug;
                    const isSelected =
                      (activeCategory?._id &&
                        activeCategory._id === category._id) ||
                      (activeCategory?.slug &&
                        activeCategory.slug === category.slug);

                    const relatedSubs =
                      subCategoryMap.get(
                        String(category._id || category.id || "")
                      ) || [];

                    return (
                      <CategoryItem
                        key={catKey}
                        category={category}
                        isActive={Boolean(isSelected)}
                        hasSubCategories={relatedSubs.length > 0}
                        onHover={() => setActiveCategoryId(catKey)}
                        onClick={() => setIsOpen(false)}
                      />
                    );
                  })}
                </div>

                {/* Right Column: Dynamic SubCategory Menu with Category Background */}
                {activeCategory && (
                  <div className="animate-in fade-in-50 duration-150">
                    <SubCategoryMenu
                      category={activeCategory}
                      subCategories={activeSubCategories}
                      onItemClick={() => setIsOpen(false)}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
