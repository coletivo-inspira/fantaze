import { ArrowRight } from 'lucide-react';
import { menuItems } from '../../data/menu';
import { useCurrentTheme } from '../../hooks/useCurrentTheme';
import MenuCard from '../menu/MenuCard';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import ThemeScope from '../ui/ThemeScope';

export default function MenuPreview() {
  const { theme } = useCurrentTheme();
  const signatures = menuItems.filter((i) => i.tags.includes('assinatura')).slice(0, 4);

  return (
    <ThemeScope palette={theme.palette}>
      <section className="bg-brand-paper py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              kicker={`Cardápio ${theme.name}`}
              title="Pratos que contam a história."
              subtitle="Uma seleção das criações assinatura deste mês. Todas com ingredientes frescos e muita fantasia."
            />
            <Reveal>
              <Button to="/cardapio" variant="ghost" size="lg" icon={<ArrowRight size={18} />}>
                Ver cardápio completo
              </Button>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {signatures.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.08}>
                <MenuCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </ThemeScope>
  );
}
