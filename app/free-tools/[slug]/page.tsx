'use client';

import React, { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FreeTool, Tool } from '@/lib/types';
import { contentApi } from '@/lib/api/content';
import { generateAi } from '@/lib/api/ai';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ToolCard } from '@/components/ui/ToolCard';
import {
  Sparkles,
  Copy,
  Check,
  Send,
  RefreshCw,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FreeToolClientPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [tool, setTool] = useState<FreeTool | null>(null);
  const [recommendedTools, setRecommendedTools] = useState<Tool[]>([]);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [pageLoading, setPageLoading] = useState(true);

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    contentApi.getFreeToolBySlug(slug)
      .then(tool => {
        setTool(tool);
        setFormValues(Object.fromEntries(tool.inputs.map(input => [input.id, input.options?.[0] || ''])));
      })
      .catch(() => {});

    contentApi.getTools({ featured: true, limit: 2 }).then(data => setRecommendedTools(data.tools)).catch(() => {}).finally(() => setPageLoading(false));
  }, [slug]);

  if (pageLoading) {
    return <div className="min-h-[50vh] flex items-center justify-center"><RefreshCw size={24} className="animate-spin text-purple-600" /></div>;
  }
  if (!tool) {
    notFound();
  }

  const handleInputChange = (id: string, value: string) => {
    setFormValues(prev => ({ ...prev, [id]: value }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOutput('');

    try {
      const data: any = await generateAi({ toolSlug: tool.slug, inputValues: formValues });
      if (data.result) {
        setOutput(data.result);
      } else {
        setError(data.error || 'Generation failed. Please try again.');
      }
    } catch {
      setError('Network connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch {}
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Free AI Tools', url: '/free-tools' },
          { name: tool.name }
        ]}
      />

      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
                {tool.category}
              </span>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                ⚡ 100% Free & Unlimited
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {tool.name}
            </h1>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              {tool.description}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 bg-slate-50 border border-slate-200 p-2.5 rounded-2xl text-xs text-slate-600">
            <Sparkles size={16} className="text-purple-600 shrink-0" />
            <span>Real-time Gemini AI generation engine</span>
          </div>
        </div>
      </div>

      {/* Two-Column Interactive Generator Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>Input Parameters</span>
            </h2>
            <span className="text-xs text-slate-400">Step 1 of 2</span>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            {tool.inputs.map(input => (
              <div key={input.id} className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  {input.label} {input.required && <span className="text-rose-500">*</span>}
                </label>

                {input.type === 'textarea' ? (
                  <textarea
                    rows={4}
                    required={input.required}
                    placeholder={input.placeholder}
                    value={formValues[input.id] || ''}
                    onChange={e => handleInputChange(input.id, e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all resize-y"
                  />
                ) : input.type === 'select' ? (
                  <select
                    value={formValues[input.id] || ''}
                    onChange={e => handleInputChange(input.id, e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-purple-500"
                  >
                    {input.options?.map(opt => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    required={input.required}
                    placeholder={input.placeholder}
                    value={formValues[input.id] || ''}
                    onChange={e => handleInputChange(input.id, e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all"
                  />
                )}
              </div>
            ))}

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white text-sm font-bold shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Synthesizing with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Generate Free Copy Now</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Examples */}
          {tool.examples && tool.examples.length > 0 && (
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Quick Preset Examples:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {tool.examples.map((ex, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setFormValues(ex.inputValues || (ex as any).inputs || {});
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-50 hover:text-purple-700 text-[11px] font-medium text-slate-600 border border-slate-200 transition-colors"
                  >
                    {ex.title || (ex as any).label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Output Box */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Generated Result</h2>
              <p className="text-xs text-slate-500">Edit, copy, or export your AI-generated assets</p>
            </div>

            {output && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy Result'}</span>
              </button>
            )}
          </div>

          <div className="min-h-[360px] bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
            {output ? (
              <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
                {output}
              </div>
            ) : loading ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center space-y-3">
                <RefreshCw size={28} className="animate-spin text-purple-600" />
                <p className="text-xs font-bold text-slate-700">Synthesizing content with Gemini AI...</p>
                <p className="text-[11px] text-slate-400 max-w-xs">
                  Optimizing for conversion rates, clarity, and keyword relevance.
                </p>
              </div>
            ) : (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Sparkles size={22} />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Ready to generate</h3>
                <p className="text-xs text-slate-500 max-w-sm">
                  Fill in the input parameters on the left and click &quot;Generate Free Copy Now&quot; to see instant AI results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Full-Scale Tools */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Need More Power? Explore Top-Rated Professional Tools
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Free tools are great for quick snippets. When you need automated workflows, bulk generation, or team seats, consider these leading platforms:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedTools.map(t => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
