"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { useAuth } from "./auth-provider";

type AuthMode = "login" | "register";

type AuthAccessPanelProps = {
  variant?: "page" | "modal";
  initialMode?: AuthMode;
  reason?: string | null;
  onSuccess?: () => void;
  onCancel?: () => void;
  showSkipLink?: boolean;
};

type LoginFormState = {
  identifier: string;
  password: string;
};

type RegisterFormState = {
  username: string;
  email: string;
  fullName: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const DEFAULT_LOGIN_FORM: LoginFormState = {
  identifier: "",
  password: "",
};

const DEFAULT_REGISTER_FORM: RegisterFormState = {
  username: "",
  email: "",
  fullName: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export function AuthAccessPanel({
  variant = "page",
  initialMode = "login",
  reason,
  onSuccess,
  onCancel,
  showSkipLink = true,
}: AuthAccessPanelProps) {
  const router = useRouter();
  const { loginWithCredentials, registerAndLogin } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [loginForm, setLoginForm] = useState(DEFAULT_LOGIN_FORM);
  const [registerForm, setRegisterForm] = useState(DEFAULT_REGISTER_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const panelTitle = useMemo(() => {
    if (mode === "register") {
      return "创建学习账号";
    }

    return variant === "modal" ? "登录后继续操作" : "登录 / 注册";
  }, [mode, variant]);

  const panelCopy =
    mode === "register"
      ? "创建学习账号后，即可保存课程进度、AI 对话和实训记录。"
      : "登录后可继续课程学习，并同步保存你的学习进度、提问记录和实训结果。";

  const handleSkip = () => {
    router.push("/overview");
  };

  const handleLogin = async () => {
    if (!loginForm.identifier.trim() || !loginForm.password.trim()) {
      setErrorMessage("请输入账号和密码。");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await loginWithCredentials({
        identifier: loginForm.identifier.trim(),
        password: loginForm.password,
        remember_me: true,
      });
      onSuccess?.();
      if (variant === "page") {
        router.push("/overview");
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "登录失败，请稍后重试。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async () => {
    if (
      !registerForm.username.trim() ||
      !registerForm.email.trim() ||
      !registerForm.password ||
      !registerForm.confirmPassword
    ) {
      setErrorMessage("请先补齐用户名、邮箱和密码。");
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setErrorMessage("两次输入的密码不一致。");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await registerAndLogin({
        username: registerForm.username.trim(),
        email: registerForm.email.trim(),
        password: registerForm.password,
        full_name: registerForm.fullName.trim() || undefined,
        phone: registerForm.phone.trim() || undefined,
      });
      onSuccess?.();
      if (variant === "page") {
        router.push("/overview");
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "注册失败，请稍后重试。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`auth-panel auth-panel-${variant}`} aria-label="认证面板">
      <div className="auth-panel-head">
        <div>
          <h2 className="panel-title">{panelTitle}</h2>
        </div>

        {variant === "modal" ? (
          <button className="button-ghost" type="button" onClick={onCancel}>
            关闭
          </button>
        ) : null}
      </div>

      <div className="auth-switch" role="tablist" aria-label="认证模式">
        <button
          className={`auth-switch-item${mode === "login" ? " is-active" : ""}`}
          type="button"
          role="tab"
          aria-selected={mode === "login"}
          onClick={() => {
            setMode("login");
            setErrorMessage(null);
          }}
        >
          登录
        </button>
        <button
          className={`auth-switch-item${mode === "register" ? " is-active" : ""}`}
          type="button"
          role="tab"
          aria-selected={mode === "register"}
          onClick={() => {
            setMode("register");
            setErrorMessage(null);
          }}
        >
          注册
        </button>
      </div>

      {reason ? <div className="auth-reason">{reason}</div> : null}
      <p className="body-copy">{panelCopy}</p>

      {mode === "login" ? (
        <form
          className="form-stack"
          onSubmit={(event) => {
            event.preventDefault();
            void handleLogin();
          }}
        >
          <label className="field-group">
            <span className="field-label">用户名或邮箱</span>
            <input
              className="field-input"
              type="text"
              value={loginForm.identifier}
              onChange={(event) =>
                setLoginForm((current) => ({
                  ...current,
                  identifier: event.target.value,
                }))
              }
              placeholder="请输入用户名或邮箱"
            />
          </label>

          <label className="field-group">
            <span className="field-label">密码</span>
            <input
              className="field-input"
              type="password"
              value={loginForm.password}
              onChange={(event) =>
                setLoginForm((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
              placeholder="请输入密码"
            />
          </label>

          {errorMessage ? <div className="form-error">{errorMessage}</div> : null}

          <div className="actions-row">
            <button className="button-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "登录中..." : "登录并继续"}
            </button>
            {showSkipLink ? (
              <button className="button-secondary" type="button" onClick={handleSkip}>
                先跳过
              </button>
            ) : null}
          </div>
        </form>
      ) : (
        <form
          className="form-stack"
          onSubmit={(event) => {
            event.preventDefault();
            void handleRegister();
          }}
        >
          <label className="field-group">
            <span className="field-label">用户名</span>
            <input
              className="field-input"
              type="text"
              value={registerForm.username}
              onChange={(event) =>
                setRegisterForm((current) => ({
                  ...current,
                  username: event.target.value,
                }))
              }
              placeholder="3-32 位字母、数字或下划线"
            />
          </label>

          <label className="field-group">
            <span className="field-label">邮箱</span>
            <input
              className="field-input"
              type="email"
              value={registerForm.email}
              onChange={(event) =>
                setRegisterForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              placeholder="用于登录和找回账号"
            />
          </label>

          <label className="field-group">
            <span className="field-label">姓名</span>
            <input
              className="field-input"
              type="text"
              value={registerForm.fullName}
              onChange={(event) =>
                setRegisterForm((current) => ({
                  ...current,
                  fullName: event.target.value,
                }))
              }
              placeholder="可选"
            />
          </label>

          <label className="field-group">
            <span className="field-label">手机号</span>
            <input
              className="field-input"
              type="tel"
              value={registerForm.phone}
              onChange={(event) =>
                setRegisterForm((current) => ({
                  ...current,
                  phone: event.target.value,
                }))
              }
              placeholder="可选，11 位手机号"
            />
          </label>

          <div className="auth-form-grid">
            <label className="field-group">
              <span className="field-label">密码</span>
              <input
                className="field-input"
                type="password"
                value={registerForm.password}
                onChange={(event) =>
                  setRegisterForm((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                placeholder="至少 8 位，包含大小写和数字"
              />
            </label>

            <label className="field-group">
              <span className="field-label">确认密码</span>
              <input
                className="field-input"
                type="password"
                value={registerForm.confirmPassword}
                onChange={(event) =>
                  setRegisterForm((current) => ({
                    ...current,
                    confirmPassword: event.target.value,
                  }))
                }
                placeholder="再次输入密码"
              />
            </label>
          </div>

          {errorMessage ? <div className="form-error">{errorMessage}</div> : null}

          <div className="actions-row">
            <button className="button-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "注册中..." : "注册并进入平台"}
            </button>
            {showSkipLink ? (
              <Link className="button-secondary" href="/overview">
                先跳过
              </Link>
            ) : null}
          </div>
        </form>
      )}

      <p className="auth-legal-note">
        登录或注册即表示你已阅读并同意
        <Link href="/terms">《用户协议》</Link>
        和
        <Link href="/privacy">《隐私政策》</Link>。
      </p>
    </section>
  );
}
