import { CalendarHeart, Clock, MapPin, Baby, Accessibility, Utensils } from 'lucide-react';
import { restaurant } from '../../data/restaurant';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

const perks = [
  { icon: Baby, text: 'Espaço e cardápio para crianças' },
  { icon: Accessibility, text: 'Acessível para cadeirantes' },
  { icon: Utensils, text: 'Opções vegetarianas e sem álcool' },
];

export default function VisitInfo() {
  const { address, hours } = restaurant;
  return (
    <section className="bg-brand-paper py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading kicker="Visite" title="Informações para sua visita" align="center" />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <Reveal>
            <div className="h-full rounded-[2rem] bg-brand-peach p-6 sm:p-8">
              <Clock className="text-brand-purple" size={28} />
              <h3 className="mt-4 text-2xl text-brand-indigo">Horários</h3>
              <ul className="mt-5 space-y-3">
                {hours.map((h) => (
                  <li key={h.days} className="flex items-baseline justify-between gap-4 border-b border-brand-indigo/10 pb-3 last:border-0">
                    <span className="font-bold text-brand-indigo">{h.days}</span>
                    <span className={h.closed ? 'text-brand-ink/45' : 'text-brand-ink/75'}>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-[2rem] bg-brand-sand p-6 sm:p-8">
              <MapPin className="text-brand-purple" size={28} />
              <h3 className="mt-4 text-2xl text-brand-indigo">Onde estamos</h3>
              <address className="mt-5 not-italic leading-relaxed text-brand-ink/75">
                {address.street}
                <br />
                {address.district} · {address.city}
                <br />
                CEP {address.zip}
              </address>
              <ul className="mt-6 space-y-3">
                {perks.map((p) => (
                  <li key={p.text} className="flex items-center gap-3 text-sm font-semibold text-brand-indigo">
                    <p.icon size={18} className="text-brand-purple" /> {p.text}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-brand-indigo p-6 sm:p-8 text-white">
              <CalendarHeart className="text-brand-amber" size={28} />
              <h3 className="mt-4 text-2xl">Garanta sua mesa</h3>
              <p className="mt-4 leading-relaxed text-white/75">
                O tema em cartaz costuma lotar nos fins de semana. Reserve com antecedência e escolha o horário ideal.
              </p>
              <Button to="/reservas" variant="secondary" size="lg" className="mt-8 w-full">
                Reservar agora
              </Button>
              <p className="mt-4 text-center text-xs text-white/50">Confirmação por WhatsApp</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
