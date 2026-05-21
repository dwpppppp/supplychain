import { request } from "../../../lib/api/http";

export type CourseChapter = {
  id: number;
  title: string;
  level: number;
  sort_order: number;
  children?: CourseChapter[];
};

export type CourseVideo = {
  id: number;
  title: string;
  oss_url: string;
  cover_url: string | null;
  duration_seconds: number | null;
};

export type ChapterDetail = {
  id: number;
  title: string;
  level: number;
  content: string | null;
  content_format: string;
  render_type: string;
  pdf_url: string | null;
  source_file_name: string | null;
  word_count: number;
  prev_chapter_id: number | null;
  next_chapter_id: number | null;
  videos: CourseVideo[];
};

export type AskChapterResult = {
  conversation_id: string;
  message_id: string;
  answer: string;
  related_chapters: {
    chapter_id: number;
    title: string;
  }[];
};

export type NoteResult = {
  id: number;
  selected_text: string;
  note_content: string | null;
  highlight_color: string;
};

export function fetchCourseChapters() {
  return request<CourseChapter[]>("/course/chapters");
}

export function fetchChapterDetail(token: string, chapterId: number) {
  return request<ChapterDetail>(`/course/chapters/${chapterId}`, {
    token,
  });
}

export function askChapterQuestion(
  token: string,
  chapterId: number,
  payload: {
    selected_text: string;
    context_before?: string;
    context_after?: string;
    conversation_id?: string;
  },
) {
  return request<AskChapterResult>(`/course/chapters/${chapterId}/ask`, {
    method: "POST",
    token,
    body: payload,
  });
}

export function saveChapterNote(
  token: string,
  chapterId: number,
  payload: {
    selected_text: string;
    note_content?: string;
    position_start?: number;
    position_end?: number;
    highlight_color?: string;
  },
) {
  return request<NoteResult>(`/course/chapters/${chapterId}/notes`, {
    method: "POST",
    token,
    body: payload,
  });
}

export function updateChapterProgress(
  token: string,
  chapterId: number,
  progressPercent: number,
  lastReadPosition = 0,
) {
  return request<void>(`/course/chapters/${chapterId}/progress`, {
    method: "PUT",
    token,
    body: {
      progress_percent: progressPercent,
      last_read_position: lastReadPosition,
    },
  });
}
