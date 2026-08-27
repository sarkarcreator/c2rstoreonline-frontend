'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Deal } from '@/lib/types';
import { ExternalLink, Copy, Check, Tag, Clock, ThumbsUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatDateUtc } from '@/lib/utils';
import { api } from '@/lib/api/client';

export function DealCard({ deal }: { deal: Deal }) {
  const [copied, setCopied] = useState(false);
  const [upvotes, setUpvotes] = useState(deal.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const copyCoupon = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!deal.couponCode) return;
    navigator.clipboard.writeText(deal.couponCode);
    setCopied(true);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.85 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasUpvoted) return;
    setUpvotes(prev => prev + 1);
    setHasUpvoted(true);
    try {
      await api(`/api/deals/${deal.id}/upvote`, { method: 'POST' });
    } catch {
      // ignore
    }
  };

  const expiresDate = formatDateUtc(deal.expiresAt, { monthFormat: 'short' });

  return (
    <div
      id={`deal-card-${deal.id}`}
      className={`group relative bg-white border rounded-xl p-5 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between ${
        deal.isExclusive
          ? 'border-blue-300 ring-1 ring-blue-100'
          : 'border-slate-200/80 hover:border-blue-300'
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-sm">
            <Tag size={12} />
            {deal.discount}
          </span>

          <div className="flex items-center gap-2">
            {deal.isExclusive && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
                Exclusive
              </span>
            )}
            <span className="text-[11px] text-slate-600 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
              {deal.category}
            </span>
          </div>
        </div>

        {/* Tool Info & Title */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-50 border border-slate-200/90 relative shrink-0">
            <Image
              src={deal.toolLogo}
              alt={deal.toolName}
              width={40}
              height={40}
              className="object-cover w-full h-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">
              {deal.toolName}
            </span>
            <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
              {deal.title}
            </h3>
          </div>
        </div>

        {/* Terms text */}
        <p className="text-xs text-slate-600 mb-4 line-clamp-2">
          {deal.terms}
        </p>
      </div>

      {/* Coupon Box & Action */}
      <div className="pt-3.5 border-t border-slate-100 space-y-3">
        {deal.couponCode ? (
          <div className="flex items-center justify-between gap-2 bg-slate-50 border border-dashed border-slate-300 rounded-lg p-2">
            <div className="flex items-center gap-1.5 overflow-hidden pl-1">
              <span className="text-[11px] text-slate-500 uppercase font-mono font-bold tracking-wider">
                Code:
              </span>
              <span className="text-xs font-mono font-extrabold text-slate-900 truncate">
                {deal.couponCode}
              </span>
            </div>
            <button
              onClick={copyCoupon}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-xs transition-all"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-blue-600" />
                  <span className="text-blue-600 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="text-xs text-blue-800 bg-blue-50 border border-blue-200/60 rounded-lg p-2 text-center font-medium">
            ⚡ Discount automatically applied at checkout
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <Clock size={12} />
            <span suppressHydrationWarning>Expires {expiresDate}</span>
          </div>

          <button
            onClick={handleUpvote}
            className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors ${
              hasUpvoted
                ? 'text-blue-700 bg-blue-50 font-bold'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
            title="Upvote verified deal"
          >
            <ThumbsUp size={12} />
            <span>{upvotes}</span>
          </button>
        </div>

        <Link
          href={`/go/${deal.toolSlug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm"
        >
          <span>Claim Deal at Official Site</span>
          <ExternalLink size={13} />
        </Link>
      </div>
    </div>
  );
}
