// ── Centralized Currency & Price Formatting Utilities ──────────────────────────

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  BDT: "৳",
  INR: "₹",
  CAD: "CA$",
  AUD: "AU$",
  JPY: "¥",
  CNY: "¥",
};

/**
 * Returns the localized symbol for a given ISO currency code.
 * Falls back to "$" if undefined, or the raw string if unrecognized.
 */
export function getCurrencySymbol(currency?: string): string {
  if (!currency) return "$";
  const upper = currency.toUpperCase().trim();
  return CURRENCY_SYMBOLS[upper] || upper;
}

/**
 * Formats a monetary amount with the appropriate currency symbol.
 * E.g., formatPrice(24.99, "BDT") => "৳24.99"
 *       formatPrice(1200, "EUR") => "€1,200.00"
 */
export function formatPrice(
  amount: number | string | undefined | null,
  currency: string = "USD",
  opts?: { showDecimals?: boolean }
): string {
  const num = typeof amount === "number" ? amount : Number(amount) || 0;
  const symbol = getCurrencySymbol(currency);
  const decimals = opts?.showDecimals === false ? 0 : 2;

  return `${symbol}${num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}
