"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@heroui/react";
import {
  ArrowLeft,
  Package,
  Layers,
  Sparkles,
  DollarSign,
  CheckCircle2,
  XCircle,
  Star,
  Tag,
  Hash,
  Info,
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  ShoppingBag,
  Boxes,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  UserCheck,
  AlertTriangle,
  Maximize2,
} from "lucide-react";
import ImageGalleryModal from "@/components/shared/ImageGalleryModal";
import { Product } from "@/types";

interface ProductDetailClientProps {
  product: Product;
}

function formatDate(dateValue?: string | Date | null) {
  if (!dateValue) return "—";
  try {
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const allImages = [
    product.image,
    ...(product.additionalImages || []),
  ].filter(Boolean);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);

  const openGallery = (index: number) => {
    setGalleryInitialIndex(index >= 0 && index < allImages.length ? index : 0);
    setIsGalleryOpen(true);
  };

  const catName =
    product.categoryId?.name ||
    (product.categories && product.categories[0]) ||
    "Uncategorized";

  // ── Financial & Sales Computations ──────────────────────────
  const sellCount = typeof product.sellCount === "number" ? product.sellCount : 0;
  const stockQuantity = typeof product.stockQuantity === "number" ? product.stockQuantity : 0;
  const price = typeof product.price === "number" ? product.price : 0;
  const originalPrice = product.originalPrice;
  const investPrice = product.investPrice;

  const hasInvestPrice = investPrice != null && !isNaN(investPrice);
  const unitProfit = hasInvestPrice ? price - investPrice : null;
  const isUnitProfitable = unitProfit != null && unitProfit >= 0;

  // Profit margin %: (Selling Price - Cost) / Selling Price * 100
  const profitMargin =
    hasInvestPrice && price > 0
      ? ((price - investPrice) / price) * 100
      : null;

  // Markup %: (Selling Price - Cost) / Cost * 100
  const markupPercent =
    hasInvestPrice && investPrice > 0
      ? ((price - investPrice) / investPrice) * 100
      : null;

  // Realized Gross Revenue & Realized Net Profit / Loss
  const totalRevenue = price * sellCount;
  const totalCost = hasInvestPrice ? investPrice * sellCount : null;
  const totalProfitLoss = hasInvestPrice && unitProfit != null ? unitProfit * sellCount : null;
  const isTotalProfitable = totalProfitLoss != null && totalProfitLoss >= 0;

  // Inventory Valuations
  const inventoryRetailValue = price * stockQuantity;
  const inventoryCostValue = hasInvestPrice ? investPrice * stockQuantity : null;

  // Offer Status
  const isOfferExpired =
    product.isOfferExpired ||
    (product.offerEndDate && new Date(product.offerEndDate).getTime() <= Date.now());

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* ── Breadcrumb & Action Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <Link href="/dashboard/admin" className="hover:text-sky-600 transition-colors">
            Admin
          </Link>
          <span>/</span>
          <Link href="/dashboard/admin/products" className="hover:text-sky-600 transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-sky-600 dark:text-sky-400 font-bold truncate max-w-xs">
            {product.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/shop/${product.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sky-200 dark:border-sky-800/60 bg-sky-50 dark:bg-sky-950/40 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-900/50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View in Store</span>
          </Link>

          <Link
            href="/dashboard/admin/products"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>

      {/* ── Main Product Header & Summary ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-gray-900 p-6 rounded-3xl border border-slate-200/80 dark:border-gray-800 shadow-xs">
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 text-xs font-bold border border-sky-200/50 dark:border-sky-800/40">
              <Layers className="w-3.5 h-3.5" />
              {catName}
            </span>

            {product.inStock ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40">
                <CheckCircle2 className="w-3 h-3" />
                In Stock ({stockQuantity} units)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-800/40">
                <XCircle className="w-3 h-3" />
                Out of Stock
              </span>
            )}

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/40">
              <ShoppingBag className="w-3 h-3" />
              {sellCount} Units Sold
            </span>

            {product.isFeatured && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/40">
                <Sparkles className="w-3 h-3" /> Featured Item
              </span>
            )}

            {product.offerEndDate && (
              <span
                className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
                  isOfferExpired
                    ? "bg-slate-100 dark:bg-gray-800 text-gray-500 border-slate-200 dark:border-gray-700"
                    : "bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border-red-200/60 dark:border-red-800/40"
                }`}
              >
                <Clock className="w-3 h-3" />
                {isOfferExpired ? "Offer Lapsed" : "Active Special Offer"}
              </span>
            )}

            {product.badges?.map((b) => (
              <span
                key={b}
                className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 uppercase tracking-wider border border-blue-200/50 dark:border-blue-900/40"
              >
                {b}
              </span>
            ))}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {product.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 font-mono">
            {product.sku && <span>SKU: {product.sku}</span>}
            <span>Slug: /{product.slug}</span>
            <span>ID: {product.id || product._id}</span>
            {product.ownerId && <span>Owner: {product.ownerId}</span>}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="flex md:flex-col items-baseline md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-gray-800 shrink-0">
          <span className="text-[11px] uppercase font-bold text-gray-400">Current Selling Price</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900 dark:text-white">
              ${price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm font-semibold text-gray-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.discountPercentage ? (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Save {product.discountPercentage}%
            </span>
          ) : null}
          {hasInvestPrice && (
            <span className="text-[11px] text-gray-400 mt-1">
              Cost: <strong className="text-gray-700 dark:text-gray-300 font-mono">${investPrice.toFixed(2)}</strong>
            </span>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          FINANCIAL PERFORMANCE & PROFIT / LOSS DASHBOARD
      ══════════════════════════════════════════════════════════════ */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-sky-500" />
            Financial Performance &amp; Profit / Loss Analytics
          </h2>
          <span className="text-xs text-gray-400 font-medium">
            Based on {sellCount} total units sold
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Units Sold (Sell Count) */}
          <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-3xl p-5 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Total Units Sold
              </span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-gray-900 dark:text-white font-mono">
                {sellCount}
              </span>
              <span className="ml-1.5 text-xs text-gray-400 font-semibold">units</span>
            </div>
            <div className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
              {sellCount > 0 ? (
                <span>Units purchased across customer orders</span>
              ) : (
                <span>No units sold yet</span>
              )}
            </div>
          </Card>

          {/* 2. Total Gross Sales Revenue */}
          <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-3xl p-5 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Total Revenue
              </span>
              <div className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-gray-900 dark:text-white font-mono">
                ${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
              Gross sales ({sellCount} × ${price.toFixed(2)})
            </div>
          </Card>

          {/* 3. Unit Profit / Loss */}
          <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-3xl p-5 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Unit Profit / Loss
              </span>
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  !hasInvestPrice
                    ? "bg-slate-100 dark:bg-gray-800 text-gray-400"
                    : isUnitProfitable
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                    : "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400"
                }`}
              >
                {!hasInvestPrice ? (
                  <Percent className="w-4 h-4" />
                ) : isUnitProfitable ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
              </div>
            </div>

            <div className="mt-3">
              {hasInvestPrice && unitProfit != null ? (
                <div className="flex items-baseline gap-1.5">
                  <span
                    className={`text-3xl font-black font-mono ${
                      isUnitProfitable
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {isUnitProfitable ? "+" : "-"}${Math.abs(unitProfit).toFixed(2)}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      isUnitProfitable
                        ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                        : "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
                    }`}
                  >
                    {isUnitProfitable ? "Profit" : "Loss"}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold text-gray-400 italic">Cost Not Set</span>
              )}
            </div>

            <div className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
              {hasInvestPrice && profitMargin != null ? (
                <span>
                  Margin: <strong className="text-gray-800 dark:text-gray-200">{profitMargin.toFixed(1)}%</strong>
                  {markupPercent != null && (
                    <span className="ml-1 text-gray-400">({markupPercent.toFixed(1)}% markup)</span>
                  )}
                </span>
              ) : (
                <span>Set cost price in Quick Edit</span>
              )}
            </div>
          </Card>

          {/* 4. Total Realized Profit / Loss */}
          <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-3xl p-5 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Total Realized P/L
              </span>
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  !hasInvestPrice
                    ? "bg-slate-100 dark:bg-gray-800 text-gray-400"
                    : isTotalProfitable
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                    : "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400"
                }`}
              >
                {!hasInvestPrice ? (
                  <TrendingUp className="w-4 h-4" />
                ) : isTotalProfitable ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
              </div>
            </div>

            <div className="mt-3">
              {hasInvestPrice && totalProfitLoss != null ? (
                <div className="flex items-baseline gap-1.5">
                  <span
                    className={`text-3xl font-black font-mono ${
                      isTotalProfitable
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {isTotalProfitable ? "+" : "-"}${Math.abs(totalProfitLoss).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold text-gray-400 italic">—</span>
              )}
            </div>

            <div className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
              {hasInvestPrice && totalCost != null ? (
                <span>
                  Total COGS: <strong className="text-gray-800 dark:text-gray-200">${totalCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                </span>
              ) : (
                <span>Requires cost price to compute</span>
              )}
            </div>
          </Card>
        </div>

        {/* Financial Breakdown Secondary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-gray-800/40 rounded-2xl border border-slate-200/60 dark:border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Inventory Stock Value</span>
              <span className="text-base font-black text-gray-900 dark:text-white font-mono">
                ${inventoryRetailValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-[10px] text-gray-400 block mt-0.5">{stockQuantity} units @ retail</span>
            </div>
            <Boxes className="w-6 h-6 text-sky-500/60" />
          </div>

          <div className="p-4 bg-slate-50 dark:bg-gray-800/40 rounded-2xl border border-slate-200/60 dark:border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Capital Tied in Stock</span>
              <span className="text-base font-black text-gray-900 dark:text-white font-mono">
                {hasInvestPrice && inventoryCostValue != null
                  ? `$${inventoryCostValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : "Cost not set"}
              </span>
              <span className="text-[10px] text-gray-400 block mt-0.5">
                {hasInvestPrice ? `${stockQuantity} units @ $${investPrice.toFixed(2)} cost` : "Add cost price"}
              </span>
            </div>
            <DollarSign className="w-6 h-6 text-emerald-500/60" />
          </div>

          <div className="p-4 bg-slate-50 dark:bg-gray-800/40 rounded-2xl border border-slate-200/60 dark:border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Promotion &amp; Offer Status</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white block mt-0.5">
                {product.offerEndDate
                  ? isOfferExpired
                    ? "Lapsed on " + formatDate(product.offerEndDate)
                    : "Ends " + formatDate(product.offerEndDate)
                  : "Standard Pricing"}
              </span>
              <span className="text-[10px] text-gray-400 block">
                {product.discountPercentage ? `${product.discountPercentage}% active discount` : "No special discount applied"}
              </span>
            </div>
            <Clock className="w-6 h-6 text-amber-500/60" />
          </div>
        </div>
      </div>

      {/* ── Grid: Media + Full Details ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Product Images Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-3xl p-4 overflow-hidden shadow-xs">
            {/* Active Image */}
            <div
              onClick={() => openGallery(activeImageIndex)}
              className="relative w-full aspect-square bg-slate-50 dark:bg-gray-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-gray-700/60 cursor-zoom-in group"
            >
              {allImages[activeImageIndex] ? (
                <>
                  <Image
                    src={allImages[activeImageIndex]}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                  {/* Click to Expand Button Badge */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openGallery(activeImageIndex);
                    }}
                    title="Click to expand gallery"
                    className="absolute bottom-3 right-3 z-10 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 shadow-md transition-all hover:scale-105 flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>View Gallery ({allImages.length})</span>
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Package className="w-16 h-16" />
                </div>
              )}
            </div>

            {/* Thumbnail previews */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pt-4">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    onDoubleClick={() => openGallery(idx)}
                    title="Click to preview, double click to expand gallery"
                    className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer bg-slate-50 dark:bg-gray-800 p-1 ${
                      activeImageIndex === idx
                        ? "border-sky-500 shadow-xs ring-2 ring-sky-500/20"
                        : "border-slate-200 dark:border-gray-700 hover:border-sky-300 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumb ${idx + 1}`}
                      fill
                      sizes="64px"
                      className="object-contain"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </Card>

          {/* Quick Stats: Ratings & Inventory */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">
                Customer Rating
              </span>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-base font-black text-gray-900 dark:text-white">
                  {product.rating ?? 0}
                </span>
                <span className="text-xs text-gray-400">
                  ({product.reviewCount ?? 0} reviews)
                </span>
              </div>
            </Card>

            <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">
                Inventory Units
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-gray-900 dark:text-white font-mono">
                  {stockQuantity}
                </span>
                <span className="text-xs text-gray-400">in stock</span>
              </div>
            </Card>
          </div>

          {/* System & Audit Information */}
          <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-500" />
              Audit &amp; System Timestamps
            </h3>

            <div className="space-y-2 text-xs divide-y divide-slate-100 dark:divide-gray-800">
              <div className="flex items-center justify-between pt-1">
                <span className="text-gray-500 dark:text-gray-400">Created At:</span>
                <span className="font-mono text-gray-900 dark:text-white font-semibold">
                  {formatDate(product.createdAt)}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-gray-500 dark:text-gray-400">Last Updated:</span>
                <span className="font-mono text-gray-900 dark:text-white font-semibold">
                  {formatDate(product.updatedAt)}
                </span>
              </div>

              {product.offerEndDate && (
                <div className="flex items-center justify-between pt-2">
                  <span className="text-gray-500 dark:text-gray-400">Offer Expiration:</span>
                  <span className="font-mono text-gray-900 dark:text-white font-semibold">
                    {formatDate(product.offerEndDate)}
                  </span>
                </div>
              )}

              {product.ownerId && (
                <div className="flex items-center justify-between pt-2">
                  <span className="text-gray-500 dark:text-gray-400">Owner User ID:</span>
                  <span className="font-mono text-gray-900 dark:text-white font-semibold truncate max-w-[160px]">
                    {product.ownerId}
                  </span>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right: Specifications, Description & Hierarchy (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Description */}
          <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Info className="w-4 h-4 text-sky-500" />
              Product Description
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {product.description || "No product description provided."}
            </div>
          </Card>

          {/* Pricing & Profit Architecture */}
          <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-500" />
              Complete Pricing &amp; Margin Breakdown
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-gray-800/40 rounded-xl border border-slate-200/60 dark:border-gray-800">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Selling Price</span>
                <span className="text-base font-black text-gray-900 dark:text-white font-mono block mt-0.5">
                  ${price.toFixed(2)}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-gray-800/40 rounded-xl border border-slate-200/60 dark:border-gray-800">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Original Price (MSRP)</span>
                <span className="text-base font-black text-gray-900 dark:text-white font-mono block mt-0.5">
                  {originalPrice ? `$${originalPrice.toFixed(2)}` : "—"}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-gray-800/40 rounded-xl border border-slate-200/60 dark:border-gray-800">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Cost / Invest Price</span>
                <span className="text-base font-black text-gray-900 dark:text-white font-mono block mt-0.5">
                  {hasInvestPrice ? `$${investPrice.toFixed(2)}` : "—"}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-gray-800/40 rounded-xl border border-slate-200/60 dark:border-gray-800">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Discount %</span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono block mt-0.5">
                  {product.discountPercentage ? `${product.discountPercentage}%` : "0%"}
                </span>
              </div>
            </div>
          </Card>

          {/* Technical Specifications */}
          <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-500" />
              Technical Specifications
            </h2>

            {product.specifications && Object.keys(product.specifications).length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-gray-800 border border-slate-100 dark:border-gray-800 rounded-2xl overflow-hidden text-xs">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="grid grid-cols-3 p-3 bg-white dark:bg-gray-900 even:bg-slate-50/60 dark:even:bg-gray-800/30"
                  >
                    <span className="font-semibold text-gray-500 dark:text-gray-400">
                      {key}
                    </span>
                    <span className="col-span-2 font-medium text-gray-900 dark:text-white">
                      {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">
                No technical specifications available for this product.
              </p>
            )}
          </Card>

          {/* Hierarchy & Taxonomy */}
          <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-sky-500" />
              Categorization &amp; Hierarchy
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 dark:bg-gray-800/40 rounded-xl border border-slate-200/60 dark:border-gray-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">
                  Primary Category
                </span>
                <p className="font-bold text-gray-900 dark:text-white text-sm">
                  {catName}
                </p>
                {product.categoryId?.slug && (
                  <span className="text-[11px] font-mono text-gray-400 block">
                    /{product.categoryId.slug}
                  </span>
                )}
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-gray-800/40 rounded-xl border border-slate-200/60 dark:border-gray-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">
                  Subcategories
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {product.subCategoryIds && product.subCategoryIds.length > 0 ? (
                    product.subCategoryIds.map((s: any, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300"
                      >
                        {typeof s === "object" ? s.name : s}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 italic text-[11px]">None assigned</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <ImageGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={allImages}
        initialIndex={galleryInitialIndex}
        productTitle={product.title}
      />
    </div>
  );
}
