const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) { super(message); }
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL must be configured');
  const response = await fetch(`${apiUrl}${path}`, {
    ...init,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...init.headers },
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(error.message || error.error || 'API request failed', response.status);
  }
  return response.status === 204 ? undefined as T : response.json();
}
