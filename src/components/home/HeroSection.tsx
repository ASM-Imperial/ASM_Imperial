import { useState, useEffect, useRef } from 'react';

interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

interface ImageLoadState {
  [key: string]: boolean;
}

const heroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    image: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/tihar1.jpg',
    title: 'Welcome To',
    subtitle: '',
    description: 'the leading manufacturing company of hand-knotted area rugs, knotted by skilled Nepalese artisans, turning tradition, texture, and inspiration into luxury'
  },
  {
    id: 'slide-2',
    image: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/chino1.jpg',
    title: 'Artisan Heritage',
    subtitle: 'Centuries of Craftsmanship',
    description: 'Each rug tells a story of skilled artisans preserving ancient techniques for modern homes'
  },
  {
    id: 'slide-3',
    image: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/festival2.jpg',
    title: 'Interior Alchemy',
    subtitle: 'Transfer Your Space',
    description: 'Discover handcrafted rugs that bridge traditional Nepalese artistry with contemporary design.'
  },
  {
    id: 'slide-4',
    image: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/broken%20mirror%20(2).jpg',
    title: 'Modern Living',
    subtitle: 'Contemporary Comfort',
    description: 'Experience the perfect blend of luxury, sustainability, and timeless design'
  }
];

const heroinnerSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    image: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/tihar.jpg',
    title: 'Interior Alchemy',
    subtitle: 'Transform Your Space',
    description: 'Discover handcrafted rugs that bridge traditional Nepalese artistry with contemporary design'
  },
  {
    id: 'slide-2',
    image: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/chino.jpg',
    title: 'Artisan Heritage',
    subtitle: 'Centuries of Craftsmanship',
    description: 'Each rug tells a story of skilled artisans preserving ancient techniques for modern homes'
  },
  {
    id: 'slide-3',
    image: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/festival.jpg',
    title: 'Modern Living',
    subtitle: 'Contemporary Comfort',
    description: 'Experience the perfect blend of luxury, sustainability, and timeless design'
  },

  {
    id: 'slide-4',
    image: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/Broken Mirror.jpg',
    title: 'Interior Alchemy',
    subtitle: 'Transfer Your Space',
    description: 'Discover handcrafted rugs that bridge traditional Nepalese artistry with contemporary design.'

  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [imageLoadStates, setImageLoadStates] = useState<ImageLoadState>({});
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observers = [];

    // Section observer
    if (sectionRef.current) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: '-50px 0px'
        }
      );
      sectionObserver.observe(sectionRef.current);
      observers.push(sectionObserver);
    }

    // Content observer
    if (contentRef.current) {
      const contentObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsContentVisible(true);
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: '-50px 0px'
        }
      );
      contentObserver.observe(contentRef.current);
      observers.push(contentObserver);
    }



    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  // Optimized image preloading - load first image immediately, others lazily
  useEffect(() => {
    const preloadImages = async () => {
      // Load first image immediately for fast initial render
      const firstSlide = heroSlides[0];
      const firstImg = new Image();
      firstImg.onload = () => {
        setImageLoadStates(prev => ({ ...prev, [firstSlide.id]: true }));
        setImagesPreloaded(true); // Allow render after first image loads
      };
      firstImg.onerror = () => {
        setImageLoadStates(prev => ({ ...prev, [firstSlide.id]: false }));
        setImagesPreloaded(true);
      };
      firstImg.src = firstSlide.image;

      // Load remaining images in background after a delay
      setTimeout(() => {
        heroSlides.slice(1).forEach((slide) => {
          const img = new Image();
          img.onload = () => {
            setImageLoadStates(prev => ({ ...prev, [slide.id]: true }));
          };
          img.onerror = () => {
            console.warn(`Failed to load image: ${slide.image}`);
            setImageLoadStates(prev => ({ ...prev, [slide.id]: false }));
          };
          img.src = slide.image;
        });
      }, 1000); // Delay loading other images by 1 second
    };

    preloadImages();
  }, []);

  // Autoplay functionality with visibility detection
  useEffect(() => {
    if (!imagesPreloaded) return;

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const startAutoplay = () => {
      if (intervalId) return;
      intervalId = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 7000);
    };

    const stopAutoplay = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Start autoplay if tab is visible
    if (!document.hidden) {
      startAutoplay();
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopAutoplay();
    };
  }, [imagesPreloaded]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20 md:pt-0"
    >
      {/* Background Images */}
      <div className="absolute inset-0">
        {!imagesPreloaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-charcoal/80 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-8 h-8 border-2 border-mint-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm opacity-75">Loading images...</p>
            </div>
          </div>
        )}
        {heroSlides.map((slide, index) => {
          const isLoaded = imageLoadStates[slide.id];
          const fallbackImage = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide && imagesPreloaded ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <img
                src={isLoaded !== false ? slide.image : fallbackImage}
                alt={slide.title}
                className={`w-full text-center h-full object-cover transition-opacity duration-500 ${isLoaded !== false ? 'opacity-100' : 'opacity-75'
                  }`}
                decoding="async"
                onError={(e) => {
                  console.warn(`Image failed to load: ${slide.image}`);
                  const target = e.target as HTMLImageElement;
                  if (target.src !== fallbackImage) {
                    target.src = fallbackImage;
                  }
                }}
              />
              <div className="absolute inset-0 bg-black/30" />
              {isLoaded === false && (
                <div className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded text-xs">
                  Using fallback image
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-white relative z-20 flex justify-center md:justify-start px-6 md:px-0">
              <div className={`bg-charcoal/90 backdrop-blur-md p-6 md:p-8 lg:p-12 rounded-2xl transform transition-all duration-1000 ease-out w-full ${isContentVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
                }`}>
                <h1 className={`font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 transform transition-all duration-1000 delay-200 ease-out ${isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}>
                  {heroSlides[currentSlide].title}
                </h1>
                <h2 className={`text-lg md:text-xl lg:text-2xl font-medium text-mint-green mb-4 lg:mb-6 transform transition-all duration-1000 delay-400 ease-out ${isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}>
                  {heroSlides[currentSlide].subtitle}
                </h2>
                <p className={`text-sm md:text-base lg:text-lg leading-relaxed text-off-white/90 transform transition-all duration-1000 delay-600 ease-out ${isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}>
                  {heroSlides[currentSlide].description}
                </p>

                {/* CTAs */}
                <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-800 ease-out ${isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}>
                </div>
              </div>
            </div>

            {/* Right Content - Rug Image */}
            <div className={`relative transform transition-all duration-1000 delay-300 ease-out flex justify-center md:justify-center px-6 md:px-0 mt-6 md:mt-8 lg:mt-12 ${isContentVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
              }`}>
              <div className="w-full max-w-[200px] md:max-w-[220px] lg:max-w-[280px] xl:max-w-[320px]">
                {imagesPreloaded ? (
                  <div className='shadow-2xl rounded-xl overflow-hidden'>
                    <img
                      src={imageLoadStates[heroSlides[currentSlide].id] !== false
                        ? heroinnerSlides[currentSlide].image
                        : 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
                      }
                      alt={`${heroinnerSlides[currentSlide].title} - Handcrafted rug`}
                      className={`w-full h-[340px] sm:h-[300px] md:h-[300px] lg:h-[380px] xl:h-[420px] object-cover transition-all duration-1000 ease-out ${imageLoadStates[heroSlides[currentSlide].id] !== false ? 'opacity-100' : 'opacity-75'
                        }`}
                      decoding="async"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const fallback = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
                        if (target.src !== fallback) {
                          target.src = fallback;
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-96 bg-charcoal/20 rounded-xl shadow-2xl flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-mint-green border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}