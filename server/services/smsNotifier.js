import axios from 'axios';

// 短信通知服务（支持阿里云、腾讯云等）
export class SMSNotifier {
  constructor() {
    this.provider = process.env.SMS_PROVIDER || 'aliyun'; // aliyun, tencent
    this.enabled = this.checkConfig();
  }

  checkConfig() {
    switch (this.provider) {
      case 'aliyun':
        return !!(process.env.ALIYUN_ACCESS_KEY_ID && 
                 process.env.ALIYUN_ACCESS_KEY_SECRET && 
                 process.env.ALIYUN_SMS_SIGN_NAME && 
                 process.env.ALIYUN_SMS_TEMPLATE_CODE &&
                 process.env.ADMIN_PHONE);
      case 'tencent':
        return !!(process.env.TENCENT_SECRET_ID && 
                 process.env.TENCENT_SECRET_KEY && 
                 process.env.TENCENT_SMS_SIGN_NAME && 
                 process.env.TENCENT_SMS_TEMPLATE_CODE &&
                 process.env.ADMIN_PHONE);
      default:
        return false;
    }
  }

  // 发送短信通知
  async sendNotification(contactData) {
    if (!this.enabled) {
      console.log('短信服务未配置，跳过通知');
      return { success: false, message: '短信服务未配置' };
    }

    try {
      switch (this.provider) {
        case 'aliyun':
          return await this.sendAliyunSMS(contactData);
        case 'tencent':
          return await this.sendTencentSMS(contactData);
        default:
          return { success: false, message: '不支持的短信服务商' };
      }
    } catch (error) {
      console.error('短信发送失败:', error);
      return { success: false, error: error.message };
    }
  }

  // 阿里云短信发送
  async sendAliyunSMS(contactData) {
    const params = {
      PhoneNumbers: process.env.ADMIN_PHONE,
      SignName: process.env.ALIYUN_SMS_SIGN_NAME,
      TemplateCode: process.env.ALIYUN_SMS_TEMPLATE_CODE,
      TemplateParam: JSON.stringify({
        name: contactData.name,
        phone: contactData.phone,
        time: new Date().toLocaleString('zh-CN')
      })
    };

    // 这里需要集成阿里云SDK
    console.log('阿里云短信参数:', params);
    return { success: true, message: '阿里云短信发送成功（模拟）' };
  }

  // 腾讯云短信发送
  async sendTencentSMS(contactData) {
    const params = {
      PhoneNumberSet: [process.env.ADMIN_PHONE],
      SignName: process.env.TENCENT_SMS_SIGN_NAME,
      TemplateCode: process.env.TENCENT_SMS_TEMPLATE_CODE,
      TemplateParamSet: [
        contactData.name,
        contactData.phone,
        new Date().toLocaleString('zh-CN')
      ]
    };

    // 这里需要集成腾讯云SDK
    console.log('腾讯云短信参数:', params);
    return { success: true, message: '腾讯云短信发送成功（模拟）' };
  }

  // 测试短信发送
  async testNotification() {
    const testData = {
      name: '测试用户',
      phone: '13800138000',
      message: '这是一条测试短信'
    };

    return await this.sendNotification(testData);
  }
}

export default SMSNotifier;