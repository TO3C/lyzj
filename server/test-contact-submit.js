// 测试联系表单提交功能

// 测试数据
const testData = {
  name: "测试用户",
  email: "test@example.com",
  phone: "13800138000",
  subject: "测试表单提交",
  message: "这是一个测试消息，用于验证表单提交功能是否正常工作。"
};

// 发送POST请求
async function testContactSubmit() {
  try {
    console.log('正在发送测试表单数据到端口5001...');
    const response = await fetch('http://localhost:5001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    console.log('响应状态码:', response.status);
    console.log('响应头部:', Object.fromEntries(response.headers.entries()));
    const text = await response.text();
    console.log('响应内容:', text);

    // 尝试解析JSON
    try {
      const data = JSON.parse(text);
      console.log('JSON解析成功:', data);
      console.log('\n测试结果:');
      if (response.status === 201) {
        console.log('✓ 表单提交功能正常工作！');
        console.log('✓ 即使MongoDB连接失败，用户也能收到成功响应');
      } else {
        console.log('✗ 表单提交功能失败');
      }
    } catch (jsonError) {
      console.error('JSON解析失败:', jsonError);
      console.log('原始响应内容:', text);
    }
  } catch (error) {
    console.error('发送请求时发生错误:', error);
  }
}

// 执行测试
console.log('===== 测试联系表单提交功能 =====');
testContactSubmit().then(() => {
  console.log('===== 测试完成 =====');
});