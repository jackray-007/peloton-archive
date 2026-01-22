import React from 'react';

interface BikeIconProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: number;
}

export default function BikeIcon({ 
  className = '', 
  variant = 'dark',
  size = 24 
}: BikeIconProps) {
  const strokeColor = variant === 'light' ? 'white' : 'black';
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Rear wheel */}
      <circle cx="6" cy="18" r="4" stroke={strokeColor} strokeWidth="1.5" fill="none"/>
      <circle cx="6" cy="18" r="1.5" fill={strokeColor}/>
      
      {/* Front wheel */}
      <circle cx="18" cy="18" r="4" stroke={strokeColor} strokeWidth="1.5" fill="none"/>
      <circle cx="18" cy="18" r="1.5" fill={strokeColor}/>
      
      {/* Frame - triangle */}
      <path
        d="M 6 18 L 12 6 L 18 18"
        stroke={strokeColor}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Handlebars */}
      <path
        d="M 12 6 L 16 4"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Seat */}
      <ellipse
        cx="8"
        cy="14"
        rx="1.5"
        ry="0.8"
        fill={strokeColor}
      />
    </svg>
  );
}
