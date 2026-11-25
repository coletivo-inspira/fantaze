import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Volta ao topo a cada mudança de rota; com âncora (#id), rola até a seção. */
export default function ScrollRestoration() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // A página é carregada sob demanda: tenta por alguns instantes até a seção existir.
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    const timer = window.setInterval(() => {
      const el = document.getElementById(id);
      if (el || ++tries > 30) {
        window.clearInterval(timer);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [pathname, hash]);

  return null;
}
