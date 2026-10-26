"use client";

import React from "react";
import Link from "next/link";
import {
  Shield,
  RefreshCw,
  Truck,
  HeartHandshake,
  BadgeCheck,
  Gift,
  Star,
  ArrowRight,
  Headphones,
  Sparkles,
  CheckCircle2,
  CreditCard,
  PackageSearch,
} from "lucide-react";
import { useSiteSettings } from "@/context/SiteSettingsContext";

const SERVICES = [
  {
    icon: Truck,
    title: "Fast & Reliable Delivery",
    desc: "We offer swift shipping options with real-time tracking so your orders arrive safely and on time, every time.",
    badge: "Shipping",
  },
  {
    icon: RefreshCw,
    title: "Hassle-Free Returns",
    desc: "Not satisfied? Return or exchange any item within our return window — no questions asked, full refund guaranteed.",
    badge: "Easy Returns",
  },
  {
    icon: Shield,
    title: "Buyer Protection",
    desc: "Every purchase is protected. Shop with confidence knowing your payment and product quality are fully guaranteed.",
    badge: "100% Secure",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment Options",
    desc: "Pay the way you prefer — credit/debit cards, digital wallets, bank transfers, and installment plans available.",
    badge: "Multi-Payment",
  },
  {
    icon: PackageSearch,
    title: "Order Tracking & Updates",
    desc: "Stay informed at every step with automated order status notifications via email or SMS from dispatch to delivery.",
    badge: "Live Tracking",
  },
  {
    icon: Gift,
    title: "Gift Cards & Vouchers",
    desc: "Send joy to loved ones with our digital gift cards and vouchers — redeemable on any product across the store.",
    badge: "Gift Ready",
  },
  {
    icon: Star,
    title: "Loyalty & Rewards Program",
    desc: "Earn points on every purchase and redeem them for exclusive discounts, early access deals, and special perks.",
    badge: "Earn Points",
  },
  {
    icon: BadgeCheck,
    title: "Quality Assurance",
    desc: "Every product listed on our platform is vetted for quality and authenticity before it reaches your doorstep.",
    badge: "Verified",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated Customer Support",
    desc: "Our friendly support team is available around the clock to help you with queries, complaints, and after-sale care.",
    badge: "24/7 Support",
  },
];

export default function ServicesPage() {
  const { settings } = useSiteSettings();
  const siteName = settings.siteName || "Our Store";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-12 relative overflow-hidden">
      {/* ── Ambient Radial Glow Backdrop ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[42rem] h-[22rem] bg-[radial-gradient(ellipse_at_top,var(--primary),transparent)] opacity-10 pointer-events-none" />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[var(--foreground-muted)] relative z-10">
        <Link href="/" className="hover:text-primary transition-colors cursor-pointer">
          Home
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-semibold">Our Services</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mx-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span>What We Offer</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-[var(--foreground)] tracking-tight">
          Everything You Need, In One Place
        </h1>
        <p className="text-sm md:text-base text-[var(--foreground-muted)] leading-relaxed">
          At {siteName}, we go beyond just selling products. We provide a complete shopping experience — from secure checkout to doorstep delivery and outstanding after-sale support.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className="p-6 sm:p-7 rounded-2xl border border-[var(--border-color)] bg-[var(--surface-elevated)] shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--surface-alt)] border border-[var(--border-color)] text-[var(--foreground-muted)]">
                    {service.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[var(--foreground)] group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-semibold text-primary">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Included with Every Order</span>
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Help Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[var(--surface-elevated)] via-[var(--surface-alt)] to-[var(--surface-elevated)] border border-[var(--border-color)] shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/25 shrink-0">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-[var(--foreground)]">
              Have a Question or Need Help?
            </h4>
            <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
              Reach us at{" "}
              <strong className="text-[var(--foreground)]">
                {settings.supportPhone || "(800) 8001-8588"}
              </strong>{" "}
              • {settings.openingHours || "Mon - Fri: 9:00 AM - 8:00 PM"}
            </p>
            <p className="text-xs text-primary mt-1 font-semibold">
              <a
                href={`mailto:${settings.supportEmail || "support@store.com"}`}
                className="hover:underline"
              >
                {settings.supportEmail || "support@store.com"}
              </a>
              {settings.contactEmail && (
                <>
                  <span className="text-[var(--foreground-muted)] mx-2">•</span>
                  <a href={`mailto:${settings.contactEmail}`} className="hover:underline">
                    {settings.contactEmail}
                  </a>
                </>
              )}
            </p>
          </div>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-primary/25 transition-all cursor-pointer shrink-0"
        >
          <span>Get in Touch</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
