import React from 'react';

interface WordmarkProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Wordmark({ className = '', variant = 'dark' }: WordmarkProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-black';
  
  return (
    <div className={`flex flex-col ${className}`}>
      <span className={`text-sm font-bold tracking-tight uppercase leading-tight ${textColor}`}>
        PELOTON
      </span>
      <span className={`text-sm font-bold tracking-tight uppercase leading-tight ${textColor}`}>
        ARCHIVE
      </span>
    </div>
  );
}
