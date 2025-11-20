import express from 'express';
import Contact from '../models/Contact.js';
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { sendContactNotification, sendCustomerConfirmation } from '../services/emailService.js';
import notificationManager from '../services/notificationManager.js';

const router = express.Router();

// 输入验证函数
const validateContactInput = (data) => {
  const { name, email, phone, subject, message } = data;
  const errors = [];

  // 姓名验证
  if (!name || name.trim().length < 2) {
    errors.push('姓名至少需要2个字符');
  }
  if (name.length > 50) {
    errors.push('姓名不能超过50个字符');
  }

  // 邮箱验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('请输入有效的邮箱地址');
  }

  // 电话验证
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!phone || !phoneRegex.test(phone.replace(/\s/g, ''))) {
    errors.push('请输入有效的手机号码');
  }

  // 主题验证
  if (!subject || subject.trim().length < 2) {
    errors.push('主题至少需要2个字符');
  }
  if (subject.length > 100) {
    errors.push('主题不能超过100个字符');
  }

  // 消息验证
  if (!message || message.trim().length < 10) {
    errors.push('消息内容至少需要10个字符');
  }
  if (message.length > 1000) {
    errors.push('消息内容不能超过1000个字符');
  }

  return errors;
};

// @desc    管理员登录
// @route   POST /api/contact/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 简单的用户名密码验证（实际项目中应该使用数据库和加密）
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      // 生成简单的token（实际项目中应使用JWT）
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
      
      res.json({
        message: '登录成功',
        token: token,
        user: { username, role: 'admin' }
      });
    } else {
      res.status(401).json({ message: '用户名或密码错误' });
    }
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// @desc    提交联系表单
// @route   POST /api/contact
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // 输入验证
    const validationErrors = validateContactInput(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        message: '输入验证失败', 
        errors: validationErrors 
      });
    }

    // 清理输入数据
    const cleanData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.replace(/\s/g, ''),
      subject: subject.trim(),
      message: message.trim()
    };

    // 将提交记录写入仅管理员可见的本地私有文件（与DB同时记录，保证数据不丢）
    appendSubmission(cleanData)

    // 尝试保存到MongoDB
    try {
      const contact = new Contact(cleanData);
      await contact.save();
      
      // 发送通知（异步执行，不影响用户体验）
      sendAllNotifications(cleanData);
      
      res.status(201).json({ message: '联系信息已提交' });
    } catch (dbError) {
      // 如果MongoDB连接失败，仍然返回成功响应，确保用户体验
      console.log('MongoDB连接失败，但表单提交已记录', dbError);
      
      // 即使数据库失败，也尝试发送通知
      sendAllNotifications(cleanData);
      
      res.status(201).json({ 
        message: '联系信息已提交',
        note: '系统正在处理您的请求，我们会尽快与您联系'
      });
    }
  } catch (error) {
    console.error('表单提交错误:', error);
    res.status(500).json({ 
      message: '服务器内部错误',
      note: '请稍后重试或联系技术支持'
    });
  }
});

// @desc    获取所有联系信息
// @route   GET /api/contact
// @access  Private/Admin
router.get('/', async (req, res) => {
  // 简单的API密钥验证
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ message: '需要管理员API密钥' });
  }
  try {
    let contacts = [];
    
    // 首先尝试从MongoDB获取数据
    try {
      const dbContacts = await Contact.find({}).sort({ createdAt: -1 });
      contacts = dbContacts;
    } catch (dbError) {
      console.log('MongoDB连接失败，尝试读取本地文件');
    }
    
    // 如果MongoDB没有数据或连接失败，读取本地文件
    if (contacts.length === 0) {
      try {
        if (fs.existsSync(SUBMISSIONS_PATH)) {
          const raw = fs.readFileSync(SUBMISSIONS_PATH, 'utf-8');
          const lines = raw.split('\n').filter(Boolean);
          contacts = lines.map(line => {
            try {
              const data = JSON.parse(line);
              // 添加_id字段以保持兼容性
              return {
                _id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                ...data
              };
            } catch (e) {
              return null;
            }
          }).filter(Boolean).reverse();
        }
      } catch (fileError) {
        console.log('读取本地文件失败:', fileError);
      }
    }
    
    // 如果仍然没有数据，返回空数组而不是模拟数据
    if (contacts.length === 0) {
      console.log('没有找到联系信息数据');
      return res.json([]);
    }
    
    res.json(contacts);
  } catch (error) {
    console.error('获取联系信息失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// @desc    获取通知配置状态
// @route   GET /api/contact/notification-status
// @access  Private/Admin
router.get('/notification-status', async (req, res) => {
  // 简单的API密钥验证
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ message: '需要管理员API密钥' });
  }

  try {
    const status = {
      email: {
        enabled: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
        config: {
          user: process.env.EMAIL_USER ? '***' + process.env.EMAIL_USER.slice(-4) : null,
          admin: process.env.ADMIN_EMAIL
        }
      },
      wechatWork: {
        enabled: !!process.env.WECHAT_WORK_WEBHOOK_URL,
        config: {
          webhook: process.env.WECHAT_WORK_WEBHOOK_URL ? '已配置' : '未配置'
        }
      },
      sms: {
        enabled: !!(process.env.ADMIN_PHONE && 
                   (process.env.ALIYUN_ACCESS_KEY_ID || process.env.TENCENT_SECRET_ID)),
        config: {
          provider: process.env.SMS_PROVIDER || '未配置',
          phone: process.env.ADMIN_PHONE ? '***' + process.env.ADMIN_PHONE.slice(-4) : null
        }
      },
      dingTalk: {
        enabled: !!process.env.DINGTALK_WEBHOOK_URL,
        config: {
          webhook: process.env.DINGTALK_WEBHOOK_URL ? '已配置' : '未配置',
          secret: process.env.DINGTALK_SECRET ? '已配置' : '未配置'
        }
      }
    };

    res.json({
      message: '通知配置状态',
      status: status,
      summary: {
        total: Object.keys(status).length,
        enabled: Object.values(status).filter(s => s.enabled).length,
        disabled: Object.values(status).filter(s => !s.enabled).length
      }
    });
  } catch (error) {
    console.error('获取通知状态失败:', error);
    res.status(500).json({ 
      message: '获取通知状态失败',
      error: error.message 
    });
  }
});

// @desc    获取单个联系信息
// @route   GET /api/contact/:id
// @access  Private/Admin
router.get('/:id', async (req, res) => {
  // 简单的API密钥验证
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ message: '需要管理员API密钥' });
  }
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: '联系信息未找到' });
    }
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// @desc    删除联系信息
// @route   DELETE /api/contact/:id
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
  // 简单的API密钥验证
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ message: '需要管理员API密钥' });
  }
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: '联系信息未找到' });
    }
    await contact.remove();
    res.json({ message: '联系信息已删除' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 私有存储路径（不对外静态暴露）
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PRIVATE_DIR = path.join(__dirname, '../private')
const SUBMISSIONS_PATH = path.join(PRIVATE_DIR, 'contact-submissions.jsonl')

function appendSubmission(entry) {
  try {
    fs.mkdirSync(PRIVATE_DIR, { recursive: true })
    const payload = { ...entry, createdAt: new Date().toISOString() }
    fs.appendFileSync(SUBMISSIONS_PATH, JSON.stringify(payload) + '\n')
  } catch (e) {
    console.log('写入私有提交文件失败', e)
  }
}

// @desc    导出联系信息（JSON，本地文件）
// @route   GET /api/contact/export
// @access  Private/Admin
router.get('/export', async (req, res) => {
  // 简单的API密钥验证
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ message: '需要管理员API密钥' });
  }
  try {
    fs.mkdirSync(PRIVATE_DIR, { recursive: true })
    let localData = []
    if (fs.existsSync(SUBMISSIONS_PATH)) {
      const raw = fs.readFileSync(SUBMISSIONS_PATH, 'utf-8')
      const lines = raw.split('\n').filter(Boolean)
      localData = lines.map(l => { try { return JSON.parse(l) } catch { return null } }).filter(Boolean).reverse()
    }

    // 同步尝试读取数据库（若不可用则忽略）
    let dbData = []
    try {
      dbData = await Contact.find({}).sort({ createdAt: -1 })
    } catch (dbErr) {
      console.log('导出时数据库不可用，仅返回本地文件数据')
    }

    return res.json({ local: localData, db: dbData })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: '导出失败' })
  }
})

// @desc    导出联系信息为CSV（下载）
// @route   GET /api/contact/export/csv
// @access  Private/Admin
router.get('/export/csv', async (req, res) => {
  // 简单的API密钥验证
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ message: '需要管理员API密钥' });
  }
  try {
    fs.mkdirSync(PRIVATE_DIR, { recursive: true })
    let records = []
    if (fs.existsSync(SUBMISSIONS_PATH)) {
      const raw = fs.readFileSync(SUBMISSIONS_PATH, 'utf-8')
      records = raw.split('\n').filter(Boolean).map(l => { try { return JSON.parse(l) } catch { return null } }).filter(Boolean)
    }

    const headers = ['name','email','phone','subject','message','createdAt']
    const escape = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"'
    const csv = [headers.join(','), ...records.map(r => headers.map(h => escape(r[h])).join(','))].join('\n')

    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename="contact-submissions.csv"')
    res.send(csv)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: '导出失败' })
  }
})

// @desc    测试通知系统
// @route   POST /api/contact/test-notifications
// @access  Private/Admin
router.post('/test-notifications', async (req, res) => {
  // 简单的API密钥验证
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ message: '需要管理员API密钥' });
  }

  try {
    console.log('开始测试所有通知渠道...');
    const results = await notificationManager.testAllNotifications();
    
    res.json({
      message: '通知测试完成',
      results: results,
      summary: {
        total: Object.keys(results).length,
        success: Object.values(results).filter(r => r.success).length,
        failed: Object.values(results).filter(r => !r.success).length
      }
    });
  } catch (error) {
    console.error('通知测试失败:', error);
    res.status(500).json({ 
      message: '通知测试失败',
      error: error.message 
    });
  }
});

export default router;

// 异步发送所有通知的函数
async function sendAllNotifications(contactData) {
  try {
    // 使用统一通知管理器发送所有配置的通知
    const results = await notificationManager.sendAllNotifications(contactData);
    
    // 记录发送结果摘要
    const successCount = Object.values(results).filter(r => r.success).length;
    const totalCount = Object.keys(results).length;
    
    console.log(`通知发送完成: ${successCount}/${totalCount} 个渠道成功`);
    
  } catch (error) {
    console.error('通知发送过程中出错:', error);
  }
}