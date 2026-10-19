import type { Metadata, Viewport } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";

// 1. Initialize Primary Font (Open Sans)
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// 2. Initialize Secondary Font (Poppins)
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

import { getSiteSettings } from "@/lib/api/siteSettings";

// Viewport configuration for standalone PWA & responsive displays
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0284c7" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export async function generateMetadata(): Promise<Metadata> {
  const res = await getSiteSettings();
  const settings = res?.data;

  const siteName = settings?.siteName || "Sparq";
  const metaTitle = settings?.metaTitle || `${siteName} - Premium Online Store`;
  const metaDesc =
    settings?.metaDescription ||
    `${siteName} - Premium Store with best deals, fast shipping, and top-tier products.`;
  const icon = settings?.faviconUrl || "/icon.svg";

  return {
    title: {
      default: metaTitle,
      template: `%s | ${siteName}`,
    },
    description: metaDesc,
    manifest: "/manifest.webmanifest",
    applicationName: siteName,
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: siteName,
    },
    formatDetection: {
      telephone: false,
    },
    icons: {
      icon,
      apple: icon,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await getSiteSettings();
  const siteSettings = res?.data || null;
  const cp = siteSettings?.colorPalette;

  const initialPaletteCss = cp
    ? `:root {
  --site-primary: ${cp.primary || "#0284c7"};
  --site-primary-dark: ${cp.primaryDark || "#0369a1"};
  --site-secondary: ${cp.secondary || "#6366f1"};
  --site-accent: ${cp.accent || "#f59e0b"};
  --site-bg: ${cp.background || "#ffffff"};
  --site-bg-dark: ${cp.backgroundDark || "#0b0f19"};
  --site-surface: ${cp.surface || "#f8fafc"};
  --site-surface-dark: ${cp.surfaceDark || "#131d2e"};
  --site-topbar-from: ${cp.topBarFrom || "#1d4ed8"};
  --site-topbar-via: ${cp.topBarVia || "#0284c7"};
  --site-topbar-to: ${cp.topBarTo || "#4338ca"};
}`
    : "";

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${openSans.variable} ${poppins.variable}`}
    >
      <head>
        {initialPaletteCss && (
          <style
            id="ssr-site-palette"
            dangerouslySetInnerHTML={{ __html: initialPaletteCss }}
          />
        )}
      </head>
      <body className="font-sans bg-background text-foreground antialiased">
        <Providers initialSettings={siteSettings}>
          {children}
          <ToastContainer autoClose={2000} />
        </Providers>
      </body>
    </html>
  );
}