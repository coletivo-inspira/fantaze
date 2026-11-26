import { Camera, Sparkles } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import type { MonthlyTheme } from '../../types';
import { getPhotoSpotPhoto } from '../../lib/photos';
import { restaurant } from '../../data/restaurant';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

/** Cantinho da foto do tema em cartaz: imagem do cenário, convite para postar e atalho para o tour 3D. */
export default function PhotoSpot({ theme }: { theme: MonthlyTheme }) {
  const spot = theme.photoSpot;
  if (!spot) return null;
  const photo = getPhotoSpotPhoto(theme.id);

  return (
    <section id="cantinho-da-foto" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-16 md:px-10">
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-[var(--t-surface)] shadow-xl">
            {photo ? (
              <img
                src={photo}
                alt={`Cantinho da foto: ${spot.title}`}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
            ) : (
              <div className="grid aspect-[16/10] place-items-center text-[var(--t-gold)]">
                <Camera size={56} />
              </div>
            )}
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--t-ink)] shadow">
              <Camera size={14} /> Cantinho da foto
            </span>
          </div>
        </Reveal>

        <div>
          <SectionHeading tone="theme" kicker="Para postar" title={spot.title} subtitle={spot.description} />
          <Reveal delay={0.1}>
            <ul className="mt-6 flex flex-wrap gap-2">
              {spot.props.map((p) => (
                <li
                  key={p}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--t-gold)]/40 bg-[var(--t-surface)] px-4 py-2 text-sm font-bold text-[var(--t-ink)]/80"
                >
                  <Sparkles size={14} className="text-[var(--t-gold)]" /> {p}
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-[var(--t-ink)]/75">
              <FaInstagram size={18} className="-mt-0.5 mr-2 inline-block align-middle" />
              Tire sua foto, poste e marque <strong className="text-[var(--t-ink)]">@{restaurant.instagram}</strong> com{' '}
              <strong className="text-[var(--t-ink)]">#fantaze</strong>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/tour-3d?ponto=foto" variant="theme" size="lg" icon={<Camera size={18} />}>
                Ver no tour 3D
              </Button>
              <Button to="/reservas" variant="ghost" size="lg">
                Reservar mesa
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
