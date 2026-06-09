import { Heart, Share2, Star } from 'lucide-react';
import { DetailedProduct } from './ProductDetailView';

interface ProductInfoProps {
  product: DetailedProduct;
  isWishlisted: boolean;
  onWishlist: () => void;
  onShare: () => void;
  showWishlist?: boolean;
  showShare?: boolean;
  className?: string;
}

const ProductInfo = ({
  product,
  isWishlisted,
  onWishlist,
  onShare,
  showWishlist = true,
  showShare = true,
  className = ''
}: ProductInfoProps) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-mint-green font-medium uppercase tracking-wide">
            {product.style}
          </span>
          {(showWishlist || showShare) && (
            <div className="flex items-center space-x-2">
              {showWishlist && (
                <button
                  onClick={onWishlist}
                  className={`p-2 rounded-full transition-colors ${
                    isWishlisted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              )}
              {showShare && (
                <button
                  onClick={onShare}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
        
        <h1 className="font-serif text-3xl lg:text-4xl font-medium text-charcoal mb-4">
          {product.name}
        </h1>
        
      </div>

      {/* Key Features */}
      {product.features && product.features.length > 0 && (
        <div className="bg-mint-green/10 rounded-lg p-4">
          <h3 className="font-medium text-charcoal mb-3">Key Features</h3>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-charcoal/80">
                <div className="w-1.5 h-1.5 bg-mint-green rounded-full mr-3 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
export type { ProductInfoProps };