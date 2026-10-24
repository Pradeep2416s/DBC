import React from 'react';
import { useSelection } from '../context/SelectionContext';
import { FoodBadge } from './FoodBadge';
import { X, Trash2, CheckCircle, ChevronRight, Hash, MessageSquare } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';

export const SelectionDrawer: React.FC = () => {
  const {
    selectedItems,
    removeSelection,
    clearSelection,
    totalCount,
    totalEstimatedPrice,
    isSelectionDrawerOpen,
    setIsSelectionDrawerOpen,
    setIsShowToWaiterOpen,
    tableNumber,
    setTableNumber,
    customerNote,
    setCustomerNote,
  } = useSelection();

  if (!isSelectionDrawerOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="selection-title"
    >
      <div
        className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div>
            <h2 id="selection-title" className="font-heading font-extrabold text-lg text-neutral-100 uppercase tracking-tight">
              Your Selection
            </h2>
            <p className="text-xs text-neutral-400">
              {totalCount} {totalCount === 1 ? 'item' : 'items'} selected for your table
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsSelectionDrawerOpen(false)}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close selection panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {selectedItems.length === 0 ? (
            <div className="py-12 text-center text-neutral-400">
              <p className="text-base font-semibold text-neutral-300">No items selected yet</p>
              <p className="text-xs mt-1 text-neutral-500">
                Browse our text or photo menu and tap "[ + Select ]" on dishes you'd like to order.
              </p>
            </div>
          ) : (
            <>
              {/* Table Number & Quick instructions */}
              <div className="bg-neutral-950/80 p-3 rounded-xl border border-neutral-800 flex items-center gap-3">
                <Hash className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div className="flex-1">
                  <label htmlFor="table-input" className="text-[11px] font-semibold text-neutral-400 block uppercase">
                    Your Table Number (Optional)
                  </label>
                  <input
                    id="table-input"
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="e.g. Table 4 or Corner Booth"
                    className="w-full bg-transparent text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none font-medium mt-0.5"
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-neutral-800/80 border border-neutral-800/80 rounded-2xl bg-neutral-950/50 overflow-hidden">
                {selectedItems.map((sel) => (
                  <div
                    key={sel.selectionId}
                    className="p-3.5 flex items-center justify-between gap-3 hover:bg-neutral-900/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FoodBadge vegetarian={sel.vegetarian} size="sm" />
                      <div className="min-w-0">
                        <p className="font-heading font-bold text-sm text-neutral-100 truncate">
                          {sel.name}
                        </p>
                        {sel.variantName && (
                          <span className="text-[11px] text-amber-400 font-medium block">
                            Variant: {sel.variantName}
                          </span>
                        )}
                        {sel.note && (
                          <span className="text-[11px] text-amber-300/80 font-medium italic block">
                            Note: {sel.note}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="font-heading font-bold text-sm text-neutral-200">
                        {RESTAURANT_CONFIG.currencySymbol}{sel.price}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeSelection(sel.selectionId)}
                        className="p-1.5 text-neutral-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
                        title="Remove from selection"
                        aria-label={`Remove ${sel.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Special instructions / notes for waiter */}
              <div className="bg-neutral-950/80 p-3 rounded-xl border border-neutral-800 flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <label htmlFor="notes-input" className="text-[11px] font-semibold text-neutral-400 block uppercase">
                    Preferences for Waiter (Optional)
                  </label>
                  <input
                    id="notes-input"
                    type="text"
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder="e.g. Extra spicy, no onions, ice in shake"
                    className="w-full bg-transparent text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none mt-0.5"
                  />
                </div>
              </div>

              {/* Total Summary */}
              <div className="pt-2 flex items-center justify-between text-xs text-neutral-400">
                <span>Total Items: <strong className="text-neutral-200">{totalCount}</strong></span>
                <span>Estimated Total: <strong className="text-amber-400 font-heading font-bold text-base">{RESTAURANT_CONFIG.currencySymbol}{totalEstimatedPrice}</strong></span>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {selectedItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950/80 space-y-2.5">
            <button
              type="button"
              onClick={() => {
                setIsSelectionDrawerOpen(false);
                setIsShowToWaiterOpen(true);
              }}
              className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-heading font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4 stroke-[2.5]" />
              <span>SHOW TO WAITER</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={clearSelection}
              className="w-full py-2 text-xs font-semibold text-neutral-500 hover:text-rose-400 transition-colors"
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
