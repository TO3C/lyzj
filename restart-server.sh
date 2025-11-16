#!/bin/bash

# 流云网站服务重启脚本
# 解决服务不可用问题的完整方案

echo "🔄 开始重启流云网站服务..."

# 1. 停止所有相关进程
echo "🛑 停止现有服务进程..."
pkill -f "vite" 2>/dev/null || true
pkill -f "node.*5173" 2>/dev/null || true
lsof -ti:5173 | xargs kill -9 2>/dev/null || true

# 2. 清理缓存和临时文件
echo "🧹 清理缓存..."
rm -rf node_modules/.vite 2>/dev/null || true
rm -rf dist 2>/dev/null || true

# 3. 重新安装依赖（如果需要）
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.package-lock.json" ]; then
    echo "📦 重新安装依赖..."
    npm install
fi

# 4. 启动开发服务器
echo "🚀 启动开发服务器..."
npm run dev

echo "✅ 服务重启完成！"
echo "🌐 请访问: http://localhost:5173/"