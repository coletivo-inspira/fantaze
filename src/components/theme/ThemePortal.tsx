import { motion } from 'framer-motion';
import type { MonthlyTheme } from '../../types';
import ThemeScene from './ThemeScene';
import Decor from '../ui/Decor';

interface ThemePortalProps {
  theme: MonthlyTheme;
  className?: string;
}

/** “Portal” em arco que mostra o universo do mês, com grafismos da marca ao redor. */
export default function ThemePortal({ theme, className }: ThemePortalProps) {
  return (
    <div className={className}>
      <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="absolute inset-0 overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] border-[6px] border-white shadow-[0_40px_80px_-30px_rgba(48,19,126,0.55)]"
        >
          <ThemeScene kind="ballroom" className="h-full w-full" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-indigo/85 to-transparent px-6 pb-6 pt-16 text-center text-white">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-brand-amber">Em cartaz</p>
            <p className="font-theme text-4xl font-semibold italic">{theme.name}</p>
          </div>
        </motion.div>

        <Decor name="butterfly" float className="-left-8 top-[14%] w-20 sm:-left-14 sm:w-28" />
        <Decor name="sparkle" twinkle className="-right-4 top-[6%] w-14 sm:-right-10 sm:w-20" />
        <Decor name="swirl" float delay={1.2} className="-right-6 bottom-[22%] w-16 sm:-right-12 sm:w-24" />
        <Decor name="star" twinkle delay={0.8} className="-left-4 bottom-[10%] w-12 sm:-left-10 sm:w-16" />
      </div>
    </div>
  );
}
