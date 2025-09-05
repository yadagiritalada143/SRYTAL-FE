import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface LoaderProps {
  progress: number;
}

const ProgressBar: React.FC<LoaderProps> = ({ progress }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const stepTime = 15;
    const totalSteps = duration / stepTime;
    const increment = progress / totalSteps;

    const interval = setInterval(() => {
      start += increment;
      if (start >= progress) {
        start = progress;
        clearInterval(interval);
      }
      setAnimatedProgress(Math.floor(start));
    }, stepTime);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <StyledWrapper progress={animatedProgress}>
      <div className="progress-container">
        <div className="progress-bar" />
        <div className="progress-text">{animatedProgress}%</div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ progress: number }>`
  width: 100%;

  .progress-container {
    position: relative;
    width: 100%;
    max-width: 500px;
    height: 20px;
    background: radial-gradient(circle, #1b2735, #090a0f);
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    border: 1px solid #313131;
  }

  .progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ progress }) => progress}%;
    background: linear-gradient(90deg, #00f260, #0575e6);
    border-radius: 30px;
    transition: width 1s ease-in-out;
    box-shadow:
      0 0 15px #00f260,
      0 0 30px #0575e6;
  }

  .progress-bar::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.15), transparent);
    opacity: 0.5;
  }

  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 1px;
    color: #fff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
    z-index: 2;
  }

  /* Particles (unchanged) */
  .particles {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #fff;
    border-radius: 50%;
    opacity: 0.6;
    animation: float 5s infinite ease-in-out;
  }

  @keyframes ripple {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 0.7;
    }
    100% {
      transform: translate(-50%, -50%) scale(1.5);
      opacity: 0;
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0) translateX(0);
    }
    50% {
      transform: translateY(-20px) translateX(10px);
    }
    100% {
      transform: translateY(0) translateX(0);
    }
  }

  .particle:nth-child(1) {
    top: 10%;
    left: 20%;
    animation-delay: 0s;
  }
  .particle:nth-child(2) {
    top: 30%;
    left: 70%;
    animation-delay: 1s;
  }
  .particle:nth-child(3) {
    top: 50%;
    left: 50%;
    animation-delay: 2s;
  }
  .particle:nth-child(4) {
    top: 80%;
    left: 40%;
    animation-delay: 1.5s;
  }
  .particle:nth-child(5) {
    top: 90%;
    left: 60%;
    animation-delay: 2.5s;
  }
`;

export default ProgressBar;
