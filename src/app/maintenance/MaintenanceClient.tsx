"use client";

/**
 * MaintenancePage – Color Theme Test Page
 *
 * Every color comes from CSS custom properties derived from the active palette.
 * Zero hardcoded colors. Gradient brand surfaces use var(--brand-gradient).
 * Flat accent for text/borders/rings: var(--brand-flat).
 * Text on gradient: var(--on-grad-text) (auto black/white via CSS).
 */

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import {
  Mail, Phone,
  Share2, PlayCircle, Briefcase, Globe,
  Sun, Moon, Clock, Wrench, CheckCircle, ArrowRight, ExternalLink,
} from "lucide-react";
import type { SiteSettingsData } from "@/types";

// ── Social icon resolver ──────────────────────────────────────────────────────
function SocialIcon({ platform }: { platform: string }) {
  const p = platform.toLowerCase();
  const cls = "w-4 h-4";
  if (p.includes("youtube") || p.includes("video")) return <PlayCircle className={cls} />;
  if (p.includes("linkedin") || p.includes("work")) return <Briefcase className={cls} />;
  if (p.includes("facebook") || p.includes("twitter") || p.includes("instagram") || p.includes("social")) return <Share2 className={cls} />;
  return <Globe className={cls} />;
}

interface Props {
  settings: SiteSettingsData | null;
}

export default function MaintenancePage({ settings: serverSettings }: Props) {
  const { settings } = useSiteSettings();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isDark = mounted ? (resolvedTheme || theme) === "dark" : false;

  // Context settings win (supports live Settings Preview); fall back to server props
  const s: SiteSettingsData = settings || (serverSettings as SiteSettingsData);
  const siteName = s?.siteName || "Sparq";
  const supportEmail = s?.supportEmail || "support@sparq.com";
  const supportPhone = s?.supportPhone || "(800) 8001-8588";
  const socialLinks = s?.socialLinks || [];

  const navLogo = s?.navbarLogo;
  const lightLogo = navLogo?.light?.trim() || "";
  const darkLogo  = navLogo?.dark?.trim()  || "";
  const hasLogo   = !!(lightLogo || darkLogo);
  const activeLogo = isDark ? (darkLogo || lightLogo) : (lightLogo || darkLogo);

  // ── Inline CSS – all palette derivations in CSS, not JS ──────────────────
  const STYLES = `
    /* Brand gradient stops pulled from topBar palette tokens */
    :root {
      --grad-from: var(--site-topbar-from, #1d4ed8);
      --grad-via:  var(--site-topbar-via,  #0284c7);
      --grad-to:   var(--site-topbar-to,   #4338ca);
      --brand-flat: var(--site-topbar-via, #0284c7);
      --brand-gradient: linear-gradient(135deg, var(--grad-from) 0%, var(--grad-via) 50%, var(--grad-to) 100%);
      --brand-gradient-hover: linear-gradient(135deg,
        color-mix(in srgb, var(--grad-from) 85%, white) 0%,
        color-mix(in srgb, var(--grad-via)  85%, white) 50%,
        color-mix(in srgb, var(--grad-to)   85%, white) 100%);
      --brand-gradient-active: linear-gradient(135deg,
        color-mix(in srgb, var(--grad-from) 78%, black) 0%,
        color-mix(in srgb, var(--grad-via)  78%, black) 50%,
        color-mix(in srgb, var(--grad-to)   78%, black) 100%);
      --brand-gradient-disabled: linear-gradient(135deg,
        color-mix(in srgb, var(--grad-from) 40%, #888) 0%,
        color-mix(in srgb, var(--grad-via)  40%, #888) 50%,
        color-mix(in srgb, var(--grad-to)   40%, #888) 100%);
      --on-grad-text: white;
      --brand-shadow: 0 4px 18px -2px color-mix(in srgb, var(--grad-via) 45%, transparent);
      --brand-shadow-hover: 0 6px 24px -2px color-mix(in srgb, var(--grad-via) 65%, transparent);
      --focus-ring: 0 0 0 3px color-mix(in srgb, var(--brand-flat) 35%, transparent);
      --grad-border: color-mix(in srgb, var(--brand-flat) 40%, transparent);
    }
    /* Dark: lighten stops and flat accent so they remain vivid on near-black */
    .dark {
      --grad-from: color-mix(in srgb, var(--site-topbar-from, #1d4ed8) 72%, white);
      --grad-via:  color-mix(in srgb, var(--site-topbar-via,  #0284c7) 72%, white);
      --grad-to:   color-mix(in srgb, var(--site-topbar-to,   #4338ca) 72%, white);
      --brand-flat: color-mix(in srgb, var(--site-topbar-via, #0284c7) 80%, white);
      --on-grad-text: white;
    }
    /* Page */
    .maint-page { min-height:100vh; background:var(--background); color:var(--foreground); position:relative; overflow-x:hidden; }
    /* Ambient glow */
    .maint-glow { position:fixed; inset:0; pointer-events:none; z-index:0;
      background:radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in srgb, var(--grad-via) 18%, transparent), transparent 70%); }
    .dark .maint-glow { background:radial-gradient(ellipse 85% 55% at 50% -10%, color-mix(in srgb, var(--grad-via) 22%, transparent), transparent 75%); }
    /* Grad badge */
    .grad-badge { display:inline-flex; align-items:center; gap:.35rem; padding:.25rem .85rem; border-radius:999px;
      background:var(--brand-gradient); color:var(--on-grad-text); font-size:.72rem; font-weight:700;
      letter-spacing:.07em; text-transform:uppercase; box-shadow:var(--brand-shadow); border:1px solid transparent; transition:box-shadow .2s; }
    .dark .grad-badge { border-color:var(--grad-border); }
    /* Grad strip */
    .grad-strip { background:var(--brand-gradient); border-radius:1rem; padding:1.25rem 2rem;
      box-shadow:var(--brand-shadow); border:1px solid transparent; position:relative; overflow:hidden; }
    .dark .grad-strip { border-color:color-mix(in srgb, var(--brand-flat) 30%, transparent); box-shadow:0 8px 30px -4px color-mix(in srgb, var(--brand-flat) 35%, transparent); }
    .grad-strip::before { content:""; position:absolute; inset:0;
      background:linear-gradient(135deg,rgba(255,255,255,.08) 0%,transparent 60%); pointer-events:none; }
    .grad-strip-text { color:var(--on-grad-text); position:relative; z-index:1; }
    /* Primary btn */
    .btn-primary { display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
      padding:.625rem 1.375rem; border-radius:9999px; background:var(--brand-gradient); color:var(--on-grad-text);
      font-weight:600; font-size:.875rem; border:1px solid transparent; cursor:pointer;
      box-shadow:var(--brand-shadow); transition:background .25s,box-shadow .25s,transform .15s; outline:none; text-decoration:none; white-space:nowrap; }
    .dark .btn-primary { border-color:var(--grad-border); }
    .btn-primary:hover { background:var(--brand-gradient-hover); box-shadow:var(--brand-shadow-hover); transform:translateY(-1px); }
    .btn-primary:active { background:var(--brand-gradient-active); transform:translateY(0) scale(.98); box-shadow:var(--brand-shadow); }
    .btn-primary:focus-visible { box-shadow:var(--brand-shadow),var(--focus-ring); }
    .btn-primary:disabled { background:var(--brand-gradient-disabled); opacity:.65; cursor:not-allowed; transform:none; box-shadow:none; }
    .dark .btn-primary:disabled { background:color-mix(in srgb, var(--background) 80%, rgba(255,255,255,.06)); border:1px solid rgba(255,255,255,.08); color:var(--foreground-muted); opacity:.55; box-shadow:none; }
    /* Secondary btn */
    .btn-secondary { display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
      padding:.625rem 1.375rem; border-radius:9999px; background:transparent; color:var(--brand-flat);
      font-weight:600; font-size:.875rem; border:1.5px solid var(--brand-flat); cursor:pointer;
      transition:background .2s,color .2s,border-color .2s,transform .15s,box-shadow .2s; outline:none; text-decoration:none; white-space:nowrap; }
    .btn-secondary:hover { background:color-mix(in srgb,var(--brand-flat) 10%,transparent); transform:translateY(-1px);
      box-shadow:0 2px 10px -2px color-mix(in srgb,var(--brand-flat) 25%,transparent); }
    .btn-secondary:active { background:color-mix(in srgb,var(--brand-flat) 18%,transparent); transform:translateY(0) scale(.98); }
    .btn-secondary:focus-visible { box-shadow:var(--focus-ring); }
    .btn-secondary:disabled { opacity:.45; cursor:not-allowed; border-color:var(--border-color); color:var(--foreground-muted); transform:none; box-shadow:none; }
    .dark .btn-secondary:disabled { border-color:rgba(255,255,255,.1); color:var(--foreground-muted); opacity:.45; background:transparent; box-shadow:none; }
    /* Notify btn */
    .btn-notify { display:inline-flex; align-items:center; justify-content:center; gap:.35rem;
      padding:.5rem 1.1rem; border-radius:0 9999px 9999px 0; background:var(--brand-gradient); color:var(--on-grad-text);
      font-weight:600; font-size:.8125rem; border:1px solid transparent; cursor:pointer;
      box-shadow:var(--brand-shadow); transition:background .2s,box-shadow .2s; outline:none; white-space:nowrap; flex-shrink:0; }
    .dark .btn-notify { border-color:var(--grad-border); }
    .btn-notify:hover { background:var(--brand-gradient-hover); box-shadow:var(--brand-shadow-hover); }
    .btn-notify:active { background:var(--brand-gradient-active); }
    .btn-notify:focus-visible { box-shadow:var(--brand-shadow),var(--focus-ring); }
    /* Card */
    .maint-card { 
      background: var(--surface-elevated, #ffffff); 
      border: 1px solid var(--border-color, #e2e8f0);
      border-radius: 1.25rem; 
      box-shadow: 0 4px 32px -4px rgba(0,0,0,.08); 
      overflow: hidden; 
    }
    .dark .maint-card { 
      background: linear-gradient(
        180deg,
        color-mix(in srgb, var(--surface) 86%, var(--brand-flat) 14%) 0%,
        color-mix(in srgb, var(--background) 92%, var(--brand-flat) 8%) 100%
      );
      border: 1px solid color-mix(in srgb, var(--brand-flat) 26%, rgba(255, 255, 255, 0.09));
      box-shadow: 
        0 16px 48px -12px rgba(0, 0, 0, 0.75),
        0 0 28px -6px color-mix(in srgb, var(--brand-flat) 18%, transparent),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.09);
    }
    .maint-card-accent-top::before { content:""; display:block; height:3px; background:var(--brand-gradient); }
    /* Email input */
    .email-input { flex:1; min-width:0; padding:.5rem 1rem; border:1.5px solid var(--border-color);
      border-right:none; border-radius:9999px 0 0 9999px; background:var(--surface-elevated,var(--background));
      color:var(--foreground); font-size:.875rem; outline:none; transition:border-color .2s,box-shadow .2s; }
    .email-input::placeholder { color:var(--foreground-muted); opacity:.75; }
    .email-input:focus { border-color:var(--brand-flat); box-shadow:var(--focus-ring); z-index:1; }
    .email-input:disabled { opacity:.5; cursor:not-allowed; background:var(--surface-alt); }
    .dark .email-input {
      background: color-mix(in srgb, var(--background) 86%, var(--brand-flat) 14%);
      border-color: color-mix(in srgb, var(--brand-flat) 25%, rgba(255, 255, 255, 0.12));
      color: var(--foreground);
    }
    .dark .email-input:focus {
      border-color: var(--brand-flat);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand-flat) 30%, transparent);
    }
    /* Disabled input */
    .input-disabled { width:100%; padding:.55rem .9rem; border:1.5px solid var(--border-color);
      border-radius:.625rem; background:var(--surface-alt); color:var(--foreground-muted);
      font-size:.875rem; cursor:not-allowed; opacity:.55; outline:none; }
    .dark .input-disabled {
      background: color-mix(in srgb, var(--background) 92%, black);
      border-color: rgba(255, 255, 255, 0.08);
      color: var(--foreground-muted);
    }
    /* Link */
    .maint-link { color:var(--brand-flat); text-decoration:underline;
      text-decoration-color:color-mix(in srgb,var(--brand-flat) 35%,transparent);
      text-underline-offset:3px; font-weight:500; transition:color .2s,text-decoration-color .2s; border-radius:2px; outline:none; }
    .maint-link:hover { color:color-mix(in srgb,var(--brand-flat) 80%,black); text-decoration-color:var(--brand-flat); }
    .dark .maint-link:hover { color:color-mix(in srgb,var(--brand-flat) 80%,white); }
    .maint-link:focus-visible { box-shadow:var(--focus-ring); outline:2px solid var(--brand-flat); outline-offset:2px; }
    /* Social btn */
    .social-btn { display:inline-flex; align-items:center; justify-content:center; width:2.25rem; height:2.25rem;
      border-radius:9999px; background:color-mix(in srgb,var(--brand-flat) 10%,transparent);
      color:var(--brand-flat); border:1px solid color-mix(in srgb,var(--brand-flat) 25%,transparent);
      transition:background .2s,color .2s,border-color .2s,transform .15s,box-shadow .2s; outline:none; cursor:pointer; text-decoration:none; }
    .social-btn:hover { background:var(--brand-gradient); color:var(--on-grad-text); border-color:transparent;
      transform:translateY(-2px) scale(1.08); box-shadow:var(--brand-shadow); }
    .social-btn:focus-visible { box-shadow:var(--focus-ring); }
    .dark .social-btn {
      background: color-mix(in srgb, var(--brand-flat) 15%, transparent);
      color: var(--brand-flat);
      border: 1px solid color-mix(in srgb, var(--brand-flat) 28%, transparent);
    }
    .dark .social-btn:hover {
      background: var(--brand-gradient);
      color: var(--on-grad-text);
      border-color: transparent;
      box-shadow: 0 4px 18px color-mix(in srgb, var(--brand-flat) 50%, transparent);
    }
    /* Spinner */
    @keyframes spin360 { to { transform:rotate(360deg); } }
    .maint-spinner { width:2rem; height:2rem; border-radius:50%; border:3px solid color-mix(in srgb,var(--brand-flat) 20%,transparent);
      border-top-color:var(--brand-flat); animation:spin360 .75s linear infinite; }
    /* Skeleton */
    @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
    .maint-skeleton { border-radius:.5rem;
      background:linear-gradient(90deg,var(--surface-alt) 25%,color-mix(in srgb,var(--brand-flat) 8%,var(--surface-alt)) 50%,var(--surface-alt) 75%);
      background-size:200% 100%; animation:shimmer 1.6s ease-in-out infinite; }
    .dark .maint-skeleton {
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.05) 25%,
        color-mix(in srgb, var(--brand-flat) 26%, rgba(255, 255, 255, 0.14)) 50%,
        rgba(255, 255, 255, 0.05) 75%
      );
      background-size: 200% 100%;
    }
    /* Contact icon */
    .contact-icon { display:inline-flex; align-items:center; justify-content:center;
      width:2rem; height:2rem; border-radius:50%; background:color-mix(in srgb,var(--brand-flat) 12%,transparent);
      color:var(--brand-flat); flex-shrink:0; }
    .dark .contact-icon {
      background: color-mix(in srgb, var(--brand-flat) 18%, transparent);
      color: var(--brand-flat);
      border: 1px solid color-mix(in srgb, var(--brand-flat) 30%, transparent);
    }
    /* Divider */
    .maint-divider { height:1px;
      background:linear-gradient(to right,transparent,var(--border-color) 20%,var(--border-color) 80%,transparent);
      margin:1.5rem 0; }
    .dark .maint-divider {
      background: linear-gradient(
        to right,
        transparent,
        color-mix(in srgb, var(--brand-flat) 22%, rgba(255, 255, 255, 0.1)) 20%,
        color-mix(in srgb, var(--brand-flat) 22%, rgba(255, 255, 255, 0.1)) 80%,
        transparent
      );
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="maint-page">
        {/* Ambient glow */}
        <div className="maint-glow" aria-hidden />

        {/* ── Top bar: gradient bg + theme toggle ──────────────────────── */}
        <div className="relative z-10 w-full"
          style={{ background: "var(--brand-gradient)", borderBottom: "1px solid var(--grad-border)" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wide flex items-center gap-1"
              style={{ color: "var(--on-grad-text)", opacity: 0.9 }}>
              <Wrench className="w-3 h-3" aria-hidden />
              Color Theme Test Page
            </span>
            {mounted && (
              <button id="maint-theme-toggle" type="button"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer"
                style={{ color:"var(--on-grad-text)", background:"rgba(255,255,255,.15)", border:"1px solid rgba(255,255,255,.25)" }}>
                {isDark ? <><Sun className="w-3 h-3" /><span>Light</span></> : <><Moon className="w-3 h-3" /><span>Dark</span></>}
              </button>
            )}
          </div>
        </div>

        {/* ── Main Content ─────────────────────────────────────────────── */}
        <main id="maintenance-content"
          className="relative z-10 flex flex-col items-center min-h-[calc(100vh-40px)] py-10 px-4 sm:px-6">
          <div className="w-full max-w-2xl mx-auto space-y-8">

            {/* 1. Logo, site name, heading, badge */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex items-center gap-3 select-none">
                {hasLogo && activeLogo ? (
                  <Image src={activeLogo} alt={siteName} width={140} height={44}
                    style={{ height: 44, width: "auto", objectFit: "contain" }} unoptimized priority />
                ) : (
                  <span className="font-black text-3xl tracking-tight"
                    style={{ fontFamily:"var(--site-font-heading,var(--font-poppins)),sans-serif",
                      letterSpacing:"-0.03em", color:"var(--foreground)" }}>
                    {siteName}
                  </span>
                )}
              </div>
              <div>
                <span className="grad-badge">
                  <Clock className="w-3 h-3" aria-hidden />
                  Back Soon
                </span>
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                  style={{ fontFamily:"var(--site-font-heading,var(--font-poppins)),sans-serif",
                    color:"var(--foreground)", letterSpacing:"-0.025em" }}>
                  We&apos;re working on something
                </h1>
                <p className="text-base leading-relaxed max-w-md mx-auto"
                  style={{ color:"var(--foreground-muted)" }}>
                  Our team is making improvements to bring you a better experience.
                  We&apos;ll be back shortly. Thank you for your patience.
                </p>
              </div>
            </div>

            {/* 2. Card with message, buttons, link */}
            <div className="maint-card maint-card-accent-top">
              <div className="p-6 sm:p-8 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="contact-icon mt-0.5">
                    <CheckCircle className="w-4 h-4" aria-hidden />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h2 className="font-bold text-base" style={{ color:"var(--foreground)" }}>
                      What&apos;s happening?
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ color:"var(--foreground-muted)" }}>
                      We are upgrading our systems to deliver a faster, more reliable, and feature-rich
                      experience. Our engineers are working around the clock to get this done quickly.
                    </p>
                  </div>
                </div>
                <div className="maint-divider" />
                {/* Active buttons */}
                <div className="flex flex-wrap gap-3">
                  <button id="maint-btn-primary" type="button" className="btn-primary">
                    <CheckCircle className="w-4 h-4" aria-hidden />
                    Check Status
                  </button>
                  <button id="maint-btn-secondary" type="button" className="btn-secondary">
                    <ExternalLink className="w-4 h-4" aria-hidden />
                    Learn More
                  </button>
                </div>
                {/* Disabled buttons */}
                <div className="flex flex-wrap gap-3">
                  <button id="maint-btn-disabled" type="button" className="btn-primary" disabled>
                    Unavailable (disabled)
                  </button>
                  <button id="maint-btn-secondary-disabled" type="button" className="btn-secondary" disabled>
                    Also disabled
                  </button>
                </div>
                {/* Link with hover state */}
                <p className="text-sm" style={{ color:"var(--foreground-muted)" }}>
                  Need help right now?{" "}
                  <a href={`mailto:${supportEmail}`} className="maint-link" id="maint-contact-link">
                    Contact our support team
                  </a>{" "}
                  or visit our{" "}
                  <a href="/shop" className="maint-link" id="maint-shop-link">
                    product catalog <ArrowRight className="w-3 h-3 inline ml-0.5 mb-0.5" />
                  </a>.
                </p>
              </div>
            </div>

            {/* 3. Gradient strip */}
            <div className="grad-strip">
              <div className="grad-strip-text flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="font-bold text-sm" style={{ color:"var(--on-grad-text)" }}>
                    🚀 Exciting new features are coming
                  </p>
                  <p className="text-xs mt-0.5 leading-relaxed"
                    style={{ color:"var(--on-grad-text)", opacity:.85 }}>
                    Sign up below to be first to know when we&apos;re live. No spam, ever.
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
                  style={{ background:"rgba(255,255,255,.18)", color:"var(--on-grad-text)", border:"1px solid rgba(255,255,255,.25)" }}>
                  Coming Soon
                </span>
              </div>
            </div>

            {/* 4. Email + Notify me + disabled input */}
            <div className="maint-card">
              <div className="p-6 sm:p-8 space-y-5">
                <div className="space-y-1">
                  <h2 className="font-bold text-base" style={{ color:"var(--foreground)" }}>
                    Get notified when we&apos;re back
                  </h2>
                  <p className="text-sm" style={{ color:"var(--foreground-muted)" }}>
                    Drop your email and we&apos;ll ping you the moment the store is live.
                  </p>
                </div>
                {submitted ? (
                  <div className="flex items-center gap-2 py-3 px-4 rounded-xl text-sm font-medium"
                    style={{ background:"color-mix(in srgb,var(--brand-flat) 10%,transparent)",
                      color:"var(--brand-flat)", border:"1px solid color-mix(in srgb,var(--brand-flat) 25%,transparent)" }}>
                    <CheckCircle className="w-4 h-4" aria-hidden />
                    You&apos;re on the list! We&apos;ll notify you at <strong className="ml-1">{email}</strong>.
                  </div>
                ) : (
                  <form id="maint-notify-form" onSubmit={(e) => { e.preventDefault(); if(email) setSubmitted(true); }} className="flex">
                    <input id="maint-email-input" type="email" className="email-input"
                      placeholder="you@example.com" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-label="Email address" required />
                    <button id="maint-notify-btn" type="submit" className="btn-notify">
                      Notify me
                    </button>
                  </form>
                )}
                <div className="space-y-1">
                  <label htmlFor="maint-disabled-input" className="text-xs font-medium"
                    style={{ color:"var(--foreground-muted)" }}>
                    Referral code (disabled)
                  </label>
                  <input id="maint-disabled-input" type="text" className="input-disabled"
                    placeholder="Enter referral code" disabled aria-disabled="true" />
                </div>
              </div>
            </div>

            {/* 5. Spinner + skeleton */}
            <div className="maint-card">
              <div className="p-6 sm:p-8 space-y-5">
                <h2 className="font-bold text-base" style={{ color:"var(--foreground)" }}>Loading states</h2>
                <div className="flex items-center gap-3">
                  <div className="maint-spinner" role="status" aria-label="Loading" />
                  <span className="text-sm" style={{ color:"var(--foreground-muted)" }}>Fetching latest data…</span>
                </div>
                <div className="space-y-2.5" aria-hidden>
                  <div className="maint-skeleton h-4 w-3/4" />
                  <div className="maint-skeleton h-4 w-full" />
                  <div className="maint-skeleton h-4 w-5/6" />
                  <div className="maint-skeleton h-10 w-1/3 rounded-xl" />
                </div>
              </div>
            </div>

            {/* 6. Support + social links */}
            <div className="maint-card">
              <div className="p-6 sm:p-8 space-y-5">
                <h2 className="font-bold text-base" style={{ color:"var(--foreground)" }}>Need help?</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={`mailto:${supportEmail}`} id="maint-email-link"
                    className="flex items-center gap-2.5" style={{ textDecoration:"none" }}>
                    <div className="contact-icon"><Mail className="w-4 h-4" /></div>
                    <div>
                      <p className="text-[11px]" style={{ color:"var(--foreground-muted)" }}>Email support</p>
                      <span className="maint-link text-sm font-semibold" style={{ textDecoration:"none" }}>
                        {supportEmail}
                      </span>
                    </div>
                  </a>
                  <a href={`tel:${supportPhone.replace(/\s/g,"")}`} id="maint-phone-link"
                    className="flex items-center gap-2.5" style={{ textDecoration:"none" }}>
                    <div className="contact-icon"><Phone className="w-4 h-4" /></div>
                    <div>
                      <p className="text-[11px]" style={{ color:"var(--foreground-muted)" }}>Phone support</p>
                      <span className="maint-link text-sm font-semibold" style={{ textDecoration:"none" }}>
                        {supportPhone}
                      </span>
                    </div>
                  </a>
                </div>
                {socialLinks.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold tracking-wide uppercase"
                      style={{ color:"var(--foreground-muted)" }}>Follow us</p>
                    <div className="flex flex-wrap gap-2">
                      {socialLinks.map((link, i) => (
                        <a key={i} href={link.url || "#"}
                          id={`maint-social-${link.platform.toLowerCase().replace(/[^a-z0-9]/g,"")}`}
                          aria-label={link.platform} target="_blank" rel="noopener noreferrer"
                          className="social-btn" title={link.platform}>
                          <SocialIcon platform={link.platform} />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pb-4">
              <p className="text-xs" style={{ color:"var(--foreground-muted)" }}>
                &copy; {new Date().getFullYear()}{" "}
                <a href="/" className="maint-link" id="maint-footer-link">{siteName}</a>
                . Static color theme test — no maintenance logic.
              </p>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}