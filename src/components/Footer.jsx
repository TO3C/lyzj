import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
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
              <span>企业微信：扫码添加</span>
            </div>
          </div>
          
          {/* 企业微信二维码 */}
          <div className="footer-column">
            <h3>联系我们</h3>
            <div className="qrcode-container">
              <div className="qrcode">
                <img 
                  src="/images/enterprise.jpg" 
                  alt="企业微信二维码" 
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <div className="qrcode-text">
                扫码添加企业微信
                <br />专业咨询服务
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer