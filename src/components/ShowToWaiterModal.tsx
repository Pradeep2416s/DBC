import React from 'react';
import { useSelection } from '../context/SelectionContext';
import { FoodBadge } from './FoodBadge';
import { BrandLogo } from './BrandLogo';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';
import { RotateCcw, X, ArrowLeft } from 'lucide-react';

export const ShowToWaiterModal: React.FC = () => {
  const {
    selectedItems,
    clearSelection,
    isShowToWaiterOpen,
    setIsShowToWaiterOpen,
    tableNumber,
    customerNote,
    totalCount,
    totalEstimatedPrice,
  } = useSelection();

  if (!isShowToWaiterOpen) return null;

  const handleStartNew = () => {
    if (window.confirm('Start a new selection? This will clear your current list.')) {
      clearSelection();
      setIsShowToWaiterOpen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md bg-neutral-950 border-2 border-amber-500/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Top bar with back & close */}
        <div className="p-3.5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsShowToWaiterOpen(false)}
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Menu</span>
          </button>

          <div className="flex items-center gap-1.5">
            <BrandLogo size="sm" />
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              {RESTAURANT_CONFIG.name}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsShowToWaiterOpen(false)}
            className="p-1 text-neutral-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Waiter Presentation Sheet */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 bg-gradient-to-b from-neutral-950 to-neutral-900">
          <div className="text-center pb-2 flex flex-col items-center">
            <BrandLogo size="lg" withGlow className="mb-3" />

            <h2 className="font-heading font-black text-2xl text-neutral-100 tracking-tight uppercase">
              YOUR SELECTION
            </h2>

            {tableNumber ? (
              <div className="mt-1 inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-sm border border-amber-500/40">
                TABLE: {tableNumber.toUpperCase()}
              </div>
            ) : (
              <p className="text-xs text-neutral-400 mt-0.5">Table Dining Selection</p>
            )}

            <div className="mt-3 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-semibold text-amber-400/95">
              Please show this screen to your waiter
            </div>
          </div>

          {/* Clean Item List */}
          <div className="border-t border-b border-dashed border-neutral-700 py-3 space-y-3">
            {selectedItems.map((item, idx) => (
              <div
                key={item.selectionId}
                className="flex items-start justify-between gap-3 text-left py-1"
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold text-sm select-none">
                    {idx + 1}.
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <FoodBadge vegetarian={item.vegetarian} size="sm" />
                      <span className="font-heading font-bold text-base text-neutral-100 leading-snug">
                        {item.name}
                      </span>
                    </div>
                    {item.variantName && (
                      <span className="text-xs font-bold text-amber-400 block mt-0.5">
                        &bull; {item.variantName}
                      </span>
                    )}
                    {item.note && (
                      <span className="text-xs text-amber-300/90 font-medium italic block mt-0.5">
                        Note: {item.note}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="font-heading font-bold text-sm text-neutral-300">
                    {RESTAURANT_CONFIG.currencySymbol}{item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Customer preference note if provided */}
          {customerNote && (
            <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-left">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                Special Request / Note:
              </span>
              <p className="text-xs text-amber-300 font-medium mt-0.5 italic">
                "{customerNote}"
              </p>
            </div>
          )}

          {/* Total display */}
          <div className="flex items-center justify-between pt-1 text-sm">
            <span className="text-neutral-400 font-medium">
              Items: <strong className="text-neutral-100">{totalCount}</strong>
            </span>
            <span className="text-neutral-400 font-medium">
              Estimated Total: <strong className="text-amber-400 font-heading font-black text-lg">{RESTAURANT_CONFIG.currencySymbol}{totalEstimatedPrice}</strong>
            </span>
          </div>

          <div className="pt-2 text-center">
            <p className="text-[11px] text-neutral-500 leading-tight">
              This is a digital table selection to assist your ordering. No online transaction is made.
            </p>
          </div>
        </div>

        {/* Actions footer */}
        <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleStartNew}
            className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 border border-neutral-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start New Selection</span>
          </button>
        </div>
      </div>
    </div>
  );
};
