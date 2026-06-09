import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import Container from '../ui/Container.tsx';
import { Link } from 'react-router-dom';

/* ---------------- CSS Animations ---------------- */
const navbarAnimations = `
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .navbar-item {
    position: relative;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .navbar-item::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #10b981, #059669);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  .navbar-item:hover::before,
  .navbar-item.active::before {
    width: 100%;
  }

  .mega-menu-enter {
    animation: slideDown 0.25s ease forwards;
    z-index: 9999;
  }

  .chevron-animation {
    transition: transform 0.25s ease;
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

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/20 transition-all duration-300
      ${isScrolled ? 'bg-white/10 backdrop-blur-lg shadow-lg' : 'bg-off-white'} ${className}`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div onClick={scrollToTop} className="cursor-pointer">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/assets/images/navbar/MND_Logo.png"
                alt="logo"
                className="h-10 w-10 lg:h-16 lg:w-16"
              />
              <span className="font-semibold text-charcoal text-sm lg:text-xl">
                Modern Nature Design Nepal
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center space-x-6 ml-auto">
            <Link
              to="/about"
              className={`navbar-item px-4 py-3 rounded-lg ${activeNavItem === 'about' ? 'active' : ''}`}
              onMouseEnter={() => setActiveNavItem('about')}
              onMouseLeave={() => setActiveNavItem(null)}
            >
              About
            </Link>

            <Link to="/collections" className="navbar-item px-4 py-3 rounded-lg">
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
                className={`navbar-item flex items-center space-x-1 px-4 py-3 rounded-lg
                  ${activeMegaMenu === 'services' ? 'active' : ''}`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`chevron-animation w-4 h-4 ${
                    activeMegaMenu === 'services' ? 'rotate-180' : ''
                  }`}
                />
              </Link>

              {activeMegaMenu === 'services' && (
                <div className="mega-menu-enter absolute top-full left-0 mt-2 w-56 rounded-xl shadow-xl border border-white/30 bg-white/95 backdrop-blur-lg">
                  <div className="p-3 space-y-1">
                    <Link
                      to="/services"
                      onClick={() => setActiveMegaMenu(null)}
                      className="block px-4 py-2 rounded-lg text-sm text-charcoal hover:bg-mint-green/10 transition"
                    >
                      Our Services
                    </Link>
                    <Link
                      to="/rug-care"
                      onClick={() => setActiveMegaMenu(null)}
                      className="block px-4 py-2 rounded-lg text-sm text-charcoal hover:bg-mint-green/10 transition"
                    >
                      Rug Care
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/contact" className="navbar-item px-4 py-3 rounded-lg">
              Contact
            </Link>

            {/* 🔥 ORIGINAL Color Customizer Button — UNCHANGED */}
            <Link
              to="/color-customizer"
              onMouseEnter={() => setActiveNavItem('Color Customizer')}
              onMouseLeave={() => setActiveNavItem(null)}
              className={`inline-flex items-center justify-center px-3 py-0.5 rounded-xl text-lg font-bold shadow-md transition-all duration-300
                ${
                  activeNavItem === 'Color Customizer'
                    ? 'scale-105 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 text-gray-900'
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

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden mt-2 mb-3 rounded-2xl border border-white/40 bg-white/95 shadow-lg backdrop-blur-md">
            <div className="flex flex-col px-4 py-3 space-y-2 text-sm">
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 border-b border-gray-100 last:border-b-0 text-charcoal"
              >
                About
              </Link>

              <Link
                to="/collections"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 border-b border-gray-100 last:border-b-0 text-charcoal"
              >
                Collections
              </Link>

              <Link
                to="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 border-b border-gray-100 text-charcoal"
              >
                Services
              </Link>

              <Link
                to="/rug-care"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 border-b border-gray-100 text-charcoal"
              >
                Rug Care
              </Link>

              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 border-b border-gray-100 text-charcoal"
              >
                Contact
              </Link>

              <Link
                to="/color-customizer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-3 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 px-4 py-2 text-sm font-bold text-gray-900 shadow-md"
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
        )}
      </Container>
    </nav>
  );
}
