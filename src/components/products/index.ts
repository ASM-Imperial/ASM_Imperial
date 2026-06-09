// Export shared components
export { default as ProductSidebar } from './ProductSidebar';
export { default as ProductGrid } from './ProductGrid';
export { default as ProductHeader } from './ProductHeader';
export { default as ProductLoadingSkeleton } from './ProductLoadingSkeleton';
export { default as ProductCard } from './ProductCard';

// Export product detail components from productdetails folder
export * from './productsdetails';

// Export component prop types
// export type { BedroomRugsProps } from './BedroomRugs';
export type { ProductCardProps } from './ProductCard';

// Product detail types are exported from productdetails folder

// Export shared types
export type { ProductSidebarProps, ProductGridProps, ProductHeaderProps } from './ProductTypes';
export type { Category, Subcategory } from './ProductTypes';

// Export utilities and data
export type { UnifiedProduct } from './ProductUtils';