import React from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | C2R Store Online',
  description: 'Terms of service and user agreements for C2R Store Online.',
  alternates: {
    canonical: 'https://c2rstore.online/terms'
  }
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'Terms of Service' }]} />

      <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center font-bold">
            <FileText size={22} className="text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
              Terms of Service
            </h1>
            <span className="text-xs text-zinc-500 font-medium">
              Effective Date: January 1, 2026
            </span>
          </div>
        </div>

        <div className="prose prose-zinc max-w-none text-zinc-700 text-xs sm:text-sm space-y-4 leading-relaxed">
          <p>
            Welcome to C2R Store Online. By accessing or using our website located at https://c2rstore.online, you agree to be bound by these Terms of Service.
          </p>

          <h2 className="text-base font-bold text-zinc-950">1. Nature of Service</h2>
          <p>
            C2R Store Online is an informational discovery and review platform providing software ratings, comparisons, discount alerts, and free content generation tools. We are not a direct vendor or hosting provider for third-party software listed on this platform.
          </p>

          <h2 className="text-base font-bold text-zinc-950">2. Accuracy of Information</h2>
          <p>
            While we make every effort to verify tool pricing, discount coupon codes, and feature lists, software providers frequently update pricing and terms. You are encouraged to verify final pricing and contractual terms directly on the official vendor site prior to purchasing.
          </p>

          <h2 className="text-base font-bold text-zinc-950">3. Free AI Tools Usage</h2>
          <p>
            You agree to use our free AI generator tools in compliance with all applicable laws and ethical standards. You may not use our free tools to generate malicious, illegal, fraudulent, or defamatory content.
          </p>

          <h2 className="text-base font-bold text-zinc-950">4. Limitation of Liability</h2>
          <p>
            In no event shall C2R Store Online, its affiliates, or editorial contributors be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use third-party software products discovered via our website.
          </p>
        </div>
      </div>
    </div>
  );
}
