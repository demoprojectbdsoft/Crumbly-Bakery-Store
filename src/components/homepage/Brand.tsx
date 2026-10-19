"use client";

import React from "react";
import { Brand as BrandType } from "@/types";
import Marquee from "react-fast-marquee";

const BRANDS: BrandType[] = [
  {
    id: "1",
    name: "Airbnb",
    renderLogo: () => (
      <div className="flex items-center gap-1.5 font-bold tracking-tight text-xl text-slate-400 dark:text-gray-500 hover:text-primary transition-colors">
        <span className="text-2xl font-black">Δ</span>
        <span>airbnb</span>
      </div>
    ),
  },
  {
    id: "2",
    name: "Coinbase",
    renderLogo: () => (
      <div className="font-semibold text-xl tracking-tighter text-slate-400 dark:text-gray-500 hover:text-primary transition-colors">
        coin<span className="font-bold">base</span>
      </div>
    ),
  },
  {
    id: "3",
    name: "Dribbble",
    renderLogo: () => (
      <div className="font-serif italic text-2xl tracking-normal text-slate-400 dark:text-gray-500 hover:text-primary transition-colors">
        dribbble
      </div>
    ),
  },
  {
    id: "4",
    name: "Instagram",
    renderLogo: () => (
      <div className="font-serif text-2xl tracking-wide text-slate-400 dark:text-gray-500 hover:text-primary transition-colors">
        Instagram
      </div>
    ),
  },
  {
    id: "5",
    name: "Netflix",
    renderLogo: () => (
      <div className="font-black text-2xl tracking-widest uppercase text-slate-400 dark:text-gray-500 hover:text-primary transition-colors">
        NETFLIX
      </div>
    ),
  },
  /* ── Additional Brands ── */
  {
    id: "6",
    name: "Spotify",
    renderLogo: () => (
      <div className="flex items-center gap-1 font-extrabold text-2xl tracking-tighter text-slate-400 dark:text-gray-500 hover:text-primary transition-colors">
        <span>Spotify</span>
        <span className="w-1.5 h-1.5 rounded-full bg-current mb-3" />
      </div>
    ),
  },
  {
    id: "7",
    name: "Slack",
    renderLogo: () => (
      <div className="font-black text-2xl tracking-tight text-slate-400 dark:text-gray-500 hover:text-primary transition-colors">
        #slack
      </div>
    ),
  },
  {
    id: "8",
    name: "Stripe",
    renderLogo: () => (
      <div className="font-black text-2xl tracking-tight text-slate-400 dark:text-gray-500 hover:text-primary transition-colors">
        stripe
      </div>
    ),
  },
  {
    id: "9",
    name: "Shopify",
    renderLogo: () => (
      <div className="font-bold text-xl tracking-wide text-slate-400 dark:text-gray-500 hover:text-primary transition-colors">
        shopify<span className="font-light">.</span>
      </div>
    ),
  },
  {
    id: "10",
    name: "Discord",
    renderLogo: () => (
      <div className="font-black text-xl tracking-wider uppercase text-slate-400 dark:text-gray-500 hover:text-primary transition-colors">
        DISCORD
      </div>
    ),
  },
  {
    id: "11",
    name: "Figma",
    renderLogo: () => (
      <div className="font-serif italic text-2xl tracking-tight text-slate-400 dark:text-gray-500 hover:text-primary transition-colors">
        Figma
      </div>
    ),
  },
];

export default function Brand() {
  return (
    <section className="w-full py-8 my-6 border-y border-slate-200/80 dark:border-gray-800 relative bg-white/50 dark:bg-gray-950/50">
      
      {/* react-fast-marquee with pause-on-hover */}
      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover={true}
        className="select-none py-2"
      >
        <div className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24">
          {BRANDS.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer shrink-0"
            >
              {brand.renderLogo()}
            </div>
          ))}
        </div>
      </Marquee>

    </section>
  );
}