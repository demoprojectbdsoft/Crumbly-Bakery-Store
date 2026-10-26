"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSiteSettings } from "@/context/SiteSettingsContext";

interface SparqLogoProps {
  /**
   * "full"    → Icon + wordmark
   * "icon"    → Just the Icon
   * "stacked" → Icon above wordmark with optional slogan
   */
  variant?: "full" | "icon" | "stacked";
  /**
   * "navbar" (uses settings.navbarLogo) or "footer" (uses settings.footerLogo)
   */
  logoSource?: "navbar" | "footer";
  /**
   * Size presets
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * If true, wraps in a Next.js Link pointing to `/`
   */
  href?: string;
  /**
   * Optional custom className on the wrapper
   */
  className?: string;
  /**
   * Show slogan below logo (useful for footer)
   */
  showSlogan?: boolean;
}

export default function SparqLogo({
  variant = "full",
  logoSource = "navbar",
  size = "md",
  href = "/",
  className = "",
  showSlogan = false,
}: SparqLogoProps) {
  const { settings } = useSiteSettings();

  // Dimension presets for icon & wordmark
  const sizeConfig = {
    sm: { iconWidth: 28, iconHeight: 24, fontSize: "text-xl", gap: "gap-1.5", logoHeight: 28 },
    md: { iconWidth: 38, iconHeight: 33, fontSize: "text-2xl sm:text-3xl", gap: "gap-2", logoHeight: 36 },
    lg: { iconWidth: 48, iconHeight: 42, fontSize: "text-3xl sm:text-4xl", gap: "gap-2.5", logoHeight: 44 },
    xl: { iconWidth: 64, iconHeight: 56, fontSize: "text-4xl sm:text-5xl", gap: "gap-3", logoHeight: 54 },
  }[size];

  // Resolve custom logos for navbar vs footer
  const logoSet = logoSource === "footer" ? settings.footerLogo : settings.navbarLogo;
  const lightLogoUrl = logoSet?.light?.trim() || "";
  const darkLogoUrl = logoSet?.dark?.trim() || "";
  const hasCustomLogo = !!(lightLogoUrl || darkLogoUrl);

  const siteName = settings.siteName || "Sparq";
  const tagline = settings.siteTagline || "Better products. A brighter you.";

  // Logo mode: "both" (default), "img" (image only), or "text" (text only)
  const logoMode = settings.logoType || "both";
  const showImage = logoMode === "both" || logoMode === "img";
  const showText = (logoMode === "both" || logoMode === "text") && variant !== "icon";

  const content = (
    <div
      className={`inline-flex items-center select-none ${
        variant === "stacked" ? "flex-col items-start gap-1" : sizeConfig.gap
      } ${className}`}
    >
      <div className="flex items-center gap-2">
        {/* ── Image Component: Dual Theme (Light & Dark) ── */}
        {showImage && (
          <div
            className="relative shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
            style={{
              height: sizeConfig.logoHeight,
            }}
          >
            {hasCustomLogo ? (
              <>
                {/* Light Theme Logo: displayed in light, hidden in dark if dark logo exists */}
                {lightLogoUrl && (
                  <Image
                    src={lightLogoUrl}
                    alt={siteName}
                    width={180}
                    height={sizeConfig.logoHeight}
                    className={`${darkLogoUrl ? "dark:hidden" : ""} w-auto object-contain drop-shadow-xs`}
                    style={{ maxHeight: sizeConfig.logoHeight }}
                    unoptimized
                    priority
                  />
                )}
                {/* Dark Theme Logo: displayed in dark mode */}
                {darkLogoUrl && (
                  <Image
                    src={darkLogoUrl}
                    alt={siteName}
                    width={180}
                    height={sizeConfig.logoHeight}
                    className={`${lightLogoUrl ? "hidden dark:block" : ""} w-auto object-contain drop-shadow-xs`}
                    style={{ maxHeight: sizeConfig.logoHeight }}
                    unoptimized
                    priority
                  />
                )}
              </>
            ) : (
              // Default brand vector icon
              <Image
                src="/sparq-icon.png"
                alt={siteName}
                width={sizeConfig.iconWidth}
                height={sizeConfig.iconHeight}
                className="w-auto h-full object-contain drop-shadow-xs"
                priority
              />
            )}
          </div>
        )}

        {/* ── Text Wordmark Component ── */}
        {showText && (
          <div className="flex items-center leading-none">
            <span
              className={`font-black tracking-tight text-[var(--foreground)] transition-colors duration-200 ${sizeConfig.fontSize}`}
              style={{
                fontFamily: "var(--site-font-heading, var(--font-poppins)), system-ui, sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              {siteName.toLowerCase() === "sparq" && showImage && !hasCustomLogo ? (
                <>
                  par
                  <span className="relative inline-block">
                    q
                    <span
                      className="absolute bottom-[2px] -right-[1px] w-[5px] h-[7px] bg-[var(--brand-gradient)] rounded-xs pointer-events-none transform -skew-x-12"
                      aria-hidden="true"
                    />
                  </span>
                </>
              ) : (
                siteName
              )}
            </span>
          </div>
        )}
      </div>

      {/* ── Optional Slogan ── */}
      {showSlogan && (
        <p className="text-xs sm:text-sm text-[var(--foreground-muted)] dark:text-[var(--foreground-muted)] font-medium tracking-tight mt-1">
          {tagline}
        </p>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group inline-flex items-center shrink-0">
        {content}
      </Link>
    );
  }

  return content;
}
