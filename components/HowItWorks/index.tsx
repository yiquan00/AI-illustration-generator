"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useInView } from 'react-intersection-observer';
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
}

interface HowItWorksProps {
  title: string;
  description?: string;
  steps: Step[];
  className?: string;
}

export function HowItWorks({
  title,
  description,
  steps,
  className = "",
}: HowItWorksProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className={cn(
        "section-container creative-bg",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="section-header">
          <h2 className="section-title creative-gradient-text">{title}</h2>
          {description && (
            <p className="section-description">
              {description}
            </p>
          )}
        </div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              } gap-8 md:gap-12 items-center`}
            >
              {/* Image Section */}
              <div className="w-full md:w-1/2 relative">
                <div className="relative aspect-video overflow-hidden rounded-xl creative-card">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary-dark text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  {index + 1}
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-2xl font-bold text-black">{step.title}</h3>
                <p className="text-[#37352f]">{step.description}</p>

                {step.buttonText && step.buttonLink && (
                  <Button asChild className="creative-button mt-4 group">
                    <Link href={step.buttonLink}>
                      {step.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}