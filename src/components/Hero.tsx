import React from 'react';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';
import { ArrowDown, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeroProps {
  onSelectCategory?: (categoryId: string) => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section
      className="relative overflow-hidden pt-10 pb-12 sm:pt-16 sm:pb-18 border-b border-neutral-900 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 12, 0.72) 0%, rgba(10, 10, 12, 0.84) 65%, rgba(10, 10, 12, 0.98) 100%), url('/cafe-hero-bg.jpg')`,
      }}
    >
      {/* Background ambient warm glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative text-center max-w-3xl mx-auto flex flex-col items-center">
          {/* Official Restaurant Logo Emblem */}
          <div className="mb-4">
            <BrandLogo size="xl" withGlow className="hover:scale-105 transition-transform duration-300 ring-4 ring-amber-500/20 rounded-full" />
          </div>

          {/* Subtle badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-xs text-amber-400 font-medium mb-3 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Table Menu • QR Order Assistant</span>
          </div>

          {/* Restaurant Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-heading text-neutral-100 tracking-tight uppercase drop-shadow-md">
            {RESTAURANT_CONFIG.name}
          </h1>

          {/* Tagline */}
          <p className="mt-3 text-base sm:text-xl font-medium text-amber-400 tracking-wide drop-shadow">
            {RESTAURANT_CONFIG.tagline}
          </p>

          <p className="mt-2 text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto drop-shadow-sm">
            Browse our complete visual menu, select your favorite dishes, and present your selection directly to your waiter at the table.
          </p>

          {/* Call to action */}
          <div className="mt-6 flex items-center justify-center">
            <button
              type="button"
              onClick={onExploreClick}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 hover:scale-105"
            >
              <span>Explore Menu</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
