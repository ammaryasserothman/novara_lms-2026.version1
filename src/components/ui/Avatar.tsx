import React from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps {
    src?: string;
    name: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    role?: 'Student' | 'Instructor' | 'Admin';
}

export const Avatar: React.FC<AvatarProps> = ({
    src,
    name,
    size = 'md',
    className,
    role
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-14 h-14 text-base',
        xl: 'w-20 h-20 text-xl'
    };

    const initials = name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className={cn("relative inline-block", className)}>
            <div className={cn(
                "rounded-full overflow-hidden flex items-center justify-center font-bold text-white shadow-sm border border-white",
                sizeClasses[size],
                !src && "bg-gradient-to-br from-novara-400 to-novara-600"
            )}>
                {src ? (
                    <img
                        src={src}
                        alt={name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            // Fallback to initials if image fails
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-novara-400', 'to-novara-600');
                        }}
                    />
                ) : (
                    <span>{initials}</span>
                )}
            </div>
            {role === 'Instructor' && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-novara-500 rounded-full border-2 border-white flex items-center justify-center" title="Instructor">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
            )}
        </div>
    );
};
