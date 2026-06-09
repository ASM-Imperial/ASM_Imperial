import { Category } from './ProductTypes';

// Unified Product Interface
export interface UnifiedProduct {
  id: string; 
  name: string;
  category?: string;
  subcategoryId?: string;
  material?: string;
  size?: string;
  price?: string;
  imageUrl: string;
  Inspired_From?: string;
  comfort?: string;
  style?: string;
  durability?: string;
  weatherResistance?: string;
  artisan?: string;
}


export const getSelectedCategoryName = (
  selectedCategory: string,
  selectedSubcategory: string,
  categories: Category[]
): string => {
  if (selectedSubcategory) {
    const category = categories.find(cat => cat.id === selectedCategory);
    const subcategory = category?.subcategories.find(sub => sub.id === selectedSubcategory);
    return subcategory?.name || 'Products';
  }
  if (selectedCategory === 'all') {
    return 'All Products';
  }
  return categories.find(cat => cat.id === selectedCategory)?.name || 'All Products';
};


