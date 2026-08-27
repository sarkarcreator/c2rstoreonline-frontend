import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://c2rstore.online'
      },
      ...items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 2,
        name: item.name,
        ...(item.url ? { item: `https://c2rstore.online${item.url}` } : {})
      }))
    ]
  };

  return (
    <nav className="flex items-center text-xs text-zinc-600 mb-6 flex-wrap gap-1.5" aria-label="Breadcrumb">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
      >
        <Home size={14} />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight size={12} className="text-zinc-400 shrink-0" />
            {item.url && !isLast ? (
              <Link
                href={item.url}
                className="hover:text-emerald-600 transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span className="font-medium text-zinc-900 truncate max-w-[200px] sm:max-w-none">
                {item.name}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
