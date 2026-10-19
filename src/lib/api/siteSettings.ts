import { serverFetch } from "../core/server";

export const getSiteSettings = async () => {
  return serverFetch(`/site-settings`);
};
