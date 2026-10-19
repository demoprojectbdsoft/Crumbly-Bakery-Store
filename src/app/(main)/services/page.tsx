"use client";

import React from "react";
import Link from "next/link";
import {
  Wrench,
  Shield,
  Zap,
  RefreshCw,
  Smartphone,
  Laptop,
  Cpu,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Headphones,
} from "lucide-react";
import { useSiteSettings } from "@/context/SiteSettingsContext";

const SERVICES = [
  {
    icon: Laptop,
    title: "Device Diagnostics & Repair",
    desc: "Certified technician inspection and fast hardware/software repair services for laptops, desktops, and handhelds.",
    badge: "Hardware & OS",
  },
  {
    icon: Shield,
    title: "Extended Warranty & Protection",
    desc: "Comprehensive warranty plans covering accidental drops, liquid spills, screen fractures, and component wear.",
    badge: "Full Coverage",
  },
  {
    icon: RefreshCw,
    title: "Trade-In & Rapid Upgrades",
    desc: "Trade in your existing gadgets for immediate store credit and seamlessly upgrade to cutting-edge tech models.",
    badge: "Instant Credit",
  },
  {
    icon: Zap,
    title: "Custom PC & Rig Assembly",
    desc: "Custom high-performance workstation and gaming configurations tailored, bench-tested, and built by specialists.",
    badge: "Bench Tested",
  },
  {
    icon: Smartphone,
    title: "Mobile Phone Setup & Migration",
    desc: "Hassle-free data transfer, cloud syncing, tempered glass application, and deep device optimization.",
    badge: "Data Safe",
  },
  {
    icon: Cpu,
    title: "Enterprise IT & Bulk Fleet",
    desc: "Corporate tech procurement, workstation deployment, prioritized hardware lifecycle management, and dedicated support.",
    badge: "Enterprise",
  },
];

export default function ServicesPage() {
  const { settings } = useSiteSettings();
  const siteName = settings.siteName || "Sparq";

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
          Comprehensive Tech Services & Solutions
        </h1>
        <p className="text-sm md:text-base text-[var(--foreground-muted)] leading-relaxed">
          Beyond offering top-tier electronics at {siteName}, our certified engineers provide end-to-end repairs, warranty protection, custom PC builds, and corporate IT infrastructure.
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
                  <span>Certified Service</span>
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Help Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[var(--surface-elevated)] via-[var(--surface-alt)] to-[var(--surface-elevated)] border border-[var(--border-color)] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/25 shrink-0">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-[var(--foreground)]">
              Need a Custom Solution or Immediate Repair?
            </h4>
            <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
              Our technical helpdesk is available 24/7 to assist with diagnostics and scheduling.
            </p>
          </div>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-primary/25 transition-all cursor-pointer shrink-0"
        >
          <span>Contact Specialist</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
