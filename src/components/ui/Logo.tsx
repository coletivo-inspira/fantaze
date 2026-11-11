import { cn } from '../../lib/cn';
import letras from '../../assets/logo-letras.png';
import letrasBranco from '../../assets/logo-letras-branco.png';
import asa from '../../assets/logo-asa-canvas.png';

interface LogoProps {
  /** `white` para fundos escuros (nome em branco; a asa mantém o degradê) */
  variant?: 'color' | 'white';
  /** `loop`: a asa bate sempre. `hover`: bate ao passar o mouse (precisa de um pai com `group`). */
  motion?: 'none' | 'hover' | 'loop';
  className?: string;
}

/**
 * Logo (asa + nome) montada em 2 camadas para permitir animar a asa via CSS.
 */
export default function Logo({ variant = 'color', motion = 'none', className }: LogoProps) {
  const white = variant === 'white';
  const wing = cn(
    'wing-l absolute inset-0 h-full w-full',
    motion === 'loop' && 'animate-flap-l',
    motion === 'hover' && 'group-hover:animate-flap-l',
  );

  return (
    <span
      role="img"
      aria-label="Fantazê"
      className={cn('relative block aspect-[983/148] select-none', className)}
    >
      <img src={white ? letrasBranco : letras} alt="" draggable={false} className="absolute inset-0 h-full w-full" />
      <img src={asa} alt="" draggable={false} className={wing} />
    </span>
  );
}
