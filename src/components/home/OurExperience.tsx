import React, { useState, useEffect, useRef } from 'react';
import { Clock, Scissors, Home, Globe, Leaf } from 'lucide-react';
import Container from '../ui/Container.tsx';
import SectionHeading from './SectionHeading';

// CSS for floating animation
const floatingStyles = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
    }
  }
  
  .float-animation {
    animation: float 3.5s ease-in-out infinite;
  }
  
  .float-delay-1 {
    animation-delay: 0.5s;
  }
  
  .float-delay-2 {
    animation-delay: 1s;
  }
  
  .float-delay-3 {
    animation-delay: 1.5s;
  }
  
  .float-delay-4 {
    animation-delay: 2s;
  }
`;

// CSS injection will be handled in useEffect

interface ExperienceCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const experienceCards: ExperienceCard[] = [
  {
    id: 'craftsmanship',
    icon: <Clock className="w-8 h-8" />,
    title: '30+ Years of Craftsmanship',
    description: 'Serving homes with hand-Knotted rugs since 1990 A.D.'
  },
  {
    id: 'authentic',
    icon: <Scissors className="w-8 h-8" />,
    title: 'Authentic Hand-Knotted Rugs',
    description: 'Each rug is crafted by skilled artisans using traditional weaving methods.'
  },
  {
    id: 'happy-homes',
    icon: <Home className="w-8 h-8" />,
    title: '10,000+ Happy Homes',
    description: 'Proudly decorating homes, hotels, and offices with our timeless rugs.'
  },
  {
    id: 'worldwide',
    icon: <Globe className="w-8 h-8" />,
    title: 'Worldwide Delivery',
    description: 'From Nepal to the world – shipping premium rugs to over several countries.'
  },
  {
    id: 'sustainable',
    icon: <Leaf className="w-8 h-8" />,
    title: 'Sustainable Craft',
    description: 'Made with natural wool and dyes, eco-friendly and durable.'
  }
];

interface ExperienceCardComponentProps {
  card: ExperienceCard;
  isVisible: boolean;
  index: number;
}

function ExperienceCardComponent({ card, isVisible, index }: ExperienceCardComponentProps) {
  return (
    <div 
      className={`group bg-white rounded-xl p-6 shadow-lg border border-warm-beige/30 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out transform h-64 flex flex-col overflow-hidden transition-shadow float-animation ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-8 opacity-0'
      } ${index === 1 ? 'float-delay-1' : index === 2 ? 'float-delay-2' : index === 3 ? 'float-delay-3' : index === 4 ? 'float-delay-4' : ''}`}
      style={{
        transitionDelay: `${index * 100}ms`
      }}
    >
      {/* Icon */}
      <div className="flex justify-center mb-3 flex-shrink-0">
        <div className="p-3 rounded-full text-gray-400 group-hover:bg-gray-400 group-hover:text-white transition-all duration-300">
          <div className="w-8 h-8">{card.icon}</div>
        </div>
      </div>
      
      {/* Content Container */}
      <div className="flex-1 flex flex-col justify-center min-h-0">
        {/* Title */}
        <h3 className="font-serif text-xl font-semibold text-charcoal text-center mb-3 group-hover:text-gray-400 transition-colors duration-300 line-clamp-2 break-words">
          {card.title}
        </h3>
        
        {/* Description */}
        <p className="text-charcoal/70 text-center text-sm leading-relaxed line-clamp-3 break-words">
          {card.description}
        </p>
      </div>
    </div>
  );
}

export default function OurExperience() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle CSS injection and cleanup
  useEffect(() => {
    const styleId = 'floating-animation-styles';
    
    // Check if styles already exist
    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.textContent = floatingStyles;
      document.head.appendChild(styleElement);
    }

    // Cleanup function to remove styles when component unmounts
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === sectionRef.current) {
              setIsVisible(true);
            } else {
              // Handle individual card visibility
              const cardIndex = cardRefs.current.findIndex(ref => ref === entry.target);
              if (cardIndex !== -1) {
                setVisibleCards(prev => new Set([...prev, experienceCards[cardIndex].id]));
              }
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="bg-[url('/assets/images/products/TheWall.jpg')] bg-fit py-16 lg:py-24 bg-warm-beige/10">
      <Container>
        <div ref={sectionRef}>
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <SectionHeading
              title="Mastery in Motion"
              subtitle="Mastering the Art of Hand-Knotted Rugs - Nepal's Trusted Artisans"
              className="mb-12 lg:mb-16 font-bold"
            />
          </div>
        </div>
        
        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
          {experienceCards.map((card, index) => (
            <div
              key={card.id}
              ref={el => cardRefs.current[index] = el}
              className={`transform transition-all duration-700 ${
                visibleCards.has(card.id) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } ${
                index === 1 || index === 3 ? 'mt-8' : ''
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <ExperienceCardComponent
                card={card}
                isVisible={visibleCards.has(card.id)}
                index={index}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}