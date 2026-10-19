import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";

export default function ShopLoading() {
  return (
    <div className="w-full py-6 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 w-12 bg-[var(--surface-alt)] rounded-md" />
        <div className="h-3 w-3 bg-[var(--surface-alt)] rounded-md" />
        <div className="h-4 w-16 bg-[var(--surface-alt)] rounded-md" />
      </div>

      {/* Top Bar Skeleton */}
      <div className="h-16 w-full bg-[var(--surface-elevated)] rounded-2xl border border-[var(--border-color)] mb-6" />

      {/* Main layout: Sidebar skeleton + Products grid skeleton */}
      <div className="flex flex-col lg:flex-row items-start gap-6 xl:gap-8">
        {/* Full-Length Desktop Sidebar Skeleton */}
        <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
          <div className="bg-[var(--surface-elevated)] rounded-2xl border border-[var(--border-color)] p-5 space-y-5 shadow-xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-md bg-primary/20" />
                <div className="h-3.5 w-16 bg-[var(--surface-alt)] rounded-md" />
              </div>
              <div className="h-3 w-10 bg-red-100 dark:bg-red-950/40 rounded-md" />
            </div>

            {/* Categories Section */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-sm bg-primary/20" />
                <div className="h-3 w-20 bg-[var(--surface-alt)] rounded-md" />
              </div>
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-[var(--border-color)] p-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary/20" />
                      <div className={`h-3 ${i % 2 === 0 ? "w-28" : "w-20"} bg-[var(--surface-alt)] rounded-md`} />
                    </div>
                    <div className="w-3.5 h-3.5 rounded-full bg-[var(--surface-alt)]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range Section */}
            <div className="space-y-3 pt-2 border-t border-[var(--border-color)]">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-sm bg-primary/20" />
                <div className="h-3 w-24 bg-[var(--surface-alt)] rounded-md" />
              </div>
              <div className="flex justify-between">
                <div className="h-3 w-10 bg-primary/20 rounded-md" />
                <div className="h-3 w-10 bg-primary/20 rounded-md" />
              </div>
              <div className="h-2 w-full bg-[var(--surface-alt)] rounded-full" />
              <div className="h-8 w-full bg-[var(--surface-alt)] rounded-lg" />
            </div>

            {/* Discount Section */}
            <div className="space-y-2.5 pt-2 border-t border-[var(--border-color)]">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-sm bg-primary/20" />
                <div className="h-3 w-16 bg-[var(--surface-alt)] rounded-md" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-6 w-14 rounded-full bg-[var(--surface-alt)]" />
                ))}
              </div>
            </div>

            {/* Featured & In Stock Section */}
            <div className="space-y-3 pt-2 border-t border-[var(--border-color)]">
              <div className="p-3 rounded-xl border border-[var(--border-color)] space-y-2">
                <div className="h-3 w-16 bg-amber-200/60 dark:bg-amber-950/60 rounded-md" />
                <div className="flex gap-4">
                  <div className="h-4 w-12 bg-[var(--surface-alt)] rounded-full" />
                  <div className="h-4 w-20 bg-[var(--surface-alt)] rounded-full" />
                </div>
              </div>
              <div className="p-3 rounded-xl border border-[var(--border-color)] flex items-center justify-between">
                <div className="space-y-1">
                  <div className="h-3 w-20 bg-[var(--surface-alt)] rounded-md" />
                  <div className="h-2 w-16 bg-[var(--surface-alt)] rounded-md" />
                </div>
                <div className="h-5 w-9 bg-[var(--surface-alt)] rounded-full" />
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid Skeleton */}
        <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-px bg-[var(--border-color)] rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-xs">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div key={idx} className="bg-[var(--surface-elevated)] h-full">
              <ProductCardSkeleton hasRightBorder={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
