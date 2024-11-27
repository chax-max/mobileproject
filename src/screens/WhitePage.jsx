import React from 'react';

const WhitePage = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(45deg, #6e7f7d, #f1f1f1)', 
    overflow: 'hidden',
  };

  const comingSoonTextStyle = {
    textAlign: 'center',
    fontFamily: 'Raleway, sans-serif', 
    fontSize: '48px', 
    fontWeight: '600', 
    color: '#333', 
    letterSpacing: '2px', 
    textTransform: 'uppercase', 
    animation: 'fadeIn 2s ease-in-out, bounce 2s infinite', 
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', 
    transition: 'color 0.3s ease', 
  };

  const handleMouseEnter = (e) => {
    e.target.style.color = '#f79c42'; 
  };

  const handleMouseLeave = (e) => {
    e.target.style.color = '#333'; 
  };

  return (
    <div style={containerStyle}>
      <p
        style={comingSoonTextStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Coming Soon !!!!! 
      </p>
    </div>
  );
};

export default WhitePage;
