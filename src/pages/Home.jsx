import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StaticTechBackground from '../components/StaticTechBackground'
import ContactForm from '../components/ContactForm'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()
  
  // 业务服务数据
  const services = [
    {
      icon: '📋',
      title: '保险业务',
      description: '提供多种保险产品和专业咨询服务，为您的生活和事业保驾护航',
      route: '/services#insurance'
    },
    {
      icon: '🏖️',
      title: '旅游服务',
      description: '酒店预订、景点门票、旅游路线推荐，一站式三亚旅游解决方案',
      route: '/services#tourism'
    },
    {
      icon: '📱',
      title: '营业厅服务',
      description: '四大运营商合作，办卡套餐对比，在线预约办理，便捷高效',
      route: '/services#telecom'
    },
    {
      icon: '🖼️',
      title: 'AI电商图片',
      description: 'AI生成高质量电商图片，前后对比案例展示，提升产品竞争力',
      route: '/services#ai-images'
    },
    {
      icon: '🎬',
      title: 'AI视频创作',
      description: 'AI视频创作服务，作品展示视频墙，专业创作流程，案例效果展示',
      route: '/services#ai-videos'
    },
    {
      icon: '💻',
      title: '网站开发业务',
      description: '专业网站开发服务，定制化解决方案，打造现代化企业网站',
      route: '/services#web-development'
    }
  ]

  const handleServiceClick = (route) => {
    navigate(route)
  }

  return (
    <div className="home">
      {/* 首屏大图 - 静态科技感背景 */}
      <section className="hero">
        <StaticTechBackground />
        <div className="hero-content">
          {/* 按钮区域 */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '300px' }}>
            <Link to="/services" className="btn btn-primary">
              了解服务
            </Link>
            <Link to="/cases" className="btn btn-secondary">
              查看案例
            </Link>
          </div>
        </div>
      </section>
      
      {/* 业务概览 */}
      <section className="services-section">
        {/* 科技线条装饰 - 已移除 */}
        <div className="container">
          <h2 className="section-title">业务服务</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="service-card clickable"
                onClick={() => handleServiceClick(service.route)}
              >
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 联系表单 */}
      <ContactForm />
    </div>
  )
}

export default Home