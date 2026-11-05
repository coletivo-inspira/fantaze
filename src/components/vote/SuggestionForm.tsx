import { useState, type FormEvent } from 'react';
import { Check, Lightbulb, Loader2 } from 'lucide-react';

interface SuggestionFormProps {
  onSuggest: (name: string) => Promise<void>;
}

export default function SuggestionForm({ onSuggest }: SuggestionFormProps) {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (value.trim().length < 2) return;
    setStatus('sending');
    await onSuggest(value);
    setValue('');
    setStatus('done');
    setTimeout(() => setStatus('idle'), 3500);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-[2rem] bg-brand-indigo p-6 text-white sm:p-8"
    >
      <div className="relative">
        <div className="flex items-center gap-3 text-brand-amber">
          <Lightbulb size={22} />
          <span className="text-xs font-extrabold uppercase tracking-[0.3em]">Não viu o seu favorito?</span>
        </div>
        <h3 className="mt-3 text-3xl">Sugira um universo</h3>
        <p className="mt-2 max-w-md text-sm text-white/70">
          Filmes, séries, livros, jogos, animes… Se pegar, ele entra na lista e qualquer pessoa pode votar.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="sugestao">
            Nome do universo
          </label>
          <input
            id="sugestao"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={60}
            placeholder="Ex.: Percy Jackson"
            className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white placeholder:text-white/40 focus:border-brand-amber focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === 'sending' || value.trim().length < 2}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-amber px-6 py-3 text-sm font-extrabold text-brand-ink transition-all hover:-translate-y-0.5 disabled:opacity-50"
          >
            {status === 'sending' ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Enviando…
              </>
            ) : status === 'done' ? (
              <>
                <Check size={16} /> Sugestão enviada!
              </>
            ) : (
              'Enviar sugestão'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
