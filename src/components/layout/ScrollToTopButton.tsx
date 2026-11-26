import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';

/** Páginas com botão fixo próprio (ou curtas) onde o atalho atrapalharia no celular. */
const HIDDEN_ON = ['/reservas', '/tour-3d'];

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && !HIDDEN_ON.includes(pathname) && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Voltar ao topo"
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-40 sm:bottom-6 sm:right-6 grid h-12 w-12 place-items-center rounded-full bg-brand-indigo text-white shadow-lg transition-colors hover:bg-brand-purple"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
