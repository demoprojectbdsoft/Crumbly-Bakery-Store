import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Maintenance Proxy & Route Guard
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * NOTE: Next.js requires this file to be named `middleware.ts` to be picked
 * up automatically. Think of this file as the "proxy" — it intercepts every
 * request and blocks non-exempt routes when maintenance mode is active.
 *
 * Exempt routes (always let through):
 *   • /auth/*            — login / register / forgot-password
 *   • /api/auth/*        — Better Auth endpoints
 *   • /dashboard/admin/* — admin & demo-admin dashboard + settings
 *   • /maintenance       — the maintenance page itself
 *   • /api/maintenance/* — our own status ping (avoid loop)
 *   • /api/site-settings — backend settings proxy
 *   • Static assets      — _next/*, favicon, fonts, images…
 *
 * Cache TTL: 3 s — near real-time toggle propagation without hammering the DB.
 */

// ── In-memory cache (single Edge worker process) ──────────────────────────────
const cache = { enabled: false, fetchedAt: 0 };
const CACHE_TTL_MS = 3000;

async function isMaintenanceActive(): Promise<boolean> {
  const now = Date.now();

  if (now - cache.fetchedAt < CACHE_TTL_MS) return cache.enabled;

  const apiBase =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  try {
    const ctrl = new AbortController();
    const tid = setTimeout(() => ctrl.abort(), 1500);

    const res = await fetch(`${apiBase}/site-settings`, {
      cache: "no-store",
      signal: ctrl.signal,
      headers: { Accept: "application/json" },
    });

    clearTimeout(tid);

    if (res.ok) {
      const body = await res.json();
      const s = body?.data ?? body; // Express wraps in { data: {} }
      cache.enabled = !!s?.maintenanceMode;
      cache.fetchedAt = now;
      return cache.enabled;
    }
  } catch {
    // Backend unreachable — fail-open (keep last known value)
  }

  return cache.enabled;
}

// ── Exempt path checker ───────────────────────────────────────────────────────
function isExempt(pathname: string): boolean {
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/_static/") ||
    /\.(png|jpe?g|webp|avif|gif|svg|ico|css|js|map|woff2?|ttf|eot)$/i.test(pathname) ||
    ["/favicon.ico", "/icon.svg", "/robots.txt", "/sitemap.xml", "/manifest.webmanifest"].includes(pathname)
  ) return true;

  if (pathname.startsWith("/auth/") || pathname === "/auth") return true;
  if (pathname.startsWith("/api/auth/")) return true;
  if (pathname.startsWith("/dashboard/admin")) return true;
  if (pathname.startsWith("/api/maintenance/")) return true;
  if (pathname.startsWith("/api/site-settings")) return true;

  return false;
}

// ── Proxy handler ─────────────────────────────────────────────────────────────
export default async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname, searchParams } = request.nextUrl;

  // Pass exempt routes straight through
  if (isExempt(pathname)) return NextResponse.next();

  const maintenance = await isMaintenanceActive();

  // Handle /maintenance page itself
  const isMaintPath = pathname === "/maintenance" || pathname.startsWith("/maintenance/");
  if (isMaintPath) {
    // Mode OFF + no ?preview → redirect away
    if (!maintenance && !searchParams.has("preview")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Mode OFF → let everything through normally
  if (!maintenance) return NextResponse.next();

  // Mode ON → block and redirect to maintenance page
  const dest = new URL("/maintenance", request.url);
  if (pathname !== "/") dest.searchParams.set("from", pathname);
  return NextResponse.redirect(dest);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|manifest.webmanifest).*)",
  ],
};
