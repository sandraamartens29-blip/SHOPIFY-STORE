import React from 'react';
import { ShopifyProduct } from '../../types/shopify';
import { useShopify } from '../../context/ShopifyContext';
import { Heart, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: ShopifyProduct;
  onSelectProduct: (handle: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
}) => {
  const { formatPrice, addToCart, isWishlisted, toggleWishlist } = useShopify();
  const wishlisted = isWishlisted(product.id);

  const primaryVariant = product.variants[0];
  const priceUSD = parseFloat(primaryVariant?.price.amount || '0');
  const compareAtUSD = primaryVariant?.compareAtPrice
    ? parseFloat(primaryVariant.compareAtPrice.amount)
    : null;

  const hasDiscount = compareAtUSD && compareAtUSD > priceUSD;
  const isBestSeller = product.tags.includes('Best Seller');
  const isNewArrival = product.tags.includes('New Arrival');

  return (
    <div className="group relative flex flex-col bg-white border border-[#242124]/10 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      {/* Image Container with 4:3 or 1:1 luxury aspect ratio */}
      <div className="relative aspect-4/3 w-full bg-[#FFFDF8] overflow-hidden">
        {/* Wishlist Button */}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 hover:bg-white backdrop-blur-xs transition-colors rounded-full shadow-xs"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted
                ? 'fill-[#C6A56B] text-[#C6A56B]'
                : 'text-[#242124]/60 hover:text-[#242124]'
            }`}
          />
        </button>

        {/* Quiet Editorial Tag (Unboxed, single-line text tag) */}
        {(isBestSeller || isNewArrival || hasDiscount) && (
          <div className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-widest font-semibold px-2 py-1 bg-[#242124] text-white">
            {isBestSeller ? 'Curated Best Seller' : isNewArrival ? 'New Arrival' : 'Special Value'}
          </div>
        )}

        {/* Product Image */}
        <button
          onClick={() => onSelectProduct(product.handle)}
          className="w-full h-full block text-left"
          tabIndex={-1}
        >
          <img
            src={product.images[0]?.url}
            alt={product.images[0]?.altText || product.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
          />
        </button>

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <button
            onClick={e => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-full py-2.5 bg-[#242124] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#3d383d] transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#C6A56B]" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <div className="space-y-1">
          {/* Category & Volume (unboxed metadata) */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#242124]/60 font-medium">
            <span>{product.category}</span>
            {product.details?.size && (
              <>
                <span aria-hidden="true">·</span>
                <span>{product.details.size}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif-luxury text-base sm:text-lg text-[#242124] line-clamp-1 group-hover:text-[#C6A56B] transition-colors">
            <button
              onClick={() => onSelectProduct(product.handle)}
              className="text-left w-full"
            >
              {product.title}
            </button>
          </h3>

          {/* Short description */}
          <p className="text-xs text-[#242124]/70 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price and Mobile Add Button */}
        <div className="pt-2 border-t border-[#242124]/5 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-semibold tabular-nums text-[#242124]">
              {formatPrice(priceUSD)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-[#242124]/40 line-through tabular-nums">
                {formatPrice(compareAtUSD!)}
              </span>
            )}
          </div>

          {/* Mobile direct Add button */}
          <button
            onClick={() => addToCart(product)}
            className="sm:hidden p-2 text-[#242124] hover:text-[#C6A56B] bg-[#FFFDF8] border border-[#242124]/10 transition-colors"
            aria-label={`Add ${product.title} to bag`}
          >
            <ShoppingBag className="w-4 h-4 text-[#C6A56B]" />
          </button>
        </div>
      </div>
    </div>
  );
};
