import React from 'react';

interface FoodBadgeProps {
  vegetarian: boolean;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export const FoodBadge: React.FC<FoodBadgeProps> = ({
  vegetarian,
  size = 'md',
  showLabel = false,
}) => {
  const isSm = size === 'sm';
  const boxDim = isSm ? 'w-3.5 h-3.5 p-0.5' : 'w-4 h-4 p-0.5';
  const dotDim = isSm ? 'w-1.5 h-1.5' : 'w-2 h-2';

  if (vegetarian) {
    return (
      <span
        className="inline-flex items-center gap-1.5"
        role="img"
        aria-label="Vegetarian Food"
        title="Vegetarian"
      >
        <span
          className={`border border-emerald-500 rounded-sm flex items-center justify-center bg-emerald-950/40 ${boxDim}`}
          aria-hidden="true"
        >
          <span className={`bg-emerald-500 rounded-full ${dotDim}`} />
        </span>
        {showLabel && (
          <span className="text-[11px] font-semibold tracking-wide text-emerald-400 uppercase">
            Veg
          </span>
        )}
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1.5"
      role="img"
      aria-label="Non-Vegetarian Food"
      title="Non-Vegetarian"
    >
      <span
        className={`border border-rose-500 rounded-sm flex items-center justify-center bg-rose-950/40 ${boxDim}`}
        aria-hidden="true"
      >
        <span
          className={`w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[6px] border-b-rose-500`}
        />
      </span>
      {showLabel && (
        <span className="text-[11px] font-semibold tracking-wide text-rose-400 uppercase">
          Non-Veg
        </span>
      )}
    </span>
  );
};
