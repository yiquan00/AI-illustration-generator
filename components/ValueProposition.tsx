"use client";

import React from 'react';
import { valuePropositionContent } from '@/utils/constants';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const ValueProposition = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-neutral-200 to-neutral-100 rounded-2xl p-8 md:p-12">
              <div className="relative aspect-square max-w-sm mx-auto">
                {/* 右上角装饰div */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-white rounded-lg shadow-md p-4 transform rotate-6">
                  <div className="w-full h-full bg-neutral-200 rounded-md"></div>
                </div>

                {/* 左下角装饰div */}
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-white rounded-lg shadow-md p-4 transform -rotate-6">
                  <div className="w-full h-full bg-neutral-100 bg-opacity-20 rounded-md"></div>
                </div>

                {/* 中央主图片 */}
                <div className="absolute inset-0 m-auto w-3/4 h-3/4 bg-white rounded-xl shadow-lg p-5">
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      src="/examples/notion-example-1.png"
                      alt="AI-Powered Notion-style illustration"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                  {/* 图片下方的文字 */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-2 text-center">
                    <p className="text-sm font-medium text-neutral-800">A girl, leaning over the wall</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-md p-4 hidden md:flex items-center gap-2">
              <div className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586V7z" fill="currentColor"/>
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" fill="currentColor"/>
                </svg>
              </div>
              <div className="text-neutral-800 font-bold text-sm">95% Time Saved</div>
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white rounded-lg shadow-md p-4 hidden md:flex items-center gap-2">
              <div className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
                </svg>
              </div>
              <div className="text-neutral-800 font-bold text-sm">No Design Skills Required</div>
            </div>
          </div>

          {/* Right column - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{valuePropositionContent.title}</h2>
            <p className="text-muted-foreground text-lg mb-10">{valuePropositionContent.subtitle}</p>

            <div className="space-y-8">
              {valuePropositionContent.points.map((point) => (
                <div key={point.title} className="flex">
                  <div className="mr-4 mt-1">
                    <CheckCircle size={24} className="text-neutral-800" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                    <p className="text-muted-foreground">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link href="/explore">
                <Button size="lg" className="bg-neutral-800 hover:bg-neutral-700">
                  Start Creating Now
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>

              <div className="mt-6 flex items-center">
                <div className="flex -space-x-2">
                  {/* 用户头像 */}
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative">
                    <Image src="/user1.webp" alt="User avatar" fill className="object-cover" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative">
                    <Image src="/user2.webp" alt="User avatar" fill className="object-cover" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative">
                    <Image src="/user3.webp" alt="User avatar" fill className="object-cover" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-neutral-800 flex items-center justify-center text-white text-xs">
                    +20
                  </div>
                </div>
                <div className="ml-4 text-sm text-muted-foreground">
                  <span className="font-semibold text-neutral-800">50+</span> illustrations created today
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
