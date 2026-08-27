import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { contentApi as db } from '@/lib/api/content';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ToolCard } from '@/components/ui/ToolCard';
import { GuideCard } from '@/components/ui/GuideCard';
import { SchemaJsonLd } from '@/components/ui/SchemaJsonLd';
import { Clock, Calendar, ArrowLeft, ArrowRight, ShieldCheck, Share2 } from 'lucide-react';
import { formatDateUtc } from '@/lib/utils';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = await db.getGuideBySlug(slug);

  if (!guide) {
    return { title: 'Guide Not Found' };
  }

  return {
    title: `${guide.title} | C2R Store Online`,
    description: guide.excerpt,
    alternates: {
      canonical: `https://c2rstore.online/guides/${guide.slug}`
    },
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      url: `https://c2rstore.online/guides/${guide.slug}`,
      images: [{ url: guide.featuredImage, alt: guide.title }]
    }
  };
}

export default async function GuideDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await db.getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const allGuides = await db.getGuides();
  const relatedGuides = allGuides.filter(g => g.slug !== slug).slice(0, 3);
  const recommendedTools = (guide.recommendedTools || []) as any[];

  const publishedDate = formatDateUtc(guide.publishedAt, { monthFormat: 'long' });

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.excerpt,
    image: guide.featuredImage,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: {
      '@type': 'Person',
      name: guide.author.name
    },
    publisher: {
      '@type': 'Organization',
      name: 'C2R Store Online',
      logo: {
        '@type': 'ImageObject',
        url: 'https://c2rstore.online/logo.png'
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SchemaJsonLd schema={articleSchema} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Software Guides', url: '/guides' },
          { name: guide.title }
        ]}
      />

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
            {guide.category}
          </span>
          <span className="text-xs text-zinc-500 flex items-center gap-1">
            <Clock size={13} />
            {guide.readTimeMinutes} min read
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight leading-tight">
          {guide.title}
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-medium">
          {guide.excerpt}
        </p>

        {/* Author metadata bar */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-200 text-xs text-zinc-500 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 border border-zinc-200">
              <Image
                src={guide.author.avatar}
                alt={guide.author.name}
                width={40}
                height={40}
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-bold text-zinc-900 block text-sm">
                {guide.author.name}
              </span>
              <span className="text-zinc-500 text-[11px]">{guide.author.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-500">
            <Calendar size={13} />
            <span suppressHydrationWarning>Updated {publishedDate}</span>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-lg border border-zinc-200/90">
        <Image
          src={guide.featuredImage}
          alt={guide.title}
          fill
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Main Article Body */}
      <article className="prose prose-zinc max-w-none text-zinc-800 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
        {guide.content}
      </article>

      {/* Recommended Tools Section inside Guide */}
      {recommendedTools.length > 0 && (
        <section className="bg-zinc-50 border border-zinc-200/90 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-950 tracking-tight">
              Featured Software Mentioned in this Guide
            </h2>
            <Link
              href="/tools"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>Explore All Tools</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedTools.map(t => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>
      )}

      {/* Author Bio Box */}
      <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl overflow-hidden relative shrink-0 border border-zinc-200">
          <Image
            src={guide.author.avatar}
            alt={guide.author.name}
            width={56}
            height={56}
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Written by
          </span>
          <h3 className="text-base font-bold text-zinc-950">
            {guide.author.name} — {guide.author.role}
          </h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Staff tech analyst and SaaS research lead at C2R Store Online, reviewing software architecture, marketing stacks, and business automation workflows.
          </p>
        </div>
      </div>

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <section className="pt-8 border-t border-zinc-200 space-y-6">
          <h2 className="text-2xl font-bold text-zinc-950 tracking-tight">
            More Practical Guides & Blueprints
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedGuides.map(g => (
              <GuideCard key={g.id} guide={g} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
