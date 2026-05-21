"use client";

import { useEffect, useRef, useState } from "react";

import { ApiRequestError } from "../../../lib/api/http";
import { useAuth } from "../../auth/components/auth-provider";
import {
  createConversation,
  listAssistantConversations,
  listConversationMessages,
  sendConversationMessage,
  streamConversationMessage,
} from "../api/chat";
import type {
  AssistantConversation,
  AssistantMessage,
  AssistantPresence,
  AssistantResponseMode,
} from "../types/chat";

function buildUserMessage(
  conversationId: string,
  content: string,
): AssistantMessage {
  return {
    id: `local-user-${Date.now()}`,
    conversation_id: conversationId,
    role: "user",
    content,
    audio_url: null,
    duration_ms: null,
    created_at: new Date().toISOString(),
  };
}

async function playAudio(url: string) {
  const audio = new Audio(url);
  audio.preload = "auto";

  await new Promise<void>((resolve, reject) => {
    const cleanup = () => {
      audio.onended = null;
      audio.onerror = null;
    };

    audio.onended = () => {
      cleanup();
      resolve();
    };

    audio.onerror = () => {
      cleanup();
      reject(new Error("Audio playback failed"));
    };

    void audio.play().catch((error) => {
      cleanup();
      reject(error);
    });
  });
}

export function useAssistantChat() {
  const { token, currentUser, isAuthReady, openAuthModal, logout } = useAuth();
  const [conversations, setConversations] = useState<AssistantConversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    null,
  );
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [messageDraft, setMessageDraft] = useState("");
  const [avatarDraft, setAvatarDraft] = useState("");
  const [presence, setPresence] = useState<AssistantPresence>("offline");
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const audioRunIdRef = useRef(0);

  const resetWorkspace = () => {
    setConversations([]);
    setActiveConversationId(null);
    setMessages([]);
    setPresence("offline");
  };

  const loadConversationMessages = async (
    nextToken: string,
    conversationId: string,
  ) => {
    const data = await listConversationMessages(nextToken, conversationId);
    setMessages(data.items);
    setActiveConversationId(conversationId);
  };

  const ensureConversation = async (nextToken: string) => {
    const conversationList = await listAssistantConversations(nextToken);
    const items = conversationList.items;
    setConversations(items);

    if (items.length > 0) {
      await loadConversationMessages(nextToken, items[0].id);
      return items[0].id;
    }

    const createdConversation = await createConversation(nextToken);
    setConversations([createdConversation]);
    setMessages([]);
    setActiveConversationId(createdConversation.id);
    return createdConversation.id;
  };

  useEffect(() => {
    if (!isAuthReady) {
      return;
    }

    if (!token) {
      resetWorkspace();
      setIsBootstrapping(false);
      return;
    }

    let cancelled = false;

    const bootstrap = async () => {
      setIsBootstrapping(true);
      setErrorMessage(null);

      try {
        await ensureConversation(token);
        if (!cancelled) {
          setPresence("idle");
        }
      } catch (error) {
        if (!cancelled) {
          resetWorkspace();
          setPresence("error");
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "AI 助学工作台初始化失败。",
          );
        }
      } finally {
        if (!cancelled) {
          setIsBootstrapping(false);
        }
      }
    };

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, [isAuthReady, token]);

  const requireAuth = (reason: string) => {
    openAuthModal({
      mode: "login",
      reason,
    });
  };

  const handleConversationSelect = async (conversationId: string) => {
    if (!token || conversationId === activeConversationId) {
      return;
    }

    setErrorMessage(null);

    try {
      await loadConversationMessages(token, conversationId);
      setPresence("idle");
    } catch (error) {
      setPresence("error");
      setErrorMessage(
        error instanceof Error ? error.message : "加载历史对话失败。",
      );
    }
  };

  const handleCreateConversation = async () => {
    if (!token) {
      requireAuth("创建新对话前请先登录。");
      return;
    }

    setErrorMessage(null);

    try {
      const createdConversation = await createConversation(token);
      setConversations((current) => [createdConversation, ...current]);
      setActiveConversationId(createdConversation.id);
      setMessages([]);
      setPresence("idle");
    } catch (error) {
      setPresence("error");
      setErrorMessage(
        error instanceof Error ? error.message : "创建对话失败。",
      );
    }
  };

  const sendMessage = async (
    draft: string,
    responseMode: AssistantResponseMode,
    clearDraft: () => void,
  ) => {
    if (!token) {
      requireAuth(
        responseMode === "voice"
          ? "使用数字人语音问答前请先登录。"
          : "向 AI 助学提问前请先登录。",
      );
      return;
    }

    const content = draft.trim();
    if (!content || isSending) {
      return;
    }

    setIsSending(true);
    setErrorMessage(null);
    setPresence("thinking");

    const pendingAssistantId = `local-assistant-${Date.now()}`;

    try {
      const conversationId =
        activeConversationId || (await ensureConversation(token));
      const userMessage = buildUserMessage(conversationId, content);
      const pendingAssistantMessage: AssistantMessage = {
        id: pendingAssistantId,
        conversation_id: conversationId,
        role: "assistant",
        content: "",
        audio_url: null,
        duration_ms: null,
        created_at: new Date().toISOString(),
      };

      setMessages((current) => [
        ...current,
        userMessage,
        pendingAssistantMessage,
      ]);
      clearDraft();

      if (responseMode === "text") {
        await streamConversationMessage(token, conversationId, content, {
          onDelta: ({ content: delta }) => {
            setMessages((current) =>
              current.map((message) =>
                message.id === pendingAssistantId
                  ? {
                      ...message,
                      content: `${message.content}${delta}`,
                    }
                  : message,
              ),
            );
          },
          onEnd: (reply) => {
            setMessages((current) =>
              current.map((message) =>
                message.id === pendingAssistantId
                  ? {
                      id: reply.message_id,
                      conversation_id: conversationId,
                      role: "assistant",
                      content: reply.content,
                      audio_url: reply.audio_url,
                      duration_ms: reply.duration_ms,
                      created_at: reply.created_at,
                    }
                  : message,
              ),
            );
          },
          onError: ({ message }) => {
            setErrorMessage(message);
          },
        });
      } else {
        const reply = await sendConversationMessage(
          token,
          conversationId,
          content,
          responseMode,
        );
        const assistantMessage: AssistantMessage = {
          id: reply.message_id,
          conversation_id: conversationId,
          role: "assistant",
          content: reply.content,
          audio_url: reply.audio_url,
          duration_ms: reply.duration_ms,
          created_at: reply.created_at,
        };

        setMessages((current) =>
          current.map((message) =>
            message.id === pendingAssistantId ? assistantMessage : message,
          ),
        );

        if (assistantMessage.audio_url && responseMode === "voice") {
          const runId = Date.now();
          audioRunIdRef.current = runId;
          setPresence("speaking");

          try {
            await playAudio(assistantMessage.audio_url);
            if (audioRunIdRef.current === runId) {
              setPresence("idle");
            }
          } catch {
            setPresence("idle");
          }
        }
      }

      const refreshedConversations = await listAssistantConversations(token);
      setConversations(refreshedConversations.items);
      setActiveConversationId(conversationId);
      setPresence("idle");
    } catch (error) {
      setPresence("error");

      if (error instanceof ApiRequestError && error.status === 401) {
        logout();
      }

      setMessages((current) =>
        current.filter((message) => message.id !== pendingAssistantId),
      );
      setErrorMessage(
        error instanceof Error ? error.message : "发送消息失败。",
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleSendMessage = async () => {
    await sendMessage(messageDraft, "text", () => setMessageDraft(""));
  };

  const handleSendAvatarMessage = async () => {
    await sendMessage(avatarDraft, "voice", () => setAvatarDraft(""));
  };

  return {
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
  };
}
