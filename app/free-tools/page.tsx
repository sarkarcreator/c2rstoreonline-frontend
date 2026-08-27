import React from 'react';
import Link from 'next/link';
import { contentApi as db } from '@/lib/api/content';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Sparkles, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Business & Marketing Tools (No Login Required)',
  description:
    'Use 5 free AI tools to generate high-converting e-commerce product descriptions, Facebook/Google ad copy, SEO meta tags, YouTube hooks, and SaaS brand names.',
  alternates: {
    canonical: 'https://c2rstore.online/free-tools'
  }
};

export const dynamic = 'force-dynamic';

export default async function FreeToolsIndexPage() {
  const freeTools = await db.getFreeTools();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Free AI Tools Suite' }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-purple-950 via-zinc-950 to-zinc-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-purple-800/40">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30">
            <Sparkles size={13} />
            <span>100% Free • Unlimited Generations • Powered by Gemini AI</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Free AI Business & Content Generator Suite
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Eliminate hours of copywriting and marketing ideation. Generate high-converting store listings, ad copy variants, viral video hooks, and SEO meta tags in seconds with no signup needed.
          </p>
        </div>
      </div>

      {/* Free Tools Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {freeTools.map(tool => (
          <div
            key={tool.id}
            className="bg-white border border-zinc-200/90 hover:border-purple-300 rounded-3xl p-6 transition-all duration-200 hover:shadow-lg hover:shadow-purple-900/5 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
                  {tool.category}
                </span>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  ⚡ Free Instant
                </span>
              </div>

              <h2 className="text-xl font-bold text-zinc-950 group-hover:text-purple-700 transition-colors mb-2">
                {tool.name}
              </h2>

              <p className="text-xs text-zinc-600 mb-6 leading-relaxed">
                {tool.description}
              </p>

              {/* Input fields preview */}
              <div className="bg-zinc-50 border border-zinc-200/70 rounded-2xl p-3.5 mb-6">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  Input Parameters:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {tool.inputs.map((inp, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-white border border-zinc-200 text-zinc-700 px-2 py-0.5 rounded-md font-medium"
                    >
                      {inp.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href={`/free-tools/${tool.slug}`}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs transition-all shadow-md shadow-purple-700/20"
            >
              <span>Launch Free AI Tool</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>

      {/* Feature Value Callout */}
      <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8">
        <h3 className="text-lg font-bold text-zinc-950 mb-4">
          Why We Provide These Tools Free of Charge
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-600">
          <div className="space-y-1.5">
            <h4 className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Instant Utility</span>
            </h4>
            <p>
              Test high-velocity AI prompts and generate production-ready copy for your online store or landing pages in real time.
            </p>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Zero Friction</span>
            </h4>
            <p>
              No credit card, no registration, and no artificial daily limits. Use the tools as often as your workflow requires.
            </p>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Advanced Tool Discovery</span>
            </h4>
            <p>
              When your business scales beyond manual generators, discover enterprise AI and SaaS software through our vetted reviews.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
