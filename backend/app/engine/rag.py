"""
阿里云百炼知识库 RAG 检索封装。
"""
from typing import Optional

from app.core.config import settings

try:
    from alibabacloud_bailian20231229 import models as bailian_models
    from alibabacloud_bailian20231229.client import Client as BailianClient
    from alibabacloud_tea_openapi import models as open_api_models

    _BAILIAN_AVAILABLE = True
except ImportError:
    _BAILIAN_AVAILABLE = False


def _get_client():
    if not _BAILIAN_AVAILABLE:
        return None
    config = open_api_models.Config(
        access_key_id=settings.OSS_ACCESS_KEY_ID,
        access_key_secret=settings.OSS_ACCESS_KEY_SECRET,
    )
    config.endpoint = "bailian.cn-beijing.aliyuncs.com"
    return BailianClient(config)


async def retrieve_knowledge(query: str, top_k: int = 5) -> Optional[str]:
    """
    Retrieve relevant passages from Bailian knowledge base.
    Returns formatted context string, or None if unavailable.
    """
    if not _BAILIAN_AVAILABLE or not settings.BAILIAN_INDEX_ID:
        return None

    try:
        client = _get_client()
        request = bailian_models.RetrieveRequest(
            index_id=settings.BAILIAN_INDEX_ID,
            query=query,
            dense_similarity_top_k=top_k,
        )
        response = client.retrieve(settings.BAILIAN_WORKSPACE_ID, request)
        if not response.body or not response.body.data:
            return None

        passages = response.body.data.nodes or []
        if not passages:
            return None

        context_parts = []
        for i, node in enumerate(passages[:top_k], 1):
            content = getattr(node, "text", "") or getattr(node, "content", "") or ""
            if content.strip():
                context_parts.append(f"[段落{i}]\n{content.strip()}")

        return "\n\n".join(context_parts) if context_parts else None
    except Exception as e:
        import logging

        logging.getLogger(__name__).error(f"RAG failed: {e}")
        return None
