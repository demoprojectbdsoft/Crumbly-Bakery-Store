"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Separator } from "@heroui/react";
import { FileText, ArrowLeft, Clock, Sparkles } from "lucide-react";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export default function TermsPage() {
  const { settings } = useSiteSettings();
  const siteName = settings.siteName || "Sparq";
  const supportEmail = settings.supportEmail || "support@sparq.com";

  return (
    <div className="w-auto -mx-4 md:-mx-14 min-h-screen py-10 md:py-14 px-4 md:px-14 bg-[var(--background)] transition-colors relative overflow-hidden">
      {/* ── Ambient Radial Glow Backdrop ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] bg-[radial-gradient(ellipse_at_top,var(--primary),transparent)] opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Navigation Breadcrumb / Back link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--foreground-muted)] hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>Last updated: August 2026</span>
          </div>
        </div>

        {/* Page Hero Card */}
        <Card className="border border-[var(--border-color)] shadow-xl bg-[var(--surface-elevated)]/90 backdrop-blur-md rounded-2xl overflow-hidden">
          <CardHeader className="flex flex-col gap-2 p-8 text-center border-b border-[var(--border-color)] bg-[var(--surface-alt)]/50">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-xs">
              <FileText className="w-6 h-6" />
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold tracking-wide border border-primary/20 mx-auto mt-1">
              <Sparkles className="w-3 h-3" />
              <span>Customer Agreement</span>
            </div>
            <CardTitle className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] mt-1">
              Terms of Service
            </CardTitle>
            <CardDescription className="text-sm text-[var(--foreground-muted)] max-w-xl mx-auto">
              Please read these terms carefully before accessing or using {siteName}&apos;s online storefront and services.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 space-y-8 text-[var(--foreground)] text-sm leading-relaxed">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold">1</span>
                <span>Acceptance of Terms</span>
              </h2>
              <p className="text-[var(--foreground-muted)]">
                By accessing, browsing, or creating an account on {siteName}, you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
              </p>
            </section>

            <Separator className="bg-[var(--border-color)]" />

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold">2</span>
                <span>User Accounts & Responsibilities</span>
              </h2>
              <p className="text-[var(--foreground-muted)]">
                When you create an account on {siteName}, you must provide accurate, current, and complete information. You are solely responsible for maintaining the confidentiality of your credentials and account activities.
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-[var(--foreground-muted)] pl-2">
                <li>You must be at least 18 years of age or possess legal parental consent.</li>
                <li>You agree not to use the platform for fraudulent or unauthorized activities.</li>
                <li>{siteName} reserves the right to terminate accounts that violate platform policies.</li>
              </ul>
            </section>

            <Separator className="bg-[var(--border-color)]" />

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold">3</span>
                <span>Orders, Pricing & Payments</span>
              </h2>
              <p className="text-[var(--foreground-muted)]">
                All prices listed on {siteName} are subject to change without prior notice. We reserve the right to refuse or cancel any order for reasons including inventory availability, pricing inaccuracies, or suspected unauthorized payment transactions.
              </p>
            </section>

            <Separator className="bg-[var(--border-color)]" />

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold">4</span>
                <span>Intellectual Property</span>
              </h2>
              <p className="text-[var(--foreground-muted)]">
                The content, layout, logos, visual graphics, and code on {siteName} are owned by or licensed to {siteName} and are protected under international copyright and intellectual property conventions.
              </p>
            </section>

            <Separator className="bg-[var(--border-color)]" />

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold">5</span>
                <span>Contact & Inquiries</span>
              </h2>
              <p className="text-[var(--foreground-muted)]">
                If you have questions regarding these Terms of Service, please reach out directly to our dedicated customer support team at{" "}
                <a href={`mailto:${supportEmail}`} className="text-primary font-semibold hover:underline">
                  {supportEmail}
                </a>.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
