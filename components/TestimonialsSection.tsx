"use client";

import React from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  avatar?: string;
  rating: number;
}

interface TestimonialsSectionProps {
  title: string;
  testimonials?: Testimonial[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  title = "What Our Users Say",
  testimonials = [
    {
      quote: "This tool has completely transformed how I create documentation. The illustrations are beautiful and perfectly match the Notion aesthetic I was looking for.",
      author: "Sarah Johnson",
      title: "Product Manager",
      rating: 5
    },
    {
      quote: "I've tried many illustration generators, but this one stands out for its clean, minimalist style. Perfect for my knowledge base and documentation.",
      author: "Michael Chen",
      title: "Technical Writer",
      rating: 5
    },
    {
      quote: "The speed and quality are impressive. I can generate professional illustrations in seconds that would have taken hours to create manually.",
      author: "Emma Rodriguez",
      title: "UX Designer",
      rating: 4
    }
  ]
}) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{title}</h2>
          
          {/* Trusted by logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 my-12">
        
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={16} 
                    className={star <= testimonial.rating 
                      ? "text-yellow-400 fill-yellow-400" 
                      : "text-gray-200 fill-gray-200"
                    } 
                  />
                ))}
              </div>
              
              <blockquote className="text-foreground mb-6">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/20 mr-3 flex-shrink-0 flex items-center justify-center">
                  {testimonial.avatar ? (
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author} 
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-primary font-medium">
                      {testimonial.author.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-medium text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-center mt-12">
          <Button variant="outline" size="icon" className="rounded-full mr-2">
            <ChevronLeft size={18} />
            <span className="sr-only">Previous</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronRight size={18} />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
