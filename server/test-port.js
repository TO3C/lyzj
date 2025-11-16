import fetch from 'node-fetch';

// 测试不同端口
async function testPorts() {
  try {
    // 测试端口5000
    console.log('测试端口5000...');
    const response5000 = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      }),
      timeout: 3000
    }).catch(err => ({ error: err.message }));
    
    if (response5000.error) {
      console.log('端口5000连接失败:', response5000.error);
    } else {
      console.log('端口5000状态码:', response5000.status);
      console.log('端口5000响应头部:', response5000.headers.raw());
    }
    
    // 测试端口5001
    console.log('\n测试端口5001...');
    const response5001 = await fetch('http://localhost:5001/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      }),
      timeout: 3000
    }).catch(err => ({ error: err.message }));
    
    if (response5001.error) {
      console.log('端口5001连接失败:', response5001.error);
    } else {
      console.log('端口5001状态码:', response5001.status);
      console.log('端口5001响应头部:', response5001.headers.raw());
      const text = await response5001.text();
      console.log('端口5001响应内容:', text);
    }
    
  } catch (error) {
    console.error('测试过程中发生错误:', error);
  }
}

testPorts();