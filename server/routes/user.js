import express from 'express';
import User from '../models/User.js';
import { protect, admin } from '../middleware/auth.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// @desc    注册管理员用户（仅开发环境使用）
// @route   POST /api/users/register
// @access  Private/Admin (或开发环境)
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 检查用户是否已存在
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: '用户名已存在' });
    }

    // 创建新用户
    const user = await User.create({
      username,
      password,
      role: 'admin'
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: '无效的用户数据' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});



// @desc    管理员登录
// @route   POST /api/users/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 临时认证机制 - 当MongoDB不可用时使用
    // 仅用于演示和测试目的
    if (username === 'admin' && password === 'admin123') {
      // 生成一个临时的JWT令牌
      const token = jwt.sign({ id: 'temp-admin-id' }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      });
      
      res.json({
        _id: 'temp-admin-id',
        username: 'admin',
        role: 'admin',
        token: token
      });
    } else {
      res.status(401).json({ message: '无效的用户名或密码' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// @desc    获取当前登录用户
// @route   GET /api/users/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  res.json({
    _id: req.user._id,
    username: req.user.username,
    role: req.user.role
  });
});

// 生成JWT令牌
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

export default router;