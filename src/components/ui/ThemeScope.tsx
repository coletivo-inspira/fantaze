import type { CSSProperties, ReactNode } from 'react';
import type { ThemePalette } from '../../types';

interface ThemeScopeProps {
  palette: ThemePalette;
  className?: string;
  children: ReactNode;
}

/**
 * Aplica a paleta do tema em cartaz como variáveis CSS (`--t-*`) para os filhos.
 * A marca continua usando `brand-*`; o tema usa `var(--t-*)`.
 */
export default function ThemeScope({ palette, className, children }: ThemeScopeProps) {
  const style = {
    '--t-bg': palette.bg,
    '--t-surface': palette.surface,
    '--t-ink': palette.ink,
    '--t-accent': palette.accent,
    '--t-accent-2': palette.accent2,
    '--t-gold': palette.gold,
  } as CSSProperties;

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
}
