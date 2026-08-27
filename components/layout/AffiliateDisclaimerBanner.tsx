import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export function AffiliateDisclaimerBanner() {
  return (
    <div className="bg-zinc-900 text-zinc-300 text-xs py-2 px-4 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
          <span>
            <strong className="text-zinc-100 font-semibold">Editorial Independence:</strong>{' '}
            C2R Store Online reviews are 100% editorially independent. We may earn a partner commission when you purchase through our links at no extra cost to you.
          </span>
        </div>
        <Link
          href="/disclosure"
          className="text-zinc-400 hover:text-emerald-400 underline underline-offset-2 transition-colors shrink-0 text-[11px]"
        >
          Read Full Disclosure
        </Link>
      </div>
    </div>
  );
}
