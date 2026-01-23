import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  glass = false, 
  hover = false,
  padding = 'md',
  ...props
}) => {
  const baseStyles = "rounded-2xl transition-all duration-300";
  const bgStyles = glass 
    ? "glass-panel" 
    : "bg-white border border-slate-100 shadow-sm";
  
  const hoverStyles = hover ? "hover:shadow-lg hover:-translate-y-1" : "";
  
  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };

  return (
    <div 
      className={`${baseStyles} ${bgStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};