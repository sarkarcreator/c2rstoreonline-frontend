import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { contentApi as db } from '@/lib/api/content';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RatingStars } from '@/components/ui/RatingStars';
import { SchemaJsonLd } from '@/components/ui/SchemaJsonLd';
import { ComparisonCard } from '@/components/ui/ComparisonCard';
import {
  ExternalLink,
  Check,
  X as XIcon,
  ShieldCheck,
  Sparkles,
  Tag,
  ArrowRight,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = await db.getToolBySlug(slug);

  if (!tool) {
    return { title: 'Tool Not Found' };
  }

  return {
    title: `${tool.name} Review (2026): Pricing, Features, Pros & Cons`,
    description: `Read our comprehensive 2026 review of ${tool.name}. Explore features, starting price (${tool.startingPrice}), verified pros & cons, and top alternatives.`,
    alternates: {
      canonical: `https://c2rstore.online/tools/${tool.slug}`
    },
    openGraph: {
      title: `${tool.name} Review & Pricing (2026) | C2R Store Online`,
      description: tool.tagline,
      url: `https://c2rstore.online/tools/${tool.slug}`,
      images: [{ url: tool.logo, alt: tool.name }]
    }
  };
}

export default async function ToolDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = await db.getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  // Related alternatives
  const altPromises = tool.alternatives.map(altSlug => db.getToolBySlug(altSlug));
  const alternativesRaw = await Promise.all(altPromises);
  const alternatives = alternativesRaw.filter(Boolean);

  // Related comparisons and deals
  const [allComparisons, allDeals] = await Promise.all([
    db.getComparisons(),
    db.getDeals()
  ]);

  const relatedComparisons = allComparisons.filter(
    c => c.toolASlug === tool.slug || c.toolBSlug === tool.slug
  );

  const activeDeals = allDeals.filter(d => d.toolSlug === tool.slug);

  // Schema.org SoftwareApplication
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    operatingSystem: 'Web-based, SaaS',
    applicationCategory: tool.categoryName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      ratingCount: tool.reviewCount,
      bestRating: '5',
      worstRating: '1'
    },
    offers: {
      '@type': 'Offer',
      price: tool.startingPrice.replace(/[^0-9.]/g, '') || '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    description: tool.description,
    image: tool.logo
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SchemaJsonLd schema={softwareSchema} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Software Tools', url: '/tools' },
          { name: tool.categoryName, url: `/category/${tool.categoryId || 'ai-writing'}` },
          { name: tool.name }
        ]}
      />

      {/* Hero Card */}
      <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5 flex-1">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/90 relative shrink-0 shadow-sm">
              <Image
                src={tool.logo}
                alt={tool.name}
                width={96}
                height={96}
                className="object-cover w-full h-full"
                referrerPolicy="no-referrer"
                priority
              />
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                  {tool.name}
                </h1>
                {tool.isVerified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <Check size={12} className="stroke-[3]" />
                    Verified Partner
                  </span>
                )}
                {tool.isTrending && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                    <Sparkles size={12} />
                    Trending in 2026
                  </span>
                )}
              </div>

              <p className="text-sm sm:text-base text-zinc-600 font-medium">
                {tool.tagline}
              </p>

              <div className="flex items-center gap-4 text-xs text-zinc-500 flex-wrap pt-1">
                <RatingStars rating={tool.rating} reviewCount={tool.reviewCount} size={18} />
                <span>•</span>
                <span className="font-semibold text-zinc-800">{tool.categoryName}</span>
                <span>•</span>
                <span className="bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded font-medium">
                  {tool.subCategory}
                </span>
                <span>•</span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                  {tool.priceType} • Starting at {tool.startingPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Primary CTA box */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-100">
            <Link
              href={`/go/${tool.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition-all text-center"
            >
              <span>Visit Official Website</span>
              <ExternalLink size={16} />
            </Link>

            {activeDeals.length > 0 && (
              <Link
                href="/deals"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/90 font-semibold text-xs transition-colors text-center"
              >
                <Tag size={14} className="text-amber-700" />
                <span>Active Coupon Available</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Deep Review */}
        <div className="lg:col-span-2 space-y-8">
          {/* Detailed Overview */}
          <section className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-zinc-950 tracking-tight flex items-center gap-2">
              <span>About {tool.name}</span>
            </h2>
            <p className="text-sm text-zinc-700 leading-relaxed">
              {tool.description}
            </p>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 mt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Ideal For & Best Use Cases
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {tool.bestFor && tool.bestFor.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-xs"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Pros & Cons */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pros */}
            <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-3xl p-6">
              <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                  <Check size={14} />
                </div>
                <span>What We Liked (Pros)</span>
              </h3>
              <ul className="space-y-2.5">
                {tool.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-800">
                    <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="bg-rose-50/50 border border-rose-200/80 rounded-3xl p-6">
              <h3 className="text-base font-bold text-rose-950 flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">
                  <XIcon size={14} />
                </div>
                <span>Things to Consider (Cons)</span>
              </h3>
              <ul className="space-y-2.5">
                {tool.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-800">
                    <XIcon size={14} className="text-rose-600 shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Core Feature Matrix */}
          <section className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-zinc-950 tracking-tight">
              Key Features & Capabilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {tool.features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-zinc-50 border border-zinc-200/70 rounded-xl text-xs font-semibold text-zinc-900"
                >
                  <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check size={12} className="stroke-[3]" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Details */}
          <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-950 tracking-tight">
                Pricing & Plan Overview
              </h2>
              <span className="text-xs font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">
                {tool.priceType} Model
              </span>
            </div>

            <p className="text-xs text-slate-600">
              {tool.freePlanAvailable
                ? `${tool.name} offers a free tier or trial period so you can test features before committing to a paid tier.`
                : `${tool.name} requires a paid subscription starting at ${tool.startingPrice}.`}
            </p>

            {tool.pricingTiers && tool.pricingTiers.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {tool.pricingTiers.map((tier, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border ${
                      tier.isPopular
                        ? 'bg-blue-50/50 border-blue-300 ring-1 ring-blue-100'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 text-sm">{tier.name}</span>
                      {tier.isPopular && (
                        <span className="text-[10px] uppercase font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="text-lg font-extrabold text-slate-900 mb-2">
                      {tier.price} <span className="text-xs font-normal text-slate-500">{tier.billingPeriod}</span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {tier.features.slice(0, 3).map((f, fi) => (
                        <li key={fi} className="flex items-center gap-1.5">
                          <Check size={12} className="text-blue-600 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex items-center justify-between mt-4">
              <div>
                <span className="text-xs text-slate-500 block">Starting Entry Tier</span>
                <span className="text-lg font-extrabold text-slate-950">{tool.startingPrice}</span>
              </div>
              <Link
                href={`/go/${tool.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                <span>Check Live Pricing</span>
                <ExternalLink size={13} />
              </Link>
            </div>
          </section>

          {/* FAQs */}
          <section className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-zinc-950 tracking-tight flex items-center gap-2">
              <HelpCircle size={20} className="text-emerald-600" />
              <span>Frequently Asked Questions</span>
            </h2>

            <div className="space-y-4 pt-2">
              <div className="border-b border-zinc-100 pb-3.5">
                <h3 className="font-bold text-zinc-900 text-sm mb-1">
                  Is {tool.name} free to try?
                </h3>
                <p className="text-xs text-zinc-600">
                  {tool.priceType === 'Free'
                    ? `Yes, ${tool.name} is completely free to use.`
                    : tool.priceType === 'Freemium'
                    ? `Yes, ${tool.name} offers a free tier or trial period so you can test features before upgrading.`
                    : `Most plans start at ${tool.startingPrice}, and standard money-back guarantees or trials are available upon signup.`}
                </p>
              </div>

              <div className="border-b border-zinc-100 pb-3.5">
                <h3 className="font-bold text-zinc-900 text-sm mb-1">
                  Who should use {tool.name}?
                </h3>
                <p className="text-xs text-zinc-600">
                  {tool.name} is ideally suited for {tool.bestFor && tool.bestFor.length > 0 ? tool.bestFor.join(', ') : 'digital entrepreneurs, content creators, and growth-focused businesses'}.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-zinc-900 text-sm mb-1">
                  How does {tool.name} compare to other {tool.categoryName} tools?
                </h3>
                <p className="text-xs text-zinc-600">
                  {tool.name} stands out for its {tool.pros[0]?.toLowerCase() || 'exceptional ease of use'}, holding an overall score of {tool.rating} / 5 based on {tool.reviewCount.toLocaleString()} reviews.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar: Rating Radar, Alternatives & Direct Action */}
        <div className="space-y-6">
          {/* Rating Breakdown Card */}
          <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-zinc-950 text-base">
              Score Breakdown
            </h3>

            <div className="space-y-3">
              {[
                { label: 'Ease of Use', score: 9.4 },
                { label: 'Features & Capabilities', score: 9.2 },
                { label: 'Value for Money', score: 9.0 },
                { label: 'Support & Reliability', score: 9.5 }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-zinc-600">{item.label}</span>
                    <span className="text-zinc-900">{item.score} / 10</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${item.score * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-100 text-center">
              <span className="text-xs text-zinc-500 block">Overall Benchmark Rating</span>
              <span className="text-3xl font-black text-emerald-600">
                {tool.rating.toFixed(1)} <span className="text-sm text-zinc-400 font-normal">/ 5.0</span>
              </span>
            </div>
          </div>

          {/* Alternatives Card */}
          {alternatives.length > 0 && (
            <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 space-y-4 shadow-sm">
              <h3 className="font-bold text-zinc-950 text-base">
                Top {tool.name} Alternatives
              </h3>
              <div className="space-y-3">
                {alternatives.map((alt: any) => (
                  <Link
                    key={alt.id}
                    href={`/tools/${alt.slug}`}
                    className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/70 transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-white border border-zinc-200 relative shrink-0">
                        <Image
                          src={alt.logo}
                          alt={alt.name}
                          width={32}
                          height={32}
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="truncate">
                        <span className="font-bold text-zinc-900 text-xs group-hover:text-emerald-600 transition-colors block truncate">
                          {alt.name}
                        </span>
                        <span className="text-[11px] text-zinc-500">
                          {alt.priceType} • {alt.startingPrice}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 shrink-0">
                      ★ {alt.rating}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quick Outbound Box */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-3xl p-6 space-y-4 shadow-lg">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={16} />
              <span>Official Partner Link</span>
            </div>
            <h4 className="font-extrabold text-white text-base">
              Ready to get started with {tool.name}?
            </h4>
            <p className="text-xs text-zinc-300">
              Sign up through our verified link to ensure you lock in any active promotional discounts or trial benefits.
            </p>
            <Link
              href={`/go/${tool.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20"
            >
              <span>Visit Official Site</span>
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Comparisons Section if available */}
      {relatedComparisons.length > 0 && (
        <section className="pt-8 border-t border-zinc-200">
          <h2 className="text-xl font-bold text-zinc-950 tracking-tight mb-6">
            Head-to-Head Comparisons Featuring {tool.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedComparisons.map(comp => (
              <ComparisonCard key={comp.id} comparison={comp} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
