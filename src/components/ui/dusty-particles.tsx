'use client';

import React, { useRef, useEffect } from 'react';

export function DustyParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const cvs = canvas;
        let animationFrameId: number;
        let particles: Particle[] = [];

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
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
            color: string;
            blur: number;

            constructor() {
                this.x = Math.random() * cvs.width;
                this.y = Math.random() * cvs.height;
                this.size = Math.random() * 3 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.6 + 0.2;
                this.blur = Math.random() > 0.8 ? 5 : 0; // Some particles are naturally blurred "out of focus"

                const isAccent = Math.random() > 0.7;
                this.color = isAccent ? '174, 100%, 40%' : '215, 20%, 65%';
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > cvs.width) this.x = -this.size;
                else if (this.x < -this.size) this.x = cvs.width;
                if (this.y > cvs.height) this.y = -this.size;
                else if (this.y < -this.size) this.y = cvs.height;
            }

            draw() {
                if (!ctx) return;
                ctx.save();
                ctx.beginPath();
                if (this.blur > 0) {
                    ctx.filter = `blur(${this.blur}px)`;
                }
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.color}, ${this.opacity})`;
                ctx.fill();
                ctx.restore();
            }
        }

        const initParticles = () => {
            particles = [];
            const densityMultiplier = window.innerWidth < 768 ? 2500 : 3500;
            const numParticles = Math.floor((cvs.width * cvs.height) / densityMultiplier);
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, cvs.width, cvs.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
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
