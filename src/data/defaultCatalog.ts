import { ShopifyProduct, ShopifyCollection } from '../types/shopify';

import heroImg from '../assets/images/hero_editorial_model_1791897804556.jpg';
import serumImg from '../assets/images/product_radiance_serum_1791897804937.jpg';
import creamImg from '../assets/images/product_restorative_cream_1791897806024.jpg';
import cleanserImg from '../assets/images/product_botanical_cleanser_1791897807380.jpg';
import storyImg from '../assets/images/brand_story_artisan_1791897807910.jpg';

export const ASSET_IMAGES = {
  hero: heroImg,
  serum: serumImg,
  cream: creamImg,
  cleanser: cleanserImg,
  story: storyImg,
};

export const DEFAULT_COLLECTIONS: ShopifyCollection[] = [
  {
    id: 'gid://shopify/Collection/1',
    handle: 'serums',
    title: 'Radiance Serums',
    description: 'Concentrated active botanicals engineered for deep cellular hydration, post-sun recovery, and luminous glow.',
    image: { url: serumImg, altText: 'Kathryn Lynne Radiance Serums' },
    productsCount: 2,
  },
  {
    id: 'gid://shopify/Collection/2',
    handle: 'cleansers',
    title: 'Gentle Cleansers',
    description: 'pH-balanced purifying cleansers that dissolve impurities without stripping essential moisture.',
    image: { url: cleanserImg, altText: 'Kathryn Lynne Gentle Cleansers' },
    productsCount: 2,
  },
  {
    id: 'gid://shopify/Collection/3',
    handle: 'moisturizers',
    title: 'Restorative Moisturizers',
    description: 'Rich barrier-replenishing creams and balms designed for tropical and dry-season climates.',
    image: { url: creamImg, altText: 'Kathryn Lynne Restorative Moisturizers' },
    productsCount: 2,
  },
  {
    id: 'gid://shopify/Collection/4',
    handle: 'body-care',
    title: 'Nourishing Body Care',
    description: 'Silken cold-pressed oils and nutrient-dense formulations for supple, healthy body skin.',
    image: { url: storyImg, altText: 'Kathryn Lynne Nourishing Body Care' },
    productsCount: 1,
  },
];

export const DEFAULT_PRODUCTS: ShopifyProduct[] = [
  {
    id: 'gid://shopify/Product/101',
    handle: 'botanical-glow-radiance-serum',
    title: 'Botanical Glow Radiance Serum',
    description: 'A transformative golden elixir infused with cold-pressed marula, 10% stabilized vitamin C, and organic squalane. Specifically crafted to illuminate uneven tone, soothe sun-exposed skin, and restore youthful elasticity.',
    descriptionHtml: '<p>A transformative golden elixir infused with cold-pressed marula, 10% stabilized vitamin C, and organic squalane. Specifically crafted to illuminate uneven tone, soothe sun-exposed skin, and restore youthful elasticity.</p>',
    vendor: 'Kathryn Lynne',
    productType: 'Facial Serum',
    category: 'Serums',
    availableForSale: true,
    tags: ['Best Seller', 'Radiance', 'Vitamin C', 'Dry Skin', 'Uneven Tone'],
    rating: 4.9,
    reviewCount: 38,
    images: [
      { url: serumImg, altText: 'Kathryn Lynne Botanical Glow Radiance Serum 30ml amber bottle' },
      { url: storyImg, altText: 'Natural Marula and Botanical Formulation Ingredients' },
    ],
    priceRange: {
      minVariantPrice: { amount: '48.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '78.00', currencyCode: 'USD' },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '56.00', currencyCode: 'USD' },
    },
    variants: [
      {
        id: 'gid://shopify/ProductVariant/101-1',
        title: '30 ml / 1.0 fl oz',
        availableForSale: true,
        selectedOptions: [{ name: 'Size', value: '30 ml' }],
        price: { amount: '48.00', currencyCode: 'USD' },
        compareAtPrice: { amount: '56.00', currencyCode: 'USD' },
        sku: 'KL-SER-30',
      },
      {
        id: 'gid://shopify/ProductVariant/101-2',
        title: '50 ml / 1.7 fl oz (Standard)',
        availableForSale: true,
        selectedOptions: [{ name: 'Size', value: '50 ml' }],
        price: { amount: '78.00', currencyCode: 'USD' },
        compareAtPrice: { amount: '90.00', currencyCode: 'USD' },
        sku: 'KL-SER-50',
      },
    ],
    details: {
      size: '30ml / 50ml',
      skinType: ['Normal', 'Dry', 'Combination', 'Sensitive'],
      benefits: [
        'Boosts radiant luminosity and clarifies hyperpigmentation',
        'Deep lipid hydration without greasy residue',
        'High in antioxidants to shield against environmental pollutants',
        'Fast-absorbing velvet finish under makeup or SPF'
      ],
      ingredients: 'Cold-Pressed Sclerocarya Birrea (Marula) Seed Oil, Tetrahexyldecyl Ascorbate (Vitamin C), Simmondsia Chinensis (Jojoba) Oil, Plant-Derived Squalane, Tocopherol (Vitamin E), Rosa Damascena Flower Extract, Boswellia Carterii (Frankincense) Essential Oil.',
      howToUse: 'Warm 3 to 4 drops in the palms of clean hands. Gently press into cleansed face, neck, and decollete morning and evening. Follow with your Kathryn Lynne Restorative Cream.',
    },
  },
  {
    id: 'gid://shopify/Product/102',
    handle: 'restorative-nourishing-velvet-cream',
    title: 'Restorative Nourishing Velvet Cream',
    description: 'An indulgent, weightless cream formulated with multi-weight hyaluronic acid, unrefined West African shea butter, and ceramides. Locks in 24-hour hydration and strengthens the natural skin barrier.',
    vendor: 'Kathryn Lynne',
    productType: 'Moisturizer',
    category: 'Moisturizers',
    availableForSale: true,
    tags: ['Best Seller', 'Barrier Repair', 'Hydration', 'All Skin Types'],
    rating: 5.0,
    reviewCount: 42,
    images: [
      { url: creamImg, altText: 'Kathryn Lynne Restorative Nourishing Velvet Cream frosted glass jar' },
      { url: storyImg, altText: 'Pure Shea Butter and Botanical Balm Still Life' },
    ],
    priceRange: {
      minVariantPrice: { amount: '54.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '54.00', currencyCode: 'USD' },
    },
    compareAtPriceRange: null,
    variants: [
      {
        id: 'gid://shopify/ProductVariant/102-1',
        title: '50 ml / 1.7 fl oz',
        availableForSale: true,
        selectedOptions: [{ name: 'Size', value: '50 ml' }],
        price: { amount: '54.00', currencyCode: 'USD' },
        sku: 'KL-CRM-50',
      },
    ],
    details: {
      size: '50ml (1.7 fl oz)',
      skinType: ['Dry', 'Normal', 'Dehydrated', 'Compromised Barrier'],
      benefits: [
        'Replenishes lipid barrier depleted by seasonal dryness and heat',
        'Deep quenching with multi-molecular hyaluronic acid',
        'Silky cushion texture that melts instantly on contact',
        'Non-comedogenic and fragrance-sensitized friendly'
      ],
      ingredients: 'Water/Aqua, Butyrospermum Parkii (Shea) Butter, Caprylic/Capric Triglyceride, Glycerin, Sodium Hyaluronate, Ceramide NP, Niacinamide, Camellia Sinensis (Green Tea) Leaf Extract, Xanthan Gum, Phenoxyethanol, Ethylhexylglycerin.',
      howToUse: 'After applying serums, smooth a dime-sized amount over the face and neck using upward strokes. Use twice daily.',
    },
  },
  {
    id: 'gid://shopify/Product/103',
    handle: 'lumina-botanical-clarifying-cleanser',
    title: 'Lumina Botanical Clarifying Cleanser',
    description: 'A soothing gel-to-milk cleanser that delicately lifts sunscreen, pollution, and excess sebum without disturbing skin pH. Infused with willow bark, organic aloe, and rosemary leaf.',
    vendor: 'Kathryn Lynne',
    productType: 'Cleanser',
    category: 'Cleansers',
    availableForSale: true,
    tags: ['New Arrival', 'Gentle', 'pH-Balanced', 'Clarifying'],
    rating: 4.8,
    reviewCount: 29,
    images: [
      { url: cleanserImg, altText: 'Kathryn Lynne Lumina Botanical Clarifying Cleanser sleek pump bottle' },
    ],
    priceRange: {
      minVariantPrice: { amount: '36.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '36.00', currencyCode: 'USD' },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '42.00', currencyCode: 'USD' },
    },
    variants: [
      {
        id: 'gid://shopify/ProductVariant/103-1',
        title: '200 ml / 6.8 fl oz',
        availableForSale: true,
        selectedOptions: [{ name: 'Size', value: '200 ml' }],
        price: { amount: '36.00', currencyCode: 'USD' },
        compareAtPrice: { amount: '42.00', currencyCode: 'USD' },
        sku: 'KL-CLN-200',
      },
    ],
    details: {
      size: '200ml (6.8 fl oz)',
      skinType: ['All Skin Types', 'Oily', 'Combination', 'Blemish-Prone'],
      benefits: [
        'Gentle botanical exfoliation with natural salicin from willow bark',
        'Maintains acid mantle at healthy pH 5.5',
        'Rinses completely clean with no residue or tightness',
        'Calms redness and cools skin upon contact'
      ],
      ingredients: 'Aloe Barbadensis Leaf Juice, Aqua, Coco-Glucoside, Decyl Glucoside, Glycerin, Salix Nigra (Willow) Bark Extract, Rosmarinus Officinalis (Rosemary) Extract, Chamomilla Recutita (Matricaria) Flower Extract, Citric Acid, Potassium Sorbate.',
      howToUse: 'Dampen face with lukewarm water. Pump 1-2 times into wet hands and massage over face in circular motions for 60 seconds. Rinse thoroughly with water.',
    },
  },
  {
    id: 'gid://shopify/Product/104',
    handle: 'harmattan-radiance-barrier-balm',
    title: 'Harmattan Radiance Barrier Balm',
    description: 'An intensive rescue balm formulated for times of environmental stress, dry winds, and extreme travel. Powered by cold-pressed baobab oil, pure beeswax, and calendula.',
    vendor: 'Kathryn Lynne',
    productType: 'Treatment Balm',
    category: 'Treatments',
    availableForSale: true,
    tags: ['New Arrival', 'Intensive Care', 'Harmattan Rescue', 'Dry Climates'],
    rating: 4.9,
    reviewCount: 19,
    images: [
      { url: storyImg, altText: 'Kathryn Lynne Harmattan Radiance Barrier Balm with artisanal ingredients' },
      { url: creamImg, altText: 'Lid detail and rich balm consistency' },
    ],
    priceRange: {
      minVariantPrice: { amount: '42.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '42.00', currencyCode: 'USD' },
    },
    compareAtPriceRange: null,
    variants: [
      {
        id: 'gid://shopify/ProductVariant/104-1',
        title: '45 g / 1.5 oz',
        availableForSale: true,
        selectedOptions: [{ name: 'Size', value: '45 g' }],
        price: { amount: '42.00', currencyCode: 'USD' },
        sku: 'KL-BLM-45',
      },
    ],
    details: {
      size: '45g',
      skinType: ['Very Dry', 'Chapped', 'Sensitive', 'Weather-Exposed'],
      benefits: [
        'Creates a breathable protective seal against harsh Harmattan dust and wind',
        'Accelerates recovery of cracked lips, dry knuckles, and compromised cheekbones',
        'Rich in fatty acids Omega 3, 6, and 9',
        'Multi-use: face, cuticles, lips, dry patches'
      ],
      ingredients: 'Adansonia Digitata (Baobab) Seed Oil, Cera Alba (Beeswax), Calendula Officinalis Flower Extract, Helianthus Annuus (Sunflower) Seed Oil, Butyrospermum Parkii (Shea) Butter, Lavandula Angustifolia Oil.',
      howToUse: 'Warm a pea-sized amount between fingertips until melted. Press gently onto dry zones or apply as the final sealing step of evening skincare.',
    },
  },
  {
    id: 'gid://shopify/Product/105',
    handle: 'silken-radiance-nourishing-body-oil',
    title: 'Silken Radiance Nourishing Body Oil',
    description: 'A decadent satin body oil that drapes the skin in golden moisture and delicate botanical scent. Blended with sweet almond, cold-pressed jojoba, and hibiscus petal extract.',
    vendor: 'Kathryn Lynne',
    productType: 'Body Oil',
    category: 'Body Care',
    availableForSale: true,
    tags: ['Body Care', 'Luxury Hydration', 'Golden Glow'],
    rating: 5.0,
    reviewCount: 24,
    images: [
      { url: storyImg, altText: 'Silken Radiance Body Oil and Pure Botanical Extract' },
    ],
    priceRange: {
      minVariantPrice: { amount: '52.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '52.00', currencyCode: 'USD' },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '60.00', currencyCode: 'USD' },
    },
    variants: [
      {
        id: 'gid://shopify/ProductVariant/105-1',
        title: '150 ml / 5.1 fl oz',
        availableForSale: true,
        selectedOptions: [{ name: 'Size', value: '150 ml' }],
        price: { amount: '52.00', currencyCode: 'USD' },
        compareAtPrice: { amount: '60.00', currencyCode: 'USD' },
        sku: 'KL-OIL-150',
      },
    ],
    details: {
      size: '150ml (5.1 fl oz)',
      skinType: ['All Body Types', 'Dry Skin'],
      benefits: [
        'Leaves skin with an all-day luminous sheen and satin-soft finish',
        'Non-greasy, non-staining formulation',
        'Nourishes dry collarbones, legs, and arms after shower',
        'Delicate natural botanical scent from pure plant extracts'
      ],
      ingredients: 'Prunus Amygdalus Dulcis (Sweet Almond) Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Hibiscus Sabdariffa Flower Extract, Argania Spinosa Kernel Oil, Pelargonium Graveolens Flower Oil.',
      howToUse: 'Smooth generously over damp skin immediately following shower or bath to lock in moisture.',
    },
  },
];

export const AUTHENTIC_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Amina O.',
    location: 'Lagos, Nigeria',
    rating: 5,
    date: 'March 2026',
    verified: true,
    productTitle: 'Botanical Glow Radiance Serum',
    content: 'Living in Lagos with humidity and sun, many serums leave me feeling sticky or cause breakouts. Kathryn Lynne’s Botanical Glow serum completely absorbs in seconds and leaves the most radiant natural finish. My dark spots have visibly softened.',
  },
  {
    id: 'rev-2',
    author: 'Dr. Chioma N.',
    location: 'Abuja, Nigeria',
    rating: 5,
    date: 'February 2026',
    verified: true,
    productTitle: 'Restorative Nourishing Velvet Cream',
    content: 'The texture is pure luxury. It holds moisture through long air-conditioned hospital shifts without feeling heavy. You can immediately feel the grade of the unrefined shea and botanical ceramides.',
  },
  {
    id: 'rev-3',
    author: 'Elena R.',
    location: 'London, United Kingdom',
    rating: 5,
    date: 'January 2026',
    verified: true,
    productTitle: 'Harmattan Radiance Barrier Balm',
    content: 'I ordered this during the harsh UK winter after a friend in Abuja recommended it. It rescued my dry cheeks and lips within two nights. Packaging is gorgeous, shipping was seamless.',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'How do you formulate products for diverse climates and skin tones?',
    answer: 'Kathryn Lynne formulations are developed specifically with high-performance botanicals that perform exceptionally in humid, tropical, as well as dry and temperate climates. We focus on lightweight, bio-compatible lipid carriers like marula, squalane, and multi-molecular hydration that never clog pores or leave ashy residues on melanated skin.',
  },
  {
    question: 'Do you ship to Nigeria and internationally?',
    answer: 'Yes. We provide swift express shipping across Nigeria (including same-day/next-day in Lagos and Abuja via trusted local courier partners) and international courier delivery (DHL/FedEx Express) to the United Kingdom, United States, Canada, and Europe with real-time tracking.',
  },
  {
    question: 'How does payment and currency work at checkout?',
    answer: 'You can browse in Nigerian Naira (₦), US Dollars ($), British Pounds (£), or Euros (€). At checkout, payment is securely processed via our integrated Shopify checkout using cards, Apple Pay, Google Pay, or local options like Paystack and Flutterwave.',
  },
  {
    question: 'Are Kathryn Lynne formulations clean, vegan, and cruelty-free?',
    answer: 'Yes. Our products are formulated without parabens, synthetic sulfates, artificial dyes, phthalates, or harsh bleaching agents. We never test on animals.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We accept returns of unopened items in original packaging within 14 days of delivery. If you experience any sensitivity or concern, please reach out to our team at sandraamartens29@gmail.com.',
  },
];
