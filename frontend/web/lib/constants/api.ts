export const DEFAULT_API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL;

export const STORAGE_KEYS = {
  accessToken: "supplychain.access_token",
  refreshToken: "supplychain.refresh_token",
  currentUser: "supplychain.current_user",
} as const;

export const APP_EVENTS = {
  sessionChanged: "supplychain:session-changed",
  sessionExpired: "supplychain:session-expired",
} as const;
