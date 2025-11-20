import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '联系咨询',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('请填写必填字段');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // 使用Formspree作为表单提交服务
      const formResponse = await fetch('https://formspree.io/f/xjvnlzvw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `流云智炬科技 - ${formData.subject}`,
          _replyto: formData.email
        })
      });

      if (formResponse.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '联系咨询',
          message: ''
        });
        
        // 显示成功消息
        alert('信息提交成功！我们会尽快与您联系。');
      } else {
        const errorData = await formResponse.json();
        throw new Error(errorData.message || '提交失败');
      }
    } catch (error) {
      console.error('提交错误:', error);
      setSubmitStatus('error');
      alert('提交失败，请稍后重试或直接联系我们：296077990@qq.com');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(''), 5000);
    }
  };

  return (
    <section className="contact-section">
      {/* 发光圆形装饰 */}
      <div className="glowing-circle-1"></div>
      <div className="glowing-circle-2"></div>
      
      <div style={{ 
        display: 'flex', 
        gap: '60px', 
        alignItems: 'flex-start',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* 左侧：Footer内容 */}
        <div className="contact-form-container" style={{ 
          flex: '1', 
          minWidth: '400px'
        }}>
          <div className="contact-form" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            gap: '40px'
          }}>
            {/* 公司信息 */}
            <div className="footer-column">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--primary-color)' }}>流云智炬科技</h3>
              <div className="footer-contact" style={{ marginBottom: '12px' }}>
                <i>📍</i>
                <span>三亚市吉阳区迎宾路智慧中心大厦15层</span>
              </div>
              <div className="footer-contact" style={{ marginBottom: '12px' }}>
                <i>✉️</i>
                <span>296077990@qq.com</span>
              </div>
              <div className="footer-contact" style={{ marginBottom: '12px' }}>
                <i>📱</i>
                <span>企业微信：扫码添加</span>
              </div>
            </div>
            
            {/* 企业微信二维码 */}
            <div className="footer-column">
              <h3 style={{ fontSize: '1.125rem', marginBottom: '16px', color: 'var(--primary-color)' }}>联系我们</h3>
              <div className="qrcode-container">
                <div className="qrcode" style={{ 
                  width: '150px', 
                  height: '150px', 
                  backgroundColor: '#f5f5f5', 
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  <img 
                    src="./images/enterprise.jpg" 
                    alt="企业微信二维码" 
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '4px'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<span style=\"font-size: 3rem;\">📱</span>';
                    }}
                  />
                </div>
                <div className="qrcode-text" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  扫码添加企业微信
                  <br />专业咨询服务
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 右侧：联系表单 */}
        <div className="contact-form-container" style={{ flex: '1', minWidth: '400px' }}>
          <div className="contact-form-header">
            <h2>在吗？</h2>
            <p>留下您的联系方式，我们会尽快与您联系</p>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">客户称呼</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="请输入您的称呼"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">邮箱</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="请输入您的邮箱地址"
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="phone">联系方式</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="请输入您的联系电话"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="message">您的需求</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="请详细描述您的具体需求..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? '提交中...' : '提交信息'}
            </button>

            {submitStatus === 'success' && (
              <div className="success-message">
                ✓ 信息提交成功！我们会尽快与您联系。
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="error-message">
                ✗ 提交失败，请稍后重试或直接联系我们。
              </div>
            )}
          </form>
        </div>
      </div>
      
      {/* 版权和备案信息 - 网页最底部中间 */}
      <div className="footer-copyright" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        marginTop: '60px',
        paddingTop: '20px',
        borderTop: '1px solid var(--border-color)',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          &copy; 2025 流云智炬科技 版权所有
        </p>
        <p className="icp-number" style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          琼ICP备2025064801号
        </p>
      </div>
    </section>
  );
};

export default ContactForm;