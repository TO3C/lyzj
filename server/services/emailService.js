import nodemailer from 'nodemailer';

// 创建邮件传输器
const createTransporter = () => {
  // 使用Gmail作为邮件服务（需要应用专用密码）
  // 或者使用其他邮件服务如QQ邮箱、163邮箱等
  return nodemailer.createTransport({
    service: 'gmail', // 或者 'qq', '163' 等
    auth: {
      user: process.env.EMAIL_USER, // 发件人邮箱
      pass: process.env.EMAIL_PASS  // 邮箱授权码（不是登录密码）
    }
  });
};

// 发送新联系表单通知邮件
export const sendContactNotification = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // 管理员接收邮箱
      subject: `新的客户联系请求 - ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            新的客户联系请求
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">联系信息</h3>
            <p><strong>姓名：</strong> ${contactData.name}</p>
            <p><strong>邮箱：</strong> ${contactData.email}</p>
            <p><strong>电话：</strong> ${contactData.phone || '未提供'}</p>
            <p><strong>主题：</strong> ${contactData.subject}</p>
          </div>
          
          <div style="background-color: #e9ecef; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">留言内容</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${contactData.message}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #6c757d; font-size: 14px;">
              提交时间：${new Date(contactData.createdAt || Date.now()).toLocaleString('zh-CN')}
            </p>
          </div>
          
          <div style="background-color: #007bff; color: white; padding: 15px; text-align: center; border-radius: 5px;">
            <p style="margin: 0;">
              请及时处理客户的联系请求，登录管理后台查看详情：
              <a href="${process.env.ADMIN_URL || 'http://localhost:3000/admin'}" style="color: white; text-decoration: underline;">
                管理后台
              </a>
            </p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('通知邮件发送成功:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('发送通知邮件失败:', error);
    return { success: false, error: error.message };
  }
};

// 发送客户确认邮件
export const sendCustomerConfirmation = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: contactData.email,
      subject: '感谢您的联系 - 我们已收到您的消息',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; text-align: center; padding: 20px 0;">
            感谢您的联系
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p>尊敬的 <strong>${contactData.name}</strong>：</p>
            <p>我们已收到您的联系请求，感谢您对我们的关注！</p>
            <p>我们的团队将在24小时内与您取得联系，请保持电话畅通。</p>
          </div>
          
          <div style="background-color: #e9ecef; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">您的留言内容：</h3>
            <p><strong>主题：</strong> ${contactData.subject}</p>
            <p style="white-space: pre-wrap; line-height: 1.6;">${contactData.message}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #6c757d;">
              如有紧急事宜，请直接致电我们的客服热线
            </p>
          </div>
          
          <div style="background-color: #28a745; color: white; padding: 15px; text-align: center; border-radius: 5px;">
            <p style="margin: 0;">期待与您的合作！</p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('客户确认邮件发送成功:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('发送客户确认邮件失败:', error);
    return { success: false, error: error.message };
  }
};