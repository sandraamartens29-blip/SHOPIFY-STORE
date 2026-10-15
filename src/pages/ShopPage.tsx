import React, { useState, useMemo } from 'react';
import { useShopify } from '../context/ShopifyContext';
import { ProductCard } from '../components/common/ProductCard';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ShopPageProps {
  onSelectProduct: (handle: string) => void;
  onNavigate: (route: string, param?: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onSelectProduct,
  onNavigate,
}) => {
  const { products, activeCurrency } = useShopify();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [maxPriceUSD, setMaxPriceUSD] = useState<number>(100);

  const categories = [
    { label: 'All Rituals', value: 'all' },
    { label: 'Radiance Serums', value: 'Serums' },
    { label: 'Restorative Creams', value: 'Moisturizers' },
    { label: 'Clarifying Cleansers', value: 'Cleansers' },
    { label: 'Intensive Balms', value: 'Treatments' },
    { label: 'Body Care', value: 'Body Care' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (onlyInStock && !p.availableForSale) return false;
        const price = parseFloat(p.variants[0]?.price.amount || '0');
        if (price > maxPriceUSD) return false;
        return true;
      })
      .sort((a, b) => {
        const priceA = parseFloat(a.variants[0]?.price.amount || '0');
        const priceB = parseFloat(b.variants[0]?.price.amount || '0');
        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0;
      });
  }, [products, selectedCategory, onlyInStock, maxPriceUSD, sortBy]);

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb & Heading */}
        <div className="space-y-3">
          <nav className="flex items-center gap-2 text-xs text-[#242124]/60">
            <button onClick={() => onNavigate('home')} className="hover:text-[#242124]">
              Home
            </button>
            <span>/</span>
            <span className="text-[#242124] font-medium">Shop All</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#242124]/10 pb-6">
            <div>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#242124]">
                The Kathryn Lynne Collection
              </h1>
              <p className="text-xs text-[#242124]/70 mt-1 max-w-xl">
                Every formulation is crafted with bio-compatible botanical oils, clinical antioxidants, and barrier-repairing lipids.
              </p>
            </div>
            <span className="text-xs uppercase tracking-wider text-[#242124]/60 tabular-nums font-semibold">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Available
            </span>
          </div>
        </div>

        {/* Filter & Sorting Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 bg-white border border-[#242124]/10 shadow-xs">
          
          {/* Category Tabs (Clean buttons per anti-slop guidelines) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-[#242124] text-white'
                    : 'bg-[#FFFDF8] border border-[#242124]/10 text-[#242124]/70 hover:text-[#242124]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Controls: Stock Toggle & Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-[#242124]/80">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={e => setOnlyInStock(e.target.checked)}
                className="rounded-none text-[#242124] focus:ring-[#C6A56B]"
              />
              <span>In Stock Only</span>
            </label>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#242124]/50" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-transparent border border-[#242124]/20 py-1.5 px-2 text-xs text-[#242124] focus:outline-none focus:border-[#C6A56B]"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white border border-[#242124]/10 p-8 space-y-4">
            <h3 className="font-serif-luxury text-xl text-[#242124]">
              No matching formulations found
            </h3>
            <p className="text-xs text-[#242124]/60 max-w-sm mx-auto">
              Try adjusting your category filter or clearing search criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setOnlyInStock(false);
                setMaxPriceUSD(100);
              }}
              className="px-6 py-2.5 bg-[#242124] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#3d383d] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
