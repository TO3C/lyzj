# MongoDB 安装说明

本项目使用 MongoDB 作为数据库。由于 MongoDB 二进制文件较大，未包含在仓库中。请按以下步骤安装：

## macOS 安装 MongoDB

### 方法1：使用 Homebrew（推荐）
```bash
# 安装 Homebrew（如果未安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 MongoDB Community Edition
brew tap mongodb/brew
brew install mongodb-community

# 启动 MongoDB 服务
brew services start mongodb-community
```

### 方法2：手动下载安装
1. 访问 [MongoDB 官网下载页面](https://www.mongodb.com/try/download/community)
2. 选择 macOS 版本下载
3. 解压并移动到合适位置：`sudo mv mongodb-macos-x86_64-* /usr/local/mongodb`
4. 添加到 PATH：`export PATH=/usr/local/mongodb/bin:$PATH`

## 验证安装
```bash
# 检查 MongoDB 版本
mongod --version

# 连接到 MongoDB
mongosh
```

## 项目配置
确保 `.env` 文件中的 MongoDB 连接字符串正确：
```
MONGO_URI=mongodb://localhost:27017/contact-management
```

## 启动项目
1. 启动 MongoDB 服务
2. 运行 `npm run dev-server` 启动后端
3. 运行 `npm run dev` 启动前端