"use client";

import React from "react";
import { AlertDialog, Button } from "@heroui/react";
import { Ban } from "lucide-react";

interface SuspendedAccountModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title?: string;
  message?: string;
  actionText?: string;
}

export default function SuspendedAccountModal({
  isOpen,
  onOpenChange,
  title = "Account Suspended",
  message = "Your account has been suspended. You are not allowed to add items to the cart or place orders. Please contact customer support for assistance.",
  actionText = "Understood",
}: SuspendedAccountModalProps) {
  return (
    <AlertDialog.Root isOpen={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Backdrop isDismissable className="bg-black/60 backdrop-blur-xs">
        <AlertDialog.Container size="sm">
          <AlertDialog.Dialog className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface-elevated)] text-[var(--foreground)] shadow-2xl p-6 space-y-4">
            {({ close }) => (
              <>
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 border border-red-200/80 dark:border-red-900/50">
                    <Ban className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <AlertDialog.Heading className="text-base font-bold text-[var(--foreground)]">
                      {title}
                    </AlertDialog.Heading>
                    <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                      {message}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end pt-2 border-t border-[var(--border-color)]">
                  <Button
                    size="sm"
                    onPress={close}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-xs cursor-pointer"
                  >
                    {actionText}
                  </Button>
                </div>
              </>
            )}
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog.Root>
  );
}
