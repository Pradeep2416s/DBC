import React, { useState, useRef, useEffect } from 'react';
import { MENU_CATEGORIES } from '../data/menu';
import { ChevronDown, Check } from 'lucide-react';

interface FilterBarProps {
  activeFilter: string;
  setActiveFilter: (id: string) => void;
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  setActiveFilter,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (categoryRef.current && !categoryRef.current.contains(target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeCategory =
    MENU_CATEGORIES.find((c) => c.id === selectedCategory) || MENU_CATEGORIES[0];

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setIsCategoryOpen(false);
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-2.5 sm:gap-3 w-full">
      {/* Category Section on left with collapsible dropdown */}
      <div ref={categoryRef} className="relative flex justify-start items-center py-0.5">
        {/* Active Category Display with Down Arrow */}
        <button
          type="button"
          onClick={() => setIsCategoryOpen((prev) => !prev)}
          className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border shadow-sm ${
            selectedCategory !== 'all'
              ? 'bg-amber-500 text-neutral-950 border-amber-400 font-extrabold shadow-amber-500/20'
              : 'bg-neutral-900 text-neutral-200 border-neutral-800 hover:border-neutral-700 hover:text-white'
          }`}
          aria-expanded={isCategoryOpen}
          aria-haspopup="listbox"
          title="Click to choose category"
        >
          <span className="text-base">{activeCategory.icon}</span>
          <span className="font-heading tracking-wide uppercase">{activeCategory.name}</span>
          <span
            className={`text-[11px] px-1.5 py-0.2 rounded-md font-extrabold ${
              selectedCategory !== 'all'
                ? 'bg-neutral-950/20 text-neutral-950'
                : 'bg-neutral-800 text-neutral-400'
            }`}
          >
            {activeCategory.count}
          </span>
          <ChevronDown
            className={`w-4 h-4 ml-0.5 stroke-[2.5] transition-transform duration-200 ${
              isCategoryOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu showing categories */}
        {isCategoryOpen && (
          <div className="absolute top-full left-0 mt-2 z-50 w-72 sm:w-80 max-h-72 overflow-y-auto bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-2.5 py-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Select Category
            </div>
            {MENU_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">{cat.icon}</span>
                    <span>{cat.name}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        isSelected
                          ? 'bg-neutral-950/20 text-neutral-950 font-bold'
                          : 'text-neutral-500 bg-neutral-950/60'
                      }`}
                    >
                      {cat.count}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Dietary Filter buttons (Veg, Non-Veg) moved to right side end */}
      <div className="flex items-center gap-2 py-0.5 ml-auto justify-end">
        {/* Veg filter button */}
        <button
          type="button"
          onClick={() => setActiveFilter(activeFilter === 'veg' ? 'all' : 'veg')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition-all border ${
            activeFilter === 'veg'
              ? 'bg-emerald-500 text-neutral-950 border-emerald-400 shadow-sm'
              : 'bg-neutral-900/90 text-neutral-300 hover:text-white border-neutral-800 hover:border-neutral-700'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 border border-emerald-300" />
          <span>Veg</span>
        </button>

        {/* Non-Veg filter button */}
        <button
          type="button"
          onClick={() => setActiveFilter(activeFilter === 'non-veg' ? 'all' : 'non-veg')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition-all border ${
            activeFilter === 'non-veg'
              ? 'bg-rose-500 text-neutral-950 border-rose-400 shadow-sm'
              : 'bg-neutral-900/90 text-neutral-300 hover:text-white border-neutral-800 hover:border-neutral-700'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 border border-rose-300" />
          <span>Non-Veg</span>
        </button>
      </div>
    </div>
  );
};
