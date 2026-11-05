import { motion } from 'framer-motion';
import { Leaf, Sparkles, Wine, GlassWater } from 'lucide-react';
import type { DishTag, MenuItem } from '../../types';
import { formatPrice } from '../../lib/format';
import DishArt from './DishArt';

const tagInfo: Record<DishTag, { label: string; icon: typeof Leaf }> = {
  assinatura: { label: 'Assinatura', icon: Sparkles },
  vegetariano: { label: 'Vegetariano', icon: Leaf },
  'sem-alcool': { label: 'Sem álcool', icon: GlassWater },
  'com-alcool': { label: 'Contém álcool', icon: Wine },
};

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex gap-4 rounded-[1.75rem] border border-[var(--t-gold)]/30 bg-[var(--t-surface)] p-3.5 shadow-[0_20px_40px_-28px_rgba(31,42,74,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_50px_-28px_rgba(31,42,74,0.55)] sm:gap-5 sm:p-5"
    >
      <div className="relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--t-bg)] to-[var(--t-accent)]/40 sm:h-32 sm:w-32">
        <DishArt
          kind={item.art}
          colors={item.colors}
          className="h-[88%] w-[88%] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-col items-start gap-1.5 sm:flex-row sm:justify-between sm:gap-3">
          <h3 className="font-theme text-[1.4rem] font-semibold leading-tight text-[var(--t-ink)] sm:text-[1.7rem]">
            {item.name}
          </h3>
          <span className="shrink-0 rounded-full bg-[var(--t-ink)] px-3 py-1 text-sm font-extrabold text-[var(--t-bg)]">
            {formatPrice(item.price)}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-[var(--t-ink)]/70">{item.description}</p>
        {item.tags.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-2 pt-3">
            {item.tags.map((tag) => {
              const { label, icon: Icon } = tagInfo[tag];
              return (
                <li
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-[var(--t-accent)]/25 px-2.5 py-1 text-[11px] font-bold text-[var(--t-ink)]"
                >
                  <Icon size={12} /> {label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </motion.article>
  );
}
