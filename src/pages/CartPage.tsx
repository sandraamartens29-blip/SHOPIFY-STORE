import React, { useState } from 'react';
import { useShopify } from '../context/ShopifyContext';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Tag,
  ArrowLeft,
} from 'lucide-react';

interface CartPageProps {
  onNavigate: (route: string, param?: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const {
    cartLines,
    cartCount,
    cartSubtotalUSD,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    discountCode,
    discountPercent,
    applyDiscountCode,
    removeDiscountCode,
    formatPrice,
    proceedToCheckout,
    isCheckingOut,
  } = useShopify();

  const [promoInput, setPromoInput] = useState('');

  const discountAmountUSD = (cartSubtotalUSD * discountPercent) / 100;
  const finalTotalUSD = Math.max(0, cartSubtotalUSD - discountAmountUSD);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyDiscountCode(promoInput)) {
      setPromoInput('');
    }
  };

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb & Title */}
        <div className="space-y-2 border-b border-[#242124]/10 pb-6">
          <nav className="flex items-center gap-2 text-xs text-[#242124]/60">
            <button onClick={() => onNavigate('home')} className="hover:text-[#242124]">
              Home
            </button>
            <span>/</span>
            <span className="text-[#242124] font-medium">Shopping Bag</span>
          </nav>

          <div className="flex items-center justify-between">
            <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#242124]">
              Your Shopping Bag
            </h1>
            <span className="text-xs uppercase tracking-wider text-[#242124]/60 font-semibold tabular-nums">
              {cartCount} {cartCount === 1 ? 'Item' : 'Items'}
            </span>
          </div>
        </div>

        {cartLines.length === 0 ? (
          <div className="text-center py-24 bg-white border border-[#242124]/10 p-8 space-y-4 shadow-xs">
            <ShoppingBag className="w-12 h-12 text-[#242124]/20 mx-auto" />
            <div className="space-y-1">
              <h2 className="font-serif-luxury text-2xl text-[#242124]">
                Your bag is currently empty
              </h2>
              <p className="text-xs text-[#242124]/60 max-w-sm mx-auto">
                Explore our signature botanical formulations crafted to enrich your daily routine.
              </p>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="px-8 py-3 bg-[#242124] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3d373d] transition-colors"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Items Table */}
            <div className="lg:col-span-8 bg-white border border-[#242124]/10 shadow-xs">
              <div className="p-4 sm:p-6 border-b border-[#242124]/10 hidden sm:grid grid-cols-12 text-xs uppercase tracking-wider text-[#242124]/60 font-semibold">
                <div className="col-span-6">Formulation</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Unit Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="divide-y divide-[#242124]/10">
                {cartLines.map(line => {
                  const linePriceUSD = parseFloat(line.price.amount) || 0;
                  return (
                    <div
                      key={line.id}
                      className="p-4 sm:p-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center"
                    >
                      {/* Product details */}
                      <div className="w-full sm:col-span-6 flex gap-4 items-center">
                        <div className="w-16 h-16 bg-[#FFFDF8] border border-[#242124]/10 shrink-0 overflow-hidden">
                          {line.image?.url && (
                            <img
                              src={line.image.url}
                              alt={line.productTitle}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-[#242124] line-clamp-1">
                            {line.productTitle}
                          </h4>
                          {line.variantTitle && (
                            <p className="text-xs text-[#242124]/60 mt-0.5">
                              {line.variantTitle}
                            </p>
                          )}
                          <button
                            onClick={() => removeFromCart(line.id)}
                            className="text-[11px] text-[#242124]/50 hover:text-rose-600 underline mt-1 flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="w-full sm:col-span-2 flex justify-center">
                        <div className="flex items-center border border-[#242124]/20 bg-[#FFFDF8]">
                          <button
                            onClick={() => updateCartQuantity(line.id, line.quantity - 1)}
                            className="p-1.5 text-[#242124]/70 hover:text-[#242124]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-semibold tabular-nums text-[#242124]">
                            {line.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(line.id, line.quantity + 1)}
                            className="p-1.5 text-[#242124]/70 hover:text-[#242124]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="hidden sm:block sm:col-span-2 text-right text-xs tabular-nums text-[#242124]/70">
                        {formatPrice(linePriceUSD)}
                      </div>

                      {/* Line Total */}
                      <div className="w-full sm:col-span-2 flex justify-between sm:justify-end text-sm font-semibold tabular-nums text-[#242124]">
                        <span className="sm:hidden text-xs text-[#242124]/60">Total:</span>
                        <span>{formatPrice(linePriceUSD * line.quantity)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 bg-[#FFFDF8] border-t border-[#242124]/10 flex items-center justify-between text-xs">
                <button
                  onClick={() => onNavigate('shop')}
                  className="flex items-center gap-1.5 text-[#242124] hover:text-[#C6A56B] font-semibold uppercase tracking-wider"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Continue Shopping</span>
                </button>
                <button
                  onClick={clearCart}
                  className="text-[#242124]/50 hover:text-rose-600 underline"
                >
                  Clear Bag
                </button>
              </div>
            </div>

            {/* Order Summary Column */}
            <div className="lg:col-span-4 bg-white border border-[#242124]/10 p-6 shadow-xs space-y-6">
              <h3 className="font-serif-luxury text-xl text-[#242124] border-b border-[#242124]/10 pb-4">
                Order Summary
              </h3>

              {/* Promo code */}
              {discountCode ? (
                <div className="flex items-center justify-between bg-[#F3DDE2]/40 border border-[#F3DDE2] p-2.5 text-xs">
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
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={e => setPromoInput(e.target.value)}
                      placeholder="Promo code (WELCOME10)"
                      className="flex-1 bg-[#FFFDF8] border border-[#242124]/20 px-3 py-2 text-xs uppercase placeholder:normal-case focus:outline-none focus:border-[#C6A56B]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#242124] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#3b363b]"
                    >
                      Apply
                    </button>
                  </div>
                </form>
              )}

              {/* Cost Breakdown */}
              <div className="space-y-2 text-xs text-[#242124]/80 border-b border-[#242124]/10 pb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-semibold">
                    {formatPrice(cartSubtotalUSD)}
                  </span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#C6A56B] font-medium">
                    <span>Privilege Discount ({discountPercent}%)</span>
                    <span className="tabular-nums">-{formatPrice(discountAmountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#242124]/60 text-[11px]">
                  <span>Shipping & Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              {/* Final Total */}
              <div className="flex justify-between items-baseline text-lg font-semibold text-[#242124]">
                <span className="font-serif-luxury">Estimated Total</span>
                <span className="tabular-nums text-xl text-[#242124]">
                  {formatPrice(finalTotalUSD)}
                </span>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={proceedToCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-[#242124] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3b363b] transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <span>Opening Shopify Checkout...</span>
                  ) : (
                    <>
                      <span>Proceed to Shopify Checkout</span>
                      <ArrowRight className="w-4 h-4 text-[#C6A56B]" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#242124]/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C6A56B]" />
                  <span>Official Shopify Checkout · 256-Bit SSL Encrypted</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
