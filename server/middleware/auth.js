import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // 临时机制：如果ID是临时管理员ID，直接设置用户信息
      if (decoded.id === 'temp-admin-id') {
        req.user = {
          _id: 'temp-admin-id',
          username: 'admin',
          role: 'admin'
        };
        next();
        return;
      }
      
      // 正常的MongoDB用户验证
      try {
        req.user = await User.findById(decoded.id).select('-password');
        next();
      } catch (dbError) {
        // 如果MongoDB连接失败，检查是否是临时管理员令牌
        res.status(401).json({ message: '未授权，用户不存在' });
      }
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: '未授权，令牌无效' });
    }
  }

  if (!token) {
    res.status(401).json({ message: '未授权，没有令牌' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: '未授权，需要管理员权限' });
  }
};

export { protect, admin };