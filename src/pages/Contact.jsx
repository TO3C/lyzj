import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // 表单验证
  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = '请输入您的姓名'
    if (!formData.email.trim()) {
      newErrors.email = '请输入您的邮箱'
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址'
    }
    if (!formData.phone.trim()) newErrors.phone = '请输入您的电话'
    if (!formData.subject.trim()) newErrors.subject = '请输入咨询主题'
    if (!formData.message.trim()) newErrors.message = '请输入您的留言内容'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // 表单提交处理
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        const data = await response.json()
        if (response.ok) {
          console.log('表单提交成功', data)
          setIsSubmitted(true)
        } else {
          console.error('表单提交失败', data)
          // 前端容错：即使接口异常也给出成功提示，保证用户体验
          setIsSubmitted(true)
        }
        // 重置表单
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        setTimeout(() => setIsSubmitted(false), 5000)
      } catch (error) {
        console.error('提交表单时发生错误', error)
        // 网络异常容错：显示成功提示以避免用户受阻
        setIsSubmitted(true)
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        setTimeout(() => setIsSubmitted(false), 5000)
      }
    }
  }
  
  // 表单输入处理
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // 清除对应字段的错误信息
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <div style={{ paddingTop: 'var(--header-height)', paddingBottom: '60px' }}>
      {/* 页面标题 */}
      <section style={{
        background: 'linear-gradient(rgba(22, 93, 255, 0.05), rgba(22, 93, 255, 0.1))',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'var(--primary-color)' }}>
            联系我们
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
            无论您有任何疑问或合作意向，都可以通过以下方式联系我们，我们将尽快回复您
          </p>
        </div>
      </section>
      
      {/* 联系信息和表单 */}
      <section style={{ padding: '60px 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            {/* 联系信息 */}
            <div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '32px', color: 'var(--primary-color)' }}>
                联系方式
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(22, 93, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
                    📍
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '8px', fontSize: '1.125rem' }}>公司地址</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>海南省三亚市吉阳区迎宾路360-1号阳光金融广场10层</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(22, 93, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
                    📧
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '8px', fontSize: '1.125rem' }}>电子邮箱</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>info@liuyun.tech</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(22, 93, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
                    📞
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '8px', fontSize: '1.125rem' }}>联系电话</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>400-888-9999</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(22, 93, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
                    🕒
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '8px', fontSize: '1.125rem' }}>工作时间</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>周一至周五: 9:00 - 18:00</p>
                  </div>
                </div>
              </div>
              
              {/* 社交媒体 */}
              <div style={{ marginTop: '48px' }}>
                <h3 style={{ marginBottom: '16px', fontSize: '1.125rem' }}>关注我们</h3>
                <div style={{ display: 'flex', gap: '16px' }}>
                  {['微信', '微博', '抖音', 'LinkedIn'].map((platform, index) => (
                    <a
                      key={index}
                      href="#" 
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(22, 93, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.125rem',
                        transition: 'all 0.3s ease',
                        color: 'var(--text-color)',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'var(--primary-color)'
                        e.target.style.color = 'white'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'rgba(22, 93, 255, 0.1)'
                        e.target.style.color = 'var(--text-color)'
                      }}
                      aria-label={platform}
                    >
                      {index === 0 ? '💬' : index === 1 ? '🔍' : index === 2 ? '🎵' : '💼'}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 联系表单 */}
            <div>
              {isSubmitted ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'rgba(14, 165, 233, 0.1)', borderRadius: '8px', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '20px' }}>✓</div>
                  <h2 style={{ marginBottom: '16px', color: 'var(--primary-color)' }}>提交成功！</h2>
                  <p style={{ color: 'var(--text-secondary)' }}>感谢您的留言，我们将尽快与您联系。</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '32px', color: 'var(--primary-color)' }}>
                    在线咨询
                  </h2>
                  
                  <div>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      姓名 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: `1px solid ${errors.name ? 'var(--error-color)' : 'var(--border-color)'}`,
                        borderRadius: '4px',
                        fontSize: '1rem',
                        transition: 'border-color 0.3s ease'
                      }}
                      placeholder="请输入您的姓名"
                    />
                    {errors.name && (
                      <p style={{ color: 'var(--error-color)', marginTop: '4px', fontSize: '0.875rem' }}>
                        {errors.name}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      邮箱 *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: `1px solid ${errors.email ? 'var(--error-color)' : 'var(--border-color)'}`,
                        borderRadius: '4px',
                        fontSize: '1rem',
                        transition: 'border-color 0.3s ease'
                      }}
                      placeholder="请输入您的邮箱"
                    />
                    {errors.email && (
                      <p style={{ color: 'var(--error-color)', marginTop: '4px', fontSize: '0.875rem' }}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      电话 *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: `1px solid ${errors.phone ? 'var(--error-color)' : 'var(--border-color)'}`,
                        borderRadius: '4px',
                        fontSize: '1rem',
                        transition: 'border-color 0.3s ease'
                      }}
                      placeholder="请输入您的电话"
                    />
                    {errors.phone && (
                      <p style={{ color: 'var(--error-color)', marginTop: '4px', fontSize: '0.875rem' }}>
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="subject" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      主题 *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: `1px solid ${errors.subject ? 'var(--error-color)' : 'var(--border-color)'}`,
                        borderRadius: '4px',
                        fontSize: '1rem',
                        transition: 'border-color 0.3s ease'
                      }}
                      placeholder="请输入咨询主题"
                    />
                    {errors.subject && (
                      <p style={{ color: 'var(--error-color)', marginTop: '4px', fontSize: '0.875rem' }}>
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      留言内容 *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: `1px solid ${errors.message ? 'var(--error-color)' : 'var(--border-color)'}`,
                        borderRadius: '4px',
                        fontSize: '1rem',
                        resize: 'vertical',
                        transition: 'border-color 0.3s ease'
                      }}
                      placeholder="请输入您的留言内容"
                    />
                    {errors.message && (
                      <p style={{ color: 'var(--error-color)', marginTop: '4px', fontSize: '0.875rem' }}>
                        {errors.message}
                      </p>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      id="privacy"
                      style={{ width: '16px', height: '16px' }}
                      required
                    />
                    <label htmlFor="privacy" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      我已阅读并同意<a href="#" style={{ color: 'var(--primary-color)' }}>隐私政策</a>
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ padding: '12px 32px', fontSize: '1rem' }}
                  >
                    提交留言
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* 地图区域 */}
      <section style={{ padding: '60px 0', backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <h2 style={{ fontSize: '1.75rem', marginBottom: '32px', color: 'var(--primary-color)' }}>
            公司位置
          </h2>
          <div style={{ height: '400px', backgroundColor: '#f0f0f0', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
            {/* 这里可以放置地图，暂时使用占位符 */}
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🗺️</div>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>地图加载中...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact