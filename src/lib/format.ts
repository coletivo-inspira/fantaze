const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export const formatPrice = (value: number) => brl.format(value);

/** Converte yyyy-mm-dd em Date local (evita deslocamento de fuso) */
export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatLongDate(iso: string): string {
  return parseISODate(iso).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });
}

export function formatShortDate(iso: string): string {
  return parseISODate(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

export function formatPeriod(startIso: string, endIso: string): string {
  return `${formatShortDate(startIso)} a ${formatShortDate(endIso)}`;
}

/** Dias restantes até a data (0 quando já passou) */
export function daysUntil(iso: string, from: Date = new Date()): number {
  const end = parseISODate(iso);
  end.setHours(23, 59, 59, 999);
  const diff = end.getTime() - from.getTime();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}
