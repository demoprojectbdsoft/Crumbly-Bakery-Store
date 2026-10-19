"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const updateSiteSettings = async (data: Record<string, unknown>) => {
  const res = await serverMutation(`/site-settings`, data, "PATCH");
  try {
    revalidatePath("/", "layout");
  } catch {}
  return res;
};
