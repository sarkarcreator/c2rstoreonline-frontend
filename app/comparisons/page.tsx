import React from 'react';
import { contentApi as db } from '@/lib/api/content';
import { ComparisonCard } from '@/components/ui/ComparisonCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Scale, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software Comparisons (2026): Head-to-Head Benchmarks',
  description:
    'Detailed side-by-side software comparisons. Compare ChatGPT vs Claude, Shopify vs WooCommerce, Jasper vs Copy.ai, Midjourney vs FLUX, and Hostinger vs Bluehost.',
  alternates: {
    canonical: 'https://c2rstore.online/comparisons'
  }
};

export const dynamic = 'force-dynamic';

export default async function ComparisonsIndexPage() {
  const comparisons = await db.getComparisons();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Software Comparisons' }]} />

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
            <Scale size={16} />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Head-to-Head Decision Lab
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
          Software & AI Head-to-Head Comparisons
        </h1>
        <p className="text-sm text-zinc-600 mt-2 max-w-2xl">
          Detailed side-by-side feature teardowns, performance tests, and pricing evaluations to help you pick the best tool for your stack.
        </p>
      </div>

      {/* Comparisons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comparisons.map(comp => (
          <ComparisonCard key={comp.id} comparison={comp} />
        ))}
      </div>
    </div>
  );
}
