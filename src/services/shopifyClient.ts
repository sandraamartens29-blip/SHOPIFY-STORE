import { ShopifyProduct, ShopifyCollection, SupportedCurrency, CurrencyRate, CartLineItem } from '../types/shopify';
import { DEFAULT_PRODUCTS, DEFAULT_COLLECTIONS } from '../data/defaultCatalog';

export interface ShopifyConfig {
  shopDomain: string;
  storefrontToken: string;
  apiVersion: string;
}

const STORAGE_KEY_CONFIG = 'kathryn_lynne_shopify_config';

export function getStoredShopifyConfig(): ShopifyConfig {
  if (typeof window === 'undefined') {
    return {
      shopDomain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'kathryn-lynne.myshopify.com',
      storefrontToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '',
      apiVersion: import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-10',
    };
  }

  const stored = localStorage.getItem(STORAGE_KEY_CONFIG);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return {
        shopDomain: parsed.shopDomain || import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'kathryn-lynne.myshopify.com',
        storefrontToken: parsed.storefrontToken || import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '',
        apiVersion: parsed.apiVersion || import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-10',
      };
    } catch {
      // ignore
    }
  }

  return {
    shopDomain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'kathryn-lynne.myshopify.com',
    storefrontToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '',
    apiVersion: import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-10',
  };
}

export function saveShopifyConfig(config: ShopifyConfig) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  }
}

export const CURRENCY_RATES: Record<SupportedCurrency, CurrencyRate> = {
  NGN: {
    code: 'NGN',
    symbol: '₦',
    rateToUSD: 1450,
    format: (usd: number) => {
      const ngn = Math.round(usd * 1450);
      return `₦${ngn.toLocaleString('en-NG')}`;
    },
  },
  USD: {
    code: 'USD',
    symbol: '$',
    rateToUSD: 1,
    format: (usd: number) => `$${usd.toFixed(2)}`,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rateToUSD: 0.79,
    format: (usd: number) => `£${(usd * 0.79).toFixed(2)}`,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rateToUSD: 0.92,
    format: (usd: number) => `€${(usd * 0.92).toFixed(2)}`,
  },
};

export async function executeShopifyGraphQL<T = unknown>(
  query: string,
  variables: Record<string, unknown> = {},
  customConfig?: ShopifyConfig
): Promise<{ data?: T; errors?: Array<{ message: string }> }> {
  const config = customConfig || getStoredShopifyConfig();

  if (!config.shopDomain || !config.storefrontToken) {
    throw new Error('Shopify Storefront credentials are not configured.');
  }

  // Normalize shop domain
  let domain = config.shopDomain.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
  if (!domain.includes('.')) {
    domain = `${domain}.myshopify.com`;
  }

  const endpoint = `https://${domain}/api/${config.apiVersion}/graphql.json`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': config.storefrontToken.trim(),
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API responded with status ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export async function testShopifyConnection(config: ShopifyConfig): Promise<{ success: boolean; message: string; shopName?: string }> {
  const testQuery = `
    query {
      shop {
        name
        primaryDomain {
          url
        }
      }
    }
  `;

  try {
    const res = await executeShopifyGraphQL<{ shop: { name: string; primaryDomain: { url: string } } }>(
      testQuery,
      {},
      config
    );

    if (res.errors && res.errors.length > 0) {
      return { success: false, message: res.errors[0].message };
    }

    if (res.data?.shop?.name) {
      return {
        success: true,
        message: `Connected successfully to "${res.data.shop.name}"`,
        shopName: res.data.shop.name,
      };
    }

    return { success: false, message: 'Invalid response from Shopify Storefront API' };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown connection error';
    return { success: false, message: msg };
  }
}

export function buildShopifyCheckoutUrl(lines: CartLineItem[], shopDomain: string, discountCode?: string): string {
  let domain = shopDomain.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
  if (!domain.includes('.')) {
    domain = `${domain}.myshopify.com`;
  }

  if (lines.length === 0) {
    return `https://${domain}`;
  }

  // Extract numeric variant id or clean handle
  const permalinkParts = lines.map(line => {
    // Shopify GID format: gid://shopify/ProductVariant/12345
    const cleanId = line.variantId.replace('gid://shopify/ProductVariant/', '');
    return `${cleanId}:${line.quantity}`;
  });

  let url = `https://${domain}/cart/${permalinkParts.join(',')}`;
  if (discountCode) {
    url += `?discount=${encodeURIComponent(discountCode)}`;
  }
  return url;
}

export async function createShopifyApiCart(lines: CartLineItem[], config: ShopifyConfig): Promise<string | null> {
  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const inputLines = lines.map(line => ({
    merchandiseId: line.variantId.startsWith('gid://') ? line.variantId : `gid://shopify/ProductVariant/${line.variantId}`,
    quantity: line.quantity,
  }));

  try {
    const res = await executeShopifyGraphQL<{ cartCreate: { cart?: { checkoutUrl: string }; userErrors?: Array<{ message: string }> } }>(
      mutation,
      { input: { lines: inputLines } },
      config
    );

    if (res.data?.cartCreate?.cart?.checkoutUrl) {
      return res.data.cartCreate.cart.checkoutUrl;
    }
  } catch {
    // fallback to permalink
  }

  return null;
}
