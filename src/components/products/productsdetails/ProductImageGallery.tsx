import { useState } from 'react';

interface ProductImageGalleryProps {
  productName: string;
  mainImageUrl?: string;
  className?: string;
}

const ProductImageGallery = ({ productName, mainImageUrl, className = '' }: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock additional images for gallery
  const productImages = [
    mainImageUrl,
    // '/public/assets/images/products/AankhiJhyal.jpg', // Alternative view
    // '/public/assets/images/products/AankhiJhyal.jpg' // Detail shot
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Main Image */}
      <div className="w-full max-w-md mx-auto bg-gray-100 rounded-lg overflow-hidden min-h-[300px] flex items-center justify-center">
        <img
          src={productImages[selectedImage]}
          alt={productName}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      
    
    </div>
  );
};

export default ProductImageGallery;
export type { ProductImageGalleryProps };