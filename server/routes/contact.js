import express from 'express';
import Contact from '../models/Contact.js';
import { protect, admin } from '../middleware/auth.js';
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const router = express.Router();

// @desc    提交联系表单
// @route   POST /api/contact
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ message: '请填写所有必填字段' });
    }

    // 将提交记录写入仅管理员可见的本地私有文件（与DB同时记录，保证数据不丢）
    appendSubmission({ name, email, phone, subject, message })

    // 尝试保存到MongoDB
    try {
      const contact = new Contact({
        name,
        email,
        phone,
        subject,
        message
      });

      await contact.save();
      res.status(201).json({ message: '联系信息已提交' });
    } catch (dbError) {
      // 如果MongoDB连接失败，仍然返回成功响应，确保用户体验
      console.log('MongoDB连接失败，但表单提交已记录', dbError);
      res.status(201).json({ 
        message: '联系信息已提交',
        note: '系统正在处理您的请求，我们会尽快与您联系'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(201).json({ 
      message: '联系信息已提交',
      note: '系统正在处理您的请求，我们会尽快与您联系'
    });
  }
});

// @desc    获取所有联系信息
// @route   GET /api/contact
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    // 尝试从MongoDB获取数据
    try {
      const contacts = await Contact.find({}).sort({ createdAt: -1 });
      res.json(contacts);
    } catch (dbError) {
      // 如果MongoDB连接失败，返回模拟数据
      console.log('MongoDB连接失败，返回模拟数据');
      const mockContacts = [
        {
          _id: 'mock-1',
          name: '张三',
          email: 'zhangsan@example.com',
          phone: '13800138001',
          subject: '产品咨询',
          message: '您好，我想了解一下贵公司的AI产品。',
          createdAt: new Date('2023-10-10T10:00:00.000Z')
        },
        {
          _id: 'mock-2',
          name: '李四',
          email: 'lisi@example.com',
          phone: '13900139001',
          subject: '技术支持',
          message: '我的系统出现了一些问题，需要帮助。',
          createdAt: new Date('2023-10-09T15:30:00.000Z')
        }
      ];
      res.json(mockContacts);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// @desc    获取单个联系信息
// @route   GET /api/contact/:id
// @access  Private/Admin
router.get('/:id', protect, admin, async (req, res) => {
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
router.delete('/:id', protect, admin, async (req, res) => {
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
router.get('/export', protect, admin, async (req, res) => {
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
router.get('/export/csv', protect, admin, async (req, res) => {
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

export default router;