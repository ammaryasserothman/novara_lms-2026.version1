import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string | null;
    icon?: React.ReactNode;
    rightElement?: React.ReactNode;
    containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, containerClassName, label, error, icon, rightElement, ...props }, ref) => {
        return (
            <div className={cn("space-y-1.5", containerClassName)}>
                {label && (
                    <label className="text-sm font-bold text-slate-700 ml-1">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-novara-500 transition-colors pointer-events-none">
                            {icon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        className={cn(
                            "w-full bg-slate-50 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-novara-500/50 focus:border-novara-500 focus:bg-white transition-all placeholder:text-slate-400 text-slate-900 font-medium",
                            "py-3.5",
                            icon ? "pl-12" : "pl-4",
                            rightElement ? "pr-12" : "pr-4",
                            error && "border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50/30",
                            className
                        )}
                        {...props}
                    />

                    {rightElement && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                            {rightElement}
                        </div>
                    )}
                </div>

                {error && (
                    <p className="text-xs text-red-500 font-medium ml-1 animate-fade-in">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
