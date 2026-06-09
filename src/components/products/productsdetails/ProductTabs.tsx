import { useState } from 'react';
import { DetailedProduct } from './ProductDetailView';

interface ProductTabsProps {
  product: DetailedProduct;
  className?: string;
}

const ProductTabs = ({ product, className = '' }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <></>
  );
};

export default ProductTabs;
export type { ProductTabsProps };