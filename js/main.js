// 导航菜单交互
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('opacity-0');
        mobileMenu.classList.toggle('opacity-100');
        mobileMenu.classList.toggle('scale-y-0');
        mobileMenu.classList.toggle('scale-y-100');
    });
}

// 点击菜单外部关闭菜单
document.addEventListener('click', (e) => {
    if (mobileMenu && !mobileMenu.classList.contains('hidden') && 
        menuBtn && !menuBtn.contains(e.target) && 
        !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.add('opacity-0');
        mobileMenu.classList.remove('opacity-100');
        mobileMenu.classList.add('scale-y-0');
        mobileMenu.classList.remove('scale-y-100');
    }
});

// 滚动动画 - 元素进入视口时触发
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// 页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    // 观察所有带有scroll-animate类的元素
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});



// 表单验证
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            // 基本验证
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                } else {
                    input.classList.remove('border-red-500');
                }
            });
            
            // 如果验证失败，阻止提交
            if (!isValid) {
                e.preventDefault();
                
                // 显示错误消息 - 支持不同表单的消息元素
                const messageDiv = form.querySelector('#form-message, #quick-form-message');
                if (messageDiv) {
                    messageDiv.textContent = '请填写所有必填字段';
                    messageDiv.className = 'block p-3 rounded-lg text-center message error';
                }
            }
        });
        
        // 输入时移除错误样式
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('border-red-500');
                
                // 清除错误消息 - 支持不同表单的消息元素
                const messageDiv = form.querySelector('#form-message, #quick-form-message');
                if (messageDiv && messageDiv.classList.contains('error')) {
                    messageDiv.className = 'hidden p-3 rounded-lg text-center';
                }
            });
        });
    });
});

// 添加鼠标跟随效果（可选）
/*
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});
*/