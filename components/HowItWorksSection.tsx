"use client";

import React from 'react';
import { MessageSquare, Sparkles, Download } from 'lucide-react';
import TextPrompt from '@/components/text-prompt';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  title: string;
  description: string;
  steps?: Step[];
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  title = "How It Works",
  description = "Creating beautiful Notion-style illustrations is simple with our three-step process",
  steps = [
    {
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      title: "Describe Your Idea",
      description: "Enter a text prompt describing the illustration you want to create. Be as specific or general as you like."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-white" />,
      title: "AI Generation",
      description: "Our AI analyzes your prompt and generates a beautiful Notion-style illustration matching your description."
    },
    {
      icon: <Download className="h-6 w-6 text-white" />,
      title: "Download & Use",
      description: "Download your illustration in your preferred format and use it in your documents, presentations, or websites."
    }
  ]
}) => {
  return (
    <section className="py-20 bg-neutral-100 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-200 rounded-full opacity-70 transform translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-neutral-200 rounded-full opacity-70 transform -translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-r from-neutral-800 to-neutral-600 h-16 w-16 rounded-full flex items-center justify-center mb-6 shadow-md">
                {step.icon}
                <span className="absolute top-0 right-0 bg-background text-neutral-800 h-6 w-6 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Demo - TextPrompt Component */}
        <div className="max-w-4xl mx-auto">
          <TextPrompt className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
