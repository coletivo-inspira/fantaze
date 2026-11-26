import { cn } from '../../lib/cn';
import logo from '../../assets/logo-completa.png';

interface LogoPrincipalProps {
  /** `hover` balança a logo ao passar o mouse (precisa de um pai com `group`); `loop` balança sempre. */
  motion?: 'none' | 'hover' | 'loop';
  className?: string;
}

/** Logotipo completo: asa em degradê + nome manuscrito e "restaurante temático" em laranja. */
export default function LogoPrincipal({ motion = 'none', className }: LogoPrincipalProps) {
  return (
    <img
      src={logo}
      alt="Fantazê"
      draggable={false}
      className={cn(
        'block aspect-[1200/265] select-none',
        motion === 'loop' && 'animate-bob',
        motion === 'hover' && 'group-hover:animate-bob',
        className,
      )}
    />
  );
}
