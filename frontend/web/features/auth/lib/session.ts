import type { AuthUser } from "../api/auth";
import { APP_EVENTS, STORAGE_KEYS } from "../../../lib/constants/api";

export type AuthSession = {
  token: string | null;
  user: AuthUser | null;
};

export function readStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEYS.currentUser);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function readSession(): AuthSession {
  if (typeof window === "undefined") {
    return { token: null, user: null };
  }

  return {
    token: window.localStorage.getItem(STORAGE_KEYS.accessToken),
    user: readStoredUser(),
  };
}

export function persistSession(token: string, user: AuthUser, refreshToken?: string) {
  window.localStorage.setItem(STORAGE_KEYS.accessToken, token);
  window.localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));

  if (refreshToken) {
    window.localStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken);
  }

  window.dispatchEvent(new Event(APP_EVENTS.sessionChanged));
}

export function clearSession() {
  window.localStorage.removeItem(STORAGE_KEYS.accessToken);
  window.localStorage.removeItem(STORAGE_KEYS.refreshToken);
  window.localStorage.removeItem(STORAGE_KEYS.currentUser);
  window.dispatchEvent(new Event(APP_EVENTS.sessionChanged));
}
