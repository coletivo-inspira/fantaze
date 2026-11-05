import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../ui/Logo';

const SESSION_KEY = 'fantaze:splash';

function alreadySeen() {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return true;
  }
}

/** Abertura do “portal”: aparece só na primeira visita da sessão. */
export default function Splash() {
  const [show, setShow] = useState(() => !alreadySeen());

  useEffect(() => {
    if (!show) return;
    try {
      window.sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* sem persistência, tudo bem */
    }
    const t = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] grid place-items-center bg-brand-indigo"
        >
          <div className="flex flex-col items-center px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <Logo variant="white" motion="loop" className="w-[min(78vw,420px)]" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-xs font-extrabold uppercase tracking-[0.4em] text-brand-amber"
            >
              Abrindo o portal…
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
