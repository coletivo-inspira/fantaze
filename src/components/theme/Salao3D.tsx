import { useState } from 'react';
import { Maximize2, Sparkles, X } from 'lucide-react';
import poster from '../../assets/ambiente/salao-3d.jpg';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

// Caminho com index.html explícito: o servidor de dev do Vite não resolve índice de pasta em public/.
const TOUR_URL = `${import.meta.env.BASE_URL}salao-3d/index.html`;

interface Salao3DProps {
  /** id do tema em cartaz (o tour abre nele, se existir lá) */
  themeId: string;
}

/**
 * Tour 3D do salão (página estática em public/salao-3d).
 * Só carrega o 3D quando a pessoa clica, para não pesar a página no celular.
 */
export default function Salao3D({ themeId }: Salao3DProps) {
  const [open, setOpen] = useState(false);
  const src = `${TOUR_URL}?embed=1&tema=${encodeURIComponent(themeId)}`;

  return (
    <section id="tour-3d" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-16 md:px-10">
      <SectionHeading
        tone="theme"
        kicker="Tour 3D"
        title="Passeie pelo salão antes de chegar"
        subtitle="Caminhe entre as mesas, veja o bar de perto e troque o tema para descobrir como o Fantazê se transforma a cada temporada."
      />

      <Reveal className="mt-10">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-white bg-[#231510] shadow-xl sm:aspect-[16/9]">
          {open ? (
            <iframe
              src={src}
              title="Tour 3D do salão do Fantazê"
              className="absolute inset-0 h-full w-full"
              allow="fullscreen"
            />
          ) : (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group absolute inset-0 h-full w-full cursor-pointer text-left"
              aria-label="Entrar no tour 3D do salão"
            >
              <img
                src={poster}
                alt="Salão do Fantazê em 3D, com lustres, mesas postas e o bar ao fundo"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-8 text-center sm:pb-12">
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--t-gold)] px-7 py-4 font-bold text-[var(--t-ink)] shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
                  <Sparkles size={20} />
                  Entrar no salão 3D
                </span>
                <span className="text-sm font-semibold text-white/85">Arraste para olhar · toque no chão para andar</span>
              </span>
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-end">
          {open && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--t-ink)]/75 transition hover:text-[var(--t-ink)]"
            >
              <X size={16} />
              Fechar tour
            </button>
          )}
          <a
            href={src.replace('embed=1&', '')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--t-ink)]/75 transition hover:text-[var(--t-ink)]"
          >
            <Maximize2 size={16} />
            Abrir em tela cheia
          </a>
        </div>
      </Reveal>
    </section>
  );
}
