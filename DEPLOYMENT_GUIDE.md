# 流云科技网站 - GitHub 部署指南

## 🚀 部署到 GitHub Pages

### 第一步：创建 GitHub 仓库
1. 登录 GitHub 账号
2. 点击右上角的 "+" 号，选择 "New repository"
3. 仓库名称填写：`流云`
4. 选择 Public（公开）或 Private（私有）
5. **不要**勾选 "Initialize this repository with a README"
6. 点击 "Create repository"

### 第二步：连接本地仓库到 GitHub
```bash
# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/流云.git

# 推送到 GitHub
git push -u origin main
```

### 第三步：启用 GitHub Pages
1. 进入你的 GitHub 仓库页面
2. 点击 "Settings" 选项卡
3. 在左侧菜单中找到 "Pages"
4. 在 "Source" 部分选择 "GitHub Actions"
5. 保存设置

### 第四步：触发自动部署
推送代码后会自动触发 GitHub Actions 进行构建和部署，大约需要1-3分钟完成。

## 🔄 后续内容更新和同步

### 方法一：直接修改（推荐）
1. 在本地修改代码
2. 提交更改：
   ```bash
   git add .
   git commit -m "描述你的更改"
   git push origin main
   ```
3. 等待 GitHub Actions 自动部署完成

### 方法二：GitHub 在线编辑
1. 在 GitHub 仓库页面直接编辑文件
2. 提交更改后会自动触发部署

## 📁 项目结构说明

```
流云/
├── src/                    # 源代码
│   ├── components/         # React 组件
│   ├── pages/             # 页面组件
│   ├── App.jsx            # 主应用组件
│   ├── main.jsx           # 入口文件
│   └── index.css          # 全局样式
├── server/                # 后端服务（可选）
├── public/                # 静态资源
├── .github/workflows/     # GitHub Actions 配置
├── vite.config.js         # Vite 构建配置
└── package.json           # 项目依赖
```

## ⚙️ 重要配置说明

### vite.config.js
- `base: '/流云/'` - 确保 GitHub Pages 正确加载资源
- `build.outDir: 'dist'` - 构建输出目录

### GitHub Actions
- 自动监听 `main` 分支的推送
- 自动构建并部署到 GitHub Pages
- 支持 Pull Request 预览

## 🌐 访问网站

部署成功后，你的网站将在以下地址可用：
```
https://YOUR_USERNAME.github.io/流云/
```

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📝 注意事项

1. **图片路径**：确保所有图片路径使用相对路径
2. **API 调用**：如果使用后端 API，需要配置 CORS
3. **环境变量**：敏感信息应使用 GitHub Secrets
4. **构建大小**：GitHub Pages 有 1GB 的存储限制

## 🆘 常见问题

### Q: 部署后页面空白？
A: 检查 `vite.config.js` 中的 `base` 配置是否正确

### Q: 图片无法加载？
A: 确保图片路径以 `/` 开头，如 `/images/logo.png`

### Q: 部署失败？
A: 检查 GitHub Actions 的构建日志，通常是因为构建错误

---

🎉 **恭喜！你的流云科技网站现在已经准备好部署到 GitHub Pages 了！**