import { useEffect, useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import LogoPrincipal from '../ui/LogoPrincipal';

type Phase = 'closed' | 'open' | 'done';

/** Tempo (ms) com as cortinas fechadas antes de abrirem sozinhas. */
const CLOSED_MS = 900;
/** Tempo (ms) da abertura até remover a tela. Total da abertura ≈ CLOSED_MS + OPENING_MS = 3 s. */
const OPENING_MS = 2100;

const EASE_CURTAIN = [0.65, 0, 0.35, 1] as const;

// Recolhimento (scaleX) e inclinação (skewX, em 3 tempos: inclina e relaxa) com durações próprias
const CURTAIN_TRANSITION = {
  scaleX: { duration: 1.6, ease: EASE_CURTAIN },
  skewX: { duration: 1.6, ease: 'easeInOut' as const, times: [0, 0.5, 1] },
};

// Dobras do veludo + sombra nas bordas e na base
const curtainStyle = (side: 'left' | 'right'): CSSProperties => ({
  background: [
    `linear-gradient(${side === 'left' ? '90deg' : '270deg'}, rgba(0,0,0,.45) 0%, rgba(0,0,0,0) 9%, rgba(0,0,0,0) 90%, rgba(0,0,0,.55) 100%)`,
    'linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 72%, rgba(0,0,0,.4) 100%)',
    'repeating-linear-gradient(90deg, #7d0b1a 0, #a8132a 3%, #d92440 6%, #a8132a 9%, #7d0b1a 12%)',
  ].join(','),
  // Painéis se estendem 12vw para fora da tela, assim a inclinação não deixa vãos nas laterais
  [side]: '-12vw',
  width: 'calc(50.3% + 12vw)',
  transformOrigin: side === 'left' ? 'left top' : 'right top',
});

// Cortina superior (bandô) com borda recortada em curvas e friso dourado
const SCALLOPS = 12;
const SCALLOP_W = 1440 / SCALLOPS;
const scallopPath = Array.from({ length: SCALLOPS }, (_, i) => {
  const x1 = (i + 1) * SCALLOP_W;
  const cx = i * SCALLOP_W + SCALLOP_W / 2;
  return `Q${cx} 168 ${x1} 100`;
}).join(' ');

/** Abertura em forma de espetáculo: cortinas se abrem e revelam o site. Roda a cada visita. */
export default function Splash() {
  const [phase, setPhase] = useState<Phase>('closed');
  const opening = phase === 'open';

  useEffect(() => {
    if (phase === 'closed') {
      const t = setTimeout(() => setPhase('open'), CLOSED_MS);
      return () => clearTimeout(t);
    }
    if (phase === 'open') {
      const t = setTimeout(() => setPhase('done'), OPENING_MS);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Impede a rolagem enquanto as cortinas estão na tela
  useEffect(() => {
    if (phase === 'done') return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  // Qualquer tecla (Enter/Esc/Espaço) pula a espera
  useEffect(() => {
    if (phase !== 'closed') return;
    const onKey = (e: KeyboardEvent) => {
      if (['Enter', 'Escape', ' '].includes(e.key)) setPhase('open');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <motion.div
      aria-label="Abertura do site"
      initial={{ opacity: 1 }}
      animate={{ opacity: opening ? 0 : 1 }}
      transition={{ delay: opening ? 1.4 : 0, duration: 0.7, ease: 'easeInOut' }}
      onClick={() => phase === 'closed' && setPhase('open')}
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ pointerEvents: opening ? 'none' : 'auto', cursor: opening ? 'default' : 'pointer' }}
    >
      {/* Cortinas */}
      {/*
        A borda de dentro de cada cortina fica inclinada enquanto abre (a parte de baixo
        "puxa" mais que a de cima), como um tecido sendo arrastado, e no fim as cortinas
        ficam recolhidas nas laterais.
      */}
      <motion.div
        aria-hidden
        className="absolute inset-y-0"
        style={curtainStyle('left')}
        animate={opening ? { scaleX: 0.3, skewX: [0, -13, -4] } : { scaleX: 1, skewX: 0 }}
        transition={CURTAIN_TRANSITION}
      />
      <motion.div
        aria-hidden
        className="absolute inset-y-0"
        style={curtainStyle('right')}
        animate={opening ? { scaleX: 0.3, skewX: [0, 13, 4] } : { scaleX: 1, skewX: 0 }}
        transition={CURTAIN_TRANSITION}
      />

      {/* Foco de luz no centro, sobre as cortinas */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 22%, rgba(255,214,140,.38), rgba(255,214,140,0) 70%)' }}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Bandô + letreiro com a logo (somem logo depois que as cortinas abrem) */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0"
        animate={{ opacity: opening ? 0 : 1, y: opening ? -24 : 0 }}
        transition={{ delay: opening ? 1.0 : 0, duration: 0.6, ease: 'easeInOut' }}
      >
        <svg
          viewBox="0 0 1440 170"
          preserveAspectRatio="none"
          className="block h-[15vh] min-h-[88px] w-full drop-shadow-[0_14px_14px_rgba(0,0,0,0.45)]"
          aria-hidden
        >
          <defs>
            <linearGradient id="bando" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#6e0816" />
              <stop offset="0.6" stopColor="#b01228" />
              <stop offset="1" stopColor="#8d0e20" />
            </linearGradient>
          </defs>
          <path d={`M0 100 ${scallopPath} V0 H0 Z`} fill="url(#bando)" />
          <path d={`M0 100 ${scallopPath}`} fill="none" stroke="#e0b24a" strokeWidth="5" strokeLinejoin="round" />
          <rect x="0" y="84" width="1440" height="5" fill="#e0b24a" opacity=".9" />
        </svg>

        <div className="absolute inset-x-0 top-[6.5vh] flex flex-col items-center px-4 sm:top-[7vh]">
          <div className="relative w-[min(76vw,400px)]">
            {/* cordas */}
            <span className="absolute -top-[6.5vh] left-[22%] h-[6.5vh] w-[3px] bg-[#e0b24a]" />
            <span className="absolute -top-[6.5vh] right-[22%] h-[6.5vh] w-[3px] bg-[#e0b24a]" />

            <div className="relative rounded-[1.6rem] border-[5px] border-[#e0b24a] bg-brand-paper px-6 pb-5 pt-6 shadow-[0_24px_50px_-10px_rgba(0,0,0,0.6),0_0_60px_rgba(255,200,110,0.45)] sm:px-8 sm:pb-6 sm:pt-7">
              {/* lâmpadas do letreiro */}
              <Bulbs className="absolute inset-x-5 -top-[3px] -translate-y-1/2" />
              <Bulbs className="absolute inset-x-5 -bottom-[3px] translate-y-1/2" offset />
              <LogoPrincipal motion="loop" className="w-full" />
            </div>
          </div>

          <p className="mt-5 text-center text-[11px] font-extrabold uppercase tracking-[0.42em] text-[#ffd36b] drop-shadow sm:text-xs">
            O espetáculo vai começar
          </p>
        </div>
      </motion.div>

    </motion.div>
  );
}

function Bulbs({ className, offset }: { className?: string; offset?: boolean }) {
  return (
    <div className={`flex justify-between ${className ?? ''}`} aria-hidden>
      {Array.from({ length: 11 }, (_, i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full bg-[#ffe08a] shadow-[0_0_8px_3px_rgba(255,214,120,0.9)] animate-twinkle"
          style={{ animationDelay: `${((i + (offset ? 1 : 0)) % 2) * 0.8}s` }}
        />
      ))}
    </div>
  );
}
