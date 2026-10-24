import React, { useState, useEffect } from 'react';
import { MenuItem, MenuVariant } from '../types/menu';
import { useSelection } from '../context/SelectionContext';
import { FoodBadge } from './FoodBadge';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';
import { X, Check, Plus, MessageSquare, Utensils, UtensilsCrossed } from 'lucide-react';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose }) => {
  const { isSelected, toggleSelect, selectedItems, updateItemNote } = useSelection();

  const [selectedVariant, setSelectedVariant] = useState<MenuVariant | undefined>(undefined);
  const [note, setNote] = useState<string>('');

  // Sync state when item changes
  useEffect(() => {
    if (item) {
      const defaultVar = item.variants && item.variants.length > 0 ? item.variants[0] : undefined;
      setSelectedVariant(defaultVar);

      // Check if existing selection has a note
      const sId = defaultVar ? `${item.id}-${defaultVar.name}` : item.id;
      const existing = selectedItems.find((s) => s.selectionId === sId);
      setNote(existing?.note || '');
    }
  }, [item, selectedItems]);

  if (!item) return null;

  const hasVariants = item.variants && item.variants.length > 0;
  const currentVariant = hasVariants ? selectedVariant : undefined;
  const selectionId = currentVariant ? `${item.id}-${currentVariant.name}` : item.id;
  const activeSelected = isSelected(item.id, currentVariant?.name);
  const currentPrice = currentVariant ? currentVariant.price : item.price;
  const isVeg = currentVariant ? currentVariant.vegetarian : item.vegetarian;

  // Handle selecting or deselecting
  const handleSelectToggle = () => {
    toggleSelect(item, currentVariant, note);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNote(val);
    if (activeSelected) {
      updateItemNote(selectionId, val);
    }
  };

  // Derive highlights or included items
  const getHighlights = () => {
    if (item.highlights && item.highlights.length > 0) {
      return item.highlights;
    }
    const cat = item.category.toUpperCase();
    const name = item.name.toLowerCase();

    if (cat.includes('COMBO') || name.includes('combo')) {
      if (name.includes('burger')) {
        return ['Crispy Grilled Burger', 'Golden French Fries', 'Chilled Drink & Dip'];
      }
      if (name.includes('pizza')) {
        return ['Freshly Baked Pizza', 'Salted French Fries', 'Chilled Soft Drink'];
      }
      if (name.includes('wrap')) {
        return ['Rolled Tortilla Wrap', 'Crispy French Fries', 'Signature Dip & Drink'];
      }
      if (name.includes('solo')) {
        return ['1 Pc Crunchy Fried Chicken', 'Regular French Fries', '1 Signature Mayo Dip'];
      }
      if (name.includes('meet up')) {
        return ['2 Pcs Crispy Fried Chicken', 'Seasoned French Fries', '2 Cafe Dips & Drink'];
      }
      if (name.includes('couple')) {
        return ['3 Pcs Crispy Fried Chicken', 'Peri Peri French Fries', '2 Dips & 2 Soft Drinks'];
      }
      if (name.includes('friendship')) {
        return ['4 Pcs Crispy Fried Chicken', 'Loaded Cheesy Fries', 'Popcorn & Dips'];
      }
      if (name.includes('family') || name.includes('party')) {
        return ['6-10 Pcs Fried Chicken', 'Large Loaded Fries & Popcorn', 'Assorted Dips & Large Beverage'];
      }
      return ['Main Specialty Dish', 'Seasoned Side Fries', 'Accompanying Sauce & Beverage'];
    }

    if (cat.includes('MOMOS')) {
      return [
        'Fresh Hand-Crafted Dumplings (6 Pcs)',
        'Fiery Red Garlic Chutney',
        'Special Smooth Mayo Dip',
      ];
    }

    if (cat.includes('PIZZA')) {
      return [
        'Freshly Rolled Crust Baked to Order',
        '100% Real Mozzarella & Rich Pizza Marinara',
        'Italian Herb Seasoning & Spices',
      ];
    }

    if (cat.includes('BURGER')) {
      return [
        'Soft Toasted Sesame Bun',
        'Crisp Lettuce, Fresh Tomato & Onion',
        'Special House Burger Mayo',
      ];
    }

    if (cat.includes('COOL') || cat.includes('SHAKE') || cat.includes('MOJITO')) {
      return [
        'Crafted Fresh to Order',
        'Chilled Ingredients & Premium Syrups',
        'Served in Chilled Glass with Garnishes',
      ];
    }

    return [
      'Made Fresh to Order with House Spices',
      'Served Hot with Accompanying Sauces',
    ];
  };

  const highlights = getHighlights();

  // Derive portion subtitle text
  const getPortionSubtitle = () => {
    if (item.portion) return item.portion;
    const name = item.name.toLowerCase();
    if (name.includes('solo')) return 'Portion: 1 Pc + Fries';
    if (name.includes('meet up')) return 'Portion: 2 Pc + Fries';
    if (name.includes('couple')) return 'Portion: 3 Pc + Fries';
    if (name.includes('friendship')) return 'Portion: 4 Pc + Loaded Fries';
    if (name.includes('family')) return 'Portion: 6 Pc Bucket';
    if (name.includes('party')) return 'Portion: 10 Pc Feast';
    if (name.includes('2pc')) return 'Portion: 2 Pieces';
    if (name.includes('3pc')) return 'Portion: 3 Pieces';
    if (name.includes('4pc')) return 'Portion: 4 Pieces';
    if (name.includes('6pc')) return 'Portion: 6 Pieces';
    if (name.includes('8pc')) return 'Portion: 8 Pieces';
    if (name.includes('10pc')) return 'Portion: 10 Pieces';
    if (item.category.includes('MOMOS')) return 'Portion: 6 Pcs Steamed/Fried';
    if (item.category.includes('PIZZA')) return 'Portion: Regular 7-inch Personal';
    if (item.category.includes('BURGER')) return 'Portion: 1 Full Burger';
    if (item.category.includes('SANDWICH')) return 'Portion: 2/3 Grilled Slices';
    if (item.category.includes('COOL')) return 'Portion: 350ml Chilled';
    return `Category: ${item.subcategory || item.category}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-[2rem] shadow-2xl overflow-hidden my-auto relative text-neutral-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Hero Image */}
        <div className="relative aspect-[16/10] w-full bg-neutral-950 overflow-hidden flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain"
          />

          {/* Top Left Veg/Non-Veg Badge Pill matching screenshot */}
          <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-neutral-950/85 backdrop-blur-md border border-neutral-800/90 flex items-center gap-2 shadow-lg">
            <span
              className={`w-2 h-2 rounded-full ${
                isVeg ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-rose-500 shadow-sm shadow-rose-500/50'
              }`}
            />
            <span className="text-xs font-bold text-neutral-200">
              {isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            </span>
          </div>

          {/* Top Right Close circular button matching screenshot */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-neutral-950/85 backdrop-blur-md text-neutral-300 hover:text-white flex items-center justify-center border border-neutral-800/90 hover:bg-neutral-900 transition-colors shadow-lg"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Title & Price Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-neutral-100 tracking-tight leading-snug">
                {item.name}
              </h2>
              <p className="text-xs text-neutral-400 font-medium mt-0.5">
                {getPortionSubtitle()}
              </p>
            </div>

            <div className="text-right flex-shrink-0">
              <span className="text-[10px] tracking-wider text-neutral-400 font-bold uppercase block">
                PRICE
              </span>
              <span className="font-heading font-black text-2xl sm:text-3xl text-amber-400 leading-none">
                {RESTAURANT_CONFIG.currencySymbol}{currentPrice}
              </span>
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {item.description}
            </p>
          )}

          {/* Variant Selector (if dual price / Veg & Non-Veg) */}
          {hasVariants && (
            <div className="bg-neutral-950/80 p-3 rounded-2xl border border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-300 font-semibold">
                Select Variant:
              </span>
              <div className="inline-flex rounded-xl bg-neutral-900 p-1 border border-neutral-800">
                {item.variants!.map((v) => {
                  const isVarActive = selectedVariant?.name === v.name;
                  return (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                        isVarActive
                          ? 'bg-amber-500 text-neutral-950 shadow-sm'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <FoodBadge vegetarian={v.vegetarian} size="sm" />
                      <span>{v.name}</span>
                      <span className="text-[11px] font-normal opacity-80">
                        ({RESTAURANT_CONFIG.currencySymbol}{v.price})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Combo / Items Included Highlights Box matching screenshot */}
          <div className="bg-neutral-950/70 border border-neutral-800/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-heading font-black text-xs uppercase tracking-wide">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>
                {item.category.includes('COMBO') || item.name.toLowerCase().includes('combo')
                  ? 'ITEMS INCLUDED IN THIS COMBO'
                  : 'HIGHLIGHTS & DETAILS'}
              </span>
            </div>

            <ul className="space-y-1.5 pt-1">
              {highlights.map((line, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Special Preference for Waiter (Optional) matching screenshot */}
          <div className="space-y-1.5">
            <label
              htmlFor="detail-preference-input"
              className="text-xs font-semibold text-amber-400/90 flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Special Preference for Waiter (Optional)</span>
            </label>
            <input
              id="detail-preference-input"
              type="text"
              value={note}
              onChange={handleNoteChange}
              placeholder="e.g. Less spicy, Extra ketchup, No ice..."
              className="w-full bg-neutral-950/90 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Action Buttons matching screenshot */}
        <div className="p-4 sm:p-5 bg-neutral-950/90 border-t border-neutral-800 flex items-center gap-3">
          <button
            type="button"
            onClick={handleSelectToggle}
            className={`flex-1 py-3 px-5 rounded-2xl font-heading font-black text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg ${
              activeSelected
                ? 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-emerald-500/20'
                : 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-amber-400/25'
            }`}
          >
            {activeSelected ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>✓ ITEM SELECTED</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>+ SELECT THIS ITEM</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="py-3 px-6 rounded-2xl bg-neutral-800/90 hover:bg-neutral-700 text-neutral-300 hover:text-white font-bold text-xs sm:text-sm border border-neutral-700/60 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
