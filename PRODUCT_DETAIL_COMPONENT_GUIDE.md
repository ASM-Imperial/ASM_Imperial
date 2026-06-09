# ProductDetailView Component Guide

## Overview

The `ProductDetailView` component is a reusable, modular component that encapsulates all the necessary functionality and UI elements for displaying detailed product information. It has been extracted from the original `ProductDetail` page to promote reusability and maintainability across the application.

## Features

- **Modular Design**: Can be used in different contexts (standalone pages, modals, embedded views)
- **Configurable**: Multiple optional props to customize behavior and appearance
- **Responsive**: Works seamlessly across all device sizes
- **TypeScript Support**: Full type safety with comprehensive interfaces
- **Event Handling**: Customizable callbacks for all user interactions
- **Consistent Styling**: Maintains design system consistency

## Component Structure

```
src/components/products/
├── ProductDetailView.tsx     # Main reusable component
├── ProductDetailModal.tsx    # Example modal implementation
└── index.ts                  # Exports
```

## Basic Usage

### 1. Standalone Page Usage

```tsx
import ProductDetailView, { DetailedProduct } from '@/components/products/ProductDetailView';

const ProductPage = () => {
  const [product, setProduct] = useState<DetailedProduct | null>(null);

  const handleCustomize = (product: DetailedProduct) => {
    // Handle customization logic
    console.log('Customizing:', product.name);
  };

  const handleAddToCart = (product: DetailedProduct, quantity: number) => {
    // Handle add to cart logic
    console.log(`Adding ${quantity} of ${product.name} to cart`);
  };

  return (
    <div>
      {product && (
        <ProductDetailView
          product={product}
          onCustomize={handleCustomize}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};
```

### 2. Modal Usage

```tsx
import ProductDetailModal from '@/components/products/ProductDetailModal';

const ProductModal = () => {
  const [selectedProduct, setSelectedProduct] = useState<DetailedProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ProductDetailModal
      product={selectedProduct}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onCustomize={(product) => {
        // Handle customization
        setIsModalOpen(false);
        // Navigate to customization page or open customization modal
      }}
    />
  );
};
```

### 3. Embedded/Compact Usage

```tsx
<ProductDetailView
  product={product}
  onCustomize={handleCustomize}
  onAddToCart={handleAddToCart}
  showBuyNow={false}        // Hide buy now button
  showTabs={false}          // Hide description/specs tabs
  showTrustBadges={false}   // Hide trust badges
  customizeButtonText="Personalize Now"
  className="max-w-4xl mx-auto"
/>
```

## Props Interface

```tsx
interface ProductDetailViewProps {
  // Required
  product: DetailedProduct;
  
  // Event Handlers (Optional)
  onCustomize?: (product: DetailedProduct) => void;
  onAddToCart?: (product: DetailedProduct, quantity: number) => void;
  onBuyNow?: (product: DetailedProduct, quantity: number) => void;
  onWishlist?: (product: DetailedProduct, isWishlisted: boolean) => void;
  onShare?: (product: DetailedProduct) => void;
  
  // Display Options (Optional)
  showBuyNow?: boolean;           // Default: true
  showWishlist?: boolean;         // Default: true
  showShare?: boolean;            // Default: true
  showTrustBadges?: boolean;      // Default: true
  showTabs?: boolean;             // Default: true
  
  // Customization (Optional)
  customizeButtonText?: string;   // Default: "🎨 Customize This Rug"
  className?: string;             // Additional CSS classes
}
```

## DetailedProduct Interface

```tsx
interface DetailedProduct extends UnifiedProduct {
  description?: string;                    // Product description
  features?: string[];                     // Key features list
  specifications?: Record<string, string>; // Technical specifications
}
```

## Configuration Examples

### Minimal Configuration
```tsx
<ProductDetailView product={product} />
```

### Full Configuration
```tsx
<ProductDetailView
  product={product}
  onCustomize={(product) => openCustomizationModal(product)}
  onAddToCart={(product, quantity) => addToCart(product, quantity)}
  onBuyNow={(product, quantity) => proceedToCheckout(product, quantity)}
  onWishlist={(product, isWishlisted) => updateWishlist(product, isWishlisted)}
  onShare={(product) => shareProduct(product)}
  showBuyNow={true}
  showWishlist={true}
  showShare={true}
  showTrustBadges={true}
  showTabs={true}
  customizeButtonText="🎨 Make It Yours"
  className="custom-product-detail"
/>
```

### Modal-Optimized Configuration
```tsx
<ProductDetailView
  product={product}
  onCustomize={handleCustomize}
  onAddToCart={handleAddToCart}
  showTabs={false}          // Simplified for modal
  showTrustBadges={false}   // Less clutter in modal
  className="p-4"
/>
```

## Default Behaviors

When event handlers are not provided, the component includes sensible defaults:

- **onCustomize**: Shows alert with customization message
- **onAddToCart**: Shows alert confirming item added to cart
- **onBuyNow**: Shows alert about proceeding to checkout
- **onWishlist**: Shows alert about wishlist action
- **onShare**: Uses native Web Share API or clipboard fallback

## Styling and Theming

The component uses the existing design system:

- **Colors**: `mint-green`, `charcoal`, `off-white`
- **Typography**: Font serif for headings, consistent sizing
- **Spacing**: Tailwind spacing utilities
- **Responsive**: Mobile-first responsive design

## Best Practices

1. **Always provide event handlers** for production use instead of relying on defaults
2. **Use TypeScript** to ensure type safety
3. **Configure display options** based on context (modal vs. full page)
4. **Handle loading states** in parent components
5. **Implement error boundaries** for robust error handling

## Integration with Existing Code

The component is designed to work seamlessly with:

- **ProductCard**: Click handlers can open modals with ProductDetailView
- **ProductGrid**: Can be used in product listing contexts
- **Navigation**: Works with React Router for page-based usage
- **State Management**: Compatible with any state management solution

## Future Enhancements

Potential improvements:

- **Lazy loading** for images
- **Zoom functionality** for product images
- **360° view** support
- **Accessibility** improvements (ARIA labels, keyboard navigation)
- **Animation** enhancements
- **Print styles** for product details

## Migration Guide

To migrate existing product detail implementations:

1. Replace inline product detail JSX with `<ProductDetailView />`
2. Move event handlers to props
3. Configure display options as needed
4. Update imports to use the new component
5. Test all functionality in different contexts

## Examples Repository

See the following files for complete implementation examples:

- `src/pages/ProductDetail.tsx` - Full page implementation
- `src/components/products/ProductDetailModal.tsx` - Modal implementation
- `src/components/products/ProductDetailView.tsx` - Core component

This modular approach ensures consistent product display across the application while maintaining flexibility for different use cases.