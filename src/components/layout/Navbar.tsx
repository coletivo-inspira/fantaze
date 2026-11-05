import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/cn';
import Logo from '../ui/Logo';
import Button from '../ui/Button';

const links = [
  { name: 'Início', to: '/' },
  { name: 'Tema do mês', to: '/tema-do-mes' },
  { name: 'Cardápio', to: '/cardapio' },
  { name: 'Próximos temas', to: '/proximos-temas' },
  { name: 'Passaporte', to: '/passaporte' },
  { name: 'Sobre', to: '/sobre' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fecha o menu mobile ao trocar de página
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  // Trava a rolagem da página enquanto o menu está aberto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Fecha com a tecla Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled || open
            ? 'border-b border-brand-indigo/10 bg-brand-paper/90 backdrop-blur-xl'
            : 'bg-transparent',
        )}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10" aria-label="Principal">
          <Link to="/" aria-label="Fantazê — página inicial" className="group">
            <Logo motion="hover" className="w-28 sm:w-32" />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-full px-3 py-2 text-sm font-bold transition-colors xl:px-4',
                    isActive ? 'text-brand-indigo' : 'text-brand-ink/60 hover:text-brand-indigo',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-brand-peach"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button to="/reservas" variant="primary" className="hidden sm:inline-flex">
              Reservar mesa
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="grid h-11 w-11 place-items-center rounded-full bg-brand-peach text-brand-indigo lg:hidden"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/*
        O menu mobile fica FORA do <header>: o backdrop-blur do cabeçalho cria um
        novo contexto para elementos `fixed`, o que fazia o painel encolher para a
        altura da barra.
      */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-brand-paper px-6 pb-10 pt-24 lg:hidden"
          >
            <nav aria-label="Menu mobile" className="flex flex-col gap-2">
              {[...links, { name: 'Reservar mesa', to: '/reservas' }].map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.05 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-2xl px-5 py-4 font-display text-3xl',
                        link.to === '/reservas'
                          ? 'mt-4 bg-brand-indigo text-center text-white'
                          : isActive
                            ? 'bg-brand-peach text-brand-indigo'
                            : 'text-brand-ink/70',
                      )
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
