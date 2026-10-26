import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/api/siteSettings";

/**
 * Dynamic web manifest — theme_color and background_color are derived
 * from the active palette (same source-of-truth as /maintenance):
 *   theme_color      = cp.topBarVia  → matches --brand-flat / --site-topbar-via
 *   background_color = cp.background → light mode surface
 */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const res = await getSiteSettings();
  const cp = res?.data?.colorPalette;
  const siteName = res?.data?.siteName || "Sparq";
  const siteDesc = res?.data?.metaDescription || "Premium Worldwide Electronics & Gadgets Store";

  // Brand flat color: same derivation as --brand-flat in MaintenanceClient.tsx
  const themeColor = cp?.topBarVia || cp?.primary || "#0284c7";
  const bgColor = cp?.background || "#ffffff";

  return {
    name: siteName,
    short_name: siteName,
    description: siteDesc,
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: bgColor,
    theme_color: themeColor,
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
