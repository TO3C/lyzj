import axios from 'axios';

// 钉钉机器人通知服务
export class DingTalkNotifier {
  constructor() {
    this.webhookUrl = process.env.DINGTALK_WEBHOOK_URL;
    this.secret = process.env.DINGTALK_SECRET;
    this.enabled = !!this.webhookUrl;
  }

  // 生成签名
  generateSign() {
    if (!this.secret) return '';
    
    const timestamp = Date.now();
    const signString = `${timestamp}\n${this.secret}`;
    const crypto = require('crypto');
    const sign = crypto.createHmac('sha256', this.secret)
      .update(signString)
      .digest('base64');
    
    return {
      timestamp,
      sign: encodeURIComponent(sign)
    };
  }

  // 发送钉钉通知
  async sendNotification(contactData) {
    if (!this.enabled) {
      console.log('钉钉机器人未配置，跳过通知');
      return { success: false, message: '钉钉机器人未配置' };
    }

    try {
      const signData = this.generateSign();
      let url = this.webhookUrl;
      
      if (signData.timestamp) {
        url += `&timestamp=${signData.timestamp}&sign=${signData.sign}`;
      }

      const message = {
        msgtype: 'markdown',
        markdown: {
          title: '新客户联系请求',
          text: this.formatMessage(contactData)
        }
      };

      const response = await axios.post(url, message, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      if (response.data.errcode === 0) {
        console.log('钉钉通知发送成功');
        return { success: true };
      } else {
        console.error('钉钉通知发送失败:', response.data);
        return { success: false, error: response.data.errmsg };
      }
    } catch (error) {
      console.error('钉钉通知发送异常:', error);
      return { success: false, error: error.message };
    }
  }

  // 格式化通知消息
  formatMessage(contactData) {
    const time = new Date().toLocaleString('zh-CN');
    
    return `
## 🎯 新客户联系请求

### 客户信息
- **姓名：** ${contactData.name}
- **电话：** ${contactData.phone}
- **邮箱：** ${contactData.email}

### 需求内容
> ${contactData.message}

### 提交时间
**${time}**

---
⚡ 请及时联系客户！
    `.trim();
  }

  // 测试连接
  async testConnection() {
    const testData = {
      name: '测试用户',
      phone: '13800138000',
      email: 'test@example.com',
      message: '这是一条测试消息，用于验证钉钉机器人是否正常工作。'
    };

    return await this.sendNotification(testData);
  }
}

export default DingTalkNotifier;