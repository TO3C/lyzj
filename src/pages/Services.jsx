import React, { useState } from 'react'

const Services = () => {
  const [activeTab, setActiveTab] = useState(0)
  
  // 业务板块数据
  const serviceTabs = [
    { id: 'insurance', name: '保险业务' },
    { id: 'travel', name: '旅游服务' },
    { id: 'business', name: '营业厅服务' },
    { id: 'ai-image', name: 'AI电商图片' },
    { id: 'ai-video', name: 'AI视频创作' },
    { id: 'tech-support', name: '技术支持' }
  ]
  
  // 保险产品数据
  const insuranceProducts = [
    { name: '旅游保险', description: '提供旅行期间的医疗、行李、航班延误等保障', price: '¥50起/天' },
    { name: '健康保险', description: '全面的健康保障计划，包括门诊、住院、手术等', price: '¥300起/月' },
    { name: '意外保险', description: '针对各类意外事故提供的保障方案', price: '¥100起/月' },
    { name: '财产保险', description: '保护您的财产安全，包括房屋、车辆等', price: '¥500起/年' }
  ]
  
  // 四大运营商数据
  const operators = [
    { name: '中国移动', icon: '📱' },
    { name: '中国电信', icon: '📞' },
    { name: '中国联通', icon: '📲' },
    { name: '中国广电', icon: '📡' }
  ]
  
  // 办卡套餐数据
  const phonePlans = [
    { name: '畅享套餐', data: '100GB', voice: '300分钟', price: '¥98/月' },
    { name: '青春套餐', data: '50GB', voice: '200分钟', price: '¥58/月' },
    { name: '商务套餐', data: '200GB', voice: '1000分钟', price: '¥198/月' }
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
            业务服务
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
            我们提供全方位的科技服务解决方案，满足您的多样化需求
          </p>
        </div>
      </section>
      
      {/* 业务板块选项卡 */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          {/* 选项卡导航 */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '40px',
            justifyContent: 'center'
          }}>
            {serviceTabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                style={{
                  padding: '10px 24px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '25px',
                  backgroundColor: activeTab === index ? 'var(--primary-color)' : 'white',
                  color: activeTab === index ? 'white' : 'var(--text-color)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== index) {
                    e.target.style.backgroundColor = 'var(--light-gray)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== index) {
                    e.target.style.backgroundColor = 'white'
                  }
                }}
              >
                {tab.name}
              </button>
            ))}
          </div>
          
          {/* 选项卡内容 */}
          <div className="service-content">
            {/* 保险业务板块 */}
            {activeTab === 0 && (
              <div style={{ animation: 'fadeInUp 0.5s ease' }}>
                <div style={{ display: 'flex', flexDirection: 'column', md: 'row', gap: '40px' }}>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: 'var(--primary-color)' }}>
                      保险业务
                    </h2>
                    <p style={{ marginBottom: '24px', fontSize: '1.05rem' }}>
                      我们与多家知名保险公司合作，为您提供全面的保险产品和专业的咨询服务。
                      无论是个人还是企业，我们都能为您量身定制最适合的保险方案，让您的生活和事业更加安心。
                    </p>
                    <div style={{ marginBottom: '32px' }}>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>为什么选择我们的保险服务？</h3>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {[
                          '专业的保险顾问团队，提供一对一咨询',
                          '多家保险公司产品对比，为您选择最优方案',
                          '便捷的理赔服务，让您无后顾之忧',
                          '定期的保单检视，确保您的保障始终适合您的需求'
                        ].map((item, index) => (
                          <li key={index} style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <span style={{ fontSize: '1.25rem', color: 'var(--secondary-color)' }}>✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button className="btn btn-secondary">
                      在线咨询保险专家
                    </button>
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>保险产品分类</h3>
                    <div style={{ display: 'grid', gap: '16px' }}>
                      {insuranceProducts.map((product, index) => (
                        <div key={index} style={{
                          padding: '20px',
                          border: '1px solid var(--border-color)',
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          transition: 'box-shadow 0.3s ease'
                        }} onMouseEnter={(e) => {
                          e.target.style.boxShadow = 'var(--shadow-md)'
                        }} onMouseLeave={(e) => {
                          e.target.style.boxShadow = 'none'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <h4 style={{ fontSize: '1.125rem', fontWeight: '600' }}>{product.name}</h4>
                            <span style={{ color: 'var(--secondary-color)', fontWeight: '600' }}>{product.price}</span>
                          </div>
                          <p style={{ color: 'var(--text-secondary)' }}>{product.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* 旅游服务板块 */}
            {activeTab === 1 && (
              <div style={{ animation: 'fadeInUp 0.5s ease' }}>
                <div style={{ display: 'flex', flexDirection: 'column', md: 'row', gap: '40px' }}>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: 'var(--primary-color)' }}>
                      旅游服务
                    </h2>
                    <p style={{ marginBottom: '24px', fontSize: '1.05rem' }}>
                      作为三亚本地的科技服务商，我们为您提供全方位的旅游服务解决方案。
                      无论您是个人游客还是团队出行，我们都能为您打造难忘的三亚之旅。
                    </p>
                    <div style={{ marginBottom: '32px' }}>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>我们的旅游服务</h3>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {[
                          '酒店预订：与三亚多家知名酒店合作，提供优惠价格',
                          '景点门票：一站式预订三亚各大景点门票，无需排队',
                          '旅游路线：专业定制旅游路线，满足您的个性化需求',
                          '接送服务：提供机场、车站接送服务，便捷舒适'
                        ].map((item, index) => (
                          <li key={index} style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <span style={{ fontSize: '1.25rem', color: 'var(--secondary-color)' }}>✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <button className="btn btn-primary">
                        酒店预订
                      </button>
                      <button className="btn btn-outline">
                        景点门票
                      </button>
                      <button className="btn btn-outline">
                        路线推荐
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ height: '300px', backgroundColor: 'var(--light-gray)', borderRadius: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>🏖️ 三亚旅游景点展示</span>
                    </div>
                    <div style={{ padding: '20px', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'rgba(255, 125, 0, 0.05)' }}>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--secondary-color)' }}>特别推荐</h3>
                      <p style={{ marginBottom: '16px' }}>三亚五天四晚豪华游</p>
                      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '16px' }}>
                        {[
                          '入住五星级酒店海景房',
                          '畅游蜈支洲岛、亚龙湾等知名景点',
                          '品尝地道海南美食',
                          '专业导游全程陪同'
                        ].map((item, index) => (
                          <li key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1rem', color: 'var(--secondary-color)' }}>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--secondary-color)' }}>¥3980/人起</span>
                        <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                          立即预订
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* 营业厅服务板块 */}
            {activeTab === 2 && (
              <div style={{ animation: 'fadeInUp 0.5s ease' }}>
                <div style={{ display: 'flex', flexDirection: 'column', md: 'row', gap: '40px' }}>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: 'var(--primary-color)' }}>
                      营业厅服务
                    </h2>
                    <p style={{ marginBottom: '24px', fontSize: '1.05rem' }}>
                      我们与四大运营商合作，为您提供便捷的通信服务。无论是新办卡、套餐升级还是其他业务，
                      都可以通过我们的线上平台或线下营业厅快速办理。
                    </p>
                    
                    <div style={{ marginBottom: '32px' }}>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>合作运营商</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                        {operators.map((operator, index) => (
                          <div key={index} style={{
                            padding: '16px',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '1.125rem'
                          }}>
                            <span style={{ fontSize: '1.5rem' }}>{operator.icon}</span>
                            <span>{operator.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button className="btn btn-primary">
                      在线预约办理
                    </button>
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>办卡套餐对比</h3>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ backgroundColor: 'var(--light-gray)' }}>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>套餐名称</th>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>流量</th>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>通话</th>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>月费用</th>
                          </tr>
                        </thead>
                        <tbody>
                          {phonePlans.map((plan, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid var(--border-color)' }}>
                              <td style={{ padding: '12px' }}>{plan.name}</td>
                              <td style={{ padding: '12px' }}>{plan.data}</td>
                              <td style={{ padding: '12px' }}>{plan.voice}</td>
                              <td style={{ padding: '12px', fontWeight: '600', color: 'var(--secondary-color)' }}>{plan.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div style={{ marginTop: '24px', padding: '20px', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'rgba(22, 93, 255, 0.05)' }}>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--primary-color)' }}>温馨提示</h3>
                      <p style={{ marginBottom: '8px' }}>• 所有套餐均包含全国漫游，无长途费</p>
                      <p style={{ marginBottom: '8px' }}>• 新用户办卡可享首月半价优惠</p>
                      <p>• 老用户升级套餐可获赠10GB额外流量</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* AI电商图片板块 */}
            {activeTab === 3 && (
              <div style={{ animation: 'fadeInUp 0.5s ease' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '32px', color: 'var(--primary-color)' }}>
                  AI电商图片
                </h2>
                
                {/* 前后对比案例 */}
                <div style={{ marginBottom: '60px' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>前后对比案例展示</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                    {[
                      { title: '产品主图优化', before: '原始图片', after: 'AI优化后' },
                      { title: '场景合成', before: '单一产品', after: '场景化展示' },
                      { title: '背景替换', before: '杂乱背景', after: '专业背景' }
                    ].map((example, index) => (
                      <div key={index} style={{
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        backgroundColor: 'white'
                      }}>
                        <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--light-gray)' }}>
                          <h4 style={{ fontSize: '1.125rem', fontWeight: '600' }}>{example.title}</h4>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', backgroundColor: 'var(--border-color)' }}>
                          <div style={{ padding: '16px', backgroundColor: 'white', textAlign: 'center' }}>
                            <div style={{ height: '180px', backgroundColor: '#f5f5f5', borderRadius: '4px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ color: 'var(--text-secondary)' }}>{example.before}</span>
                            </div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>原始图片</p>
                          </div>
                          <div style={{ padding: '16px', backgroundColor: 'white', textAlign: 'center' }}>
                            <div style={{ height: '180px', backgroundColor: '#f5f5f5', borderRadius: '4px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ color: 'var(--text-secondary)' }}>{example.after}</span>
                            </div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--secondary-color)', fontWeight: '600' }}>AI优化后</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 服务流程时间轴 */}
                <div style={{ marginBottom: '60px' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '32px' }}>服务流程</h3>
                  <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
                    {/* 时间轴线 */}
                    <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '0', bottom: '0', width: '2px', backgroundColor: 'var(--border-color)' }}></div>
                    
                    {/* 流程步骤 */}
                    {[
                      { title: '需求沟通', description: '了解您的具体需求和期望效果' },
                      { title: '素材准备', description: '您提供原始素材，我们进行筛选和整理' },
                      { title: 'AI生成', description: '利用先进的AI技术生成高质量图片' },
                      { title: '效果调整', description: '根据您的反馈进行调整和优化' },
                      { title: '交付成果', description: '提供最终的高清图片文件' }
                    ].map((step, index) => (
                      <div key={index} style={{
                        position: 'relative',
                        marginBottom: '48px',
                        paddingLeft: index % 2 === 0 ? '0' : 'calc(50% + 32px)',
                        paddingRight: index % 2 === 0 ? 'calc(50% + 32px)' : '0',
                        textAlign: index % 2 === 0 ? 'right' : 'left'
                      }}>
                        {/* 时间点 */}
                        <div style={{
                          position: 'absolute',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          top: '0',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--primary-color)',
                          border: '4px solid white',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}></div>
                        
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{step.title}</h4>
                        <p style={{ color: 'var(--text-secondary)' }}>{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 在线报价表单 */}
                <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'white' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', textAlign: 'center' }}>在线报价</h3>
                  <form>
                    <div className="form-group">
                      <label className="form-label">图片数量</label>
                      <input type="number" className="form-input" placeholder="请输入需要处理的图片数量" min="1" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">图片类型</label>
                      <select className="form-input">
                        <option value="">请选择图片类型</option>
                        <option value="product">产品主图</option>
                        <option value="detail">详情页图片</option>
                        <option value="scene">场景合成</option>
                        <option value="other">其他类型</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">特殊要求</label>
                      <textarea className="form-textarea" placeholder="请描述您的特殊需求（如有）"></textarea>
                    </div>
                    <div className="form-group">
                      <label className="form-label">联系方式</label>
                      <input type="text" className="form-input" placeholder="请留下您的手机号或邮箱" />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                      获取报价
                    </button>
                  </form>
                </div>
              </div>
            )}
            
            {/* AI视频创作板块 */}
            {activeTab === 4 && (
              <div style={{ animation: 'fadeInUp 0.5s ease' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '32px', color: 'var(--primary-color)' }}>
                  AI视频创作
                </h2>
                
                {/* 作品展示视频墙 */}
                <div style={{ marginBottom: '60px' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>作品展示视频墙</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                    {[
                      { title: '产品宣传片', duration: '01:30' },
                      { title: '品牌故事', duration: '02:15' },
                      { title: '活动推广视频', duration: '01:45' },
                      { title: '产品功能演示', duration: '02:30' },
                      { title: '客户见证', duration: '03:10' },
                      { title: '企业形象片', duration: '03:45' }
                    ].map((video, index) => (
                      <div key={index} style={{
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
                        <div style={{ position: 'relative', height: '180px', backgroundColor: '#f5f5f5' }}>
                          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '3rem' }}>▶</div>
                          <div style={{ position: 'absolute', bottom: '8px', right: '8px', backgroundColor: 'rgba(0, 0, 0, 0.6)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>{video.duration}</div>
                        </div>
                        <div style={{ padding: '16px' }}>
                          <h4 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>{video.title}</h4>
                          <button className="btn btn-outline" style={{ padding: '6px 16px', fontSize: '0.875rem' }}>
                            播放预览
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 创作流程说明 */}
                <div style={{ marginBottom: '60px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', textAlign: 'center' }}>创作流程</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                    {[
                      { number: '01', title: '需求分析', description: '深入了解客户需求和目标受众' },
                      { number: '02', title: '脚本策划', description: '专业团队编写创意脚本和分镜' },
                      { number: '03', title: 'AI生成', description: '利用AI技术生成视频素材和特效' },
                      { number: '04', title: '后期制作', description: '专业剪辑师进行精细后期制作' },
                      { number: '05', title: '审核修改', description: '客户审核并进行必要的修改调整' },
                      { number: '06', title: '交付使用', description: '提供最终成品及所需格式文件' }
                    ].map((step, index) => (
                      <div key={index} style={{
                        textAlign: 'center',
                        padding: '20px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        backgroundColor: 'white'
                      }}>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-color)', marginBottom: '12px' }}>{step.number}</div>
                        <h4 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>{step.title}</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 案例效果展示 */}
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', textAlign: 'center' }}>案例效果展示</h3>
                  <div style={{ padding: '24px', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'rgba(22, 93, 255, 0.05)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'center' }}>
                      <div style={{ order: 2, md: 1 }}>
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--primary-color)' }}>某电商平台产品视频案例</h4>
                        <p style={{ marginBottom: '16px' }}>通过AI视频创作技术，我们为客户打造了极具吸引力的产品宣传视频，
                        帮助产品在短时间内获得了大量关注和销售增长。</p>
                        <div style={{ marginBottom: '24px' }}>
                          <h5 style={{ marginBottom: '8px' }}>项目成果：</h5>
                          <ul style={{ listStyle: 'none', padding: 0 }}>
                            {[
                              '视频播放量提升300%',
                              '产品转化率提升45%',
                              '品牌知名度显著提高',
                              '营销成本降低50%'
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
                      <div style={{ order: 1, md: 2 }}>
                        <div style={{ height: '300px', backgroundColor: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '2rem' }}>🎬 视频预览</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* 技术支持板块 */}
            {activeTab === 5 && (
              <div style={{ animation: 'fadeInUp 0.5s ease' }}>
                <div style={{ display: 'flex', flexDirection: 'column', md: 'row', gap: '40px' }}>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: 'var(--primary-color)' }}>
                      技术支持
                    </h2>
                    <p style={{ marginBottom: '24px', fontSize: '1.05rem' }}>
                      我们拥有一支专业的技术支持团队，为您提供全方位的技术支持和咨询服务。
                      无论是系统故障、技术难题还是业务咨询，我们都能为您提供及时、有效的解决方案。
                    </p>
                    
                    <div style={{ marginBottom: '32px' }}>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>我们的技术支持服务</h3>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {[
                          '7×24小时技术支持热线',
                          '远程协助和故障排除',
                          '系统升级和维护',
                          '技术培训和咨询',
                          '定制化技术解决方案'
                        ].map((item, index) => (
                          <li key={index} style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <span style={{ fontSize: '1.25rem', color: 'var(--secondary-color)' }}>✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div style={{ marginBottom: '32px' }}>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>支持方式</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                        {[
                          { name: '在线客服', icon: '💬', time: '工作时间在线' },
                          { name: '电话支持', icon: '📞', time: '7×24小时服务' },
                          { name: '邮件支持', icon: '✉️', time: '24小时内回复' },
                          { name: '远程协助', icon: '🖥️', time: '预约服务' }
                        ].map((method, index) => (
                          <div key={index} style={{
                            padding: '16px',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                          }}>
                            <span style={{ fontSize: '1.5rem' }}>{method.icon}</span>
                            <div>
                              <h4 style={{ fontSize: '1.125rem', marginBottom: '4px' }}>{method.name}</h4>
                              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{method.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button className="btn btn-primary">
                      获取技术支持
                    </button>
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ padding: '24px', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'white', marginBottom: '24px' }}>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>常见问题</h3>
                      <div style={{ display: 'grid', gap: '16px' }}>
                        {[
                          { question: '如何申请技术支持？', answer: '您可以通过在线客服、电话、邮件等方式联系我们，我们会尽快为您提供帮助。' },
                          { question: '远程协助需要准备什么？', answer: '请确保您的设备已连接网络，并准备好相关的问题描述和截图。' },
                          { question: '技术支持是否收费？', answer: '基础技术支持是免费的，复杂的定制化服务可能需要收取相应费用。' },
                          { question: '响应时间是多久？', answer: '我们会在接到请求后的30分钟内响应，紧急问题会优先处理。' }
                        ].map((faq, index) => (
                          <div key={index}>
                            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '8px', color: 'var(--primary-color)' }}>{faq.question}</h4>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.95rem' }}>{faq.answer}</p>
                            {index < 3 && <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }}></div>}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div style={{ padding: '24px', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'rgba(255, 125, 0, 0.05)' }}>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--secondary-color)' }}>紧急支持</h3>
                      <p style={{ marginBottom: '16px' }}>如果您遇到紧急技术问题，请立即联系我们的紧急支持热线：</p>
                      <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--secondary-color)', marginBottom: '16px' }}>138 8888 8888</div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>我们的技术专家会在最短的时间内为您解决问题</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services