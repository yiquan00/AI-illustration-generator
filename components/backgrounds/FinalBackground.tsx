"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface FinalBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function FinalBackground({ children, className = "" }: FinalBackgroundProps) {
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
      ctx.globalAlpha = 0.08;

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
      {/* Base gradient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 opacity-90">
        {/* Canvas grid */}
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ filter: "blur(60px)" }}
        />

        {/* Glowing orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-purple-200 opacity-50 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-20 -left-20 w-[400px] h-[400px] rounded-full bg-pink-200 opacity-50 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-40 right-1/4 w-[450px] h-[450px] rounded-full bg-cyan-200 opacity-40 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-20 left-1/3 w-[350px] h-[350px] rounded-full bg-purple-300 opacity-20 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
