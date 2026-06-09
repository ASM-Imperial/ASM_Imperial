export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  parentId: string;
}

export interface ProductSidebarProps {
  categories: Category[];
  selectedCategory: string;
  selectedSubcategory: string;
  expandedCategories: string[];
  onCategorySelect: (categoryId: string) => void;
  onSubcategorySelect: (subcategoryId: string, parentId: string) => void;
  onToggleCategory: (categoryId: string) => void;
}

export interface ProductGridProps {
  products: any[];
  isLoading: boolean;
}

export interface ProductHeaderProps {
  selectedCategory: string;
  selectedSubcategory: string;
  categories: Category[];
  productCount: number;
  isLoading: boolean;
}