import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import contactRoutes from './routes/contact.js';
import userRoutes from './routes/user.js';

// 修复 ES Module 中 __dirname 不可用问题
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 加载环境变量
dotenv.config();

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 连接到MongoDB数据库
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB数据库连接成功'))
.catch(err => {
  console.log('MongoDB数据库连接失败:', err);
  console.log('服务器将继续运行，但某些功能可能受限');
});

// 路由
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);

// 生产环境下提供静态文件
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  // 使用中间件兜底返回 SPA 入口文件（兼容 Express 5）
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// 端口读取环境变量以支持云平台，开发默认5001
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});