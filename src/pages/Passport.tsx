import { useState } from 'react';
import { motion } from 'framer-motion';
import { passportRewards, passportSlots } from '../data/passport';
import { usePassport } from '../hooks/usePassport';
import type { ClaimResult } from '../types';
import PageHeader from '../components/ui/PageHeader';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import StampSlot from '../components/passport/StampSlot';
import RewardTier from '../components/passport/RewardTier';
import ClaimStampForm from '../components/passport/ClaimStampForm';

const steps = [
  { title: 'Visite no mês do tema', text: 'Cada universo dura um mês. Venha viver a experiência.' },
  { title: 'Peça o código', text: 'A equipe entrega o código do carimbo junto com a conta.' },
  { title: 'Carimbe e ganhe', text: 'Complete a coleção e resgate brindes exclusivos.' },
];

export default function Passport() {
  const { state, stampCount, totalSlots, nextReward, busy, claim, redeem } = usePassport();
  const [lastStamped, setLastStamped] = useState<string | null>(null);

  async function handleClaim(code: string): Promise<ClaimResult> {
    const result = await claim(code);
    if (result.ok) setLastStamped(result.slot.id);
    return result;
  }

  const progress = (stampCount / totalSlots) * 100;
  const maxReward = passportRewards[passportRewards.length - 1].stampsRequired;

  return (
    <>
      <PageHeader
        kicker="Passaporte Fantazê"
        title="Colecione mundos, ganhe brindes."
        subtitle="Cada visita em um tema novo rende um carimbo. Complete a coleção e troque por experiências especiais."
        decor="star"
      />

      <section className="bg-brand-paper pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          {/* Progresso */}
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-indigo p-6 text-white sm:p-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-brand-amber">Sua coleção</p>
                  <p className="mt-2 font-display text-5xl sm:text-6xl">
                    {stampCount}
                    <span className="text-white/45"> / {totalSlots}</span>
                  </p>
                </div>
                <p className="max-w-sm text-sm text-white/75">
                  {nextReward
                    ? `Faltam ${nextReward.stampsRequired - stampCount} ${
                        nextReward.stampsRequired - stampCount === 1 ? 'carimbo' : 'carimbos'
                      } para: ${nextReward.title}.`
                    : 'Coleção completa! Todos os brindes foram liberados.'}
                </p>
              </div>

              <div className="relative mt-8">
                <div className="h-4 overflow-hidden rounded-full bg-white/15">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-brand-pink to-brand-amber"
                  />
                </div>
                {passportRewards.map((r) => (
                  <span
                    key={r.id}
                    className="absolute -top-1 grid h-6 w-6 -translate-x-1/2 place-items-center rounded-full border-2 border-brand-indigo bg-white text-[10px] font-extrabold text-brand-indigo"
                    style={{ left: `${(r.stampsRequired / totalSlots) * 100}%` }}
                    title={r.title}
                  >
                    {r.stampsRequired}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-white/50">
                Marcos de brinde em {passportRewards.map((r) => `${r.stampsRequired}`).join(' e ')} carimbos (máx. {maxReward}).
              </p>
            </div>
          </Reveal>

          {/* Livro de carimbos */}
          <Reveal className="mt-10">
            <div className="rounded-[2.5rem] border-2 border-dashed border-brand-indigo/20 bg-white p-6 sm:p-10">
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
                {passportSlots.map((slot, i) => (
                  <StampSlot
                    key={slot.id}
                    slot={slot}
                    index={i}
                    stampedAt={state.stamps[slot.id]}
                    justStamped={lastStamped === slot.id}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Coletar + brindes */}
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr_1fr]">
            <Reveal>
              <ClaimStampForm busy={busy} onClaim={handleClaim} />
            </Reveal>
            {passportRewards.map((reward, i) => (
              <Reveal key={reward.id} delay={0.1 * (i + 1)}>
                <RewardTier
                  reward={reward}
                  stampCount={stampCount}
                  voucher={state.redeemed[reward.id]}
                  busy={busy}
                  onRedeem={redeem}
                />
              </Reveal>
            ))}
          </div>

          {/* Como funciona */}
          <div className="mt-20">
            <SectionHeading kicker="Como funciona" title="Três passos para encher o passaporte." />
            <ol className="mt-10 grid gap-5 md:grid-cols-3">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.1}>
                  <li className="h-full rounded-[2rem] bg-brand-peach p-6 sm:p-8">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-pink font-display text-lg text-white">
                      {i + 1}
                    </span>
                    <h3 className="mt-4 text-xl text-brand-indigo">{s.title}</h3>
                    <p className="mt-2 text-sm text-brand-ink/70">{s.text}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <p className="mt-10 text-center text-xs text-brand-ink/50">
            Nesta versão o passaporte fica salvo apenas no seu navegador. Brindes e regras são ilustrativos.
          </p>
        </div>
      </section>
    </>
  );
}
