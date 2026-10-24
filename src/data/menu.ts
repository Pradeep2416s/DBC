import { MenuItem, CategorySummary } from '../types/menu';
import { friedChickenAndCombos } from './menuFriedChickenCombos';
import { startersMenuItems } from './menuStarters';
import { momosMenuItems } from './menuMomos';
import { pizzaAndBurgerMenuItems } from './menuPizzaBurger';
import { sandwichMenuItems } from './menuSandwiches';
import { coolAndCreamyMenuItems } from './menuCoolCreamy';

const localMenuImages = Object.entries(
  import.meta.glob<string>('../assets/images/**/*.{png,jpg,jpeg,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
).map(([path, url]) => {
  const pathParts = path.split('/');
  return {
    directory: pathParts[pathParts.length - 2],
    fileName: pathParts[pathParts.length - 1],
    url,
  };
});

const localImageAliases: Record<string, string> = {
  'qb-simlies': 'SmiliesQuickBites.png',
  'sb-honey-chilli-strips': 'HoneyVhilliStrips.png',
  'mj-gooseberry-chilly': 'GooseberryChiliyMojito.png',
  'ic-chocolate-coconut': 'ChocolateChoconutIceCream.png',
  'ks-passion-fruit': 'PassionSharabat.png',
  'combo-veg-burger': 'Veg Burger + French Fries + Flavour Soda.png',
  'combo-nonveg-burger': 'Non Veg Burger + French Fries + Flavour Soda.png',
  'combo-zinger-burger': 'Zinger Burger + French Fries + Flavour Soda.png',
  'combo-veg-pizza': 'Veg Pizza + French Fries + Flavour Soda.png',
  'combo-nonveg-pizza': 'Non Veg Pizza + French Fries + Flavour Soda.png',
  'combo-veg-wrap': 'Veg Wrap + French Fries + Flavour Soda.png',
  'combo-nonveg-wrap': 'Non-Veg Wrap combo.png',
  'combo-veg-sandwich': 'Veg Sandwich + French Fries + Flavour Soda.png',
  'combo-nonveg-sandwich': 'Non Veg Sandwich + French Fries + Flavour Soda.png',
};

const normalizeImageName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

const getImageDirectory = (category: string, subcategory?: string) => {
  if (category === "HEY-SANDWICH'S") return 'Sandwiches';
  if (category === 'MOMOS') return 'Momos';
  if (category.startsWith('PIZZA')) return 'Pizza';
  if (category.startsWith('BURGER')) return 'Burgger';
  if (category === 'COMBO HOUSE') return 'FRIED CHICKEN COMBO HOUSE';
  if (category === 'FRIED CHICKEN COMBO HOUSE') {
    return subcategory === 'FRIED CHICKEN BUCKET' ? 'FriedChickrn' : 'FRIED CHICKEN COMBO HOUSE';
  }
  if (category === 'STARTERS') {
    const starterDirectories: Record<string, string> = {
      'QUICK BITES': 'Bites',
      'STRIPS BITE': 'Bites',
      'WINGS BITE': 'Wings',
      'LOLLIPOP HUB': 'LollipopHub',
      MAGGI: 'Maggi',
      'FRENCH FRIES': 'FremchFries',
      WRAPS: 'Wraps',
      PASTA: 'Pasta',
    };
    return subcategory ? starterDirectories[subcategory] : undefined;
  }
  if (category === 'COOL & CREAMY') {
    const coolAndCreamyDirectories: Record<string, string> = {
      'ICE CREAM SHAKE': 'CoolAndCreamy',
      'COLD SHAKE': 'CoolAndCreamy',
      SMOOTHIES: 'Smoothies',
      "MOJITO'S": "Mojiot's",
      "ICE-CREAM'S": 'IceCreams',
      'SUNDAES & DESSERTS': 'IceCreams',
      FALOODAS: 'IceCreams',
      'KULUKKI SHARBAT': 'Sharabat',
    };
    return subcategory ? coolAndCreamyDirectories[subcategory] : undefined;
  }
  return undefined;
};

const normalizeAssetName = (fileName: string, directory: string) => {
  let fileStem = fileName.replace(/\.[^.]+$/, '').replace(/\s*\(\d+\)$/, '');
  if (directory === 'Sandwiches') fileStem = fileStem.replace(/\d+$/, '');
  let name = normalizeImageName(fileStem);

  if (directory === 'CoolAndCreamy') {
    name = name.replace(/^coolandcreamy/, '').replace(/(?:icecreamshake|coldshake|milkshake)$/, '');
  } else if (directory === 'Smoothies') {
    name = name.replace(/smoothies?$/, '');
  } else if (directory === "Mojiot's") {
    name = name.replace(/mojito$/, '');
  } else if (directory === 'IceCreams') {
    name = name.replace(/(?:icecream|sundae|falooda)$/, '');
  } else if (directory === 'Sharabat') {
    name = name.replace(/sharabat$/, '');
  } else if (directory === 'Bites') {
    name = name.replace(/(?:quickbites|strips)$/, '');
  } else if (directory === 'Wings') {
    name = name.replace(/wings$/, '');
  } else if (directory === 'FriedChickrn') {
    name = name.replace(/dip\d+$/, '');
  }

  return name;
};

const resolveLocalImage = (item: MenuItem, usedImageCounts: Map<string, number>) => {
  const directory = getImageDirectory(item.category, item.subcategory);
  if (!directory) return undefined;

  const alias = localImageAliases[item.id];
  if (alias) {
    return localMenuImages.find((image) => image.directory === directory && image.fileName === alias)?.url;
  }

  let itemName = normalizeImageName(item.name);
  if (directory === 'Bites' && item.subcategory === 'STRIPS BITE') {
    itemName = itemName.replace(/strips$/, '');
  } else if (directory === 'Wings') {
    itemName = itemName.replace(/wings$/, '');
  }

  const matches = localMenuImages
    .filter((image) => image.directory === directory && normalizeAssetName(image.fileName, directory) === itemName)
    .sort((left, right) => left.fileName.localeCompare(right.fileName, undefined, { numeric: true }));

  if (matches.length === 0) return undefined;

  const usageKey = `${directory}:${itemName}`;
  const matchIndex = usedImageCounts.get(usageKey) ?? 0;
  usedImageCounts.set(usageKey, matchIndex + 1);
  return matches[Math.min(matchIndex, matches.length - 1)].url;
};

/**
 * MASTER MENU DATA SOURCE
 * Contains every single item and price matching the physical menu.
 */
const menuItems: MenuItem[] = [
  ...friedChickenAndCombos,
  ...startersMenuItems,
  ...momosMenuItems,
  ...pizzaAndBurgerMenuItems,
  ...sandwichMenuItems,
  ...coolAndCreamyMenuItems,
];

const usedImageCounts = new Map<string, number>();

export const ALL_MENU_ITEMS: MenuItem[] = menuItems.map((item) => ({
  ...item,
  image: resolveLocalImage(item, usedImageCounts) ?? item.image,
}));

export const isCategoryMatch = (item: MenuItem, catId: string): boolean => {
  if (catId === 'all') return true;
  if (catId === 'shakes') {
    return (
      item.category === 'COOL & CREAMY' &&
      (item.subcategory === 'ICE CREAM SHAKE' || item.subcategory === 'COLD SHAKE')
    );
  }
  if (catId === 'smoothies-mojitos' || catId === 'mojitos') {
    return (
      item.category === 'COOL & CREAMY' &&
      (item.subcategory === 'SMOOTHIES' || item.subcategory === "MOJITO'S")
    );
  }
  if (catId === 'ice-creams') {
    return (
      item.category === 'COOL & CREAMY' &&
      (item.subcategory === "ICE-CREAM'S" ||
        item.subcategory === 'SUNDAES & DESSERTS' ||
        item.subcategory === 'FALOODAS')
    );
  }
  if (catId === 'kulukki-sharbat') {
    return item.category === 'COOL & CREAMY' && item.subcategory === 'KULUKKI SHARBAT';
  }
  if (catId === 'hey-sandwiches') {
    return item.category === "HEY-SANDWICH'S";
  }
  if (catId === 'combo-house') {
    return item.category === 'COMBO HOUSE';
  }
  if (catId === 'pizza') {
    return item.category === 'PIZZA - VEG' || item.category === 'PIZZA - NON VEG';
  }
  if (catId === 'burger') {
    return item.category === 'BURGER - VEG' || item.category === 'BURGER - NON VEG';
  }
  if (catId === 'momos') {
    return item.category === 'MOMOS';
  }
  if (catId === 'bites') {
    return (
      item.category === 'STARTERS' &&
      (item.subcategory === 'QUICK BITES' ||
        item.subcategory === 'STRIPS BITE' ||
        item.subcategory === 'WINGS BITE')
    );
  }
  if (catId === 'lollipop-hub') {
    return item.category === 'STARTERS' && item.subcategory === 'LOLLIPOP HUB';
  }
  if (catId === 'maggi-pasta') {
    return item.category === 'STARTERS' && (item.subcategory === 'MAGGI' || item.subcategory === 'PASTA');
  }
  if (catId === 'french-fries') {
    return item.category === 'STARTERS' && item.subcategory === 'FRENCH FRIES';
  }
  if (catId === 'wraps') {
    return item.category === 'STARTERS' && item.subcategory === 'WRAPS';
  }
  if (catId === 'fried-chicken') {
    return item.category === 'FRIED CHICKEN COMBO HOUSE';
  }
  return item.category === catId;
};

export const MENU_CATEGORIES: CategorySummary[] = [
  { id: 'all', name: 'All Items', icon: '🍽️', count: ALL_MENU_ITEMS.length },
  {
    id: 'shakes',
    name: 'Shakes',
    icon: '🥤',
    count: ALL_MENU_ITEMS.filter((i) => isCategoryMatch(i, 'shakes')).length,
  },
  {
    id: 'smoothies-mojitos',
    name: "Smoothies and Mojito's",
    icon: '🍹',
    count: ALL_MENU_ITEMS.filter((i) => isCategoryMatch(i, 'smoothies-mojitos')).length,
  },
  {
    id: 'ice-creams',
    name: "Ice-Cream's",
    icon: '🍨',
    count: ALL_MENU_ITEMS.filter((i) => isCategoryMatch(i, 'ice-creams')).length,
  },
  {
    id: 'kulukki-sharbat',
    name: 'Kulukki Sharbat',
    icon: '🍋',
    count: ALL_MENU_ITEMS.filter((i) => isCategoryMatch(i, 'kulukki-sharbat')).length,
  },
  {
    id: 'hey-sandwiches',
    name: "HEY-Sandwich's",
    icon: '🥪',
    count: ALL_MENU_ITEMS.filter((i) => isCategoryMatch(i, 'hey-sandwiches')).length,
  },
  {
    id: 'combo-house',
    name: 'Combo House',
    icon: '🎁',
    count: ALL_MENU_ITEMS.filter((i) => isCategoryMatch(i, 'combo-house')).length,
  },
  {
    id: 'pizza',
    name: 'Pizza',
    icon: '🍕',
    count: ALL_MENU_ITEMS.filter((i) => isCategoryMatch(i, 'pizza')).length,
  },
  {
    id: 'burger',
    name: 'Burger',
    icon: '🍔',
    count: ALL_MENU_ITEMS.filter((i) => isCategoryMatch(i, 'burger')).length,
  },
  {
    id: 'momos',
    name: 'Momos',
    icon: '🥟',
    count: ALL_MENU_ITEMS.filter((i) => isCategoryMatch(i, 'momos')).length,
  },
  {
    id: 'bites',
    name: 'Bites',
    icon: '🍗',
    count: ALL_MENU_ITEMS.filter((i) => isCategoryMatch(i, 'bites')).length,
  },
  {
    id: 'lollipop-hub',
    name: 'Lollipop Hub',
    icon: '🍗',
    count: ALL_MENU_ITEMS.filter((i) => isCategoryMatch(i, 'lollipop-hub')).length,
  },
  {
    id: 'maggi-pasta',
    name: 'Maggi and Pasta',
    icon: '🍝',
    count: ALL_MENU_ITEMS.filter((i) => isCategoryMatch(i, 'maggi-pasta')).length,
  },
  {
    id: 'french-fries',
    name: 'French Fries',
    icon: '🍟',
    count: ALL_MENU_ITEMS.filter((i) => isCategoryMatch(i, 'french-fries')).length,
  },
  {
    id: 'wraps',
    name: 'Wraps',
    icon: '🌯',
    count: ALL_MENU_ITEMS.filter((i) => isCategoryMatch(i, 'wraps')).length,
  },
  {
    id: 'fried-chicken',
    name: 'Fried Chicken',
    icon: '🍗',
    count: ALL_MENU_ITEMS.filter((i) => isCategoryMatch(i, 'fried-chicken')).length,
  },
];

export const FILTER_PILLS = [
  { id: 'veg', label: 'Veg' },
  { id: 'non-veg', label: 'Non-Veg' },
];
