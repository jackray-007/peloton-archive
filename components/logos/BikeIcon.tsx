import React from 'react';
import Image from 'next/image';

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
  // Using PA (1).png as bike icon (1000x1000, likely the minimalist bike)
  // If this is wrong, we can swap to PA.png
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size, lineHeight: 0 }}>
      <Image
        src="/logos/PA (1).png"
        alt="Peloton Archive"
        width={size}
        height={size}
        className={`object-contain ${variant === 'light' ? 'brightness-0 invert' : ''}`}
        style={{ 
          width: '100%', 
          height: '100%', 
          display: 'block'
        }}
      />
    </div>
  );
}
