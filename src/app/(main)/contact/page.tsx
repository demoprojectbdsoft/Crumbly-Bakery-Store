"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)] dark:text-[var(--foreground)] font-semibold">Contact Us</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
          We&apos;d Love to Hear From You
        </h1>
        <p className="text-sm text-[var(--foreground-muted)] dark:text-[var(--foreground-muted)]">
          Have a question about a product, order status, or warranty? Reach out to our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--surface-elevated)] shadow-sm space-y-6">
            <h3 className="text-base font-bold text-[var(--foreground)] border-b border-[var(--border-color)] pb-3">
              Customer Support
            </h3>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[var(--foreground-muted)] block">Phone Support</span>
                <span className="text-sm font-bold text-[var(--foreground)]">
                  (800) 8001-8588
                </span>
                <p className="text-xs text-[var(--foreground-muted)]">Mon - Fri: 9:00 AM - 8:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[var(--foreground-muted)] block">Email Us</span>
                <span className="text-sm font-bold text-[var(--foreground)]">
                  support@electro.com
                </span>
                <p className="text-xs text-[var(--foreground-muted)]">We reply within 24 business hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[var(--foreground-muted)] block">Headquarters</span>
                <span className="text-sm font-bold text-[var(--foreground)]">
                  17 Princess Road, London
                </span>
                <p className="text-xs text-[var(--foreground-muted)]">Greater London, NW1 8JR, UK</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 md:p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--surface-elevated)] shadow-sm">
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)]">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-[var(--foreground-muted)] max-w-sm">
                  Thank you for getting in touch. One of our customer service representatives will reach out shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-base font-bold text-[var(--foreground)] border-b border-[var(--border-color)] pb-3">
                  Send Us a Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--foreground)]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[var(--border-color)] bg-[var(--surface-alt)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--foreground)]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[var(--border-color)] bg-[var(--surface-alt)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--foreground)]">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Product inquiry, warranty, etc."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[var(--border-color)] bg-[var(--surface-alt)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--foreground)]">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help you today?"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[var(--border-color)] bg-[var(--surface-alt)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
