"use client"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useRouter } from 'next/navigation'

interface CategoryCardProps {
  title: string;
  image: string | null;
  href: string;
  className?: string;
  category?: string;
  isNew?: boolean;
}

export function CategoryCard({
  title,
  image,
  href,
  className,
  category,
  isNew,
}: CategoryCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(href)
  }

  return (
    <Card
      onClick={handleClick}
      className={cn(
        "group relative cursor-pointer transition-all duration-300",
        "bg-white border border-gray-200 rounded-lg",
        "hover:bg-[rgba(0,0,0,0.02)] hover:shadow-[rgba(15,15,15,0.1)_0px_0px_0px_1px]",
        className
      )}
    >
      <div className="p-4">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
        {image ? (
            <div className="relative w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
                className="object-cover transition-all duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
            </div>
        ) : (
            <div className="flex h-full items-center justify-center bg-muted rounded-xl">
            <span className="text-muted-foreground">No Image</span>
          </div>
        )}

        {category && (
          <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm">
              {category}
            </Badge>
          </div>
        )}

        {isNew && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-primary text-primary-foreground">New</Badge>
          </div>
        )}
        </div>
      </div>

      <div className="px-6 pb-6">
        <h3 className="text-sm text-neutral-600 line-clamp-2 mt-3">{title}</h3>
      </div>
    </Card>
  )
}