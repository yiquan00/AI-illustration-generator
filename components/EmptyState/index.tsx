//  用于空状态占位

import React from 'react';
import Image from 'next/image';
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message, 
  icon, 
  action,
  className
}) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed",
      "bg-background/50 min-h-[200px]",
      className
    )}>
      <div className="mb-4">
        {icon || (
          <Image 
            src="/nodata.svg" 
            alt="no-data" 
            width={200} 
            height={200} 
            className="opacity-80"
          />
        )}
      </div>
      <p className="text-lg font-medium text-muted-foreground mb-4">{message}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};

export default EmptyState;
