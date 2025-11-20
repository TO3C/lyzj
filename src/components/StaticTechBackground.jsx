import React from 'react';

const StaticTechBackground = () => {
  return (
    <div className="static-tech-background">
      {/* 网格背景已移除 */}
      
      {/* 科技感装饰线条 - 已移除 */}
      
      {/* 发光圆形装饰 */}
      <div className="glowing-circles">
        <div className="glowing-circle glowing-circle-1"></div>
        <div className="glowing-circle glowing-circle-2"></div>
        <div className="glowing-circle glowing-circle-3"></div>
      </div>
      
      {/* 悬浮点装饰 */}
      <div className="floating-dots">
        {[...Array(20)].map((_, index) => (
          <div 
            key={index} 
            className="floating-dot" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* 文字显示区 */}
      <div className="text-overlay">
        <h1 className="tech-title">
          <span className="title-letter">流</span>
          <span className="title-letter">云</span>
          <span className="title-letter">智</span>
          <span className="title-letter">炬</span>
          <span className="title-letter">科</span>
          <span className="title-letter">技</span>
        </h1>
      </div>
    </div>
  );
};

export default StaticTechBackground;