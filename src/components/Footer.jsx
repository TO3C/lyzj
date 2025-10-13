import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  // 导航链接数据
  const navLinks = [
    { label: '首页', path: '/' },
    { label: '业务服务', path: '/services' },
    { label: '关于我们', path: '/about' },
    { label: '案例展示', path: '/cases' },
    { label: '联系方式', path: '/contact' }
  ]
  
  // 服务类别数据
  const serviceCategories = [
    '保险业务',
    '旅游服务',
    '营业厅服务',
    'AI电商图片',
    'AI视频创作',
    '更多服务'
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* 公司信息 */}
          <div className="footer-column">
            <h3>流云智炬科技</h3>
            <div className="footer-contact">
              <i>📍</i>
              <span>三亚市吉阳区迎宾路智慧中心大厦15层</span>
            </div>
            <div className="footer-contact">
              <i>✉️</i>
              <span>296077990@qq.com</span>
            </div>
            <div className="footer-contact">
              <i>📱</i>
              <span>138 8888 8888</span>
            </div>
          </div>
          
          {/* 导航链接 */}
          <div className="footer-column">
            <h3>快速链接</h3>
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="footer-link">
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* 服务类别 */}
          <div className="footer-column">
            <h3>服务类别</h3>
            {serviceCategories.map((service, index) => (
              <Link key={index} to="/services" className="footer-link">
                {service}
              </Link>
            ))}
          </div>
          
          {/* 企业微信二维码 */}
          <div className="footer-column">
            <h3>企业微信</h3>
            <div className="qrcode-container">
              <div className="qrcode">
                {/* 这里放置二维码图片，实际项目中替换为真实图片 */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  color: '#333',
                  backgroundColor: '#f5f5f5'
                }}>
                  企业微信
                  <br />二维码
                </div>
              </div>
              <div className="qrcode-text">
                扫码添加企业微信
                <br />获取更多服务
              </div>
            </div>
          </div>
        </div>
        
        {/* 底部版权信息 */}
        <div className="footer-bottom">
          <p>© 2024 流云智炬科技有限公司 版权所有 | 琼ICP备xxxxxxxx号</p>
          <p className="mt-1">专业的三亚综合性科技服务商，科技赋能，智领未来</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer