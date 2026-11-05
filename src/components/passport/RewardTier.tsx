import { useState } from 'react';
import { Check, Gift, Loader2, Lock } from 'lucide-react';
import type { PassportReward } from '../../types';
import { cn } from '../../lib/cn';

interface RewardTierProps {
  reward: PassportReward;
  stampCount: number;
  voucher?: string;
  busy: boolean;
  onRedeem: (id: string) => Promise<string | null>;
}

export default function RewardTier({ reward, stampCount, voucher, busy, onRedeem }: RewardTierProps) {
  const unlocked = stampCount >= reward.stampsRequired;
  const [pending, setPending] = useState(false);

  async function handle() {
    setPending(true);
    await onRedeem(reward.id);
    setPending(false);
  }

  return (
    <article
      className={cn(
        'relative overflow-hidden rounded-[2rem] p-6 sm:p-8',
        unlocked ? 'bg-brand-indigo text-white' : 'border border-brand-indigo/10 bg-white text-brand-indigo',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            'grid h-12 w-12 place-items-center rounded-2xl',
            unlocked ? 'bg-brand-amber text-brand-ink' : 'bg-brand-peach text-brand-purple',
          )}
        >
          {unlocked ? <Gift size={24} /> : <Lock size={22} />}
        </span>
        <span
          className={cn(
            'rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider',
            unlocked ? 'bg-white/15 text-brand-amber' : 'bg-brand-peach text-brand-purple',
          )}
        >
          {reward.stampsRequired} carimbos
        </span>
      </div>

      <h3 className="mt-5 text-2xl leading-tight">{reward.title}</h3>
      <p className={cn('mt-2 text-sm leading-relaxed', unlocked ? 'text-white/75' : 'text-brand-ink/65')}>
        {reward.description}
      </p>

      <div className="mt-6">
        {voucher ? (
          <div className="rounded-2xl bg-white/10 p-4">
            <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.25em] text-brand-amber">
              <Check size={14} /> Brinde resgatado
            </p>
            <p className="mt-1 font-display text-3xl tracking-wider">{voucher}</p>
            <p className="mt-1 text-xs text-white/65">Mostre este código ao garçom na sua próxima visita.</p>
          </div>
        ) : unlocked ? (
          <button
            type="button"
            onClick={handle}
            disabled={busy || pending}
            className="inline-flex items-center gap-2 rounded-full bg-brand-amber px-6 py-3 text-sm font-extrabold text-brand-ink transition-all hover:-translate-y-0.5 disabled:opacity-60"
          >
            {pending ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Gerando…
              </>
            ) : (
              'Resgatar brinde'
            )}
          </button>
        ) : (
          <p className="text-sm font-bold text-brand-purple">
            Faltam {reward.stampsRequired - stampCount} {reward.stampsRequired - stampCount === 1 ? 'carimbo' : 'carimbos'}
          </p>
        )}
      </div>
    </article>
  );
}
