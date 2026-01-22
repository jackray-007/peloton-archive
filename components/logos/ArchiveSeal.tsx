import React from 'react';
import Image from 'next/image';

interface ArchiveSealProps {
  serialNumber?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function ArchiveSeal({ 
  serialNumber = '001',
  className = '',
  size = 'large'
}: ArchiveSealProps) {
  const sizeClasses = {
    small: 'w-40 h-40',
    medium: 'w-56 h-56 md:w-64 md:h-64',
    large: 'w-72 h-72 md:w-80 md:h-80'
  };

  // Using PA (2).png as Archive Seal (1563x1563, stamp-style)
  return (
    <div className={`relative ${sizeClasses[size]} ${className} mx-auto`} style={{ lineHeight: 0 }}>
      <Image
        src="/logos/PA (2).png"
        alt={`Peloton Archive - Pro Team Issue No. ${serialNumber}`}
        width={1563}
        height={1563}
        className="object-contain w-full h-full drop-shadow-lg"
        priority={size === 'large' || size === 'medium'}
        quality={90}
        style={{ display: 'block' }}
      />
    </div>
  );
}
