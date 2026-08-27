import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { contentApi as db } from '@/lib/api/content';
import { ToolCard } from '@/components/ui/ToolCard';
import { DealCard } from '@/components/ui/DealCard';
import { ComparisonCard } from '@/components/ui/ComparisonCard';
import { GuideCard } from '@/components/ui/GuideCard';
import {
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  Tag,
  Scale,
  BookOpen,
  Wrench,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Layers
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [
    { tools: featuredTools },
    { tools: trendingTools },
    categories,
    allComparisons,
    allDeals,
    allGuides,
    freeTools
  ] = await Promise.all([
    db.getTools({ isFeatured: true, limit: 6 }),
    db.getTools({ isTrending: true, limit: 6 }),
    db.getCategories(),
    db.getComparisons(),
    db.getDeals(),
    db.getGuides(),
    db.getFreeTools()
  ]);

  const comparisons = allComparisons.slice(0, 3);
  const deals = allDeals.slice(0, 4);
  const guides = allGuides.slice(0, 3);

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-6">
            <Sparkles size={13} className="text-blue-600" />
            <span>2026 AI & SaaS Discovery Directory</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[48px] font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-3xl">
            Find the Best Tools to Build, Market & Grow Your Online Business
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl leading-relaxed">
            Unbiased reviews, live head-to-head software comparisons, verified discount coupons, and 100% free AI business generators.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm"
            >
              <Wrench size={16} />
              <span>Explore 20+ Software Tools</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/deals"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-sm"
            >
              <Tag size={16} />
              <span>Claim Verified Deals</span>
            </Link>

            <Link
              href="/free-tools"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-all"
            >
              <Sparkles size={16} className="text-blue-600" />
              <span>Free AI Tools Suite</span>
            </Link>
          </div>

          {/* Category Quick Tags */}
          <div className="mt-10 max-w-3xl">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.slice(0, 6).map(cat => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
                >
                  #{cat.name.replace(/\s+/g, '')}
                </Link>
              ))}
              <Link
                href="/categories"
                className="px-3 py-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                View all →
              </Link>
            </div>
          </div>

          {/* Trust Metrics Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-left">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm block leading-tight">100% Vetted</span>
                <span className="text-[11px] text-slate-500">Manual quality review</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Tag size={20} />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm block leading-tight">Up to 75% Off</span>
                <span className="text-[11px] text-slate-500">Active promo codes</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Sparkles size={20} />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm block leading-tight">5 Free AI Apps</span>
                <span className="text-[11px] text-slate-500">No login required</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Scale size={20} />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm block leading-tight">Head-to-Head</span>
                <span className="text-[11px] text-slate-500">Side-by-side matrices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BROWSE BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5 mb-1">
              <Layers size={14} />
              Software Taxonomy
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Explore by Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Find the perfect software for every stage of your business growth.
            </p>
          </div>
          <Link
            href="/categories"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 shrink-0"
          >
            <span>View All Categories</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group bg-white border border-slate-200/80 hover:border-blue-300 rounded-xl p-5 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-blue-50 text-slate-700 group-hover:text-blue-600 flex items-center justify-center font-bold text-base transition-colors">
                    {cat.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 group-hover:bg-blue-50 group-hover:text-blue-700 px-2 py-0.5 rounded-full transition-colors">
                    {cat.totalToolsCount} Tools
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-blue-600">
                <span>Browse {cat.name}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. TRENDING & FEATURED SOFTWARE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5 mb-1">
              <TrendingUp size={14} />
              Editor&apos;s Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Trending Software & AI Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Top performing software platforms ranked by user rating, utility, and features.
            </p>
          </div>
          <Link
            href="/tools"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 shrink-0"
          >
            <span>View All 20+ Tools</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* 4. VERIFIED DEALS & DISCOUNTS BANNER SECTION */}
      <section className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white py-12 px-6 sm:px-8 lg:px-10 rounded-2xl max-w-7xl mx-auto shadow-md">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200 flex items-center gap-1.5 mb-1">
              <Zap size={14} />
              Limited-Time Promotions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Verified SaaS Deals & Promo Codes
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
              Save hundreds of dollars on your business software stack with our tested discount links and coupon codes.
            </p>
          </div>
          <Link
            href="/deals"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold bg-white hover:bg-slate-100 text-blue-900 transition-all shrink-0 shadow-sm"
          >
            <span>View All Deals</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {deals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </section>

      {/* 5. HEAD-TO-HEAD COMPARISONS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5 mb-1">
              <Scale size={14} />
              Decision Matrices
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Head-to-Head Software Comparisons
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Can&apos;t decide between two tools? Read our detailed feature, speed, and pricing breakdowns.
            </p>
          </div>
          <Link
            href="/comparisons"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 shrink-0"
          >
            <span>All Comparisons</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparisons.map(comp => (
            <ComparisonCard key={comp.id} comparison={comp} />
          ))}
        </div>
      </section>

      {/* 6. FREE AI TOOLS SUITE SPOTLIGHT */}
      <section className="bg-white border border-slate-200 rounded-2xl max-w-7xl mx-auto p-8 sm:p-10 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5 mb-2">
              <Sparkles size={14} />
              100% Free • No Sign-up Required
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Free AI Business & Marketing Generators
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Supercharge your e-commerce store and content workflow with our Gemini-powered free utilities. Generate listings, ad hooks, SEO tags, and brand concepts in seconds.
            </p>
          </div>
          <Link
            href="/free-tools"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-sm shrink-0 self-start lg:self-center"
          >
            <span>Explore All 5 Free Generators</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {freeTools.slice(0, 3).map(tool => (
            <Link
              key={tool.id}
              href={`/free-tools/${tool.slug}`}
              className="bg-slate-50 border border-slate-200/90 hover:border-blue-300 rounded-xl p-5 transition-all hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-200 px-2.5 py-0.5 rounded-full">
                    {tool.category}
                  </span>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                    Free AI
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                  {tool.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>Launch Generator</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. EXPERT GUIDES & STRATEGIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5 mb-1">
              <BookOpen size={14} />
              In-Depth Insights
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Software Guides & Blueprints
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Learn how top online stores, marketers, and SaaS builders scale their operations.
            </p>
          </div>
          <Link
            href="/guides"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 shrink-0"
          >
            <span>All Guides</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map(guide => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </section>

      {/* 8. ECOSYSTEM & TRANSPARENCY NOTICE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/80 border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
              <ShieldCheck size={24} className="text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Connected to the C2R Store Ecosystem
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                C2R Store Online (c2rstore.online) works in synergy with our flagship store (c2rstore.com) to provide both physical product excellence and high-leverage software discovery.
              </p>
            </div>
          </div>

          <a
            href="https://c2rstore.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shrink-0"
          >
            <span>Visit Flagship: c2rstore.com</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </section>
    </div>
  );
}
