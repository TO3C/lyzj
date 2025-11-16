import React from 'react'
import { Link } from 'react-router-dom'
import StaticTechBackground from '../components/StaticTechBackground'

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
      icon: '💻',
      title: '网站开发业务',
      description: '专业网站开发服务，定制化解决方案，打造现代化企业网站'
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
      {/* 首屏大图 - 静态科技感背景 */}
      <section className="hero">
        <StaticTechBackground />
        <div className="hero-content">
          {/* 按钮区域 */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '300px' }}>
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
      

      

    </div>
  )
}

export default Home