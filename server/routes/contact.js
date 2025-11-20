import express from 'express';
import Contact from '../models/Contact.js';
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'
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
    let allContacts = [];
    let localContacts = [];
    let dbContacts = [];
    
    // 1. 首先读取本地文件数据
    try {
      if (fs.existsSync(SUBMISSIONS_PATH)) {
        const raw = fs.readFileSync(SUBMISSIONS_PATH, 'utf-8');
        const lines = raw.split('\n').filter(Boolean);
        localContacts = lines.map((line, index) => {
          try {
            const data = JSON.parse(line);
            // 如果数据没有_id字段，生成一个稳定的ID
            if (!data._id) {
              // 使用行号和内容hash生成稳定ID，确保每次读取都是相同的ID
              const timestamp = new Date(data.createdAt || Date.now()).getTime();
              const hash = crypto.createHash('md5')
                .update(`${data.name}${data.email}${timestamp}${index}`)
                .digest('hex').substr(0, 8);
              data._id = `local-${timestamp}-${hash}`;
            }
            return data;
          } catch (e) {
            console.log(`解析本地文件第${index + 1}行失败:`, e.message);
            return null;
          }
        }).filter(Boolean);
        console.log(`成功读取本地文件数据: ${localContacts.length} 条`);
      }
    } catch (fileError) {
      console.log('读取本地文件失败:', fileError);
    }
    
    // 2. 尝试从MongoDB获取数据
    try {
      dbContacts = await Contact.find({}).sort({ createdAt: -1 });
    } catch (dbError) {
      console.log('MongoDB连接失败，仅使用本地文件数据');
    }
    
    // 3. 合并数据，避免重复（基于name+email+createdAt判断重复）
    const combinedContacts = [];
    const seenKeys = new Set();
    
    // 先添加本地数据
    localContacts.forEach(contact => {
      const key = `${contact.name}_${contact.email}_${contact.createdAt}`;
      if (!seenKeys.has(key)) {
        combinedContacts.push(contact);
        seenKeys.add(key);
      }
    });
    
    // 再添加数据库数据（排除重复的）
    dbContacts.forEach(contact => {
      const key = `${contact.name}_${contact.email}_${contact.createdAt}`;
      if (!seenKeys.has(key)) {
        combinedContacts.push(contact);
        seenKeys.add(key);
      }
    });
    
    // 按创建时间倒序排列
    allContacts = combinedContacts.sort((a, b) => 
      new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );
    
    console.log(`返回数据统计: 本地文件 ${localContacts.length} 条, MongoDB ${dbContacts.length} 条, 合并去重后 ${allContacts.length} 条`);
    
    res.json(allContacts);
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
    const id = req.params.id;
    
    // 如果是本地文件记录（以local-开头）
    if (id.startsWith('local-')) {
      const success = deleteLocalSubmission(id);
      if (success) {
        res.json({ message: '联系信息已删除' });
      } else {
        res.status(404).json({ message: '联系信息未找到' });
      }
    } else {
      // MongoDB记录
      const contact = await Contact.findByIdAndDelete(id);
      if (!contact) {
        return res.status(404).json({ message: '联系信息未找到' });
      }
      res.json({ message: '联系信息已删除' });
    }
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
    const timestamp = new Date().toISOString()
    const hash = crypto.createHash('md5')
      .update(`${entry.name}${entry.email}${timestamp}`)
      .digest('hex').substr(0, 8)
    const payload = { 
      ...entry, 
      createdAt: timestamp,
      _id: `local-${new Date(timestamp).getTime()}-${hash}`
    }
    fs.appendFileSync(SUBMISSIONS_PATH, JSON.stringify(payload) + '\n')
  } catch (e) {
    console.log('写入私有提交文件失败', e)
  }
}

// 删除本地提交记录
function deleteLocalSubmission(id) {
  try {
    if (!fs.existsSync(SUBMISSIONS_PATH)) {
      return false;
    }
    
    const raw = fs.readFileSync(SUBMISSIONS_PATH, 'utf-8');
    const lines = raw.split('\n').filter(Boolean);
    let found = false;
    
    const filteredLines = lines.filter((line, index) => {
      try {
        const record = JSON.parse(line);
        
        // 如果记录有_id字段，直接比较
        if (record._id === id) {
          found = true;
          return false; // 删除这一行
        }
        
        // 如果记录没有_id字段，尝试生成相同的ID进行比较
        if (!record._id) {
          const timestamp = new Date(record.createdAt || Date.now()).getTime();
          const hash = crypto.createHash('md5')
            .update(`${record.name}${record.email}${timestamp}${index}`)
            .digest('hex').substr(0, 8);
          const generatedId = `local-${timestamp}-${hash}`;
          
          if (generatedId === id) {
            found = true;
            return false; // 删除这一行
          }
        }
        
        return true;
      } catch (e) {
        return true; // 保留无效的行
      }
    });
    
    if (found) {
      fs.writeFileSync(SUBMISSIONS_PATH, filteredLines.join('\n') + '\n');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('删除本地记录失败:', error);
    return false;
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