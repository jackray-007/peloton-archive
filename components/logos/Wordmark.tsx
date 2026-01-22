import React from 'react';
import Image from 'next/image';

interface WordmarkProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
}

export default function Wordmark({ 
  className = '', 
  variant = 'dark',
  size = 'medium'
}: WordmarkProps) {
  // Size configurations for different contexts
  const sizeConfig = {
    small: { width: 120, height: 48 },   // Navbar
    medium: { width: 180, height: 72 }, // Footer
    large: { width: 240, height: 96 }   // Hero/featured
  };

  const config = sizeConfig[size];

  return (
    <div className={`relative inline-block ${className}`}>
      <Image
        src="/logos/PA (2000 x 800 px).png"
        alt="Peloton Archive"
        width={config.width}
        height={config.height}
        className={`object-contain ${variant === 'light' ? 'brightness-0 invert' : ''}`}
        priority={size === 'large'}
        style={{ 
          height: 'auto', 
          width: 'auto',
          maxWidth: `${config.width}px`,
          maxHeight: `${config.height}px`
        }}
      />
    </div>
  );
}
