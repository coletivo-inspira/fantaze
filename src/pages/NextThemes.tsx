import { Loader2 } from 'lucide-react';
import { useVotes } from '../hooks/useVotes';
import PageHeader from '../components/ui/PageHeader';
import Reveal from '../components/ui/Reveal';
import VoteCard from '../components/vote/VoteCard';
import SuggestionForm from '../components/vote/SuggestionForm';

export default function NextThemes() {
  const { tally, myVote, loading, pendingId, vote, suggest, totalVotes } = useVotes();

  return (
    <>
      <PageHeader
        kicker="Próximos temas"
        title="Você escolhe o próximo universo."
        subtitle="O tema mais votado vira a ambientação do mês seguinte. Dá para trocar o voto quando quiser."
        decor="sparkle"
      />

      <section className="bg-brand-paper pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="mb-10 grid gap-4 sm:grid-cols-3">
            <Stat label="Votos até agora" value={loading ? '…' : totalVotes.toLocaleString('pt-BR')} />
            <Stat label="Universos na disputa" value={loading ? '…' : String(tally.length)} />
            <Stat label="Votação encerra em" value="30 de novembro" />
          </Reveal>

          {loading ? (
            <p className="flex items-center justify-center gap-2 py-20 text-brand-ink/60">
              <Loader2 className="animate-spin" size={20} /> Carregando votação…
            </p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {tally.map((option, i) => (
                <VoteCard
                  key={option.id}
                  option={option}
                  rank={i + 1}
                  percent={totalVotes ? (option.votes / totalVotes) * 100 : 0}
                  voted={myVote === option.id}
                  pending={pendingId === option.id}
                  disabled={pendingId !== null}
                  onVote={vote}
                />
              ))}
            </div>
          )}

          <Reveal className="mt-14">
            <SuggestionForm onSuggest={suggest} />
          </Reveal>

          <p className="mt-6 text-center text-xs text-brand-ink/50">
            Nesta versão os votos ficam salvos apenas no seu navegador. Os números iniciais são fictícios.
          </p>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-brand-peach p-6">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-brand-purple">{label}</p>
      <p className="mt-2 font-display text-4xl text-brand-indigo">{value}</p>
    </div>
  );
}
