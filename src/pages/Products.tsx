import { useEffect } from 'react';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import AllProductsView from '@/components/products/AllProductsView';

const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      <div className="pt-20 pb-10">
        <AllProductsView />
      </div>
      <Footer />
    </div>
  );
};

export default Products;
