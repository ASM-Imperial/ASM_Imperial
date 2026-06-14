import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import Container from '../ui/Container.tsx';
import { Link } from 'react-router-dom';

/* ---------------- CSS Animations ---------------- */
const navbarAnimations = `
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .navbar-item {
    position: relative;
    transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Sleek modern underline reveal */
  .navbar-item::before {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 16px;
    right: 16px;
    height: 2px;
    background: linear-gradient(90deg, #10b981, #059669);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: scaleX(0);
    transform-origin: right;
  }

  .navbar-item:hover::before,
  .navbar-item.active::before {
    transform: scaleX(1);
    transform-origin: left;
  }

  .mega-menu-enter {
    animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    z-index: 9999;
  }

  .chevron-animation {
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = '' }: NavbarProps) {
  const { isScrolled } = useScrollPosition();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null);

  // Type-safe reference fix for both browser and NodeJS environments
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---------------- Inject CSS ---------------- */
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = navbarAnimations;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  /* ---------------- Hover Helpers ---------------- */
  const openMenu = (menu: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveMegaMenu(menu);
  };

  const closeMenu = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b
      ${
        isScrolled
          ? 'bg-zinc-950/90 text-zinc-100 border-zinc-800 backdrop-blur-md shadow-2xl shadow-black/40'
          : 'bg-zinc-900/40 text-zinc-200 border-white/5 backdrop-blur-sm'
      } ${className}`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 lg:h-22">
          {/* Logo */}
          <div onClick={scrollToTop} className="cursor-pointer group">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/assets/images/navbar/MND_Logo.png"
                alt="logo"
                className="h-10 w-10 lg:h-14 lg:w-14 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]"
              />
              <span className="font-bold tracking-tight text-white text-sm lg:text-lg transition-colors duration-300 group-hover:text-emerald-400">
                Modern Nature Design Nepal
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center space-x-2 ml-auto font-medium text-[15px]">
            <Link
              to="/about"
              className={`navbar-item px-4 py-2.5 rounded-lg hover:text-white transition-colors duration-200 ${
                activeNavItem === 'about' ? 'active text-emerald-400' : ''
              }`}
              onMouseEnter={() => setActiveNavItem('about')}
              onMouseLeave={() => setActiveNavItem(null)}
            >
              About
            </Link>

            <Link 
              to="/collections" 
              className="navbar-item px-4 py-2.5 rounded-lg hover:text-white transition-colors duration-200"
            >
              Collections
            </Link>

            {/* -------- Services Dropdown -------- */}
            <div
              className="relative"
              onMouseEnter={() => openMenu('services')}
              onMouseLeave={closeMenu}
            >
              <Link
                to="/services"
                className={`navbar-item flex items-center space-x-1.5 px-4 py-2.5 rounded-lg hover:text-white transition-colors duration-200
                  ${activeMegaMenu === 'services' ? 'active text-emerald-400' : ''}`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`chevron-animation w-4 h-4 opacity-70 ${
                    activeMegaMenu === 'services' ? 'rotate-180 opacity-100 text-emerald-400' : ''
                  }`}
                />
              </Link>

              {activeMegaMenu === 'services' && (
                <div className="mega-menu-enter absolute top-full left-0 mt-2 w-60 rounded-xl shadow-2xl border border-zinc-800 bg-zinc-900/95 backdrop-blur-xl p-2">
                  <div className="space-y-0.5">
                    <Link
                      to="/services"
                      onClick={() => setActiveMegaMenu(null)}
                      className="block px-4 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-emerald-500/10 transition duration-150"
                    >
                      Our Services
                    </Link>
                    <Link
                      to="/rug-care"
                      onClick={() => setActiveMegaMenu(null)}
                      className="block px-4 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-emerald-500/10 transition duration-150"
                    >
                      Rug Care
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/contact" 
              className="navbar-item px-4 py-2.5 rounded-lg hover:text-white transition-colors duration-200"
            >
              Contact
            </Link>

            {/* 🔥 ORIGINAL Color Customizer Button — UNCHANGED CONTENT & LOGIC */}
            <div className="pl-2">
              <Link
                to="/color-customizer"
                onMouseEnter={() => setActiveNavItem('Color Customizer')}
                onMouseLeave={() => setActiveNavItem(null)}
                className={`inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-bold shadow-lg transition-all duration-300
                  ${
                    activeNavItem === 'Color Customizer'
                      ? 'scale-105 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 text-gray-900 shadow-white/5'
                      : 'bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 text-gray-900 hover:opacity-90 hover:scale-105'
                  }`}
              >
                <span className="flex space-x-0.5 drop-shadow-sm">
                  <span className="text-red-500">C</span>
                  <span className="text-orange-500">O</span>
                  <span className="text-yellow-400">L</span>
                  <span className="text-green-500">O</span>
                  <span className="text-blue-500">R</span>
                  <span>&nbsp;</span>
                  <span className="text-purple-500">C</span>
                  <span className="text-pink-500">U</span>
                  <span className="text-indigo-500">S</span>
                  <span className="text-red-400">T</span>
                  <span className="text-orange-400">O</span>
                  <span className="text-yellow-500">M</span>
                  <span className="text-green-400">I</span>
                  <span className="text-blue-400">Z</span>
                  <span className="text-purple-400">E</span>
                  <span className="text-pink-400">R</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2 text-zinc-300 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden mt-1 mb-4 rounded-2xl border border-zinc-800 bg-zinc-950/95 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col px-4 py-3 space-y-1 text-sm font-medium">
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 border-b border-zinc-900 last:border-b-0 text-zinc-300 hover:text-white transition"
              >
                About
              </Link>

              <Link
                to="/collections"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 border-b border-zinc-900 last:border-b-0 text-zinc-300 hover:text-white transition"
              >
                Collections
              </Link>

              <Link
                to="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 border-b border-zinc-900 text-zinc-300 hover:text-white transition"
              >
                Services
              </Link>

              <Link
                to="/rug-care"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 border-b border-zinc-900 text-zinc-300 hover:text-white transition"
              >
                Rug Care
              </Link>

              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 border-b border-zinc-900 text-zinc-300 hover:text-white transition"
              >
                Contact
              </Link>

              <div className="pt-2">
                <Link
                  to="/color-customizer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 px-4 py-2.5 text-sm font-bold text-gray-900 shadow-lg"
                >
                  <span className="flex space-x-0.5 drop-shadow-sm tracking-wide">
                    <span className="text-red-500">C</span>
                    <span className="text-orange-500">O</span>
                    <span className="text-yellow-400">L</span>
                    <span className="text-green-500">O</span>
                    <span className="text-blue-500">R</span>
                    <span>&nbsp;</span>
                    <span className="text-purple-500">C</span>
                    <span className="text-pink-500">U</span>
                    <span className="text-indigo-500">S</span>
                    <span className="text-red-400">T</span>
                    <span className="text-orange-400">O</span>
                    <span className="text-yellow-500">M</span>
                    <span className="text-green-400">I</span>
                    <span className="text-blue-400">Z</span>
                    <span className="text-purple-400">E</span>
                    <span className="text-pink-400">R</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}