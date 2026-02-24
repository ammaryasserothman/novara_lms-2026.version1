import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LoadingProps {
  className?: string;
  size?: number;
}

export const Loading: React.FC<LoadingProps> = ({ className, size = 40 }) => {
  return (
    <div className={cn("flex items-center justify-center w-full h-full min-h-[50vh]", className)}>
      <Loader2 size={size} className="animate-spin text-novara-500" />
    </div>
  );
};
