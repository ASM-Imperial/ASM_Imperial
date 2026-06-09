import { ProductHeaderProps } from './ProductTypes';
import { getSelectedCategoryName } from './ProductUtils';

const ProductHeader = ({
  selectedCategory,
  selectedSubcategory,
  categories,
  productCount,
  isLoading
}: ProductHeaderProps) => {
  const categoryName = getSelectedCategoryName(selectedCategory, selectedSubcategory, categories);

  return (
    <div className="mb-8">
      <h1 className="font-serif text-3xl lg:text-4xl font-medium text-charcoal mb-2">
        {categoryName}
      </h1>
      <p className="text-charcoal/60">
        {isLoading ? (
          <span className="animate-pulse">Loading products...</span>
        ) : (
          `${productCount} products found`
        )}
      </p>
    </div>
  );
};

export default ProductHeader;