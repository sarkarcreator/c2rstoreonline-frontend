import React from 'react';
import Link from 'next/link';
import { contentApi as db } from '@/lib/api/content';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Layers, ArrowRight, Wrench, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software Categories — AI, E-Commerce, SEO, Marketing & Hosting',
  description:
    'Explore curated software categories on C2R Store Online. Find the best AI tools, SaaS platforms, and digital business solutions organized by niche.',
  alternates: {
    canonical: 'https://c2rstore.online/categories'
  }
};

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const [categories, toolsResult] = await Promise.all([
    db.getCategories(),
    db.getTools({ limit: 100 })
  ]);
  const allTools = toolsResult.tools;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Software Categories' }]} />

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Layers size={16} />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Software Taxonomies
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
          Explore Software by Category
        </h1>
        <p className="text-sm text-zinc-600 mt-2 max-w-2xl">
          Browse our structured directory of software tools categorized by industry, utility, and workflow requirements.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(cat => {
          const toolsInCat = allTools.filter(t => t.categoryId === cat.id);
          return (
            <div
              key={cat.id}
              className="bg-white border border-zinc-200/90 hover:border-emerald-300 rounded-3xl p-6 transition-all duration-200 hover:shadow-lg hover:shadow-zinc-900/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white font-black text-lg flex items-center justify-center">
                    {cat.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    {cat.totalToolsCount} Tools
                  </span>
                </div>

                <Link href={`/category/${cat.slug}`}>
                  <h2 className="text-lg font-bold text-zinc-950 hover:text-emerald-600 transition-colors mb-2">
                    {cat.name}
                  </h2>
                </Link>

                <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
                  {cat.description}
                </p>

                {/* Subcategories pills */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                    Sub-niches:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.subCategories.map((sub, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-lg font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Top tools preview */}
                {toolsInCat.length > 0 && (
                  <div className="pt-3 border-t border-zinc-100 mb-4">
                    <span className="text-[11px] font-semibold text-zinc-500 block mb-2">
                      Top tools:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {toolsInCat.slice(0, 3).map(t => (
                        <Link
                          key={t.id}
                          href={`/tools/${t.slug}`}
                          className="text-xs font-semibold text-zinc-800 hover:text-emerald-600 bg-zinc-50 px-2 py-1 rounded-md border border-zinc-200 transition-colors"
                        >
                          {t.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href={`/category/${cat.slug}`}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-sm"
              >
                <span>Browse {cat.name}</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
