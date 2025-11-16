import fetch from 'node-fetch';

// 测试登录功能 - 打印原始响应
async function testLogin() {
  try {
    console.log('正在发送登录请求到端口5001...');
    const response = await fetch('http://localhost:5001/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      })
    });
    
    console.log('登录响应状态码:', response.status);
    console.log('登录响应头部:', response.headers.raw());
    
    // 直接读取文本而不是JSON
    const rawText = await response.text();
    console.log('登录响应原始文本长度:', rawText.length);
    console.log('登录响应原始文本内容:', rawText);
    
    // 尝试检查是否是有效的JSON
    try {
      if (rawText.trim()) {
        const data = JSON.parse(rawText);
        console.log('成功解析JSON:', data);
      }
    } catch (jsonError) {
      console.log('无法解析为JSON:', jsonError.message);
    }
  } catch (error) {
    console.error('测试过程中发生错误:', error);
  }
}

testLogin();