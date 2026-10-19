"use client";

import React from "react";
import Link from "next/link";
import { Headphones } from "lucide-react";
import SparqLogo from "./SparqLogo";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaRss,
  FaTiktok,
  FaPinterest,
} from "react-icons/fa6";

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  facebook: FaFacebookF,
  twitter: FaXTwitter,
  "twitter/x": FaXTwitter,
  x: FaXTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  pinterest: FaPinterest,
  rss: FaRss,
};

export default function Footer() {
  const { settings } = useSiteSettings();

  const defaultSocialLinks = [
    { icon: FaFacebookF, label: "Facebook", href: "#" },
    { icon: FaXTwitter, label: "Twitter", href: "#" },
    { icon: FaInstagram, label: "Instagram", href: "#" },
    { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
    { icon: FaYoutube, label: "YouTube", href: "#" },
    { icon: FaRss, label: "RSS Feed", href: "#" },
  ];

  const socialLinks =
    settings.socialLinks && settings.socialLinks.length > 0
      ? settings.socialLinks.map((item) => ({
          icon: PLATFORM_ICONS[item.platform.toLowerCase()] || FaFacebookF,
          label: item.platform,
          href: item.url || "#",
        }))
      : defaultSocialLinks;

  const phone = settings.supportPhone || "(800) 8001-8588, (0600) 874 548";
  const address = settings.address || "17 Princess Road, London, Greater London NW1 8JR, UK";
  const siteName = settings.siteName || "Sparq";

  return (
    <footer className="w-full bg-[var(--surface)] text-[var(--foreground-muted)] font-sans border-t border-[var(--border-color)]">
      
      {/* ── Main Footer Content ── */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Contact (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Logo matching site design language with footer logo source */}
            <SparqLogo size="lg" logoSource="footer" showSlogan />

            {/* 24/7 Call Center Hotline Block (Gradient Blue Accents) */}
            <div className="flex items-center gap-4 py-2">
              <div className="p-3.5 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-xs shrink-0">
                <Headphones className="w-7 h-7 stroke-[1.8]" />
              </div>
              <div>
                <p className="text-xs text-[var(--foreground-muted)] font-medium">
                  Got Questions ? Call us 24/7!
                </p>
                <p className="text-lg md:text-xl font-bold text-[var(--foreground)] tracking-tight">
                  {phone}
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                Contact Info
              </h4>
              <p className="text-xs md:text-sm text-[var(--foreground-muted)] leading-relaxed">
                {address}
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-2.5 pt-2">
              {socialLinks.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    aria-label={item.label}
                    className="w-8 h-8 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-color)] text-[var(--foreground-muted)] hover:bg-primary hover:text-white hover:border-transparent transition-all duration-300 shadow-xs flex items-center justify-center"
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </Link>
                );
              })}
            </div>

          </div>

          {/* Column 2 & 3: Find It Fast Links (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-base font-bold text-[var(--foreground)]">
              Find It Fast
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs md:text-sm">
              
              {/* Left Link Group */}
              <ul className="space-y-2.5">
                {[
                  { name: "Laptops & Computers", query: "laptops" },
                  { name: "Cameras & Photography", query: "cameras" },
                  { name: "Smart Phones & Tablets", query: "tablets" },
                  { name: "Video Games & Consoles", query: "gaming" },
                  { name: "TV & Audio", query: "audio" },
                  { name: "Gadgets", query: "gadgets" },
                  { name: "Waterproof Headphones", query: "headphones" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={`/shop?category=${link.query}`}
                      className="text-[var(--foreground-muted)] hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Right Link Group */}
              <ul className="space-y-2.5">
                {[
                  { name: "About", href: "/about" },
                  { name: "Contact", href: "/contact" },
                  { name: "Wishlist", href: "/dashboard/customer/wishlist" },
                  { name: "Compare", href: "/compare" },
                  { name: "FAQ", href: "/faq" },
                  { name: "Store Directory", href: "/stores" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-[var(--foreground-muted)] hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>
          </div>

          {/* Column 4: Customer Care (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-base font-bold text-[var(--foreground)]">
              Customer Care
            </h3>
            <ul className="space-y-2.5 text-xs md:text-sm">
              {[
                { name: "My Account", href: "/account" },
                { name: "Track your Order", href: "/track-order" },
                { name: "Customer Service", href: "/customer-service" },
                { name: "Returns/Exchange", href: "/returns" },
                { name: "FAQs", href: "/faq" },
                { name: "Product Support", href: "/support" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-[var(--foreground-muted)] hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom Sub-Footer Bar ── */}
      <div className="w-full bg-[var(--surface-alt)] border-t border-[var(--border-color)] py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--foreground-muted)]">
          
          <p className="text-center md:text-left">
            {settings.footerCopyright || (
              <>
                © <strong className="font-semibold text-[var(--foreground)]">{siteName}</strong>. All rights reserved.
              </>
            )}
          </p>

          <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <span className="font-black text-xs text-primary tracking-wider">
              DISCOVER
            </span>
            <div className="flex -space-x-1">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500 inline-block" />
              <span className="w-3.5 h-3.5 rounded-full bg-amber-400 inline-block" />
            </div>
            <span className="font-bold text-xs italic text-blue-800 dark:text-blue-400">
              PayPal
            </span>
            <span className="font-bold text-xs text-purple-700 dark:text-purple-400">
              Skrill
            </span>
            <span className="font-black text-xs text-blue-700 dark:text-sky-300 italic">
              VISA
            </span>
          </div>

        </div>
      </div>

    </footer>
  );
}