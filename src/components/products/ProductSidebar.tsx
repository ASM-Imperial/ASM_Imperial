import { ChevronDown, ChevronRight } from 'lucide-react';
import { ProductSidebarProps } from './ProductTypes';

interface ExtendedProductSidebarProps extends ProductSidebarProps {
  onAllProductsSelect?: () => void;
  showAllProducts?: boolean;
}

const ProductSidebar = ({
  categories,
  selectedCategory,
  selectedSubcategory,
  expandedCategories,
  onCategorySelect,
  onSubcategorySelect,
  onToggleCategory,
  onAllProductsSelect,
  showAllProducts
}: ExtendedProductSidebarProps) => {
  return (
    <div className="w-80 bg-white shadow-lg min-h-screen sticky top-20 overflow-y-auto">
      <div className="p-6">
        <h2 className="font-serif text-xl font-medium text-charcoal mb-6 border-b border-charcoal/10 pb-4">
          Product Categories
        </h2>
        
        {/* All Products Button */}
        <button
          onClick={onAllProductsSelect}
          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 mb-4 font-medium ${
            showAllProducts
              ? 'bg-mint-green text-charcoal shadow-sm'
              : 'text-charcoal hover:bg-charcoal/5'
          }`}
        >
          All Products
        </button>
        
        {/* Hierarchical Category Navigation */}
        <nav className="space-y-1">
          {categories.map((category) => {
            const isExpanded = expandedCategories.includes(category.id);
            const isSelected = selectedCategory === category.id;
            
            return (
              <div key={category.id} className="border-b border-charcoal/5 last:border-b-0">
                {/* Main Category */}
                <div className="flex items-center">
                  <button
                    onClick={() => onToggleCategory(category.id)}
                    className="p-2 hover:bg-charcoal/5 rounded transition-colors duration-200"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-charcoal/60" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-charcoal/60" />
                    )}
                  </button>
                  <button
                    onClick={() => onCategorySelect(category.id)}
                    className={`flex-1 text-left px-3 py-3 rounded-lg transition-all duration-200 font-medium ${
                      isSelected && !selectedSubcategory
                        ? 'bg-mint-green text-charcoal shadow-sm'
                        : 'text-charcoal hover:bg-charcoal/5'
                    }`}
                  >
                    {category.name}
                  </button>
                </div>
                
                {/* Subcategories */}
                {isExpanded && (
                  <div className="ml-6 pb-2 space-y-1">
                    {category.subcategories.map((subcategory) => {
                      const isSubSelected = selectedSubcategory === subcategory.id;
                      
                      return (
                        <button
                          key={subcategory.id}
                          onClick={() => onSubcategorySelect(subcategory.id, category.id)}
                          className={`w-full text-left px-4 py-2 rounded-md transition-all duration-200 text-sm ${
                            isSubSelected
                              ? 'bg-mint-green/70 text-charcoal font-medium shadow-sm'
                              : 'text-charcoal/80 hover:bg-charcoal/5 hover:text-charcoal'
                          }`}
                        >
                          <span className="mr-2 text-charcoal/40">–</span>
                          {subcategory.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default ProductSidebar;