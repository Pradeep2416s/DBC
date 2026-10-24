import React from 'react';
import { useSelection } from '../context/SelectionContext';
import { UtensilsCrossed } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenQr?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const { totalCount, setIsSelectionDrawerOpen } = useSelection();

  return (
    <header className="sticky top-0 z-40 w-full bg-black/95 backdrop-blur-md border-b border-amber-600/40 shadow-xl transition-all">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 border-x border-amber-600/20"
        style={{
          background: 'linear-gradient(90deg, #050402 0%, #2b1803 30%, #522d05 50%, #2b1803 70%, #050402 100%)',
        }}
      >
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group" aria-label="DRINK BITE">
          <BrandLogo size="md" withGlow className="group-hover:scale-105 transition-transform" />
          <span className="font-heading font-black text-sm sm:text-base tracking-tight text-amber-100 uppercase group-hover:text-amber-300 transition-colors">
            DRINK BITE
          </span>
        </a>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Selection indicator trigger */}
          <button
            type="button"
            onClick={() => setIsSelectionDrawerOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all bg-neutral-900/90 hover:bg-neutral-800 text-amber-400 border border-amber-500/40 hover:border-amber-400 shadow-md shadow-amber-500/10"
            aria-label={`View your selection: ${totalCount} items`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span className="font-semibold text-neutral-100">Selected</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[11px] font-extrabold ${
                totalCount > 0 ? 'bg-amber-400 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
              }`}
            >
              {totalCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
