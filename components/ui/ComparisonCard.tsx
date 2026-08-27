import React from 'react';
import Link from 'next/link';
import { Comparison } from '@/lib/types';
import { ArrowRight, Trophy, Sparkles } from 'lucide-react';

export function ComparisonCard({ comparison }: { comparison: Comparison }) {
  return (
    <div
      id={`comp-card-${comparison.slug}`}
      className="group relative bg-white border border-slate-200/80 hover:border-blue-300 rounded-xl p-5 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between"
    >
      <div>
        {/* Header Matchup */}
        <div className="flex items-center justify-between gap-2 mb-4 bg-slate-50 border border-slate-200/80 rounded-lg p-3">
          <div className="flex-1 text-center font-bold text-slate-900 text-sm truncate">
            {comparison.toolAName}
            <span className="block text-[11px] font-semibold text-blue-700">
              ★ {comparison.scoreA.toFixed(1)} / 10
            </span>
          </div>

          <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">
            VS
          </div>

          <div className="flex-1 text-center font-bold text-slate-900 text-sm truncate">
            {comparison.toolBName}
            <span className="block text-[11px] font-semibold text-blue-700">
              ★ {comparison.scoreB.toFixed(1)} / 10
            </span>
          </div>
        </div>

        {/* Title & Summary */}
        <h3 className="font-bold text-slate-900 text-base leading-snug mb-2 group-hover:text-blue-600 transition-colors">
          {comparison.title}
        </h3>

        <p className="text-xs text-slate-600 line-clamp-2 mb-4">
          {comparison.summary}
        </p>

        {/* Winner Highlight */}
        <div className="flex items-center gap-2 text-xs bg-blue-50/80 border border-blue-200/70 rounded-lg p-2.5 mb-4">
          <Trophy size={15} className="text-blue-600 shrink-0" />
          <div className="truncate">
            <span className="font-semibold text-slate-900">Top Pick: </span>
            <span className="font-bold text-blue-700">
              {comparison.winnerSlug === comparison.toolASlug
                ? comparison.toolAName
                : comparison.toolBName}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 flex items-center gap-1">
          <Sparkles size={12} className="text-amber-500" />
          Updated 2026
        </span>

        <Link
          href={`/compare/${comparison.slug}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm"
        >
          <span>View Comparison</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
