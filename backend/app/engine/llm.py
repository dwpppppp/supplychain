from collections.abc import AsyncIterator
from typing import Optional

from openai import AsyncOpenAI

from app.core.config import settings


def _get_client() -> AsyncOpenAI:
    return AsyncOpenAI(
        api_key=settings.DASHSCOPE_API_KEY,
        base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
    )


SYSTEM_PROMPT = """你是供应链寻源课程的 AI 助教，专注于供应链管理和采购寻源领域。
你的职责：
1. 解答学员关于供应链寻源的问题
2. 结合课程教材内容给出准确回答
3. 引导学员深入理解寻源策略、供应商评估、谈判技巧等核心知识
4. 回答简洁专业，控制在 300 字以内

回答风格：
- 先直接回答问题，再举例说明
- 使用课程中的专业术语
- 如涉及课程外内容，明确说明超出课程范围"""


def build_full_messages(
    messages: list[dict],
    rag_context: Optional[str] = None,
    system_prompt: Optional[str] = None,
) -> list[dict]:
    sys_content = system_prompt or SYSTEM_PROMPT
    if rag_context:
        sys_content += f"\n\n【教材参考内容】\n{rag_context}"
    return [{"role": "system", "content": sys_content}] + messages


async def chat_completion(
    messages: list[dict],
    rag_context: Optional[str] = None,
    system_prompt: Optional[str] = None,
) -> tuple[str, int]:
    client = _get_client()
    full_messages = build_full_messages(messages, rag_context, system_prompt)

    response = await client.chat.completions.create(
        model=settings.LLM_MODEL,
        messages=full_messages,
        max_tokens=1024,
        temperature=0.7,
    )

    reply = response.choices[0].message.content or ""
    tokens = response.usage.total_tokens if response.usage else 0
    return reply, tokens


async def chat_completion_stream(
    messages: list[dict],
    rag_context: Optional[str] = None,
    system_prompt: Optional[str] = None,
) -> AsyncIterator[str]:
    client = _get_client()
    full_messages = build_full_messages(messages, rag_context, system_prompt)

    stream = await client.chat.completions.create(
        model=settings.LLM_MODEL,
        messages=full_messages,
        max_tokens=1024,
        temperature=0.7,
        stream=True,
    )

    async for chunk in stream:
        if not chunk.choices:
            continue
        delta = chunk.choices[0].delta.content or ""
        if delta:
            yield delta
