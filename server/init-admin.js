import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// 连接到MongoDB数据库
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB数据库连接成功');
  createAdminUser();
})
.catch(err => {
  console.log('MongoDB数据库连接失败:', err);
  process.exit(1);
});

// 创建管理员用户
async function createAdminUser() {
  try {
    // 检查是否已存在管理员用户
    const existingAdmin = await User.findOne({ role: 'admin' });
    
    if (existingAdmin) {
      console.log('管理员用户已存在');
      mongoose.connection.close();
      return;
    }
    
    // 创建新的管理员用户
    const adminUser = new User({
      username: 'admin',
      password: 'admin123', // 首次登录后应修改此密码
      role: 'admin'
    });
    
    await adminUser.save();
    console.log('管理员用户创建成功');
    console.log('用户名: admin');
    console.log('密码: admin123');
    console.log('请注意：首次登录后请修改密码');
    
  } catch (error) {
    console.error('创建管理员用户失败:', error);
  } finally {
    mongoose.connection.close();
  }
}