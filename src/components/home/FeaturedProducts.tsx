import React, { useState } from 'react';
import { useShopify } from '../../context/ShopifyContext';
import { ProductCard } from '../common/ProductCard';
import { ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  onSelectProduct: (handle: string) => void;
  onViewAllClick: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  onSelectProduct,
  onViewAllClick,
}) => {
  const { products } = useShopify();
  const [filter, setFilter] = useState<'all' | 'bestsellers' | 'new'>('all');

  const filteredProducts = products.filter(p => {
    if (filter === 'bestsellers') return p.tags.includes('Best Seller');
    if (filter === 'new') return p.tags.includes('New Arrival');
    return true;
  });

  return (
    <section className="py-16 sm:py-24 bg-[#FFFDF8] border-b border-[#242124]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Functional Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C6A56B] font-semibold">
              Signature Collection
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#242124]">
              Elevate Your Daily Ritual
            </h2>
          </div>

          {/* Interactive filter tabs (clean segmented controls per anti-slop rules) */}
          <div className="flex items-center gap-1 p-1 bg-[#EAE1D7]/50 rounded-xs self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-white text-[#242124] shadow-xs'
                  : 'text-[#242124]/70 hover:text-[#242124]'
              }`}
            >
              All Formulations
            </button>
            <button
              onClick={() => setFilter('bestsellers')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors ${
                filter === 'bestsellers'
                  ? 'bg-white text-[#242124] shadow-xs'
                  : 'text-[#242124]/70 hover:text-[#242124]'
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setFilter('new')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors ${
                filter === 'new'
                  ? 'bg-white text-[#242124] shadow-xs'
                  : 'text-[#242124]/70 hover:text-[#242124]'
              }`}
            >
              New Arrivals
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.slice(0, 6).map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>

        {/* Bottom Link to Shop All */}
        <div className="mt-12 text-center">
          <button
            onClick={onViewAllClick}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#242124] hover:text-[#C6A56B] py-2 border-b border-[#242124] hover:border-[#C6A56B] transition-colors"
          >
            <span>View Complete Kathryn Lynne Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
