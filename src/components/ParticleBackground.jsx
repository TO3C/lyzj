import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const textParticlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  
  // 粒子配置
  const config = {
    backgroundParticleCount: 80,
    textParticleDensity: 1,
    particleSize: 2,
    textParticleSize: 3,
    particleSpeed: 0.3,
    textParticleSpeed: 0.1,
    connectionDistance: 100,
    backgroundColor: '#0a0a0a',
    particleColor: '#165DFF',
    textParticleColor: '#165DFF',
    connectionColor: 'rgba(22, 93, 255, 0.3)'
  };

  // 初始化背景粒子
  const initBackgroundParticles = (canvas) => {
    const particles = [];
    
    for (let i = 0; i < config.backgroundParticleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * config.particleSize + 1,
        speedX: (Math.random() - 0.5) * config.particleSpeed,
        speedY: (Math.random() - 0.5) * config.particleSpeed,
        color: config.particleColor,
        type: 'background'
      });
    }
    
    return particles;
  };

  // 初始化文字粒子
  const initTextParticles = (canvas) => {
    const particles = [];
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    
    // 设置临时画布尺寸
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    
    // 绘制文字到临时画布
    tempCtx.font = 'bold 72px Arial, sans-serif';
    tempCtx.fillStyle = 'white';
    tempCtx.textAlign = 'center';
    tempCtx.textBaseline = 'middle';
    tempCtx.fillText('流云智炬科技', canvas.width / 2, canvas.height / 2);
    
    // 获取文字像素数据
    const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // 根据文字像素创建粒子
    for (let y = 0; y < canvas.height; y += config.textParticleDensity * 2) {
      for (let x = 0; x < canvas.width; x += config.textParticleDensity * 2) {
        const index = (y * canvas.width + x) * 4;
        if (data[index + 3] > 128) { // 如果像素不透明
          particles.push({
            x: x,
            y: y,
            size: Math.random() * config.textParticleSize + 2,
            speedX: (Math.random() - 0.5) * config.textParticleSpeed,
            speedY: (Math.random() - 0.5) * config.textParticleSpeed,
            color: config.textParticleColor,
            targetX: x, // 目标位置（固定文字形状）
            targetY: y,
            type: 'text'
          });
        }
      }
    }
    
    return particles;
  };

  // 绘制粒子
  const drawParticles = (canvas, ctx, backgroundParticles, textParticles) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 合并所有粒子用于连接绘制
    const allParticles = [...backgroundParticles, ...textParticles];
    
    // 绘制粒子连接
    for (let i = 0; i < allParticles.length; i++) {
      for (let j = i + 1; j < allParticles.length; j++) {
        const dx = allParticles[i].x - allParticles[j].x;
        const dy = allParticles[i].y - allParticles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.connectionDistance) {
          const opacity = 1 - distance / config.connectionDistance;
          ctx.strokeStyle = `rgba(22, 93, 255, ${opacity * 0.3})`;
          ctx.lineWidth = opacity * 0.5;
          ctx.beginPath();
          ctx.moveTo(allParticles[i].x, allParticles[i].y);
          ctx.lineTo(allParticles[j].x, allParticles[j].y);
          ctx.stroke();
        }
      }
    }
    
    // 绘制背景粒子
    backgroundParticles.forEach(particle => {
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      // 更新背景粒子位置
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // 边界检测
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX = -particle.speedX;
      }
      
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY = -particle.speedY;
      }
    });
    
    // 绘制文字粒子（保持文字形状）
    textParticles.forEach(particle => {
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      // 轻微扰动但保持在目标位置附近
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // 拉回目标位置
      const dx = particle.targetX - particle.x;
      const dy = particle.targetY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 1) {
        particle.x += dx * 0.05;
        particle.y += dy * 0.05;
      }
      
      // 随机改变速度方向
      if (Math.random() < 0.02) {
        particle.speedX = (Math.random() - 0.5) * config.textParticleSpeed;
        particle.speedY = (Math.random() - 0.5) * config.textParticleSpeed;
      }
    });
  };

  // 处理窗口大小变化
  const handleResize = (canvas) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // 重新初始化文字粒子以适应新尺寸
    textParticlesRef.current = initTextParticles(canvas);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // 设置canvas大小
    handleResize(canvas);
    
    // 初始化粒子
    particlesRef.current = initBackgroundParticles(canvas);
    textParticlesRef.current = initTextParticles(canvas);
    
    // 动画循环
    const animate = () => {
      drawParticles(canvas, ctx, particlesRef.current, textParticlesRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // 添加窗口大小变化监听
    window.addEventListener('resize', () => handleResize(canvas));
    
    // 清理函数
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', () => handleResize(canvas));
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}
    />
  );
};

export default ParticleBackground;