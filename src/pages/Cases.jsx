import React, { useState } from 'react'

const Cases = () => {
  const [filter, setFilter] = useState('all')
  
  // 案例数据
  const cases = [
    {
      id: 1,
      title: '电商产品图片优化',
      category: 'ai-image',
      description: '为某知名电商平台优化产品图片，提升转化率30%',
      image: '🖼️',
      client: '三亚优品电商'
    },
    {
      id: 2,
      title: '旅游宣传视频',
      category: 'ai-video',
      description: '制作三亚旅游宣传视频，在社交媒体获得10万+播放量',
      image: '🎬',
      client: '三亚旅游局'
    },
    {
      id: 3,
      title: '保险产品宣传',
      category: 'ai-image',
      description: '设计保险产品宣传海报，提高品牌知名度',
      image: '📋',
      client: '三亚保险经纪公司'
    },
    {
      id: 4,
      title: '企业形象宣传片',
      category: 'ai-video',
      description: '为某企业制作形象宣传片，提升企业品牌价值',
      image: '🏢',
      client: '海南科技集团'
    },
    {
      id: 5,
      title: '酒店宣传画册',
      category: 'ai-image',
      description: '设计五星级酒店宣传画册，增加预订量25%',
      image: '🏨',
      client: '三亚海景度假酒店'
    },
    {
      id: 6,
      title: '景点介绍视频',
      category: 'ai-video',
      description: '制作三亚知名景点介绍视频，吸引更多游客',
      image: '🏖️',
      client: '三亚景区管理公司'
    }
  ]
  
  // 过滤后的案例
  const filteredCases = filter === 'all' 
    ? cases 
    : cases.filter(item => item.category === filter)

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
            案例展示
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
            探索我们的AI创作作品，见证科技与创意的完美结合
          </p>
        </div>
      </section>
      
      {/* 案例过滤 */}
      <section style={{ padding: '40px 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '40px',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                padding: '10px 24px',
                border: '1px solid var(--border-color)',
                borderRadius: '25px',
                backgroundColor: filter === 'all' ? 'var(--primary-color)' : 'white',
                color: filter === 'all' ? 'white' : 'var(--text-color)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                if (filter !== 'all') {
                  e.target.style.backgroundColor = 'var(--light-gray)'
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== 'all') {
                  e.target.style.backgroundColor = 'white'
                }
              }}
            >
              全部案例
            </button>
            <button
              onClick={() => setFilter('ai-image')}
              style={{
                padding: '10px 24px',
                border: '1px solid var(--border-color)',
                borderRadius: '25px',
                backgroundColor: filter === 'ai-image' ? 'var(--primary-color)' : 'white',
                color: filter === 'ai-image' ? 'white' : 'var(--text-color)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                if (filter !== 'ai-image') {
                  e.target.style.backgroundColor = 'var(--light-gray)'
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== 'ai-image') {
                  e.target.style.backgroundColor = 'white'
                }
              }}
            >
              AI电商图片
            </button>
            <button
              onClick={() => setFilter('ai-video')}
              style={{
                padding: '10px 24px',
                border: '1px solid var(--border-color)',
                borderRadius: '25px',
                backgroundColor: filter === 'ai-video' ? 'var(--primary-color)' : 'white',
                color: filter === 'ai-video' ? 'white' : 'var(--text-color)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                if (filter !== 'ai-video') {
                  e.target.style.backgroundColor = 'var(--light-gray)'
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== 'ai-video') {
                  e.target.style.backgroundColor = 'white'
                }
              }}
            >
              AI视频创作
            </button>
          </div>
          
          {/* 案例网格 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filteredCases.map((item) => (
              <div key={item.id} style={{
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: 'white',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }} onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px)'
                e.target.style.boxShadow = 'var(--shadow-md)'
              }} onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }}>
                <div style={{ height: '200px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                  {item.image}
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{item.title}</h3>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item.client}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>{item.description}</p>
                  <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                    查看详情
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* 无案例提示 */}
          {filteredCases.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>暂无该类型的案例</p>
            </div>
          )}
        </div>
      </section>
      
      {/* 案例详情展示 - 示例 */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <h2 className="section-title">精选案例</h2>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center', backgroundColor: 'white', padding: '32px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
              <div>
                <div style={{ height: '300px', backgroundColor: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                  🖼️ AI电商图片案例
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--primary-color)' }}>
                  三亚优品电商产品图片优化项目
                </h3>
                <p style={{ marginBottom: '24px' }}>客户是三亚本地知名的电商平台，主要销售海南特色产品。我们通过AI技术对其产品图片进行了全面优化，包括背景替换、光线调整、色彩优化等，大大提升了产品的视觉吸引力。</p>
                
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ marginBottom: '12px' }}>项目成果：</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {[
                      '产品图片质量显著提升',
                      '页面转化率提升30%',
                      '客户停留时间增加45%',
                      '产品销售额增长28%'
                    ].map((item, index) => (
                      <li key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1rem', color: 'var(--secondary-color)' }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className="btn btn-primary">
                  查看完整案例
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 客户反馈 */}
      <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div className="container">
          <h2 className="section-title">客户反馈</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {[
              {
                client: '三亚优品电商',
                feedback: '流云智炬科技的AI图片优化服务让我们的产品焕然一新，转化率提升了30%，非常满意！',
                rating: 5
              },
              {
                client: '三亚旅游局',
                feedback: '他们制作的旅游宣传视频质量非常高，在社交媒体上获得了很好的反响，为三亚旅游推广做出了重要贡献。',
                rating: 5
              },
              {
                client: '海南科技集团',
                feedback: '与流云智炬科技合作多年，他们的专业服务和创新能力一直是我们选择他们的原因。',
                rating: 4
              }
            ].map((item, index) => (
              <div key={index} style={{
                padding: '24px',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                backgroundColor: 'white',
                position: 'relative'
              }}>
                <div style={{ fontSize: '2rem', color: 'rgba(22, 93, 255, 0.1)', position: 'absolute', top: '16px', right: '16px' }}>"</div>
                <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>{item.feedback}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '1.5rem' }}>👤</div>
                  <div>
                    <h4 style={{ marginBottom: '4px' }}>{item.client}</h4>
                    <div style={{ color: 'var(--secondary-color)' }}>
                      {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer内容 */}
      <div className="container" style={{ marginTop: '60px' }}>
        <div className="footer-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '40px', marginBottom: '40px' }}>
          {/* 公司信息 */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--primary-color)' }}>流云数字科技</h3>
            <p style={{ marginBottom: '16px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              专注于AI数字人技术、短视频创作、直播运营等数字化服务，为企业提供全方位的数字化解决方案。
            </p>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1rem', color: 'var(--primary-color)' }}>📍</span>
                <span>北京市朝阳区建国门外大街1号</span>
              </p>
              <p style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1rem', color: 'var(--primary-color)' }}>📧</span>
                <span>contact@liuyun-digital.com</span>
              </p>
              <p style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1rem', color: 'var(--primary-color)' }}>📱</span>
                <span>400-123-4567</span>
              </p>
            </div>
          </div>
          
          {/* 企业微信二维码 */}
          <div style={{ textAlign: 'center', minWidth: '200px' }}>
            <h4 style={{ fontSize: '1.125rem', marginBottom: '16px', color: 'var(--primary-color)' }}>企业微信</h4>
            <div style={{ 
              width: '150px', 
              height: '150px', 
              backgroundColor: '#f5f5f5', 
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <span style={{ fontSize: '3rem' }}>📱</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>扫码添加企业微信</p>
          </div>
        </div>
        
        {/* 版权备案信息 */}
        <div className="footer-bottom" style={{ 
          borderTop: '1px solid var(--border-color)', 
          paddingTop: '20px',
          textAlign: 'left'
        }}>
          <div className="footer-copyright" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              © 2024 流云数字科技. 保留所有权利.
            </p>
            <p className="icp-number" style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              京ICP备2024088888号-1
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cases