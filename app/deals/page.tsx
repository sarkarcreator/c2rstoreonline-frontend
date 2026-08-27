'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Deal } from '@/lib/types';
import { contentApi } from '@/lib/api/content';
import { DealCard } from '@/components/ui/DealCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Tag, Zap, ShieldCheck, Filter, Search, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function DealsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    contentApi.getDeals()
      .then(deals => ({ deals }))
      .then(data => {
        if (data?.deals && Array.isArray(data.deals) && data.deals.length > 0) {
          setDeals(data.deals);
        }
      })
      .catch(() => {});
  }, []);

  const categories = useMemo(() => {
    const set = new Set(deals.map(d => d.category));
    return ['All', ...Array.from(set)];
  }, [deals]);

  const filteredDeals = useMemo(() => {
    let list = [...deals];

    if (selectedCategory !== 'All') {
      list = list.filter(d => d.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (verifiedOnly) {
      list = list.filter(d => d.isVerified);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        d =>
          d.title.toLowerCase().includes(q) ||
          d.toolName.toLowerCase().includes(q) ||
          d.discount.toLowerCase().includes(q)
      );
    }

    return list;
  }, [deals, selectedCategory, verifiedOnly, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Verified Software Deals & Coupons' }]} />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold border border-blue-500/30">
            <Zap size={13} />
            <span>Active & Tested for 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Verified Software Deals & Promo Codes
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Exclusive discounts, lifetime deals, and promo coupon codes on top-tier AI software, cloud hosting, e-commerce, and marketing suites.
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search deals by tool or keyword..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Category Pills & Verified Switch */}
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 justify-between md:justify-end">
          <div className="flex items-center gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer shrink-0 ml-2">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={e => setVerifiedOnly(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
            <span>Verified only</span>
          </label>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDeals.map(deal => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>

      {filteredDeals.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto">
          <Tag size={24} className="mx-auto text-slate-400 mb-2" />
          <h3 className="font-bold text-slate-900 text-sm">No deals matched your criteria</h3>
          <p className="text-xs text-slate-500 mt-1">Try clearing your filters or search term.</p>
        </div>
      )}

      {/* Partner Submission CTA */}
      <div className="bg-slate-100 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-bold text-slate-900 text-base">
            Are you a SaaS Founder or Affiliate Partner?
          </h3>
          <p className="text-xs text-slate-600 mt-1 max-w-xl">
            Submit your product or exclusive promotional discount code to be featured on C2R Store Online and reach thousands of daily buyers.
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shrink-0"
        >
          <span>Submit Software Deal</span>
        </Link>
      </div>
    </div>
  );
}
