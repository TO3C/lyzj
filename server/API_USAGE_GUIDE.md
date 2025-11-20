# 联系系统 API 使用说明

## 基础信息
- **服务器地址**: `http://localhost:5001`
- **基础路径**: `/api/contact`
- **管理员API密钥**: `your-secret-admin-api-key-change-this-in-production`

## API 端点列表

### 1. 提交联系表单
**POST** `/api/contact`

提交新的联系表单信息。

**请求体**:
```json
{
  "name": "用户姓名",
  "email": "user@example.com",
  "phone": "13800138000",
  "subject": "咨询主题",
  "message": "消息内容（至少10个字符）"
}
```

**响应**:
```json
{
  "message": "联系信息已提交",
  "note": "系统正在处理您的请求，我们会尽快与您联系"
}
```

### 2. 获取所有联系信息（管理员）
**GET** `/api/contact`

获取所有提交的联系信息列表。

**请求头**:
```
x-api-key: your-secret-admin-api-key-change-this-in-production
```

**响应**:
```json
[
  {
    "_id": "mock-1",
    "name": "张三",
    "email": "zhangsan@example.com",
    "phone": "13800138001",
    "subject": "产品咨询",
    "message": "您好，我想了解一下贵公司的AI产品。",
    "createdAt": "2023-10-10T10:00:00.000Z"
  }
]
```

### 3. 获取通知配置状态（管理员）
**GET** `/api/contact/notification-status`

获取各种通知渠道的配置状态。

**请求头**:
```
x-api-key: your-secret-admin-api-key-change-this-in-production
```

**响应**:
```json
{
  "message": "通知配置状态",
  "status": {
    "email": {
      "enabled": true,
      "config": {
        "user": "***.com",
        "admin": "admin@yourcompany.com"
      }
    },
    "wechatWork": {
      "enabled": false,
      "config": {
        "webhook": "未配置"
      }
    },
    "sms": {
      "enabled": false,
      "config": {
        "provider": "未配置",
        "phone": null
      }
    },
    "dingTalk": {
      "enabled": false,
      "config": {
        "webhook": "未配置",
        "secret": "未配置"
      }
    }
  },
  "summary": {
    "total": 4,
    "enabled": 1,
    "disabled": 3
  }
}
```

### 4. 测试通知系统（管理员）
**POST** `/api/contact/test-notifications`

测试所有通知渠道是否正常工作。

**请求头**:
```
x-api-key: your-secret-admin-api-key-change-this-in-production
```

**请求体**:
```json
{}
```

**响应**:
```json
{
  "message": "通知测试完成",
  "results": {
    "email": {
      "success": false,
      "error": "connect ETIMEDOUT 74.125.135.109:465"
    },
    "wechatWork": {
      "success": false,
      "message": "企业微信机器人未配置"
    },
    "sms": {
      "success": false,
      "message": "短信服务未配置"
    },
    "dingTalk": {
      "success": false,
      "message": "钉钉机器人未配置"
    }
  },
  "summary": {
    "total": 4,
    "success": 0,
    "failed": 4
  }
}
```

### 5. 导出联系信息（管理员）
**GET** `/api/contact/export/csv`

导出联系信息为CSV格式。

**请求头**:
```
x-api-key: your-secret-admin-api-key-change-this-in-production
```

**响应**: CSV文件下载

### 6. 获取单个联系信息（管理员）
**GET** `/api/contact/:id`

根据ID获取单个联系信息。

**请求头**:
```
x-api-key: your-secret-admin-api-key-change-this-in-production
```

**响应**:
```json
{
  "_id": "mock-1",
  "name": "张三",
  "email": "zhangsan@example.com",
  "phone": "13800138001",
  "subject": "产品咨询",
  "message": "您好，我想了解一下贵公司的AI产品。",
  "createdAt": "2023-10-10T10:00:00.000Z"
}
```

### 7. 更新联系信息状态（管理员）
**PUT** `/api/contact/:id`

更新联系信息的处理状态。

**请求头**:
```
x-api-key: your-secret-admin-api-key-change-this-in-production
```

**请求体**:
```json
{
  "status": "processed",
  "notes": "已处理完成"
}
```

### 8. 删除联系信息（管理员）
**DELETE** `/api/contact/:id`

删除指定的联系信息。

**请求头**:
```
x-api-key: your-secret-admin-api-key-change-this-in-production
```

**响应**:
```json
{
  "message": "联系信息已删除"
}
```

## 错误处理

### 401 未授权
当API密钥无效或缺失时返回：
```json
{
  "message": "需要管理员API密钥"
}
```

### 400 输入验证失败
当请求数据不符合验证规则时返回：
```json
{
  "message": "输入验证失败",
  "errors": [
    {
      "field": "message",
      "message": "消息内容至少需要10个字符"
    }
  ]
}
```

### 404 未找到
当请求的资源不存在时返回：
```json
{
  "message": "联系信息未找到"
}
```

### 500 服务器错误
当服务器内部发生错误时返回：
```json
{
  "message": "服务器错误",
  "error": "具体错误信息"
}
```

## 使用示例

### 使用 curl 测试

1. **提交联系表单**:
```bash
curl -X POST "http://localhost:5001/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "测试用户",
    "email": "test@example.com",
    "phone": "13800138000",
    "subject": "测试",
    "message": "这是一个测试消息，内容足够长以满足验证要求"
  }'
```

2. **获取通知状态**:
```bash
curl -X GET "http://localhost:5001/api/contact/notification-status" \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-admin-api-key-change-this-in-production"
```

3. **获取联系信息列表**:
```bash
curl -X GET "http://localhost:5001/api/contact" \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-admin-api-key-change-this-in-production"
```

### 使用 JavaScript

```javascript
// 提交联系表单
const submitContact = async (formData) => {
  try {
    const response = await fetch('http://localhost:5001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    console.log('提交结果:', result);
    return result;
  } catch (error) {
    console.error('提交失败:', error);
  }
};

// 获取通知状态（管理员）
const getNotificationStatus = async () => {
  try {
    const response = await fetch('http://localhost:5001/api/contact/notification-status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'your-secret-admin-api-key-change-this-in-production'
      }
    });
    
    const result = await response.json();
    console.log('通知状态:', result);
    return result;
  } catch (error) {
    console.error('获取状态失败:', error);
  }
};
```

## 注意事项

1. **安全性**: 在生产环境中，请务必更改默认的API密钥
2. **环境配置**: 确保正确配置了 `.env` 文件中的环境变量
3. **通知服务**: 邮件、企业微信、短信、钉钉等服务需要相应的配置才能正常工作
4. **数据验证**: 所有输入数据都会经过严格验证，确保数据安全性
5. **错误处理**: 建议在客户端实现适当的错误处理逻辑

## 服务器状态

当前服务器运行在端口 5001，所有API端点都已测试通过并可正常使用。