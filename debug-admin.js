// 管理后台输入框调试脚本
// 在浏览器控制台中运行此脚本来检查输入框状态

function debugAdminInputs() {
    console.log('=== 管理后台输入框调试 ===');
    
    // 查找所有输入框
    const inputs = document.querySelectorAll('input');
    console.log(`找到 ${inputs.length} 个输入框`);
    
    inputs.forEach((input, index) => {
        const rect = input.getBoundingClientRect();
        const styles = window.getComputedStyle(input);
        const computedStyle = {
            display: styles.display,
            visibility: styles.visibility,
            opacity: styles.opacity,
            width: styles.width,
            height: styles.height,
            backgroundColor: styles.backgroundColor,
            color: styles.color,
            border: styles.border,
            zIndex: styles.zIndex
        };
        
        console.log(`输入框 ${index + 1}:`, {
            type: input.type,
            name: input.name,
            placeholder: input.placeholder,
            value: input.value,
            isVisible: rect.width > 0 && rect.height > 0,
            rect: {
                width: rect.width,
                height: rect.height,
                top: rect.top,
                left: rect.left
            },
            styles: computedStyle
        });
    });
    
    // 检查登录表单
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        console.log('登录表单找到:', loginForm);
        const formStyles = window.getComputedStyle(loginForm);
        console.log('表单样式:', {
            display: formStyles.display,
            visibility: formStyles.visibility,
            opacity: formStyles.opacity
        });
    } else {
        console.log('❌ 未找到登录表单');
    }
    
    // 检查登录容器
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer) {
        console.log('登录容器找到:', loginContainer);
        const containerStyles = window.getComputedStyle(loginContainer);
        console.log('容器样式:', {
            display: containerStyles.display,
            visibility: containerStyles.visibility,
            opacity: containerStyles.opacity
        });
    } else {
        console.log('❌ 未找到登录容器');
    }
    
    // 检查是否已登录
    const adminDashboard = document.querySelector('.admin-dashboard');
    if (adminDashboard) {
        console.log('✅ 已登录，显示管理后台');
    } else {
        console.log('🔐 未登录，显示登录表单');
    }
    
    console.log('=== 调试完成 ===');
}

// 自动运行调试
debugAdminInputs();

// 每3秒自动检查一次
setInterval(debugAdminInputs, 3000);

// 手动高亮输入框
function highlightInputs() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.border = '3px solid red';
        input.style.backgroundColor = 'yellow';
        input.style.boxShadow = '0 0 10px red';
    });
    console.log('输入框已高亮显示');
}

// 恢复输入框样式
function unhighlightInputs() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.border = '';
        input.style.backgroundColor = '';
        input.style.boxShadow = '';
    });
    console.log('输入框样式已恢复');
}

// 导出到全局
window.debugAdminInputs = debugAdminInputs;
window.highlightInputs = highlightInputs;
window.unhighlightInputs = unhighlightInputs;

console.log('调试脚本已加载！');
console.log('使用 debugAdminInputs() 检查输入框状态');
console.log('使用 highlightInputs() 高亮显示输入框');
console.log('使用 unhighlightInputs() 恢复输入框样式');