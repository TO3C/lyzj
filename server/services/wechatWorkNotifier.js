import axios from 'axios';

// 企业微信机器人通知服务
export class WechatWorkNotifier {
  constructor() {
    this.webhookUrl = process.env.WECHAT_WORK_WEBHOOK_URL;
    this.enabled = !!this.webhookUrl;
  }

  // 发送企业微信通知
  async sendNotification(contactData) {
    if (!this.enabled) {
      console.log('企业微信机器人未配置，跳过通知');
      return { success: false, message: '企业微信机器人未配置' };
    }

    try {
      const message = {
        msgtype: 'markdown',
        markdown: {
          content: this.formatMessage(contactData)
        }
      };

      const response = await axios.post(this.webhookUrl, message, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      if (response.data.errcode === 0) {
        console.log('企业微信通知发送成功');
        return { success: true };
      } else {
        console.error('企业微信通知发送失败:', response.data);
        return { success: false, error: response.data.errmsg };
      }
    } catch (error) {
      console.error('企业微信通知发送异常:', error);
      return { success: false, error: error.message };
    }
  }

  // 格式化通知消息
  formatMessage(contactData) {
    const time = new Date().toLocaleString('zh-CN');
    
    return `
### 🎯 新客户联系请求

**客户信息：**
- **姓名：** ${contactData.name}
- **电话：** ${contactData.phone}
- **邮箱：** ${contactData.email}

**需求内容：**
> ${contactData.message}

**提交时间：** ${time}

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
      message: '这是一条测试消息，用于验证企业微信机器人是否正常工作。'
    };

    return await this.sendNotification(testData);
  }
}

export default WechatWorkNotifier;