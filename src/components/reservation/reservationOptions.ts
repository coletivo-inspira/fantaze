import { restaurant } from '../../data/restaurant';
import { toISODate } from '../../lib/format';
import type { ReservationRequest } from '../../types';

export const experiences: { id: ReservationRequest['experience']; title: string; description: string }[] = [
  { id: 'salao', title: 'Mesa no salão', description: 'Jantar ou almoço completo, com a ambientação do tema.' },
  { id: 'cha', title: 'Chá das Cinco', description: 'Torre de doces, scones e blends de chá. Ideal para a tarde.' },
  { id: 'celebracao', title: 'Mesa de celebração', description: 'Aniversários e ocasiões especiais, com um mimo da casa.' },
];

export interface DayOption {
  iso: string;
  weekday: string;
  day: string;
  month: string;
  open: boolean;
}

/** Próximos dias reservaveis a partir de hoje. */
export function buildDays(count = 21, from: Date = new Date()): DayOption[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + i);
    return {
      iso: toISODate(d),
      weekday: d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''),
      day: String(d.getDate()).padStart(2, '0'),
      month: d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''),
      open: restaurant.openWeekdays.includes(d.getDay()),
    };
  });
}
