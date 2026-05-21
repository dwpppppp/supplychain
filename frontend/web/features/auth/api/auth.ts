import { request } from "../../../lib/api/http";

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  full_name: string | null;
  role: string;
  is_active: boolean;
};

export type LoginPayload = {
  identifier: string;
  password: string;
  remember_me: boolean;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  full_name?: string;
  phone?: string;
};

export type LoginResult = {
  user: AuthUser;
  token: {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
  };
};

export type MeResult = AuthUser & {
  learning_progress: {
    chapters_completed: number;
    chapters_total: number;
    training_cases_completed: number;
    training_cases_total: number;
  };
};

export function login(payload: LoginPayload) {
  return request<LoginResult>("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function register(payload: RegisterPayload) {
  return request<AuthUser>("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export function getMe(token: string) {
  return request<MeResult>("/auth/me", {
    token,
  });
}
