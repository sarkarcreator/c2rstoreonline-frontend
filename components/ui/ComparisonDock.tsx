'use client';

import React from 'react';
import Link from 'next/link';
import { useComparison } from '@/lib/comparison-context';
import { X, ArrowRight, Scale } from 'lucide-react';
import Image from 'next/image';

export function ComparisonDock() {
  const { selectedTools, removeToolForComparison, clearComparison } = useComparison();

  if (selectedTools.length === 0) return null;

  const toolA = selectedTools[0];
  const toolB = selectedTools[1];

  const compareUrl =
    selectedTools.length === 2
      ? `/compare/${toolA.slug}-vs-${toolB.slug}`
      : `/comparisons`;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl bg-zinc-900/95 backdrop-blur-md text-white border border-zinc-700/80 rounded-2xl shadow-2xl p-3 sm:p-4 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Scale size={18} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hidden sm:inline">
              Compare
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Tool A */}
            <div className="flex items-center gap-2 bg-zinc-800/90 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs">
              <div className="w-5 h-5 rounded overflow-hidden relative shrink-0">
                <Image
                  src={toolA.logo}
                  alt={toolA.name}
                  width={20}
                  height={20}
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-medium truncate max-w-[90px] sm:max-w-[120px]">
                {toolA.name}
              </span>
              <button
                onClick={() => removeToolForComparison(toolA.id)}
                className="text-zinc-400 hover:text-white ml-1"
                title="Remove"
              >
                <X size={12} />
              </button>
            </div>

            <span className="text-zinc-500 font-bold text-xs">VS</span>

            {/* Tool B or Placeholder */}
            {toolB ? (
              <div className="flex items-center gap-2 bg-zinc-800/90 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs">
                <div className="w-5 h-5 rounded overflow-hidden relative shrink-0">
                  <Image
                    src={toolB.logo}
                    alt={toolB.name}
                    width={20}
                    height={20}
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-medium truncate max-w-[90px] sm:max-w-[120px]">
                  {toolB.name}
                </span>
                <button
                  onClick={() => removeToolForComparison(toolB.id)}
                  className="text-zinc-400 hover:text-white ml-1"
                  title="Remove"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <div className="border border-dashed border-zinc-600 rounded-lg px-3 py-1.5 text-xs text-zinc-400">
                + Select 2nd tool
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearComparison}
            className="text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1"
          >
            Clear
          </button>
          <Link
            href={compareUrl}
            className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedTools.length === 2
                ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/25'
                : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
            }`}
          >
            <span>{selectedTools.length === 2 ? 'Compare Now' : 'Choose 2nd Tool'}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
