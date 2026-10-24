import React from 'react';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';
import { Star, MapPin, Heart, ExternalLink } from 'lucide-react';

export const GoogleReviewSection: React.FC = () => {
  return (
    <section id="reviews" className="py-12 px-4 sm:px-6 border-t border-neutral-900 bg-neutral-950">
      <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 text-center relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-xs font-semibold text-rose-400 mb-3">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>LOVE THE FOOD?</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-heading font-black text-neutral-100 tracking-tight">
          Share your experience with us ❤️
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed">
          Your feedback helps us cook better and brings more food lovers to Drink Bite Cafe. We'd love to hear your thoughts!
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={RESTAURANT_CONFIG.GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20"
          >
            <Star className="w-4 h-4 fill-neutral-950 text-neutral-950" />
            <span>Rate us on Google ⭐</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>

          <a
            href={RESTAURANT_CONFIG.GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-neutral-700/80 transition-all"
          >
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Find Us on Google</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>
    </section>
  );
};
