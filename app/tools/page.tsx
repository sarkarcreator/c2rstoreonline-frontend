'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Tool, Category } from '@/lib/types';
import { contentApi } from '@/lib/api/content';
import { ToolCard } from '@/components/ui/ToolCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import {
  Search,
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  X,
  Sparkles,
  Wrench
} from 'lucide-react';

export default function ToolsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriceType, setSelectedPriceType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'newest' | 'name'>('popularity');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  const [categories, setCategories] = useState<Category[]>([]);
  const [allTools, setAllTools] = useState<Tool[]>([]);

  useEffect(() => {
    contentApi.getTools({ limit: 100 })
      .then(data => {
        if (data?.tools && Array.isArray(data.tools) && data.tools.length > 0) {
          setAllTools(data.tools);
        }
      })
      .catch(() => {});

    contentApi.getCategories()
      .then(categories => ({ categories }))
      .then(data => {
        if (data?.categories && Array.isArray(data.categories) && data.categories.length > 0) {
          setCategories(data.categories);
        }
      })
      .catch(() => {});
  }, []);

  const filteredTools = useMemo(() => {
    let list = [...allTools];

    if (selectedCategory !== 'All') {
      const cat = categories.find(c => c.slug === selectedCategory);
      if (cat) {
        list = list.filter(t => t.categoryId === cat.id);
      }
    }

    if (selectedPriceType !== 'All') {
      list = list.filter(t => t.priceType.toLowerCase() === selectedPriceType.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        t =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.categoryName.toLowerCase().includes(q) ||
          t.subCategory.toLowerCase().includes(q) ||
          (t.features && t.features.some(f => f.toLowerCase().includes(q)))
      );
    }

    switch (sortBy) {
      case 'popularity':
        list.sort((a, b) => ((b.viewsCount || 0) + (b.clicksCount || 0) * 5) - ((a.viewsCount || 0) + (a.clicksCount || 0) * 5));
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return list;
  }, [allTools, categories, selectedCategory, selectedPriceType, searchQuery, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPriceType('All');
    setSortBy('popularity');
  };

  const hasActiveFilters =
    searchQuery !== '' || selectedCategory !== 'All' || selectedPriceType !== 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'All Software & AI Tools' }]} />

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
            <Wrench size={16} />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Comprehensive Software Catalog
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Browse All AI & SaaS Software Tools
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl">
          Compare hand-vetted tools across AI writing, e-commerce, SEO, automation, and hosting. Filter by pricing model, ratings, and features.
        </p>
      </div>

      {/* Control Bar: Search + Category Pills + Layout Switcher */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 mb-8">
        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by tool name, feature, or keyword..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
            {/* Price Filter */}
            <select
              value={selectedPriceType}
              onChange={e => setSelectedPriceType(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Pricing Types</option>
              <option value="Free">Free</option>
              <option value="Freemium">Freemium</option>
              <option value="Paid">Paid</option>
              <option value="Free Trial">Free Trial</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="popularity">Sort: Most Popular</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="newest">Sort: Recently Added</option>
              <option value="name">Sort: A to Z</option>
            </select>

            {/* Layout Toggles */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setLayout('grid')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                  layout === 'grid'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                title="Grid view"
              >
                <Grid size={15} />
              </button>
              <button
                onClick={() => setLayout('list')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                  layout === 'list'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                title="List view"
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Categories ({allTools.length})
          </button>
          {categories.map(cat => {
            const count = allTools.filter(t => t.categoryId === cat.id).length;
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Active Filter Clear Bar */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500">
              Showing <strong className="text-slate-900">{filteredTools.length}</strong> of {allTools.length} tools
            </span>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center gap-1"
            >
              <X size={12} /> Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Tools Grid / List */}
      {filteredTools.length > 0 ? (
        <div
          className={
            layout === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
              : 'space-y-4'
          }
        >
          {filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} viewMode={layout} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <Filter size={24} />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">No software tools matched your criteria</h3>
          <p className="text-xs text-slate-500 mb-6">
            Try adjusting your search query or removing category/price filters to explore the catalog.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
