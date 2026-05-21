"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  getMe,
  login,
  register,
  type AuthUser,
  type LoginPayload,
  type RegisterPayload,
} from "../api/auth";
import { APP_EVENTS } from "../../../lib/constants/api";
import {
  clearSession,
  persistSession,
  readSession,
} from "../lib/session";
import { AuthAccessPanel } from "./auth-access-panel";

type AuthMode = "login" | "register";

type AuthModalState = {
  isOpen: boolean;
  mode: AuthMode;
  reason: string | null;
};

type AuthContextValue = {
  token: string | null;
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  isAuthReady: boolean;
  modalState: AuthModalState;
  openAuthModal: (options?: { mode?: AuthMode; reason?: string | null }) => void;
  closeAuthModal: () => void;
  loginWithCredentials: (payload: LoginPayload) => Promise<void>;
  registerAndLogin: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function AuthModal({
  isOpen,
  mode,
  reason,
  onClose,
}: {
  isOpen: boolean;
  mode: AuthMode;
  reason: string | null;
  onClose: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="auth-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="auth-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="登录或注册"
        onClick={(event) => event.stopPropagation()}
      >
        <AuthAccessPanel
          variant="modal"
          initialMode={mode}
          reason={reason}
          onSuccess={onClose}
          onCancel={onClose}
          showSkipLink={false}
        />
      </div>
    </div>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [modalState, setModalState] = useState<AuthModalState>({
    isOpen: false,
    mode: "login",
    reason: null,
  });

  useEffect(() => {
    let validationRunId = 0;
    let isMounted = true;

    const syncSession = () => {
      const runId = ++validationRunId;
      const nextSession = readSession();

      if (!nextSession.token || !nextSession.user) {
        setToken(null);
        setCurrentUser(null);
        setIsAuthReady(true);
        return;
      }

      setIsAuthReady(false);

      void getMe(nextSession.token)
        .then((user) => {
          if (!isMounted || validationRunId !== runId) {
            return;
          }
          setToken(nextSession.token);
          setCurrentUser(user);
          setIsAuthReady(true);
        })
        .catch(() => {
          if (!isMounted || validationRunId !== runId) {
            return;
          }
          setToken(null);
          setCurrentUser(null);
          clearSession();
          setIsAuthReady(true);
        });
    };

    const expireSession = () => {
      validationRunId += 1;
      setToken(null);
      setCurrentUser(null);
      setIsAuthReady(true);
      clearSession();
      setModalState((current) => ({
        ...current,
        isOpen: false,
        reason: null,
      }));
    };

    syncSession();
    window.addEventListener("storage", syncSession);
    window.addEventListener(APP_EVENTS.sessionChanged, syncSession);
    window.addEventListener(APP_EVENTS.sessionExpired, expireSession);

    return () => {
      isMounted = false;
      window.removeEventListener("storage", syncSession);
      window.removeEventListener(APP_EVENTS.sessionChanged, syncSession);
      window.removeEventListener(APP_EVENTS.sessionExpired, expireSession);
    };
  }, []);

  const openAuthModal = useCallback((options?: { mode?: AuthMode; reason?: string | null }) => {
    setModalState({
      isOpen: true,
      mode: options?.mode ?? "login",
      reason: options?.reason ?? null,
    });
  }, []);

  const closeAuthModal = useCallback(() => {
    setModalState((current) => ({
      ...current,
      isOpen: false,
      reason: null,
    }));
  }, []);

  const loginWithCredentials = useCallback(async (payload: LoginPayload) => {
    const result = await login(payload);
    persistSession(
      result.token.access_token,
      result.user,
      result.token.refresh_token,
    );
    setToken(result.token.access_token);
    setCurrentUser(result.user);
  }, []);

  const registerAndLogin = useCallback(async (payload: RegisterPayload) => {
    await register(payload);
    await loginWithCredentials({
      identifier: payload.username,
      password: payload.password,
      remember_me: true,
    });
  }, [loginWithCredentials]);

  const logout = useCallback(() => {
    setToken(null);
    setCurrentUser(null);
    clearSession();
    closeAuthModal();
  }, [closeAuthModal]);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      currentUser,
      isAuthenticated: Boolean(token && currentUser),
      isAuthReady,
      modalState,
      openAuthModal,
      closeAuthModal,
      loginWithCredentials,
      registerAndLogin,
      logout,
    }),
    [
      token,
      currentUser,
      isAuthReady,
      modalState,
      openAuthModal,
      closeAuthModal,
      loginWithCredentials,
      registerAndLogin,
      logout,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        reason={modalState.reason}
        onClose={closeAuthModal}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
