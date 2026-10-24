import React, { useState } from 'react';
import { Maximize2, X, Sparkles } from 'lucide-react';

export const ShakesMenuBanner: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="mb-8">
      {/* Menu Board Container */}
      <div className="max-w-md sm:max-w-lg mx-auto bg-neutral-900/90 border-2 border-amber-500/40 rounded-3xl p-3 sm:p-4 shadow-2xl relative group overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Tag */}
        <div className="flex items-center justify-between px-2 pb-2 text-xs text-amber-400 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Shakes Menu Board</span>
          </span>
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-amber-400 transition-colors bg-neutral-950/60 px-2.5 py-1 rounded-lg border border-neutral-800"
            title="View Fullscreen"
          >
            <Maximize2 className="w-3 h-3" />
            <span>Zoom</span>
          </button>
        </div>

        {/* Shakes Menu Poster Image */}
        <div
          onClick={() => setIsFullscreen(true)}
          className="relative rounded-2xl overflow-hidden cursor-pointer bg-neutral-950 border border-neutral-800/80 shadow-inner group/img"
        >
          <img
            src="/shakes-menu-board.jpg"
            alt="Drink Bite Cafe - Shakes Menu (Ice Cream Shakes & Cold Shakes)"
            className="w-full h-auto object-cover group-hover/img:scale-[1.02] transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-neutral-950/90 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-500/40 shadow-lg flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Tap to Enlarge Board</span>
            </span>
          </div>
        </div>

        <p className="text-center text-[11px] text-neutral-400 mt-2 font-medium">
          Ice Cream Shakes (₹70 - ₹100) • Cold Shakes (₹60 - ₹90)
        </p>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="relative max-w-lg w-full max-h-[90vh] flex flex-col items-center">
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="absolute -top-12 right-0 p-2 text-neutral-300 hover:text-white bg-neutral-900 rounded-full border border-neutral-800"
              aria-label="Close fullscreen"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src="/shakes-menu-board.jpg"
              alt="Drink Bite Cafe - Shakes Menu Fullscreen"
              className="max-h-[85vh] w-auto rounded-2xl border-2 border-amber-500/60 shadow-2xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
