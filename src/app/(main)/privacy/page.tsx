"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Separator } from "@heroui/react";
import { ShieldCheck, ArrowLeft, Clock, Lock, Eye, Database, Sparkles } from "lucide-react";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export default function PrivacyPage() {
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
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold tracking-wide border border-primary/20 mx-auto mt-1">
              <Sparkles className="w-3 h-3" />
              <span>Data Protection Guarantee</span>
            </div>
            <CardTitle className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] mt-1">
              Privacy Policy
            </CardTitle>
            <CardDescription className="text-sm text-[var(--foreground-muted)] max-w-xl mx-auto">
              Your privacy is paramount. Discover how {siteName} collects, uses, and safeguards your information with bank-grade security standards.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 space-y-8 text-[var(--foreground)] text-sm leading-relaxed">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold">1</span>
                <span>Information We Collect</span>
              </h2>
              <p className="text-[var(--foreground-muted)]">
                We collect personal details that you provide directly to us when creating an account, updating your profile, placing orders, or contacting our support team.
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-[var(--foreground-muted)] pl-2">
                <li>Personal identification details (Name, Email address, Profile avatar).</li>
                <li>Billing and delivery details required for order processing and tracking.</li>
                <li>Technical metadata (Browser type, device info, session logs).</li>
              </ul>
            </section>

            <Separator className="bg-[var(--border-color)]" />

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold">2</span>
                <span>How We Use Your Information</span>
              </h2>
              <p className="text-[var(--foreground-muted)]">
                We use the information collected to fulfill orders, facilitate account login, personalize your shopping experience, communicate order tracking updates, and protect our store against fraud.
              </p>
            </section>

            <Separator className="bg-[var(--border-color)]" />

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold">3</span>
                <span>Data Security & Protection Protocols</span>
              </h2>
              <p className="text-[var(--foreground-muted)]">
                {siteName} employs TLS 1.3 encryption, secure salted hashes, and hardened cloud infrastructure to ensure your personal data is protected. We never sell your personal information to third-party data brokers.
              </p>
            </section>

            <Separator className="bg-[var(--border-color)]" />

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold">4</span>
                <span>Your Privacy Rights & Controls</span>
              </h2>
              <p className="text-[var(--foreground-muted)]">
                You have the right to request access to, update, or permanently delete your personal data stored on {siteName} at any time directly through your account settings or by contacting our support team at{" "}
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
