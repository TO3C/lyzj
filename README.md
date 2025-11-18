# 流云科技网站 - 使用指南

这个项目是流云科技的企业网站，包含前端展示和后端管理功能。

## 功能概述

1. **前端网站**：展示公司信息、服务、案例和联系方式
2. **后端API**：接收和处理客户提交的咨询表单
3. **数据库存储**：使用MongoDB存储客户咨询信息
4. **管理员界面**：查看和管理客户提交的咨询信息

## 环境要求

- Node.js >= 14.x
- MongoDB（本地安装或使用云数据库）

## 安装依赖

```bash
# 安装所有依赖
npm install
```

## 环境变量配置

在项目根目录创建`.env`文件，内容如下：

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/liuyun-tech
JWT_SECRET=your_jwt_secret_key
```

**注意**：`JWT_SECRET`应设置为一个安全的随机字符串，用于加密JWT令牌。

## 创建管理员用户

在启动后端服务之前，需要先创建一个管理员用户：

```bash
# 运行初始化脚本创建管理员用户
node server/init-admin.js
```

执行成功后，会创建一个默认的管理员用户：
- 用户名：admin
- 密码：admin123（**请注意首次登录后修改此密码**）

## 启动服务

### 启动前端开发服务器

```bash
# 启动Vite开发服务器
npm run dev
```

前端服务器将运行在 `http://localhost:5173/`

### 启动后端API服务器

在另一个终端窗口运行：

```bash
# 启动后端服务器（生产环境）
npm run server

# 或使用nodemon自动重启服务器（开发环境）
npm run dev-server
```

后端API服务器将运行在 `http://localhost:5001/`

## 访问管理员界面

1. 确保后端服务器正在运行
2. 打开浏览器，访问 `http://localhost:5173/admin`
3. 使用创建的管理员账号登录

## API端点说明

### 联系表单相关

- **POST /api/contact** - 提交联系表单（公开访问）
- **GET /api/contact** - 获取所有联系信息（需要管理员权限）
- **GET /api/contact/:id** - 获取单个联系信息（需要管理员权限）
- **DELETE /api/contact/:id** - 删除联系信息（需要管理员权限）

### 用户认证相关

- **POST /api/users/login** - 管理员登录
- **GET /api/users/me** - 获取当前登录用户信息（需要认证）

## GitHub Pages 部署

本项目已配置 GitHub Actions 自动部署到 GitHub Pages：

- **仓库地址**：https://github.com/TO3C/lyzj
- **部署地址**：https://TO3C.github.io/lyzj/
- **自动部署**：推送到 main 分支后自动触发部署

### 更新网站内容

```bash
# 修改文件后
git add .
git commit -m "更新内容描述"
git push origin main
# 🎉 自动部署完成
```

## 注意事项

1. 首次登录管理员界面后，请立即修改默认密码
2. 确保MongoDB服务正在运行
3. 生产环境中，请使用强密码和安全的JWT密钥
4. 定期备份数据库以防止数据丢失
5. GitHub Pages 仅部署前端静态文件，后端API需要单独部署
