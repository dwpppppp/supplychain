"use client";

import { useAuth } from "../../auth/components/auth-provider";

export function PlatformSessionStatus() {
  const { currentUser, isAuthenticated, isAuthReady, openAuthModal, logout } = useAuth();

  if (!isAuthReady) {
    return (
      <div className="platform-session">
        <div className="platform-session-copy">
          <div className="platform-session-name">检查登录状态</div>
          <div className="platform-session-meta">正在读取本地会话</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="platform-session">
        <div className="platform-session-copy">
          <div className="platform-session-name">游客模式</div>
          <div className="platform-session-meta">未连接学习账号</div>
        </div>
        <button
          className="button-secondary platform-session-button"
          type="button"
          onClick={() =>
            openAuthModal({
              mode: "login",
              reason: "登录后可继续提问 AI、打开知识图谱并保存学习进度。",
            })
          }
        >
          登录 / 注册
        </button>
      </div>
    );
  }

  return (
    <div className="platform-session">
      <div className="platform-session-copy">
        <div className="platform-session-name">
          {currentUser.full_name || currentUser.username}
        </div>
        <div className="platform-session-meta">已连接学习账号</div>
      </div>
      <button
        className="button-secondary platform-session-button"
        type="button"
        onClick={logout}
      >
        退出登录
      </button>
    </div>
  );
}
