import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/api/siteSettings";
import MaintenancePage from "./MaintenanceClient";

export const metadata: Metadata = {
  title: "Maintenance – Color Theme Test",
  description: "Static test page for the color theming system. No maintenance logic.",
  robots: { index: false, follow: false },
};

/**
 * /maintenance – static theming test page (no middleware, no auth, no 503).
 *
 * Fetch SiteSettings on the server → build palette CSS vars → inject as
 * inline <style> before first paint so there is zero color flash.
 * The same --site-* tokens are used by globals.css and the Settings Preview.
 */
export default async function MaintenanceRoute() {
  const res = await getSiteSettings();
  const settings = res?.data || null;
  // NOTE: The root layout already injects palette CSS vars via `ssr-site-palette`
  // before first paint, so we just pass the settings down to the client component.
  return <MaintenancePage settings={settings} />;
}
