import { Suspense } from "react";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/api/siteSettings";
import MaintenancePage from "./MaintenanceClient";

export async function generateMetadata(): Promise<Metadata> {
  const res = await getSiteSettings();
  const siteName = res?.data?.siteName || "Store";
  return {
    title: `Maintenance Mode | ${siteName}`,
    description: `We are currently performing scheduled system updates to improve your shopping experience. ${siteName} will be back shortly.`,
    robots: { index: false, follow: false },
  };
}

/**
 * /maintenance – Real-time Store Maintenance Page.
 *
 * Rendered when maintenance mode is active. Synchronizes real-time status
 * with the backend and settings, automatically redirecting visitors once the
 * store comes back online.
 *
 * Wrapped in Suspense because MaintenanceClient uses useSearchParams().
 */
export default async function MaintenanceRoute() {
  const res = await getSiteSettings();
  const settings = res?.data || null;
  return (
    <Suspense fallback={null}>
      <MaintenancePage settings={settings} />
    </Suspense>
  );
}
