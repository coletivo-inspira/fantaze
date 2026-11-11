import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '../../lib/cn';

const STORAGE_KEY = 'fantaze:tema';
type Mode = 'light' | 'dark';

/** O `index.html` já aplica `data-theme` antes da pintura (evita o "flash" de tema claro). */
function readMode(): Mode {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

/** Botão que alterna entre o modo claro e o escuro (marrom). A escolha fica salva no navegador. */
export default function ThemeToggle({ className }: { className?: string }) {
  const [mode, setMode] = useState<Mode>(readMode);
  const dark = mode === 'dark';

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', mode === 'dark' ? '#231510' : '#8E1A1F');
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* navegação privada ou armazenamento bloqueado: segue sem salvar */
    }
  }, [mode]);

  return (
    <button
      type="button"
      onClick={() => setMode((m) => (m === 'dark' ? 'light' : 'dark'))}
      aria-pressed={dark}
      aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      title={dark ? 'Modo claro' : 'Modo escuro'}
      className={cn(
        'inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-peach px-3.5 text-brand-indigo transition-colors hover:bg-brand-cream',
        className,
      )}
    >
      {dark ? <Sun size={19} /> : <Moon size={19} />}
      <span className="hidden text-sm font-bold xl:inline">{dark ? 'Claro' : 'Escuro'}</span>
    </button>
  );
}
