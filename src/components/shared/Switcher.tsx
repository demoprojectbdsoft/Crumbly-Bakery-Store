"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeSwitchProps {
  /** 
   * 'sidebar' → original vertical pill fixed on the left (desktop only, hidden on mobile)
   * 'inline'  → horizontal Light/Dark pill toggle (for use inside menus/drawers)
   * 'topbar'  → compact topbar toggle with icon and text
   * 'icon'    → minimalist icon-only toggle button for headers
   */
  variant?: "sidebar" | "inline" | "topbar" | "icon";
}

export function ThemeSwitch({ variant = "sidebar" }: ThemeSwitchProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch between server and client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";

  // ── Topbar variant: compact toggle for top header bar ────────────────────
  if (variant === "topbar") {
    return (
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Toggle Theme"
        title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
        className="group flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-white/90 dark:text-[var(--foreground)] hover:text-white dark:hover:text-[var(--accent)] hover:bg-[var(--surface-elevated)]/15 dark:hover:bg-[var(--surface-elevated)]/20 transition-all duration-200 text-[10px] sm:text-xs font-semibold whitespace-nowrap cursor-pointer"
      >
        {isDark ? (
          <>
            <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 group-hover:rotate-45 transition-transform shrink-0" />
            <span>Light</span>
          </>
        ) : (
          <>
            <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--on-grad-text)] group-hover:-rotate-12 transition-transform shrink-0" />
            <span>Dark</span>
          </>
        )}
      </button>
    );
  }

  // ── Icon variant: minimalist icon button for desktop navbar ──────────────
  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Toggle Theme"
        title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
        className="w-9 h-9 rounded-full border border-[var(--border-color)] bg-[var(--surface-elevated)] flex items-center justify-center text-[var(--foreground-muted)] hover:text-primary hover:border-primary/50 transition-all duration-200 cursor-pointer shadow-2xs group"
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
        ) : (
          <Moon className="w-4 h-4 text-primary group-hover:-rotate-12 transition-transform" />
        )}
      </button>
    );
  }

  // ── Inline variant: horizontal Light / Dark pill toggle (compact) ─────────
  if (variant === "inline") {
    return (
      <div className="flex items-center gap-0.5 p-0.5 rounded-full bg-[var(--surface-alt)] border border-[var(--border-color)]">
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all duration-200 cursor-pointer ${
            !isDark
              ? "bg-brand-gradient text-[var(--on-grad-text)] shadow-xs"
              : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          }`}
        >
          <Sun className="w-3 h-3 text-amber-400" />
          <span>Light</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all duration-200 cursor-pointer ${
            isDark
              ? "bg-brand-gradient text-[var(--on-grad-text)] shadow-xs"
              : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          }`}
        >
          <Moon className="w-3 h-3 text-primary" />
          <span>Dark</span>
        </button>
      </div>
    );
  }

  // ── Sidebar variant: vertical pill floating capsule (desktop only) ───────
  return (
    <div className="hidden md:block fixed left-3 top-1/2 -translate-y-1/2 z-[9999]">
      <div
        className="relative bg-[var(--surface-elevated)]/90 backdrop-blur-md p-1 rounded-2xl border border-[var(--border-color)] shadow-xl flex flex-col items-center justify-between w-9 h-[100px] cursor-pointer select-none transition-colors duration-200"
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        {/* Animated Sliding Primary Capsule */}
        <div
          className={`absolute left-1 right-1 h-[44px] bg-brand-gradient rounded-xl shadow-xs transition-transform duration-300 ease-out ${
            isDark ? "translate-y-[46px]" : "translate-y-0"
          }`}
          style={{ top: "0.25rem" }}
        />

        {/* Light Mode Label */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setTheme("light");
          }}
          className={`relative cursor-pointer z-10 w-full h-1/2 flex items-center justify-center text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 ${
            !isDark ? "text-[var(--on-grad-text)] font-black" : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          }`}
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Light
        </button>

        {/* Dark Mode Label */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setTheme("dark");
          }}
          className={`relative cursor-pointer z-10 w-full h-1/2 flex items-center justify-center text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 ${
            isDark ? "text-[var(--on-grad-text)] font-black" : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          }`}
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Dark
        </button>
      </div>
    </div>
  );
}