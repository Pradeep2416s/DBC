import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, SelectedItem, MenuVariant } from '../types/menu';

interface SelectionContextType {
  selectedItems: SelectedItem[];
  isSelected: (itemId: string, variantName?: string) => boolean;
  toggleSelect: (item: MenuItem, variant?: MenuVariant, note?: string) => void;
  updateItemNote: (selectionId: string, note: string) => void;
  removeSelection: (selectionId: string) => void;
  clearSelection: () => void;
  totalCount: number;
  totalEstimatedPrice: number;
  menuMode: 'text' | 'photo';
  setMenuMode: (mode: 'text' | 'photo') => void;
  isSelectionDrawerOpen: boolean;
  setIsSelectionDrawerOpen: (open: boolean) => void;
  isShowToWaiterOpen: boolean;
  setIsShowToWaiterOpen: (open: boolean) => void;
  tableNumber: string;
  setTableNumber: (val: string) => void;
  customerNote: string;
  setCustomerNote: (val: string) => void;
}

const STORAGE_KEY = 'drink_bite_selections_v1';
const TABLE_KEY = 'drink_bite_table_no';
const MODE_KEY = 'drink_bite_menu_mode';

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [tableNumber, setTableNumber] = useState<string>(() => {
    try {
      return localStorage.getItem(TABLE_KEY) || '';
    } catch {
      return '';
    }
  });

  const [customerNote, setCustomerNote] = useState<string>('');

  const [menuMode, setMenuMode] = useState<'text' | 'photo'>(() => {
    try {
      const stored = localStorage.getItem(MODE_KEY);
      return stored === 'text' ? 'text' : 'photo';
    } catch {
      return 'photo';
    }
  });

  const [isSelectionDrawerOpen, setIsSelectionDrawerOpen] = useState(false);
  const [isShowToWaiterOpen, setIsShowToWaiterOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedItems));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [selectedItems]);

  useEffect(() => {
    try {
      localStorage.setItem(TABLE_KEY, tableNumber);
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [tableNumber]);

  useEffect(() => {
    try {
      localStorage.setItem(MODE_KEY, menuMode);
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [menuMode]);

  const getSelectionId = (itemId: string, variantName?: string) => {
    return variantName ? `${itemId}-${variantName}` : itemId;
  };

  const isSelected = (itemId: string, variantName?: string) => {
    const sId = getSelectionId(itemId, variantName);
    return selectedItems.some((s) => s.selectionId === sId);
  };

  const toggleSelect = (item: MenuItem, variant?: MenuVariant, note?: string) => {
    const sId = getSelectionId(item.id, variant?.name);
    setSelectedItems((prev) => {
      const existing = prev.find((s) => s.selectionId === sId);
      if (existing) {
        // Deselect
        return prev.filter((s) => s.selectionId !== sId);
      } else {
        // Select
        const newItem: SelectedItem = {
          selectionId: sId,
          itemId: item.id,
          name: item.name,
          variantName: variant?.name,
          price: variant ? variant.price : item.price,
          vegetarian: variant ? variant.vegetarian : item.vegetarian,
          category: item.category,
          note: note?.trim() || undefined,
          addedAt: Date.now(),
        };
        return [...prev, newItem];
      }
    });
  };

  const updateItemNote = (selectionId: string, note: string) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.selectionId === selectionId ? { ...item, note: note.trim() || undefined } : item
      )
    );
  };

  const removeSelection = (selectionId: string) => {
    setSelectedItems((prev) => prev.filter((s) => s.selectionId !== selectionId));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const totalCount = selectedItems.length;
  const totalEstimatedPrice = selectedItems.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <SelectionContext.Provider
      value={{
        selectedItems,
        isSelected,
        toggleSelect,
        updateItemNote,
        removeSelection,
        clearSelection,
        totalCount,
        totalEstimatedPrice,
        menuMode,
        setMenuMode,
        isSelectionDrawerOpen,
        setIsSelectionDrawerOpen,
        isShowToWaiterOpen,
        setIsShowToWaiterOpen,
        tableNumber,
        setTableNumber,
        customerNote,
        setCustomerNote,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};
