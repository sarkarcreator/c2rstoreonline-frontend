'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Shield,
  Lock,
  DollarSign,
  MousePointerClick,
  Eye,
  Users,
  Tag,
  Wrench,
  TrendingUp,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  ExternalLink,
  Mail,
  RefreshCw,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { formatDateUtc, formatDateTimeUtc } from '@/lib/utils';
import { adminApi } from '@/lib/api/admin';

export default function AdminDashboardPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  // Dashboard Data
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'clicks' | 'subscribers' | 'inbox'>('overview');

  // Tool form modal state
  const [showAddTool, setShowAddTool] = useState(false);
  const [toolForm, setToolForm] = useState({
    name: '',
    slug: '',
    tagline: '',
    description: '',
    categoryId: 'cat-1',
    categoryName: 'AI Writing',
    subCategory: 'Copywriting',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&h=128&fit=crop&crop=faces&q=80',
    priceType: 'Freemium',
    startingPrice: '$19/mo',
    rating: 4.8,
    reviewCount: 150,
    affiliateUrl: 'https://c2rstore.online',
    officialUrl: 'https://c2rstore.online',
    features: 'Automated AI workflows, Multi-language support, API integrations',
    pros: 'Intuitive interface, Fast generation speed',
    cons: 'Tiered export limits',
    targetAudience: 'Content creators, E-commerce store managers, Digital agencies'
  });

  // Check existing session
  useEffect(() => {
    adminApi.session()
      .then(data => {
        if (data?.authenticated) {
          setAuthenticated(true);
        }
      })
      .catch(() => {})
      .finally(() => {
        setCheckingSession(false);
      });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const data: any = await adminApi.login(password);
      if (data.success) {
        setAuthenticated(true);
        fetchStats();
      } else {
        setAuthError(data.error || 'Invalid credentials');
      }
    } catch {
      setAuthError('Connection error');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await adminApi.logout();
    } catch {}
    setAuthenticated(false);
    setStatsData(null);
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      setStatsData(await adminApi.stats());
    } catch (err) {
      console.error('Error fetching admin stats', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchStats();
    }
  }, [authenticated]);

  const handleCreateTool = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...toolForm,
        rating: Number(toolForm.rating),
        reviewCount: Number(toolForm.reviewCount),
        features: toolForm.features.split(',').map(s => s.trim()),
        pros: toolForm.pros.split(',').map(s => s.trim()),
        cons: toolForm.cons.split(',').map(s => s.trim()),
        pricingDetails: `Starting at ${toolForm.startingPrice}`,
        isFeatured: true,
        isTrending: true,
        isVerified: true,
        alternatives: []
      };

      await adminApi.createTool(payload);
      {
        setShowAddTool(false);
        fetchStats();
      }
    } catch (err) {
      console.error('Error creating tool', err);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center">
        <RefreshCw size={24} className="animate-spin text-slate-400" />
      </div>
    );
  }

  // 1. Password Protection Screen
  if (!authenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-sm">
            <Lock size={22} className="text-blue-400" />
          </div>

          <div className="text-center space-y-1">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              C2R Admin Portal
            </h1>
            <p className="text-xs text-slate-500">
              Enter your administrative passkey to access operational analytics, clicks, and directory management.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Admin Passkey
              </label>
              <input
                type="password"
                required
                placeholder="Enter ADMIN_PASSWORD..."
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-2.5">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              {authLoading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <Shield size={14} />
                  <span>Access Dashboard</span>
                </>
              )}
            </button>
          </form>

          <p className="text-[11px] text-slate-400 text-center">
            Configured via <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-600">ADMIN_PASSWORD</code> environment variable.
          </p>
        </div>
      </div>
    );
  }

  const stats = statsData?.stats;
  const clicks = statsData?.clicks || [];
  const subscribers = statsData?.subscribers || [];
  const messages = statsData?.messages || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold">
            <Shield size={20} className="text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                C2R Store Online Admin Center
              </h1>
              <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                Active Session
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Affiliate Tracking • Directory Management • Lead Subscribers • Inquiries
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchStats}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Catalog Tools</span>
              <Wrench size={15} className="text-slate-400" />
            </div>
            <span className="text-2xl font-black text-slate-900">{stats.totalTools}</span>
            <span className="text-[10px] text-blue-700 block font-medium mt-0.5">Vetted listings</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Total Views</span>
              <Eye size={15} className="text-slate-400" />
            </div>
            <span className="text-2xl font-black text-slate-900">{stats.totalViews.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 block font-medium mt-0.5">Directory impressions</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Affiliate Clicks</span>
              <MousePointerClick size={15} className="text-blue-600" />
            </div>
            <span className="text-2xl font-black text-blue-600">{stats.totalClicks.toLocaleString()}</span>
            <span className="text-[10px] text-blue-700 block font-medium mt-0.5">Outbound referrals</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Active Deals</span>
              <Tag size={15} className="text-amber-500" />
            </div>
            <span className="text-2xl font-black text-slate-900">{stats.activeDeals}</span>
            <span className="text-[10px] text-amber-700 block font-medium mt-0.5">Live promo codes</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Subscribers</span>
              <Users size={15} className="text-purple-600" />
            </div>
            <span className="text-2xl font-black text-slate-900">{stats.totalSubscribers}</span>
            <span className="text-[10px] text-purple-700 block font-medium mt-0.5">Newsletter leads</span>
          </div>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Top Performers' },
          { id: 'clicks', label: `Click Log (${clicks.length})` },
          { id: 'subscribers', label: `Subscribers (${subscribers.length})` },
          { id: 'inbox', label: `Inquiries (${messages.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors shrink-0 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Top Performing Tools by Conversion & Clicks
              </h2>
              <button
                onClick={() => setShowAddTool(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <Plus size={14} />
                <span>Add New Tool</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                    <th className="py-3 px-4 font-bold rounded-l-xl">Software Name</th>
                    <th className="py-3 px-4 font-bold">Category</th>
                    <th className="py-3 px-4 font-bold">Total Views</th>
                    <th className="py-3 px-4 font-bold">Affiliate Clicks</th>
                    <th className="py-3 px-4 font-bold">CTR</th>
                    <th className="py-3 px-4 font-bold rounded-r-xl">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stats?.topTools?.map((t: any) => (
                    <tr key={t.id} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {t.name}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {t.category}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {t.views.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-blue-600">
                        {t.clicks.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {t.ctr}
                      </td>
                      <td className="py-3.5 px-4">
                        <Link
                          href={`/tools/${t.slug}`}
                          className="text-blue-600 hover:underline font-semibold"
                        >
                          View Listing →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Clicks */}
      {activeTab === 'clicks' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            Real-Time Outbound Affiliate Click Stream
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th className="py-3 px-4 font-bold rounded-l-xl">Timestamp</th>
                  <th className="py-3 px-4 font-bold">Software Tool</th>
                  <th className="py-3 px-4 font-bold">UTM Source / Campaign</th>
                  <th className="py-3 px-4 font-bold">Referrer</th>
                  <th className="py-3 px-4 font-bold rounded-r-xl">Target URL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clicks.map((clk: any) => (
                  <tr key={clk.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-500 font-mono text-xs">
                      {formatDateTimeUtc(clk.timestamp)}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {clk.toolName}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <span className="bg-slate-100 px-2 py-0.5 rounded font-mono text-[11px]">
                        {clk.utmSource} / {clk.utmCampaign}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 truncate max-w-[150px]">
                      {clk.referrer || 'Direct'}
                    </td>
                    <td className="py-3 px-4 text-slate-500 truncate max-w-[200px]">
                      <a
                        href={clk.targetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <span className="truncate">{clk.targetUrl}</span>
                        <ExternalLink size={11} className="shrink-0" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Subscribers */}
      {activeTab === 'subscribers' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            Newsletter Subscribers & Leads
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th className="py-3 px-4 font-bold rounded-l-xl">Subscriber Email</th>
                  <th className="py-3 px-4 font-bold">Acquisition Source</th>
                  <th className="py-3 px-4 font-bold">Date Joined</th>
                  <th className="py-3 px-4 font-bold rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subscribers.map((sub: any) => (
                  <tr key={sub.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900 font-mono">
                      {sub.email}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {sub.source}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {formatDateUtc(sub.subscribedAt, { monthFormat: 'short' })}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Inbox */}
      {activeTab === 'inbox' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            Inquiries & Tool Submissions
          </h2>

          {messages.length === 0 ? (
            <p className="text-xs text-slate-500 py-8 text-center">
              No new inquiries in the inbox.
            </p>
          ) : (
            <div className="space-y-3">
              {messages.map((msg: any) => (
                <div key={msg.id} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{msg.name} ({msg.email})</span>
                    <span className="text-slate-400 font-mono">{formatDateUtc(msg.submittedAt, { monthFormat: 'short' })}</span>
                  </div>
                  <span className="inline-block bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded text-[10px]">
                    {msg.inquiryType}
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal: Add New Tool */}
      {showAddTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Add New Software to Directory</h2>
              <button
                onClick={() => setShowAddTool(false)}
                className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTool} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Software Name</label>
                <input
                  type="text"
                  required
                  value={toolForm.name}
                  onChange={e => setToolForm({ ...toolForm, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Slug</label>
                <input
                  type="text"
                  required
                  value={toolForm.slug}
                  onChange={e => setToolForm({ ...toolForm, slug: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tagline</label>
                <input
                  type="text"
                  required
                  value={toolForm.tagline}
                  onChange={e => setToolForm({ ...toolForm, tagline: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={toolForm.description}
                  onChange={e => setToolForm({ ...toolForm, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price Model</label>
                  <select
                    value={toolForm.priceType}
                    onChange={e => setToolForm({ ...toolForm, priceType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2"
                  >
                    <option value="Free">Free</option>
                    <option value="Freemium">Freemium</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Starting Price</label>
                  <input
                    type="text"
                    value={toolForm.startingPrice}
                    onChange={e => setToolForm({ ...toolForm, startingPrice: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Affiliate Outbound URL</label>
                <input
                  type="text"
                  required
                  value={toolForm.affiliateUrl}
                  onChange={e => setToolForm({ ...toolForm, affiliateUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTool(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer"
                >
                  Save Tool
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
