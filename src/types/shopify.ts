export interface ShopifyImage {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: 'NGN' | 'USD' | 'GBP' | 'EUR';
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: ShopifyMoney;
  compareAtPrice?: ShopifyMoney | null;
  sku?: string;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  vendor: string;
  productType: string;
  availableForSale: boolean;
  tags: string[];
  category: 'Serums' | 'Cleansers' | 'Moisturizers' | 'Body Care' | 'Treatments';
  images: ShopifyImage[];
  variants: ShopifyProductVariant[];
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange?: {
    minVariantPrice: ShopifyMoney;
  } | null;
  // Editorial additions for luxury skincare
  details?: {
    benefits: string[];
    skinType: string[];
    ingredients: string;
    howToUse: string;
    size: string;
  };
  rating?: number;
  reviewCount?: number;
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: ShopifyImage;
  productsCount?: number;
}

export interface CartLineItem {
  id: string; // unique line ID
  variantId: string;
  productId: string;
  productTitle: string;
  variantTitle: string;
  quantity: number;
  price: ShopifyMoney;
  image?: ShopifyImage;
  handle: string;
}

export interface ShopifyCart {
  id?: string;
  checkoutUrl?: string;
  lines: CartLineItem[];
  subtotal: number;
  discountCode?: string;
  discountAmount?: number;
  total: number;
}

export type SupportedCurrency = 'NGN' | 'USD' | 'GBP' | 'EUR';

export interface CurrencyRate {
  code: SupportedCurrency;
  symbol: string;
  rateToUSD: number; // base reference
  format: (amountInUSD: number) => string;
}
