import { ArrowRight } from 'lucide-react';
import { useCurrentTheme } from '../../hooks/useCurrentTheme';
import { formatPeriod } from '../../lib/format';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import ThemeScope from '../ui/ThemeScope';
import ThemeScene from '../theme/ThemeScene';
import ThemeCountdown from '../theme/ThemeCountdown';

export default function ThemeSpotlight() {
  const { theme, daysLeft } = useCurrentTheme();

  return (
    <ThemeScope palette={theme.palette}>
      <section className="relative overflow-hidden bg-[var(--t-bg)] py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--t-gold)] to-transparent" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-2">
          <Reveal>
            <span className="text-xs font-extrabold uppercase tracking-[0.35em] text-[var(--t-gold)]">
              Tema do mês · {formatPeriod(theme.startsAt, theme.endsAt)}
            </span>
            <h2 className="mt-4 break-words font-theme text-5xl font-semibold italic leading-none text-[var(--t-ink)] sm:text-7xl lg:text-8xl">
              {theme.name}
            </h2>
            <p className="mt-3 font-theme text-2xl text-[var(--t-gold)] sm:text-3xl">{theme.badge}</p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--t-ink)]/75">{theme.description}</p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {theme.highlights.map((h) => (
                <li key={h.title} className="rounded-2xl border border-[var(--t-gold)]/30 bg-[var(--t-surface)] p-4">
                  <p className="font-theme text-xl font-semibold text-[var(--t-ink)]">{h.title}</p>
                  <p className="mt-1 text-sm text-[var(--t-ink)]/65">{h.description}</p>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button to="/tema-do-mes" variant="theme" size="lg" icon={<ArrowRight size={18} />}>
                Explorar o tema
              </Button>
              <ThemeCountdown daysLeft={daysLeft} />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative mx-auto grid w-full max-w-lg grid-cols-2 gap-4">
            <div className="col-span-2 aspect-[16/9] overflow-hidden rounded-[2rem] border-4 border-white shadow-xl">
              <ThemeScene kind="ballroom" className="h-full w-full" />
            </div>
            <div className="aspect-square overflow-hidden rounded-[2rem] border-4 border-white shadow-xl">
              <ThemeScene kind="garden" className="h-full w-full" />
            </div>
            <div className="aspect-square overflow-hidden rounded-[2rem] border-4 border-white shadow-xl">
              <ThemeScene kind="tea" className="h-full w-full" />
            </div>
          </Reveal>
        </div>
      </section>
    </ThemeScope>
  );
}
