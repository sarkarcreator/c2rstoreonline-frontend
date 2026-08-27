import { api } from './client';

export const adminApi = {
  session: () => api<{ authenticated: boolean }>('/api/admin/auth/session'),
  login: (password: string) => api('/api/admin/auth/login', { method: 'POST', body: JSON.stringify({ password }) }),
  logout: () => api('/api/admin/auth/logout', { method: 'POST' }),
  stats: () => api('/api/admin/stats'),
  createTool: (data: unknown) => api('/api/admin/tools', { method: 'POST', body: JSON.stringify(data) }),
};
