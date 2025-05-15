"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedGridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  gridSize?: number;
  duration?: number;
  blur?: number;
  opacity?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

export function AnimatedGridBackground({
  children,
  className = "",
  gridSize = 40,
  duration = 20,
  blur = 60,
  opacity = 0.15,
  primaryColor = "#9333ea", // 紫色
  secondaryColor = "#ec4899", // 粉色
}: AnimatedGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Could not get 2D context from canvas");
      return;
    }

    console.log("Canvas initialized successfully");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, primaryColor);
      gradient.addColorStop(0.5, secondaryColor);
      gradient.addColorStop(1, primaryColor);

      // Draw grid
      const drawGrid = () => {
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = opacity;

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

        // Draw some random dots for extra effect
        ctx.fillStyle = gradient;
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const size = Math.random() * 3 + 1;
          ctx.globalAlpha = Math.random() * 0.2;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = opacity;
      };

      drawGrid();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gridSize, opacity, primaryColor, secondaryColor]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ filter: `blur(${blur}px)` }}
        />
      </div>
      {/* Debug info */}
      <div className="fixed bottom-2 right-2 text-xs text-black bg-white/50 p-1 rounded z-50 pointer-events-none">
        Canvas Background Active
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
