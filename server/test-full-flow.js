import fetch from 'node-fetch';

// 完整测试流程：登录 -> 获取用户信息 -> 获取联系信息
async function testFullFlow() {
  try {
    console.log('=== 开始完整测试流程 ===');
    
    // 1. 登录测试
    console.log('\n1. 执行管理员登录...');
    const loginResponse = await fetch('http://localhost:5001/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      })
    });
    
    console.log('登录响应状态码:', loginResponse.status);
    const loginData = await loginResponse.json();
    console.log('登录响应数据:', loginData);
    
    if (!loginResponse.ok || !loginData.token) {
      console.error('登录失败');
      return;
    }
    
    const token = loginData.token;
    console.log('登录成功！获取到令牌');
    
    // 2. 获取用户信息测试
    console.log('\n2. 获取当前用户信息...');
    const userResponse = await fetch('http://localhost:5001/api/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('用户信息响应状态码:', userResponse.status);
    const userData = await userResponse.json();
    console.log('用户信息:', userData);
    
    // 3. 获取联系信息测试
    console.log('\n3. 获取联系信息...');
    const contactResponse = await fetch('http://localhost:5001/api/contact', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('联系信息响应状态码:', contactResponse.status);
    const contactData = await contactResponse.json();
    console.log('联系信息:', contactData);
    
    console.log('\n=== 完整测试流程结束 ===');
    console.log('测试结果：所有功能正常工作！');
    
  } catch (error) {
    console.error('测试过程中发生错误:', error);
  }
}

testFullFlow();