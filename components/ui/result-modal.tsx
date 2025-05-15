"use client";

import { Cover } from "@/types/cover";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";
import Link from "next/link";
import { SocialShare } from "@/components/social-share";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PinterestShare } from "@/components/pinterest-share";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  cover: Cover | null;
  title?: string;
}

export function ResultModal({ isOpen, onClose, cover, title }: ResultModalProps) {
  const router = useRouter();

  if (!cover) return null;

  const displayTitle = title || cover.img_description;

  const handleViewDetails = () => {
    router.push(`/detail/${cover.slug}`);
    onClose();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `AI Illustration: ${displayTitle}`,
        text: `Check out this AI illustration: ${displayTitle}`,
        url: `${window.location.origin}/detail/${cover.slug}`,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(`${window.location.origin}/detail/${cover.slug}`)
        .then(() => alert('Link copied to clipboard!'))
        .catch((err) => console.error('Could not copy text: ', err));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Success!</DialogTitle>
          <DialogDescription>
            Your illustration is ready! Feel free to share it with friends or download it for your use.
          </DialogDescription>
        </DialogHeader>

        <div
          className="group relative cursor-pointer transition-all duration-300"
          onClick={handleViewDetails}
        >
          <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src={cover?.img_url || ''}
                alt={displayTitle || 'Generated illustration'}
                fill
                className={cn(
                  "object-cover",
                  "transition-all duration-300",
                  "group-hover:scale-[1.02]"
                )}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        <DialogFooter className="sm:justify-start">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="px-3"
                asChild
              >
                <Link href={cover?.img_url || ''} target="_blank" download>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Link>
              </Button>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white p-2 shadow-sm"
                  onClick={handleShare}
                  title="Share"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37061L8.08261 9.84066C7.54305 9.32015 6.80891 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15C6.80891 15 7.54305 14.6798 8.08261 14.1593L15.0227 18.6294C15.0077 18.7508 15 18.8745 15 19C15 20.6569 16.3431 22 18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C17.1911 16 16.457 16.3202 15.9174 16.8407L8.97733 12.3706C8.99229 12.2492 9 12.1255 9 12C9 11.8745 8.99229 11.7508 8.97733 11.6294L15.9174 7.15934C16.457 7.67985 17.1911 8 18 8Z" fill="currentColor"/>
                  </svg>
                </Button>

                {/* <PinterestShare
                  imageUrl={cover?.img_url || ''}
                  description={displayTitle || ''}
                  className="bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2 shadow-sm"
                /> */}

                <SocialShare
                  title={`AI Illustration: ${displayTitle}`}
                  imageUrl={cover.img_url}
                />
              </div>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}