import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 检查用户是否已登录
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // 验证令牌并获取用户信息
      fetchUserProfile(token);
    }
  }, []);

  // 获取用户信息
  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setShowLogin(false);
        fetchContacts(token);
      } else {
        // 令牌无效或已过期
        localStorage.removeItem('token');
        setShowLogin(true);
      }
    } catch (error) {
      console.error('获取用户信息失败', error);
      setShowLogin(true);
    }
  };

  // 登录处理
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data);
        setShowLogin(false);
        fetchContacts(data.token);
      } else {
        setError(data.message || '登录失败');
      }
    } catch (error) {
      console.error('登录时发生错误', error);
      setError('登录时发生错误，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  // 获取所有联系信息
  const fetchContacts = async (token) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/contact', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || '获取联系信息失败');
      }
    } catch (error) {
      console.error('获取联系信息时发生错误', error);
      setError('获取联系信息时发生错误，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  // 删除联系信息
  const deleteContact = async (id, token) => {
    if (!window.confirm('确定要删除这条联系信息吗？')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        // 删除成功后更新列表
        setContacts(contacts.filter(contact => contact._id !== id));
      } else {
        const errorData = await response.json();
        setError(errorData.message || '删除联系信息失败');
      }
    } catch (error) {
      console.error('删除联系信息时发生错误', error);
      setError('删除联系信息时发生错误，请稍后再试');
    }
  };

  // 登出处理
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setContacts([]);
    setShowLogin(true);
    navigate('/');
  };

  // 导出：JSON
  const handleExportJSON = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/contact/export', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err.message || '导出失败');
        return;
      }
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contact-export-${new Date().toISOString().slice(0,10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('导出JSON失败', e);
      setError('导出JSON失败');
    }
  };

  // 导出：CSV
  const handleExportCSV = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/contact/export/csv', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        const errText = await res.text();
        setError('导出CSV失败: ' + errText);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contact-submissions-${new Date().toISOString().slice(0,10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('导出CSV失败', e);
      setError('导出CSV失败');
    }
  };
  // 处理输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  if (showLogin) {
    return (
      <div className="admin-login-container">
        <h2>管理员登录</h2>
        <div className="login-instructions">
          <p><strong>临时账号信息:</strong></p>
          <p>用户名: admin</p>
          <p>密码: admin123</p>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              id="username"
              name="username"
              value={loginData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>管理员控制台</h1>
        <button onClick={handleLogout} className="logout-button">登出</button>
      </header>
      
      <div className="dashboard-content">
        <h2>客户咨询信息</h2>

        <div style={{ margin: '12px 0', display: 'flex', gap: '8px' }}>
          <button onClick={handleExportJSON}>导出JSON</button>
          <button onClick={handleExportCSV}>导出CSV</button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <div className="loading">加载中...</div>
        ) : (
          <table className="contacts-table">
            <thead>
              <tr>
                <th>姓名</th>
                <th>邮箱</th>
                <th>电话</th>
                <th>主题</th>
                <th>提交时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-data">暂无联系信息</td>
                </tr>
              ) : (
                contacts.map(contact => (
                  <tr key={contact._id}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.subject}</td>
                    <td>{new Date(contact.createdAt).toLocaleString()}</td>
                    <td>
                      <button
                        onClick={() => deleteContact(contact._id, localStorage.getItem('token'))}
                        className="delete-button"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;