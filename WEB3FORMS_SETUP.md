# Web3Forms配置指南

## 🚀 快速开始

### 1. 注册Web3Forms账户
1. 访问 https://web3forms.com/
2. 点击"Get Started"注册免费账户
3. 验证邮箱地址

### 2. 创建表单
1. 登录后进入Dashboard
2. 点击"Create New Form"
3. 设置表单名称：流云智炬科技联系表单
4. 设置接收邮箱：296077990@qq.com
5. 复制生成的Access Key

### 3. 配置项目

#### 方法A：使用环境变量（推荐）
1. 复制 `.env.example` 为 `.env`
2. 编辑 `.env` 文件：
   ```env
   VITE_WEB3FORMS_ACCESS_KEY=你的实际Access_Key
   ```

#### 方法B：直接修改代码
1. 编辑 `src/components/ContactForm.jsx`
2. 找到第41行，替换为实际的Access Key：
   ```javascript
   access_key: '你的实际Access_Key',
   ```

### 4. 测试功能
1. 启动开发服务器：`npm run dev`
2. 访问 http://localhost:5173
3. 填写联系表单并提交
4. 检查邮箱是否收到提交信息

## 📋 Web3Forms特性

### ✅ 优势
- **免费使用**：每月1000次提交
- **无需服务器**：纯前端解决方案
- **即时通知**：邮件实时接收
- **反垃圾邮件**：内置验证机制
- **自定义字段**：支持各种表单字段

### 🔧 配置选项
- **接收邮箱**：设置目标邮箱地址
- **重定向URL**：提交后跳转页面
- **自定义回复**：自动回复给用户
- **Webhook**：集成其他服务

### 📊 监控
- Dashboard查看提交统计
- 实时监控表单状态
- 导出提交数据

## 🛠️ 故障排除

### 常见问题

#### 1. 提交失败
- 检查Access Key是否正确
- 确认网络连接正常
- 查看浏览器控制台错误信息

#### 2. 未收到邮件
- 检查垃圾邮件文件夹
- 确认接收邮箱设置正确
- 验证Web3Forms Dashboard中的提交记录

#### 3. 环境变量不生效
- 确认文件名为 `.env`（不是 `.env.example`）
- 重启开发服务器
- 检查Vite是否正确加载环境变量

### 调试模式
在浏览器开发者工具中查看：
```javascript
// 检查环境变量
console.log('API Key:', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
```

## 🔐 安全建议

1. **保护API密钥**：
   - 不要将Access Key提交到Git仓库
   - 使用环境变量存储敏感信息
   - 定期更换Access Key

2. **数据验证**：
   - 前端验证用户输入
   - 依赖Web3Forms的服务器端验证
   - 设置合理的字段限制

## 📞 技术支持

- Web3Forms文档：https://web3forms.com/docs
- 项目问题：联系开发团队
- 邮箱支持：296077990@qq.com

---

**注意**：当前配置包含备用邮件方案，即使Web3Forms服务不可用，用户仍可通过邮件联系。