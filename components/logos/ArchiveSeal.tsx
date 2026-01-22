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
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96'
  };

  // Using PA (2).png as Archive Seal (1563x1563, stamp-style)
  return (
    <div className={`relative ${sizeClasses[size]} ${className} mx-auto`}>
      <Image
        src="/logos/PA (2).png"
        alt={`Peloton Archive - Pro Team Issue No. ${serialNumber}`}
        width={1563}
        height={1563}
        className="object-contain w-full h-full"
        priority={size === 'large'}
        quality={95}
      />
    </div>
  );
}
