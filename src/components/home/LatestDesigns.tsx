import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { X } from 'lucide-react';
import Container from '../ui/Container.tsx';

import SectionHeading from './SectionHeading';

interface DesignCard {
  id: string;
  name: String;
  title: string;
  description: string;
  image: string;
  detailedDescription: string;
  materials?: string;
  // dimensions: string;
  // price: string;
}

const latestDesigns: DesignCard[] = [
  {
    id: 'design-1',
    name: 'Beehive',
    title: 'Key Features',
    description: 'Rich, tactile weaves inspired by mountain landscapes',
    image: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Beehive.webp',
    detailedDescription: `
            Hand-knotted by master artisans
            Premium yarn construction
            Fade-resistant colors
            Durable and long-lasting
            Easy to maintain
            Delivery Time : 2.5-3 months`,
    // materials: 'Premium Tibetan wool, Natural silk highlights',

  },
  {
    id: 'design-2',
    name: 'Lalitpur',
    title: 'Key Features',
    description: 'Intricate hand-knotted patterns with contemporary appeal',
    image: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Lalitpur.webp',
    detailedDescription: `
            Hand-knotted by master artisans
            Premium yarn construction
            Fade-resistant colors
            Durable and long-lasting
            Easy to maintain
            Delivery Time : 2.5-3 months`,
    // materials: 'Hand-spun wool, Bamboo silk accents',
  },
  {
    id: 'design-3',
    name: 'Majesty',
    title: 'Key Features',
    description: 'Traditional techniques reimagined for today\'s interiors',
    image: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Majesty.webp',
    detailedDescription: `
            Hand-knotted by master artisans
            Premium yarn construction
            Fade-resistant colors
            Durable and long-lasting
            Easy to maintain
            Delivery Time : 2.5-3 months`,
    // materials: 'Organic wool, Natural dyes, Cotton foundation',
  },
  {
    id: 'design-4',
    name: 'Ilusion',
    title: 'Key Features',
    description: 'Clean lines and subtle textures for modern spaces',
    image: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Ilusion.webp',
    detailedDescription: `
            Hand-knotted by master artisans
            Premium yarn construction
            Fade-resistant colors
            Durable and long-lasting
            Easy to maintain
            Delivery Time : 2.5-3 months`,
  },
  {
    id: 'design-5',
    name: 'Namche Bazar',
    title: 'Key Features',
    description: 'East meets West in harmonious design',
    image: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/NamcheBazar.webp',
    detailedDescription: `
            Hand-knotted by master artisans
            Premium yarn construction
            Fade-resistant colors
            Durable and long-lasting
            Easy to maintain
            Delivery Time : 2.5-3 months`,
    // materials: 'Highland wool, Silk details, Eco-friendly dyes',
  }
];

interface CarouselCardProps {
  design: DesignCard;
  onClick: () => void;
  isVisible?: boolean;
  index?: number;
}

const CarouselCard = memo(function CarouselCard({ design, onClick, isVisible = true, index = 0 }: CarouselCardProps) {
  return (
    <div
      className={`flex-shrink-0 w-40 sm:w-80 h-64 sm:h-96 cursor-pointer group transition-all duration-500 hover:scale-105 hover:z-20 relative transform will-change-transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      style={{
        transitionDelay: `${400 + (index * 100)}ms`,
        transform: 'translate3d(0, 0, 0)' // Hardware acceleration
      }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-xl bg-off-white shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
        <div className="h-full overflow-hidden">
          <img
            src={design.image}
            alt={design.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
          <h3 className="font-serif text-lg sm:text-xl font-medium mb-2 group-hover:text-mint-green transition-colors duration-300">
            {design.name}
          </h3>
          {/* <p className="text-off-white/90 leading-relaxed text-xs sm:text-sm line-clamp-2">
            {design.description}
          </p> */}
          <div className="mt-2 sm:mt-3 text-mint-green font-medium text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            Click to explore →
          </div>
        </div>

        <div className="absolute inset-0 bg-mint-green/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Subtle border on hover */}
        <div className="absolute inset-0 border-2 border-mint-green/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
});

const ExpandedCardModal = memo(function ExpandedCardModal({ design, isOpen, onClose }: { design: DesignCard | null; isOpen: boolean; onClose: () => void }) {
  if (!isOpen || !design) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-off-white rounded-2xl shadow-2xl hover:shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full text-charcoal hover:bg-mint-green hover:text-charcoal transition-colors duration-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-0 h-full">
          {/* Image Section */}
          <div className="relative h-64 md:h-full">
            <img
              src={design.image}
              alt={design.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
          </div>

          {/* Content Section */}
          <div className="p-8 overflow-y-auto">
            <h2 className="font-serif text-3xl font-medium text-charcoal mb-4">
              {design.title}
            </h2>


            <ul className="text-charcoal/70 leading-relaxed mb-6 text-lg space-y-2">
              {design.detailedDescription
                .trim()
                .split("\n")
                .map((line, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">✔</span>
                    <span>{line.trim()}</span>
                  </li>
                ))}
            </ul>
       

            {/* Details
            <div className="space-y-4 mb-8">
              <div>
                <h3 className="font-medium text-charcoal mb-2">Materials</h3>
                <p className="text-charcoal/70">{design.materials}</p>
              </div>            
            </div>            */}
          </div>
        </div>
      </div>
    </div>
  );
});

export default function LatestDesigns() {
  const [selectedDesign, setSelectedDesign] = useState<DesignCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useRef(0);
  const animationRef = useRef<number>();

  // Triple designs for seamless infinite scroll
  const duplicatedDesigns = [...latestDesigns, ...latestDesigns, ...latestDesigns];

  // Intersection observer for fade-in animation
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

  // Auto-scroll functionality with visibility detection
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || isPaused) return;

    let isTabVisible = !document.hidden;

    const scroll = () => {
      // Don't animate if tab is not visible - saves CPU
      if (!isTabVisible) {
        animationRef.current = requestAnimationFrame(scroll);
        return;
      }

      scrollPosition.current += 0.8; // Smooth scrolling speed

      // Reset position when we've scrolled through one complete set
      const cardWidth = 320 + 24; // w-80 (320px) + gap-6 (24px)
      const singleSetWidth = cardWidth * latestDesigns.length;

      // Reset to the middle set when reaching the end of second set
      if (scrollPosition.current >= singleSetWidth * 2) {
        scrollPosition.current = singleSetWidth;
      }

      carousel.style.transform = `translateX(-${scrollPosition.current}px)`;
      animationRef.current = requestAnimationFrame(scroll);
    };

    // Handle tab visibility changes
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Start from the middle set to allow seamless backward looping if needed
    const cardWidth = 320 + 24;
    const singleSetWidth = cardWidth * latestDesigns.length;
    scrollPosition.current = singleSetWidth;

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  const handleCardClick = useCallback((design: DesignCard) => {
    setSelectedDesign(design);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDesign(null), 300);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  return (
    <>
      <section ref={sectionRef} className="py-20 bg-off-white overflow-hidden">
        <Container>
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
            <SectionHeading
              title="Latest Designs"
              subtitle="Discover our newest creations, where traditional craftsmanship meets contemporary design"
            />
          </div>
        </Container>

        {/* Horizontal Scrolling Carousel */}
        <div className={`mt-16 relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
          <div
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={carouselRef}
              className="flex gap-6 will-change-transform"
              style={{
                width: 'fit-content',
                transform: 'translateX(0px)'
              }}
            >
              {duplicatedDesigns.map((design, index) => {
                const cardIndex = index % latestDesigns.length;

                return (
                  <CarouselCard
                    key={`${design.id}-${index}`}
                    design={design}
                    onClick={() => handleCardClick(design)}
                    isVisible={isVisible}
                    index={cardIndex}
                  />
                );
              })}
            </div>
          </div>

          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-r from-off-white via-off-white/80 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-l from-off-white via-off-white/80 to-transparent pointer-events-none z-10" />
        </div>

        {/* Instructions */}
        <div className="text-center mt-8">
        </div>
      </section>

      {/* Expanded Card Modal */}
      <ExpandedCardModal
        design={selectedDesign}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}