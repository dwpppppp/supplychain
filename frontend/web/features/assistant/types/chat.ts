export type AssistantScene = "assistant" | "ask_ai" | "negotiate";

export type AssistantPresence =
  | "offline"
  | "idle"
  | "thinking"
  | "speaking"
  | "error";

export type AssistantResponseMode = "text" | "voice";

export type AssistantConversation = {
  id: string;
  scene: AssistantScene;
  created_at: string;
  updated_at: string;
};

export type AssistantMessage = {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  audio_url: string | null;
  duration_ms: number | null;
  created_at: string;
};
