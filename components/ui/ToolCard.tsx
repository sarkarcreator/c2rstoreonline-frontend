'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tool } from '@/lib/types';
import { RatingStars } from './RatingStars';
import { ExternalLink, Check, Plus, CheckSquare, Sparkles } from 'lucide-react';
import { useComparison } from '@/lib/comparison-context';

interface ToolCardProps {
  tool: Tool;
  layout?: 'grid' | 'list';
  viewMode?: 'grid' | 'list';
}

export function ToolCard({ tool, layout, viewMode = 'grid' }: ToolCardProps) {
  const activeLayout = layout || viewMode;
  const { isToolSelected, addToolForComparison, removeToolForComparison } = useComparison();
  const selected = isToolSelected(tool.id);

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (selected) {
      removeToolForComparison(tool.id);
    } else {
      addToolForComparison(tool);
    }
  };

  if (activeLayout === 'list') {
    return (
      <div
        id={`tool-card-${tool.slug}`}
        className="group relative bg-white border border-slate-200/80 hover:border-blue-300 rounded-xl p-5 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5"
      >
        <div className="flex items-start gap-4 flex-1">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 relative shrink-0">
            <Image
              src={tool.logo}
              alt={tool.name}
              width={56}
              height={56}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Link
                href={`/tools/${tool.slug}`}
                className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors"
              >
                {tool.name}
              </Link>
              {tool.isVerified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                  <Check size={11} className="stroke-[3]" />
                  Verified
                </span>
              )}
              {tool.isTrending && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
                  <Sparkles size={11} />
                  Trending
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 mb-2 max-w-2xl">
              {tool.tagline}
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
              <RatingStars rating={tool.rating} reviewCount={tool.reviewCount} />
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-600">{tool.categoryName} ({tool.subCategory})</span>
              <span className="text-slate-300">•</span>
              <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                {tool.priceType} • {tool.startingPrice}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
          <button
            onClick={toggleCompare}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
              selected
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
            title="Compare with another tool"
          >
            {selected ? <CheckSquare size={13} /> : <Plus size={13} />}
            <span>{selected ? 'Added' : 'Compare'}</span>
          </button>

          <Link
            href={`/tools/${tool.slug}`}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
          >
            Review
          </Link>

          <Link
            href={`/go/${tool.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm"
          >
            <span>Visit Site</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>
    );
  }

  // Grid layout (Default)
  return (
    <div
      id={`tool-card-${tool.slug}`}
      className="group relative bg-white border border-slate-200/80 hover:border-blue-300 rounded-xl p-5 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between"
    >
      <div>
        {/* Header: Logo, Category & Badges */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 border border-slate-200/90 relative shrink-0">
              <Image
                src={tool.logo}
                alt={tool.name}
                width={48}
                height={48}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <Link
                  href={`/tools/${tool.slug}`}
                  className="font-bold text-slate-900 hover:text-blue-600 transition-colors text-base"
                >
                  {tool.name}
                </Link>
                {tool.isVerified && (
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center" title="Verified Tool">
                    <Check size={10} className="stroke-[3]" />
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium text-slate-500">
                {tool.categoryName}
              </span>
            </div>
          </div>

          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
              tool.priceType === 'Free'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : tool.priceType === 'Freemium'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {tool.priceType}
          </span>
        </div>

        {/* Tagline */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-3 min-h-[32px]">
          {tool.tagline}
        </p>

        {/* Rating & Review Count */}
        <div className="mb-3.5">
          <RatingStars rating={tool.rating} reviewCount={tool.reviewCount} />
        </div>

        {/* Key Features Bullets */}
        <ul className="space-y-1.5 mb-4">
          {tool.features.slice(0, 3).map((feat, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
              <Check size={13} className="text-blue-600 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer: Starting Price & Actions */}
      <div className="pt-3.5 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="text-slate-500 font-medium">Starting at</span>
          <span className="font-bold text-slate-900">{tool.startingPrice}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/tools/${tool.slug}`}
            className="px-3 py-2 rounded-lg text-xs font-semibold text-center bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
          >
            Read Review
          </Link>

          <Link
            href={`/go/${tool.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-center bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm"
          >
            <span>Visit Site</span>
            <ExternalLink size={12} />
          </Link>
        </div>

        {/* Quick compare link */}
        <div className="mt-2 text-center">
          <button
            onClick={toggleCompare}
            className="text-[11px] text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 transition-colors"
          >
            {selected ? (
              <>
                <CheckSquare size={12} className="text-blue-600" />
                <span className="text-blue-700 font-semibold">Added to Compare</span>
              </>
            ) : (
              <>
                <Plus size={12} />
                <span>Add to Compare</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
