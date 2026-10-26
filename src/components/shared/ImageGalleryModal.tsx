"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Download,
  ExternalLink,
  Layers,
} from "lucide-react";

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  productTitle?: string;
}

export default function ImageGalleryModal({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  productTitle = "Product Image Gallery",
}: ImageGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync initialIndex when modal opens or initialIndex changes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex >= 0 && initialIndex < images.length ? initialIndex : 0);
      setIsZoomed(false);
    }
  }, [isOpen, initialIndex, images.length]);

  const handlePrev = useCallback(() => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation: Escape to close, Left/Right arrow keys to navigate
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!mounted || !isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Gallery"
      className="fixed inset-0 z-[99999] bg-[var(--surface)]/95 backdrop-blur-xl flex flex-col justify-between select-none animate-in fade-in duration-200"
    >
      {/* ── Top Header Bar ── */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[var(--surface-elevated)]/60 backdrop-blur-md z-20">
        <div className="flex items-center gap-3 min-w-0 pr-4">
          <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0 border border-primary/30">
            <Layers className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
              {productTitle}
            </h3>
            <p className="text-[11px] font-mono text-primary font-medium">
              Image {currentIndex + 1} of {images.length}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Zoom Toggle */}
          <button
            type="button"
            onClick={() => setIsZoomed((prev) => !prev)}
            title={isZoomed ? "Reset Zoom" : "Zoom In"}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[var(--surface-elevated)]/10 transition-colors cursor-pointer"
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>

          {/* Open Original in New Tab */}
          <a
            href={currentImage}
            target="_blank"
            rel="noopener noreferrer"
            title="Open original image"
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[var(--surface-elevated)]/10 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            title="Close Gallery (Esc)"
            className="p-2 ml-1 rounded-xl bg-[var(--surface-elevated)]/10 text-white hover:bg-red-500/80 transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── Main Image View Area ── */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {/* Previous Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous Image"
            className="absolute left-3 sm:left-6 z-20 w-11 h-11 rounded-2xl bg-black/50 hover:bg-gradient-to-r hover:from-primary hover:to-primary-hover text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all hover:scale-105 shadow-xl cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Active Image */}
        <div
          onClick={() => setIsZoomed((prev) => !prev)}
          className={`relative max-w-full max-h-[72vh] flex items-center justify-center transition-all duration-300 cursor-pointer ${
            isZoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={currentImage}
            src={currentImage}
            alt={`${productTitle} - Image ${currentIndex + 1}`}
            className="max-h-[70vh] max-w-[88vw] object-contain rounded-2xl shadow-2xl transition-all duration-300 pointer-events-auto"
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next Image"
            className="absolute right-3 sm:right-6 z-20 w-11 h-11 rounded-2xl bg-black/50 hover:bg-gradient-to-r hover:from-primary hover:to-primary-hover text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all hover:scale-105 shadow-xl cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* ── Bottom Thumbnails Strip ── */}
      <div className="px-4 py-3 border-t border-white/10 bg-[var(--surface-elevated)]/70 backdrop-blur-md z-20">
        <div className="flex items-center justify-center gap-2.5 overflow-x-auto max-w-4xl mx-auto py-1 scrollbar-thin">
          {images.map((img, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setIsZoomed(false);
                  setCurrentIndex(idx);
                }}
                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer bg-[var(--surface)] ${
                  isActive
                    ? "border-primary ring-2 ring-primary/50 scale-105 opacity-100 shadow-lg shadow-primary/30"
                    : "border-white/15 opacity-50 hover:opacity-90 hover:border-white/40"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                  unoptimized={img.startsWith("http")}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
