import React from "react";
import AdminSettingsClient from "./AdminSettingsClient";
import { getSiteSettings } from "@/lib/api/siteSettings";
import { SiteSettingsData } from "@/types";

export default async function AdminSettingsPage() {
  let siteSettings: SiteSettingsData | undefined = undefined;

  try {
    const res = await getSiteSettings();
    if (res?.data) {
      siteSettings = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
  }

  return <AdminSettingsClient initialSettings={siteSettings} />;
}
