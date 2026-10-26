"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { PromoBanner } from "@/types";
import { useSiteSettings } from "@/context/SiteSettingsContext";

interface PromoBannersProps {
  banners?: PromoBanner[];
}

export default function PromoBanners({ banners = [] }: PromoBannersProps) {
  const { currencySymbol } = useSiteSettings();
  return (
    <section className="w-full max-w-7xl mx-auto px-4 my-8">
      {/* 1. Dual Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="group relative bg-gradient-to-r from-primary/10 via-[var(--surface-alt)] to-[var(--surface-elevated)] rounded-2xl p-6 md:p-8 border border-[var(--border-color)] shadow-xs transition-all duration-300 hover:shadow-md flex items-center justify-between overflow-hidden"
          >
            {/* Left Side: Product Image Container */}
            <div className="relative w-1/2 h-44 md:h-48 flex items-center justify-center">
              <Link
                href={banner.href}
                className="relative w-full h-full cursor-pointer flex items-center justify-center"
              >
                <Image
                  src={banner.image}
                  alt={banner.imageAlt}
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-sm"
                  priority={banner.priority}
                />
              </Link>
            </div>

            {/* Right Side: Text, Price & CTA */}
            <div className="w-1/2 pl-4 space-y-2.5">
              <p className="text-xs font-semibold text-[var(--foreground-muted)] dark:text-[var(--foreground-muted)] uppercase tracking-wide">
                {banner.subtitle}
              </p>
              
              <h3 className="text-lg md:text-xl font-light text-[var(--foreground)] dark:text-[var(--foreground)] uppercase leading-snug">
                {banner.highlightText && (
                  <span className="font-bold text-[var(--foreground)]">
                    {banner.highlightText}{" "}
                  </span>
                )}
                {banner.title}
              </h3>

              {/* Price display if present */}
              {(banner.priceDollars || banner.price) && (
                <div className="pt-1 flex items-baseline gap-1">
                  {banner.pricePrefix && (
                    <span className="text-[10px] font-semibold text-[var(--foreground-muted)] uppercase">
                      {banner.pricePrefix}
                    </span>
                  )}
                  <span className="text-2xl font-extrabold text-[var(--foreground)] tracking-tight">
                    {currencySymbol}{banner.priceDollars || banner.price}
                    {banner.priceCents && (
                      <span className="text-xs align-top font-bold">
                        {banner.priceCents}
                      </span>
                    )}
                  </span>
                  
                  {!banner.buttonText && (
                    <Link
                      href={banner.href}
                      className="ml-2 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center transition-transform group-hover:translate-x-1 shadow-sm cursor-pointer"
                      aria-label={`View ${banner.title}`}
                    >
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </Link>
                  )}
                </div>
              )}

              {/* Button CTA if present */}
              {banner.buttonText && (
                <Link
                  href={banner.href}
                  className="inline-flex items-center gap-2 pt-1 text-xs font-bold uppercase tracking-wider text-[var(--foreground)] group-hover:text-primary transition-colors cursor-pointer"
                >
                  <span>{banner.buttonText}</span>
                  <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center transition-transform group-hover:translate-x-1 shadow-sm">
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}