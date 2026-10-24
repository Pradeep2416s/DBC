export type FoodType = 'veg' | 'non-veg';

export interface MenuVariant {
  name: string; // e.g. "Veg" or "Non-Veg"
  price: number;
  vegetarian: boolean;
}

export interface MenuItem {
  id: string;
  category: string; // e.g. "MOMOS", "BURGER - VEG", "STARTERS"
  subcategory?: string; // e.g. "QUICK BITES", "STRIPS BITE", "FRENCH FRIES"
  name: string;
  portion?: string; // e.g. "Portion: 1 Pc + Fries", "Freshly Cooked", "Serves 1-2"
  price: number;
  alternatePrice?: number; // e.g. Non-Veg variant price if item has both
  variants?: MenuVariant[]; // for dual veg/non-veg prices
  image: string;
  vegetarian: boolean;
  description?: string;
  highlights?: string[]; // e.g. included combo items or preparation details
  available: boolean;
  featured?: boolean;
  tags?: string[];
}

export interface SelectedItem {
  selectionId: string; // unique identifier
  itemId: string;
  name: string;
  variantName?: string;
  price: number;
  vegetarian: boolean;
  category: string;
  note?: string; // custom request for waiter
  addedAt: number;
}

export interface CategorySummary {
  id: string;
  name: string;
  icon: string;
  count: number;
}
