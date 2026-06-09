import { useState } from 'react';
import { X } from 'lucide-react';
import ProductDetailView, { DetailedProduct, ProductDetailViewProps } from './ProductDetailView';

interface ProductDetailModalProps {
  product: DetailedProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onCustomize?: ProductDetailViewProps['onCustomize'];
  onWishlist?: ProductDetailViewProps['onWishlist'];
  onShare?: ProductDetailViewProps['onShare'];
}

/**
 * Example of how ProductDetailView can be used in a modal context
 * This demonstrates the reusability and modularity of the component
 */
const ProductDetailModal = ({
  product,
  isOpen,
  onClose,
  onCustomize,
  onWishlist,
  onShare
}: ProductDetailModalProps) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-off-white w-full max-w-7xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-500 ease-out rounded-lg shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full text-charcoal hover:bg-mint-green hover:text-charcoal transition-all duration-200 shadow-lg hover:shadow-xl"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Product Detail View - Reused Component */}
        <div className="p-6">
          <ProductDetailView
            product={product}
            onCustomize={onCustomize}
            onWishlist={onWishlist}
            onShare={onShare}
            showTabs={false} // Simplified view for modal
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
export type { ProductDetailModalProps };