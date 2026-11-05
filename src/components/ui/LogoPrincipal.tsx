import { cn } from '../../lib/cn';
import letras from '../../assets/logo-principal-letras.svg';
import asa from '../../assets/logo-principal-asa.svg';
import letrasBranco from '../../assets/logo-principal-letras-branco.svg';
import asaBranco from '../../assets/logo-principal-asa-branco.svg';

interface LogoPrincipalProps {
  /** `white` para fundos escuros (índigo) */
  variant?: 'color' | 'white';
  /** `hover` anima a asa ao passar o mouse (precisa de um pai com `group`). */
  motion?: 'none' | 'hover' | 'loop';
  className?: string;
}

/**
 * Logo principal (uma asa à esquerda), montada em 2 camadas (letras + asa)
 * para que a asa possa bater via CSS.
 */
export default function LogoPrincipal({ variant = 'color', motion = 'none', className }: LogoPrincipalProps) {
  const white = variant === 'white';
  return (
    <span
      role="img"
      aria-label="Fantazê"
      className={cn('relative block aspect-[1291/669] select-none', className)}
    >
      <img src={white ? letrasBranco : letras} alt="" draggable={false} className="absolute inset-0 h-full w-full" />
      <img
        src={white ? asaBranco : asa}
        alt=""
        draggable={false}
        className={cn(
          'wing-principal absolute inset-0 h-full w-full',
          motion === 'loop' && 'animate-flap-l',
          motion === 'hover' && 'group-hover:animate-flap-l',
        )}
      />
    </span>
  );
}
