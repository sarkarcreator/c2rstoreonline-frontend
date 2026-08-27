import { api } from './client';
export const generateAi = (data: unknown) => api('/api/ai/generate', { method: 'POST', body: JSON.stringify(data) });
