-- 为 chapters 表补充 PDF 渲染字段
-- 适用：MySQL 8+

ALTER TABLE chapters
MODIFY COLUMN content LONGTEXT NULL COMMENT '章节文本内容，供 AI 问答、搜索和兜底展示',
MODIFY COLUMN content_format VARCHAR(16) NOT NULL DEFAULT 'text' COMMENT 'text/markdown/html',
ADD COLUMN render_type VARCHAR(16) NOT NULL DEFAULT 'pdf' COMMENT '前端渲染方式：pdf/text/html' AFTER content_format,
ADD COLUMN pdf_url VARCHAR(512) NULL COMMENT '章节对应 PDF 文件 URL 或静态路径' AFTER render_type,
ADD COLUMN source_file_name VARCHAR(255) NULL COMMENT '源文件名，便于追溯和排查' AFTER pdf_url;
