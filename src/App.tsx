/**
 * DRINK BITE CAFE - PRODUCTION DIGITAL MENU WEBSITE
 * Mobile-first QR code digital menu and waiter selection assistant.
 */
import React, { useState, useMemo, useRef } from 'react';
import { SelectionProvider, useSelection } from './context/SelectionContext';
import { ALL_MENU_ITEMS, MENU_CATEGORIES, isCategoryMatch } from './data/menu';
import { MenuItem } from './types/menu';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { TextMenuItem } from './components/TextMenuItem';
import { PhotoMenuItem } from './components/PhotoMenuItem';
import { FloatingSelectionBar } from './components/FloatingSelectionBar';
import { SelectionDrawer } from './components/SelectionDrawer';
import { ShowToWaiterModal } from './components/ShowToWaiterModal';
import { GoogleReviewSection } from './components/GoogleReviewSection';
import { RestaurantInfo } from './components/RestaurantInfo';
import { QrCodeModal } from './components/QrCodeModal';
import { ItemDetailModal } from './components/ItemDetailModal';
import { CategoryPosterBoard } from './components/CategoryPosterBoard';
import { SortDropdown, SortOption } from './components/SortDropdown';
import { Footer } from './components/Footer';
import { FileText, Image as ImageIcon, UtensilsCrossed, AlertCircle } from 'lucide-react';

const MainMenuApp: React.FC = () => {
  const { menuMode, setMenuMode } = useSelection();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState<MenuItem | null>(null);

  const menuSectionRef = useRef<HTMLDivElement>(null);

  const scrollToMenu = () => {
    menuSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategoryFromHero = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveFilter('all');
    scrollToMenu();
  };

  // Filter items based on Category, Dietary, and Search query
  const filteredItems = useMemo(() => {
    const filtered = ALL_MENU_ITEMS.filter((item) => {
      // 1. Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesSubcategory = item.subcategory?.toLowerCase().includes(q) ?? false;
        const matchesDesc = item.description?.toLowerCase().includes(q) ?? false;
        if (!matchesName && !matchesCategory && !matchesSubcategory && !matchesDesc) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== 'all' && !isCategoryMatch(item, selectedCategory)) {
        return false;
      }

      // 3. Dietary / Type Filter Pill
      if (activeFilter === 'veg' && !item.vegetarian) return false;
      if (activeFilter === 'non-veg' && item.vegetarian && !item.alternatePrice) return false;
      if (activeFilter === 'chicken') {
        const isChicken =
          item.name.toLowerCase().includes('chicken') ||
          item.category.toLowerCase().includes('chicken') ||
          (item.subcategory?.toLowerCase().includes('chicken') ?? false);
        if (!isChicken) return false;
      }
      if (activeFilter === 'momos' && !item.category.includes('MOMOS')) return false;
      if (activeFilter === 'pizza' && !item.category.includes('PIZZA')) return false;
      if (activeFilter === 'burger' && !item.category.includes('BURGER')) return false;
      if (activeFilter === 'sandwich' && !item.category.includes('SANDWICH')) return false;
      if (activeFilter === 'drinks') {
        const isDrink =
          item.category.includes('COOL') &&
          ['SHAKE', 'SMOOTHIES', 'MOJITO', 'KULUKKI'].some((w) =>
            item.subcategory?.toUpperCase().includes(w)
          );
        if (!isDrink) return false;
      }
      if (activeFilter === 'desserts') {
        const isDessert =
          item.category.includes('COOL') &&
          ['ICE-CREAM', 'FALODA', 'DESSERT'].some((w) =>
            item.subcategory?.toUpperCase().includes(w)
          );
        if (!isDessert) return false;
      }

      return true;
    });

    if (sortBy === 'price-asc') {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [searchQuery, selectedCategory, activeFilter, sortBy]);

  // Group filtered items by Category and Subcategory for structured presentation
  const groupedMenu = useMemo(() => {
    const map = new Map<string, Map<string, MenuItem[]>>();

    filteredItems.forEach((item) => {
      const cat = item.category;
      const subcat = item.subcategory || 'Specialties';

      if (!map.has(cat)) {
        map.set(cat, new Map<string, MenuItem[]>());
      }
      const subMap = map.get(cat)!;
      if (!subMap.has(subcat)) {
        subMap.set(subcat, []);
      }
      subMap.get(subcat)!.push(item);
    });

    return map;
  }, [filteredItems]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans pb-24 sm:pb-16 selection:bg-amber-500 selection:text-neutral-950 relative">
      {/* Subtle Ambient Background */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        <img
          src="/cafe-background.jpg"
          alt="Drink Bite Cafe Wallpaper"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-[0.05] blur-[1px]"
        />
      </div>

      {/* Top Navigation */}
      <Navbar onOpenQr={() => setIsQrOpen(true)} />

      {/* Hero Header */}
      <Hero
        onSelectCategory={handleSelectCategoryFromHero}
        onExploreClick={scrollToMenu}
      />

      {/* Main Menu Section */}
      <main id="menu" ref={menuSectionRef} className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 w-full py-8">
        {/* Controls container */}
        <div className="sticky top-16 z-30 bg-neutral-950/95 backdrop-blur-md pt-3 pb-4 border-b border-neutral-900 mb-6 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input and Sort Dropdown */}
            <div className="flex-1 flex items-center gap-2 sm:gap-2.5">
              <div className="flex-1 min-w-0">
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  resultCount={searchQuery ? filteredItems.length : undefined}
                />
              </div>
              <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
            </div>

            {/* Mode switch & results summary */}
            <div className="flex items-center justify-between sm:justify-end gap-2.5">
              <span className="text-xs text-neutral-400 font-medium">
                {filteredItems.length} items
              </span>

              {/* Mode Toggle */}
              <div
                className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-0.5"
                role="group"
                aria-label="Toggle view mode"
              >
                <button
                  type="button"
                  onClick={() => setMenuMode('text')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                    menuMode === 'text'
                      ? 'bg-neutral-800 text-amber-400 shadow-sm border border-neutral-700/60'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                  aria-pressed={menuMode === 'text'}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Text</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMenuMode('photo')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                    menuMode === 'photo'
                      ? 'bg-neutral-800 text-amber-400 shadow-sm border border-neutral-700/60'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                  aria-pressed={menuMode === 'photo'}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Photo</span>
                </button>
              </div>
            </div>
          </div>

          {/* Categories & Filter Pills */}
          <FilterBar
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Official Category Menu Board (Shown only in Text Menu mode) */}
        {menuMode === 'text' && (
          <CategoryPosterBoard
            categoryId={selectedCategory}
            sortBy={sortBy}
            onOpenDetail={(item) => setSelectedDetailItem(item)}
          />
        )}

        {/* Empty state for Text Menu mode if 0 items match search */}
        {menuMode === 'text' && filteredItems.length === 0 && (
          <div className="py-16 text-center bg-neutral-900/40 rounded-3xl border border-neutral-800/80 p-8 max-w-md mx-auto">
            <AlertCircle className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
            <h3 className="text-lg font-heading font-bold text-neutral-200">
              No menu items found
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Try adjusting your search query or reset the filters to browse all dishes.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setActiveFilter('all');
                setSortBy('default');
              }}
              className="mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-xs font-bold rounded-xl transition-colors border border-neutral-700"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Photo Menu Listings (Shown only in Photo Menu mode) */}
        {menuMode === 'photo' && (
          filteredItems.length === 0 ? (
            <div className="py-16 text-center bg-neutral-900/40 rounded-3xl border border-neutral-800/80 p-8 max-w-md mx-auto">
              <AlertCircle className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
              <h3 className="text-lg font-heading font-bold text-neutral-200">
                No menu items found
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Try adjusting your search query or reset the filters to browse all dishes.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setActiveFilter('all');
                  setSortBy('default');
                }}
                className="mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-xs font-bold rounded-xl transition-colors border border-neutral-700"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {Array.from(groupedMenu.entries()).map(([categoryName, subcategoriesMap]) => (
                <section
                  key={categoryName}
                  className="scroll-mt-44"
                  id={`cat-${categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 pb-3 border-b-2 border-amber-500/30 mb-6">
                    <h2 className="text-xl sm:text-2xl font-black font-heading text-neutral-100 tracking-tight uppercase flex items-center gap-2">
                      <span className="text-amber-400">#</span>
                      <span>
                        {selectedCategory !== 'all'
                          ? MENU_CATEGORIES.find((c) => c.id === selectedCategory)?.name || categoryName
                          : categoryName}
                      </span>
                    </h2>
                    <span className="text-xs font-bold text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800">
                      {Array.from(subcategoriesMap.values()).reduce(
                        (acc, arr) => acc + arr.length,
                        0
                      )}{' '}
                      items
                    </span>
                  </div>

                  {/* Subcategories */}
                  <div className="space-y-8">
                    {Array.from(subcategoriesMap.entries()).map(([subcatName, items]) => (
                      <div key={subcatName} className="space-y-3">
                        {/* Subcategory label if distinct */}
                        {subcatName !== 'Specialties' && (
                          <div className="flex items-center gap-2 pt-1">
                            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-400/90 font-heading">
                              {subcatName}
                            </h3>
                            <div className="h-[1px] flex-1 bg-neutral-800" />
                          </div>
                        )}

                        {/* Photo Menu Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                          {items.map((item) => (
                            <PhotoMenuItem
                              key={item.id}
                              item={item}
                              onOpenDetail={(it) => setSelectedDetailItem(it)}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )
        )}
      </main>

      {/* Google Reviews Section */}
      <GoogleReviewSection />

      {/* Restaurant Info & Location */}
      <RestaurantInfo />

      {/* Footer */}
      <Footer />

      {/* Item Detail Modal (matching screenshot) */}
      <ItemDetailModal
        item={selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
      />

      {/* Floating Selection Bar (Mobile Sticky) */}
      <FloatingSelectionBar />

      {/* Selection Drawer / Modal */}
      <SelectionDrawer />

      {/* Final Waiter Presentation Screen */}
      <ShowToWaiterModal />

      {/* QR Code sharing modal */}
      <QrCodeModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <SelectionProvider>
      <MainMenuApp />
    </SelectionProvider>
  );
}
