import React, { useState } from 'react';
import { MenuItem, MenuVariant } from '../types/menu';
import { useSelection } from '../context/SelectionContext';
import { FoodBadge } from './FoodBadge';
import { Check, Plus } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';

interface TextMenuItemProps {
  item: MenuItem;
  onOpenDetail?: (item: MenuItem) => void;
}

export const TextMenuItem: React.FC<TextMenuItemProps> = ({ item, onOpenDetail }) => {
  const { isSelected, toggleSelect } = useSelection();
  const [selectedVariant, setSelectedVariant] = useState<MenuVariant | undefined>(
    item.variants ? item.variants[0] : undefined
  );

  const hasVariants = item.variants && item.variants.length > 0;
  const currentVariant = hasVariants ? selectedVariant : undefined;
  const activeSelected = isSelected(item.id, currentVariant?.name);

  return (
    <div
      onClick={() => onOpenDetail?.(item)}
      className="py-3 px-3.5 rounded-xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-800/60 hover:border-neutral-700/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group cursor-pointer"
    >
      {/* Left info */}
      <div className="flex-1 min-w-0 pr-2">
        <div className="flex items-center gap-2 flex-wrap">
          <FoodBadge
            vegetarian={currentVariant ? currentVariant.vegetarian : item.vegetarian}
            size="sm"
          />
          <h3 className="font-heading font-bold text-sm sm:text-base text-neutral-100 group-hover:text-amber-300 transition-colors">
            {item.name}
          </h3>
          {item.featured && (
            <span className="text-[10px] font-semibold tracking-wide text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
              Popular
            </span>
          )}
        </div>

        {item.description && (
          <p className="mt-1 text-xs text-neutral-400 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Variants selection buttons if item has dual Veg / Non-Veg prices */}
        {hasVariants && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[11px] text-neutral-500 font-medium">Variant:</span>
            <div className="inline-flex rounded-lg bg-neutral-950 p-0.5 border border-neutral-800">
              {item.variants!.map((v) => {
                const isVarActive = selectedVariant?.name === v.name;
                return (
                  <button
                    key={v.name}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVariant(v);
                    }}
                    className={`px-2 py-0.5 text-xs font-semibold rounded transition-all flex items-center gap-1 ${
                      isVarActive
                        ? 'bg-neutral-800 text-amber-400 shadow-sm'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <FoodBadge vegetarian={v.vegetarian} size="sm" />
                    <span>{v.name}</span>
                    <span className="text-neutral-400 text-[10px] font-normal">
                      ({RESTAURANT_CONFIG.currencySymbol}{v.price})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Right Price & Select Button */}
      <div className="flex items-center justify-between sm:justify-end gap-3.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-800/50">
        <div className="text-right">
          <span className="text-base sm:text-lg font-bold font-heading text-neutral-100 tracking-tight">
            {RESTAURANT_CONFIG.currencySymbol}
            {currentVariant ? currentVariant.price : item.price}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSelect(item, currentVariant);
          }}
          className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeSelected
              ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
              : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white border border-neutral-700/60'
          }`}
          aria-pressed={activeSelected}
        >
          {activeSelected ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Selected</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Select</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
