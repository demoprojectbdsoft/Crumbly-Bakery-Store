"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, Button, Input } from "@heroui/react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  Save,
  Building2,
  BadgeCheck,
  Activity,
} from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { updateUser } from "@/lib/action/user";
import ImageUploader from "@/components/shared/ImageUploader";
import { useDemoAdmin } from "@/hooks/useDemoAdmin";

export interface AdminProfileData {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  department: string;
  bio: string;
  joinedDate: string;
}

interface AdminProfileClientProps {
  initialProfile: AdminProfileData;
}

export default function AdminProfileClient({
  initialProfile,
}: AdminProfileClientProps) {
  const { guardDemo } = useDemoAdmin();
  const [profile, setProfile] = useState<AdminProfileData>(initialProfile);
  const [avatarUrl, setAvatarUrl] = useState<string>(initialProfile.avatar || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (guardDemo()) return;
    if (!profile.firstName.trim() || !profile.lastName.trim()) {
      toast.error("First name and last name are required.");
      return;
    }
    setIsSaving(true);
    try {
      const fullName = `${profile.firstName} ${profile.lastName}`.trim();
      await updateUser(profile.id, {
        name: fullName,
        image: avatarUrl || undefined,
        phone: profile.phone,
        bio: profile.bio,
        department: profile.department,
      });
      setProfile((prev) => ({
        ...prev,
        name: fullName,
        avatar: avatarUrl || prev.avatar,
      }));
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Page Header ── */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--foreground-muted)] mb-1">
          <Link href="/dashboard/admin" className="hover:text-primary transition-colors">
            Admin Dashboard
          </Link>
          <span>/</span>
          <span className="text-primary">Profile</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
          Admin{" "}
          <span className="bg-brand-gradient bg-clip-text text-transparent">
            Profile
          </span>
        </h1>
        <p className="text-xs md:text-sm text-[var(--foreground-muted)] mt-1">
          Manage your administrator account details, profile avatar, and personal information.
        </p>
      </div>

      {/* ── Profile Header Card ── */}
      <Card className="bg-[var(--surface-elevated)] border border-[var(--border-color)] rounded-3xl p-6 md:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="relative w-24 h-24 rounded-3xl bg-brand-gradient p-1 shadow-xs ring-2 ring-[var(--brand-flat)]/30 overflow-hidden">
              <Image
                src={avatarUrl || profile.avatar}
                alt={profile.name}
                fill
                sizes="96px"
                className="object-cover rounded-[22px]"
                unoptimized
              />
            </div>
          </div>

          {/* User Meta */}
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
                {profile.name}
              </h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
                Administrator
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                <BadgeCheck className="w-3.5 h-3.5" />
                Full Access
              </span>
            </div>

            <p className="text-xs text-[var(--foreground-muted)] max-w-lg">
              {profile.bio || "No bio set yet."}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-[var(--foreground-muted)]">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
                {profile.email}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
                {profile.department}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
                Joined {profile.joinedDate}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* ── Main Content ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Details Form */}
        <Card className="lg:col-span-2 bg-[var(--surface-elevated)] border border-[var(--border-color)] rounded-2xl p-6 shadow-xs space-y-5">
          <div>
            <h3 className="text-base font-bold text-[var(--foreground)]">
              Personal Information
            </h3>
            <p className="text-xs text-[var(--foreground-muted)]">
              Update your name, avatar, contact details, and brief bio.
            </p>
          </div>

          <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
            {/* Image Uploader with both File Upload & URL input */}
            <div className="space-y-1">
              <ImageUploader
                label="Profile Picture / Avatar"
                value={avatarUrl}
                onChange={setAvatarUrl}
                urlPlaceholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-[var(--foreground)]">
                  First Name
                </label>
                <Input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile({ ...profile, firstName: e.target.value })
                  }
                  className="w-full h-10 rounded-xl border border-[var(--border-color)] bg-[var(--surface-alt)] focus:border-primary text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[var(--foreground)]">
                  Last Name
                </label>
                <Input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile({ ...profile, lastName: e.target.value })
                  }
                  className="w-full h-10 rounded-xl border border-[var(--border-color)] bg-[var(--surface-alt)] focus:border-primary text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-[var(--foreground)]">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full h-10 rounded-xl border border-[var(--border-color)] bg-[var(--surface-alt)] text-[var(--foreground-muted)] cursor-not-allowed text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[var(--foreground)]">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  className="w-full h-10 rounded-xl border border-[var(--border-color)] bg-[var(--surface-alt)] focus:border-primary text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[var(--foreground)]">
                Department
              </label>
              <Input
                type="text"
                value={profile.department}
                onChange={(e) =>
                  setProfile({ ...profile, department: e.target.value })
                }
                placeholder="e.g. Operations, Catalog, Finance"
                className="w-full h-10 rounded-xl border border-[var(--border-color)] bg-[var(--surface-alt)] focus:border-primary text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[var(--foreground)]">
                Short Bio / Notes
              </label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--surface-alt)] focus:border-primary focus:outline-none text-xs"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                isDisabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white font-bold transition-all shadow-md shadow-primary/20 cursor-pointer h-10 flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Card>

        {/* Admin Access Overview Card */}
        <Card className="bg-[var(--surface-elevated)] border border-[var(--border-color)] rounded-2xl p-6 shadow-xs space-y-5">
          <div>
            <h3 className="text-base font-bold text-[var(--foreground)]">
              Account Overview
            </h3>
            <p className="text-xs text-[var(--foreground-muted)]">
              Your role, permissions, and access status.
            </p>
          </div>

          <div className="space-y-3">
            {/* Role */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-alt)] border border-[var(--border-color)]">
              <div className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
                <User className="w-3.5 h-3.5 text-primary" />
                <span className="font-semibold">Role</span>
              </div>
              <span className="text-xs font-bold text-[var(--foreground)] capitalize">
                {profile.role}
              </span>
            </div>

            {/* Department */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-alt)] border border-[var(--border-color)]">
              <div className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
                <Building2 className="w-3.5 h-3.5 text-primary" />
                <span className="font-semibold">Department</span>
              </div>
              <span className="text-xs font-bold text-[var(--foreground)]">
                {profile.department}
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-alt)] border border-[var(--border-color)]">
              <div className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span className="font-semibold">Phone</span>
              </div>
              <span className="text-xs font-bold text-[var(--foreground)]">
                {profile.phone || "—"}
              </span>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-alt)] border border-[var(--border-color)]">
              <div className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
                <Activity className="w-3.5 h-3.5 text-primary" />
                <span className="font-semibold">Status</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                Active
              </span>
            </div>

            {/* Joined */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-alt)] border border-[var(--border-color)]">
              <div className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span className="font-semibold">Joined</span>
              </div>
              <span className="text-xs font-bold text-[var(--foreground)]">
                {profile.joinedDate}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-[var(--border-color)]">
            <p className="text-[11px] text-[var(--foreground-muted)] text-center leading-relaxed">
              To change your email or password, go to{" "}
              <Link
                href="/dashboard/admin/settings"
                className="text-primary hover:underline font-semibold"
              >
                Settings → Security
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
