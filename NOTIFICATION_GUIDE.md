# 手机实时通知配置指南

## 概述

您的联系表单系统现在支持多种实时通知方式，确保您能够第一时间在手机上收到客户的联系信息。

## 支持的通知方式

### 1. 📧 邮件通知（已配置）
- **优点**：稳定可靠，信息详细
- **缺点**：可能不是最即时的
- **配置**：已基本配置完成

### 2. 💬 企业微信机器人（推荐）
- **优点**：实时推送，手机端即时提醒，免费
- **缺点**：需要企业微信账号
- **推荐指数**：⭐⭐⭐⭐⭐

### 3. 📱 短信通知
- **优点**：最直接，覆盖面广
- **缺点**：需要费用，每条短信约0.045元
- **推荐指数**：⭐⭐⭐⭐

### 4. 🔔 钉钉机器人
- **优点**：实时推送，免费
- **缺点**：需要钉钉账号
- **推荐指数**：⭐⭐⭐⭐

## 快速配置步骤

### 方案1：企业微信机器人（推荐）

1. **创建企业微信群**
   - 在企业微信中创建一个群聊（可以只有自己）
   - 在群设置中添加"机器人"

2. **获取Webhook地址**
   - 机器人创建后会生成一个Webhook地址
   - 格式类似：`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxxxxxx`

3. **配置环境变量**
   ```bash
   # 在 server 目录下创建 .env 文件
   WECHAT_WORK_WEBHOOK_URL=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=your-webhook-key
   ```

4. **测试通知**
   ```bash
   curl -X POST http://localhost:5001/api/contact/test-notifications \
        -H "X-API-Key: your_admin_api_key" \
        -H "Content-Type: application/json"
   ```

### 方案2：短信通知（阿里云）

1. **开通阿里云短信服务**
   - 登录阿里云控制台
   - 开通短信服务
   - 创建签名和模板

2. **获取AccessKey**
   ```bash
   ALIYUN_ACCESS_KEY_ID=your_access_key_id
   ALIYUN_ACCESS_KEY_SECRET=your_access_key_secret
   ALIYUN_SMS_SIGN_NAME=流云智炬科技
   ALIYUN_SMS_TEMPLATE_CODE=SMS_123456789
   ADMIN_PHONE=13800138000  # 您的手机号
   ```

3. **短信模板示例**
   ```
   尊敬的用户，${name}(${phone})在${time}提交了联系请求，请及时处理。
   ```

### 方案3：钉钉机器人

1. **创建钉钉群**
   - 在钉钉中创建群聊
   - 添加"自定义机器人"

2. **获取Webhook和密钥**
   ```bash
   DINGTALK_WEBHOOK_URL=https://oapi.dingtalk.com/robot/send?access_token=your-token
   DINGTALK_SECRET=your_secret
   ```

## 系统特性

### 🚀 实时性
- 客户提交表单后，所有通知渠道会**同时发送**
- 企业微信和钉钉通知通常在1-3秒内到达手机
- 短信通知在5-10秒内到达

### 🛡️ 可靠性
- **多重备份**：即使某个渠道失败，其他渠道仍会正常发送
- **本地存储**：所有提交都会保存在本地文件中
- **数据库备份**：MongoDB中的数据持久化存储

### 📊 监控和管理
- 实时查看通知发送状态
- 支持测试各个通知渠道
- 详细的错误日志记录

## 管理API

### 查看通知配置状态
```bash
curl -X GET http://localhost:5001/api/contact/notification-status \
     -H "X-API-Key: your_admin_api_key"
```

### 测试所有通知渠道
```bash
curl -X POST http://localhost:5001/api/contact/test-notifications \
     -H "X-API-Key: your_admin_api_key" \
     -H "Content-Type: application/json"
```

## 推荐配置组合

### 🔥 最佳实践组合
1. **企业微信**（主要通知渠道）
2. **邮件**（详细记录）
3. **短信**（重要客户备用）

### 💰 经济型组合
1. **企业微信**（免费且实时）
2. **邮件**（已有配置）

### 🏢 企业级组合
1. **企业微信**（内部通知）
2. **钉钉**（备用通知）
3. **短信**（紧急情况）
4. **邮件**（正式记录）

## 故障排除

### 常见问题

1. **企业微信通知失败**
   - 检查Webhook地址是否正确
   - 确认机器人是否被禁用
   - 验证消息格式是否符合要求

2. **短信发送失败**
   - 检查阿里云账户余额
   - 确认签名和模板是否审核通过
   - 验证手机号格式是否正确

3. **邮件发送失败**
   - 检查Gmail应用专用密码
   - 确认SMTP设置是否正确
   - 验证邮箱地址是否有效

### 日志查看
```bash
# 查看服务器日志
tail -f server.log

# 查看通知发送结果
grep "通知发送完成" server.log
```

## 安全建议

1. **保护API密钥**
   - 不要在前端代码中暴露API密钥
   - 定期更换管理员密码和API密钥

2. **环境变量安全**
   - 将 `.env` 文件添加到 `.gitignore`
   - 不要在代码中硬编码敏感信息

3. **通知频率控制**
   - 系统已内置防重复通知机制
   - 可以根据需要添加频率限制

## 后续优化建议

1. **添加通知模板自定义**
2. **支持更多通知渠道（如飞书、Slack等）**
3. **添加通知统计和分析功能**
4. **支持根据客户重要性选择不同通知策略**

---

**需要帮助？** 如果在配置过程中遇到问题，请查看服务器日志或联系技术支持。