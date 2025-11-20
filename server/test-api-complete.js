#!/usr/bin/env node

/**
 * 联系系统 API 完整测试脚本
 * 测试所有API端点的功能
 */

const API_BASE = 'http://localhost:5001/api/contact';
const ADMIN_API_KEY = 'your-secret-admin-api-key-change-this-in-production';

// 测试数据
const testContactData = {
  name: 'API测试用户',
  email: 'api-test@example.com',
  phone: '13800138000',
  subject: 'API功能测试',
  message: '这是通过API测试脚本提交的联系信息，用于验证系统功能是否正常工作。'
};

// 颜色输出
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function makeRequest(method, endpoint, data = null, requireAuth = false) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json'
  };
  
  if (requireAuth) {
    headers['x-api-key'] = ADMIN_API_KEY;
  }
  
  const options = {
    method,
    headers
  };
  
  if (data && method !== 'GET') {
    options.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    
    return {
      success: response.ok,
      status: response.status,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function runTests() {
  log('\n🚀 开始联系系统API完整测试\n', 'blue');
  
  let passedTests = 0;
  let totalTests = 0;
  
  // 测试1: 提交联系表单
  totalTests++;
  log('📝 测试1: 提交联系表单', 'yellow');
  const submitResult = await makeRequest('POST', '', testContactData);
  if (submitResult.success) {
    log('✅ 联系表单提交成功', 'green');
    log(`   响应: ${submitResult.data.message}`, 'blue');
    passedTests++;
  } else {
    log('❌ 联系表单提交失败', 'red');
    log(`   错误: ${submitResult.data?.message || submitResult.error}`, 'red');
  }
  
  // 测试2: 获取通知状态
  totalTests++;
  log('\n📊 测试2: 获取通知配置状态', 'yellow');
  const statusResult = await makeRequest('GET', '/notification-status', null, true);
  if (statusResult.success) {
    log('✅ 通知状态获取成功', 'green');
    log(`   启用渠道: ${statusResult.data.summary.enabled}/${statusResult.data.summary.total}`, 'blue');
    passedTests++;
  } else {
    log('❌ 通知状态获取失败', 'red');
    log(`   错误: ${statusResult.data?.message || statusResult.error}`, 'red');
  }
  
  // 测试3: 获取联系信息列表
  totalTests++;
  log('\n📋 测试3: 获取联系信息列表', 'yellow');
  const listResult = await makeRequest('GET', '', null, true);
  if (listResult.success) {
    log('✅ 联系信息列表获取成功', 'green');
    log(`   记录数量: ${listResult.data.length}`, 'blue');
    passedTests++;
  } else {
    log('❌ 联系信息列表获取失败', 'red');
    log(`   错误: ${listResult.data?.message || listResult.error}`, 'red');
  }
  
  // 测试4: 测试通知系统
  totalTests++;
  log('\n🔔 测试4: 测试通知系统', 'yellow');
  const testResult = await makeRequest('POST', '/test-notifications', {}, true);
  if (testResult.success) {
    log('✅ 通知系统测试完成', 'green');
    log(`   成功渠道: ${testResult.data.summary.success}/${testResult.data.summary.total}`, 'blue');
    passedTests++;
  } else {
    log('❌ 通知系统测试失败', 'red');
    log(`   错误: ${testResult.data?.message || testResult.error}`, 'red');
  }
  
  // 测试5: 测试输入验证
  totalTests++;
  log('\n🔍 测试5: 输入验证测试', 'yellow');
  const invalidData = {
    name: '测试',
    email: 'invalid-email',
    phone: '123',
    subject: '测试',
    message: '短'
  };
  const validationResult = await makeRequest('POST', '', invalidData);
  if (!validationResult.success && validationResult.status === 400) {
    log('✅ 输入验证正常工作', 'green');
    log(`   验证错误: ${validationResult.data.message}`, 'blue');
    passedTests++;
  } else {
    log('❌ 输入验证可能存在问题', 'red');
  }
  
  // 测试6: 测试API密钥验证
  totalTests++;
  log('\n🔐 测试6: API密钥验证', 'yellow');
  const authResult = await makeRequest('GET', '', null, false);
  if (!authResult.success && authResult.status === 401) {
    log('✅ API密钥验证正常工作', 'green');
    log(`   认证错误: ${authResult.data.message}`, 'blue');
    passedTests++;
  } else {
    log('❌ API密钥验证可能存在问题', 'red');
  }
  
  // 测试结果汇总
  log('\n' + '='.repeat(50), 'blue');
  log('📊 测试结果汇总', 'blue');
  log('='.repeat(50), 'blue');
  log(`总测试数: ${totalTests}`, 'blue');
  log(`通过测试: ${passedTests}`, 'green');
  log(`失败测试: ${totalTests - passedTests}`, 'red');
  log(`成功率: ${((passedTests / totalTests) * 100).toFixed(1)}%`, 
      passedTests === totalTests ? 'green' : 'yellow');
  
  if (passedTests === totalTests) {
    log('\n🎉 所有测试通过！联系系统运行正常！', 'green');
  } else {
    log('\n⚠️  部分测试失败，请检查相关功能。', 'yellow');
  }
  
  log('\n📖 详细API文档请参考: API_USAGE_GUIDE.md', 'blue');
}

// 检查服务器是否运行
async function checkServer() {
  try {
    const response = await fetch(`${API_BASE}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    return response.status !== 0;
  } catch (error) {
    return false;
  }
}

// 主函数
async function main() {
  log('🔍 检查服务器状态...', 'yellow');
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    log('❌ 服务器未运行或无法访问！', 'red');
    log('请确保服务器在 http://localhost:5001 上运行', 'yellow');
    process.exit(1);
  }
  
  log('✅ 服务器运行正常', 'green');
  await runTests();
}

// 运行测试
main().catch(console.error);