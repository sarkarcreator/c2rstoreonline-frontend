import React from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Award, CheckCircle2, Search, Sliders, Shield } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editorial Standards & Scoring Methodology | C2R Store Online',
  description:
    'Learn how C2R Store Online evaluates, tests, benchmarks, and rates AI software, SaaS tools, and business platforms.',
  alternates: {
    canonical: 'https://c2rstore.online/editorial-standards'
  }
};

export default function EditorialStandardsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Editorial Standards' }]} />

      <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center font-bold">
            <Award size={24} className="text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
              Editorial Standards & Testing Methodology
            </h1>
            <span className="text-xs text-zinc-500 font-medium">
              Rigorous, reproducible, and unbiased software testing framework.
            </span>
          </div>
        </div>

        <div className="prose prose-zinc max-w-none text-zinc-700 text-xs sm:text-sm space-y-5 leading-relaxed">
          <p>
            At <strong>C2R Store Online</strong>, our mission is to empower entrepreneurs, digital creators, marketing professionals, and technical teams to choose the highest-leverage software with absolute confidence.
          </p>

          <h2 className="text-base sm:text-lg font-bold text-zinc-950 pt-2">
            The 4-Pillar Scoring Framework
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">1. Usability & Onboarding</span>
              <p className="text-xs text-zinc-600">Time-to-value, UX ergonomics, UI clutter, navigation clarity, and ease of team onboarding.</p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">2. Feature Depth & Output Quality</span>
              <p className="text-xs text-zinc-600">Model precision, hallucination rates for AI tools, API resilience, and automation power.</p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">3. Pricing Transparency & Value</span>
              <p className="text-xs text-zinc-600">Free tier usefulness, credit renewal policies, hidden add-ons, and cost-per-seat scalability.</p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">4. Support & Ecosystem Health</span>
              <p className="text-xs text-zinc-600">Documentation freshness, customer service response latency, and third-party integrations.</p>
            </div>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-zinc-950 pt-2">
            Regular Audits and Re-Testing
          </h2>
          <p>
            Software changes rapidly. Our editorial staff conducts periodic quarterly audits of all listed software to update pricing tiers, document new feature releases, and adjust benchmark ratings accordingly.
          </p>
        </div>
      </div>
    </div>
  );
}
