import { useState, type FormEvent } from 'react';
import { Check, Info, Loader2, Stamp } from 'lucide-react';
import type { ClaimResult } from '../../types';
import { cn } from '../../lib/cn';

interface ClaimStampFormProps {
  busy: boolean;
  onClaim: (code: string) => Promise<ClaimResult>;
}

const messages = {
  invalid: 'Código não encontrado. Confira com a equipe e tente de novo.',
  already: 'Você já coletou o carimbo deste tema.',
  locked: 'Este tema ainda não foi liberado.',
} as const;

export default function ClaimStampForm({ busy, onClaim }: ClaimStampFormProps) {
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    const result = await onClaim(code);
    if (result.ok) {
      setFeedback({ ok: true, text: `Carimbo de ${result.slot.name} coletado!` });
      setCode('');
    } else {
      setFeedback({ ok: false, text: messages[result.reason] });
    }
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] bg-brand-peach p-6 sm:p-8">
      <h3 className="flex items-center gap-2 text-2xl text-brand-indigo">
        <Stamp size={22} className="text-brand-pink" /> Coletar carimbo
      </h3>
      <p className="mt-2 text-sm text-brand-ink/70">
        Na sua visita, a equipe entrega o código do tema do mês. Digite aqui para carimbar o passaporte.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="codigo-carimbo" className="sr-only">
          Código do carimbo
        </label>
        <input
          id="codigo-carimbo"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setFeedback(null);
          }}
          autoCapitalize="characters"
          autoComplete="off"
          placeholder="FNT-XXXXXXXX"
          className="flex-1 rounded-full border border-brand-indigo/15 bg-white px-5 py-3.5 font-bold tracking-wider text-brand-indigo placeholder:font-normal placeholder:tracking-normal placeholder:text-brand-ink/35 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
        />
        <button
          type="submit"
          disabled={busy || !code.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-indigo px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-purple disabled:opacity-50"
        >
          {busy ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Carimbando…
            </>
          ) : (
            'Carimbar'
          )}
        </button>
      </div>

      {feedback && (
        <p
          role="status"
          className={cn(
            'mt-4 flex items-center gap-2 text-sm font-bold',
            feedback.ok ? 'text-brand-purple' : 'text-brand-pink',
          )}
        >
          {feedback.ok && <Check size={16} />} {feedback.text}
        </p>
      )}

      <p className="mt-5 flex items-start gap-2 rounded-2xl bg-white/60 p-3 text-xs text-brand-ink/60">
        <Info size={14} className="mt-0.5 shrink-0" />
        <span>
          Modo demonstração: use o código <strong className="text-brand-indigo">FNT-BRIDGERTON</strong>. Na versão final, o
          código será validado no servidor.
        </span>
      </p>
    </form>
  );
}
