"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useInView } from 'react-intersection-observer';
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
  value: string;
}

interface FAQSectionProps {
  title: string;
  description?: string;
  faqItems: FAQItem[];
  className?: string;
}

export function FAQSection({
  title,
  description,
  faqItems,
  className = "",
}: FAQSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className={cn(
        "section-container",
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

        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger className="text-left font-bold text-black">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#37352f] leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>


        </div>
      </div>
    </section>
  );
}