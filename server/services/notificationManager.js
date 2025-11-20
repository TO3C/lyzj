import WechatWorkNotifier from './wechatWorkNotifier.js';
import SMSNotifier from './smsNotifier.js';
import DingTalkNotifier from './dingTalkNotifier.js';

// 统一通知服务管理器
export class NotificationManager {
  constructor() {
    this.wechatWork = new WechatWorkNotifier();
    this.sms = new SMSNotifier();
    this.dingTalk = new DingTalkNotifier();
  }

  // 发送所有配置的通知
  async sendAllNotifications(contactData) {
    const results = {
      email: { success: false, message: '' },
      wechatWork: { success: false, message: '' },
      sms: { success: false, message: '' },
      dingTalk: { success: false, message: '' }
    };

    // 并发发送所有通知
    const promises = [];

    // 邮件通知（原有功能）
    promises.push(
      this.sendEmailNotification(contactData)
        .then(result => { results.email = result; })
        .catch(error => { results.email = { success: false, error: error.message }; })
    );

    // 企业微信通知
    promises.push(
      this.wechatWork.sendNotification(contactData)
        .then(result => { results.wechatWork = result; })
        .catch(error => { results.wechatWork = { success: false, error: error.message }; })
    );

    // 短信通知
    promises.push(
      this.sms.sendNotification(contactData)
        .then(result => { results.sms = result; })
        .catch(error => { results.sms = { success: false, error: error.message }; })
    );

    // 钉钉通知
    promises.push(
      this.dingTalk.sendNotification(contactData)
        .then(result => { results.dingTalk = result; })
        .catch(error => { results.dingTalk = { success: false, error: error.message }; })
    );

    // 等待所有通知发送完成
    await Promise.allSettled(promises);

    // 记录发送结果
    this.logNotificationResults(contactData, results);

    return results;
  }

  // 发送邮件通知（集成原有邮件服务）
  async sendEmailNotification(contactData) {
    try {
      const { sendContactNotification } = await import('./emailService.js');
      return await sendContactNotification(contactData);
    } catch (error) {
      console.error('邮件通知发送失败:', error);
      return { success: false, error: error.message };
    }
  }

  // 记录通知发送结果
  logNotificationResults(contactData, results) {
    const successCount = Object.values(results).filter(r => r.success).length;
    const totalCount = Object.keys(results).length;

    console.log(`\n=== 通知发送结果 (${successCount}/${totalCount}) ===`);
    console.log(`客户: ${contactData.name} (${contactData.phone})`);
    
    Object.entries(results).forEach(([channel, result]) => {
      const status = result.success ? '✅' : '❌';
      const channelName = this.getChannelName(channel);
      console.log(`${status} ${channelName}: ${result.message || (result.success ? '发送成功' : result.error)}`);
    });
    
    console.log('=====================================\n');
  }

  // 获取通知渠道名称
  getChannelName(channel) {
    const names = {
      email: '邮件',
      wechatWork: '企业微信',
      sms: '短信',
      dingTalk: '钉钉'
    };
    return names[channel] || channel;
  }

  // 测试所有通知渠道
  async testAllNotifications() {
    const testData = {
      name: '测试用户',
      phone: '13800138000',
      email: 'test@example.com',
      subject: '测试通知',
      message: '这是一条测试消息，用于验证所有通知渠道是否正常工作。'
    };

    console.log('开始测试所有通知渠道...');
    const results = await this.sendAllNotifications(testData);
    
    console.log('\n=== 测试完成 ===');
    Object.entries(results).forEach(([channel, result]) => {
      const status = result.success ? '✅' : '❌';
      console.log(`${status} ${this.getChannelName(channel)}`);
    });

    return results;
  }
}

// 创建单例实例
const notificationManager = new NotificationManager();

export default notificationManager;