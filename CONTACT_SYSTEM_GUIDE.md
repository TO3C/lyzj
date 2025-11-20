# 客户联系信息管理系统使用说明

## 功能概述

本系统为网站添加了完整的客户联系信息管理功能，包括：

1. **前端联系表单** - 网站底部的客户联系表单
2. **后端管理界面** - 管理员查看和处理联系信息的后台
3. **邮件通知系统** - 自动发送通知给管理员和客户

## 访问地址

- **前端网站**: http://localhost:5173
- **管理后台**: http://localhost:5173/admin
- **后端API**: http://localhost:5001

## 使用方法

### 客户联系表单
1. 访问网站首页 http://localhost:5173
2. 滚动到页面底部找到联系表单
3. 填写必要信息（姓名、邮箱、留言）并提交
4. 系统会自动发送确认邮件给客户

### 管理员后台
1. 访问 http://localhost:5173/admin
2. 使用以下凭据登录：
   - 用户名: `admin`
   - 密码: `admin123`
3. 登录后可以查看所有客户联系信息
4. 支持查看详情、删除联系信息等操作

## 配置说明

### 邮件服务配置
编辑 `server/.env` 文件，配置邮件服务：

```env
# 邮件服务配置
EMAIL_USER=your-email@gmail.com        # 发件人邮箱
EMAIL_PASS=your-app-specific-password   # 邮箱授权码
ADMIN_EMAIL=admin@yourcompany.com       # 管理员接收邮箱
```

**注意**: 
- Gmail需要开启两步验证并生成应用专用密码
- QQ邮箱需要开启SMTP服务并生成授权码
- 其他邮箱服务请参考相应文档

### 数据库配置
系统支持MongoDB数据库和本地文件备份：

```env
MONGO_URI=mongodb://localhost:27017/contact-management
```

如果MongoDB不可用，系统会自动使用本地文件存储数据。

## API接口

### 提交联系表单
```
POST /api/contact
Content-Type: application/json

{
  "name": "客户姓名",
  "email": "customer@example.com",
  "phone": "13800138000",
  "subject": "咨询主题",
  "message": "留言内容"
}
```

### 管理员登录
```
POST /api/contact/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

### 获取联系信息列表
```
GET /api/contact
Headers: {
  "X-API-Key": "your-api-key",
  "Authorization": "Bearer your-token"
}
```

## 安全特性

1. **API密钥验证** - 所有管理接口需要API密钥
2. **JWT令牌认证** - 管理员登录使用JWT令牌
3. **数据备份** - 本地文件备份确保数据不丢失
4. **输入验证** - 前后端双重数据验证

## 故障排除

### 邮件发送失败
1. 检查邮箱配置是否正确
2. 确认邮箱授权码有效
3. 检查网络连接

### 数据库连接失败
1. 确认MongoDB服务已启动
2. 检查连接字符串是否正确
3. 系统会自动降级到文件存储

### 管理后台无法访问
1. 确认后端服务器运行在5001端口
2. 检查前端开发服务器运行状态
3. 清除浏览器缓存重试

## 文件结构

```
流云/
├── src/
│   ├── components/
│   │   ├── ContactForm.jsx        # 联系表单组件
│   │   ├── ContactForm.css        # 联系表单样式
│   │   ├── AdminDashboard.jsx     # 管理后台组件
│   │   └── AdminDashboard.css     # 管理后台样式
│   ├── pages/
│   │   ├── Home.jsx               # 首页（包含联系表单）
│   │   └── Home.css               # 首页样式
│   └── App.jsx                    # 应用路由配置
├── server/
│   ├── routes/
│   │   └── contact.js             # 联系信息API路由
│   ├── services/
│   │   └── emailService.js        # 邮件服务
│   ├── models/
│   │   └── Contact.js             # 数据模型
│   ├── .env                       # 环境配置
│   └── server.js                  # 服务器入口
└── package.json                   # 项目依赖
```

## 技术栈

- **前端**: React 18, React Router, CSS3
- **后端**: Node.js, Express.js
- **数据库**: MongoDB + 本地文件备份
- **认证**: JWT + API密钥
- **邮件**: Nodemailer
- **开发工具**: Vite, Nodemon

系统已完全集成并可正常使用！