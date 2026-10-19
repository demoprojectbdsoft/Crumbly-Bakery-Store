"use client";

import { ThemeProvider } from "next-themes";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import { SiteSettingsData } from "@/types";

export function Providers({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings?: Partial<SiteSettingsData> | null;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableColorScheme={true}
      enableSystem={false}
    >
      <SiteSettingsProvider initialSettings={initialSettings}>
        {children}
      </SiteSettingsProvider>
    </ThemeProvider>
  );
}