import { notifySessionExpired, request } from "../../../lib/api/http";
import type {
  AssistantConversation,
  AssistantMessage,
  AssistantResponseMode,
} from "../types/chat";
import { API_BASE_URL } from "../../../lib/constants/api";
import { ApiRequestError } from "../../../lib/api/http";

type ConversationListResult = {
  items: AssistantConversation[];
  total: number;
  page: number;
  page_size: number;
};

type ConversationMessagesResult = {
  conversation_id: string;
  items: AssistantMessage[];
};

type SendMessageResult = {
  message_id: string;
  content: string;
  audio_url: string | null;
  duration_ms: number | null;
  created_at: string;
};

type StreamStartPayload = {
  conversation_id: string;
};

type StreamDeltaPayload = {
  content: string;
};

type StreamEndPayload = SendMessageResult;

type StreamErrorPayload = {
  message: string;
};

type StreamHandlers = {
  onStart?: (payload: StreamStartPayload) => void;
  onDelta: (payload: StreamDeltaPayload) => void;
  onEnd: (payload: StreamEndPayload) => void;
  onError?: (payload: StreamErrorPayload) => void;
};

export function createConversation(token: string) {
  return request<AssistantConversation>("/chat/conversations", {
    method: "POST",
    token,
    body: {
      scene: "assistant",
    },
  });
}

export function listAssistantConversations(token: string) {
  return request<ConversationListResult>("/chat/conversations?scene=assistant", {
    token,
  });
}

export function listConversationMessages(
  token: string,
  conversationId: string,
  limit = 100,
) {
  return request<ConversationMessagesResult>(
    `/chat/conversations/${conversationId}/messages?limit=${limit}`,
    {
      token,
    },
  );
}

export function sendConversationMessage(
  token: string,
  conversationId: string,
  content: string,
  responseMode: AssistantResponseMode = "text",
) {
  return request<SendMessageResult>("/chat/messages", {
    method: "POST",
    token,
    body: {
      conversation_id: conversationId,
      content,
      response_mode: responseMode,
    },
  });
}

function parseSseBlock(block: string) {
  const lines = block
    .split("\n")
    .map((line) => line.trimEnd())
    .filter(Boolean);

  let eventName = "message";
  const dataLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith("event:")) {
      eventName = line.slice(6).trim();
      continue;
    }
    if (line.startsWith("data:")) {
      dataLines.push(line.slice(5).trim());
    }
  }

  return {
    event: eventName,
    data: dataLines.join("\n"),
  };
}

export async function streamConversationMessage(
  token: string,
  conversationId: string,
  content: string,
  handlers: StreamHandlers,
) {
  const response = await fetch(`${API_BASE_URL}/chat/messages/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      conversation_id: conversationId,
      content,
      response_mode: "text",
    }),
    cache: "no-store",
  });

  if (!response.ok || !response.body) {
    const payload = await response.json().catch(() => null);
    const code = payload?.code || response.status;

    if (response.status === 401 || code === 40101 || code === 40102 || code === 40103) {
      notifySessionExpired();
    }

    throw new ApiRequestError(
      payload?.message || "Stream request failed",
      response.status,
      code,
    );
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  let streamError: string | null = null;

  while (true) {
    const { done, value } = await reader.read();
    buffer += decoder.decode(value || new Uint8Array(), { stream: !done });

    const blocks = buffer.split("\n\n");
    buffer = blocks.pop() || "";

    for (const block of blocks) {
      if (!block.trim()) {
        continue;
      }

      const parsed = parseSseBlock(block);
      const data = parsed.data ? JSON.parse(parsed.data) : {};

      if (parsed.event === "start") {
        handlers.onStart?.(data as StreamStartPayload);
        continue;
      }

      if (parsed.event === "delta") {
        handlers.onDelta(data as StreamDeltaPayload);
        continue;
      }

      if (parsed.event === "end") {
        handlers.onEnd(data as StreamEndPayload);
        continue;
      }

      if (parsed.event === "error") {
        streamError = (data as StreamErrorPayload).message || "Stream failed";
        handlers.onError?.(data as StreamErrorPayload);
      }
    }

    if (done) {
      break;
    }
  }

  if (streamError) {
    throw new ApiRequestError(streamError, 500, 500);
  }
}
