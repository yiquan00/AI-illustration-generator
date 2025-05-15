"use client";

import React from "react";
import { motion } from "framer-motion";

interface SimpleBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function SimpleBackground({ children, className = "" }: SimpleBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Simple background with gradient and shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50">
        {/* Static shapes */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full opacity-20 blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        
        {/* Animated elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300 rounded-full opacity-10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-300 rounded-full opacity-10 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: `
            linear-gradient(to right, rgba(147, 51, 234, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(147, 51, 234, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
