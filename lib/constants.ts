/// <reference types="vite/client" />

export const MESSAGE_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30; // 30 day
export const APP_URL = import.meta.env.VITE_APP_URL!;
if (!APP_URL) {
  throw new Error("VITE_APP_URL is not set");
}
