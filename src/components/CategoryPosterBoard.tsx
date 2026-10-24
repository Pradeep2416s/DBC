import React from 'react';
import { MenuItem } from '../types/menu';
import { ALL_MENU_ITEMS, isCategoryMatch } from '../data/menu';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';
import { useSelection } from '../context/SelectionContext';
import { Plus, Check, Sparkles } from 'lucide-react';

interface CategoryPosterBoardProps {
  categoryId: string;
  sortBy?: 'default' | 'price-asc' | 'price-desc';
  onOpenDetail?: (item: MenuItem) => void;
}

export const CategoryPosterBoard: React.FC<CategoryPosterBoardProps> = ({
  categoryId,
  sortBy = 'default',
  onOpenDetail,
}) => {
  const { isSelected, toggleSelect } = useSelection();

  // Helper to get all items matching current category, sorted if active
  let categoryItems = ALL_MENU_ITEMS.filter((it) => isCategoryMatch(it, categoryId));
  if (sortBy === 'price-asc') {
    categoryItems = [...categoryItems].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    categoryItems = [...categoryItems].sort((a, b) => b.price - a.price);
  }

  // Render a single menu item row matching the exact Shakes item format
  const renderItemRow = (item: MenuItem) => {
    const active = isSelected(item.id);
    return (
      <div
        key={item.id}
        onClick={() => onOpenDetail?.(item)}
        className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-900/90 transition-colors cursor-pointer group"
      >
        <div className="flex items-center gap-2 min-w-0 pr-2">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: item.vegetarian ? '#10b981' : '#f43f5e' }}
            title={item.vegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
          />
          <span className="font-heading font-bold text-sm text-neutral-100 group-hover:text-amber-300 transition-colors truncate">
            {item.name}
          </span>
          {item.portion && (
            <span className="text-[10px] text-neutral-500 font-normal hidden sm:inline-block">
              ({item.portion})
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-heading font-extrabold text-sm text-amber-400">
            ₹{item.price}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSelect(item);
            }}
            className={`p-1 rounded-md text-xs transition-colors ${
              active
                ? 'bg-amber-400 text-neutral-950 font-bold'
                : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
            title={active ? 'Remove from selection' : 'Add to selection'}
          >
            {active ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    );
  };

  // Render a column card matching the exact Shakes column format
  const renderColumn = (title: string, items: MenuItem[]) => (
    <div className="rounded-2xl bg-neutral-950/80 border border-amber-600/40 p-4 flex flex-col justify-between">
      <div>
        <div className="border-b border-amber-600/50 pb-2 mb-3 text-center">
          <span className="font-heading font-black text-base uppercase tracking-wider text-amber-300">
            {title}
          </span>
        </div>
        <div className="space-y-1.5">
          {items.map(renderItemRow)}
        </div>
      </div>
    </div>
  );

  // Get poster banner title
  const getBannerTitle = () => {
    switch (categoryId) {
      case 'shakes':
        return 'SHAKES';
      case 'ice-creams':
        return "ICE-CREAM'S & FALOODAS";
      case 'smoothies-mojitos':
        return 'SMOOTHIES & MOJITOS';
      case 'kulukki-sharbat':
        return 'KULUKKI SHARBAT';
      case 'pizza':
        return 'PIZZA';
      case 'burger':
        return 'BURGER';
      case 'momos':
        return 'MOMOS';
      case 'hey-sandwiches':
        return "HEY-SANDWICH'S";
      case 'combo-house':
        return 'COMBO HOUSE';
      case 'fried-chicken':
        return 'FRIED CHICKEN COMBOS';
      case 'bites':
        return 'BITES';
      case 'lollipop-hub':
        return 'LOLLIPOP HUB';
      case 'maggi-pasta':
        return 'MAGGI & PASTA';
      case 'french-fries':
        return 'FRENCH FRIES';
      case 'wraps':
        return 'WRAPS';
      case 'all':
        return 'CHEF’S SPECIAL HIGHLIGHTS';
      default:
        return 'OFFICIAL CAFE SELECTION';
    }
  };

  // Render content columns based on the selected category
  const renderCategoryContent = () => {
    switch (categoryId) {
      case 'shakes': {
        const iceCreamShakes = categoryItems.filter((i) => i.subcategory === 'ICE CREAM SHAKE');
        const coldShakes = categoryItems.filter((i) => i.subcategory === 'COLD SHAKE');
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderColumn('ICE CREAM SHAKES', iceCreamShakes)}
            {renderColumn('COLD SHAKES', coldShakes)}
          </div>
        );
      }

      case 'ice-creams': {
        const sundaes = categoryItems.filter(
          (i) => i.subcategory === 'SUNDAES & DESSERTS' || i.subcategory === "ICE-CREAM'S"
        );
        const faloodas = categoryItems.filter((i) => i.subcategory === 'FALOODAS');
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderColumn('SUNDAES & SPECIALS', sundaes)}
            {renderColumn('FALOODAS', faloodas)}
          </div>
        );
      }

      case 'smoothies-mojitos': {
        const smoothies = categoryItems.filter((i) => i.subcategory === 'SMOOTHIES');
        const mojitos = categoryItems.filter((i) => i.subcategory === "MOJITO'S");
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderColumn('SMOOTHIES', smoothies)}
            {renderColumn('MOJITO’S', mojitos)}
          </div>
        );
      }

      case 'kulukki-sharbat': {
        return (
          <div className="max-w-xl mx-auto">
            {renderColumn('KULUKKI SHARBAT', categoryItems)}
          </div>
        );
      }

      case 'pizza': {
        const vegPizzas = categoryItems.filter((i) => i.category === 'PIZZA - VEG');
        const nonVegPizzas = categoryItems.filter((i) => i.category === 'PIZZA - NON VEG');
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderColumn('VEG PIZZAS', vegPizzas)}
            {renderColumn('NON-VEG PIZZAS', nonVegPizzas)}
          </div>
        );
      }

      case 'burger': {
        const vegBurgers = categoryItems.filter((i) => i.category === 'BURGER - VEG');
        const nonVegBurgers = categoryItems.filter((i) => i.category === 'BURGER - NON VEG');
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderColumn('VEG BURGERS', vegBurgers)}
            {renderColumn('NON-VEG BURGERS', nonVegBurgers)}
          </div>
        );
      }

      case 'momos': {
        const steamAndFried = categoryItems.filter(
          (i) =>
            i.name.toLowerCase().includes('steam') || i.name.toLowerCase().includes('fried')
        );
        const tossedAndSpecial = categoryItems.filter(
          (i) =>
            !i.name.toLowerCase().includes('steam') && !i.name.toLowerCase().includes('fried')
        );
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderColumn('STEAM & FRIED MOMOS', steamAndFried)}
            {renderColumn('TOSSED, MALAI & KURKURE MOMOS', tossedAndSpecial)}
          </div>
        );
      }

      case 'hey-sandwiches': {
        const veg = categoryItems.filter((i) => i.vegetarian);
        const nonVeg = categoryItems.filter((i) => !i.vegetarian);
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderColumn('VEG & DELIGHT SANDWICHES', veg)}
            {renderColumn('NON-VEG & CLUB SANDWICHES', nonVeg)}
          </div>
        );
      }

      case 'combo-house': {
        const burgerPizzaCombos = categoryItems.filter(
          (i) =>
            i.name.toLowerCase().includes('burger') || i.name.toLowerCase().includes('pizza')
        );
        const otherCombos = categoryItems.filter(
          (i) =>
            !i.name.toLowerCase().includes('burger') && !i.name.toLowerCase().includes('pizza')
        );
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderColumn('BURGER & PIZZA COMBOS', burgerPizzaCombos)}
            {renderColumn('WRAP & SANDWICH COMBOS', otherCombos)}
          </div>
        );
      }

      case 'fried-chicken': {
        const mealCombos = categoryItems.filter(
          (i) => i.subcategory === 'CHICKEN MEAL COMBOS'
        );
        const portions = categoryItems.filter(
          (i) => i.subcategory === 'FRIED CHICKEN BUCKET'
        );
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderColumn('CHICKEN MEAL COMBOS', mealCombos)}
            {renderColumn('FRIED CHICKEN BUCKETS', portions)}
          </div>
        );
      }

      case 'bites': {
        const quickBites = categoryItems.filter((i) => i.subcategory === 'QUICK BITES');
        const stripsAndWings = categoryItems.filter(
          (i) => i.subcategory === 'STRIPS BITE' || i.subcategory === 'WINGS BITE'
        );
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderColumn('QUICK BITES', quickBites)}
            {renderColumn('STRIPS & WINGS BITE', stripsAndWings)}
          </div>
        );
      }

      case 'lollipop-hub': {
        return (
          <div className="max-w-xl mx-auto">
            {renderColumn('LOLLIPOP HUB SPECIALS', categoryItems)}
          </div>
        );
      }

      case 'maggi-pasta': {
        const maggi = categoryItems.filter((i) => i.subcategory === 'MAGGI');
        const pasta = categoryItems.filter((i) => i.subcategory === 'PASTA');
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderColumn('MAGGI SPECIALTIES', maggi)}
            {renderColumn('ITALIAN PASTA', pasta)}
          </div>
        );
      }

      case 'french-fries': {
        return (
          <div className="max-w-xl mx-auto">
            {renderColumn('FRENCH FRIES SPECIALS', categoryItems)}
          </div>
        );
      }

      case 'wraps': {
        const vegWraps = categoryItems.filter((i) => i.vegetarian);
        const nonVegWraps = categoryItems.filter((i) => !i.vegetarian);
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderColumn('VEG WRAPS', vegWraps)}
            {renderColumn('NON-VEG WRAPS', nonVegWraps)}
          </div>
        );
      }

      case 'all': {
        const featuredDrinks = ALL_MENU_ITEMS.filter(
          (i) => i.featured && i.category === 'COOL & CREAMY'
        );
        const featuredFood = ALL_MENU_ITEMS.filter(
          (i) => i.featured && i.category !== 'COOL & CREAMY'
        );
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderColumn('SIGNATURE DRINKS & SHAKES', featuredDrinks)}
            {renderColumn('SIGNATURE BITES & COMBOS', featuredFood)}
          </div>
        );
      }

      default:
        return (
          <div className="max-w-xl mx-auto">
            {renderColumn('ITEMS', categoryItems)}
          </div>
        );
    }
  };

  return (
    <div className="mb-8 relative rounded-3xl bg-gradient-to-b from-[#180e07] via-[#120a05] to-[#0c0704] border-2 border-amber-600/50 p-4 sm:p-6 shadow-2xl shadow-black/80 overflow-hidden">
      {/* Decorative Gold Edge Corners */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400/80 rounded-tl pointer-events-none" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400/80 rounded-tr pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400/80 rounded-bl pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400/80 rounded-br pointer-events-none" />

      {/* Poster Header Matching Official Design */}
      <div className="text-center mb-6 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-bold text-amber-400 mb-2">
          <Sparkles className="w-3 h-3" />
          <span>Official Cafe Board</span>
        </div>

        <h3 className="font-serif font-black text-2xl sm:text-3xl text-amber-100 tracking-wider uppercase">
          {RESTAURANT_CONFIG.name}
        </h3>

        <div className="flex items-center justify-center gap-3 my-1">
          <div className="h-[1px] w-12 sm:w-20 bg-amber-600/60" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-amber-300">
            C A F E
          </span>
          <div className="h-[1px] w-12 sm:w-20 bg-amber-600/60" />
        </div>

        {/* Gold Splash Banner */}
        <div className="inline-block mt-3 px-6 sm:px-10 py-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 text-neutral-950 font-serif font-black text-lg sm:text-2xl uppercase tracking-wider shadow-lg shadow-amber-500/20 transform -rotate-0.5">
          {getBannerTitle()}
        </div>
      </div>

      {/* Structured Category Columns - Uniform Shakes Styling */}
      {renderCategoryContent()}

      {/* Footer hint */}
      <div className="mt-5 pt-3 border-t border-amber-900/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-xs text-amber-300/80">
        <span>💡 Tap any item on this board to view photos or customize waiter notes.</span>
        <span className="text-[11px] text-neutral-400">
          Showing official cafe board rates
        </span>
      </div>
    </div>
  );
};
