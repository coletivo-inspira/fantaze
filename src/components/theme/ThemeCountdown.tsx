import { Hourglass } from 'lucide-react';
import { cn } from '../../lib/cn';

interface ThemeCountdownProps {
  daysLeft: number;
  className?: string;
}

export default function ThemeCountdown({ daysLeft, className }: ThemeCountdownProps) {
  const label =
    daysLeft === 0 ? 'Último dia do tema!' : daysLeft === 1 ? 'Falta 1 dia' : `Faltam ${daysLeft} dias`;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-[var(--t-ink)] px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-[var(--t-bg)]',
        className,
      )}
    >
      <Hourglass size={14} /> {label}
    </span>
  );
}
