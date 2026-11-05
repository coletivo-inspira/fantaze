import { CalendarCheck, MessageCircle, ShieldCheck } from 'lucide-react';
import { restaurant } from '../data/restaurant';
import PageHeader from '../components/ui/PageHeader';
import ReservationFlow from '../components/reservation/ReservationFlow';

const notes = [
  { icon: CalendarCheck, text: 'Mesas seguradas por 15 minutos após o horário.' },
  { icon: MessageCircle, text: 'Confirmação por WhatsApp em até 2 horas.' },
  { icon: ShieldCheck, text: 'Cancelamento gratuito até 24h antes.' },
];

export default function Reservations() {
  return (
    <>
      <PageHeader
        kicker="Reservas"
        title="Garanta sua mesa no próximo mundo."
        subtitle="Em três passos: escolha o dia e o horário, deixe seus dados e confirme a solicitação."
        decor="wings"
      />

      <section className="bg-brand-paper pb-16 sm:pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:px-10 lg:grid-cols-[1fr_20rem]">
          <ReservationFlow />

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[2rem] bg-brand-indigo p-7 text-white">
              <h2 className="text-2xl">Bom saber</h2>
              <ul className="mt-5 space-y-4">
                {notes.map((n) => (
                  <li key={n.text} className="flex gap-3 text-sm text-white/80">
                    <n.icon size={18} className="mt-0.5 shrink-0 text-brand-amber" /> {n.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] bg-brand-peach p-7">
              <h2 className="text-xl text-brand-indigo">Grupo grande?</h2>
              <p className="mt-2 text-sm text-brand-ink/70">
                Para mais de {restaurant.maxPeoplePerReservation} pessoas ou eventos fechados, fale direto com a gente.
              </p>
              <a
                href={`https://wa.me/55${restaurant.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-extrabold text-brand-purple underline-offset-4 hover:underline"
              >
                {restaurant.phone}
              </a>
            </div>
            <p className="px-2 text-xs text-brand-ink/50">
              Esta versão simula a disponibilidade e salva a solicitação no navegador. A estrutura já está pronta para
              integrar com um sistema real de reservas.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
