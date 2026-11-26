import { motion } from 'framer-motion';
import { CalendarHeart, Camera, Hand, Maximize2, Footprints, Palette } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useCurrentTheme } from '../hooks/useCurrentTheme';
import { tour3dUrl } from '../lib/tour3d';
import Button from '../components/ui/Button';
import Decor from '../components/ui/Decor';

const tips = [
  { icon: Hand, text: 'Arraste a tela para olhar em volta' },
  { icon: Footprints, text: 'Toque no chão para caminhar' },
  { icon: Palette, text: 'Troque o tema e veja o salão mudar' },
  { icon: Camera, text: 'Ache o cantinho da foto perto da entrada' },
];

/** Página do tour 3D: o salão abre direto, ocupando quase toda a tela. */
export default function Tour3D() {
  const { theme } = useCurrentTheme();
  const [params] = useSearchParams();
  const ponto = params.get('ponto') ?? undefined;

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-peach to-brand-paper pb-12 pt-24 sm:pt-28">
      <Decor name="sparkles" twinkle className="right-[6%] top-28 hidden w-10 sm:block" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 px-2 sm:flex-row sm:items-end sm:justify-between sm:px-0"
        >
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.35em] text-brand-pink">Tour 3D</span>
            <h1 className="mt-3 text-4xl leading-[1.05] text-brand-indigo sm:text-5xl">Conheça o salão</h1>
            <p className="mt-3 max-w-xl text-brand-ink/70">
              Caminhe entre as mesas, veja o bar de perto e descubra como o Fantazê se transforma a cada temporada.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button to="/reservas" icon={<CalendarHeart size={18} />}>
              Reservar mesa
            </Button>
            <Button href={tour3dUrl(theme.id, false, ponto)} external variant="ghost" icon={<Maximize2 size={16} />}>
              Tela cheia
            </Button>
          </div>
        </motion.div>

        <div className="mt-6 h-[calc(100dvh-8rem)] min-h-[460px] overflow-hidden rounded-[1.5rem] border-4 border-white bg-[#231510] shadow-xl sm:mt-8 sm:h-[min(78dvh,820px)] sm:rounded-[2rem]">
          <iframe
            src={tour3dUrl(theme.id, true, ponto)}
            title="Tour 3D do salão do Fantazê"
            className="h-full w-full"
            allow="fullscreen"
          />
        </div>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tips.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-3 rounded-2xl border border-brand-indigo/10 bg-white/70 px-4 py-3 text-sm font-bold text-brand-ink/80"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-peach text-brand-purple">
                <Icon size={18} />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
