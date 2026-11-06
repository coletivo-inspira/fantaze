import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import type { PassportSlot } from '../../types';
import { formatShortDate } from '../../lib/format';
import StampArt from './StampArt';

interface StampSlotProps {
  slot: PassportSlot;
  /** Data ISO do carimbo, quando já coletado */
  stampedAt?: string;
  /** Anima a “batida” do carimbo (logo após coletar) */
  justStamped?: boolean;
  index: number;
}

export default function StampSlot({ slot, stampedAt, justStamped, index }: StampSlotProps) {
  const stamped = Boolean(stampedAt);
  const available = slot.code !== null;
  // Leve variação de inclinação para parecer carimbado à mão
  const tilt = ((index * 7) % 11) - 5;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative grid aspect-square w-full max-w-[9.5rem] place-items-center">
        {stamped ? (
          <motion.div
            initial={justStamped ? { scale: 2.2, opacity: 0, rotate: tilt - 25 } : false}
            animate={{ scale: 1, opacity: 1, rotate: tilt }}
            transition={{ type: 'spring', stiffness: 260, damping: 14 }}
            className="h-full w-full mix-blend-multiply"
          >
            <StampArt name={slot.name} month={slot.month} colors={slot.colors} className="h-full w-full" />
          </motion.div>
        ) : (
          <div className="grid h-full w-full place-items-center rounded-full border-2 border-dashed border-brand-indigo/25 text-brand-indigo/40">
            {available ? (
              <span className="px-4 font-display text-lg leading-tight text-brand-indigo/45">Aguardando carimbo</span>
            ) : (
              <Lock size={26} />
            )}
          </div>
        )}
      </div>
      <p className="mt-3 font-display text-lg leading-tight text-brand-indigo">{slot.month}</p>
      <p className="text-xs font-bold text-brand-ink/55">
        {stamped ? `Carimbado em ${formatShortDate(stampedAt!)}` : available ? slot.name : 'Em breve'}
      </p>
    </div>
  );
}
