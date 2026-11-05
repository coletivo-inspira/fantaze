import { motion } from 'framer-motion';
import { CalendarHeart, Music2, Shirt } from 'lucide-react';
import { useCurrentTheme } from '../hooks/useCurrentTheme';
import { formatPeriod } from '../lib/format';
import ThemeScope from '../components/ui/ThemeScope';
import ThemeScene from '../components/theme/ThemeScene';
import ThemeCountdown from '../components/theme/ThemeCountdown';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import Decor from '../components/ui/Decor';

export default function MonthlyTheme() {
  const { theme, daysLeft } = useCurrentTheme();

  return (
    <ThemeScope palette={theme.palette} className="bg-[var(--t-bg)]">
      {/* Hero do tema */}
      <header className="relative isolate overflow-hidden pt-28">
        <div className="absolute inset-0 -z-10">
          <ThemeScene kind="ballroom" className="h-full w-full opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--t-bg)]/20 via-[var(--t-bg)]/70 to-[var(--t-bg)]" />
        </div>
        <Decor name="sparkle" twinkle className="right-[10%] top-36 w-14" />
        <Decor name="butterfly" float className="left-[5%] top-48 hidden w-24 sm:block" />

        <div className="mx-auto max-w-5xl px-6 pb-16 sm:pb-24 pt-16 text-center md:px-10 lg:pb-32 lg:pt-24">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-extrabold uppercase tracking-[0.4em] text-[var(--t-gold)]"
          >
            Tema do mês · {formatPeriod(theme.startsAt, theme.endsAt)}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 break-words font-theme text-6xl font-semibold italic leading-[0.95] text-[var(--t-ink)] sm:text-8xl lg:text-9xl"
          >
            {theme.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-5 font-theme text-xl leading-snug text-[var(--t-ink)]/80 sm:mt-6 sm:text-4xl"
          >
            {theme.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <Button to="/reservas" variant="theme" size="lg" icon={<CalendarHeart size={20} />}>
              Reservar para o baile
            </Button>
            <ThemeCountdown daysLeft={daysLeft} />
          </motion.div>
        </div>
      </header>

      {/* Descrição */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center md:px-10">
        <Reveal>
          <p className="font-theme text-xl leading-relaxed text-[var(--t-ink)] sm:text-3xl">{theme.description}</p>
        </Reveal>
      </section>

      {/* Destaques */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <SectionHeading tone="theme" kicker="A experiência" title="O que torna esta temporada única" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {theme.highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.08}>
              <div className="h-full rounded-[2rem] border border-[var(--t-gold)]/35 bg-[var(--t-surface)] p-7 shadow-[0_20px_40px_-30px_rgba(31,42,74,0.5)] transition-transform duration-300 hover:-translate-y-2">
                <span className="font-theme text-5xl italic text-[var(--t-gold)]">0{i + 1}</span>
                <h3 className="mt-4 font-theme text-2xl font-semibold text-[var(--t-ink)]">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--t-ink)]/70">{h.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Ambientação */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <SectionHeading tone="theme" kicker="Ambientação" title="Três salas, uma temporada" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {theme.scenes.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12}>
              <figure className="group overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-xl">
                <div className="aspect-[4/5] overflow-hidden">
                  <ThemeScene kind={s.kind} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                </div>
                <figcaption className="p-5">
                  <p className="font-theme text-2xl font-semibold text-[var(--t-ink)]">{s.title}</p>
                  <p className="mt-1 text-sm text-[var(--t-ink)]/65">{s.caption}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Jornada */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:px-10">
        <SectionHeading tone="theme" kicker="Sua noite" title="Da chegada à última sobremesa" />
        <ol className="relative mt-12 space-y-8 border-l-2 border-[var(--t-gold)]/40 pl-8">
          {theme.moments.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.08}>
              <li className="relative">
                <span className="absolute -left-[2.65rem] top-1 grid h-5 w-5 place-items-center rounded-full bg-[var(--t-gold)] ring-4 ring-[var(--t-bg)]" />
                <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[var(--t-gold)]">{m.time}</p>
                <h3 className="mt-1 font-theme text-3xl font-semibold text-[var(--t-ink)]">{m.title}</h3>
                <p className="mt-1 text-[var(--t-ink)]/70">{m.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Dress code e trilha */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-2 md:px-10">
        <Reveal>
          <div className="h-full rounded-[2rem] bg-[var(--t-ink)] p-6 sm:p-8 text-[var(--t-bg)]">
            <Shirt className="text-[var(--t-gold)]" size={30} />
            <h3 className="mt-4 font-theme text-3xl font-semibold">Dress code sugerido</h3>
            <p className="mt-3 text-[var(--t-bg)]/75">{theme.dressCode}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-[2rem] bg-[var(--t-accent)]/35 p-6 sm:p-8 text-[var(--t-ink)]">
            <Music2 className="text-[var(--t-ink)]" size={30} />
            <h3 className="mt-4 font-theme text-3xl font-semibold">Trilha sonora</h3>
            <p className="mt-3 text-[var(--t-ink)]/75">{theme.playlist}</p>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-16 sm:pb-24 pt-10 text-center md:px-10">
        <Reveal>
          <h2 className="font-theme text-4xl font-semibold italic text-[var(--t-ink)] sm:text-6xl">
            O baile termina em {daysLeft} {daysLeft === 1 ? 'dia' : 'dias'}.
          </h2>
          <p className="mt-4 text-lg text-[var(--t-ink)]/70">Garanta sua mesa antes que a temporada acabe.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/reservas" variant="theme" size="lg">
              Reservar mesa
            </Button>
            <Button to="/cardapio" variant="ghost" size="lg">
              Ver cardápio
            </Button>
          </div>
        </Reveal>
      </section>
    </ThemeScope>
  );
}
