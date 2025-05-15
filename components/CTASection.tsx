"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

interface CTASectionProps {
  title: string;
  description: string;
  features?: string[];
  buttonText: string;
  buttonLink: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  title = "Start Creating Beautiful Illustrations Today",
  description = "Join thousands of creators and businesses who are already using our tool to transform their visual content.",
  features = [
    "Free tier available with 10 illustrations",
    "No credit card required to get started",
    "Cancel anytime, no commitments"
  ],
  buttonText = "Get Started Now",
  buttonLink = "/signup"
}) => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-100 -z-10"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-200 rounded-full opacity-30 transform translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-neutral-200 rounded-full opacity-30 transform -translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left column - Image */}
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-600 p-8 md:p-12 flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square">
                {/* Abstract illustration elements */}
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-white bg-opacity-30 rounded-lg transform -rotate-12 shadow-lg z-10">
                  <img src="/examples/notion-example-1.png" alt="AI-Powered Notion-style illustration" className="w-full h-full object-contain rounded-lg" />
                </div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-white bg-opacity-40 rounded-lg transform rotate-12 shadow-lg z-10">
                  <img src="/examples/notion-example-3.png" alt="AI-Powered Notion-style illustration" className="w-full h-full rounded-lg object-contain" />
                </div>
                {/* 中央"View More"元素 - 最高层级和最显眼的视觉效果 */}
                <div className="absolute inset-0 m-auto w-3/4 h-3/4 bg-white bg-opacity-20 rounded-full flex items-center justify-center z-50 shadow-xl backdrop-blur-sm border-2 border-white border-opacity-40 animate-pulse">
                  <Link href="/gallery">
                    <div className="relative bg-gradient-to-r from-neutral-900 to-neutral-800 px-8 py-4 rounded-full shadow-xl transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                      <span className="font-bold text-white text-2xl">View More</span>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                    </div>
                  </Link>
                </div>

                {/* Floating illustrations - 增加z-index和视觉效果 */}
                <div className="absolute top-1/4 right-0 transform translate-x-1/4 w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center z-20 border border-white">
                  <div className="w-12 h-12 rounded overflow-hidden">
                    <img src="/examples/notion-example-4.png" alt="AI-Powered Notion-style illustration" className="w-full h-full object-contain" />
                  </div>
                </div>
                <div className="absolute bottom-1/4 left-0 transform -translate-x-1/4 w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center z-20 border border-white">
                  <div className="w-12 h-12 rounded overflow-hidden">
                    <img src="/examples/notion-example-1.png" alt="AI-Powered Notion-style illustration" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {title.split(' ').map((word, i) =>
                  i % 3 === 0 ? <span key={i} className="gradient-text">{word} </span> : word + ' '
                )}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {description}
              </p>

              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <p className="text-muted-foreground">{feature}</p>
                  </div>
                ))}
              </div>

              <Link href={buttonLink}>
                <Button className="px-8 w-full md:w-auto">
                  {buttonText}
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
