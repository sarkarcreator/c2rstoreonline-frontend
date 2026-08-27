'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Mail, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitContact } from '@/lib/api/forms';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    inquiryType: 'Submit Software for Review',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data: any = await submitContact(formState);
      if (data.success) {
        setSubmitted(true);
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 }
        });
      } else {
        setError(data.error || 'Failed to submit form.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'Contact & Partnerships' }]} />

      <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <MessageSquare size={13} />
            <span>Get in Touch with our Editorial Staff</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
            Contact & Partner Submissions
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Have a new AI tool or SaaS to list? Want to provide an exclusive discount for our community? Or have an editorial question? Send us a message below.
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3">
            <CheckCircle2 size={36} className="text-emerald-600 mx-auto" />
            <h2 className="text-lg font-bold text-emerald-950">
              Message Received!
            </h2>
            <p className="text-xs text-emerald-800 max-w-md mx-auto">
              Thank you for contacting C2R Store Online. Our editorial and partnership team typically reviews incoming software submissions within 24–48 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormState({
                  name: '',
                  email: '',
                  inquiryType: 'Submit Software for Review',
                  message: ''
                });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors mt-2"
            >
              <span>Send Another Message</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-zinc-700 block">
                  Your Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-zinc-700 block">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formState.email}
                  onChange={e => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">
                Inquiry Type
              </label>
              <select
                value={formState.inquiryType}
                onChange={e => setFormState({ ...formState, inquiryType: e.target.value })}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 focus:outline-none focus:border-emerald-500"
              >
                <option value="Submit Software for Review">Submit Software Tool for Review</option>
                <option value="Exclusive Deal / Coupon">Provide Exclusive Promo Code / Deal</option>
                <option value="Affiliate Partnership">Affiliate Network Partnership</option>
                <option value="Editorial Correction">Editorial Feedback or Correction</option>
                <option value="General Inquiry">General Inquiries</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">
                Message & Tool Details <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={5}
                required
                placeholder="Include website URL, key capabilities, pricing model, or partner details..."
                value={formState.message}
                onChange={e => setFormState({ ...formState, message: e.target.value })}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>

            {error && (
              <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
            >
              {loading ? (
                <span>Submitting inquiry...</span>
              ) : (
                <>
                  <Send size={14} />
                  <span>Submit Message to Editorial Team</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
