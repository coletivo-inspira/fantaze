import { cn } from '../../lib/cn';
import logo from '../../assets/logo-completa.svg';

interface LogoPrincipalProps {
  /** `hover` balança a logo ao passar o mouse (precisa de um pai com `group`); `loop` balança sempre. */
  motion?: 'none' | 'hover' | 'loop';
  className?: string;
}

/** Logotipo completo (versão do manual de identidade visual), em vetor. */
export default function LogoPrincipal({ motion = 'none', className }: LogoPrincipalProps) {
  return (
    <img
      src={logo}
      alt="Fantazê"
      draggable={false}
      className={cn(
        'block aspect-[1341/719] select-none',
        motion === 'loop' && 'animate-bob',
        motion === 'hover' && 'group-hover:animate-bob',
        className,
      )}
    />
  );
}
