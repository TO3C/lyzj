import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  // 业务服务数据
  const services = [
    {
      icon: '📋',
      title: '保险业务',
      description: '提供多种保险产品和专业咨询服务，为您的生活和事业保驾护航'
    },
    {
      icon: '🏖️',
      title: '旅游服务',
      description: '酒店预订、景点门票、旅游路线推荐，一站式三亚旅游解决方案'
    },
    {
      icon: '📱',
      title: '营业厅服务',
      description: '四大运营商合作，办卡套餐对比，在线预约办理，便捷高效'
    },
    {
      icon: '🖼️',
      title: 'AI电商图片',
      description: 'AI生成高质量电商图片，前后对比案例展示，提升产品竞争力'
    },
    {
      icon: '🎬',
      title: 'AI视频创作',
      description: 'AI视频创作服务，作品展示视频墙，专业创作流程，案例效果展示'
    },
    {
      icon: '🔧',
      title: '技术支持',
      description: '提供专业的技术支持和咨询服务，解决各类技术难题'
    }
  ]
  
  // 核心优势数据
  const advantages = [
    {
      number: '01',
      title: '专业团队',
      description: '拥有一支经验丰富的专业团队，具备深厚的行业知识和技术积累，为客户提供最专业的服务'
    },
    {
      number: '02',
      title: '技术创新',
      description: '不断进行技术创新，引入最新的AI技术和解决方案，为客户创造更大价值'
    },
    {
      number: '03',
      title: '优质服务',
      description: '以客户为中心，提供7×24小时的优质服务，确保客户需求得到及时响应和解决'
    }
  ]

  return (
    <div className="home">
      {/* 首屏大图 */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">科技赋能，智领未来</h1>
          <p className="hero-subtitle">三亚综合性科技服务商，为您提供全方位的科技解决方案</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/services" className="btn btn-primary">
              了解服务
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              联系我们
            </Link>
          </div>
        </div>
      </section>
      
      {/* 业务概览 */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">业务服务</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/services" className="btn btn-outline">
              查看全部服务
            </Link>
          </div>
        </div>
      </section>
      
      {/* 核心优势 */}
      <section className="advantages-section">
        <div className="container">
          <h2 className="section-title">核心优势</h2>
          <div className="advantages-grid">
            {advantages.map((advantage, index) => (
              <div key={index} className="advantage-card">
                <div className="advantage-number">{advantage.number}</div>
                <h3 className="advantage-title">{advantage.title}</h3>
                <p className="advantage-description">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 号召性行动 */}
      <section style={{
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ marginBottom: '20px', fontSize: '2rem' }}>
            准备好开启您的科技之旅了吗？
          </h2>
          <p style={{ marginBottom: '32px', fontSize: '1.125rem', opacity: '0.9' }}>
            联系我们，了解如何通过科技赋能您的业务
          </p>
          <Link to="/contact" className="btn" style={{
            backgroundColor: 'white',
            color: 'var(--primary-color)'
          }}>
            立即咨询
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home