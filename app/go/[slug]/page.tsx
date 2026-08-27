import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AffiliateRedirectPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Perform direct server-side redirect to the secure affiliate tracking endpoint
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
  if (!apiUrl) redirect('/tools');
  redirect(`${apiUrl}/api/go/${encodeURIComponent(slug)}`);
}
