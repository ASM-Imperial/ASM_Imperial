import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

// Enhanced animation variants for professional transitions
const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94] as const, // Custom cubic-bezier for smooth easing
    },
  }),
  hover: {
    y: -8,
    scale: 1.03,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: "easeOut" as const,
    },
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 300,
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 30,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 0.6,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn" as const,
    },
  },
};

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleClose = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  const handleOutsideClick = () => {
    handleClose();
  };

  // Handle escape key and browser back button
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selected) {
        handleClose();
      }
    };

    const handlePopState = () => {
      if (selected) {
        handleClose();
      }
    };

    if (selected) {
      // Add escape key listener
      document.addEventListener('keydown', handleEscape);
      
      // Push a new state when modal opens
      window.history.pushState({ modalOpen: true }, '');
      
      // Listen for back button
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [selected]);

  return (
    <motion.div 
      className="w-full min-h-[280px] p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-3 relative"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" }
      }}
    >
      {cards.map((card, i) => (
        <motion.div key={i} className={cn(card.className, "h-28")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              "relative overflow-hidden cursor-pointer min-h-full",
              selected?.id === card.id
                ? "fixed inset-0 h-screen w-screen m-auto z-50 flex justify-center items-center overflow-y-auto"
                : lastSelected?.id === card.id
                ? "z-40 bg-off-white rounded-xl h-full w-full shadow-lg"
                : "bg-off-white rounded-xl h-full w-full shadow-lg hover:shadow-2xl transition-shadow duration-300"
            )}
            layoutId={`card-${card.id}`}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover={selected?.id !== card.id ? "hover" : {}}
            whileTap={selected?.id !== card.id ? "tap" : {}}
            custom={i}
            style={{
              transformOrigin: "center",
            }}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} onClose={handleClose} />}
            <ImageComponent card={card} />
          </motion.div>
        </motion.div>
      ))}
      <AnimatePresence>
        {selected && (
          <motion.div
            onClick={handleOutsideClick}
            className="fixed inset-0 bg-black z-40 pointer-events-auto overflow-hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      className={cn(
        "object-cover object-center absolute inset-0 h-full w-full"
      )}
      alt="thumbnail"
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      whileHover={{
        scale: 1.05,
        transition: {
          duration: 0.4,
          ease: "easeOut"
        }
      }}
    />
  );
};

const SelectedCard = ({ selected, onClose }: { selected: Card | null; onClose: () => void }) => {
  return (
    <motion.div 
      className="bg-transparent min-h-full w-full flex flex-col justify-center py-8 rounded-lg shadow-2xl hover:shadow-xl transition-shadow duration-300 relative z-[60] max-w-4xl mx-auto"
      onClick={(e) => e.stopPropagation()}
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Close Button */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-6 right-6 z-[70] p-3 bg-white/95 backdrop-blur-md rounded-full shadow-xl border border-white/20"
        aria-label="Close modal"
        whileHover={{ 
          scale: 1.1, 
          rotate: 90,
          backgroundColor: "rgba(255, 255, 255, 1)",
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          rotate: 0,
          transition: { delay: 0.2, duration: 0.3 }
        }}
      >
        <X className="w-6 h-6 text-charcoal" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.8,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
        className="absolute inset-0 h-full w-full bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent z-10 rounded-lg"
      />
      
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            duration: 0.5,
            delay: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }}
        exit={{ 
          opacity: 0, 
          y: 40, 
          scale: 0.98,
          transition: { duration: 0.3 }
        }}
        className="relative px-8 pb-8 z-[70] max-w-3xl mx-auto"
      >
        {selected?.content}
      </motion.div>
    </motion.div>
  );
};