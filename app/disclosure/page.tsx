import React from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ShieldCheck, CheckCircle2, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate & Partnership Disclosure | C2R Store Online',
  description:
    'Full transparency and FTC compliance statement regarding affiliate commissions, editorial independence, and software testing methodologies.',
  alternates: {
    canonical: 'https://c2rstore.online/disclosure'
  }
};

export default function DisclosurePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Affiliate Disclosure' }]} />

      <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
              Affiliate & Editorial Disclosure
            </h1>
            <span className="text-xs text-zinc-500 font-medium">
              Last updated: January 2026 • Compliant with FTC Guidelines (16 CFR Part 255)
            </span>
          </div>
        </div>

        <div className="prose prose-zinc max-w-none text-zinc-700 text-xs sm:text-sm space-y-5 leading-relaxed">
          <p>
            At <strong>C2R Store Online</strong> (https://c2rstore.online), we believe in uncompromising transparency with our readers, founders, and community. This page outlines how we generate revenue, how affiliate relationships operate, and our unwavering commitment to unbiased editorial independence.
          </p>

          <h2 className="text-base sm:text-lg font-bold text-zinc-950 pt-2">
            1. How C2R Store Online Is Funded
          </h2>
          <p>
            C2R Store Online operates as an independent software discovery publication, comparison engine, and review directory. To keep all of our directories, in-depth reviews, comparison matrices, and <strong>AI free tool utilities 100% free</strong> to all users without imposing intrusive paywalls, we participate in various affiliate partnership programs.
          </p>
          <p>
            When you click on certain outbound links (e.g. &ldquo;Visit Official Site&rdquo;, &ldquo;Claim Deal&rdquo;, or &ldquo;Read Review&rdquo;) and subsequently register for a trial or purchase a software subscription, we may earn a referral commission from the software provider.
          </p>

          <h2 className="text-base sm:text-lg font-bold text-zinc-950 pt-2">
            2. Impact on Product Pricing for You
          </h2>
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-950">
            <p className="font-bold flex items-center gap-2 mb-1">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Zero Cost Penalty Guarantee</span>
            </p>
            <p className="text-xs text-emerald-900 leading-normal">
              Purchasing through a C2R Store Online affiliate link never incurs any additional cost to you. In fact, through our direct affiliate relationships and exclusive promo codes, you often receive lower pricing, extended free trials, or discounted annual billing.
            </p>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-zinc-950 pt-2">
            3. Strict Editorial Independence Policy
          </h2>
          <p>
            Our software benchmarks, pros and cons, scores, and winner verdicts are based on objective feature analysis, hands-on user experience testing, verified community sentiment, and performance benchmarks.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-700">
            <li>We do NOT accept payment to give a software tool a positive review.</li>
            <li>We do NOT alter benchmark scores or ratings in exchange for sponsorship.</li>
            <li>We clearly identify limitations and cons for every tool listed.</li>
          </ul>

          <h2 className="text-base sm:text-lg font-bold text-zinc-950 pt-2">
            4. Ecosystem Connection with C2R Store (.com)
          </h2>
          <p>
            C2R Store Online (c2rstore.online) is a dedicated digital software directory operating alongside the main flagship retail brand <a href="https://c2rstore.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline font-semibold">C2R Store (c2rstore.com)</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
