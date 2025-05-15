"use client";

import React from "react";
import { AnimatedGridBackground } from "./AnimatedGridBackground";
import { GlowingBackground } from "./GlowingBackground";

interface MainBackgroundProps {
  children: React.ReactNode;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export function MainBackground({
  children,
  className = "",
  primaryColor = "#9333ea", // 紫色
  secondaryColor = "#ec4899" // 粉色
}: MainBackgroundProps) {
  return (
    <AnimatedGridBackground
      className={className}
      gridSize={40}
      blur={70}
      opacity={0.12}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    >
      <GlowingBackground>
        {children}
      </GlowingBackground>
    </AnimatedGridBackground>
  );
}
