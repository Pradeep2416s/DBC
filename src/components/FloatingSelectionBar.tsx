import React from 'react';
import { useSelection } from '../context/SelectionContext';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';

export const FloatingSelectionBar: React.FC = () => {
  const { totalCount, totalEstimatedPrice, setIsSelectionDrawerOpen } = useSelection();

  if (totalCount === 0) return null;

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 px-4 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <button
          type="button"
          onClick={() => setIsSelectionDrawerOpen(true)}
          className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 p-3.5 rounded-2xl shadow-2xl shadow-amber-500/30 flex items-center justify-between border border-amber-400 transition-all hover:scale-[1.02] active:scale-[0.99]"
          aria-label="Open your selection drawer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-950 text-amber-400 flex items-center justify-center font-black text-sm">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-extrabold uppercase tracking-wide">
                Your Selection • {totalCount} {totalCount === 1 ? 'item' : 'items'}
              </p>
              <p className="text-[11px] font-semibold text-neutral-900/80">
                Tap to review & show to waiter ({RESTAURANT_CONFIG.currencySymbol}{totalEstimatedPrice})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-neutral-950 text-amber-400 px-3 py-1.5 rounded-xl text-xs font-extrabold">
            <span>View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>
    </div>
  );
};
