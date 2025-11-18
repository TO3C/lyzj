import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// 简化的组件用于测试
const SimpleHome = () => (
  <div style={{ padding: '20px', textAlign: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
    <h1>🚀 流云智炬科技</h1>
    <p>✅ React 应用加载成功！</p>
    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '10px', margin: '20px auto', maxWidth: '600px' }}>
      <h2>📋 系统状态</h2>
      <p>✅ React Router 正常工作</p>
      <p>✅ 组件渲染正常</p>
      <p>✅ CSS 样式正常加载</p>
      <p>✅ JavaScript 正常执行</p>
    </div>
    <div style={{ marginTop: '40px' }}>
      <a href="/lyzj/services" style={{ background: '#ff6b6b', color: 'white', padding: '15px 30px', textDecoration: 'none', borderRadius: '25px', margin: '10px', display: 'inline-block' }}>
        🛠️ 服务页面
      </a>
      <a href="/lyzj/contact" style={{ background: '#4ecdc4', color: 'white', padding: '15px 30px', textDecoration: 'none', borderRadius: '25px', margin: '10px', display: 'inline-block' }}>
        📞 联系我们
      </a>
    </div>
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '5px', fontSize: '12px' }}>
      当前时间: {new Date().toLocaleString('zh-CN')}
    </div>
  </div>
)

const SimpleServices = () => (
  <div style={{ padding: '20px', textAlign: 'center', minHeight: '100vh', background: '#f5f5f5' }}>
    <h1>🛠️ 服务页面</h1>
    <p>这是服务页面，React Router 正常工作！</p>
    <a href="/lyzj/" style={{ background: '#007bff', color: 'white', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px' }}>
      ← 返回首页
    </a>
  </div>
)

const SimpleContact = () => (
  <div style={{ padding: '20px', textAlign: 'center', minHeight: '100vh', background: '#e8f5e8' }}>
    <h1>📞 联系我们</h1>
    <p>这是联系页面，React Router 正常工作！</p>
    <a href="/lyzj/" style={{ background: '#28a745', color: 'white', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px' }}>
      ← 返回首页
    </a>
  </div>
)

function App() {
  console.log('🚀 App 组件开始渲染')
  
  return (
    <Router basename="/lyzj">
      <div className="app">
        <Routes>
          <Route path="/" element={<SimpleHome />} />
          <Route path="/services" element={<SimpleServices />} />
          <Route path="/contact" element={<SimpleContact />} />
          <Route path="*" element={<SimpleHome />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App