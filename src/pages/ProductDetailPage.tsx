import React, { useState } from 'react';
import { useShopify } from '../context/ShopifyContext';
import { ProductCard } from '../components/common/ProductCard';
import {
  Heart,
  ShoppingBag,
  Share2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  Star,
  Check,
} from 'lucide-react';

interface ProductDetailPageProps {
  productHandle: string;
  onSelectProduct: (handle: string) => void;
  onNavigate: (route: string, param?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productHandle,
  onSelectProduct,
  onNavigate,
}) => {
  const {
    products,
    formatPrice,
    addToCart,
    isWishlisted,
    toggleWishlist,
    proceedToCheckout,
    addToast,
  } = useShopify();

  const product = products.find(p => p.handle === productHandle) || products[0];

  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || ''
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  // Accordion toggle states
  const [openAccordion, setOpenAccordion] = useState<string | null>('benefits');

  const selectedVariant =
    product.variants.find(v => v.id === selectedVariantId) || product.variants[0];

  const priceUSD = parseFloat(selectedVariant?.price.amount || '0');
  const compareAtUSD = selectedVariant?.compareAtPrice
    ? parseFloat(selectedVariant.compareAtPrice.amount)
    : null;
  const wishlisted = isWishlisted(product.id);

  // Related products (exclude current)
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        type: 'success',
        title: 'Link Copied',
        description: 'Product link copied to your clipboard.',
      });
    }
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant?.id, quantity);
    proceedToCheckout();
  };

  const toggleAccordionItem = (id: string) => {
    setOpenAccordion(prev => (prev === id ? null : id));
  };

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#242124]/60">
          <button onClick={() => onNavigate('home')} className="hover:text-[#242124]">
            Home
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('shop')} className="hover:text-[#242124]">
            Shop
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate('collection', product.category.toLowerCase())}
            className="hover:text-[#242124]"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="text-[#242124] font-medium truncate max-w-xs">
            {product.title}
          </span>
        </nav>

        {/* Contiguous Purchase Module Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image */}
            <div className="relative aspect-4/3 sm:aspect-1/1 w-full bg-white border border-[#242124]/10 overflow-hidden shadow-xs">
              <img
                src={product.images[selectedImageIndex]?.url || product.images[0]?.url}
                alt={product.images[selectedImageIndex]?.altText || product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              
              {/* Wishlist floating toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-2.5 bg-white/90 hover:bg-white rounded-full shadow-xs transition-colors"
                aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    wishlisted ? 'fill-[#C6A56B] text-[#C6A56B]' : 'text-[#242124]/60'
                  }`}
                />
              </button>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 shrink-0 bg-white border overflow-hidden transition-all ${
                      selectedImageIndex === idx
                        ? 'border-[#242124] ring-1 ring-[#242124]'
                        : 'border-[#242124]/15 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.altText || `${product.title} view ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title & Category & Rating */}
            <div className="space-y-2 border-b border-[#242124]/10 pb-6">
              <div className="flex items-center justify-between text-xs text-[#242124]/60 uppercase tracking-widest font-semibold">
                <span>{product.category}</span>
                {product.rating && (
                  <div className="flex items-center gap-1 text-[#C6A56B]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-[#242124] tabular-nums font-semibold">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="text-[#242124]/40">({product.reviewCount || 30})</span>
                  </div>
                )}
              </div>

              <h1 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-[#242124] tracking-tight">
                {product.title}
              </h1>

              {/* Price display with currency */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl sm:text-3xl font-semibold tabular-nums text-[#242124]">
                  {formatPrice(priceUSD)}
                </span>
                {compareAtUSD && compareAtUSD > priceUSD && (
                  <span className="text-sm text-[#242124]/40 line-through tabular-nums">
                    {formatPrice(compareAtUSD)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#242124]/80 leading-relaxed">
              {product.description}
            </p>

            {/* Variant Selector (e.g. Size/Volume) */}
            {product.variants.length > 1 && (
              <div className="space-y-2 pt-2">
                <label className="block text-xs uppercase tracking-wider text-[#242124] font-semibold">
                  Select Volume / Size
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map(variant => {
                    const isSelected = variant.id === selectedVariantId;
                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`p-3 text-left border text-xs transition-all ${
                          isSelected
                            ? 'border-[#242124] bg-white ring-1 ring-[#242124]'
                            : 'border-[#242124]/15 bg-white/50 text-[#242124]/70 hover:border-[#242124]/40'
                        }`}
                      >
                        <span className="font-semibold block text-[#242124]">
                          {variant.title}
                        </span>
                        <span className="text-[11px] tabular-nums text-[#242124]/60">
                          {formatPrice(parseFloat(variant.price.amount))}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector & Purchase Actions */}
            <div className="space-y-4 pt-4 border-t border-[#242124]/10">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#242124]/20 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-sm text-[#242124] hover:bg-[#EAE1D7]/30 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-semibold tabular-nums text-[#242124]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-sm text-[#242124] hover:bg-[#EAE1D7]/30 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag (Main CTA) */}
                <button
                  onClick={() => addToCart(product, selectedVariant?.id, quantity)}
                  className="flex-1 py-3.5 bg-[#242124] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#383338] transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C6A56B]" />
                  <span>Add to Bag</span>
                </button>
              </div>

              {/* Direct Buy Now Checkout */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-[#C6A56B] text-[#242124] text-xs uppercase tracking-widest font-semibold hover:bg-[#d6b77f] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Buy Now with Shopify</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs text-[#242124]/60 pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C6A56B]" />
                  <span>Shopify Verified Order & Payments</span>
                </div>
                <button
                  onClick={handleShare}
                  className="hover:text-[#242124] flex items-center gap-1 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Structured Accordions */}
            <div className="pt-6 border-t border-[#242124]/10 space-y-3">
              {/* Benefits & Skin Type */}
              <div className="border border-[#242124]/10 bg-white">
                <button
                  onClick={() => toggleAccordionItem('benefits')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-[#242124]"
                >
                  <span>Formulation Benefits & Skin Compatibility</span>
                  {openAccordion === 'benefits' ? (
                    <ChevronUp className="w-4 h-4 text-[#242124]/60" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#242124]/60" />
                  )}
                </button>
                {openAccordion === 'benefits' && (
                  <div className="p-4 pt-0 text-xs text-[#242124]/80 space-y-3 border-t border-[#242124]/5">
                    {product.details?.benefits && (
                      <ul className="space-y-1.5 list-disc list-inside">
                        {product.details.benefits.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                    {product.details?.skinType && (
                      <p className="text-[11px] text-[#242124]/60">
                        Recommended for: {product.details.skinType.join(', ')}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Verified Ingredients */}
              <div className="border border-[#242124]/10 bg-white">
                <button
                  onClick={() => toggleAccordionItem('ingredients')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-[#242124]"
                >
                  <span>Verified Botanical Ingredients</span>
                  {openAccordion === 'ingredients' ? (
                    <ChevronUp className="w-4 h-4 text-[#242124]/60" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#242124]/60" />
                  )}
                </button>
                {openAccordion === 'ingredients' && (
                  <div className="p-4 pt-0 text-xs text-[#242124]/75 leading-relaxed border-t border-[#242124]/5">
                    <p className="font-mono text-[11px] leading-relaxed">
                      {product.details?.ingredients || 'Cold-pressed botanical oils, natural ceramides, and pure floral extracts.'}
                    </p>
                    <p className="text-[10px] text-[#242124]/50 mt-2">
                      Free of parabens, artificial dyes, phthalates, and drying alcohols. Cruelty-free.
                    </p>
                  </div>
                )}
              </div>

              {/* Ritual & How to Use */}
              <div className="border border-[#242124]/10 bg-white">
                <button
                  onClick={() => toggleAccordionItem('usage')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-[#242124]"
                >
                  <span>Ritual & Directions</span>
                  {openAccordion === 'usage' ? (
                    <ChevronUp className="w-4 h-4 text-[#242124]/60" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#242124]/60" />
                  )}
                </button>
                {openAccordion === 'usage' && (
                  <div className="p-4 pt-0 text-xs text-[#242124]/75 leading-relaxed border-t border-[#242124]/5">
                    <p>
                      {product.details?.howToUse || 'Warm a few drops between palms and gently press onto clean face and neck morning and night.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Shipping & Delivery Info */}
              <div className="border border-[#242124]/10 bg-white">
                <button
                  onClick={() => toggleAccordionItem('shipping')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-[#242124]"
                >
                  <span>Shipping & Returns Policy</span>
                  {openAccordion === 'shipping' ? (
                    <ChevronUp className="w-4 h-4 text-[#242124]/60" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#242124]/60" />
                  )}
                </button>
                {openAccordion === 'shipping' && (
                  <div className="p-4 pt-0 text-xs text-[#242124]/75 space-y-2 border-t border-[#242124]/5">
                    <div className="flex items-start gap-2">
                      <Truck className="w-4 h-4 text-[#C6A56B] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#242124]">Nigeria Shipping</p>
                        <p className="text-[11px] text-[#242124]/70">
                          1–2 business days in Lagos & Abuja. 2–4 business days nationwide.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 pt-2">
                      <Sparkles className="w-4 h-4 text-[#C6A56B] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#242124]">Worldwide Express</p>
                        <p className="text-[11px] text-[#242124]/70">
                          3–5 business days to the UK, US, and Europe via DHL Express.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Related Products Recommendation */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-[#242124]/10 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C6A56B] font-semibold">
                Complete Your Ritual
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#242124]">
                Complementary Formulations
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map(rel => (
                <ProductCard
                  key={rel.id}
                  product={rel}
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
