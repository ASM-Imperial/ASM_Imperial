// src/components/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    // scroll to top on every pathname change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
