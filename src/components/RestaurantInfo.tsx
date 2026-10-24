import React from 'react';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';
import { MapPin, Phone, Clock, Compass, Instagram, ExternalLink } from 'lucide-react';

export const RestaurantInfo: React.FC = () => {
  return (
    <section id="about" className="scroll-mt-20 py-12 px-4 sm:px-6 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-heading font-black text-neutral-100 uppercase tracking-tight">
            Visit & Contact Us
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            {RESTAURANT_CONFIG.tagline}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Address Card */}
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-200 uppercase tracking-wider">
                Address
              </h3>
              <p className="mt-1.5 text-xs text-neutral-400 leading-relaxed">
                {RESTAURANT_CONFIG.address}
              </p>
              <p className="text-xs text-neutral-500 font-medium mt-0.5">
                {RESTAURANT_CONFIG.city}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800/80">
              <a
                href={RESTAURANT_CONFIG.GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Compass className="w-4 h-4" />
                <span>GET DIRECTIONS</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-200 uppercase tracking-wider">
                Opening Hours
              </h3>
              <p className="mt-1.5 text-xs text-neutral-300 font-semibold leading-relaxed">
                {RESTAURANT_CONFIG.openingHours}
              </p>
              <p className="mt-1 text-xs text-emerald-400 font-medium">
                Open Everyday • Dine-in & Takeaway
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800/80">
              <span className="text-[11px] text-neutral-500">
                Fresh preparation for every order
              </span>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-200 uppercase tracking-wider">
                Phone & Social
              </h3>
              <p className="mt-1.5 text-xs text-neutral-400">
                Table queries & reservations:
              </p>
              <a
                href={`tel:${RESTAURANT_CONFIG.phone}`}
                className="text-xs text-amber-400 font-bold block mt-1 hover:underline"
              >
                {RESTAURANT_CONFIG.phone}
              </a>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center gap-3">
              <a
                href={RESTAURANT_CONFIG.INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-300 hover:text-amber-400 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
