import React from 'react';
import { useShopify } from '../context/ShopifyContext';
import { ProductCard } from '../components/common/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

interface WishlistPageProps {
  onSelectProduct: (handle: string) => void;
  onNavigate: (route: string, param?: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  onSelectProduct,
  onNavigate,
}) => {
  const { wishlistProducts } = useShopify();

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="space-y-2 border-b border-[#242124]/10 pb-6">
          <nav className="flex items-center gap-2 text-xs text-[#242124]/60">
            <button onClick={() => onNavigate('home')} className="hover:text-[#242124]">
              Home
            </button>
            <span>/</span>
            <span className="text-[#242124] font-medium">Saved Items</span>
          </nav>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#242124]">
                Your Saved Wishlist
              </h1>
              <p className="text-xs text-[#242124]/70 mt-1">
                Saved items persist in your browser for seamless shopping anytime.
              </p>
            </div>
            <span className="text-xs uppercase tracking-wider text-[#242124]/60 font-semibold tabular-nums">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-24 bg-white border border-[#242124]/10 p-8 space-y-4 shadow-xs">
            <Heart className="w-12 h-12 text-[#242124]/20 mx-auto" />
            <div className="space-y-1">
              <h2 className="font-serif-luxury text-2xl text-[#242124]">
                Your wishlist is empty
              </h2>
              <p className="text-xs text-[#242124]/60 max-w-sm mx-auto">
                Tap the heart on any formulation to curate your personal skincare wish list.
              </p>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="px-8 py-3 bg-[#242124] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3d383d] transition-colors"
            >
              Explore Formulations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistProducts.map(product => (
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
