"use client";

import React, { useEffect, useRef } from "react";

interface CanvasBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function CanvasBackground({ children, className = "" }: CanvasBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation variables
    let animationFrameId: number;
    let time = 0;

    // Animation function
    const animate = () => {
      time += 0.002;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      const gridSize = 40;
      ctx.strokeStyle = "#9333ea";
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.1;

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        const waveOffset = Math.sin(time + x * 0.01) * 5;
        ctx.beginPath();
        ctx.moveTo(x + waveOffset, 0);
        ctx.lineTo(x - waveOffset, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        const waveOffset = Math.cos(time + y * 0.01) * 5;
        ctx.beginPath();
        ctx.moveTo(0, y + waveOffset);
        ctx.lineTo(canvas.width, y - waveOffset);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ filter: "blur(60px)" }}
        />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
