import React, { useState } from 'react';
import { useShopify } from '../../context/ShopifyContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Tag,
} from 'lucide-react';

interface CartDrawerProps {
  onNavigate: (route: string, param?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    cartLines,
    cartCount,
    cartSubtotalUSD,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    discountCode,
    discountPercent,
    applyDiscountCode,
    removeDiscountCode,
    formatPrice,
    proceedToCheckout,
    isCheckingOut,
    activeCurrency,
  } = useShopify();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const discountAmountUSD = (cartSubtotalUSD * discountPercent) / 100;
  const finalTotalUSD = Math.max(0, cartSubtotalUSD - discountAmountUSD);

  // Free shipping threshold: $60 USD or ₦50,000
  const freeShippingThresholdUSD = 60;
  const progressPercent = Math.min(100, Math.round((cartSubtotalUSD / freeShippingThresholdUSD) * 100));
  const diffUSD = Math.max(0, freeShippingThresholdUSD - cartSubtotalUSD);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyDiscountCode(promoInput)) {
      setPromoInput('');
    }
  };

  const handleGoToFullCart = () => {
    setIsCartOpen(false);
    onNavigate('cart');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF8] shadow-2xl flex flex-col border-l border-[#242124]/10">
          
          {/* Header */}
          <div className="p-5 border-b border-[#242124]/10 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C6A56B]" />
              <h2 className="font-serif-luxury text-xl text-[#242124]">
                Shopping Bag
              </h2>
              <span className="text-xs uppercase tracking-wider text-[#242124]/60 font-semibold tabular-nums">
                ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#242124]/60 hover:text-[#242124] transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-5 py-3 bg-[#EAE1D7]/30 border-b border-[#242124]/5">
            <div className="flex justify-between text-xs text-[#242124]/80 mb-1.5">
              <span>
                {diffUSD > 0
                  ? `Add ${formatPrice(diffUSD)} more for complimentary delivery`
                  : 'You have unlocked complimentary express delivery!'}
              </span>
              <span className="font-semibold tabular-nums">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#EAE1D7] overflow-hidden">
              <div
                className="h-full bg-[#C6A56B] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartLines.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-12 h-12 text-[#242124]/20 mx-auto" />
                <div className="space-y-1">
                  <p className="font-serif-luxury text-lg text-[#242124]">
                    Your bag is empty
                  </p>
                  <p className="text-xs text-[#242124]/60 max-w-xs mx-auto">
                    Discover our high-potency radiance formulations and elevate your daily ritual.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigate('shop');
                  }}
                  className="inline-block px-6 py-2.5 bg-[#242124] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#3b363b] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cartLines.map(line => {
                const linePriceUSD = parseFloat(line.price.amount) || 0;
                return (
                  <div
                    key={line.id}
                    className="flex gap-4 pb-4 border-b border-[#242124]/10 bg-white p-3 shadow-xs"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-20 bg-[#FFFDF8] shrink-0 border border-[#242124]/5 overflow-hidden">
                      {line.image?.url ? (
                        <img
                          src={line.image.url}
                          alt={line.image.altText || line.productTitle}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-[#242124]/30">
                          KL
                        </div>
                      )}
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-sm font-semibold text-[#242124] line-clamp-1">
                            {line.productTitle}
                          </h4>
                          <button
                            onClick={() => removeFromCart(line.id)}
                            className="text-[#242124]/40 hover:text-rose-600 p-0.5 transition-colors"
                            aria-label={`Remove ${line.productTitle}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {line.variantTitle && (
                          <p className="text-xs text-[#242124]/60 mt-0.5">
                            {line.variantTitle}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-[#242124]/20 bg-[#FFFDF8]">
                          <button
                            onClick={() => updateCartQuantity(line.id, line.quantity - 1)}
                            className="p-1 text-[#242124]/70 hover:text-[#242124] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold tabular-nums text-[#242124]">
                            {line.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(line.id, line.quantity + 1)}
                            className="p-1 text-[#242124]/70 hover:text-[#242124] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-xs sm:text-sm font-semibold tabular-nums text-[#242124]">
                          {formatPrice(linePriceUSD * line.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout actions */}
          {cartLines.length > 0 && (
            <div className="p-5 border-t border-[#242124]/10 bg-white space-y-4">
              {/* Promo Code Input */}
              {discountCode ? (
                <div className="flex items-center justify-between bg-[#F3DDE2]/40 border border-[#F3DDE2] p-2 text-xs">
                  <div className="flex items-center gap-1.5 text-[#242124]">
                    <Tag className="w-3.5 h-3.5 text-[#C6A56B]" />
                    <span>
                      Code <strong>{discountCode}</strong> applied ({discountPercent}% off)
                    </span>
                  </div>
                  <button
                    onClick={removeDiscountCode}
                    className="text-xs text-[#242124]/60 hover:text-rose-600 underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. WELCOME10)"
                    className="flex-1 bg-[#FFFDF8] border border-[#242124]/20 px-3 py-1.5 text-xs text-[#242124] uppercase placeholder:normal-case focus:outline-none focus:border-[#C6A56B]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#242124] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#3c373c] transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Totals */}
              <div className="space-y-1.5 text-xs text-[#242124]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-semibold">
                    {formatPrice(cartSubtotalUSD)}
                  </span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#C6A56B] font-medium">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="tabular-nums">-{formatPrice(discountAmountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#242124]/60 text-[11px]">
                  <span>Shipping & Taxes</span>
                  <span>Calculated at Shopify checkout</span>
                </div>
                <div className="pt-2 border-t border-[#242124]/10 flex justify-between text-base font-semibold text-[#242124]">
                  <span className="font-serif-luxury">Estimated Total</span>
                  <span className="tabular-nums text-lg text-[#242124]">
                    {formatPrice(finalTotalUSD)}
                  </span>
                </div>
              </div>

              {/* Checkout Action */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={proceedToCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-3.5 bg-[#242124] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3e393e] transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <span>Opening Shopify Checkout...</span>
                  ) : (
                    <>
                      <span>Checkout with Shopify</span>
                      <ArrowRight className="w-4 h-4 text-[#C6A56B]" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-[11px] text-[#242124]/60">
                  <button
                    onClick={handleGoToFullCart}
                    className="hover:text-[#242124] underline"
                  >
                    View Full Cart Page
                  </button>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C6A56B]" />
                    <span>Official Shopify Gateway</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
