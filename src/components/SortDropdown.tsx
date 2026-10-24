import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, ArrowUpNarrowWide, ArrowDownWideNarrow, Check, ChevronDown } from 'lucide-react';

export type SortOption = 'default' | 'price-asc' | 'price-desc';

interface SortOptionConfig {
  id: SortOption;
  label: string;
  shortLabel: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}

const SORT_OPTIONS: SortOptionConfig[] = [
  {
    id: 'default',
    label: 'Default Order',
    shortLabel: 'Default',
    description: 'Curated cafe menu order',
    icon: ArrowUpDown,
  },
  {
    id: 'price-asc',
    label: 'Price: Low to High',
    shortLabel: 'Low to High',
    description: 'Affordable items first (₹ → ₹₹₹)',
    icon: ArrowUpNarrowWide,
  },
  {
    id: 'price-desc',
    label: 'Price: High to Low',
    shortLabel: 'High to Low',
    description: 'Specialties & Combos first (₹₹₹ → ₹)',
    icon: ArrowDownWideNarrow,
  },
];

interface SortDropdownProps {
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
  className?: string;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  sortBy,
  setSortBy,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const activeOption = SORT_OPTIONS.find((opt) => opt.id === sortBy) || SORT_OPTIONS[0];
  const ActiveIcon = activeOption.icon;
  const isSorted = sortBy !== 'default';

  const handleSelect = (optionId: SortOption) => {
    setSortBy(optionId);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative flex-shrink-0 ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`h-[42px] px-3 sm:px-3.5 flex items-center gap-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border shadow-sm select-none ${
          isSorted
            ? 'bg-amber-500/10 text-amber-300 border-amber-500/50 hover:bg-amber-500/20 hover:border-amber-400'
            : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:text-white hover:border-neutral-700'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Sort menu items"
        title={isSorted ? `Sorted by: ${activeOption.label}` : 'Sort menu items by price'}
      >
        <ActiveIcon
          className={`w-4 h-4 flex-shrink-0 transition-colors ${
            isSorted ? 'text-amber-400' : 'text-neutral-400'
          }`}
        />
        <span className="hidden xs:inline sm:inline truncate">
          {isSorted ? activeOption.shortLabel : 'Sort'}
        </span>
        <span className="xs:hidden sm:hidden">
          {isSorted ? activeOption.shortLabel : 'Sort'}
        </span>

        {isSorted && (
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 animate-pulse" />
        )}

        <ChevronDown
          className={`w-3.5 h-3.5 text-neutral-400 ml-0.5 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-amber-400' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Sort options"
          className="absolute right-0 sm:right-auto sm:left-0 top-full mt-2 z-50 w-64 sm:w-72 bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-2.5 py-1.5 flex items-center justify-between border-b border-neutral-800/80 mb-1">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Sort Menu Items
            </span>
            {isSorted && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect('default');
                }}
                className="text-[10px] font-medium text-amber-400 hover:text-amber-300 hover:underline"
              >
                Reset
              </button>
            )}
          </div>

          {SORT_OPTIONS.map((option) => {
            const isSelected = sortBy === option.id;
            const Icon = option.icon;

            return (
              <button
                key={option.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all group ${
                  isSelected
                    ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                    : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-neutral-800 text-neutral-400 group-hover:text-neutral-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div
                      className={`text-xs font-bold truncate ${
                        isSelected ? 'text-amber-300' : 'text-neutral-200 group-hover:text-white'
                      }`}
                    >
                      {option.label}
                    </div>
                    <div className="text-[10px] text-neutral-400 truncate mt-0.5">
                      {option.description}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
