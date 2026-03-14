'use client';

import React, { useRef, useEffect } from 'react';

interface Pulse {
    x: number;
    y: number;
    progress: number;
    speed: number;
    size: number;
}

export function BlueprintPulse() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const cvs = canvas;
        let animationFrameId: number;
        let pulses: Pulse[] = [];
        const gridSize = 30; // Matches the CSS background grid size in competitive-edge

        const resizeCanvas = () => {
            const parent = cvs.parentElement;
            if (parent) {
                cvs.width = parent.clientWidth;
                cvs.height = parent.clientHeight;
            }
            pulses = [];
        };

        const addPulse = () => {
            if (pulses.length > 20) return;

            // Align to grid intersections
            const gridX = Math.floor(Math.random() * (cvs.width / gridSize)) * gridSize;
            const gridY = Math.floor(Math.random() * (cvs.height / gridSize)) * gridSize;

            pulses.push({
                x: gridX,
                y: gridY,
                progress: 0,
                speed: 0.005 + Math.random() * 0.01,
                size: 40 + Math.random() * 60
            });
        };

        const animate = () => {
            ctx.clearRect(0, 0, cvs.width, cvs.height);

            // Randomly spawn pulses
            if (Math.random() < 0.02) {
                addPulse();
            }

            pulses.forEach((pulse, index) => {
                pulse.progress += pulse.speed;

                if (pulse.progress >= 1) {
                    pulses.splice(index, 1);
                    return;
                }

                const alpha = Math.sin(pulse.progress * Math.PI) * 0.3;
                const currentSize = pulse.size * pulse.progress;

                // Draw horizontal expansion along grid
                ctx.beginPath();
                ctx.strokeStyle = `hsla(174, 85%, 38%, ${alpha})`;
                ctx.lineWidth = 1;
                ctx.moveTo(pulse.x - currentSize, pulse.y);
                ctx.lineTo(pulse.x + currentSize, pulse.y);
                ctx.stroke();

                // Draw vertical expansion along grid
                ctx.beginPath();
                ctx.moveTo(pulse.x, pulse.y - currentSize);
                ctx.lineTo(pulse.x, pulse.y + currentSize);
                ctx.stroke();

                // Target dot at intersection
                ctx.beginPath();
                ctx.arc(pulse.x, pulse.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(174, 85%, 38%, ${alpha * 1.5})`;
                ctx.fill();
            });

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
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        />
    );
}
