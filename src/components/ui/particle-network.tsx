'use client';

import React, { useRef, useEffect } from 'react';

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create a local reference for TypeScript closure confidence
    const cvs = canvas;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      const parent = cvs.parentElement;
      if (parent) {
        cvs.width = parent.clientWidth;
        cvs.height = parent.clientHeight;
      } else {
        cvs.width = window.innerWidth;
        cvs.height = window.innerHeight;
      }
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * cvs.width;
        this.y = Math.random() * cvs.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 0.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > cvs.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > cvs.height) this.vy = -this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // More vibrant accent color
        ctx.fillStyle = 'hsla(174, 85%, 38%, 0.6)';
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      // Increased density (lowered divisor)
      const density = window.innerWidth < 768 ? 8000 : 10000;
      const numParticles = Math.floor((cvs.width * cvs.height) / density);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles to each other
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Increased connection distance
          if (distance < 140) {
            ctx.beginPath();
            // Solidified line opacity
            ctx.strokeStyle = `hsla(215, 25%, 27%, ${0.2 - (distance / 140) * 0.2})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Connect particles to mouse
        const dxMouse = particles[i].x - mouse.x;
        const dyMouse = particles[i].y - mouse.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        // Increased mouse interaction radius
        if (distanceMouse < 220) {
          ctx.beginPath();
          // Striking mouse glow
          ctx.strokeStyle = `hsla(174, 85%, 38%, ${0.45 - (distanceMouse / 220) * 0.45})`;
          ctx.lineWidth = 1.2;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
