import { ArrowRight } from 'lucide-react';
import { passportSlots } from '../../data/passport';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import StampArt from '../passport/StampArt';

const preview = passportSlots.slice(0, 3);
const tilts = [-6, 4, -3];

export default function PassportTeaser() {
  return (
    <section className="bg-brand-peach/70 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:px-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            kicker="Passaporte Fantazê"
            title="Um carimbo por mundo visitado."
            subtitle="Volte todo mês, colecione os carimbos de cada tema e troque por sobremesas, jantares e outros brindes."
          />
          <Reveal delay={0.1}>
            <Button to="/passaporte" size="lg" className="mt-8" icon={<ArrowRight size={18} />}>
              Abrir meu passaporte
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto grid max-w-md grid-cols-3 gap-4 rounded-[2.5rem] border-2 border-dashed border-brand-indigo/20 bg-white p-6">
            {preview.map((s, i) => (
              <div key={s.id} className={i === 0 ? 'mix-blend-multiply' : 'opacity-35 grayscale'} style={{ transform: `rotate(${tilts[i]}deg)` }}>
                <StampArt name={s.name === 'Em breve' ? 'Próximo tema' : s.name} month={s.month} colors={s.colors} className="w-full" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
