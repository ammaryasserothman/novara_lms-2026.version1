import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 512 512" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
       {/* Book Base */}
       <path d="M96 416C96 416 176 448 256 416C336 448 416 416 416 416V464C416 464 336 496 256 464C176 496 96 464 96 464V416Z" fill="#0D9488"/>
       <path d="M256 416V464C176 496 96 464 96 464V416C96 416 176 448 256 416Z" fill="#0F766E"/>
       
       {/* Pages Detail */}
       <path d="M106 406C106 406 176 432 246 406" stroke="white" strokeWidth="12" strokeLinecap="round" strokeOpacity="0.5"/>
       <path d="M266 406C266 406 336 432 406 406" stroke="white" strokeWidth="12" strokeLinecap="round" strokeOpacity="0.5"/>

       {/* Lighthouse Tower */}
       <path d="M192 416H320L304 160H208L192 416Z" fill="#14B8A6"/>
       
       {/* Stripes */}
       <path d="M200 360L312 340" stroke="white" strokeWidth="20" strokeLinecap="round"/>
       <path d="M204 290L308 270" stroke="white" strokeWidth="20" strokeLinecap="round"/>
       <path d="M208 220L304 200" stroke="white" strokeWidth="20" strokeLinecap="round"/>

       {/* Lantern Room Platform */}
       <rect x="192" y="160" width="128" height="16" rx="4" fill="#0F766E"/>

       {/* Lantern Room */}
       <rect x="208" y="96" width="96" height="64" rx="8" fill="#CCFBF1"/>
       <rect x="216" y="104" width="80" height="48" rx="4" fill="#14B8A6"/>
       
       {/* Light Source */}
       <circle cx="256" cy="128" r="16" fill="#FDE047"/>

       {/* Roof */}
       <path d="M192 96C192 64 256 32 256 32C256 32 320 64 320 96H192Z" fill="#0F766E"/>
       <circle cx="256" cy="32" r="8" fill="#0F766E"/>

       {/* Light Beams */}
       <path d="M296 128L480 64V192L296 128Z" fill="url(#beam_right)" fillOpacity="0.6"/>
       <path d="M216 128L32 64V192L216 128Z" fill="url(#beam_left)" fillOpacity="0.6"/>

       <defs>
          <linearGradient id="beam_right" x1="296" y1="128" x2="480" y2="128" gradientUnits="userSpaceOnUse">
             <stop stopColor="#FEF08A"/>
             <stop offset="1" stopColor="#FEF08A" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="beam_left" x1="216" y1="128" x2="32" y2="128" gradientUnits="userSpaceOnUse">
             <stop stopColor="#FEF08A"/>
             <stop offset="1" stopColor="#FEF08A" stopOpacity="0"/>
          </linearGradient>
       </defs>
    </svg>
  );
};