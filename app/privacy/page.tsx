import React from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Lock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | C2R Store Online',
  description: 'Privacy Policy and data protection terms for C2R Store Online (c2rstore.online).',
  alternates: {
    canonical: 'https://c2rstore.online/privacy'
  }
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'Privacy Policy' }]} />

      <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center font-bold">
            <Lock size={22} className="text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
              Privacy Policy
            </h1>
            <span className="text-xs text-zinc-500 font-medium">
              Effective Date: January 1, 2026
            </span>
          </div>
        </div>

        <div className="prose prose-zinc max-w-none text-zinc-700 text-xs sm:text-sm space-y-4 leading-relaxed">
          <p>
            C2R Store Online (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates the website https://c2rstore.online. This Privacy Policy informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.
          </p>

          <h2 className="text-base font-bold text-zinc-950">1. Information We Collect</h2>
          <p>
            We collect minimal, privacy-centric data:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Newsletter Information:</strong> When you subscribe to our newsletter, we collect your email address and optional name.</li>
            <li><strong>Contact Inquiries:</strong> When you submit a partner or support inquiry, we collect your name, email address, and message content.</li>
            <li><strong>Usage & Referral Logs:</strong> Anonymous aggregate click counts and UTM referral strings when you click outbound affiliate links.</li>
          </ul>

          <h2 className="text-base font-bold text-zinc-950">2. Free AI Tools Data Handling</h2>
          <p>
            When you use our free AI generator utilities (e.g. Product Description Generator, Ad Copy Generator), prompts submitted are processed server-side via official Gemini API models solely to generate your requested output. We do not store, sell, or use your prompt text for AI model training.
          </p>

          <h2 className="text-base font-bold text-zinc-950">3. Cookies & Tracking Technologies</h2>
          <p>
            We use standard session cookies to remember your comparison dock preferences. Outbound affiliate links may place third-party cookies by the affiliate networks (such as Impact, CJ, or PartnerStack) on partner sites to track valid referral sales.
          </p>

          <h2 className="text-base font-bold text-zinc-950">4. Contact Us</h2>
          <p>
            If you have questions regarding this Privacy Policy, please contact us at <a href="mailto:privacy@c2rstore.online" className="text-emerald-600 underline">privacy@c2rstore.online</a> or through our <a href="/contact" className="text-emerald-600 underline">Contact Page</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
