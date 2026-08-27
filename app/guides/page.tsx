import React from 'react';
import { contentApi as db } from '@/lib/api/content';
import { GuideCard } from '@/components/ui/GuideCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BookOpen, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software Guides & Strategy Teardowns (2026)',
  description:
    'Actionable blueprints on AI software adoption, e-commerce platform migrations, automation workflows, and tech stack optimization.',
  alternates: {
    canonical: 'https://c2rstore.online/guides'
  }
};

export const dynamic = 'force-dynamic';

export default async function GuidesIndexPage() {
  const guides = await db.getGuides();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Software Guides & Blueprints' }]} />

      {/* Header Banner */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
            <BookOpen size={16} />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
            Editorial Knowledge Base
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
          Software Guides, Teardowns & Blueprints
        </h1>
        <p className="text-sm text-zinc-600 mt-2 max-w-2xl">
          Comprehensive teardowns written by industry practitioners on scaling online stores, automating workflows with AI, and optimizing software spend.
        </p>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map(guide => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>
    </div>
  );
}
