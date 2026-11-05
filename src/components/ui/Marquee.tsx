import { cn } from '../../lib/cn';

interface MarqueeProps {
  items: string[];
  className?: string;
}

/** Faixa de texto em rolagem infinita (duplica a lista para fechar o loop). */
export default function Marquee({ items, className }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div className={cn('overflow-hidden', className)} aria-hidden>
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10 font-display text-3xl sm:text-4xl">
            {item}
            <span className="text-brand-pink">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
