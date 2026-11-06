import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Leaf, Sparkles } from 'lucide-react';
import { menuCategories, menuItems } from '../data/menu';
import { useCurrentTheme } from '../hooks/useCurrentTheme';
import { cn } from '../lib/cn';
import type { DishTag, MenuCategoryId } from '../types';
import MenuCard from '../components/menu/MenuCard';
import ThemeScope from '../components/ui/ThemeScope';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';

type Filter = 'todos' | MenuCategoryId;

const dietFilters: { tag: DishTag; label: string; icon: typeof Leaf }[] = [
  { tag: 'assinatura', label: 'Assinaturas', icon: Sparkles },
  { tag: 'vegetariano', label: 'Vegetarianos', icon: Leaf },
];

export default function Menu() {
  const { theme } = useCurrentTheme();
  const [category, setCategory] = useState<Filter>('todos');
  const [tag, setTag] = useState<DishTag | null>(null);

  const visibleCategories = category === 'todos' ? menuCategories : menuCategories.filter((c) => c.id === category);

  const grouped = useMemo(
    () =>
      visibleCategories
        .map((c) => ({
          ...c,
          items: menuItems.filter((i) => i.category === c.id && (!tag || i.tags.includes(tag))),
        }))
        .filter((c) => c.items.length > 0),
    [visibleCategories, tag],
  );

  return (
    <>
      <PageHeader
        kicker={`Cardápio · ${theme.name}`}
        title="A mesa da temporada."
        subtitle="Cada tema tem um cardápio autoral, com nomes e sabores inspirados no universo em cartaz."
        decor="cutlery"
      />

      <ThemeScope palette={theme.palette}>
        <section className="bg-brand-paper pb-16 sm:pb-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            {/* Filtros */}
            <div className="sticky top-20 z-30 -mx-6 border-b border-brand-indigo/10 bg-brand-paper/90 px-6 py-4 backdrop-blur-xl md:-mx-10 md:px-10">
              <LayoutGroup>
                <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
                  {[{ id: 'todos' as const, label: 'Tudo' }, ...menuCategories].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id)}
                      className={cn(
                        'relative shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-colors',
                        category === c.id ? 'text-white' : 'text-brand-indigo hover:bg-brand-peach',
                      )}
                    >
                      {category === c.id && (
                        <motion.span
                          layoutId="menu-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-brand-indigo"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}
                      {c.label}
                    </button>
                  ))}
                  <span className="mx-2 h-6 w-px shrink-0 bg-brand-indigo/15" />
                  {dietFilters.map((f) => (
                    <button
                      key={f.tag}
                      type="button"
                      onClick={() => setTag(tag === f.tag ? null : f.tag)}
                      aria-pressed={tag === f.tag}
                      className={cn(
                        'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold transition-all',
                        tag === f.tag
                          ? 'border-brand-purple bg-brand-purple text-white'
                          : 'border-brand-indigo/20 text-brand-indigo hover:border-brand-purple',
                      )}
                    >
                      <f.icon size={14} /> {f.label}
                    </button>
                  ))}
                </div>
              </LayoutGroup>
            </div>

            {/* Lista */}
            <div className="mt-12 space-y-16">
              <AnimatePresence mode="popLayout">
                {grouped.map((group) => (
                  <motion.section
                    key={group.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    aria-labelledby={`cat-${group.id}`}
                  >
                    <div className="mb-6 flex items-end gap-4">
                      <h2 id={`cat-${group.id}`} className="font-theme text-4xl font-semibold italic text-[var(--t-ink)] sm:text-5xl">
                        {group.label}
                      </h2>
                      <span className="mb-2 hidden text-sm font-bold uppercase tracking-[0.25em] text-[var(--t-gold)] sm:block">
                        {group.subtitle}
                      </span>
                      <span className="mb-3 h-px flex-1 bg-[var(--t-gold)]/40" />
                    </div>
                    <div className="grid gap-5 lg:grid-cols-2">
                      <AnimatePresence>
                        {group.items.map((item) => (
                          <MenuCard key={item.id} item={item} />
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.section>
                ))}
              </AnimatePresence>

              {grouped.length === 0 && (
                <p className="rounded-3xl bg-brand-peach p-6 sm:p-8 text-center text-brand-ink/70">
                  Nenhum item com esse filtro. Tente outra combinação.
                </p>
              )}
            </div>

            <Reveal className="mt-20 rounded-[2.5rem] bg-brand-indigo p-7 text-center text-white sm:p-10">
              <h2 className="text-4xl">Gostou do que viu?</h2>
              <p className="mx-auto mt-3 max-w-lg text-white/70">
                Reserve sua mesa e experimente o cardápio da temporada antes que o próximo universo chegue.
              </p>
              <Button to="/reservas" variant="secondary" size="lg" className="mt-7">
                Reservar mesa
              </Button>
            </Reveal>
          </div>
        </section>
      </ThemeScope>
    </>
  );
}
