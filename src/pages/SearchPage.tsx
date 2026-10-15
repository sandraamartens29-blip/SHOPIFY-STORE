import React, { useState } from 'react';
import { useShopify } from '../context/ShopifyContext';
import { ProductCard } from '../components/common/ProductCard';
import { Search, X, Sparkles } from 'lucide-react';

interface SearchPageProps {
  onSelectProduct: (handle: string) => void;
  onNavigate: (route: string, param?: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  onSelectProduct,
  onNavigate,
}) => {
  const { searchQuery, setSearchQuery, searchResults, products } = useShopify();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localQuery);
  };

  const handleQueryChange = (val: string) => {
    setLocalQuery(val);
    setSearchQuery(val);
  };

  const popularSearches = ['Serums', 'Vitamin C', 'Shea Butter', 'Dry Skin', 'Harmattan', 'Moisturizers'];

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Search Input Bar */}
        <div className="space-y-4">
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#242124] text-center">
            Search Kathryn Lynne
          </h1>

          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative">
            <input
              type="text"
              value={localQuery}
              onChange={e => handleQueryChange(e.target.value)}
              placeholder="Search formulations, ingredients, or benefits..."
              autoFocus
              className="w-full bg-white border border-[#242124]/20 py-4 pl-12 pr-12 text-sm text-[#242124] placeholder:text-[#242124]/40 focus:outline-none focus:border-[#C6A56B] shadow-xs"
            />
            <Search className="w-5 h-5 text-[#242124]/40 absolute left-4 top-4" />
            {localQuery && (
              <button
                type="button"
                onClick={() => handleQueryChange('')}
                className="absolute right-4 top-4 text-[#242124]/40 hover:text-[#242124]"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </form>

          {/* Popular Search Suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#242124]/60 pt-1">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Popular:</span>
            {popularSearches.map(term => (
              <button
                key={term}
                onClick={() => handleQueryChange(term)}
                className="hover:text-[#242124] hover:underline"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {localQuery.trim() ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#242124]/10 pb-4">
              <span className="text-xs uppercase tracking-wider text-[#242124]/70 font-semibold tabular-nums">
                {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'} for "{localQuery}"
              </span>
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-16 bg-white border border-[#242124]/10 p-8 space-y-3">
                <p className="font-serif-luxury text-xl text-[#242124]">
                  No formulations found matching "{localQuery}"
                </p>
                <p className="text-xs text-[#242124]/60 max-w-sm mx-auto">
                  Try searching by broader terms such as "serum", "cleanser", or "shea".
                </p>
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-6 py-2.5 bg-[#242124] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#3d383d] transition-colors mt-2"
                >
                  Browse All Formulations
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchResults.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={onSelectProduct}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 pt-4">
            <h3 className="text-xs uppercase tracking-widest text-[#C6A56B] font-semibold text-center">
              Recommended Formulations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 3).map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
