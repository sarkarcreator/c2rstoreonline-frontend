'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Tag, Scale, BookOpen, Sparkles, Wrench } from 'lucide-react';
import { contentApi } from '@/lib/api/content';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    tools: any[];
    categories: any[];
    comparisons: any[];
    deals: any[];
    guides: any[];
    freeTools: any[];
  }>({
    tools: [],
    categories: [],
    comparisons: [],
    deals: [],
    guides: [],
    freeTools: []
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Debounced search query
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }

    let active = true;
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await contentApi.search(trimmed);
        if (active) {
          setResults(data);
        }
      } catch (err) {
        console.error('Search error', err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }, 180);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const hasAnyResults =
    results.tools.length > 0 ||
    results.categories.length > 0 ||
    results.comparisons.length > 0 ||
    results.deals.length > 0 ||
    results.guides.length > 0 ||
    results.freeTools.length > 0;

  const handleSelect = (url: string) => {
    onClose();
    router.push(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 bg-slate-50/70">
          <Search size={20} className="text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search AI tools, SaaS, comparisons, deals, guides, free generators..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-900 text-sm placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1 rounded-md font-mono"
          >
            ESC
          </button>
        </div>

        {/* Search Results Area */}
        <div className="overflow-y-auto p-4 space-y-6 flex-1 divide-y divide-slate-100">
          {loading && (
            <div className="py-8 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span>Searching C2R Store Online index...</span>
            </div>
          )}

          {!loading && query && !hasAnyResults && (
            <div className="py-12 text-center">
              <p className="text-slate-700 font-medium text-sm">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for &ldquo;AI&rdquo;, &ldquo;Shopify&rdquo;, &ldquo;SEO&rdquo;, or &ldquo;Hosting&rdquo;.</p>
            </div>
          )}

          {!query && (
            <div className="py-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Trending Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'ChatGPT vs Claude', url: '/compare/chatgpt-vs-claude' },
                  { label: 'AI Writing Tools', url: '/category/ai-writing' },
                  { label: 'Best E-commerce Platforms', url: '/category/ecommerce' },
                  { label: 'Shopify Deals', url: '/deals' },
                  { label: 'Free AI Product Description Generator', url: '/free-tools/product-description-generator' },
                  { label: 'Semrush Review', url: '/tools/semrush' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(item.url)}
                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full font-medium transition-colors flex items-center gap-1.5"
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={11} className="text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tools Results */}
          {results.tools.length > 0 && (
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
                <Wrench size={13} className="text-blue-600" />
                Software & AI Tools ({results.tools.length})
              </span>
              <div className="space-y-1.5">
                {results.tools.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => handleSelect(`/tools/${tool.slug}`)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-50 border border-slate-200 relative shrink-0">
                        <Image
                          src={tool.logo}
                          alt={tool.name}
                          width={32}
                          height={32}
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900 text-xs group-hover:text-blue-600 transition-colors">
                            {tool.name}
                          </span>
                          <span className="text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                            {tool.categoryName}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 truncate">{tool.tagline}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-blue-700 shrink-0">
                      ★ {tool.rating}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Free Tools Results */}
          {results.freeTools.length > 0 && (
            <div className="pt-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
                <Sparkles size={13} className="text-purple-600" />
                Free AI Tools ({results.freeTools.length})
              </span>
              <div className="space-y-1.5">
                {results.freeTools.map(ft => (
                  <button
                    key={ft.id}
                    onClick={() => handleSelect(`/free-tools/${ft.slug}`)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50/50 border border-transparent hover:border-purple-200/60 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 text-xs group-hover:text-purple-700 transition-colors">
                        {ft.name}
                      </span>
                      <p className="text-[11px] text-slate-600 line-clamp-1">{ft.description}</p>
                    </div>
                    <span className="text-[10px] uppercase font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full shrink-0">
                      100% Free
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Comparisons Results */}
          {results.comparisons.length > 0 && (
            <div className="pt-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
                <Scale size={13} className="text-blue-600" />
                Head-to-Head Comparisons ({results.comparisons.length})
              </span>
              <div className="space-y-1.5">
                {results.comparisons.map(comp => (
                  <button
                    key={comp.id}
                    onClick={() => handleSelect(`/compare/${comp.slug}`)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 text-xs group-hover:text-blue-600 transition-colors">
                        {comp.title}
                      </span>
                      <p className="text-[11px] text-slate-600 truncate">{comp.summary}</p>
                    </div>
                    <ArrowRight size={13} className="text-slate-400 group-hover:text-blue-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Deals Results */}
          {results.deals.length > 0 && (
            <div className="pt-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
                <Tag size={13} className="text-blue-600" />
                Verified Deals & Discounts ({results.deals.length})
              </span>
              <div className="space-y-1.5">
                {results.deals.map(deal => (
                  <button
                    key={deal.id}
                    onClick={() => handleSelect('/deals')}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-blue-50/40 border border-transparent hover:border-blue-200/60 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 text-xs group-hover:text-blue-700 transition-colors">
                        {deal.title}
                      </span>
                      <p className="text-[11px] text-slate-600">{deal.toolName} • {deal.terms}</p>
                    </div>
                    <span className="text-xs font-bold text-white bg-blue-600 px-2 py-0.5 rounded-md shrink-0">
                      {deal.discount}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Guides Results */}
          {results.guides.length > 0 && (
            <div className="pt-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
                <BookOpen size={13} className="text-indigo-600" />
                Expert Guides & Tutorials ({results.guides.length})
              </span>
              <div className="space-y-1.5">
                {results.guides.map(guide => (
                  <button
                    key={guide.id}
                    onClick={() => handleSelect(`/guides/${guide.slug}`)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 text-xs group-hover:text-indigo-600 transition-colors">
                        {guide.title}
                      </span>
                      <p className="text-[11px] text-slate-600 truncate">{guide.excerpt}</p>
                    </div>
                    <ArrowRight size={13} className="text-slate-400 group-hover:text-indigo-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span>Powered by C2R Store Online Search Engine</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Press <kbd className="font-mono bg-slate-200 px-1.5 py-0.5 rounded text-[10px]">ESC</kbd> to exit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
