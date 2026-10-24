import React, { useState } from 'react';
import { MenuItem, MenuVariant } from '../types/menu';
import { useSelection } from '../context/SelectionContext';
import { FoodBadge } from './FoodBadge';
import { Check, Plus, Utensils } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';

interface PhotoMenuItemProps {
  item: MenuItem;
  onOpenDetail?: (item: MenuItem) => void;
}

export const PhotoMenuItem: React.FC<PhotoMenuItemProps> = ({ item, onOpenDetail }) => {
  const { isSelected, toggleSelect } = useSelection();
  const [imgError, setImgError] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<MenuVariant | undefined>(
    item.variants ? item.variants[0] : undefined
  );

  const hasVariants = item.variants && item.variants.length > 0;
  const currentVariant = hasVariants ? selectedVariant : undefined;
  const activeSelected = isSelected(item.id, currentVariant?.name);

  const handleCardClick = () => {
    if (onOpenDetail) {
      onOpenDetail(item);
    }
  };

  return (
    <article
      onClick={handleCardClick}
      className="group flex flex-col rounded-2xl bg-neutral-900/70 border border-neutral-800/80 overflow-hidden hover:border-neutral-700/80 transition-all hover:-translate-y-0.5 shadow-sm cursor-pointer select-none"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View details for ${item.name}`}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full bg-neutral-900 overflow-hidden">
        {!imgError ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900 text-neutral-600 p-4">
            <Utensils className="w-8 h-8 mb-1 opacity-50" />
            <span className="text-[11px] font-medium text-neutral-500">{item.category}</span>
          </div>
        )}

        {/* Veg/Non-Veg badge on top left */}
        <div className="absolute top-2 left-2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-neutral-950/80 backdrop-blur-md border border-neutral-800/80 flex items-center gap-1 shadow-md">
          <FoodBadge
            vegetarian={currentVariant ? currentVariant.vegetarian : item.vegetarian}
            size="sm"
            showLabel
          />
        </div>

        {/* Price tag on top right */}
        <div className="absolute top-2 right-2 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-neutral-950/85 backdrop-blur-md border border-neutral-800/80 font-heading font-extrabold text-xs sm:text-sm text-neutral-100 shadow-md">
          {RESTAURANT_CONFIG.currencySymbol}
          {currentVariant ? currentVariant.price : item.price}
        </div>

        {item.featured && (
          <div className="absolute bottom-2 left-2 px-1.5 sm:px-2 py-0.5 rounded bg-amber-500 text-neutral-950 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow">
            Popular
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-2.5 sm:p-3.5 flex flex-col flex-1 justify-between gap-2 sm:gap-3">
        <div>
          <h3 className="font-heading font-bold text-xs sm:text-base text-neutral-100 group-hover:text-amber-400 transition-colors line-clamp-1">
            {item.name}
          </h3>

          {item.description && (
            <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-neutral-400 leading-snug sm:leading-relaxed line-clamp-2">
              {item.description}
            </p>
          )}

          {/* Dual price variant selector if applicable */}
          {hasVariants && (
            <div className="mt-2 pt-1.5 sm:pt-2 border-t border-neutral-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[10px] sm:text-[11px] text-neutral-400 font-medium">Variant:</span>
              <div className="inline-flex rounded-lg bg-neutral-950 p-0.5 border border-neutral-800 self-start sm:self-auto">
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
                      className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded transition-all flex items-center gap-1 ${
                        isVarActive
                          ? 'bg-neutral-800 text-amber-400 shadow-sm'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <FoodBadge vegetarian={v.vegetarian} size="sm" />
                      <span>{v.name}</span>
                      <span className="text-[9px] sm:text-[10px] text-neutral-400">
                        {RESTAURANT_CONFIG.currencySymbol}{v.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Action button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSelect(item, currentVariant);
          }}
          className={`w-full py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeSelected
              ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
              : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700/60'
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
    </article>
  );
};
