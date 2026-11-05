import { motion } from 'framer-motion';
import { ArrowRight, CalendarHeart, MapPin } from 'lucide-react';
import { useCurrentTheme } from '../../hooks/useCurrentTheme';
import { formatPeriod } from '../../lib/format';
import { restaurant } from '../../data/restaurant';
import Button from '../ui/Button';
import Decor from '../ui/Decor';
import ThemeScope from '../ui/ThemeScope';
import ThemePortal from '../theme/ThemePortal';
import ThemeCountdown from '../theme/ThemeCountdown';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function HomeHero() {
  const { theme, daysLeft } = useCurrentTheme();

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-peach via-brand-paper to-brand-paper pt-28 sm:pt-32">
      {/* manchas de cor */}
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-96 w-96 rounded-full bg-brand-pink/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-brand-blue/20 blur-3xl" />
      <Decor name="star" twinkle className="left-[5%] top-40 hidden w-10 sm:block" />
      <Decor name="spiral" float delay={0.6} className="bottom-24 left-[8%] hidden w-16 sm:block" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-28">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.25em] text-brand-purple backdrop-blur"
          >
            <MapPin size={14} /> Restaurante temático · {restaurant.address.district}
          </motion.span>

          <motion.h1 variants={item} className="mt-6 text-[2.9rem] leading-[1] text-brand-indigo sm:text-7xl lg:text-[5.4rem]">
            Todo mês,
            <br />
            um <span className="relative inline-block text-brand-purple">novo mundo</span>
            <br />
            à mesa.
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-brand-ink/70 sm:text-xl">
            No Fantazê, cardápio, decoração, trilha e figurino mudam a cada mês. Você escolhe o próximo universo, a gente
            transforma o salão.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button to="/reservas" size="lg" icon={<CalendarHeart size={20} />}>
              Reservar minha mesa
            </Button>
            <Button to="/cardapio" variant="ghost" size="lg" icon={<ArrowRight size={18} />}>
              Ver o cardápio
            </Button>
          </motion.div>

          <motion.div variants={item}>
            <ThemeScope palette={theme.palette} className="mt-10 inline-block">
              <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-[var(--t-gold)]/40 bg-[var(--t-bg)] p-3 pr-4 shadow-sm">
                <span className="rounded-2xl bg-[var(--t-ink)] px-4 py-2 font-theme text-xl font-semibold italic text-[var(--t-bg)]">
                  {theme.name}
                </span>
                <span className="text-sm font-bold text-[var(--t-ink)]">
                  Tema de {formatPeriod(theme.startsAt, theme.endsAt)}
                </span>
                <ThemeCountdown daysLeft={daysLeft} />
              </div>
            </ThemeScope>
          </motion.div>
        </motion.div>

        <ThemeScope palette={theme.palette}>
          <ThemePortal theme={theme} />
        </ThemeScope>
      </div>
    </section>
  );
}
