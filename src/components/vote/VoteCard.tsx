import { motion } from 'framer-motion';
import { Check, Crown, Loader2 } from 'lucide-react';
import type { VoteTally } from '../../types';
import { cn } from '../../lib/cn';
import Decor from '../ui/Decor';
import type { GrafismoName } from '../ui/grafismos';
import ThemeIcon from './ThemeIcon';

interface VoteCardProps {
  option: VoteTally;
  rank: number;
  percent: number;
  voted: boolean;
  pending: boolean;
  disabled: boolean;
  onVote: (id: string) => void;
}

const decors: GrafismoName[] = ['wing', 'cutlery', 'dice', 'cards', 'tickets', 'clapper'];

/** Candidato a próximo tema: “portal” em arco (mesmo estilo do tema em cartaz) + votação. */
export default function VoteCard({ option, rank, percent, voted, pending, disabled, onVote }: VoteCardProps) {
  const [c1, c2] = option.colors;
  const leader = rank === 1;
  const decor = decors[(rank - 1) % decors.length];

  return (
    <motion.article
      layout
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className="flex flex-col items-center"
    >
      {/* Portal */}
      <div className="relative w-full max-w-[19rem] px-4 pt-2">
        <div
          className={cn(
            'relative aspect-[4/5] w-full overflow-hidden rounded-t-[999px] rounded-b-[2rem] border-[6px] shadow-[0_30px_60px_-30px_rgba(142,26,31,0.55)] transition-all',
            voted ? 'border-brand-amber' : 'border-white',
          )}
          style={{ background: `linear-gradient(170deg, ${c1}, ${c2})` }}
        >
          {/* luz do portal */}
          <div
            className="absolute left-1/2 top-[34%] h-[70%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-2xl"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.85), rgba(255,255,255,0) 70%)' }}
            aria-hidden
          />
          {/* silhuetas de fundo */}
          <svg viewBox="0 0 200 250" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
            <path d="M0,190 Q40,150 80,176 Q120,140 160,172 Q185,160 200,170 V250 H0z" fill={c1} opacity=".55" />
            <path d="M0,215 Q50,185 100,208 Q150,184 200,206 V250 H0z" fill="#3D0F12" opacity=".45" />
          </svg>
          <div className="absolute inset-x-0 top-[26%] grid place-items-center text-white/90 drop-shadow-lg">
            <ThemeIcon name={option.icon} size={72} />
          </div>
          {[
            'left-[22%] top-[22%]',
            'right-[20%] top-[16%]',
            'right-[26%] top-[46%]',
            'left-[18%] top-[48%]',
          ].map((pos, i) => (
            <span
              key={pos}
              className={cn('absolute h-1.5 w-1.5 animate-twinkle rounded-full bg-white', pos)}
              style={{ animationDelay: `${i * 0.7}s` }}
              aria-hidden
            />
          ))}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-indigo/90 to-transparent px-4 pb-5 pt-14 text-center text-white">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-brand-amber">
              Candidato #{rank}
            </p>
            <p className="mt-1 font-theme text-[1.7rem] font-semibold italic leading-tight">{option.name}</p>
          </div>
        </div>

        {leader && (
          <span className="absolute left-1 top-8 inline-flex items-center gap-1 rounded-full bg-brand-amber px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink shadow-md">
            <Crown size={12} /> Líder
          </span>
        )}
        <Decor name={decor} float delay={rank * 0.3} className="-right-1 top-[48%] w-14 sm:-right-3 sm:w-16" />
      </div>

      {/* Votação */}
      <div className="mt-5 w-full max-w-[19rem] px-1 text-center">
        <p className="text-sm text-brand-ink/65">{option.tagline}</p>

        <div className="mt-4">
          <div className="flex items-end justify-between text-sm">
            <span className="font-extrabold text-brand-indigo">{option.votes.toLocaleString('pt-BR')} votos</span>
            <span className="font-bold text-brand-ink/50">{percent.toFixed(0)}%</span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-brand-indigo/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${c1}, ${c2})` }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => onVote(option.id)}
          disabled={disabled || voted}
          className={cn(
            'mt-4 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all duration-300',
            voted
              ? 'cursor-default bg-brand-purple text-white'
              : 'bg-brand-indigo text-white hover:-translate-y-0.5 hover:bg-brand-purple disabled:opacity-60',
          )}
        >
          {pending ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Registrando…
            </>
          ) : voted ? (
            <>
              <Check size={16} /> Seu voto
            </>
          ) : (
            'Votar neste universo'
          )}
        </button>
      </div>
    </motion.article>
  );
}
