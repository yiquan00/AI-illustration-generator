"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useInView } from 'react-intersection-observer';
import { cn } from "@/lib/utils";

interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  title: string;
  description?: string;
  testimonials: TestimonialItem[];
  className?: string;
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className = "",
}: TestimonialsSectionProps) {
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

        <div className="flex flex-col space-y-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative">
              {/* Decorative quote mark */}
              <div className="absolute -left-4 -top-4 text-6xl text-primary-light/50 font-serif z-0">"</div>
              
              <Card className="ml-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Left side - Avatar and info */}
                  <div className="md:w-1/4 bg-gradient-to-br from-primary-light to-secondary-light p-6 flex flex-col items-center justify-center">
                    <Avatar className="h-20 w-20 border-4 border-white shadow-md mb-4">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="text-xl">{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-bold text-primary-dark text-center">{testimonial.name}</h3>
                    <p className="text-sm text-primary-dark/80 text-center">{testimonial.role}</p>
                    
                    {testimonial.rating && (
                      <div className="flex mt-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < (testimonial.rating || 0)
                                ? "text-primary-dark fill-primary-dark"
                                : "text-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Right side - Quote */}
                  <div className="md:w-3/4 p-6 md:p-8 relative">
                    <p className="text-[#37352f] text-lg leading-relaxed italic relative z-10">"{testimonial.quote}"</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
