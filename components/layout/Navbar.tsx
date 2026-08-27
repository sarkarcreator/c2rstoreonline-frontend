'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Menu,
  X,
  ExternalLink,
  Sparkles,
  Shield,
  Layers,
  Scale,
  Tag,
  BookOpen,
  Wrench
} from 'lucide-react';
import { SearchModal } from './SearchModal';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const pathname = usePathname();

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: 'All Tools', href: '/tools', icon: Wrench },
    { name: 'Categories', href: '/categories', icon: Layers },
    { name: 'Comparisons', href: '/comparisons', icon: Scale },
    { name: 'Deals & Discounts', href: '/deals', icon: Tag, badge: 'Hot' },
    { name: 'Free AI Tools', href: '/free-tools', icon: Sparkles, badge: 'Free' },
    { name: 'Guides', href: '/guides', icon: BookOpen }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 transition-all shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px] gap-4">
            {/* Brand Logo */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2.5 group">
                <span className="text-xl font-extrabold tracking-tight text-[#0F172A]">
                  C2R<span className="text-blue-600">STORE</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/70">
                  ONLINE
                </span>
              </Link>

              {/* Main Ecosystem Link */}
              <a
                href="https://c2rstore.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full border border-slate-200 transition-colors ml-1"
                title="Visit our main e-commerce flagship store"
              >
                <span>Flagship: c2rstore.com</span>
                <ExternalLink size={10} />
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-500">
              {navLinks.map(link => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-all flex items-center gap-1.5 py-1 ${
                      isActive
                        ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-0.5'
                        : 'hover:text-slate-900'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span
                        className={`text-[10px] font-bold uppercase px-1.5 py-0.2 rounded-full ${
                          link.badge === 'Free'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions: Search, Admin, Mobile Toggle */}
            <div className="flex items-center gap-3">
              {/* Search Trigger Button */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 text-slate-500 px-3.5 py-2 rounded-xl text-xs font-medium border border-slate-200 transition-all sm:min-w-[190px] justify-between group shadow-2xs"
                aria-label="Search tools"
              >
                <div className="flex items-center gap-2">
                  <Search size={15} className="text-slate-400 group-hover:text-slate-700" />
                  <span className="hidden sm:inline">Search tools, AI, deals...</span>
                  <span className="sm:hidden">Search...</span>
                </div>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-500 shadow-2xs">
                  ⌘K
                </kbd>
              </button>

              {/* Admin Portal Quick Link */}
              <Link
                href="/admin"
                className="hidden sm:inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="Admin Dashboard"
              >
                <Shield size={14} />
                <span className="hidden md:inline">Admin</span>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        link.badge === 'Free'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="https://c2rstore.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200"
              >
                <span>Visit Main Flagship Store (c2rstore.com)</span>
                <ExternalLink size={14} />
              </a>

              <Link
                href="/admin"
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100"
              >
                <Shield size={14} />
                <span>Admin Operations Center</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
}
