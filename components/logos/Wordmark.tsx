import React from 'react';
import Image from 'next/image';

interface WordmarkProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Wordmark({ className = '', variant = 'dark' }: WordmarkProps) {
  // Using the actual wordmark image
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logos/PA (2000 x 800 px).png"
        alt="Peloton Archive"
        width={200}
        height={80}
        className={`object-contain ${variant === 'light' ? 'brightness-0 invert' : ''}`}
        priority
        style={{ height: 'auto', width: 'auto' }}
      />
    </div>
  );
}
