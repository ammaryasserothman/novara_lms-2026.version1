import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'outline' | 'secondary' | 'accent' | 'success' | 'warning';
    className?: string;
    size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    className,
    size = 'md'
}) => {
    const variants = {
        default: 'bg-slate-100 text-slate-700 border-transparent',
        outline: 'bg-transparent border-slate-200 text-slate-500',
        secondary: 'bg-novara-50 text-novara-700 border-novara-100',
        accent: 'bg-indigo-50 text-indigo-700 border-indigo-100',
        success: 'bg-green-50 text-green-700 border-green-100',
        warning: 'bg-yellow-50 text-yellow-700 border-yellow-100'
    };

    const sizes = {
        sm: 'px-1.5 py-0.5 text-[10px]',
        md: 'px-2.5 py-0.5 text-xs'
    };

    return (
        <span className={cn(
            "inline-flex items-center rounded-md border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            variants[variant],
            sizes[size],
            className
        )}>
            {children}
        </span>
    );
};
