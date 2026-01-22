import React from 'react';

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

  const textSizes = {
    small: { main: 'text-[8px]', sub: 'text-[7px]', serial: 'text-[7px]' },
    medium: { main: 'text-[10px]', sub: 'text-[8px]', serial: 'text-[9px]' },
    large: { main: 'text-xs md:text-sm', sub: 'text-[9px] md:text-[10px]', serial: 'text-[10px] md:text-xs' }
  };

  const sizes = textSizes[size];

  // TODO: Replace with actual Archive Seal image when available
  // This is a styled implementation matching the brand guidelines
  return (
    <div className={`relative ${sizeClasses[size]} ${className} mx-auto`}>
      {/* Stamp-style container with perforated border */}
      <div className="relative w-full h-full bg-white/98 border-2 border-black/30 rounded-sm shadow-xl p-3 md:p-4">
        {/* Perforated border effect - using CSS to create stamp edge */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px),
                             repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)`,
            borderRadius: '2px',
          }}
        />
        
        {/* Content container */}
        <div className="relative h-full flex flex-col justify-between z-10">
          {/* Top section: Brand text */}
          <div className="text-center mb-2">
            <div className={`${sizes.main} font-bold text-black tracking-tight uppercase leading-tight mb-0.5`}>
              PELOTON
            </div>
            <div className={`${sizes.main} font-bold text-black tracking-tight uppercase leading-tight mb-1`}>
              ARCHIVE
            </div>
            <div className={`${sizes.sub} font-medium text-black/80 tracking-wide uppercase`}>
              PRO TEAM ISSUE
            </div>
          </div>
          
          {/* Middle section: Checkerboard with bike icon */}
          <div className="flex-1 relative my-2 overflow-hidden rounded-sm" style={{ minHeight: '40%' }}>
            {/* Checkerboard racing heritage pattern */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, #1e40af 0px, #1e40af 6px, #ffffff 6px, #ffffff 12px),
                  repeating-linear-gradient(90deg, #1e40af 0px, #1e40af 6px, #ffffff 6px, #ffffff 12px)
                `,
                backgroundSize: '12px 12px',
              }}
            />
            
            {/* Bike icon overlay - centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                width="55%"
                height="55%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black/90"
              >
                <circle cx="6" cy="18" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="18" cy="18" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path
                  d="M 6 18 L 12 6 L 18 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 12 6 L 16 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <ellipse
                  cx="8"
                  cy="14"
                  rx="1.5"
                  ry="0.8"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          
          {/* Bottom section: Serial number */}
          <div className="text-right mt-2">
            <div className={`${sizes.serial} font-bold text-black/90 tracking-tight uppercase`}>
              No.
            </div>
            <div className={`${sizes.serial} font-bold text-black tracking-tight`}>
              {serialNumber}
            </div>
          </div>
        </div>
        
        {/* Paper texture overlay for vintage/archival feel */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.08] rounded-sm"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            mixBlendMode: 'multiply'
          }}
        />
      </div>
    </div>
  );
}
