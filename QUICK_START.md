# 流云科技 - 手机通知配置示例

## 快速开始

### 1. 复制环境变量配置
```bash
cp server/.env.example server/.env
```

### 2. 编辑配置文件
编辑 `server/.env` 文件，填写你的通知配置：

#### 邮件通知（必需）
```env
# 邮件配置
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
ADMIN_EMAIL=your-admin-email@gmail.com
```

#### 企业微信机器人（推荐）
```env
# 企业微信机器人
WECHAT_WORK_WEBHOOK=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=YOUR_WEBHOOK_KEY
WECHAT_WORK_ENABLED=true
```

#### 钉钉机器人（推荐）
```env
# 钉钉机器人
DINGTALK_WEBHOOK=https://oapi.dingtalk.com/robot/send?access_token=YOUR_TOKEN
DINGTALK_SECRET=YOUR_SECRET
DINGTALK_ENABLED=true
```

#### 短信通知（可选）
```env
# 阿里云短信
SMS_ACCESS_KEY_ID=your-access-key
SMS_ACCESS_KEY_SECRET=your-secret-key
SMS_SIGN_NAME=流云科技
SMS_TEMPLATE_CODE=SMS_123456789
SMS_PHONE=13800138000

# 或腾讯云短信
TENCENT_SMS_SECRET_ID=your-secret-id
TENCENT_SMS_SECRET_KEY=your-secret-key
TENCENT_SMS_APP_ID=123456789
TENCENT_SMS_SIGN_NAME=流云科技
TENCENT_SMS_TEMPLATE_ID=123456
TENCENT_SMS_PHONE=13800138000
```

### 3. 重启服务器
```bash
cd server
node server.js
```

### 4. 测试通知功能
访问 `http://localhost:5001/api/contact/test-notifications` 测试所有通知渠道

## 推荐配置组合

### 方案一：企业微信 + 邮件（最推荐）
- 企业微信：实时推送，手机端即时提醒
- 邮件：详细记录，便于归档

### 方案二：钉钉 + 邮件
- 钉钉：实时推送，功能丰富
- 邮件：备份记录

### 方案三：短信 + 邮件
- 短信：最可靠，确保不遗漏
- 邮件：详细信息

## 安全提醒
- 不要将 `.env` 文件提交到版本控制
- 定期更换密钥和密码
- 使用应用专用密码而非邮箱密码