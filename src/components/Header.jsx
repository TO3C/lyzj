import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  
  // 检查当前路由是否匹配
  const isActive = (path) => {
    return location.pathname === path
  }
  
  // 导航链接数据
  const navLinks = [
    { label: '首页', path: '/' },
    { label: '业务服务', path: '/services' },
    { label: '案例展示', path: '/cases' }
  ]

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <span style={{ fontSize: '1.5rem', marginRight: '4px' }}>☁️</span>
          <span>流云智炬科技</span>
        </Link>
        
        {/* 移动端菜单按钮 */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? '✕' : '☰'}
        </button>
        
        {/* 桌面端导航 */}
        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header