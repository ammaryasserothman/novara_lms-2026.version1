import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LoadingProps {
    className?: string;
    size?: number;
    text?: string;
}

export const Loading: React.FC<LoadingProps> = ({
    className,
    size = 40,
    text = "Loading..."
}) => {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center min-h-[50vh] p-8",
            className
        )}>
            <Loader2
                size={size}
                className="animate-spin text-novara-600 mb-4"
            />
            {text && (
                <p className="text-slate-500 font-medium animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );
};
