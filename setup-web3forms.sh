#!/bin/bash

# Web3Forms快速配置脚本
# 使用方法: ./setup-web3forms.sh YOUR_ACCESS_KEY

if [ -z "$1" ]; then
    echo "❌ 错误：请提供Web3Forms Access Key"
    echo "使用方法: ./setup-web3forms.sh YOUR_ACCESS_KEY"
    echo ""
    echo "获取Access Key步骤："
    echo "1. 访问 https://web3forms.com/"
    echo "2. 注册并登录账户"
    echo "3. 创建新表单"
    echo "4. 复制生成的Access Key"
    exit 1
fi

ACCESS_KEY="$1"
ENV_FILE=".env"

# 检查是否已存在.env文件
if [ -f "$ENV_FILE" ]; then
    echo "⚠️  发现已存在的.env文件"
    read -p "是否要覆盖现有的Web3Forms配置？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ 操作已取消"
        exit 1
    fi
fi

# 创建或更新.env文件
echo "🔧 配置Web3Forms..."

# 检查.env文件是否存在Web3Forms配置
if grep -q "VITE_WEB3FORMS_ACCESS_KEY" "$ENV_FILE" 2>/dev/null; then
    # 更新现有的配置
    sed -i '' "s/VITE_WEB3FORMS_ACCESS_KEY=.*/VITE_WEB3FORMS_ACCESS_KEY=$ACCESS_KEY/" "$ENV_FILE"
    echo "✅ 已更新现有的Web3Forms配置"
else
    # 添加新的配置
    if [ -f "$ENV_FILE" ]; then
        echo "VITE_WEB3FORMS_ACCESS_KEY=$ACCESS_KEY" >> "$ENV_FILE"
    else
        echo "# Web3Forms配置" > "$ENV_FILE"
        echo "VITE_WEB3FORMS_ACCESS_KEY=$ACCESS_KEY" >> "$ENV_FILE"
        echo "" >> "$ENV_FILE"
        echo "# 邮件配置" >> "$ENV_FILE"
        echo "VITE_CONTACT_EMAIL=296077990@qq.com" >> "$ENV_FILE"
    fi
    echo "✅ 已添加Web3Forms配置到.env文件"
fi

# 验证配置
echo ""
echo "🔍 验证配置..."
if grep -q "VITE_WEB3FORMS_ACCESS_KEY=$ACCESS_KEY" "$ENV_FILE"; then
    echo "✅ 配置验证成功"
else
    echo "❌ 配置验证失败"
    exit 1
fi

echo ""
echo "🎉 Web3Forms配置完成！"
echo ""
echo "下一步："
echo "1. 重启开发服务器: npm run dev"
echo "2. 访问网站测试表单: http://localhost:5173"
echo "3. 检查邮箱: 296077990@qq.com"
echo ""
echo "📚 详细文档: WEB3FORMS_SETUP.md"