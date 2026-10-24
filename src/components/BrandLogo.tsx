import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withGlow?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  withGlow = false,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 ${sizeMap[size]} ${className}`}
    >
      {withGlow && (
        <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-md pointer-events-none scale-110" />
      )}
      <img
        src="/logo.png"
        alt="Drink Bite Cafe Emblem"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover rounded-full border border-amber-500/40 shadow-lg shadow-black/50"
        onError={(e) => {
          // Fallback if image fails to load
          const target = e.currentTarget;
          target.style.display = 'none';
          if (target.parentElement) {
            target.parentElement.innerHTML = `
              <div class="w-full h-full rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center font-black text-amber-400 font-heading text-sm">
                DB
              </div>
            `;
          }
        }}
      />
    </div>
  );
};
