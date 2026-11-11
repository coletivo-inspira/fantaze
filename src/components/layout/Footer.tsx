import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { restaurant } from '../../data/restaurant';
import Logo from '../ui/Logo';
import Decor from '../ui/Decor';

const explore = [
  { name: 'Em cartaz', to: '/tema-do-mes' },
  { name: 'Cardápio', to: '/cardapio' },
  { name: 'Próximos temas', to: '/proximos-temas' },
  { name: 'Passaporte', to: '/passaporte' },
  { name: 'Reservas', to: '/reservas' },
  { name: 'Sobre o Fantazê', to: '/sobre' },
];

export default function Footer() {
  const { address, hours } = restaurant;
  return (
    <footer className="relative mt-24 overflow-hidden bg-brand-indigo text-white">
      <svg className="absolute -top-px left-0 w-full text-brand-paper" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0 0 H1440 V20 Q1200 70 960 30 T480 30 T0 40Z" />
      </svg>
      <Decor tom="escuro" name="cup" float className="right-[6%] top-24 w-16 opacity-60 sm:w-24" />
      <Decor tom="escuro" name="sparkles" twinkle className="left-[44%] top-32 w-10 opacity-70" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-12 pt-24 sm:pt-28 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <Link to="/" aria-label="Fantazê — página inicial" className="group inline-block">
            <Logo variant="white" motion="hover" className="w-64" />
          </Link>
          <p className="mt-6 max-w-sm text-white/70">{restaurant.slogan} {restaurant.audience}</p>
          <a
            href={`https://instagram.com/${restaurant.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/20 px-5 py-3 text-sm font-bold transition-colors hover:bg-white/10"
          >
            <FaInstagram size={18} /> @{restaurant.instagram}
          </a>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-display text-xl text-brand-amber">Explorar</h3>
          <ul className="mt-4 space-y-3 text-white/75">
            {explore.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-white">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="flex items-center gap-2 font-display text-xl text-brand-amber">
              <Clock size={18} /> Horários
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {hours.map((h) => (
                <li key={h.days} className="flex flex-col">
                  <span className="font-bold text-white">{h.days}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-display text-xl text-brand-amber">
              <MapPin size={18} /> Visite
            </h3>
            <address className="mt-4 space-y-3 text-sm not-italic text-white/75">
              <p>
                {address.street}
                <br />
                {address.district}, {address.city}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} /> {restaurant.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} /> {restaurant.email}
              </p>
            </address>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-white/50 md:px-10">
          <p>© {new Date().getFullYear()} Fantazê. Todos os direitos reservados.</p>
          <p>
            Os universos citados (Bridgerton, Harry Potter, Stranger Things e outros) pertencem aos seus respectivos
            detentores e aparecem aqui apenas como inspiração.
          </p>
        </div>
      </div>
    </footer>
  );
}
