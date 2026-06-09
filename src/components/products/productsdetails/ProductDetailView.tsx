import { useState } from 'react';
import { UnifiedProduct } from '../ProductUtils';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import ProductActions from './ProductActions';
import ProductTrustBadges from './ProductTrustBadges';
import ProductTabs from './ProductTabs';

// Extended product interface for detailed product information
export interface DetailedProduct extends UnifiedProduct {
  description?: string;
  features?: string[];
  specifications?: Record<string, string>;
}

export interface ProductDetailViewProps {
  product: DetailedProduct;
  onCustomize?: (product: DetailedProduct) => void;
  onAddToCart?: (product: DetailedProduct, quantity: number) => void;
  onBuyNow?: (product: DetailedProduct, quantity: number) => void;
  onWishlist?: (product: DetailedProduct, isWishlisted: boolean) => void;
  onShare?: (product: DetailedProduct) => void;
  showBuyNow?: boolean;
  showWishlist?: boolean;
  showShare?: boolean;
  showTrustBadges?: boolean;
  showTabs?: boolean;
  customizeButtonText?: string;
  className?: string;
}

const ProductDetailView = ({
  product,
  onCustomize,
  onWishlist,
  onShare,
  showWishlist = true,
  showShare = true,
  showTrustBadges = true,
  showTabs = true,
  customizeButtonText = '🎨 Customize This Rug',
  className = ''
}: ProductDetailViewProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleCustomize = () => {
    if (onCustomize) {
      onCustomize(product);
    } else {
      // Default behavior
      alert('Customize functionality would be implemented here!');
    }
  };

  const handleWishlist = () => {
    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);
    if (onWishlist) {
      onWishlist(product, newWishlistState);
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare(product);
    } else {
      // Default behavior
      if (navigator.share) {
        navigator.share({
          title: product.name,
          text: `Check out this amazing ${product.name}`,
          url: window.location.href,
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Product link copied to clipboard!');
      }
    }
  };

  return (
    <div className={`${className}`}>
      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Images */}
        <ProductImageGallery 
          productName={product.name}
          mainImageUrl={product.imageUrl}
        />

        {/* Product Info */}
        <div className="space-y-6">
          <ProductInfo
            product={product}
            isWishlisted={isWishlisted}
            onWishlist={handleWishlist}
            onShare={handleShare}
            showWishlist={showWishlist}
            showShare={showShare}
          />

          <ProductActions
            product={product}
            onCustomize={handleCustomize}
            customizeButtonText={customizeButtonText}
          />

          {/* Trust Badges */}
          {showTrustBadges && <ProductTrustBadges />}
        </div>
      </div>

      {/* Product Details Tabs */}
      {showTabs && <ProductTabs product={product} />}
    </div>
  );
};

export default ProductDetailView;