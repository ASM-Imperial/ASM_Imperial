import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnifiedProduct } from './ProductUtils';

// Pre-computed Set for O(1) lookup
const customizeProductsNormalized = new Set([
  "aankhijhyal", "attraction", "baasn", "bayleaves", "bubbles", "burningrope",
  "cells", "childhood", "festival", "fountainwater", "gurung", "holi",
  "imagination", "jungletribes", "lakheface", "majesty", "manaslucircuit",
  "maze", "mirror", "monkeytemple", "morningsun", "naghdaha", "namchebazar",
  "onboard", "ontheroad", "begnaslake", "path", "rainforest", "retro",
  "sherpalove", "shreepanch", "shyala", "sweet16", "teraifarm", "thoughts",
  "tides", "trek", "tsumvalleypatan", "undefineduniverse", "vines",
  "waterbrust", "watercoin", "weave", "pari", "chakati", "chino", "kaath",
  "landmark", "paisa", "ping", "puranojhyal", "smoke", "mandro", "tihar",
  "thewall", "ring", "lalitpur", "brokenmirror", "illusion", "beehive",
  "kunda", "budiaunla", "sukool", "waterlilies", "birendrataal", "echo",
  "kapaal", "phulchoki", "thaali"
]);

interface ProductCardProps {
  product: UnifiedProduct;
  onProductClick?: (product: UnifiedProduct) => void;
}

const ProductCard = memo(function ProductCard({ product, onProductClick }: ProductCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    const normalizedName = product.name.toLowerCase().replace(/\s+/g, "");
    if (customizeProductsNormalized.has(normalizedName)) {
      navigate(`/color-customizer/${normalizedName}`);
    } else {
      navigate(`/color-customizer/${product.id}`);
    }
    onProductClick?.(product);
  };

  return (
    <div 
      className="bg-gray-200 rounded-xl sm:rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition flex flex-col max-w-[254.4px] sm:max-w-[240px] [@media(min-width:768px)_and_(max-width:820px)]:max-w-none md:max-w-none mx-auto sm:mx-0 [@media(min-width:768px)_and_(max-width:820px)]:mx-auto"
      onClick={handleClick}
    >
      <div className="flex justify-center items-center bg-gray-200 h-[318px] sm:h-[260px] [@media(min-width:768px)_and_(max-width:820px)]:h-[320px] md:h-[240px] lg:h-[280px] xl:h-[388px]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-2">
        <h3 className="text-center font-medium text-charcoal line-clamp-2">
          {product.name}
        </h3>
      </div>
    </div>
  );
});

export default ProductCard;
export type { ProductCardProps };
