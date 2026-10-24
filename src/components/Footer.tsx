import React from 'react';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';
import { ArrowUp, UtensilsCrossed } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 py-10 px-4 sm:px-6 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <BrandLogo size="lg" withGlow />
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-neutral-100 font-heading font-black text-base uppercase">
              <span>{RESTAURANT_CONFIG.name}</span>
            </div>
            <p className="mt-1 text-amber-400 font-medium">
              {RESTAURANT_CONFIG.tagline}
            </p>
            <p className="mt-1 text-neutral-500 max-w-sm">
              Digital QR Menu & Waiter Assistant. No online transactions or payments are conducted here.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-4 text-xs font-medium">
            <a href="#menu" className="hover:text-amber-400 transition-colors">Menu</a>
            <a href="#reviews" className="hover:text-amber-400 transition-colors">Google Reviews</a>
            <a href="#about" className="hover:text-amber-400 transition-colors">Contact</a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-amber-400 transition-colors"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-neutral-900/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-600">
        <p>&copy; {new Date().getFullYear()} {RESTAURANT_CONFIG.name}. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          <UtensilsCrossed className="w-3 h-3 text-amber-500" />
          <span>Made for pleasant table dining experiences</span>
        </p>
      </div>
    </footer>
  );
};
