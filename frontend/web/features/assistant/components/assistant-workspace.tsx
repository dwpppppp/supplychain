"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useAuth } from "../../auth/components/auth-provider";
import { useAssistantChat } from "../hooks/use-assistant-chat";
import { Live2DAvatar } from "./live2d-avatar";

const PRESENCE_LABEL: Record<string, string> = {
  offline: "未连接",
  idle: "待命中",
  thinking: "思考中",
  speaking: "讲解中",
  error: "异常",
};

function formatTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "--";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function AssistantWorkspace() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingAudioUrl, setPlayingAudioUrl] = useState<string | null>(null);
  const { openAuthModal } = useAuth();

  const {
    token,
    currentUser,
    conversations,
    activeConversationId,
    messages,
    messageDraft,
    setMessageDraft,
    avatarDraft,
    setAvatarDraft,
    presence,
    isBootstrapping,
    isSending,
    isDrawerOpen,
    setIsDrawerOpen,
    errorMessage,
    handleConversationSelect,
    handleCreateConversation,
    handleSendMessage,
    handleSendAvatarMessage,
  } = useAssistantChat();

  const statusText = useMemo(
    () => PRESENCE_LABEL[presence] ?? "待命中",
    [presence],
  );

  const recentAvatarMessages = useMemo(() => messages.slice(-4), [messages]);

  const learnerName =
    currentUser?.full_name || currentUser?.username || "学习者";

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleAudioToggle = async (audioUrl: string) => {
    if (audioRef.current && playingAudioUrl === audioUrl) {
      audioRef.current.pause();
      audioRef.current = null;
      setPlayingAudioUrl(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const audio = new Audio(audioUrl);
    audio.preload = "auto";
    audio.onended = () => {
      setPlayingAudioUrl(null);
      audioRef.current = null;
    };
    audio.onerror = () => {
      setPlayingAudioUrl(null);
      audioRef.current = null;
    };

    audioRef.current = audio;
    setPlayingAudioUrl(audioUrl);

    try {
      await audio.play();
    } catch {
      setPlayingAudioUrl(null);
      audioRef.current = null;
    }
  };

  return (
    <section className="assistant-shell">
      <div className="assistant-layout">
        <aside className="assistant-history">
          <div className="assistant-section-head">
            <div>
              <div className="eyebrow">助学控制台</div>
              <h3 className="section-title">对话历史</h3>
            </div>
          </div>

          <div className="assistant-login-card">
            {token && currentUser ? (
              <>
                <div className="assistant-login-copy">
                  <div className="assistant-user-name">新建对话</div>
                  <div className="assistant-user-meta">
                    围绕当前章节开启一个新的问答线程。
                  </div>
                </div>

                <button
                  className="button-primary assistant-full-button"
                  type="button"
                  onClick={handleCreateConversation}
                >
                  创建对话
                </button>
              </>
            ) : (
              <>
                <div className="assistant-login-copy">
                  <div className="assistant-user-name">游客访问</div>
                  <div className="assistant-user-meta">
                    你可以先浏览当前界面；登录后即可创建问答线程、发送提问并保留历史记录。
                  </div>
                </div>

                <button
                  className="button-primary assistant-full-button"
                  type="button"
                  onClick={() =>
                    openAuthModal({
                      mode: "login",
                      reason: "登录后即可开启 AI 助学问答与数字人语音互动。",
                    })
                  }
                >
                  登录后开始提问
                </button>
              </>
            )}
          </div>

          <div className="assistant-conversation-list">
            {conversations.length === 0 ? (
              <div className="assistant-empty-card">
                {isBootstrapping ? "正在加载对话..." : "暂无对话记录"}
              </div>
            ) : (
              conversations.map((conversation, index) => (
                <button
                  key={conversation.id}
                  className={`assistant-conversation-item${
                    conversation.id === activeConversationId ? " is-active" : ""
                  }`}
                  type="button"
                  onClick={() => handleConversationSelect(conversation.id)}
                >
                  <div className="assistant-conversation-title">
                    对话 {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="assistant-conversation-meta">
                    {formatTime(conversation.updated_at)}
                  </div>
                  <div className="assistant-conversation-id">{conversation.id}</div>
                </button>
              ))
            )}
          </div>
        </aside>

        <div className="assistant-main">
          {errorMessage ? (
            <div className="assistant-error-banner">{errorMessage}</div>
          ) : null}

          <div className="assistant-chat-panel">
            <div className="assistant-chat-scroll">
              {messages.length === 0 ? (
                <div className="assistant-empty-chat">
                  {token
                    ? "围绕当前课程内容发起提问，开始新的 AI 助学对话。"
                    : "游客可先浏览界面；真正发起 AI 问答前需要先登录。"}
                </div>
              ) : (
                messages.map((message) => {
                  const isAssistant = message.role === "assistant";
                  const speakerName = isAssistant ? "AI 助教" : learnerName;

                  return (
                    <article
                      key={message.id}
                      className={`assistant-message ${
                        isAssistant ? "is-assistant" : "is-user"
                      }`}
                    >
                      <div className="assistant-message-head">
                        <div className="assistant-message-speaker">
                          {speakerName}
                        </div>
                        <div className="assistant-message-time">
                          {formatTime(message.created_at)}
                        </div>
                      </div>

                      <div className="assistant-message-body">
                        {message.content ? (
                          message.content
                        ) : isAssistant ? (
                          <span className="assistant-typing">
                            <span className="assistant-typing-dot" />
                            <span className="assistant-typing-dot" />
                            <span className="assistant-typing-dot" />
                            <span className="assistant-typing-label">
                              思考中...
                            </span>
                          </span>
                        ) : null}
                      </div>

                      {message.audio_url ? (
                        <button
                          className="assistant-audio-button"
                          type="button"
                          onClick={() => void handleAudioToggle(message.audio_url!)}
                        >
                          {playingAudioUrl === message.audio_url
                            ? "暂停语音"
                            : "播放语音"}
                        </button>
                      ) : null}
                    </article>
                  );
                })
              )}
            </div>

            <div className="assistant-composer">
              <label className="field-group assistant-composer-field">
                <span className="field-label">文字对话</span>
                <textarea
                  className="assistant-textarea"
                  value={messageDraft}
                  onChange={(event) => setMessageDraft(event.target.value)}
                  placeholder={
                    token
                      ? "输入课程相关问题，主聊天会返回流式文本回复"
                      : "可以先输入问题，点击发送时会提示登录"
                  }
                  disabled={isSending}
                />
              </label>

              <div className="assistant-composer-actions">
                <div className="assistant-composer-tip">
                  {token ? "主聊天返回流式文本回复。" : "AI 助学提问需登录后使用。"}
                </div>
                <button
                  className="button-primary"
                  type="button"
                  onClick={handleSendMessage}
                  disabled={isSending}
                >
                  {isSending ? "发送中..." : "发送消息"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        className="assistant-avatar-fab"
        type="button"
        onClick={() => setIsDrawerOpen(true)}
      >
        <span className="assistant-avatar-fab-bubble">AI</span>
        <span className="assistant-avatar-fab-copy">
          <span className="assistant-avatar-fab-title">数字人助教</span>
          <span className="assistant-avatar-fab-meta">试试数字人</span>
        </span>
      </button>

      {isDrawerOpen ? (
        <div
          className="assistant-avatar-modal-backdrop"
          onClick={() => setIsDrawerOpen(false)}
        >
          <aside
            className="assistant-avatar-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="assistant-avatar-modal-head">
              <div className="assistant-avatar-modal-label">
                <div className="assistant-avatar-modal-title">数字人助教 小秋老师</div>
              </div>

              <div className={`assistant-presence-chip is-${presence}`}>
                <span className="assistant-presence-dot" />
                <span>{statusText}</span>
              </div>
            </div>

            <div className={`assistant-avatar-modal-stage is-${presence}`}>
              <Live2DAvatar presence={presence} />
            </div>

            <div className="assistant-avatar-mini-chat">
              {recentAvatarMessages.length > 0 ? (
                recentAvatarMessages.map((message) => {
                  const isAssistant = message.role === "assistant";

                  return (
                    <div
                      key={message.id}
                      className={`assistant-avatar-mini-message ${
                        isAssistant ? "is-assistant" : "is-user"
                      }`}
                    >
                      <span className="assistant-avatar-mini-speaker">
                        {isAssistant ? "AI 助教" : learnerName}
                      </span>
                      <span>
                        {message.content ? (
                          message.content
                        ) : isAssistant ? (
                          <span className="assistant-typing assistant-typing-inline">
                            <span className="assistant-typing-dot" />
                            <span className="assistant-typing-dot" />
                            <span className="assistant-typing-dot" />
                            <span className="assistant-typing-label">
                              思考中...
                            </span>
                          </span>
                        ) : null}
                      </span>
                    </div>
                  );
                })
              ) : null}
            </div>

            <div className="assistant-avatar-modal-foot">
              <input
                className="assistant-avatar-input"
                type="text"
                value={avatarDraft}
                onChange={(event) => setAvatarDraft(event.target.value)}
                placeholder={
                  token ? "向数字人提问" : "登录后可发起数字人语音问答"
                }
                disabled={isSending}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    void handleSendAvatarMessage();
                  }
                }}
              />

              <div className="assistant-avatar-modal-actions">
                <button
                  className="button-secondary assistant-small-button"
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  关闭
                </button>
                <button
                  className="button-primary assistant-small-button"
                  type="button"
                  onClick={handleSendAvatarMessage}
                  disabled={isSending}
                >
                  {isSending ? "发送中..." : "发送"}
                </button>
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </section>
  );
}
