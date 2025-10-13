import React from 'react'

const About = () => {
  // 发展历程数据
  const historyMilestones = [
    {
      year: '2018',
      title: '公司成立',
      description: '流云智炬科技在三亚正式成立，开始为本地企业提供科技服务'
    },
    {
      year: '2019',
      title: '业务拓展',
      description: '拓展保险业务和旅游服务，成为三亚本地知名的科技服务商'
    },
    {
      year: '2020',
      title: '技术升级',
      description: '引入AI技术，开始提供AI电商图片和视频创作服务'
    },
    {
      year: '2021',
      title: '团队壮大',
      description: '团队规模扩大到50人，服务客户超过1000家'
    },
    {
      year: '2022',
      title: '资质认证',
      description: '获得多项行业资质认证，成为三亚科技行业的标杆企业'
    },
    {
      year: '2023',
      title: '创新发展',
      description: '推出多项创新服务，持续引领行业发展'
    }
  ]
  
  // 团队成员数据
  const teamMembers = [
    {
      name: '张三',
      position: '创始人兼CEO',
      description: '拥有10年科技行业经验，曾在知名科技公司担任高管',
      avatar: '👨‍💼'
    },
    {
      name: '李四',
      position: '技术总监',
      description: 'AI技术专家，拥有丰富的技术研发和团队管理经验',
      avatar: '👨‍💻'
    },
    {
      name: '王五',
      position: '运营总监',
      description: '擅长企业运营和市场推广，曾主导多个成功项目',
      avatar: '👩‍💼'
    },
    {
      name: '赵六',
      position: '设计总监',
      description: '资深设计师，专注于用户体验和视觉设计',
      avatar: '👩‍🎨'
    }
  ]
  
  // 企业文化数据
  const companyCulture = [
    {
      title: '使命',
      description: '用科技赋能企业，让三亚的企业更具竞争力',
      icon: '🎯'
    },
    {
      title: '愿景',
      description: '成为三亚领先、全国知名的科技服务商',
      icon: '🌟'
    },
    {
      title: '价值观',
      description: '诚信、创新、专业、共赢',
      icon: '💎'
    }
  ]
  
  // 资质证书数据
  const certificates = [
    'ISO9001质量管理体系认证',
    '高新技术企业认证',
    'AAA级信用企业认证',
    '软件企业认证',
    '信息安全管理体系认证'
  ]

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
            关于我们
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
            流云智炬科技 - 三亚综合性科技服务商，致力于用科技赋能企业发展
          </p>
        </div>
      </section>
      
      {/* 公司简介 */}
      <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '24px', color: 'var(--primary-color)' }}>
              公司简介
            </h2>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8', marginBottom: '24px' }}>
              流云智炬科技成立于2018年，是一家专注于为企业提供全方位科技服务的综合性科技公司。
              我们总部位于美丽的三亚，凭借专业的团队和先进的技术，为客户提供保险业务、旅游服务、
              营业厅服务、AI电商图片、AI视频创作等多元化服务。
            </p>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8', marginBottom: '24px' }}>
              自成立以来，我们始终坚持"科技赋能，智领未来"的理念，不断创新服务模式，提升服务质量，
              努力成为企业发展的战略合作伙伴。目前，我们已经服务了超过1000家客户，涵盖各个行业领域，
              赢得了客户的广泛认可和好评。
            </p>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
              在未来，我们将继续秉承"诚信、创新、专业、共赢"的核心价值观，不断引进先进技术，
              拓展服务领域，为客户创造更大价值，为三亚的科技发展做出更大贡献。
            </p>
          </div>
        </div>
      </section>
      
      {/* 发展历程 */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <h2 className="section-title">发展历程</h2>
          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            {/* 时间轴线 */}
            <div style={{ position: 'absolute', left: '0', top: '0', bottom: '0', width: '2px', backgroundColor: 'var(--primary-color)' }}></div>
            
            {/* 历程节点 */}
            {historyMilestones.map((milestone, index) => (
              <div key={index} style={{
                position: 'relative',
                marginBottom: '48px',
                paddingLeft: '40px'
              }}>
                {/* 时间点 */}
                <div style={{
                  position: 'absolute',
                  left: '-9px',
                  top: '0',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-color)',
                  border: '4px solid white',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}></div>
                
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--primary-color)', marginBottom: '8px' }}>
                  {milestone.year}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{milestone.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 团队介绍 */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 className="section-title">团队介绍</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {teamMembers.map((member, index) => (
              <div key={index} style={{
                padding: '24px',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                backgroundColor: 'white',
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }} onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-8px)'
                e.target.style.boxShadow = 'var(--shadow-md)'
              }} onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }}>
                <div style={{ fontSize: '5rem', marginBottom: '16px' }}>{member.avatar}</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{member.name}</h3>
                <p style={{ color: 'var(--primary-color)', marginBottom: '16px' }}>{member.position}</p>
                <p style={{ color: 'var(--text-secondary)' }}>{member.description}</p>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '48px', padding: '24px', backgroundColor: 'rgba(22, 93, 255, 0.05)', borderRadius: '8px' }}>
            <p style={{ fontSize: '1.125rem' }}>我们拥有一支专业、高效、创新的团队，欢迎有志之士加入我们！</p>
            <button className="btn btn-outline" style={{ marginTop: '16px' }}>
              查看招聘职位
            </button>
          </div>
        </div>
      </section>
      
      {/* 企业文化 */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <h2 className="section-title">企业文化</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            {companyCulture.map((item, index) => (
              <div key={index} style={{
                padding: '32px',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                backgroundColor: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '24px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 资质证书 */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 className="section-title">资质证书</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
              {certificates.map((certificate, index) => (
                <div key={index} style={{
                  padding: '20px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'box-shadow 0.3s ease'
                }} onMouseEnter={(e) => {
                  e.target.style.boxShadow = 'var(--shadow-md)'
                }} onMouseLeave={(e) => {
                  e.target.style.boxShadow = 'none'
                }}>
                  <span style={{ fontSize: '1.5rem', color: 'var(--secondary-color)' }}>🏆</span>
                  <span>{certificate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* 合作伙伴 */}
      <section style={{ padding: '60px 0', backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '32px', textAlign: 'center' }}>合作伙伴</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '32px' }}>
            {['🏢', '🏦', '🏨', '🏪', '💻', '📱', '📺', '🎬'].map((partner, index) => (
              <div key={index} style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'white',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }} onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)'
                e.target.style.boxShadow = 'var(--shadow-md)'
              }} onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)'
                e.target.style.boxShadow = 'var(--shadow-sm)'
              }}>
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About