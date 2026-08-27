import { api } from './client';
export const subscribeNewsletter = (data: unknown) => api('/api/newsletter/subscribe', { method: 'POST', body: JSON.stringify(data) });
export const submitContact = (data: unknown) => api('/api/contact', { method: 'POST', body: JSON.stringify(data) });
