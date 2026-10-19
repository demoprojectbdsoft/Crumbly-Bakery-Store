"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

/**
 * Hook that detects if the currently logged-in user is a "demoAdmin".
 * demoAdmin can browse all admin pages but cannot perform any
 * create / update / delete actions.
 *
 * Usage in any handler:
 *   const { guardDemo } = useDemoAdmin();
 *   const handleSave = async () => {
 *     if (guardDemo()) return;  // ← stops here for demoAdmin
 *     // ... real logic
 *   };
 */
export function useDemoAdmin() {
  const { data: session } = authClient.useSession();
  const role = (session?.user as any)?.role as string | undefined;
  const isDemoAdmin = role?.toLowerCase() === "demoadmin";

  /**
   * Call this at the top of sensitive handlers where demoAdmin is disabled
   * (e.g. altering users, settings, system configuration).
   * Note: Products CRUD is enabled for demo admin and restores daily at 2:00 AM.
   */
  const guardDemo = (message = "This is a demo account. Changes to this section are disabled.") => {
    if (isDemoAdmin) {
      toast.info(message, { toastId: "demo-guard" });
      return true;
    }
    return false;
  };

  return { isDemoAdmin, guardDemo };
}
