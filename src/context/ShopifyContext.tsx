import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  ShopifyProduct,
  ShopifyCollection,
  CartLineItem,
  SupportedCurrency,
} from '../types/shopify';
import { DEFAULT_PRODUCTS, DEFAULT_COLLECTIONS } from '../data/defaultCatalog';
import {
  ShopifyConfig,
  getStoredShopifyConfig,
  saveShopifyConfig,
  CURRENCY_RATES,
  testShopifyConnection,
  buildShopifyCheckoutUrl,
  createShopifyApiCart,
  executeShopifyGraphQL,
} from '../services/shopifyClient';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  description?: string;
}

interface ShopifyContextType {
  products: ShopifyProduct[];
  collections: ShopifyCollection[];
  isLoadingProducts: boolean;
  activeCurrency: SupportedCurrency;
  setCurrency: (c: SupportedCurrency) => void;
  formatPrice: (usdAmount: number | string) => string;
  
  // Cart
  cartLines: CartLineItem[];
  cartCount: number;
  cartSubtotalUSD: number;
  discountCode: string;
  discountPercent: number;
  applyDiscountCode: (code: string) => boolean;
  removeDiscountCode: () => void;
  addToCart: (product: ShopifyProduct, variantId?: string, quantity?: number) => void;
  updateCartQuantity: (lineId: string, quantity: number) => void;
  removeFromCart: (lineId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  proceedToCheckout: () => Promise<void>;
  isCheckingOut: boolean;

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  wishlistProducts: ShopifyProduct[];

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchResults: ShopifyProduct[];

  // Shopify Connection Config
  shopifyConfig: ShopifyConfig;
  updateShopifyConfig: (config: ShopifyConfig) => Promise<{ success: boolean; message: string }>;
  isShopifyConnected: boolean;
  connectedShopName: string;
  isConfigModalOpen: boolean;
  setIsConfigModalOpen: (open: boolean) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ShopifyContext = createContext<ShopifyContextType | undefined>(undefined);

const STORAGE_KEY_CART = 'kathryn_lynne_cart';
const STORAGE_KEY_WISHLIST = 'kathryn_lynne_wishlist';
const STORAGE_KEY_CURRENCY = 'kathryn_lynne_currency';

export const ShopifyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ShopifyProduct[]>(DEFAULT_PRODUCTS);
  const [collections] = useState<ShopifyCollection[]>(DEFAULT_COLLECTIONS);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);
  
  const [shopifyConfig, setShopifyConfigState] = useState<ShopifyConfig>(getStoredShopifyConfig);
  const [isShopifyConnected, setIsShopifyConnected] = useState<boolean>(false);
  const [connectedShopName, setConnectedShopName] = useState<string>('');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);

  // Currency
  const [activeCurrency, setActiveCurrency] = useState<SupportedCurrency>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENCY) as SupportedCurrency;
      if (saved && CURRENCY_RATES[saved]) return saved;
    }
    // Default to NGN for Nigerian audience with easy 1-click international switcher
    return 'NGN';
  });

  // Cart
  const [cartLines, setCartLines] = useState<CartLineItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_CART);
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);

  // Wishlist
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_WISHLIST);
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  // Search
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync cart to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cartLines));
    }
  }, [cartLines]);

  // Sync wishlist to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(wishlistIds));
    }
  }, [wishlistIds]);

  // Sync currency
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_CURRENCY, activeCurrency);
    }
  }, [activeCurrency]);

  // Try checking connection on mount
  useEffect(() => {
    if (shopifyConfig.storefrontToken && shopifyConfig.shopDomain) {
      testShopifyConnection(shopifyConfig).then(result => {
        if (result.success) {
          setIsShopifyConnected(true);
          setConnectedShopName(result.shopName || shopifyConfig.shopDomain);
          fetchLiveShopifyProducts();
        } else {
          setIsShopifyConnected(false);
        }
      });
    }
  }, []);

  const fetchLiveShopifyProducts = async () => {
    setIsLoadingProducts(true);
    const query = `
      query getProducts {
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              description
              descriptionHtml
              vendor
              productType
              availableForSale
              tags
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                    width
                    height
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    sku
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const res = await executeShopifyGraphQL<{
        products: {
          edges: Array<{
            node: any;
          }>;
        };
      }>(query);

      if (res.data?.products?.edges && res.data.products.edges.length > 0) {
        const liveProds: ShopifyProduct[] = res.data.products.edges.map(edge => {
          const node = edge.node;
          return {
            id: node.id,
            title: node.title,
            handle: node.handle,
            description: node.description,
            descriptionHtml: node.descriptionHtml,
            vendor: node.vendor || 'Kathryn Lynne',
            productType: node.productType || 'Skincare',
            availableForSale: node.availableForSale,
            tags: node.tags || [],
            category: 'Serums', // mapped from productType or tags
            images: node.images.edges.map((imgEdge: any) => ({
              url: imgEdge.node.url,
              altText: imgEdge.node.altText || node.title,
              width: imgEdge.node.width,
              height: imgEdge.node.height,
            })),
            variants: node.variants.edges.map((varEdge: any) => ({
              id: varEdge.node.id,
              title: varEdge.node.title,
              availableForSale: varEdge.node.availableForSale,
              sku: varEdge.node.sku,
              price: varEdge.node.price,
              compareAtPrice: varEdge.node.compareAtPrice,
              selectedOptions: varEdge.node.selectedOptions || [],
            })),
            priceRange: node.priceRange,
          };
        });
        setProducts(liveProds);
      }
    } catch {
      // Fallback silently to curated catalog
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const updateShopifyConfig = async (newConfig: ShopifyConfig) => {
    saveShopifyConfig(newConfig);
    setShopifyConfigState(newConfig);

    const testRes = await testShopifyConnection(newConfig);
    if (testRes.success) {
      setIsShopifyConnected(true);
      setConnectedShopName(testRes.shopName || newConfig.shopDomain);
      fetchLiveShopifyProducts();
      addToast({
        type: 'success',
        title: 'Shopify Store Connected',
        description: `Successfully linked to ${testRes.shopName || newConfig.shopDomain}.`,
      });
      return { success: true, message: testRes.message };
    } else {
      setIsShopifyConnected(false);
      setConnectedShopName('');
      addToast({
        type: 'error',
        title: 'Connection Check',
        description: testRes.message,
      });
      return { success: false, message: testRes.message };
    }
  };

  const formatPrice = (usdAmount: number | string): string => {
    const num = typeof usdAmount === 'string' ? parseFloat(usdAmount) || 0 : usdAmount;
    const rateObj = CURRENCY_RATES[activeCurrency] || CURRENCY_RATES.USD;
    return rateObj.format(num);
  };

  // Cart operations
  const cartCount = useMemo(() => {
    return cartLines.reduce((acc, line) => acc + line.quantity, 0);
  }, [cartLines]);

  const cartSubtotalUSD = useMemo(() => {
    return cartLines.reduce((acc, line) => {
      const price = parseFloat(line.price.amount) || 0;
      return acc + price * line.quantity;
    }, 0);
  }, [cartLines]);

  const applyDiscountCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME10') {
      setDiscountCode('WELCOME10');
      setDiscountPercent(10);
      addToast({
        type: 'success',
        title: 'Discount Applied',
        description: '10% welcome savings applied to your bag.',
      });
      return true;
    } else if (clean === 'GLOW15') {
      setDiscountCode('GLOW15');
      setDiscountPercent(15);
      addToast({
        type: 'success',
        title: 'VIP Discount Applied',
        description: '15% radiance discount activated.',
      });
      return true;
    } else {
      addToast({
        type: 'error',
        title: 'Invalid Promo Code',
        description: 'Please check your code and try again.',
      });
      return false;
    }
  };

  const removeDiscountCode = () => {
    setDiscountCode('');
    setDiscountPercent(0);
  };

  const addToCart = (product: ShopifyProduct, variantId?: string, quantity: number = 1) => {
    const selectedVariant = variantId
      ? product.variants.find(v => v.id === variantId) || product.variants[0]
      : product.variants[0];

    if (!selectedVariant || !selectedVariant.availableForSale) {
      addToast({
        type: 'error',
        title: 'Item Unavailable',
        description: 'This variant is currently sold out.',
      });
      return;
    }

    setCartLines(prev => {
      const existingIndex = prev.findIndex(item => item.variantId === selectedVariant.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        const newLine: CartLineItem = {
          id: `line-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          productId: product.id,
          variantId: selectedVariant.id,
          productTitle: product.title,
          variantTitle: selectedVariant.title !== 'Default Title' ? selectedVariant.title : '',
          quantity,
          price: selectedVariant.price,
          image: product.images[0],
          handle: product.handle,
        };
        return [...prev, newLine];
      }
    });

    addToast({
      type: 'success',
      title: 'Added to Shopping Bag',
      description: `${quantity}× ${product.title}`,
    });

    // Auto open cart drawer
    setIsCartOpen(true);
  };

  const updateCartQuantity = (lineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(lineId);
      return;
    }
    setCartLines(prev =>
      prev.map(line => (line.id === lineId ? { ...line, quantity } : line))
    );
  };

  const removeFromCart = (lineId: string) => {
    const item = cartLines.find(l => l.id === lineId);
    setCartLines(prev => prev.filter(line => line.id !== lineId));
    if (item) {
      addToast({
        type: 'info',
        title: 'Removed from Bag',
        description: item.productTitle,
      });
    }
  };

  const clearCart = () => {
    setCartLines([]);
    setDiscountCode('');
    setDiscountPercent(0);
  };

  const proceedToCheckout = async () => {
    if (cartLines.length === 0) return;
    setIsCheckingOut(true);

    try {
      // 1. If live store credentials exist, try creating native Shopify Cart via Storefront API
      if (isShopifyConnected) {
        const liveCheckoutUrl = await createShopifyApiCart(cartLines, shopifyConfig);
        if (liveCheckoutUrl) {
          window.location.href = liveCheckoutUrl;
          return;
        }
      }

      // 2. Direct Shopify cart permalink redirection
      const redirectUrl = buildShopifyCheckoutUrl(cartLines, shopifyConfig.shopDomain, discountCode);
      addToast({
        type: 'info',
        title: 'Redirecting to Shopify Checkout',
        description: 'Securing your cart items and redirecting to official Shopify checkout...',
      });
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1000);
    } catch {
      const redirectUrl = buildShopifyCheckoutUrl(cartLines, shopifyConfig.shopDomain, discountCode);
      window.location.href = redirectUrl;
    } finally {
      setTimeout(() => setIsCheckingOut(false), 2000);
    }
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlistIds(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast({
          type: 'info',
          title: 'Removed from Wishlist',
        });
        return prev.filter(id => id !== productId);
      } else {
        addToast({
          type: 'success',
          title: 'Saved to Wishlist',
          description: 'Access your saved items anytime.',
        });
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlistIds.includes(productId);

  const wishlistProducts = useMemo(() => {
    return products.filter(p => wishlistIds.includes(p.id));
  }, [products, wishlistIds]);

  // Search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return products.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [products, searchQuery]);

  return (
    <ShopifyContext.Provider
      value={{
        products,
        collections,
        isLoadingProducts,
        activeCurrency,
        setCurrency: setActiveCurrency,
        formatPrice,
        cartLines,
        cartCount,
        cartSubtotalUSD,
        discountCode,
        discountPercent,
        applyDiscountCode,
        removeDiscountCode,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        proceedToCheckout,
        isCheckingOut,
        wishlistIds,
        toggleWishlist,
        isWishlisted,
        wishlistProducts,
        searchQuery,
        setSearchQuery,
        searchResults,
        shopifyConfig,
        updateShopifyConfig,
        isShopifyConnected,
        connectedShopName,
        isConfigModalOpen,
        setIsConfigModalOpen,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ShopifyContext.Provider>
  );
};

export const useShopify = (): ShopifyContextType => {
  const context = useContext(ShopifyContext);
  if (!context) {
    throw new Error('useShopify must be used within a ShopifyProvider');
  }
  return context;
};
