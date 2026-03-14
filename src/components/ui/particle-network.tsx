'use client';

import React, { useRef, useEffect } from 'react';

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisible = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const cvs = canvas;
    let animationFrameId: number;
    let particles: Particle[] = [];

    // Optimize: Only animate when visible in the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible.current = entries[0].isIntersecting;
        if (isVisible.current) {
          animate();
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(cvs);

    const resizeCanvas = () => {
      const parent = cvs.parentElement;
      if (parent) {
        cvs.width = parent.clientWidth;
        cvs.height = parent.clientHeight;
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
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 0.5;
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
        ctx.fillStyle = 'hsla(174, 85%, 38%, 0.5)';
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      // Balanced density for visual impact vs performance
      const density = window.innerWidth < 768 ? 10000 : 15000;
      const numParticles = Math.min(Math.floor((cvs.width * cvs.height) / density), 180);
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
      if (!isVisible.current) return;

      ctx.clearRect(0, 0, cvs.width, cvs.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles to each other (O(n^2) but capped number of particles keeps it fast)
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy; // Use squared distance to avoid Math.sqrt

          if (distSq < 14400) { // 120 * 120
            const distance = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.strokeStyle = `hsla(215, 25%, 27%, ${0.15 - (distance / 120) * 0.15})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Connect particles to mouse
        const dxMouse = particles[i].x - mouse.x;
        const dyMouse = particles[i].y - mouse.y;
        const distSqMouse = dxMouse * dxMouse + dyMouse * dyMouse;

        if (distSqMouse < 40000) { // 200 * 200
          const distanceMouse = Math.sqrt(distSqMouse);
          ctx.beginPath();
          ctx.strokeStyle = `hsla(174, 85%, 38%, ${0.4 - (distanceMouse / 200) * 0.4})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
