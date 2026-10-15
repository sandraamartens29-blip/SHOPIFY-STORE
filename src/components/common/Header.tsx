import React, { useState } from 'react';
import { useShopify } from '../../context/ShopifyContext';
import { SupportedCurrency } from '../../types/shopify';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ChevronDown,
  Store,
} from 'lucide-react';

interface HeaderProps {
  onNavigate: (route: string, param?: string) => void;
  currentRoute: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentRoute }) => {
  const {
    cartCount,
    setIsCartOpen,
    activeCurrency,
    setCurrency,
    wishlistIds,
    setIsConfigModalOpen,
    isShopifyConnected,
  } = useShopify();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const currencies: SupportedCurrency[] = ['NGN', 'USD', 'GBP', 'EUR'];

  const handleLinkClick = (route: string, param?: string) => {
    onNavigate(route, param);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF8]/95 backdrop-blur-md border-b border-[#242124]/10 transition-colors">
      {/* Slim Top Announcement Bar */}
      <div className="bg-[#242124] text-[#FFFDF8] text-[11px] tracking-widest uppercase py-2 px-4 text-center font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:block w-32 text-left text-white/50 text-[10px]">
            Lagos · London · Global
          </div>
          <div className="flex-1 text-center truncate">
            <span>Complimentary delivery in Lagos & Abuja over ₦50,000</span>
            <span className="mx-2 text-[#C6A56B]">·</span>
            <span className="text-[#F3DDE2]">Worldwide express with DHL</span>
          </div>
          <div className="hidden md:flex w-32 justify-end items-center gap-3">
            <button
              onClick={() => setIsConfigModalOpen(true)}
              className="text-[10px] text-white/70 hover:text-[#C6A56B] flex items-center gap-1 transition-colors"
              title="Shopify Storefront Integration status"
            >
              <Store className="w-3 h-3 text-[#C6A56B]" />
              <span>{isShopifyConnected ? 'Shopify Live' : 'Connect Store'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation: 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <button
            onClick={() => handleLinkClick('home')}
            className="text-2xl sm:text-3xl font-serif-luxury tracking-tight text-[#242124] whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity text-left"
          >
            Kathryn Lynne
          </button>

          {/* Zone 2: 4-5 Clean Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-widest uppercase font-medium text-[#242124]/80">
            <button
              onClick={() => handleLinkClick('shop')}
              className={`hover:text-[#242124] transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                currentRoute === 'shop' ? 'text-[#242124] font-semibold' : ''
              }`}
            >
              Shop All
              {currentRoute === 'shop' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C6A56B]" />
              )}
            </button>
            <button
              onClick={() => handleLinkClick('collection', 'serums')}
              className="hover:text-[#242124] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Serums
            </button>
            <button
              onClick={() => handleLinkClick('collection', 'moisturizers')}
              className="hover:text-[#242124] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Moisturizers
            </button>
            <button
              onClick={() => handleLinkClick('collection', 'cleansers')}
              className="hover:text-[#242124] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Cleansers
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className={`hover:text-[#242124] transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentRoute === 'about' ? 'text-[#242124] font-semibold' : ''
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleLinkClick('faq')}
              className={`hover:text-[#242124] transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentRoute === 'faq' ? 'text-[#242124] font-semibold' : ''
              }`}
            >
              FAQ
            </button>
          </nav>

          {/* Zone 3: Actions (Currency selector, Search, Wishlist, Shopping Bag) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 text-xs font-semibold tracking-wider text-[#242124] py-1.5 px-2 hover:bg-[#EAE1D7]/50 rounded-sm transition-colors"
                aria-label="Select currency"
              >
                <span>{activeCurrency}</span>
                <ChevronDown className="w-3 h-3 text-[#242124]/60" />
              </button>
              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 mt-1 w-24 bg-white border border-[#242124]/10 shadow-lg py-1 z-50">
                  {currencies.map(curr => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs tracking-wider transition-colors ${
                        activeCurrency === curr
                          ? 'bg-[#F3DDE2]/60 font-semibold text-[#242124]'
                          : 'text-[#242124]/70 hover:bg-[#FFFDF8]'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search */}
            <button
              onClick={() => handleLinkClick('search')}
              className="p-2 text-[#242124]/80 hover:text-[#242124] transition-colors"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleLinkClick('wishlist')}
              className="relative p-2 text-[#242124]/80 hover:text-[#242124] transition-colors"
              aria-label="Saved items"
            >
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C6A56B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button (Primary Action) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#242124] text-white px-3.5 py-2 hover:bg-[#343034] transition-colors shadow-xs"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#C6A56B]" />
              <span className="text-xs font-semibold tracking-wider uppercase hidden sm:inline">Bag</span>
              <span className="text-xs font-bold tabular-nums">({cartCount})</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#242124] hover:text-[#C6A56B] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#242124]/10 bg-[#FFFDF8] px-6 py-6 space-y-4 shadow-lg">
          <div className="space-y-3 text-sm uppercase tracking-widest font-medium text-[#242124]">
            <button
              onClick={() => handleLinkClick('home')}
              className="block w-full text-left py-2 hover:text-[#C6A56B] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('shop')}
              className="block w-full text-left py-2 hover:text-[#C6A56B] transition-colors"
            >
              Shop All Skincare
            </button>
            <button
              onClick={() => handleLinkClick('collection', 'serums')}
              className="block w-full text-left py-2 text-[#242124]/80 hover:text-[#C6A56B] transition-colors pl-3 border-l-2 border-[#C6A56B]/30"
            >
              Radiance Serums
            </button>
            <button
              onClick={() => handleLinkClick('collection', 'moisturizers')}
              className="block w-full text-left py-2 text-[#242124]/80 hover:text-[#C6A56B] transition-colors pl-3 border-l-2 border-[#C6A56B]/30"
            >
              Restorative Creams
            </button>
            <button
              onClick={() => handleLinkClick('collection', 'cleansers')}
              className="block w-full text-left py-2 text-[#242124]/80 hover:text-[#C6A56B] transition-colors pl-3 border-l-2 border-[#C6A56B]/30"
            >
              Clarifying Cleansers
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className="block w-full text-left py-2 hover:text-[#C6A56B] transition-colors"
            >
              About Kathryn Lynne
            </button>
            <button
              onClick={() => handleLinkClick('faq')}
              className="block w-full text-left py-2 hover:text-[#C6A56B] transition-colors"
            >
              FAQ & Shipping
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className="block w-full text-left py-2 hover:text-[#C6A56B] transition-colors"
            >
              Contact Us
            </button>
          </div>

          <div className="pt-4 border-t border-[#242124]/10 flex items-center justify-between text-xs text-[#242124]/70">
            <span>Currency: <strong>{activeCurrency}</strong></span>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsConfigModalOpen(true);
              }}
              className="text-[#C6A56B] font-semibold underline"
            >
              Shopify Setup
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
