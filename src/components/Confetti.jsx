// components/Confetti/CenterConfetti.jsx
import { useEffect, useRef, useState } from 'react';
import { confettiColors } from '@/utils/constants';

import './Confetti.css';

const Confetti = ({ 
  duration = 4000,
  particleCount = 500,
  explosionPower = 10,
  onComplete,
}) => {
  const canvasRef = useRef(null);
  const [active, setActive] = useState(false);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!active) {
      setActive(true);
      setTimeout(() => {
        setActive(false);
        if (onComplete) onComplete();
      }, duration);
    }
  }, [active, duration, onComplete]);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Create particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: centerX,
      y: centerY,
      size: Math.random() * 12 + 4,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      speedX: (Math.random() - 0.5) * explosionPower * 2,
      speedY: (Math.random() - 0.5) * explosionPower * 2,
      gravity: 0.05,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      shape: Math.floor(Math.random() * 4), // 0-3 shapes
      alpha: 1,
      fade: Math.random() * 0.008 + 0.002
    }));

    let animationId;

    const animate = () => {
      let aliveParticles = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.speedY += particle.gravity;

        // Apply air resistance
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;

        // Rotation
        particle.rotation += particle.rotationSpeed;

        // Fade out
        particle.alpha -= particle.fade;

        if (particle.alpha > 0) {
          aliveParticles++;

          // Draw particle
          ctx.save();
          ctx.globalAlpha = particle.alpha;
          ctx.fillStyle = particle.color;
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation);

          switch(particle.shape) {
            case 0: // Circle
              ctx.beginPath();
              ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
              ctx.fill();
              break;
            case 1: // Square
              ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
              break;
            case 2: // Star
              ctx.beginPath();
              for (let i = 0; i < 5; i++) {
                const angle = (i * Math.PI * 2) / 5;
                ctx.lineTo(
                  Math.cos(angle) * particle.size / 2,
                  Math.sin(angle) * particle.size / 2
                );
              }
              ctx.closePath();
              ctx.fill();
              break;
            case 3: // Heart (simplified)
              ctx.beginPath();
              ctx.moveTo(0, -particle.size/3);
              ctx.bezierCurveTo(
                particle.size / 2, -particle.size / 2,
                particle.size / 2, particle.size / 3,
                0, particle.size / 2
              );
              ctx.bezierCurveTo(
                -particle.size / 2, particle.size / 3,
                -particle.size / 2, -particle.size / 2,
                0, -particle.size / 3
              );
              ctx.fill();
              break;
          }

          ctx.restore();
        }
      });

      if (aliveParticles > 0) {
        animationId = requestAnimationFrame(animate);
      } else {
        setActive(false);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [active, particleCount, explosionPower]);

  if (!active) return null;

  return (
    <canvas ref={canvasRef} className="confetti-canvas" />
  );
};

export default Confetti;
