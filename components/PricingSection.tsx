"use client";

import { Button } from "@/components/ui/button";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useState, useContext } from "react";
import { AppContext } from '@/contexts/AppContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from "@clerk/nextjs";

const pricingTiers = [
  {
    name: "Basic",
    id: "basic-plan",
    href: "#",
    price: "$6.99",
    currency: "usd",
    credits: 30,
    description: "",
    features: [
      `Generate 30 Notion-style illustrations`,
      "Valid for 1 month",
      "High-quality images",
      "Fast generation speed",
      `Unlimited downloads of illustrations`,
    ],
    plan: "one-time",
    amount: 699,
  },
  {
    name: "Premium",
    id: "premium",
    href: "#",
    price: "$9.99",
    currency: "usd",
    credits: 50,
    description: "",
    features: [
      `Generate 50 Notion-style illustrations`,
      "Valid for 1 month",
      "Ultra-high quality images",
      "Even faster generation speed",
      `Unlimited downloads of illustrations`,
    ],
    plan: "one-time",
    amount: 999,
  },
  {
    name: "Pro",
    id: "pro",
    href: "#",
    price: "$18.99",
    currency: "usd",
    credits: 100,
    description: "",
    features: [
      `Generate 100 Notion-style illustrations`,
      "Valid for 1 month",
      "Ultra-high quality images",
      "Priority generation speed",
      `Unlimited downloads of illustrations`,
    ],
    plan: "one-time",
    amount: 1899,
  },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

interface PricingSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function PricingSection({
  title = "Choose Your Plan",
  subtitle = "Pricing",
  className = "",
}: PricingSectionProps): JSX.Element {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (
    plan: string,
    amount: number,
    currency: string,
    credits: number
  ) => {
    try {
      if (!isSignedIn) {
        toast.error("Please sign in before purchasing");
        router.push("/sign-in");
        return;
      }

      setLoading(true);
      console.log("Starting payment process...");

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan,
          amount,
          currency,
          credits,
        }),
      });

      const data = await response.json();
      console.log("Payment response:", data);

      if (data.data?.url) {
        console.log("Redirecting to payment page:", data.data.url);
        window.location.href = data.data.url;
      } else {
        console.error("Failed to get payment URL");
      }
    } catch (error) {
      console.error("Payment request failed:", error);
      toast.error("Payment request failed, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`relative isolate bg-neutral-100 px-6 py-16 md:py-24 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-3xl text-center lg:max-w-4xl section-header">
        <h2 className="text-base font-semibold leading-7 text-neutral-800">{subtitle}</h2>
        <p className="mt-2 text-4xl font-bold tracking-tight gradient-text sm:text-5xl">
          {title}
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-8 sm:mt-20 lg:max-w-5xl lg:grid-cols-3 lg:gap-x-8">
        {pricingTiers.map((tier) => (
          <div
            key={tier.id}
            className={`flex flex-col justify-between rounded-3xl ${
              tier.id === "premium"
                ? "bg-white p-8 xl:p-10 shadow-xl scale-105 border-2 border-neutral-800 relative z-10"
                : "bg-white p-8 xl:p-10 shadow-lg"
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-xl font-bold leading-8 text-neutral-800">
                  {tier.name}
                </h3>
                {tier.id === "premium" && (
                  <span className="inline-flex items-center rounded-full bg-neutral-800 px-3 py-1 text-xs font-medium text-white">
                    Recommended
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm leading-6 text-neutral-600">
                {tier.description}
              </p>
              <p className="mt-8 flex items-baseline gap-x-1">
                <span className={`text-5xl font-bold tracking-tight ${
                  tier.id === "premium" ? "text-neutral-800 gradient-text" : "text-neutral-800"
                }`}>
                  {tier.price}
                </span>
                <span className="text-sm font-semibold leading-6 text-neutral-600">
                  {tier.currency}
                </span>
              </p>
              <ul
                role="list"
                className="mt-10 space-y-4 text-sm leading-6 text-neutral-600"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-5 flex-none text-neutral-800"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Button
              className={`mt-12 w-full ${
                tier.id === "premium"
                  ? "bg-neutral-800 hover:bg-neutral-700 text-white"
                  : "bg-transparent border border-neutral-800 text-neutral-800 hover:bg-neutral-100"
              }`}
              disabled={loading}
              onClick={() => {
                handleCheckout(
                  tier.plan,
                  tier.amount,
                  tier.currency,
                  tier.credits
                );
              }}
            >
              {loading ? "Processing..." : tier.id === "premium" ? "Buy Now" : "Buy"}
            </Button>
          </div>
        ))}
      </div>

      {/* Social Media Sharing Bonus */}
      <div className="mt-16 max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border-t-4 border-neutral-800 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-neutral-200 blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full bg-neutral-200 blur-xl"></div>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/4 flex justify-center">
            <div className="flex space-x-2">
              {/* Facebook */}
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-800">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </div>
              {/* Twitter/X */}
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-800">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </div>
              {/* Instagram */}
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-800">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </div>
          </div>
          <div className="md:w-3/4">
            <h3 className="text-2xl font-bold gradient-text mb-3">Share & Get Free Credits!</h3>
            <p className="text-neutral-800 mb-4 text-lg">Hey, want some free credits? It's super easy! Just share your awesome AI illustrations on any social media platform and tag us. Send the link to <span className="font-semibold text-neutral-800">support@imglab.dev</span>, and we'll hook you up with extra free credits. That's it! Show off your cool creations and get rewarded.</p>
            <p className="text-sm text-neutral-600 mb-4">The more you share, the more credits you earn. It's our way of saying thanks for spreading the word!</p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-sm text-neutral-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <span>No complicated rules, just share and get rewarded!</span>
              </div>
              <div className="flex items-center text-sm text-neutral-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <span>Works with any social platform - Instagram, Twitter, Facebook, etc.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
