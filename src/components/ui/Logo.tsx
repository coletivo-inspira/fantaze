import { cn } from '../../lib/cn';
import letras from '../../assets/logo-letras.svg';
import asaEsq from '../../assets/logo-asa-esq.svg';
import asaDir from '../../assets/logo-asa-dir.svg';
import letrasBranco from '../../assets/logo-letras-branco.svg';
import asaEsqBranco from '../../assets/logo-asa-esq-branco.svg';
import asaDirBranco from '../../assets/logo-asa-dir-branco.svg';

interface LogoProps {
  /** `white` para fundos escuros (índigo) */
  variant?: 'color' | 'white';
  /** `loop`: asas batem sempre. `hover`: batem ao passar o mouse (precisa de um pai com `group`). */
  motion?: 'none' | 'hover' | 'loop';
  className?: string;
}

/**
 * Logo da variação principal montada em 3 camadas (letras + asa esquerda + asa direita)
 * para permitir animar as asas via CSS sem recarregar nenhum arquivo.
 */
export default function Logo({ variant = 'color', motion = 'none', className }: LogoProps) {
  const white = variant === 'white';
  const wingL = cn(
    'wing-l absolute inset-0 h-full w-full',
    motion === 'loop' && 'animate-flap-l',
    motion === 'hover' && 'group-hover:animate-flap-l',
  );
  const wingR = cn(
    'wing-r absolute inset-0 h-full w-full',
    motion === 'loop' && 'animate-flap-r',
    motion === 'hover' && 'group-hover:animate-flap-r',
  );

  return (
    <span
      role="img"
      aria-label="Fantazê"
      className={cn('relative block aspect-[1362/802] select-none', className)}
    >
      <img src={white ? letrasBranco : letras} alt="" draggable={false} className="absolute inset-0 h-full w-full" />
      <img src={white ? asaEsqBranco : asaEsq} alt="" draggable={false} className={wingL} />
      <img src={white ? asaDirBranco : asaDir} alt="" draggable={false} className={wingR} />
    </span>
  );
}
