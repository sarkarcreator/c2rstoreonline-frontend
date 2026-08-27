'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Check, Send, ShieldCheck, Heart } from 'lucide-react';
import { subscribeNewsletter } from '@/lib/api/forms';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const data: any = await subscribeNewsletter({ email, source: 'footer' });
      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'Subscribed successfully!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Subscription failed');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      {/* Top Newsletter & Ecosystem Bar */}
      <div className="border-b border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-blue-400 font-semibold uppercase tracking-wider text-[11px] block mb-1">
              C2R Weekly Software Dispatch
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Get the latest vetted AI tools, price drops & software teardowns
            </h3>
            <p className="text-slate-400 text-xs mt-1.5">
              Join 18,500+ founders, marketers, and digital creators scaling their business with verified software stacks.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-md">
            <div className="flex items-center gap-2">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-5 py-2.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shrink-0 flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span>Joining...</span>
                ) : status === 'success' ? (
                  <>
                    <Check size={14} />
                    <span>Joined</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send size={13} />
                  </>
                )}
              </button>
            </div>
            {message && (
              <p
                className={`mt-2 text-[11px] ${
                  status === 'success' ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand & Ecosystem */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base tracking-tight">
                C2R<span className="text-blue-500">STORE</span> <span className="text-xs font-semibold text-slate-400">ONLINE</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              The authoritative discovery, comparison, and review platform for AI tools, SaaS products, and digital business engines.
            </p>
            <div className="pt-2">
              <a
                href="https://c2rstore.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium text-[11px]"
              >
                <span>Visit Main Store: c2rstore.com</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Software Categories
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="/category/ai-writing" className="hover:text-white transition-colors">
                  AI Writing & Copy
                </Link>
              </li>
              <li>
                <Link href="/category/ecommerce" className="hover:text-white transition-colors">
                  E-Commerce Platforms
                </Link>
              </li>
              <li>
                <Link href="/category/marketing-seo" className="hover:text-white transition-colors">
                  Marketing & SEO
                </Link>
              </li>
              <li>
                <Link href="/category/video-audio-ai" className="hover:text-white transition-colors">
                  Video & Audio AI
                </Link>
              </li>
              <li>
                <Link href="/category/business-automation" className="hover:text-white transition-colors">
                  Business Automation
                </Link>
              </li>
              <li>
                <Link href="/category/hosting-cloud" className="hover:text-white transition-colors">
                  Hosting & Cloud
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-blue-400 hover:underline">
                  Browse All Categories →
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Comparisons */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Head-to-Head
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="/compare/chatgpt-vs-claude" className="hover:text-white transition-colors">
                  ChatGPT vs Claude
                </Link>
              </li>
              <li>
                <Link href="/compare/shopify-vs-woocommerce" className="hover:text-white transition-colors">
                  Shopify vs WooCommerce
                </Link>
              </li>
              <li>
                <Link href="/compare/jasper-vs-copy-ai" className="hover:text-white transition-colors">
                  Jasper vs Copy.ai
                </Link>
              </li>
              <li>
                <Link href="/compare/midjourney-vs-flux" className="hover:text-white transition-colors">
                  Midjourney vs FLUX
                </Link>
              </li>
              <li>
                <Link href="/compare/hostinger-vs-bluehost" className="hover:text-white transition-colors">
                  Hostinger vs Bluehost
                </Link>
              </li>
              <li>
                <Link href="/comparisons" className="text-blue-400 hover:underline">
                  All Comparisons →
                </Link>
              </li>
            </ul>
          </div>

          {/* Free Tools Suite */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Free AI Tools Suite
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="/free-tools/product-description-generator" className="hover:text-white transition-colors">
                  Product Description AI
                </Link>
              </li>
              <li>
                <Link href="/free-tools/ad-copy-generator" className="hover:text-white transition-colors">
                  High-CTR Ad Copy AI
                </Link>
              </li>
              <li>
                <Link href="/free-tools/seo-meta-generator" className="hover:text-white transition-colors">
                  SEO Title & Meta AI
                </Link>
              </li>
              <li>
                <Link href="/free-tools/youtube-hook-generator" className="hover:text-white transition-colors">
                  YouTube Hook & Title AI
                </Link>
              </li>
              <li>
                <Link href="/free-tools/business-name-generator" className="hover:text-white transition-colors">
                  SaaS Brand Name AI
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-blue-400 hover:underline">
                  Verified Software Coupons 🔥
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Trust & Transparency
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="/disclosure" className="hover:text-white transition-colors">
                  Affiliate Disclosure (FTC)
                </Link>
              </li>
              <li>
                <Link href="/editorial-standards" className="hover:text-white transition-colors">
                  Editorial Standards
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About C2R Store Online
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Submit Tool
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* FTC Disclosure & Legal Notice */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          <div className="flex items-start gap-2.5 mb-4">
            <ShieldCheck size={16} className="text-blue-400 shrink-0 mt-0.5" />
            <p>
              <strong>Affiliate Disclosure:</strong> C2R Store Online (c2rstore.online) is a reader-supported software publication and discovery directory. Some links on this site are affiliate links, meaning we may receive a commission if you make a purchase after clicking through, at no extra cost to you. Our reviews, ratings, and comparisons are created objectively based on rigorous feature analysis, pricing benchmarks, and verified user feedback.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80 text-slate-500">
            <p>
              © {new Date().getFullYear()} C2R Store Online (https://c2rstore.online). All rights reserved. Connected to C2R Store Ecosystem (https://c2rstore.com).
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-slate-300">Privacy</Link>
              <Link href="/terms" className="hover:text-slate-300">Terms</Link>
              <Link href="/disclosure" className="hover:text-slate-300">Disclosure</Link>
              <Link href="/admin" className="text-slate-500 hover:text-slate-300">Admin</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
