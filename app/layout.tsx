import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AffiliateDisclaimerBanner } from '@/components/layout/AffiliateDisclaimerBanner';
import { ComparisonProvider } from '@/lib/comparison-context';
import { ComparisonDock } from '@/components/ui/ComparisonDock';
import { SchemaJsonLd } from '@/components/ui/SchemaJsonLd';

export const metadata: Metadata = {
  metadataBase: new URL('https://c2rstore.online'),
  title: {
    default: 'C2R Store Online — Discover the Best AI Tools, SaaS, Deals & Software Comparisons',
    template: '%s | C2R Store Online'
  },
  description:
    'The premier software directory for AI tools, SaaS platforms, e-commerce software, verified discounts, and head-to-head comparisons. Find the best tools to scale your business.',
  keywords: [
    'AI Tools',
    'Best SaaS Software',
    'Software Comparisons',
    'E-commerce Tools',
    'SaaS Deals',
    'Software Coupons',
    'ChatGPT vs Claude',
    'Shopify vs WooCommerce',
    'Free AI Generators',
    'C2R Store Online'
  ],
  authors: [{ name: 'C2R Store Online Editorial Team', url: 'https://c2rstore.online' }],
  creator: 'C2R Store Online',
  publisher: 'C2R Store Online',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  alternates: {
    canonical: 'https://c2rstore.online'
  },
  openGraph: {
    title: 'C2R Store Online — AI Tools, SaaS Discovery & Software Deals',
    description:
      'Compare 20+ top-rated AI and SaaS platforms, claim exclusive discounts, and use free AI business generators.',
    url: 'https://c2rstore.online',
    siteName: 'C2R Store Online',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://picsum.photos/seed/c2r-og-2026/1200/630',
        width: 1200,
        height: 630,
        alt: 'C2R Store Online Software Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'C2R Store Online — Discover the Best AI Tools & Software Deals',
    description:
      'Discover top AI and SaaS software, compare platforms head-to-head, and claim verified deals.',
    images: ['https://picsum.photos/seed/c2r-og-2026/1200/630']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

const orgAndWebSiteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://c2rstore.online/#organization',
      name: 'C2R Store Online',
      url: 'https://c2rstore.online',
      logo: 'https://picsum.photos/seed/c2r-logo/512/512',
      sameAs: ['https://c2rstore.com'],
      description:
        'Authoritative discovery directory and comparison engine for AI software, SaaS tools, and e-commerce tech stacks.'
    },
    {
      '@type': 'WebSite',
      '@id': 'https://c2rstore.online/#website',
      url: 'https://c2rstore.online',
      name: 'C2R Store Online',
      publisher: {
        '@id': 'https://c2rstore.online/#organization'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://c2rstore.online/tools?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <SchemaJsonLd schema={orgAndWebSiteSchema} />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#1E293B] antialiased selection:bg-blue-600 selection:text-white font-sans" suppressHydrationWarning>
        <ComparisonProvider>
          <AffiliateDisclaimerBanner />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <ComparisonDock />
          <Footer />
        </ComparisonProvider>
      </body>
    </html>
  );
}
