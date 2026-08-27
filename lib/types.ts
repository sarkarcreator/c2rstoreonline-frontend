export type PriceType = 'Free' | 'Freemium' | 'Paid' | 'Free Trial';

export interface ToolPricingTier {
  name: string;
  price: string;
  billingPeriod: string;
  features: string[];
  isPopular?: boolean;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  longReview: string;
  logo: string;
  categoryId: string;
  categoryName: string;
  subCategory: string;
  rating: number;
  reviewCount: number;
  priceType: PriceType;
  startingPrice: string;
  freePlanAvailable: boolean;
  freeTrialDays?: number;
  pricingTiers: ToolPricingTier[];
  officialUrl: string;
  affiliateUrl?: string;
  affiliateNetwork?: string;
  features: string[];
  pros: string[];
  cons: string[];
  bestFor: string[];
  alternatives: string[]; // tool slugs
  screenshots: string[];
  faqs: { question: string; answer: string }[];
  isFeatured: boolean;
  isTrending: boolean;
  isVerified: boolean;
  viewsCount: number;
  clicksCount: number;
  createdAt: string;
  updatedAt: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  subCategories: string[];
  featuredToolsCount: number;
  totalToolsCount: number;
  seoTitle?: string;
  seoDescription?: string;
  introContent?: string;
  faqs?: { question: string; answer: string }[];
}

export interface Comparison {
  id: string;
  slug: string;
  toolAId: string;
  toolASlug: string;
  toolAName?: string;
  toolA?: Tool;
  toolBId: string;
  toolBSlug: string;
  toolBName?: string;
  toolB?: Tool;
  title: string;
  summary: string;
  verdict: string;
  winnerSlug: string;
  scoreA: number; // e.g. 9.4
  scoreB: number; // e.g. 9.1
  categoriesCompared: {
    feature: string;
    scoreA: number;
    scoreB: number;
    descriptionA: string;
    descriptionB: string;
    winner: 'A' | 'B' | 'Tie';
  }[];
  priceComparison: string;
  bestForA: string;
  bestForB: string;
  prosA: string[];
  prosB: string[];
  consA: string[];
  consB: string[];
  faqs: { question: string; answer: string }[];
  updatedAt: string;
}

export interface Deal {
  id: string;
  toolId: string;
  toolName: string;
  toolSlug: string;
  toolLogo: string;
  title: string;
  discount: string; // e.g., "50% OFF", "30% Lifetime"
  couponCode?: string;
  expiresAt: string;
  affiliateUrl: string;
  terms: string;
  isVerified: boolean;
  isExclusive: boolean;
  category: string;
  upvotes: number;
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown/HTML structured content
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featuredImage: string;
  readTimeMinutes: number;
  publishedAt: string;
  updatedAt?: string;
  recommendedToolSlugs: string[];
  recommendedTools?: Tool[];
  faqs: { question: string; answer: string }[];
  tableOfContents: { id: string; title: string }[];
}

export interface FreeTool {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  inputs: {
    id: string;
    label: string;
    type: 'text' | 'textarea' | 'select';
    placeholder?: string;
    options?: string[];
    required?: boolean;
    defaultValue?: string;
    description?: string;
  }[];
  promptTemplate: string;
  systemPrompt: string;
  examples: {
    title: string;
    inputValues: Record<string, string>;
  }[];
  tips: string[];
  faqs: { question: string; answer: string }[];
}

export interface AffiliateNetwork {
  id: string;
  name: string;
  website: string;
  trackingParamTemplate: string;
  defaultUtmSource: string;
  status: 'Active' | 'Paused' | 'Pending';
  connectedToolsCount: number;
}

export interface AffiliateClickLog {
  id: string;
  toolSlug: string;
  toolName: string;
  targetUrl: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  ipHash: string;
  timestamp: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  source: string;
  subscribedAt: string;
  status: 'Active' | 'Unsubscribed' | string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  inquiryType: 'Listing' | 'Partnership' | 'Support' | 'General' | string;
  message: string;
  submittedAt: string;
}
