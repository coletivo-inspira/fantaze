import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LogoPrincipal from '../ui/LogoPrincipal';

/** Abertura do “portal”: aparece toda vez que o site é aberto (ou recarregado). */
export default function Splash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] grid place-items-center bg-gradient-to-b from-brand-peach to-brand-paper"
        >
          <div className="flex flex-col items-center px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <LogoPrincipal motion="loop" className="w-[min(78vw,420px)]" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-xs font-extrabold uppercase tracking-[0.4em] text-brand-purple"
            >
              Abrindo o portal…
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
