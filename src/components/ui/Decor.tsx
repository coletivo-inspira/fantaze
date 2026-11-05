import { cn } from '../../lib/cn';
import { grafismos, type GrafismoName } from './grafismos';

interface DecorProps {
  name: GrafismoName;
  className?: string;
  /** Flutua suavemente */
  float?: boolean;
  /** Pisca como uma estrela */
  twinkle?: boolean;
  delay?: number;
}

/** Grafismo da marca usado como elemento decorativo (ignorado por leitores de tela). */
export default function Decor({ name, className, float, twinkle, delay = 0 }: DecorProps) {
  return (
    <img
      src={grafismos[name]}
      alt=""
      aria-hidden
      draggable={false}
      style={{ animationDelay: `${delay}s` }}
      className={cn(
        'pointer-events-none absolute select-none',
        float && 'animate-float',
        twinkle && 'animate-twinkle',
        className,
      )}
    />
  );
}
