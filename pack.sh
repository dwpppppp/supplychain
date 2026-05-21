#!/bin/bash

echo "===== Awesome Digital Human 项目打包脚本 ====="
echo ""

# 设置项目名称
PROJECT_NAME="supplychain-claude"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 检查是否在项目根目录
if [ ! -d "$SCRIPT_DIR/backend" ] || [ ! -d "$SCRIPT_DIR/frontend" ]; then
    echo "错误: 请在项目根目录运行此脚本"
    exit 1
fi

echo "1. 清理开发环境文件..."
# 清理前端
rm -rf frontend/web/node_modules
rm -rf frontend/web/.next

# 清理后端
rm -rf backend/venv
find backend -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null
find backend -type d -name "*.egg-info" -exec rm -rf {} + 2>/dev/null

# 清理其他
rm -rf .git
rm -rf .idea
rm -rf .cursor
rm -rf .claude

# 清理日志文件但保留目录
rm -f backend/logs/* 2>/dev/null
rm -f backend/outputs/* 2>/dev/null

echo "2. 检查必要文件..."
if [ ! -f "auxiliary/env.production.template" ]; then
    echo "警告: 未找到 auxiliary/env.production.template 文件"
fi

if [ ! -f "frontend/web/env.production.template" ]; then
    echo "警告: 未找到 frontend/web/env.production.template 文件"
fi

if [ ! -f "auxiliary/deploy.sh" ]; then
    echo "警告: 未找到 auxiliary/deploy.sh 文件"
fi

echo "3. 创建压缩包..."
cd ..
PARENT_DIR=$(pwd)
tar -czf "${PARENT_DIR}/${PROJECT_NAME}.tar.gz" \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='__pycache__' \
    --exclude='*.pyc' \
    --exclude='.idea' \
    --exclude='.cursor' \
    --exclude='.claude' \
    --exclude='venv' \
    --exclude='*.egg-info' \
    "${PROJECT_NAME}"

if [ -f "${PARENT_DIR}/${PROJECT_NAME}.tar.gz" ]; then
    echo "✓ 压缩包创建成功: ${PROJECT_NAME}.tar.gz"
    echo "文件位置: ${PARENT_DIR}/${PROJECT_NAME}.tar.gz"
    echo "文件大小: $(du -h "${PARENT_DIR}/${PROJECT_NAME}.tar.gz" | cut -f1)"
else
    echo "✗ 压缩包创建失败"
    exit 1
fi

echo ""
echo "===== 打包完成 ====="
echo ""
echo "📦 压缩包信息:"
echo "   文件名: ${PROJECT_NAME}.tar.gz"
echo "   位置: ${PARENT_DIR}/${PROJECT_NAME}.tar.gz"
echo ""
echo "📋 接下来的步骤:"
echo "   1. 将压缩包上传到宝塔面板的 /www/wwwroot/ 目录"
echo "   2. 解压: tar -xzf ${PROJECT_NAME}.tar.gz"
echo "   3. 运行部署脚本: cd ${PROJECT_NAME} && chmod +x auxiliary/deploy.sh && ./auxiliary/deploy.sh"
echo "   4. 按照部署指南完成配置"
echo ""
echo "📖 详细部署指南请查看: auxiliary/宝塔面板压缩包部署指南.md"
echo ""
