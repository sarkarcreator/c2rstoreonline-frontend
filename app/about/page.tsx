import React from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Sparkles, ShieldCheck, Target, ExternalLink, Users, Layers } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About C2R Store Online — Mission, Brand & Editorial Team',
  description:
    'Learn about C2R Store Online, our mission to simplify software discovery for digital builders, and our relationship with the C2R brand ecosystem.',
  alternates: {
    canonical: 'https://c2rstore.online/about'
  }
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: 'About Us' }]} />

      {/* Hero */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
          <Sparkles size={13} />
          <span>Our Vision & Story</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Empowering the Next Generation of Digital Builders
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
          C2R Store Online was founded with a singular purpose: to cut through software marketing noise and deliver objective, benchmark-tested discovery of the world&apos;s best AI tools, SaaS applications, and digital business infrastructure.
        </p>
      </div>

      {/* Flagship Brand Relationship */}
      <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
          <Layers size={16} />
          <span>Brand Ecosystem & Structure</span>
        </div>
        <h2 className="text-xl font-bold text-zinc-950">
          Part of the C2R Brand Family
        </h2>
        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
          While our flagship platform <a href="https://c2rstore.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold hover:underline">C2R Store (c2rstore.com)</a> focuses on primary consumer products and retail innovation, <strong>C2R Store Online (c2rstore.online)</strong> is our specialized digital intelligence division dedicated to software reviews, AI utilities, and business workflow acceleration.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Target size={20} />
          </div>
          <h3 className="font-bold text-zinc-950 text-sm">Objective Benchmarks</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Every software tool is evaluated on real workflow utility, pricing fairness, API capability, and feature depth.
          </p>
        </div>

        <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck size={20} />
          </div>
          <h3 className="font-bold text-zinc-950 text-sm">Zero Pay-for-Play</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            We never inflate ratings or alter editorial verdicts for software vendors. Honest pros and cons on every review.
          </p>
        </div>

        <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Users size={20} />
          </div>
          <h3 className="font-bold text-zinc-950 text-sm">Free Community Tools</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            We provide unlimited, zero-signup AI generator tools powered by Gemini AI to help early-stage creators get moving immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
