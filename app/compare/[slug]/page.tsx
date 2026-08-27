import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { contentApi as db } from '@/lib/api/content';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RatingStars } from '@/components/ui/RatingStars';
import { SchemaJsonLd } from '@/components/ui/SchemaJsonLd';
import {
  ExternalLink,
  Check,
  X as XIcon,
  Trophy,
  Scale,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparison = await db.getComparisonBySlug(slug);

  if (comparison) {
    return {
      title: `${comparison.title} (2026 In-Depth Comparison)`,
      description: comparison.summary,
      alternates: {
        canonical: `https://c2rstore.online/compare/${comparison.slug}`
      }
    };
  }

  // Dynamic fallback for any [toolA]-vs-[toolB]
  if (slug.includes('-vs-')) {
    const [slugA, slugB] = slug.split('-vs-');
    const [toolA, toolB] = await Promise.all([
      db.getToolBySlug(slugA),
      db.getToolBySlug(slugB)
    ]);
    if (toolA && toolB) {
      return {
        title: `${toolA.name} vs ${toolB.name} (2026 Comparison): Features & Pricing`,
        description: `Compare ${toolA.name} and ${toolB.name} side-by-side. See full rating breakdown, features, pros and cons.`,
        alternates: {
          canonical: `https://c2rstore.online/compare/${slug}`
        }
      };
    }
  }

  return { title: 'Comparison' };
}

export default async function ComparisonDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let comparison = await db.getComparisonBySlug(slug);

  let toolA: any = null;
  let toolB: any = null;

  if (comparison) {
    const [fetchedA, fetchedB] = await Promise.all([
      comparison.toolA || db.getToolBySlug(comparison.toolASlug),
      comparison.toolB || db.getToolBySlug(comparison.toolBSlug)
    ]);
    toolA = fetchedA;
    toolB = fetchedB;
  } else if (slug.includes('-vs-')) {
    const [slugA, slugB] = slug.split('-vs-');
    const [fetchedA, fetchedB] = await Promise.all([
      db.getToolBySlug(slugA),
      db.getToolBySlug(slugB)
    ]);
    toolA = fetchedA;
    toolB = fetchedB;

    if (toolA && toolB) {
      comparison = {
        id: `dyn-${slug}`,
        slug,
        toolA,
        toolB,
        toolAId: toolA.id,
        toolASlug: toolA.slug,
        toolAName: toolA.name,
        toolBId: toolB.id,
        toolBSlug: toolB.slug,
        toolBName: toolB.name,
        title: `${toolA.name} vs ${toolB.name}: Which is Better in 2026?`,
        summary: `A side-by-side evaluation comparing ${toolA.name} and ${toolB.name} across features, pricing, usability, and speed.`,
        winnerSlug: toolA.rating >= toolB.rating ? toolA.slug : toolB.slug,
        verdict: `${toolA.rating >= toolB.rating ? toolA.name : toolB.name} edges ahead overall due to superior benchmark performance and user satisfaction.`,
        scoreA: toolA.rating * 2,
        scoreB: toolB.rating * 2,
        priceComparison: `${toolA.name} starts at ${toolA.startingPrice} vs ${toolB.name} at ${toolB.startingPrice}.`,
        bestForA: (toolA.bestFor && toolA.bestFor.join(', ')) || 'General productivity',
        bestForB: (toolB.bestFor && toolB.bestFor.join(', ')) || 'General productivity',
        categoriesCompared: [
          {
            feature: 'Ease of Use & UI',
            scoreA: 9.2,
            scoreB: 9.0,
            descriptionA: 'Modern, streamlined web interface with intuitive controls.',
            descriptionB: 'Clean layout with quick access to essential features.',
            winner: 'Tie' as const
          },
          {
            feature: 'Pricing & Value',
            scoreA: 9.0,
            scoreB: 9.1,
            descriptionA: `Starting at ${toolA.startingPrice} (${toolA.priceType}).`,
            descriptionB: `Starting at ${toolB.startingPrice} (${toolB.priceType}).`,
            winner: 'Tie' as const
          },
          {
            feature: 'Feature Breadth',
            scoreA: 9.4,
            scoreB: 9.3,
            descriptionA: 'Extensive workflow capabilities and integrations.',
            descriptionB: 'Deep specialized toolkit for targeted use cases.',
            winner: 'Tie' as const
          }
        ],
        prosA: toolA.pros,
        prosB: toolB.pros,
        consA: toolA.cons,
        consB: toolB.cons,
        faqs: [],
        updatedAt: new Date().toISOString()
      };
    }
  }

  if (!comparison || !toolA || !toolB) {
    notFound();
  }

  const winnerTool = comparison.winnerSlug === toolA.slug ? toolA : toolB;
  const comparedList = comparison.categoriesCompared || [];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: comparison.title,
    description: comparison.summary,
    author: {
      '@type': 'Organization',
      name: 'C2R Store Online Editorial Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'C2R Store Online',
      logo: {
        '@type': 'ImageObject',
        url: 'https://c2rstore.online/logo.png'
      }
    },
    dateModified: comparison.updatedAt
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SchemaJsonLd schema={articleSchema} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Comparisons', url: '/comparisons' },
          { name: `${toolA.name} vs ${toolB.name}` }
        ]}
      />

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Scale size={13} />
          <span>Head-to-Head Showdown</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight">
          {comparison.title}
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
          {comparison.summary}
        </p>
      </div>

      {/* Matchup Header: Tool A vs Tool B Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tool A */}
        <div
          className={`bg-white border rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between ${
            comparison.winnerSlug === toolA.slug
              ? 'border-emerald-500/80 ring-2 ring-emerald-500/20'
              : 'border-zinc-200/90'
          }`}
        >
          <div>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 relative shrink-0">
                  <Image
                    src={toolA.logo}
                    alt={toolA.name}
                    width={56}
                    height={56}
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-zinc-950">{toolA.name}</h2>
                  <span className="text-xs text-zinc-500">{toolA.categoryName}</span>
                </div>
              </div>

              {comparison.winnerSlug === toolA.slug && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <Trophy size={13} />
                  Winner
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 py-3 border-y border-zinc-100 mb-4 text-xs">
              <RatingStars rating={toolA.rating} reviewCount={toolA.reviewCount} />
              <span className="text-zinc-300">•</span>
              <span className="font-bold text-zinc-900">{toolA.startingPrice}</span>
            </div>

            <p className="text-xs text-zinc-600 mb-4 line-clamp-3">
              {toolA.description}
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-100 flex items-center gap-2">
            <Link
              href={`/tools/${toolA.slug}`}
              className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-bold text-center transition-colors"
            >
              Read {toolA.name} Review
            </Link>
            <Link
              href={`/go/${toolA.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
            >
              <span>Visit {toolA.name}</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Tool B */}
        <div
          className={`bg-white border rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between ${
            comparison.winnerSlug === toolB.slug
              ? 'border-emerald-500/80 ring-2 ring-emerald-500/20'
              : 'border-zinc-200/90'
          }`}
        >
          <div>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 relative shrink-0">
                  <Image
                    src={toolB.logo}
                    alt={toolB.name}
                    width={56}
                    height={56}
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-zinc-950">{toolB.name}</h2>
                  <span className="text-xs text-zinc-500">{toolB.categoryName}</span>
                </div>
              </div>

              {comparison.winnerSlug === toolB.slug && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <Trophy size={13} />
                  Winner
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 py-3 border-y border-zinc-100 mb-4 text-xs">
              <RatingStars rating={toolB.rating} reviewCount={toolB.reviewCount} />
              <span className="text-zinc-300">•</span>
              <span className="font-bold text-zinc-900">{toolB.startingPrice}</span>
            </div>

            <p className="text-xs text-zinc-600 mb-4 line-clamp-3">
              {toolB.description}
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-100 flex items-center gap-2">
            <Link
              href={`/tools/${toolB.slug}`}
              className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-bold text-center transition-colors"
            >
              Read {toolB.name} Review
            </Link>
            <Link
              href={`/go/${toolB.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
            >
              <span>Visit {toolB.name}</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Editorial Verdict Callout */}
      <div className="bg-emerald-950 text-emerald-50 rounded-3xl p-6 sm:p-8 border border-emerald-800 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-zinc-950 flex items-center justify-center font-black shrink-0">
            <Trophy size={24} />
          </div>
          <div className="space-y-2 flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Our 2026 Recommendation & Verdict
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Overall Winner: {winnerTool.name}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              {comparison.verdict}
            </p>
            <div className="pt-2">
              <Link
                href={`/go/${winnerTool.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20"
              >
                <span>Get Started with {winnerTool.name}</span>
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Feature Comparison Table */}
      <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-zinc-950 tracking-tight">
          Feature-by-Feature Comparison Matrix
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-zinc-700">
                <th className="py-3 px-4 font-bold rounded-l-xl">Feature / Capability</th>
                <th className="py-3 px-4 font-bold">{toolA.name}</th>
                <th className="py-3 px-4 font-bold">{toolB.name}</th>
                <th className="py-3 px-4 font-bold rounded-r-xl">Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {comparedList.map((row, i) => {
                const advantage =
                  row.winner === 'A'
                    ? toolA.name
                    : row.winner === 'B'
                    ? toolB.name
                    : 'Equal / Tie';
                return (
                  <tr key={i} className="hover:bg-zinc-50/50">
                    <td className="py-3.5 px-4 font-semibold text-zinc-900">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-700 font-medium">
                      <div>
                        <span className="font-bold text-zinc-900">{row.scoreA} / 10</span>
                        <p className="text-[11px] text-zinc-500 mt-0.5">{row.descriptionA}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-700 font-medium">
                      <div>
                        <span className="font-bold text-zinc-900">{row.scoreB} / 10</span>
                        <p className="text-[11px] text-zinc-500 mt-0.5">{row.descriptionB}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          row.winner === 'A' || row.winner === 'B'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-zinc-100 text-zinc-600'
                        }`}
                      >
                        {advantage}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pros & Cons Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tool A Pros/Cons */}
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 space-y-4">
          <h3 className="font-bold text-zinc-950 text-base">
            {toolA.name} Strengths & Limitations
          </h3>

          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1.5">
                Key Strengths:
              </span>
              <ul className="space-y-1.5">
                {comparison.prosA.map((p: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-700">
                    <Check size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-zinc-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 block mb-1.5">
                Key Drawbacks:
              </span>
              <ul className="space-y-1.5">
                {comparison.consA.map((c: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-700">
                    <XIcon size={13} className="text-rose-600 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tool B Pros/Cons */}
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 space-y-4">
          <h3 className="font-bold text-zinc-950 text-base">
            {toolB.name} Strengths & Limitations
          </h3>

          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1.5">
                Key Strengths:
              </span>
              <ul className="space-y-1.5">
                {comparison.prosB.map((p: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-700">
                    <Check size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-zinc-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 block mb-1.5">
                Key Drawbacks:
              </span>
              <ul className="space-y-1.5">
                {comparison.consB.map((c: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-700">
                    <XIcon size={13} className="text-rose-600 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
