import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Deterministic UTC date formatter to prevent hydration mismatches across different server and client timezones.
 */
export function formatDateUtc(
  dateInput: string | Date | undefined | null,
  options: { monthFormat?: 'short' | 'long' } = {}
): string {
  if (!dateInput) return '';
  try {
    const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return '';
    const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const longMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = options.monthFormat === 'long' ? longMonths[d.getUTCMonth()] : shortMonths[d.getUTCMonth()];
    return `${month} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  } catch {
    return '';
  }
}

export function formatDateTimeUtc(
  dateInput: string | Date | undefined | null
): string {
  if (!dateInput) return '';
  try {
    const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return '';
    const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = shortMonths[d.getUTCMonth()];
    const hours = String(d.getUTCHours()).padStart(2, '0');
    const minutes = String(d.getUTCMinutes()).padStart(2, '0');
    const seconds = String(d.getUTCSeconds()).padStart(2, '0');
    return `${month} ${d.getUTCDate()} ${hours}:${minutes}:${seconds} UTC`;
  } catch {
    return '';
  }
}


