import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { contentApi as db } from '@/lib/api/content';
import { ToolCard } from '@/components/ui/ToolCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ComparisonCard } from '@/components/ui/ComparisonCard';
import { Layers, ArrowRight, Sparkles, Scale, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await db.getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `Best ${category.name} Tools in 2026: Compare & Reviews`,
    description: `Discover and compare top ${category.name} software. Read unbiased reviews, explore pricing tiers, and find the right platform for your needs.`,
    alternates: {
      canonical: `https://c2rstore.online/category/${category.slug}`
    }
  };
}

export default async function CategoryDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await db.getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const [{ tools }, allComparisons] = await Promise.all([
    db.getTools({ categorySlug: slug }),
    db.getComparisons()
  ]);
  const categoryToolSlugs = tools.map(t => t.slug);
  const relatedComparisons = allComparisons.filter(
    c => categoryToolSlugs.includes(c.toolASlug) || categoryToolSlugs.includes(c.toolBSlug)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Software Categories', url: '/categories' },
          { name: category.name }
        ]}
      />

      {/* Category Hero Banner */}
      <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <Layers size={13} className="text-emerald-600" />
              <span>Software Category</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
              Best {category.name} Software (2026)
            </h1>
            <p className="text-sm text-zinc-600 leading-relaxed">
              {category.description}
            </p>
          </div>

          <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-4 text-center shrink-0 min-w-[140px]">
            <span className="text-xs text-zinc-500 block font-medium">Vetted Platforms</span>
            <span className="text-2xl font-black text-zinc-950">{tools.length}</span>
            <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">Verified 2026</span>
          </div>
        </div>

        {/* Subcategories tags */}
        <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Sub-niches:
          </span>
          {category.subCategories.map((sub, i) => (
            <span
              key={i}
              className="text-xs bg-zinc-100 text-zinc-700 font-medium px-3 py-1 rounded-lg"
            >
              {sub}
            </span>
          ))}
        </div>
      </div>

      {/* Tools in this category */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-zinc-950 tracking-tight">
            Top Rated {category.name} Tools
          </h2>
          <span className="text-xs text-zinc-500 font-medium">
            Showing {tools.length} tools
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      {/* Related Comparisons */}
      {relatedComparisons.length > 0 && (
        <div className="pt-6 border-t border-zinc-200 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-950 tracking-tight flex items-center gap-2">
              <Scale size={20} className="text-blue-600" />
              <span>{category.name} Head-to-Head Comparisons</span>
            </h2>
            <Link
              href="/comparisons"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedComparisons.map(comp => (
              <ComparisonCard key={comp.id} comparison={comp} />
            ))}
          </div>
        </div>
      )}

      {/* Category Buyer's Guide & Recommendation */}
      <div className="bg-zinc-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Sparkles size={18} className="text-emerald-400" />
          <span>How to Choose the Right {category.name} Tool</span>
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          When selecting a {category.name.toLowerCase()} platform in 2026, evaluate ease of integration with your existing workflow, starting tier limits, API support, and community ecosystem. If you are starting fresh, prefer platforms offering free tiers or money-back guarantees to test features firsthand.
        </p>
      </div>
    </div>
  );
}
