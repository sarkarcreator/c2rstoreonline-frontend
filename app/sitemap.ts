import { MetadataRoute } from 'next';
import { contentApi as db } from '@/lib/api/content';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://c2rstore.online';
  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/tools`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/categories`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/comparisons`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/deals`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/free-tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/disclosure`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/editorial-standards`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 }
  ];

  const [
    { tools },
    categories,
    comparisons,
    freeTools,
    guides
  ] = await Promise.all([
    db.getTools({ limit: 100 }),
    db.getCategories(),
    db.getComparisons(),
    db.getFreeTools(),
    db.getGuides()
  ]);

  // Dynamic Tools
  const toolRoutes: MetadataRoute.Sitemap = tools.map(tool => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(tool.updatedAt || now),
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  // Dynamic Categories
  const categoryRoutes: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7
  }));

  // Dynamic Comparisons
  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map(comp => ({
    url: `${baseUrl}/compare/${comp.slug}`,
    lastModified: new Date(comp.updatedAt || now),
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  // Dynamic Free Tools
  const freeToolRoutes: MetadataRoute.Sitemap = freeTools.map(ft => ({
    url: `${baseUrl}/free-tools/${ft.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  // Dynamic Guides
  const guideRoutes: MetadataRoute.Sitemap = guides.map(g => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  return [
    ...staticRoutes,
    ...toolRoutes,
    ...categoryRoutes,
    ...comparisonRoutes,
    ...freeToolRoutes,
    ...guideRoutes
  ];
}
