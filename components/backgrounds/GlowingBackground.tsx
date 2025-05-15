"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlowingBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowingBackground({ children, className = "" }: GlowingBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background glow effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Primary glow */}
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary-light opacity-60 blur-3xl"
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

        {/* Secondary glow */}
        <motion.div
          className="absolute top-20 -left-20 w-[400px] h-[400px] rounded-full bg-secondary-light opacity-60 blur-3xl"
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

        {/* Accent glow */}
        <motion.div
          className="absolute bottom-40 right-1/4 w-[450px] h-[450px] rounded-full bg-accent-light opacity-40 blur-3xl"
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

        {/* Extra glow */}
        <motion.div
          className="absolute -bottom-20 left-1/3 w-[350px] h-[350px] rounded-full bg-primary-dark opacity-20 blur-3xl"
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
