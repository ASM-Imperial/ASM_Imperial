import { useState } from 'react';
import { Heart, Eye } from 'lucide-react';

interface Color {
  id: string;
  name: string;
  hex: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  colors: Color[];
  category: string;
  isBestseller: boolean;
  isNew: boolean;
  dimensions?: string;
  material?: string;
}

interface ProductCardProps {
  product: Product;
  onQuickView: (id: string) => void;
  onWishlist: (id: string) => void;
}

interface ColorSwatchProps {
  colors: Color[];
  selectedColor?: string;
  onColorSelect: (color: string) => void;
}

function ColorSwatch({ colors, selectedColor, onColorSelect }: ColorSwatchProps) {
  return (
    <div className="flex space-x-2">
      {colors.slice(0, 3).map((color) => (
        <button
          key={color.id}
          onClick={(e) => {
            e.stopPropagation();
            onColorSelect(color.hex);
          }}
          className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
            selectedColor === color.hex ? 'border-charcoal scale-110' : 'border-gray-300 hover:border-charcoal'
          }`}
          style={{ backgroundColor: color.hex }}
          title={color.name}
          aria-label={`Select ${color.name} color`}
        />
      ))}
    </div>
  );
}

export default function ProductCard({ product, onQuickView, onWishlist }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.hex || '');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView(product.id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="group cursor-pointer bg-off-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {/* Product Image */}
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.isNew && (
            <span className="bg-mint-green text-charcoal px-3 py-1 rounded-full text-sm font-medium">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-charcoal text-off-white px-3 py-1 rounded-full text-sm font-medium">
              Bestseller
            </span>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors duration-200 ${
              isWishlisted 
                ? 'bg-mint-green text-charcoal' 
                : 'bg-white/80 text-charcoal hover:bg-mint-green hover:text-charcoal'
            }`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleQuickView}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-charcoal hover:bg-mint-green hover:text-charcoal transition-colors duration-200"
            aria-label="Quick view"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-charcoal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-serif text-lg font-medium text-charcoal mb-2 group-hover:text-mint-green transition-colors duration-200">
          {product.name}
        </h3>
        
        <p className="text-charcoal/70 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium text-xl text-charcoal">
            {formatPrice(product.price)}
          </span>
          
          {product.dimensions && (
            <span className="text-sm text-charcoal/60">
              {product.dimensions}
            </span>
          )}
        </div>
        
        {/* Color Swatches */}
        <div className="mb-4">
          <ColorSwatch
            colors={product.colors}
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
          />
        </div>
        
        {/* Add to Bag Button */}
        <button 
          className="w-full bg-gray-200 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed relative group/button"
          disabled
        >
          Add to bag
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-charcoal text-off-white text-sm rounded-lg opacity-0 group-hover/button:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Coming soon
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-charcoal" />
          </div>
        </button>
      </div>
    </div>
  );
}

export { type Product, type Color };