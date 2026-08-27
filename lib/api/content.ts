import { api } from './client';
import type { Category, Comparison, Deal, FreeTool, Guide, Tool } from '@/lib/types';

type ToolQuery = Record<string, string | number | boolean | undefined>;
export type SearchResults = {
  tools: Tool[];
  categories: Category[];
  comparisons: Comparison[];
  deals: Deal[];
  guides: Guide[];
  freeTools: FreeTool[];
};

const query = (params: ToolQuery = {}) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => value !== undefined && search.set(key, String(value)));
  return search.size ? `?${search}` : '';
};

export const contentApi = {
  async getTools(params: ToolQuery = {}) { return api<{ tools: Tool[]; total: number }>(`/api/tools${query(params)}`); },
  async getToolBySlug(slug: string) { return api<{ tool: Tool }>(`/api/tools/${encodeURIComponent(slug)}`).then(r => r.tool); },
  async getCategories() { return api<{ categories: Category[] }>('/api/categories').then(r => r.categories); },
  async getCategoryBySlug(slug: string) { return api<{ category: Category }>(`/api/categories/${encodeURIComponent(slug)}`).then(r => r.category); },
  async getComparisons() { return api<{ comparisons: Comparison[] }>('/api/comparisons').then(r => r.comparisons); },
  async getComparisonBySlug(slug: string) { return api<{ comparison: Comparison }>(`/api/comparisons/${encodeURIComponent(slug)}`).then(r => r.comparison); },
  async getDeals(params: ToolQuery = {}) { return api<{ deals: Deal[] }>(`/api/deals${query(params)}`).then(r => r.deals); },
  async getGuides() { return api<{ guides: Guide[] }>('/api/guides').then(r => r.guides); },
  async getGuideBySlug(slug: string) { return api<{ guide: Guide }>(`/api/guides/${encodeURIComponent(slug)}`).then(r => r.guide); },
  async getFreeTools() { return api<{ freeTools: FreeTool[] }>('/api/free-tools').then(r => r.freeTools); },
  async getFreeToolBySlug(slug: string) { return api<{ freeTool: FreeTool }>(`/api/free-tools/${encodeURIComponent(slug)}`).then(r => r.freeTool); },
  async search(q: string) { return api<SearchResults>(`/api/search?q=${encodeURIComponent(q)}`); },
};
