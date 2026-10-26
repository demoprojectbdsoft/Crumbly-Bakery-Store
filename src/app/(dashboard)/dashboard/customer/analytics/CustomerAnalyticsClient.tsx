"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  Button,
  Chip,
} from "@heroui/react";
import {
  BarChart3,
  TrendingUp,
  CreditCard,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  Sparkles,
  PieChart as PieChartIcon,
  Tag,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import type { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { toast } from "react-toastify";

const TIMEFRAMES = ["Last 30 Days", "Last 6 Months", "This Year", "All Time"];

const MONTHLY_ANALYTICS_DATA = [
  { month: "Jan", spending: 140, savings: 25, orders: 1 },
  { month: "Feb", spending: 260, savings: 45, orders: 2 },
  { month: "Mar", spending: 190, savings: 30, orders: 2 },
  { month: "Apr", spending: 320, savings: 60, orders: 3 },
  { month: "May", spending: 210, savings: 40, orders: 1 },
  { month: "Jun", spending: 480, savings: 95, orders: 3 },
  { month: "Jul", spending: 110, savings: 15, orders: 1 },
  { month: "Aug", spending: 380, savings: 75, orders: 2 },
];

const ORDER_STATUS_DISTRIBUTION = [
  { name: "Delivered", value: 11, color: "#0284c7" },
  { name: "Shipped / In Transit", value: 2, color: "#2563eb" },
  { name: "Processing", value: 1, color: "#6366f1" },
];

const BRAND_SPENDING_DATA = [
  { brand: "Apple", spend: 950, percentage: 48, color: "#0284c7" },
  { brand: "Sony", spend: 420, percentage: 22, color: "#2563eb" },
  { brand: "Logitech", spend: 280, percentage: 15, color: "#6366f1" },
  { brand: "Samsung", spend: 192, percentage: 15, color: "#38bdf8" },
];

export default function CustomerAnalyticsClient() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("This Year");

  const handleExport = () => {
    toast.success("Generating your spending & purchase analytics report...");
    setTimeout(() => {
      toast.info("Report downloaded successfully: Customer_Analytics_2026.csv");
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--foreground-muted)] mb-1">
            <Link href="/dashboard/customer" className="hover:text-primary transition-colors">
              Customer Dashboard
            </Link>
            <span>/</span>
            <span className="text-primary">Analytics</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            Spending &amp; Order{" "}
            <span className="text-gradient-primary">
              Analytics
            </span>
          </h1>
          <p className="text-xs md:text-sm text-[var(--foreground-muted)] mt-1">
            Comprehensive insights into your shopping habits, brand affinity, and promo savings.
          </p>
        </div>

        {/* Timeframe & Export */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center bg-[var(--surface-alt)]/80 p-1 rounded-xl border border-[var(--border-color)]">
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedTimeframe === tf
                    ? "bg-[var(--surface-elevated)] text-primary shadow-xs"
                    : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] dark:hover:text-white"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <Button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs transition-all cursor-pointer h-9"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* ── Key Metrics Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Spend */}
        <Card className="bg-[var(--surface-elevated)] border border-[var(--border-color)] rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--foreground-muted)]">
              Total Spend ({selectedTimeframe})
            </span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-[var(--foreground)]">$1,842.50</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">
              +14% vs previous period
            </p>
          </div>
        </Card>

        {/* Average Order Value */}
        <Card className="bg-[var(--surface-elevated)] border border-[var(--border-color)] rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--foreground-muted)]">
              Average Order Value (AOV)
            </span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-[var(--foreground)]">$131.60</p>
            <p className="text-xs text-[var(--foreground-muted)] mt-1">Across 14 completed orders</p>
          </div>
        </Card>

        {/* Promo Code Savings */}
        <Card className="bg-[var(--surface-elevated)] border border-[var(--border-color)] rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--foreground-muted)]">
              Discounts &amp; Promo Savings
            </span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Tag className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-[var(--foreground)]">$280.00</p>
            <p className="text-xs text-primary font-semibold mt-1">
              13.2% saved on retail MSRP
            </p>
          </div>
        </Card>

        {/* Purchase Frequency */}
        <Card className="bg-[var(--surface-elevated)] border border-[var(--border-color)] rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--foreground-muted)]">
              Purchase Frequency
            </span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-[var(--foreground)]">1.75 / mo</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">
              Consistent active shopper
            </p>
          </div>
        </Card>
      </div>

      {/* ── Main Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending vs Savings Bar Chart */}
        <Card className="lg:col-span-2 bg-[var(--surface-elevated)] border border-[var(--border-color)] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[var(--foreground)]">
                Monthly Spending vs. Promo Savings
              </h3>
              <p className="text-xs text-[var(--foreground-muted)]">
                Comparison of net spend vs total discounts unlocked
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-primary" />
                <span className="text-[var(--foreground-muted)]">Spent ($)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-[var(--accent)]" />
                <span className="text-[var(--foreground-muted)]">Saved ($)</span>
              </div>
            </div>
          </div>

          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_ANALYTICS_DATA} barGap={6}>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--surface-elevated)",
                    border: "none",
                    borderRadius: "12px",
                    color: "var(--foreground)",
                    fontSize: "12px",
                  }}
                  formatter={(val: ValueType | undefined) => [`$${Number(val ?? 0)}`, "Amount"]}
                />
                <Bar dataKey="spending" fill="var(--primary)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="savings" fill="var(--secondary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Order Status Distribution */}
        <Card className="bg-[var(--surface-elevated)] border border-[var(--border-color)] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-[var(--foreground)]">
              Order Fulfillment
            </h3>
            <p className="text-xs text-[var(--foreground-muted)]">
              Delivery success rate &amp; active shipments
            </p>
          </div>

          <div className="h-56 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ORDER_STATUS_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ORDER_STATUS_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--surface-elevated)",
                    border: "none",
                    borderRadius: "12px",
                    color: "var(--foreground)",
                    fontSize: "12px",
                  }}
                  formatter={(val: ValueType | undefined) => [`${Number(val ?? 0)} Orders`, "Count"]}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-extrabold text-[var(--foreground)]">
                14
              </span>
              <span className="text-[10px] text-[var(--foreground-muted)]">Total Orders</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            {ORDER_STATUS_DISTRIBUTION.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[var(--foreground-muted)] font-medium">
                    {item.name}
                  </span>
                </div>
                <span className="font-bold text-[var(--foreground)]">
                  {item.value} ({Math.round((item.value / 14) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Brand Affinity Breakdown ── */}
      <Card className="bg-[var(--surface-elevated)] border border-[var(--border-color)] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[var(--foreground)]">
              Brand Affinity &amp; Spend Distribution
            </h3>
            <p className="text-xs text-[var(--foreground-muted)]">
              Brands where you purchased the most products
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {BRAND_SPENDING_DATA.map((brand, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--surface-alt)]/50 dark:bg-[var(--surface-alt)]/40 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[var(--foreground)]">
                  {brand.brand}
                </span>
                <span className="text-xs font-extrabold text-primary">
                  {brand.percentage}%
                </span>
              </div>
              <p className="text-xs text-[var(--foreground-muted)]">
                ${brand.spend.toFixed(2)} Total Spent
              </p>
              <div className="w-full bg-[var(--surface-alt)] dark:bg-[var(--surface)] h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${brand.percentage}%`,
                    backgroundColor: brand.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
