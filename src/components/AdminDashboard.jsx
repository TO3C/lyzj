import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  // API密钥常量
  const API_KEY = 'your-secret-admin-api-key-change-this-in-production';

  // 检查登录状态
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchContacts();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:5001/api/contact/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginForm.username,
          password: loginForm.password
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setIsLoggedIn(true);
        localStorage.setItem('adminToken', data.token);
        fetchContacts(); // 登录成功后获取联系信息
      } else {
        setError(data.message || '登录失败');
      }
    } catch (error) {
      console.error('登录错误:', error);
      setError('登录时发生错误，请检查网络连接');
    }
  };

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5001/api/contact', {
        headers: {
          'x-api-key': API_KEY
        }
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data);
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || '获取联系信息失败');
      }
    } catch (error) {
      console.error('获取联系信息错误:', error);
      setError('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('确定要删除这条联系信息吗？')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/contact/${id}`, {
        method: 'DELETE',
        headers: {
          'x-api-key': API_KEY
        }
      });

      if (response.ok) {
        setContacts(contacts.filter(contact => contact._id !== id));
        if (selectedContact?._id === id) {
          setSelectedContact(null);
        }
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || '删除失败');
      }
    } catch (error) {
      console.error('删除错误:', error);
      setError('删除失败，请稍后重试');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setContacts([]);
    setSelectedContact(null);
    setError('');
  };

  const handleExportJSON = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/contact/export', {
        headers: {
          'x-api-key': API_KEY
        }
      });

      if (response.ok) {
        const data = await response.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `contact-submissions-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const errorData = await response.json();
        setError(errorData.message || '导出失败');
      }
    } catch (error) {
      console.error('导出错误:', error);
      setError('导出失败，请稍后重试');
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/contact/export/csv', {
        headers: {
          'x-api-key': API_KEY
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `contact-submissions-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'CSV导出失败');
      }
    } catch (error) {
      console.error('CSV导出错误:', error);
      setError('CSV导出失败，请稍后重试');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h2>管理员登录</h2>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>用户名</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>密码</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="login-btn">登录</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>联系信息管理</h1>
        <div className="header-actions">
          <button onClick={fetchContacts} className="refresh-btn">
            刷新
          </button>
          <div className="dashboard-actions">
            <button className="export-btn" onClick={handleExportJSON}>
              导出JSON
            </button>
            <button className="export-btn" onClick={handleExportCSV}>
              导出CSV
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              退出登录
            </button>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-content">
        <div className="contacts-list">
          <h3>联系信息列表 ({contacts.length})</h3>
          {loading ? (
            <div className="loading">加载中...</div>
          ) : (
            <div className="contacts-grid">
              {contacts.map(contact => (
                <div 
                  key={contact._id} 
                  className={`contact-card ${selectedContact?._id === contact._id ? 'selected' : ''}`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="contact-header">
                    <h4>{contact.name}</h4>
                    <span className="contact-date">{formatDate(contact.createdAt)}</span>
                  </div>
                  <div className="contact-info">
                    <p><strong>邮箱:</strong> {contact.email}</p>
                    <p><strong>电话:</strong> {contact.phone}</p>
                    <p><strong>主题:</strong> {contact.subject}</p>
                  </div>
                  <div className="contact-actions">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(contact._id);
                      }}
                      className="delete-btn"
                    >
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedContact && (
          <div className="contact-detail">
            <h3>详细信息</h3>
            <div className="detail-content">
              <div className="detail-item">
                <label>姓名:</label>
                <span>{selectedContact.name}</span>
              </div>
              <div className="detail-item">
                <label>邮箱:</label>
                <span>{selectedContact.email}</span>
              </div>
              <div className="detail-item">
                <label>电话:</label>
                <span>{selectedContact.phone}</span>
              </div>
              <div className="detail-item">
                <label>主题:</label>
                <span>{selectedContact.subject}</span>
              </div>
              <div className="detail-item">
                <label>留言内容:</label>
                <p className="message-content">{selectedContact.message}</p>
              </div>
              <div className="detail-item">
                <label>提交时间:</label>
                <span>{formatDate(selectedContact.createdAt)}</span>
              </div>
              <div className="detail-actions">
                <button 
                  onClick={() => window.open(`mailto:${selectedContact.email}`)}
                  className="email-btn"
                >
                  发送邮件
                </button>
                <button 
                  onClick={() => handleDelete(selectedContact._id)}
                  className="delete-btn"
                >
                  删除
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;