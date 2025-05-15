import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand section */}
          <div className="lg:col-span-1 space-y-3">
            <Link href="/" className="inline-block font-bold text-foreground">
              illustration.<span className="text-primary">imglab.dev</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {process.env.NEXT_PUBLIC_SITE_DESC}
            </p>
          </div>

          {/* Features section */}
          {/* <div className="lg:col-span-1 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Features</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/explore"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-all hover:translate-x-[2px]"
                >
                  AI Flat Illustration Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-all hover:translate-x-[2px]"
                >
                  Gible Art Style Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/tags"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-all hover:translate-x-[2px]"
                >
                  Style Tags
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Links section */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">More Products</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="https://notion2go.com"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-all hover:translate-x-[2px]"
                >
                  notion2go—Notion tools collection

                </Link>
              </li>
              <li>
                <Link
                  href="https://imglab.dev"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-all hover:translate-x-[2px]"
                >
                  Imglab-Image Tools Hub
                </Link>
              </li>
             
              {/* <li>
                <Link
                  href="https://toolsfine.com/"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-all hover:translate-x-[2px]"
                >
                  ToolsFine
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Social section */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Follow Us</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="https://x.com/yan_yq"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-all hover:translate-x-[2px]"
                >
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-center text-sm text-muted-foreground">
              2025 AI Illustration Generator . All rights reserved.
            </p>
            <a
              href="https://startupfa.me/s/illustration-generator?utm_source=illustration.imglab.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 transition-opacity"
            >
              <img
                src="https://startupfa.me/badges/featured-badge-small.webp"
                alt="Featured on Startup Fame"
                width="224"
                height="36"
                className="h-9 w-auto"
              />
            </a>
          </div>
          <div className="flex gap-4 text-sm">
            <Link
              href="/privacy-policy"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-all hover:translate-x-[2px]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-all hover:translate-x-[2px]"
            >
              Terms of Service
            </Link>
            <Link
              href="/about-us"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-all hover:translate-x-[2px]"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
