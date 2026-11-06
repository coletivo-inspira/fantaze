import { upcomingThemes } from '../data/upcoming';
import type { VoteTally } from '../types';
import { readStorage, wait, writeStorage } from './storage';

/**
 * Contrato da votação. Hoje a implementação é local (localStorage);
 * para integrar com um backend, crie outra implementação de `VotesService`
 * (ex.: chamadas REST) e troque o export `votesService` no final do arquivo.
 */
export interface VotesService {
  getTally(): Promise<VoteTally[]>;
  getMyVote(): string | null;
  vote(themeId: string): Promise<VoteTally[]>;
}

const KEY_MY_VOTE = 'fantaze:meu-voto';
const KEY_EXTRA_VOTES = 'fantaze:votos-extras';

type ExtraVotes = Record<string, number>;

const localVotesService: VotesService = {
  async getTally() {
    await wait(120);
    return buildTally();
  },

  getMyVote() {
    return readStorage<string | null>(KEY_MY_VOTE, null);
  },

  async vote(themeId) {
    await wait(350);
    const extras = readStorage<ExtraVotes>(KEY_EXTRA_VOTES, {});
    const previous = readStorage<string | null>(KEY_MY_VOTE, null);

    if (previous && previous !== themeId) {
      extras[previous] = Math.max(0, (extras[previous] ?? 0) - 1);
    }
    if (previous !== themeId) {
      extras[themeId] = (extras[themeId] ?? 0) + 1;
    }

    writeStorage(KEY_EXTRA_VOTES, extras);
    writeStorage(KEY_MY_VOTE, themeId);
    return buildTally();
  },
};

function buildTally(): VoteTally[] {
  const extras = readStorage<ExtraVotes>(KEY_EXTRA_VOTES, {});

  return upcomingThemes
    .map((t) => ({
      id: t.id,
      name: t.name,
      tagline: t.tagline,
      colors: t.colors,
      icon: t.icon,
      votes: t.seedVotes + (extras[t.id] ?? 0),
    }))
    .sort((a, b) => b.votes - a.votes);
}

export const votesService: VotesService = localVotesService;
