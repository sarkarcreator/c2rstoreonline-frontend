import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Guide } from '@/lib/types';
import { Clock, ArrowRight } from 'lucide-react';
import { formatDateUtc } from '@/lib/utils';

export function GuideCard({ guide }: { guide: Guide }) {
  const publishedDate = formatDateUtc(guide.publishedAt, { monthFormat: 'short' });

  return (
    <article
      id={`guide-card-${guide.slug}`}
      className="group bg-white border border-slate-200/80 hover:border-blue-300 rounded-xl overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between"
    >
      <div>
        {/* Cover Image */}
        <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
          <Image
            src={guide.featuredImage}
            alt={guide.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-semibold">
            {guide.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {guide.readTimeMinutes} min read
            </span>
            <span>•</span>
            <span suppressHydrationWarning>{publishedDate}</span>
          </div>

          <Link href={`/guides/${guide.slug}`}>
            <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
              {guide.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 line-clamp-2 mb-4">
            {guide.excerpt}
          </p>
        </div>
      </div>

      {/* Author and Read link */}
      <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
        <div className="flex items-center gap-2 pt-3">
          <div className="w-6 h-6 rounded-full overflow-hidden relative shrink-0">
            <Image
              src={guide.author.avatar}
              alt={guide.author.name}
              width={24}
              height={24}
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-xs font-medium text-slate-700">
            {guide.author.name}
          </span>
        </div>

        <Link
          href={`/guides/${guide.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 pt-3"
        >
          <span>Read Guide</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}
