# 流云网站服务故障排除指南

## 问题描述
服务不可用，频繁出现连接问题

## 解决方案

### 🚀 快速修复（推荐）
```bash
# 进入项目目录
cd "/Users/j/trae项目部/项目二（网站）/流云"

# 使用一键重启脚本
./restart-server.sh
```

### 🔧 手动修复步骤

#### 1. 强制停止所有进程
```bash
pkill -f "vite"
lsof -ti:5173 | xargs kill -9
```

#### 2. 清理和重建
```bash
# 删除node_modules和package-lock.json
rm -rf node_modules package-lock.json

# 重新安装依赖
npm install

# 清理Vite缓存
rm -rf node_modules/.vite
```

#### 3. 启动服务
```bash
npm run dev
```

### 📋 检查清单
- [ ] 端口5173是否被占用
- [ ] node_modules是否完整
- [ ] Vite配置是否正确
- [ ] 浏览器缓存是否清理

### 🛠️ 预防措施

#### 1. 创建启动脚本
已创建 `restart-server.sh` 一键重启脚本

#### 2. 定期维护
```bash
# 每周清理一次缓存
npm run build && rm -rf dist

# 检查依赖更新
npm outdated
```

#### 3. 监控服务状态
```bash
# 检查端口占用
lsof -i:5173

# 检查进程状态
ps aux | grep vite
```

### 🆘 紧急恢复
如果以上方法都无效，尝试：
```bash
# 完全重置项目
git clean -fd
git reset --hard HEAD
npm install
npm run dev
```

### 📞 技术支持
如问题持续存在，请检查：
1. 系统防火墙设置
2. Node.js版本兼容性
3. 网络连接状态

---
**最后更新**: 2025-06-17
**状态**: 已验证有效