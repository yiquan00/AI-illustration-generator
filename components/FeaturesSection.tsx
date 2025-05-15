"use client";

import React from 'react';
import {
  Wand2,
  Download,
  Palette,
  Layers,
  Zap,
  FileText
} from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  title: string;
  description: string;
  features?: Feature[];
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  title,
  description,
  features = [
    {
      icon: <Wand2 className="h-6 w-6 text-neutral-800" />,
      title: "AI-Powered Generation",
      description: "Create beautiful Notion-style illustrations with just a text prompt. Our AI understands your needs and delivers perfect results."
    },
    {
      icon: <Palette className="h-6 w-6 text-neutral-800" />,
      title: "Clean, Minimalist Style",
      description: "Get illustrations with the distinctive Notion aesthetic - clean lines, subtle colors, and thoughtful design elements."
    },
    {
      icon: <Layers className="h-6 w-6 text-neutral-800" />,
      title: "Customizable Options",
      description: "Simple illustrations in black and white are provided by default, but you can also generate illustrations with colors if you want, whatever you like"
    },
    {
      icon: <Download className="h-6 w-6 text-neutral-800" />,
      title: "Instant Downloads",
      description: "Download your illustrations instantly in high-resolution formats, ready to use in your documents, presentations, or websites."
    },
    {
      icon: <Zap className="h-6 w-6 text-neutral-800" />,
      title: "Lightning Fast",
      description: "Generate illustrations in seconds, not minutes. Our optimized AI delivers results quickly so you can keep working."
    },
    {
      icon: <FileText className="h-6 w-6 text-neutral-800" />,
      title: "Perfect for Documentation",
      description: "Ideal for enhancing documentation, wikis, and knowledge bases with visuals that complement your content perfectly."
    }
  ]
}) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 bg-neutral-200 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
