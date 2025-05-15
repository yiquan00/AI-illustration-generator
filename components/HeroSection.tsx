"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import { TypingEffect } from "@/components/ui/typing-effect";

interface HeroSectionProps {
  title?: string;
  description?: string;
  className?: string;
}

// 背景装饰插画元素配置
const decorativeIllustrations = [
  // 四角装饰 - 增加透明度使图片更清晰
  { src: "/examples/notion-example-1.png", position: "top-20 right-10", size: "w-32 h-32", rotation: "rotate-6", opacity: "opacity-60", animation: "float-animation-slow" },
  { src: "/examples/notion-example-2.png", position: "bottom-20 left-10", size: "w-40 h-40", rotation: "-rotate-3", opacity: "opacity-60", animation: "float-animation-medium" },
  { src: "/examples/notion-example-3.png", position: "top-40 left-20", size: "w-36 h-36", rotation: "rotate-12", opacity: "opacity-50", animation: "float-animation-slow" },
  { src: "/examples/notion-example-4.png", position: "bottom-40 right-20", size: "w-28 h-28", rotation: "-rotate-6", opacity: "opacity-60", animation: "float-animation-medium" },

  // 额外的小装饰元素 - 适当增加透明度
  { src: "/examples/notion-example-1.png", position: "top-1/4 right-1/4", size: "w-16 h-16", rotation: "rotate-12", opacity: "opacity-40", animation: "float-animation-medium" },
  { src: "/examples/notion-example-2.png", position: "bottom-1/4 left-1/3", size: "w-20 h-20", rotation: "-rotate-6", opacity: "opacity-40", animation: "float-animation-slow" },
  { src: "/examples/notion-example-3.png", position: "top-1/3 left-1/4", size: "w-24 h-24", rotation: "rotate-3", opacity: "opacity-30", animation: "float-animation-medium" },
  { src: "/examples/notion-example-4.png", position: "bottom-1/3 right-1/3", size: "w-20 h-20", rotation: "-rotate-12", opacity: "opacity-40", animation: "float-animation-slow" }
];

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Create Beautiful Notion-Style Illustrations",
  description = "Generate clean, minimalist illustrations with our AI-powered tool. Perfect for documentation, presentations, and more.",
  className = "",
}) => {
  // 不需要状态管理，TypingEffect组件会自动处理短语切换
  return (
    <section className={`py-20 md:py-32 relative overflow-hidden ${className}`}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-200 to-background -z-10"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-100 rounded-full blur-3xl -z-10 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neutral-200 rounded-full blur-3xl -z-10 opacity-60"></div>

      {/* Decorative illustrations */}
      {decorativeIllustrations.map((illustration, index) => (
        <div
          key={index}
          className={`absolute ${illustration.position} ${illustration.size} ${illustration.rotation} ${illustration.opacity} ${illustration.animation} z-0 pointer-events-none transition-all duration-500 hover:opacity-100 hover:scale-105`}
        >
          <div className="relative w-full h-full">
            <Image
              src={illustration.src}
              alt="Notion-style illustration"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </div>
      ))}

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
          {/* Left column - Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">{title}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/explore">
                <Button variant="default" size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  Start Creating
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/gallery">
                <Button variant="outline" size="lg">
                  View Gallery
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start">
              <div>
                <p className="text-3xl font-bold gradient-text">200+</p>
                <p className="text-muted-foreground text-sm">Illustrations Generated</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">500+</p>
                <p className="text-muted-foreground text-sm">Happy Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">4.9/5</p>
                <p className="text-muted-foreground text-sm">User Rating</p>
              </div>
            </div>
          </div>

          {/* Right column - Illustration */}
          <div className="w-full lg:w-1/2">
            <div className="relative bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
              <div className="border-b border-gray-100 pb-4 mb-4">
                <div className="flex space-x-2 absolute top-4 left-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="text-center pt-2">
                  <p className="text-sm text-muted-foreground">Notion-Style Illustration Generator</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Prompt:</p>
                  <div className="h-8 flex items-center">
                    <TypingEffect
                      phrases={[
                        "girl reading a book",
                        "A girl, leaning over the wall",
                        "A girl is standing and painting on an easel",
                        "Enjoying The Weekend"
                      ]}
                      className="text-neutral-800 font-medium text-sm"
                      typingSpeed={40}
                      deletingSpeed={20}
                      delayBetweenPhrases={3000}
                    />
                  </div>
                </div>

                <div className="flex justify-center space-x-3">
                  <Link href="/explore">
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      Generate
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 bg-white p-3 rounded-lg shadow-md rotate-12 hidden md:block">
                <div className="w-12 h-3 bg-primary/20 rounded-md"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-3 rounded-lg shadow-md -rotate-12 hidden md:block">
                <div className="w-12 h-12 bg-primary/10 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
