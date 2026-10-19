"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SiteSettingsData } from "@/types";

export const DEFAULT_SITE_SETTINGS: SiteSettingsData = {
  siteName: "Sparq",
  siteTagline: "Better products. A brighter you.",
  storeType: "electronics",
  supportEmail: "support@sparq.com",
  supportPhone: "(800) 8001-8588",
  address: "17 Princess Road, London, Greater London NW1 8JR, UK",
  metaTitle: "Sparq - Premium Electronics Store",
  metaDescription:
    "Sparq - Premium Worldwide Electronics Store with best deals, fast shipping, and top-tier tech products.",
  topBarText:
    "Welcome to Worldwide Electronics Store • Free Express Shipping on $50+",
  topBarEnabled: true,
  topBarItems: [
    { label: "Store Locator", href: "/store-locator" },
    { label: "Track Order", href: "/track-order" },
  ],
  logoType: "both",
  navbarLogo: { light: "", dark: "" },
  footerLogo: { light: "", dark: "" },
  faviconUrl: "",
  colorPalette: {
    primary: "#0284c7",
    primaryDark: "#0369a1",
    secondary: "#6366f1",
    accent: "#f59e0b",
    background: "#ffffff",
    backgroundDark: "#0b0f19",
    surface: "#f8fafc",
    surfaceDark: "#131d2e",
    topBarFrom: "#1d4ed8",
    topBarVia: "#0284c7",
    topBarTo: "#4338ca",
  },
  typography: {
    primaryFont: "Open Sans",
    headingFont: "Poppins",
    baseFontSize: "16px",
  },
  shipping: {
    freeShippingEnabled: true,
    freeShippingThreshold: 50,
    standardDeliveryFee: 15,
    expressDeliveryFee: 25,
    estimatedDeliveryDays: "2-4 business days",
  },
  socialLinks: [
    { platform: "Facebook", url: "#" },
    { platform: "Twitter/X", url: "#" },
    { platform: "Instagram", url: "#" },
  ],
  currency: "USD",
  timezone: "Asia/Dhaka",
  maintenanceMode: false,
  footerCopyright: "",
};

interface SiteSettingsContextType {
  settings: SiteSettingsData;
  updateSettings: (newSettings: Partial<SiteSettingsData>) => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: DEFAULT_SITE_SETTINGS,
  updateSettings: () => {},
});

export function SiteSettingsProvider({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings?: Partial<SiteSettingsData> | null;
}) {
  const [settings, setSettings] = useState<SiteSettingsData>(() => ({
    ...DEFAULT_SITE_SETTINGS,
    ...(initialSettings || {}),
    colorPalette: {
      ...DEFAULT_SITE_SETTINGS.colorPalette,
      ...(initialSettings?.colorPalette || {}),
    },
    typography: {
      ...DEFAULT_SITE_SETTINGS.typography,
      ...(initialSettings?.typography || {}),
    },
    shipping: {
      ...DEFAULT_SITE_SETTINGS.shipping,
      ...(initialSettings?.shipping || {}),
    },
  }));

  const updateSettings = (newSettings: Partial<SiteSettingsData>) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
      colorPalette: {
        ...prev.colorPalette,
        ...(newSettings.colorPalette || {}),
      },
      typography: {
        ...prev.typography,
        ...(newSettings.typography || {}),
      },
      shipping: {
        ...prev.shipping,
        ...(newSettings.shipping || {}),
      },
    }));
  };

  // Dynamically inject CSS variables when palette changes
  useEffect(() => {
    if (typeof document === "undefined" || !settings.colorPalette) return;
    const root = document.documentElement;
    const cp = settings.colorPalette;

    if (cp.primary) root.style.setProperty("--site-primary", cp.primary);
    if (cp.primaryDark) root.style.setProperty("--site-primary-dark", cp.primaryDark);
    if (cp.secondary) root.style.setProperty("--site-secondary", cp.secondary);
    if (cp.accent) root.style.setProperty("--site-accent", cp.accent);
    if (cp.background) root.style.setProperty("--site-bg", cp.background);
    if (cp.backgroundDark) root.style.setProperty("--site-bg-dark", cp.backgroundDark);
    if (cp.surface) root.style.setProperty("--site-surface", cp.surface);
    if (cp.surfaceDark) root.style.setProperty("--site-surface-dark", cp.surfaceDark);
    if (cp.topBarFrom) root.style.setProperty("--site-topbar-from", cp.topBarFrom);
    if (cp.topBarVia) root.style.setProperty("--site-topbar-via", cp.topBarVia);
    if (cp.topBarTo) root.style.setProperty("--site-topbar-to", cp.topBarTo);
  }, [settings.colorPalette]);

  // Dynamically load Google Fonts when typography changes
  useEffect(() => {
    if (typeof document === "undefined") return;
    const primary = settings.typography?.primaryFont || "Open Sans";
    const heading = settings.typography?.headingFont || "Poppins";

    const fontFamilies = Array.from(new Set([primary, heading]))
      .map((f) => `family=${encodeURIComponent(f).replace(/%20/g, "+")}:wght@300;400;500;600;700;800`)
      .join("&");
    const href = `https://fonts.googleapis.com/css2?${fontFamilies}&display=swap`;

    let linkEl = document.getElementById("dynamic-google-fonts") as HTMLLinkElement | null;
    if (!linkEl) {
      linkEl = document.createElement("link");
      linkEl.id = "dynamic-google-fonts";
      linkEl.rel = "stylesheet";
      document.head.appendChild(linkEl);
    }
    linkEl.href = href;

    document.documentElement.style.setProperty("--site-font-primary", `'${primary}', sans-serif`);
    document.documentElement.style.setProperty("--site-font-heading", `'${heading}', sans-serif`);
    document.body.style.fontFamily = `'${primary}', sans-serif`;
  }, [settings.typography?.primaryFont, settings.typography?.headingFont]);

  return (
    <SiteSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    return {
      settings: DEFAULT_SITE_SETTINGS,
      updateSettings: () => {},
    };
  }
  return context;
}
