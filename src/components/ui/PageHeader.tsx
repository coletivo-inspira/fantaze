import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Decor from './Decor';
import type { GrafismoName } from './grafismos';

interface PageHeaderProps {
  kicker: string;
  title: ReactNode;
  subtitle?: ReactNode;
  decor?: GrafismoName;
}

/** Cabeçalho padrão das páginas internas. */
export default function PageHeader({ kicker, title, subtitle, decor = 'wing' }: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden bg-gradient-to-b from-brand-peach to-brand-paper pb-14 pt-32 sm:pb-20 sm:pt-40">
      <div className="pointer-events-none absolute -right-20 top-10 -z-10 h-80 w-80 rounded-full bg-brand-pink/20 blur-3xl" />
      <Decor name={decor} float className="right-[8%] top-28 hidden w-24 sm:block lg:w-32" />
      <Decor name="sparkles" twinkle className="left-[6%] top-36 hidden w-8 sm:block" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl px-6 md:px-10"
      >
        <span className="text-xs font-extrabold uppercase tracking-[0.35em] text-brand-pink">{kicker}</span>
        <h1 className="mt-4 max-w-3xl text-5xl leading-[1.02] text-brand-indigo sm:text-6xl lg:text-7xl">{title}</h1>
        {subtitle && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-ink/70">{subtitle}</p>}
      </motion.div>
    </header>
  );
}
