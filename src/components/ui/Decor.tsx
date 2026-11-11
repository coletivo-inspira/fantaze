import { cn } from '../../lib/cn';
import { grafismos, grafismosAmbar, type GrafismoName } from './grafismos';

interface DecorProps {
  name: GrafismoName;
  className?: string;
  /** Flutua suavemente */
  float?: boolean;
  /** Pisca como uma estrela */
  twinkle?: boolean;
  delay?: number;
  /** `escuro`: sempre âmbar (para fundos escuros, como o rodapé). Padrão: bordô no claro, âmbar no modo escuro. */
  tom?: 'auto' | 'escuro';
}

/** Grafismo da marca usado como elemento decorativo (ignorado por leitores de tela). */
export default function Decor({ name, className, float, twinkle, delay = 0, tom = 'auto' }: DecorProps) {
  const base = cn(
    'pointer-events-none absolute select-none',
    float && 'animate-float',
    twinkle && 'animate-twinkle',
    className,
  );
  const style = { animationDelay: `${delay}s` };

  if (tom === 'escuro') {
    return <img src={grafismosAmbar[name]} alt="" aria-hidden draggable={false} style={style} className={base} />;
  }

  return (
    <>
      <img src={grafismos[name]} alt="" aria-hidden draggable={false} style={style} className={cn(base, 'dark:hidden')} />
      <img
        src={grafismosAmbar[name]}
        alt=""
        aria-hidden
        draggable={false}
        style={style}
        className={cn(base, 'hidden dark:block')}
      />
    </>
  );
}
