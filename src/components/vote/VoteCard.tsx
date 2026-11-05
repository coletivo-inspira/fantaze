import { motion } from 'framer-motion';
import { Check, Crown, Loader2 } from 'lucide-react';
import type { VoteTally } from '../../types';
import { cn } from '../../lib/cn';
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

export default function VoteCard({ option, rank, percent, voted, pending, disabled, onVote }: VoteCardProps) {
  const [c1, c2] = option.colors;
  const leader = rank === 1;

  return (
    <motion.article
      layout
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className={cn(
        'relative overflow-hidden rounded-[2rem] border bg-white p-5 shadow-[0_20px_40px_-30px_rgba(48,19,126,0.6)] sm:p-6',
        voted ? 'border-brand-purple ring-2 ring-brand-purple/30' : 'border-brand-indigo/10',
      )}
    >
      <div
        className="absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-20 blur-2xl"
        style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
        aria-hidden
      />

      <div className="relative flex items-start gap-4">
        <div
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-lg"
          style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
        >
          <ThemeIcon name={option.icon} size={26} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-sm text-brand-ink/40">#{rank}</span>
            {leader && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-amber px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-brand-ink">
                <Crown size={12} /> Líder
              </span>
            )}
            {option.isSuggestion && (
              <span className="rounded-full bg-brand-peach px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-brand-purple">
                Sugestão
              </span>
            )}
          </div>
          <h3 className="mt-1 text-2xl leading-tight text-brand-indigo">{option.name}</h3>
          <p className="mt-1 text-sm text-brand-ink/65">{option.tagline}</p>
        </div>
      </div>

      <div className="relative mt-5">
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
          'relative mt-5 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all duration-300',
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
    </motion.article>
  );
}
