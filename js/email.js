// EmailJS配置
// 注意：实际使用时需要替换为您自己的EmailJS公钥、服务ID和模板ID
// 您可以在EmailJS控制台获取这些值：https://dashboard.emailjs.com/admin
const EMAILJS_PUBLIC_KEY = 'SF1gQ4b50a6Q4Z9OX'; // 用户提供的EmailJS公钥
const EMAILJS_SERVICE_ID = 'service_pic12wf'; // 用户提供的EmailJS服务ID
const EMAILJS_TEMPLATE_ID = 'template_j4ddbl6'; // 用户提供的EmailJS模板ID

// 初始化EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// 表单提交处理
function handleFormSubmit(form, submitBtn, btnText, btnLoading, formMessage) {
    return (e) => {
        e.preventDefault();
        
        // 显示加载状态
        if (submitBtn) submitBtn.disabled = true;
        if (btnText) btnText.textContent = '提交中...';
        if (btnLoading) btnLoading.classList.remove('hidden');
        if (formMessage) {
            formMessage.className = 'hidden p-3 rounded-lg text-center';
        }
        
        // 获取表单数据
        const formData = new FormData(form);
        
        // 根据表单ID调整模板参数
        const templateParams = {
            name: formData.get('name') || '客户预留信息',
            phone: formData.get('phone'),
            email: formData.get('email'),
            service: formData.get('service') || '客户预留信息',
            message: formData.get('message')
        };
        
        // 发送邮件
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then((response) => {
                console.log('邮件发送成功:', response);
                
                // 显示成功消息
                if (formMessage) {
                    formMessage.textContent = '信息提交成功！我们将尽快与您联系。';
                    formMessage.className = 'block p-4 rounded-2xl text-center font-medium bg-green-500/20 text-green-200 border border-green-500/30';
                }
                
                // 重置表单
                form.reset();
            }, (error) => {
                console.error('邮件发送失败:', error);
                
                // 显示错误消息
                if (formMessage) {
                    formMessage.textContent = '信息提交失败，请稍后重试或直接联系我们。';
                    formMessage.className = 'block p-4 rounded-2xl text-center font-medium bg-red-500/20 text-red-200 border border-red-500/30';
                }
            })
            .finally(() => {
                // 恢复按钮状态
                if (submitBtn) submitBtn.disabled = false;
                if (btnText) btnText.textContent = '📤 提交信息';
                if (btnLoading) btnLoading.classList.add('hidden');
            });
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // 处理主联系表单
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const submitBtn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const btnLoading = document.getElementById('btn-loading');
        const formMessage = document.getElementById('form-message');
        
        contactForm.addEventListener('submit', handleFormSubmit(contactForm, submitBtn, btnText, btnLoading, formMessage));
    }
    
    // 处理快速联系表单
    const quickContactForm = document.getElementById('quick-contact-form');
    if (quickContactForm) {
        const submitBtn = quickContactForm.querySelector('button[type="submit"]');
        const btnText = document.getElementById('quick-btn-text');
        const btnLoading = document.getElementById('quick-btn-loading');
        const formMessage = document.getElementById('quick-form-message');
        
        quickContactForm.addEventListener('submit', handleFormSubmit(quickContactForm, submitBtn, btnText, btnLoading, formMessage));
    }
});

// 表单验证增强
document.addEventListener('DOMContentLoaded', () => {
    // 表单验证配置
    const formsConfig = [
        {
            formId: 'contact-form',
            phoneId: 'phone',
            emailId: 'email',
            messageId: 'form-message'
        },
        {
            formId: 'quick-contact-form',
            phoneId: 'quick-phone',
            emailId: 'quick-email',
            messageId: 'quick-form-message'
        }
    ];
    
    formsConfig.forEach(config => {
        const form = document.getElementById(config.formId);
        if (!form) return;
        
        const phoneInput = document.getElementById(config.phoneId);
        const emailInput = document.getElementById(config.emailId);
        
        // 电话号码验证
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                const phoneRegex = /^1[3-9]\d{9}$/;
                const phoneValue = e.target.value;
                
                if (phoneValue && !phoneRegex.test(phoneValue)) {
                    e.target.classList.add('border-red-500');
                } else {
                    e.target.classList.remove('border-red-500');
                }
            });
        }
        
        // 邮箱验证
        if (emailInput) {
            emailInput.addEventListener('input', (e) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const emailValue = e.target.value;
                
                if (emailValue && !emailRegex.test(emailValue)) {
                    e.target.classList.add('border-red-500');
                } else {
                    e.target.classList.remove('border-red-500');
                }
            });
        }
        
        // 表单提交前的最终验证
        form.addEventListener('submit', (e) => {
            let isValid = true;
            
            // 电话号码验证
            if (phoneInput) {
                const phoneRegex = /^1[3-9]\d{9}$/;
                if (!phoneRegex.test(phoneInput.value)) {
                    phoneInput.classList.add('border-red-500');
                    isValid = false;
                }
            }
            
            // 邮箱验证
            if (emailInput) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    emailInput.classList.add('border-red-500');
                    isValid = false;
                }
            }
            
            // 如果验证失败，显示错误消息
            const formMessage = document.getElementById(config.messageId);
            if (!isValid && formMessage) {
                formMessage.textContent = '请检查您的电话号码和邮箱格式是否正确';
                formMessage.className = 'block p-3 rounded-lg text-center message error';
                e.preventDefault();
            }
        });
    });
});