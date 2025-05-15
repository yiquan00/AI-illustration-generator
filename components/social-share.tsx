'use client';

import { Twitter, Facebook, Linkedin, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SocialShareProps {
  title: string;
  imageUrl?: string;
  className?: string;
}

export function SocialShare({ title, imageUrl, className }: SocialShareProps) {
  const fullUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?${new URLSearchParams({ text: title, url: fullUrl }).toString()}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?${new URLSearchParams({ u: fullUrl }).toString()}`,
    linkedin: `https://www.linkedin.com/shareArticle?${new URLSearchParams({ mini: 'true', url: fullUrl, title }).toString()}`,
    whatsapp: `https://wa.me/?${new URLSearchParams({ text: `${title} ${fullUrl}` }).toString()}`,
    pinterest: `https://pinterest.com/pin/create/button/?${new URLSearchParams({ url: fullUrl, description: title, media: imageUrl || '' }).toString()}`
  };

  const handlePinterestShare = () => {
    const width = 750;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    
    window.open(
      shareLinks.pinterest,
      'pinterest',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        size="icon"
        variant="outline"
        className="rounded-full bg-black hover:bg-gray-800 text-white border-none h-9 w-9"
        asChild
      >
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
        </a>
      </Button>

      <Button
        size="icon"
        variant="outline"
        className="rounded-full bg-[#1877f2] hover:bg-[#1864d4] text-white border-none h-9 w-9"
        asChild
      >
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-4 w-4" />
        </a>
      </Button>

      <Button
        size="icon"
        variant="outline"
        className="rounded-full bg-[#0077b5] hover:bg-[#006399] text-white border-none h-9 w-9"
        asChild
      >
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </Button>

      <Button
        size="icon"
        variant="outline"
        className="rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white border-none h-9 w-9"
        asChild
      >
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
        >
          <Share2 className="h-4 w-4" />
        </a>
      </Button>

      <Button
        size="icon"
        variant="outline"
        className="rounded-full bg-[#E60023] hover:bg-[#AD081B] text-white border-none h-9 w-9"
        onClick={handlePinterestShare}
        aria-label="Save to Pinterest"
      >
        <svg 
          className="h-4 w-4" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
        </svg>
      </Button>
    </div>
  );
} 