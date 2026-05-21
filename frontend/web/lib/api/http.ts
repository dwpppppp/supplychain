import { API_BASE_URL, APP_EVENTS } from "../constants/api";

export type ApiEnvelope<T> = {
  code: number;
  message: string;
  data: T;
};

export class ApiRequestError extends Error {
  readonly status: number;
  readonly code: number;

  constructor(message: string, status: number, code: number) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.code = code;
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string | null;
  signal?: AbortSignal;
};

const AUTH_EXPIRED_CODES = new Set([401, 40101, 40102, 40103]);

export function notifySessionExpired() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(APP_EVENTS.sessionExpired));
}

function isAuthExpired(status: number, code: number) {
  return status === 401 || AUTH_EXPIRED_CODES.has(code);
}

export async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.token
        ? {
            Authorization: `Bearer ${options.token}`,
          }
        : {}),
    },
    body:
      options.body === undefined ? undefined : JSON.stringify(options.body),
    signal: options.signal,
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok || !payload || payload.code !== 0) {
    const code = payload?.code || response.status;

    if (isAuthExpired(response.status, code)) {
      notifySessionExpired();
    }

    throw new ApiRequestError(
      payload?.message || "Request failed",
      response.status,
      code,
    );
  }

  return payload.data;
}
