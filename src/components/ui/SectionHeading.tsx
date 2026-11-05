import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Reveal from './Reveal';

interface SectionHeadingProps {
  kicker: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark' | 'theme';
  className?: string;
}

export default function SectionHeading({
  kicker,
  title,
  subtitle,
  align = 'left',
  tone = 'light',
  className,
}: SectionHeadingProps) {
  const center = align === 'center';
  return (
    <Reveal className={cn(center && 'mx-auto text-center', 'max-w-3xl', className)}>
      <span
        className={cn(
          'text-xs font-extrabold uppercase tracking-[0.35em]',
          tone === 'dark' ? 'text-brand-amber' : tone === 'theme' ? 'text-[var(--t-gold)]' : 'text-brand-pink',
        )}
      >
        {kicker}
      </span>
      <h2
        className={cn(
          'mt-4 text-4xl leading-[1.05] sm:text-5xl',
          tone === 'dark' ? 'text-white' : tone === 'theme' ? 'font-theme font-semibold text-[var(--t-ink)]' : 'text-brand-indigo',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed sm:text-lg',
            tone === 'dark' ? 'text-white/75' : tone === 'theme' ? 'text-[var(--t-ink)]/75' : 'text-brand-ink/70',
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
