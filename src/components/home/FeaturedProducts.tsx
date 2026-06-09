import { useState, useEffect, useRef } from 'react';
import { X, Eye } from 'lucide-react';
import Container from '../ui/Container.tsx';
import SectionHeading from './SectionHeading';
import { useModal } from '@/hooks/useModal';
import productsData from '@/data/products.json';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  colors: { id: string; name: string; hex: string }[];
  category: string;
  isBestseller: boolean;
  isNew: boolean;
  color?: string;
  material: string;
  dimensions?: string;
}

interface ProductCardProps {
  product: Product;
  onCardClick: (product: Product) => void;
  isVisible: boolean;
  index: number;
  aspectRatio: string;
}

function ProductCard({ product, onCardClick, isVisible, index, aspectRatio }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Use high-quality rug images from Unsplash
  const rugImages = [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/Lakheyface.jpg',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/mirror.jpg',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/3ddd263e-dec3-4aa9-b376-24c13ed5020c.jpg',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/path.jpg',
  ];


  return (
    <div
      className={`group cursor-pointer transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onClick={() => onCardClick(product)}
    >
      <div className={`relative ${aspectRatio} overflow-hidden rounded-lg bg-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}>
        {/* Product Image - Full card coverage */}
        <img
          src={rugImages[index] || rugImages[0]}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Hover Overlay - Only appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content Overlay - Only visible on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-serif text-lg font-medium text-white mb-1 line-clamp-1">
            {product.name}
          </h3>
        </div>
      </div>
    </div>
  );
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedColor, setSelectedColor] = useState<string>('');

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.hex || '');
    }
  }, [product]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0
    }).format(price);
  };

  // Use the same high-quality images as the cards
  const rugImages = [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/Lakheyface.jpg',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/mirror.jpg',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/3ddd263e-dec3-4aa9-b376-24c13ed5020c.jpg',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/path.jpg',
  ];

  const productIndex = productsData.products.findIndex(p => p.id === product.id);
  const imageUrl = rugImages[productIndex] || rugImages[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-off-white w-[900px] h-[600px] max-w-[90vw] max-h-[90vh] flex flex-col lg:flex-row animate-in zoom-in-95  ease-out rounded-lg shadow-2xl hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full text-charcoal hover:bg-mint-green hover:text-charcoal transition-all duration-200 shadow-lg hover:shadow-xl"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Section */}
        <div className="lg:w-1/2 bg-gray-100 flex items-center justify-center min-h-[300px] lg:min-h-0">
          <div className="w-full h-full relative overflow-hidden">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="flex-1 overflow-y-auto">
            {/* Badges */}
            <div className="flex space-x-2 mb-4">
              {product.isNew && (
                <span className="bg-mint-green text-charcoal px-3 py-1 rounded-full text-sm font-medium">
                  New
                </span>
              )}

            </div>

            {/* Product Info */}
            <h2 className="font-serif text-2xl lg:text-3xl font-medium text-charcoal mb-3">
              {product.name}
            </h2>


            <p className="text-charcoal/70 leading-relaxed mb-6 font-bold">
              {product.description}
            </p>

            {/* Product Details */}
            <div className="space-y-3 mb-6">
              <div className="flex ">
                <span className="text-charcoal font-semibold"></span>
                <span className="text-charcoal/70 text-base font-normal whitespace-pre-line ">{product.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal font-semibold"></span>
                <span className="text-charcoal/70 text-base font-normal whitespace-pre-line">{product.material}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal font-semibold"></span>
                <span className="text-charcoal/70 text-base font-normal whitespace-pre-line">
                  {product.category.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useModal();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const featuredProducts = productsData.products.slice(0, 4);
    setProducts(featuredProducts);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
    setSelectedProduct(null);
  };

  return (
    <section ref={sectionRef} className="py-6 lg:py-10 bg-warm-beige/20">
      <Container>
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <SectionHeading
            title="The Rugs Everyone's Talking About — Hand Knotted for You"
            className="mb-6 lg:mb-14 text-center"
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {products.map((product, index) => {
            // Define grid positioning and aspect ratios for each card
            let gridClasses = "";
            let aspectRatio = "aspect-[4/3]";

            if (index === 0) {
              // First card: 3:1 aspect ratio, spans 2 columns on md and up
              gridClasses = "md:col-span-2";
              aspectRatio = "aspect-[3/1]";
            } else if (index === 1) {
              // Second card: 4:3 aspect ratio, single column
              gridClasses = "md:col-span-1";
              aspectRatio = "aspect-[4/3]";
            } else if (index === 2) {
              // Third card: 4:3 aspect ratio, single column
              gridClasses = "md:col-span-1";
              aspectRatio = "aspect-[4/3]";
            } else if (index === 3) {
              // Fourth card: 3:1 aspect ratio, spans 2 columns on md and up
              gridClasses = "md:col-span-2";
              aspectRatio = "aspect-[3/1]";
            }

            return (
              <div key={product.id} className={gridClasses}>
                <ProductCard
                  product={product}
                  onCardClick={handleCardClick}
                  isVisible={isVisible}
                  index={index}
                  aspectRatio={aspectRatio}
                />
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className={`transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
            <Link to="/collections" className="inline-flex items-center px-8 py-3 bg-charcoal text-off-white font-medium rounded-lg hover:bg-charcoal/90 transition-colors duration-200">
              View All Products
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}